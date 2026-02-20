# Definitions

## Agentic Engineering

You're orchestrating AI agents: coding assistants that can execute, test, and refine code - while you act as architect, reviewer, and decision-maker. You might write only a percentage of the code by hand. The rest comes from agents working under your direction. That's **agentic**. And you're applying engineering discipline throughout. That's **engineering**.

It's professionally legible. "Agentic engineering" sounds like what it is: a serious engineering discipline involving autonomous agents. You can build a team practice around it.

### Deeper Definition

You start with a **plan**. Before prompting anything, you write a design doc or spec - sometimes with AI assistance. You break the work into well-defined tasks. You decide on the architecture. This is the part vibe coders skip, and it's exactly where projects go off the rails.

You **direct**, then **review**. You give the AI agent a well-scoped task from your plan. It generates code. You review that code with the same rigor you'd apply to a human teammate's PR. If you can't explain what a module does, it doesn't go in.

You **test** relentlessly. The single biggest differentiator between agentic engineering and vibe coding is testing. With a solid test suite, an AI agent can iterate in a loop until tests pass, giving you high confidence in the result. Without tests, it will cheerfully declare "done" on broken code. Tests are how you turn an unreliable agent into a reliable system.

**You own the codebase**. You maintain documentation. You use version control and CI. You monitor production. The AI accelerates the work, but you're responsible for the system.

Teams doing this well often report faster development: and those gains come from augmenting a solid process, not abandoning one. The AI handles boilerplate and grunt work. The human focuses on architecture, correctness, edge cases, and long-term maintainability.

AI-assisted development actually rewards good engineering practices more than traditional coding does. The better your specs, the better the AI's output. The more comprehensive your tests, the more confidently you can delegate. The cleaner your architecture, the less the AI hallucinates weird abstractions. As one analysis noted, "AI didn't cause the problem; skipping the design thinking did."

## Vibe Coding

Vibe coding means going with the vibe and not reviewing the code. That's the defining characteristic. You prompt, you accept, you run it, you see if it works. If it doesn't, you paste the error back and try again. You keep prompting. The human is not an engineer.

This is genuinely useful for:

* Greenfield MVPs, prototypes and hackathon demos. Code quality is irrelevant.
* Personal scripts and one-off tools. You're the only user. If it breaks, you regenerate it.
* Learning and exploration. Newcomers can build things they couldn't otherwise, learning by example from the AI's output.
* Creative brainstorming. Deliberately over-generating to see what approaches the AI suggests, then throwing it away and building properly.

The technique has a legitimate place in the toolbox.

But the failure modes are well-documented at this point. The pattern is always the same: it demos great, then reality arrives. You try to modify it, scale it, or secure it, and you discover nobody understands what the code is actually doing. As one engineer put it, "This isn't engineering, it's hoping."
