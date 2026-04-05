#!/usr/bin/env node
/**
 * Anki Quiz Generator
 *
 * Reads one or more Markdown note files, sends them to the GitHub Models API,
 * and writes an HTML-formatted Anki-compatible CSV file.
 *
 * Usage:
 *   node generate.js
 *
 * Requirements:
 *   GITHUB_TOKEN environment variable must be set with a GitHub personal
 *   access token that has access to GitHub Models (models.inference.ai.azure.com).
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { glob } from 'glob';
import OpenAI from 'openai';

// ── Constants ──────────────────────────────────────────────────────────────

const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com';
const MODEL = 'gpt-4o';

const SYSTEM_PROMPT = `You are an expert educator who creates high-quality Anki flashcard quizzes.

Given a set of Markdown notes, generate multiple-choice questions that test understanding of the key concepts.

Rules:
- Generate one question per major concept, aiming for 8–20 questions depending on content richness.
- Each question has exactly 4 answer choices labeled A), B), C), D).
- Exactly one choice is correct.
- Distractors should be plausible but clearly wrong to a knowledgeable reader.
- The explanation should reinforce WHY the answer is correct (2–3 sentences).
- The tag should be a short kebab-case label for the topic area.

Respond ONLY with a valid JSON array. No markdown fences, no extra text. Schema:
[
  {
    "question": "string",
    "choices": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "answer": "A" | "B" | "C" | "D",
    "explanation": "string",
    "tag": "string"
  }
]`;

// ── Helpers ────────────────────────────────────────────────────────────────

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function resolveSourceFiles(input) {
  const parts = input.split(',').map(s => s.trim()).filter(Boolean);
  const resolved = [];

  for (const part of parts) {
    if (part.includes('*') || part.includes('?') || part.includes('{')) {
      const matches = await glob(part, { absolute: true });
      if (matches.length === 0) {
        console.warn(`  ⚠  No files matched: ${part}`);
      }
      resolved.push(...matches);
    } else {
      const abs = path.resolve(part);
      if (!fs.existsSync(abs)) {
        console.warn(`  ⚠  File not found: ${abs}`);
      } else if (fs.statSync(abs).isDirectory()) {
        const matches = await glob('**/*.md', { cwd: abs, absolute: true });
        if (matches.length === 0) {
          console.warn(`  ⚠  No .md files found in folder: ${abs}`);
        } else {
          console.log(`  📁  Folder "${path.basename(abs)}" → ${matches.length} .md file(s) found.`);
        }
        resolved.push(...matches);
      } else {
        resolved.push(abs);
      }
    }
  }

  return [...new Set(resolved)];
}

function readNotes(filePaths) {
  return filePaths
    .map(fp => {
      const content = fs.readFileSync(fp, 'utf-8');
      const name = path.basename(fp, path.extname(fp));
      return `## Source: ${name}\n\n${content}`;
    })
    .join('\n\n---\n\n');
}

function buildFrontHtml(question, choices) {
  const items = choices.map(c => `<li>${escHtml(c)}</li>`).join('');
  return (
    `<p style="font-size:1.1em;font-weight:bold;">${escHtml(question)}</p>` +
    `<ul style="line-height:2;margin-top:8px;">${items}</ul>`
  );
}

function buildBackHtml(answerLabel, fullChoice, explanation) {
  return (
    `<p style="font-size:1.2em;color:#1a7f37;font-weight:bold;">&#10003;&nbsp;${escHtml(fullChoice)}</p>` +
    `<hr style="border-color:#ccc;margin:8px 0;">` +
    `<p style="color:#444;">${escHtml(explanation)}</p>`
  );
}

function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toCsvRow(fields) {
  return fields.map(f => `"${f.replace(/"/g, '""')}"`).join(',');
}

function buildCsv(deckName, cards) {
  const lines = [
    '#separator:comma',
    '#html:true',
    '#notetype:Basic',
    `#deck:${deckName}`,
    toCsvRow(['Front', 'Back', 'Tags']),
  ];

  for (const card of cards) {
    lines.push(toCsvRow([card.front, card.back, card.tags]));
  }

  return lines.join('\n') + '\n';
}

// ── AI Call ────────────────────────────────────────────────────────────────

async function generateQuestions(notesContent) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set.');
  }

  const client = new OpenAI({ baseURL: GITHUB_MODELS_ENDPOINT, apiKey: token });

  console.log(`\n  🤖  Calling ${MODEL} on GitHub Models…`);

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Generate quiz questions from these notes:\n\n${notesContent}` },
    ],
    temperature: 0.4,
    max_tokens: 8192,
  });

  const raw = response.choices[0].message.content.trim();

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (fenceMatch) {
      parsed = JSON.parse(fenceMatch[1].trim());
    } else {
      throw new Error(`Could not parse AI response as JSON:\n${raw.slice(0, 500)}`);
    }
  }

  if (!Array.isArray(parsed)) {
    throw new Error('AI response was not a JSON array.');
  }

  return parsed;
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║      Anki Quiz Generator             ║');
  console.log('╚══════════════════════════════════════╝\n');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  // 1. Source files
  console.log('Enter one or more sources — files, folders, or glob patterns.');
  console.log('Folders are scanned recursively for .md files.');
  console.log('Separate multiple entries with commas. (e.g. AI/GitHub-Copilot, notes/intro.md)\n');
  const sourceInput = await ask(rl, '📂  Source file(s) / folder(s): ');
  const sourceFiles = await resolveSourceFiles(sourceInput);

  if (sourceFiles.length === 0) {
    console.error('\n❌  No source files found. Exiting.');
    rl.close();
    process.exit(1);
  }

  console.log(`\n  ✔  Found ${sourceFiles.length} file(s):`);
  sourceFiles.forEach(f => console.log(`       • ${path.relative(process.cwd(), f)}`));

  // 2. Deck name
  const deckName = (await ask(rl, '\n🃏  Deck name: ')).trim() || 'My Deck';

  // 3. Output path
  const defaultOut = path.join(process.cwd(), `${deckName.replace(/\s+/g, '-').toLowerCase()}-quiz.csv`);
  const outputInput = (await ask(rl, `\n💾  Output path [${defaultOut}]: `)).trim();
  const outputPath = path.resolve(outputInput || defaultOut);

  rl.close();

  // 4. Read notes
  console.log('\n  📖  Reading notes…');
  const notes = readNotes(sourceFiles);
  console.log(`  ✔  ${notes.length.toLocaleString()} characters read.`);

  // 5. Generate questions via AI
  const questions = await generateQuestions(notes);
  console.log(`  ✔  ${questions.length} questions generated.`);

  // 6. Build cards
  const cards = questions.map(q => {
    const answerIndex = ['A', 'B', 'C', 'D'].indexOf(q.answer.toUpperCase());
    const fullChoice = q.choices[answerIndex] ?? `${q.answer}) (unknown)`;
    const deckTag = deckName.replace(/\s+/g, '-').toLowerCase();
    const tag = `${deckTag} ${q.tag ?? 'general'}`;

    return {
      front: buildFrontHtml(q.question, q.choices),
      back: buildBackHtml(q.answer, fullChoice, q.explanation),
      tags: tag,
    };
  });

  // 7. Write CSV
  const csv = buildCsv(deckName, cards);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, csv, 'utf-8');

  console.log(`\n✅  Done! CSV written to:\n   ${outputPath}`);
  console.log(`\n   ${cards.length} cards  •  Deck: "${deckName}"\n`);
  console.log('Import into Anki: File → Import → select the CSV file.\n');
}

main().catch(err => {
  console.error('\n❌  Error:', err.message);
  process.exit(1);
});
