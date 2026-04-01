# Introduction to Copilot Spaces

GitHub Copilot Spaces provides a new way to work with AI by anchoring its responses in a carefully curated context. Unlike general Copilot Chat, which surfaces broad suggestions, a Space allows you to focus the model on specific files, issues, pull requests, and tailored instructions.

## Definition

It’s a dedicated Copilot chat grounded in a curated set of context you choose. The Space is itself like a LLM and you can feed it GitHub files, issues, pull requests, and your own free‑text instructions to provide context to your specific topic.

## Setting Context for Copilot Spaces

The effectiveness of a Copilot Space depends on the context you provide. You can attach specific files (such as scripts, configuration, or documentation), relevant issues or pull requests, and tailored instructions. By curating this input, you help Copilot focus on the information that matters most for your scenario. The context order matters: leading with the most critical files or instructions helps drive more accurate and relevant responses.

## Setup

Attaching Files (Uploads):

* In the Space setup, use the "Attach files" or "Add context" button to select one or more files from your GitHub repository.
* You can attach source code files, markdown docs, configuration files, or other assets as context. These files are referenced from the default branch, so your Space stays up to date as your repo evolves.
* If allowed by your workspace settings, you may also upload files directly (such as images or datasets) from your local machine for non-repo context.

Adding Instructions:

* Use the "Instructions" section to provide specific guidance to Copilot. This can include goals ("Summarize the onboarding process"), style preferences ("Write in a formal tone"), or canonical examples ("Sample output should look like ...").
* Keep instructions brief, focused, and actionable. If your Space serves a workflow or troubleshooting guide, include step-by-step tasks or sample prompts.
* You can update instructions at any time to refine the focus of your Space.

## Use of GitHub Copilot Spaces

Use a Space when you want consistent, reproducible answers on a tightly scoped topic, like a particular service, a runbook or playbook, or a known dataset. Compared to general or repo‑wide chat, Spaces trade breadth for depth: by narrowing the context to what matters most, they tend to produce more predictable, grounded responses, while broad chat can surface wider discovery but may be less precise.

A few practical guidelines improve quality. Model context limits apply, so keep Spaces small and focused. Linked GitHub files reflect the repository's default branch, helping content stay current as code evolves. Be clear and concise with your instructions, and include a few canonical examples to anchor style and expected outputs. Finally, remember that the selection and ordering of context can influence responses, so lead with your most important sources.

## Creating a space

1. To create a space, go to https://github.com/copilot/spaces, and click Create space.
2. Give your space a name.
3. Choose whether the space is owned by you or by an organization you belong to. Organization-owned Spaces can be shared using GitHub's built-in permission model.
4. Optionally, add a description. This doesn't affect the responses Copilot gives in the space, but it can help others understand the context of the space.
5. Click Save in the top right corner of the page.
6. Adding context to a space You can add two types of context to your space:

    Instructions: Free text that describes what Copilot should focus on within this space. Include its areas of expertise, what kinds of tasks it should help with, and what it should avoid. This helps Copilot give more relevant responses based on your intent.

**Attachments**: This context is used to provide more relevant answers to your questions. Additionally, Spaces always refer to the latest version of the code on the main branch of the repository.

To add attachments, click Add to the right of "Attachments", then choose one of the following options:

* Attach files and folders: You can add files and folders from your GitHub repositories. This includes code files, documentation, and other relevant content that can help Copilot understand the context of your space.
* Link pull requests and issues: You can paste the URLs of the GitHub issues and pull requests.
* Upload a file: You can upload files directly from your local machine. This includes images, text files, rich documents, and spreadsheets.
* Add text content: You can type or paste free-text content, such as transcripts, notes, or any other relevant information that can help Copilot understand the context of your space.

## Sharing, Discoverability, and Governance

To ensure your Space delivers lasting value, it must be easy to find, securely shared, and well-maintained.

### Visibility and sharing

Successful Spaces are easy to find, safe to share, and clearly "owned." When you create a Space, set visibility according to how broadly you intend others to use it. Depending on your environment, options may include keeping it under your personal ownership or making it visible to your organization.

Share the Space by link and, where available, rely on org-level browsing or catalogs to improve discoverability. Use a clear, purpose‑driven title, and a short description that states the scope ("one job per Space"), intended audience, and expected outputs so teammates immediately know when to use it.

### Security and access

