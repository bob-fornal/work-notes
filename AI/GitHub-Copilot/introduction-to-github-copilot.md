# Introduction to GitHub Copilot

> Research finds that when GitHub Copilot helps developers code faster, they can focus on solving bigger problems, stay in the flow longer, and feel more fulfilled with their work.

## AI Pair Programmer

GitHub Copilot is a service that provides you with an AI pair programmer that works with all of the popular programming languages.

Microsoft developed GitHub Copilot in collaboration with OpenAI. GitHub Copilot is powered by the OpenAI Codex system. OpenAI Codex has broad knowledge of how people use code and is more capable than GPT-3 in code generation. OpenAI Codex is more capable, in part, because it was trained on a dataset that included a larger concentration of public source code.

## Features

* **Copilot Chat**: Ask questions, get explanations of logic or errors, generate tests or documentation, export implementation of new features. The chat understands your code context and relates responses back to your project.
* **Code Review Summaries**: Auto generate a summary description of the changes. This helps reviewers understand intent, reduces the work in writing PR text, and improves clarity in collaboration.
* **Code Review Assistance**: Suggesting potential issues to look at, describing changes, pointing out edge cases, and proposing improvements for reviewers. This helps speed up review cycles and reduce manual overhead.
* **Copilot for the CLI**: After the editor and PRs, the terminal is where developers spend the most time. It allows for command suggestions, code snippets, generation of shell scripts, better understanding of output or errors, and can generate and improve projects.
* **Copilot Spaces**: Collaboration with AI on projects; explore project structure, ask high-level planning questions, refine requirements, and iterate on designs. Spaces offer a context‑rich environment where Copilot retains knowledge of your repository and workflow.
* **Coding Agent**: Acts as an autonomous AI assistant. It performs multi-step coding tasks based on your instructions. You can ask it to: Generate multiple related files, implement a feature set, and build scaffolding from a specification. Copilot executes these tasks under your direction, helping you complete complex workflows faster and stay in the flow.

## Subscription Plans

### GitHub Copilot Free

Includes 2000 code completions per month, 50 chat requests per month, and access to both GPT-4o and Claude 3.5 Sonnet models.

Key features:

* Code completions in supported editors.
* Limited monthly completions and chat requests.
* Access to advanced AI models.

### GitHub Copilot Pro

GitHub Copilot Pro is designed for individual developers who want enhanced capabilities beyond the Free plan.

Key features:

* Unlimited code completions and chat requests.
* Priority access to the latest AI models.
* Advanced code suggestions and explanations.
* Integration with supported IDEs (VS Code, Visual Studio, JetBrains, Neovim).
* Automated test generation and code explanation features.

### GitHub Copilot Pro+

Includes all the features of Copilot Pro with additional access to premium model usage and priority performance on high-demand resources. It's suited for individuals with higher usage needs.

Key features:

* All Pro features.
* Additional premium request capacity.
* Priority infrastructure access.

### GitHub Copilot Business

GitHub Copilot Business is for organizations that want to manage Copilot access and benefit from additional security and compliance features.

Key features:

* All Pro and Pro+ features for organization members.
* Centralized management and policy controls.
* Security vulnerability filtering.
* Code referencing and public code filtering.
* IP indemnity and enterprise-grade security, safety, and privacy.
* Chat in IDE and mobile.
* Filter for public code.

### GitHub Copilot Enterprise

GitHub Copilot Enterprise is designed for large organizations and enterprises that require advanced capabilities, deeper integration, and enhanced personalization.

Key features:

* All Business features.
* Personalized code suggestions based on internal/private code.
* Integration with GitHub Enterprise Cloud.
* AI-powered search and documentation generation across your codebase.
* Enhanced pull request support with AI-powered tags and summaries.
* Organization-wide customization and fine-tuning of Copilot models.
* Deep integration with GitHub for chat and codebase exploration..

GitHub Copilot Enterprise can index an organization's codebase for a deeper understanding and for suggestions that are more tailored. It offers access to GitHub Copilot customization to fine-tune private models for code completion.

## Interacting with Copilot

* **Inline suggestions**: Copilot analyzes your code and context to offer real-time code completions.
* **Command palette**: Provides quick access to the various functions in Copilot, so you can perform complex tasks with only a few keystrokes.
* **Copilot Chat**: An interactive feature that enables you to communicate with Copilot by using natural language. You can ask questions or request code snippets, and Copilot provides responses based on your input.
* **Inline chat**<sup>1</sup>: Enables context-specific conversations with Copilot directly within your code editor. You can use this feature to request code modifications or explanations without switching contexts.
* **Comments to code**: Copilot uses natural language processing to convert comments into code. You can describe the functionality that you want in a comment. When you select the Enter key, Copilot generates code based on your description.
* **Multiple suggestions**: For complex code snippets, Copilot can offer multiple alternatives. When Copilot offers a suggestion, look for the light bulb icon. Multiple suggestions help you explore different coding approaches and select the most appropriate one.
* **Explanations**: Understanding existing code is crucial, especially in large projects. You can use the Explain This feature to get explanations for code snippets. This feature is useful for learning purposes and when you're reviewing code that someone else wrote.
* **Automated test generation**: Unit tests are essential for ensuring code quality and reliability. Copilot can save you time and effort by generating unit tests for your functions or classes (via command palette).

### 1 - Inline Chat

Inline chat helps you focus on a specific section of your code and receive targeted advice. Additionally, you can utilize slash commands for more efficient interaction.

Slash commands are shortcuts that allow you to quickly perform actions in Copilot. These commands provide a convenient way to interact with Copilot without needing to navigate through menus.

Here are some common slash commands and their usage:

* `/explain` - Provides an explanation of the selected code.
* `/suggest` - Offers code suggestions based on the current context.
* `/tests` - Generates unit tests for the selected function or class.
* `/comment` - Converts comments into code snippets.

To use a slash command, just type the command in your editor and press `Enter`.


