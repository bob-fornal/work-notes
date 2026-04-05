# Anki Quiz Generator — Copilot Instructions

This document describes the `_tools/anki-quiz-generator` tool so that GitHub Copilot can understand, invoke, and extend it.

---

## What It Does

`generate.js` reads one or more Markdown note files, sends their content to the **GitHub Models API** (`gpt-4o`), and writes an **HTML-formatted, Anki-compatible CSV file** ready to import as a multiple-choice flashcard deck.

---

## Location

```
_tools/anki-quiz-generator/
├── generate.js      ← main entry point
├── package.json     ← dependencies: openai, glob
├── .gitignore
└── COPILOT.md       ← this file
```

---

## Prerequisites

| Requirement | Details |
|---|---|
| **Node.js** | v18 or later (ES modules, `--input-type=module`) |
| **Dependencies** | Run `npm install` inside `_tools/anki-quiz-generator/` |
| **`GITHUB_TOKEN`** | Environment variable — a GitHub PAT with access to GitHub Models (`models.inference.ai.azure.com`) |

---

## Running the Tool

```bash
cd _tools/anki-quiz-generator
npm install          # first time only
node generate.js
```

The script prompts interactively for three values:

| Prompt | Description | Example |
|---|---|---|
| **Source file(s) / folder(s)** | Comma-separated list of files, folders, or glob patterns. Folders are scanned recursively for `.md` files. | `../../AI/GitHub-Copilot, ../../DevOps/intro.md` |
| **Deck name** | The Anki deck the cards are imported into. | `GitHub Copilot` |
| **Output path** | Where to write the CSV. Defaults to `<cwd>/<deck-name>-quiz.csv`. | `../../AI/GitHub-Copilot/github-copilot-quiz.csv` |

---

## Input Resolution Rules

The source input is split on commas. Each entry is resolved as follows:

1. **Glob pattern** — any entry containing `*`, `?`, or `{` is expanded with `glob`.
2. **Directory** — resolved recursively for all `**/*.md` files.
3. **File** — used directly.

Duplicates across entries are deduplicated automatically.

---

## Output Format

The generated CSV uses Anki's plain-text import format:

```
#separator:comma
#html:true
#notetype:Basic
#deck:<Deck Name>
"Front","Back","Tags"
"<html question>","<html answer + explanation>","deck-tag topic-tag"
```

### Front card (HTML)
- Bold question text in a `<p>` element
- Answer choices as a `<ul>` list with comfortable line-height

### Back card (HTML)
- Correct answer in **green** with a ✓ checkmark
- Horizontal rule separator
- Explanation paragraph in dark grey

### Tags
Each card receives two space-separated tags:
1. The deck name in kebab-case (e.g. `github-copilot`)
2. A topic tag derived from the AI response (e.g. `prompt-engineering`)

---

## AI Behaviour

- **Model:** `gpt-4o` via `https://models.inference.ai.azure.com`
- **Temperature:** `0.4` (focused, consistent output)
- **Output schema** the model must return:

```json
[
  {
    "question": "string",
    "choices": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "answer": "A" | "B" | "C" | "D",
    "explanation": "string",
    "tag": "string"
  }
]
```

- The system prompt instructs the model to generate **8–20 questions** per call, one per major concept, with exactly 4 choices and one correct answer.
- Responses wrapped in markdown fences are automatically unwrapped before JSON parsing.

---

## How Copilot Should Invoke This Tool

When a user asks to generate an Anki quiz from their notes, run the tool like this:

```bash
export GITHUB_TOKEN=<token>
cd _tools/anki-quiz-generator
node generate.js
```

Then respond to the prompts:

```
📂  Source file(s) / folder(s): <path to notes folder or file(s)>
🃏  Deck name: <topic name>
💾  Output path: <desired output path or press Enter for default>
```

### Example invocations

**Single folder:**
```
📂  Source file(s) / folder(s): ../../AI/GitHub-Copilot/learn-fundamentals-course
🃏  Deck name: GitHub Copilot
💾  Output path: ../../AI/GitHub-Copilot/github-copilot-quiz.csv
```

**Multiple folders:**
```
📂  Source file(s) / folder(s): ../../AI/GitHub-Copilot, ../../DevOps
🃏  Deck name: DevOps and AI
💾  Output path: ../../quizzes/devops-and-ai-quiz.csv
```

**Specific files:**
```
📂  Source file(s) / folder(s): ../../AI/GitHub-Copilot/learn-fundamentals-course/introduction-to-github-copilot.md, ../../AI/GitHub-Copilot/learn-fundamentals-course/responsible-ai-with-github-copilot.md
🃏  Deck name: Responsible AI
💾  Output path: ../../AI/GitHub-Copilot/responsible-ai-quiz.csv
```

**Glob pattern:**
```
📂  Source file(s) / folder(s): ../../AI/**/*.md
🃏  Deck name: AI Notes
💾  Output path: ../../quizzes/ai-notes-quiz.csv
```

---

## Extending the Tool

| Task | Where to change |
|---|---|
| Change the AI model | `MODEL` constant at the top of `generate.js` |
| Adjust question count or style | `SYSTEM_PROMPT` constant in `generate.js` |
| Add true/false or fill-in-the-blank formats | Add a new prompt template and `build*Html` helpers |
| Support non-Markdown sources (e.g. `.txt`, `.rst`) | Update the `glob('**/*.md', ...)` call in `resolveSourceFiles` |
| Add a `--non-interactive` / headless mode | Replace `readline` prompts with `process.argv` or a config JSON |