Security follows GitHub's existing permissions. A Space doesn't grant new access; it only surfaces content that viewers are already entitled to see. If a Space links to private repositories, issues, or pull requests, only users with the appropriate repo permissions see that material reflected in answers. This helps you share confidently across an organization while keeping sensitive information protected. As a best practice, avoid pasting sensitive data into free‑text notes; prefer linking to version‑controlled files where normal review and permissions apply.

### Versioning and freshness

Spaces stay fresh by referencing live GitHub sources. Linked files reflect the repository's default branch, and attached issues and pull requests evolve as they change, reducing the need to copy content into separate documents. If you need branch‑specific guidance or a historical snapshot, consider narrowing your references to the relevant files, adding a brief example in free text, or—if supported in your environment—attaching a text file that captures the exact content you want the Space to use. Keep the scope small so updates remain predictable and grounded.

### Governance

Treat governance as lightweight but intentional. Assign an owner who maintains the Space, add a short "How to use this Space" note at the top of the instructions, and include 1–3 canonical examples that define "good" output. Establish naming conventions (for example, "ServiceName—Onboarding Helper") and review cadence (for example, at each release) to prune stale sources and keep instructions aligned with reality. When a Space grows beyond a single job, split it into smaller Spaces so discoverability stays high and answer quality remains consistent.

Use this checklist when creating or updating a Space to keep it easy to find, safe to share, and reliably useful. Options (for example, org ownership, uploads) may vary by environment.

Naming and Purpose

- [ ] Choose a clear, purpose‑driven title (for example, "ServiceName—Onboarding Helper"); keep "one job per Space."
- [ ] Write a 1–2 sentence description that states scope, intended audience, and expected outputs.
- [ ] Add a brief "How to use this Space" note at the top of the instructions.

Ownership and Visibility

- [ ] Set the correct owner (individual or organization, if available).
- [ ] Select appropriate visibility (private, org‑visible, etc.).
- [ ] Verify access with a non‑owner who expected GitHub permissions (Spaces inherit repo/issue/PR permissions).
- [ ] Share the URL and, where available, add collaborators.

Security and Privacy

- [ ] Don't paste sensitive data into free‑text; prefer linking version‑controlled files where normal review/permissions apply.
- [ ] Ensure all attached sources are suitable for the chosen visibility.
- [ ] If uploads are supported, limit the text content you’re comfortable sharing.
- [ ] Remove obsolete or confidential materials.

Discoverability and Docs

- [ ] Use consistent naming conventions across Spaces (team/service prefixes help).
- [ ] Add tags/keywords in the description to aid search.
- [ ] Announce or catalog the Space in your org’s preferred directory/channel.

Review Cadence and Governance

- [ ] Assign a maintainer/owner responsible for updates.
- [ ] Set a review cadence (for example, monthly or per release).
- [ ] At each review: validate links, test 2–3 representative prompts, update examples, prune noisy sources, and confirm visibility.
- [ ] Track feedback and improvement requests (issues, discussion, or a simple checklist in the description).

### Do's and Don'ts of Working in a Space

**DO** keep your questions tightly scoped to the sources you attached (files, issues, pull requests, and notes) so answers stay grounded.

**DON'T** @‑mention people or other Copilot extensions in a Space: user mentions won't notify anyone, and extensions can't be invoked from Space chats.

**DO** treat the Space as a focused environment for a single task or domain, and reuse its own terminology to reinforce consistency.

**DO** use prompting patterns that lead to runnable, verifiable outputs. Start by confirming intent, then refine with concrete constraints (formats, time ranges, file paths, or sections to consider). Ask for executable code, queries, or commands and, when helpful, request references back to the included sources for traceability.

**DON'T** expect the Space to pull in content that isn't included. Unless your environment supports repository search you've explicitly attached, Copilot won't discover outside material.

**DO** iterate when responses drift: tighten instructions, add one to three high‑quality examples that demonstrate "good" output, and prune noisy or irrelevant sources.

**DON'T** let the Space sprawl beyond a single job or exceed model context limits; if you hit size warnings or degraded answers, reduce sources or split into smaller Spaces to restore precision and predictability.

**DO** keep context fresh and well‑ordered. Link version‑controlled files so the Space reflects your repository's default branch as it evolves, and lead with the most important sources or examples since ordering can influence responses.

**DON'T** paste sensitive data into free‑text notes; prefer linking to files in repos (or use uploads where supported) so standard review and permissions apply.


