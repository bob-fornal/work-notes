# Agents

## Guiding Principles

To use coding agents well, you must understand context.

It's easy to fool yourself into thinking that the coding agents are magical models. They have read all of the internet, developed deep levels of intuition for the structure of codebases, and been trained to write extremely correct code.

But at the end of the day, the agent is doing next token prediction. And each token must fit in a context window.

There are a bunch of corollaries that fall out of that...

* **Your work needs to be broken down**. If the problem you are trying to solve is too big for the context window, the agent is going to spin on it for a long time and give you poor results.
** **Compaction is a lossy technique**. When deciding what to compact and how, the agent is going to make choices on which information to include and omit. Maybe it does a good job, maybe it doesn't, In my experience, more compaction tends to lead to degradation in performance.
* **Externalizing context into the filesystem** (e.g. a plan document with stages which are checked, or not) allows agents to selectively read and remember without filling up the full context of the conversation. This is helpful for resuming tasks and continuing to be context-efficient.
* **Stay in the 'smart' half of the context window**. It's generally easier to train on short-context data vs long-context data. Results will tend to be better when the context window is 'less full'. Stay out of the dumb zone.
* **You don't know what you don't know**. If the agent somehow misses a relevant file or package, it might really go in a direction you didn't anticipate. If it's not in the context window, there's no way to know. Your codebase's structure can help this, as can 'progressive disclosure' of parts of the architecture. OpenAI has a nice blog post about structuring many different markdown files to do this well.

As a result, model performance and speed is governed both by the pure performance of the model, but also by how it is able to manage multiple context windows and delegate to sub-agents or teams of agents.

## Managing Multiple Agents

It's all about coordinating multiple agents who work together as a team, with shared tasks, inter-agent messaging and centralized management.

You have a team of agents on one side. On the other side, a set of poor-quality instructions. The challenge? Coordinate work amongst the agents to get the job done.

The job of the orchestrator is to distribute the work to get the work done.

Each type of orchestrator has a name, some guidance and some constraints and uses it to plan the work. The orchestrator asks each agent to respond with some JSON describing what they did and then applies that change. There’s a fixed probability that each assembly step has a problem that the orchestrator will notice and request rework.

The job finishes when the work is done, and the orchestrator gives approval.

### Command and Control

Command and Control is based on a theory that everyone that works for you requires explicit instructions. The orchestrator here decides what to do and has to approve each step.

We model this by ensuring that all agents report back to the orchestrator for permission to do the action. When running in this style, it’s very inefficient and the agents exchange a huge number of messages to get the job done (most of which are just responding with yes, they are doing the right things).

### Taylorism

Taylorism, also known as scientific management, looks at workflows and applies process engineering to break the work down into small, discrete tasks.

It still keeps the overwhelming view that management is the clever part and offers little/no autonomy for the the workers. The manager in this case provides small steps with standardized instructions. There’s zero autonomy for the workers.

The orchestrator is clearly explaining what to do, breaking the work down into small tasks. But one thing you’ll notice here is the lack of autonomy.

### Outcome-focused management

Now we’re evolving again. In an outcome-focused management style, you assume that your team intrinsically wants to do a good job. They’re smart and get things done, they just need to know what needs to be achieved (rather than the individual steps to get there). However, we have to have some co-ordination, so as well as clear outcomes, we’ll try to limit work in progress and make sure we finish the subtasks before starting the next.

This example is notable for a couple of reasons:

1. We’re now seeing agents do actions at the same time.
2. With our new focus on outcomes, other agents are working on different tasks.

This is the most interesting thing that happened in the whole experiment. The outcome-focused orchestration gave the agents enough latitude to recognize and handle a bottleneck. The orchestration style permitted emergent role-expansion. This is exactly what we want to see in our engineering teams too - if there’s work to be done and someone can pick up the task, they should. In the end, the goal-oriented team has completed the work five times faster than the command and control orchestrator, and 3x faster than Taylorism.

### Fully autonomous

In a fully autonomous self-organizing team style we have minimal management, instead relying on peer coordination to achieve our objectives.

Full autonomy can result in a lot of thrashing.

But even with better code, fully autonomous agents need shared protocols to coordinate effectively. WIP limits working in the outcome-focused model precisely because they were a lightweight constraints that preserved autonomy whilst preventing thrashing.

### Conclusion

Smaller models don’t have great instruction adherence, and each run was a bit of a lottery. If you wanted to do something similar for real, it’s genuinely challenging and not something you can just vibe-code over a weekend.

But the parallels to real engineering teams are hard to ignore. Command and Control works when the stakes are high and the agents (or people) are unreliable (you trade speed for certainty). Taylorism works when you can define the work precisely upfront. Outcome-focused management worked best here, and I don’t think that’s a coincidence - it’s the same model that works best with capable engineering teams. You define what done looks like, set some constraints around work-in-progress, and trust people to figure out the how.

The way you orchestrate agents mirrors the way you orchestrate people. If your agents are inexperienced and unfamiliar with the work, you micromanage them to get the job done. If they’re capable, you set outcomes and get out of the way.

The models are only getting more capable. The orchestration patterns we choose now will matter more than the models themselves.
