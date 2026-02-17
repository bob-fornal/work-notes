# Agentic Browsers

Agentic browsers embed an agent that can read webpages and take actions in your browser.

Most agentic browsers have four major layers.

1. **Perception layer**: Converts the current UI into model input. It starts with an accessibility tree snapshot. If the tree is incomplete or ambiguous, the agent takes a screenshot, sends it to a vision model (for example, Gemini Pro) to extract UI elements into a structured form, then uses that result to decide the next action.
2. **Reasoning layer**: Uses specialized agents for read-only browsing, navigation, and data entry. Separating roles improves reliability and lets you apply safety rules per agent.
3. **Security layer**: Enforces domain allowlisting and deterministic boundaries such as restricted actions, and confirmation steps to reduce prompt injection risk.
4. **Execution layer**: Runs browser tools (click, type, upload, navigate, screenshot, tab operations) and refreshes state after each step.
