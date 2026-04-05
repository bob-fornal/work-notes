# Copilot Instructions

## Anki Quiz Generator

This repository contains a tool for generating Anki multiple-choice quiz CSV files from Markdown notes.

**Tool location:** `tools/anki-quiz-generator/`  
**Full reference:** [`tools/anki-quiz-generator/COPILOT.md`](../tools/anki-quiz-generator/COPILOT.md)

### When to use it

Use this tool whenever a user asks to:
- Generate a quiz, flashcards, or study cards from notes
- Create an Anki deck from Markdown files
- Turn notes into multiple-choice questions

### Quick invocation

```bash
export GITHUB_TOKEN=<github-pat>
cd tools/anki-quiz-generator
npm install   # first time only
node generate.js
```

Respond to the three interactive prompts:

| Prompt | Accepts |
|---|---|
| Source file(s) / folder(s) | File paths, folder paths (scanned recursively for `.md`), glob patterns, or a comma-separated mix |
| Deck name | Any string — becomes the Anki deck name and the base tag |
| Output path | Absolute or relative path for the `.csv` file (Enter = default beside the deck name) |

See `tools/anki-quiz-generator/COPILOT.md` for full details, examples, and extension guidance.
