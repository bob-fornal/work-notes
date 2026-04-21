# Develop unit tests using GitHub Copilot tools

Unit testing is a crucial aspect of software development that ensures the functionality of individual components within a system.

## Examine the unit testing tools and environment

GitHub Copilot Chat can be used to suggest unit tests based on the code you specify.

### GitHub Copilot support for unit testing

GitHub Copilot can help with the following testing tasks:

* Set up testing frameworks: get help configuring the right testing framework and VS Code extensions for your project and language.
* Generate test code: create unit tests, integration tests, and end-to-end tests that cover your application code.
* Handle edge cases: generate comprehensive test suites to cover edge cases and error conditions.
* Fix failing tests: receive suggestions for fixing test failures.
* Maintain consistency: personalize GitHub Copilot to generate tests that follow your project's coding practices.

### Set up your testing framework

To accelerate your testing workflow, GitHub Copilot can help set up the testing framework and VS Code extensions for your project. GitHub Copilot suggests appropriate testing frameworks based on your project type.

1. Open the Chat view.
2. Enter the `/setupTests` command in the chat input field.
3. Follow GitHub Copilot's guidance to configure your project.

### Write unit tests with GitHub Copilot

GitHub Copilot can help you write tests for your application code by generating test code that covers your codebase. This includes unit tests, end-to-end tests, and tests for edge cases.

You can generate unit tests using the following GitHub Copilot tools:

* Chat view: Use the Chat view to generate unit tests for a project, class, or method using the Ask, Plan, or Agent.
* Inline Chat: Use Inline Chat to generate unit tests for selected classes or methods.
* Smart actions: Use the Generate Tests smart action to generate unit tests for selected code without writing a prompt.
* Code line completions: Use code line completions to suggest addition unit tests for an existing test case.

### Fix failing tests

GitHub Copilot integrates with the Test Explorer in Visual Studio Code and can help with fixing failing tests.

1. In the Test Explorer, hover over a failing test.
2. Select the Fix Test Failure button (sparkle icon)
3. Review and apply GitHub Copilot's suggested fix.

Alternatively, you can:

1. Open the Chat view.
2. Enter the `/fixTestFailure` slash command.
3. Follow GitHub Copilot's suggestions to fix the test

### Maintain consistency

If your organization has specific testing requirements, you can customize how GitHub Copilot generates tests to ensure they meet your standards. You can personalize how GitHub Copilot generates tests by providing custom instructions. For example:

* Specify preferred testing frameworks
* Define naming conventions for tests
* Set code structure preferences
* Request specific test patterns or methodologies

## Create unit tests using the Generate Tests smart action

The Generate Tests smart action is a feature of GitHub Copilot that helps you create unit tests for your code. It analyzes the code in the current file and generates test cases based on the code's structure and behavior. This feature is particularly useful for developers who want to ensure their code is thoroughly tested and meets quality standards.

The Generate Tests smart action can be used to generate unit tests for an entire file, or a specific selection of code.

### Generate unit tests for a file

The Generate Tests smart action can be used to generate unit tests for an entire file. This is useful when you want to create tests for all functions and methods in the file without having to select each one individually.

To generate unit tests for a file, follow these steps:

1. Open the file that contains the code you want to test.
2. Right-click inside the code editor, select Generate Code, and then select Generate Tests.
3. GitHub Copilot analyzes the code and generates unit tests for all functions and methods in the file.

    The generated tests are displayed in the code editor, typically in a new test file or at the end of the current file, depending on your project's structure and testing framework.

    The generated tests should include assertions and test cases that cover various scenarios for each function or method.

4. Review the generated tests.

    You can make adjustments, such as changing the test names, modifying or removing test cases, or adding additional assertions.

    Select Accept or Close to accept or discard the suggested unit tests.

5. Save the test file.

    Test files are typically saved to a separate "tests" directory in a project that's configured for unit tests. Your options will depend on your project's structure and testing framework.

6. Run the tests to ensure they pass and verify the functionality of your code.
7. If necessary, refine the tests by adding additional test cases or modifying existing ones.
8. Save the file again after making any changes to the tests.

### Generate unit tests for a selection

The Generate Tests smart action can also be used to generate unit tests for a specific selection of code. This is useful when you want to create tests for a specific function or method without generating tests for the entire file.

To generate unit tests for a selection of code, follow these steps:

1. Open the file that contains the code you want to test.
2. Select the code block that you want to test.
3. Right-click the selected code, select Generate Code, and then select Generate Tests.
4. GitHub Copilot analyzes the selected code and generates unit tests for the selected function or method.
5. Review the generated tests and make any necessary adjustments.
6. Save the file.
7. Run the tests to ensure they pass and verify the functionality of your code.
8. If necessary, refine the tests by adding additional test cases or modifying existing ones.
9. Save the file again after making any changes to the tests.

## Create unit tests using Inline Chat

The Inline Chat feature of GitHub Copilot allows you to create unit tests directly in the code editor. This is useful when you want to create tests for specific functions or methods without having to switch to the Chat view, but want more control than the Generate Tests smart action provides.

The Inline Chat feature can be used to create unit tests for an entire file, or a specific selection of code.

To create unit tests using Inline Chat, follow these steps:

1. Open the file that contains the code you want to test.
2. Select the code block that you want to test.
3. Open an Inline Chat session.

    Use the Ctrl+I keyboard shortcut to open the Inline Chat session. Alternatively, you can select Editor Inline Chat from one of the GitHub Copilot menus.

4. Enter a prompt that generates unit tests for the selected code.

    For example: "/tests Generate unit tests for this method. Validate both success and failure, and include edge cases."

5. Review the suggested unit tests.

    You can make adjustments, such as changing the test names, modifying or removing test cases, or adding additional assertions.

    The generated tests are displayed in the code editor. GitHub Copilot generates test code in an existing test file, or creates a new test file if one doesn't exist.

6. Select Accept or Close to accept or discard the suggested unit tests.
7. Save the test file.

    Test files are typically saved to a separate "tests" directory in a project that's configured for unit tests. Your options will depend on your project's structure and testing framework.

8. Build the project to ensure the test file is included in the build and can be executed.

    Resolve any build errors that may occur.

9. Run the tests to ensure they pass and verify the functionality of your code.
10. If necessary, refine the tests using Inline Chat to add or modify test cases.

## Create unit tests using Chat view modes

The Chat view in Visual Studio Code provides three built-in agents that can be used to create unit tests: Ask, Plan, and Agent. Each agent has its own strengths, and the best agent to use depends on the specific task at hand.

* The Ask agent is optimized for asking questions about your code projects, coding topics, and general technology concepts.
* The Plan agent is optimized for creating a structured, step-by-step implementation plan before writing any code.
* The Agent is optimized for starting an agentic coding workflow.

### Use the Ask agent to create unit tests

The Ask agent can be used to analyze a workspace and then create unit tests. The Ask agent is useful when you want to create tests for multiple functions or methods in a file, or when you want to create tests for an entire file.

To create unit tests using the Ask agent, follow these steps:

1. Open the file that contains the code you want to test.
2. Open the Chat view and start a new chat session using the Ask agent.
3. Add context to the chat session.

    * You can add context to the chat session by dragging and dropping files from Visual Studio Code's EXPLORER view into the Chat view. You can also use the Add Context button.
    * You can open external files in the code editor to include resources that aren't part of the workspace and use them to provide specific context. For example, you can open markdown files that contain contributor guidelines or contact information and then use the Add Context button to add them to the Chat view context.
    * You can use Copilot Chat with your project context to guide prompts and generate more relevant suggestions. This is especially useful when creating tests for multiple functions or methods in a file, or when generating tests for an entire file.

4. Enter a prompt that asks for unit tests for the code in the file.

    * For example: "I need to create unit tests for the code in this file. The tests should be written in Python and use the unittest framework. Please generate the tests and explain how they work."
5. Review the suggested unit tests, and refine the results using updated prompts if necessary.
6. Move the suggested unit tests into a test file.

    * For example, create a test file in the same directory as the code file, and then insert the suggested unit tests into the file.
    * You can use the Ask agent to suggest updates for specific tests after creating the test file, or use other GitHub Copilot tools to help with updates.
    * You can also use the Apply in Editor button to apply the suggested unit tests directly to the code file.

7. Save the test file.

    * Test files are typically saved to a separate "tests" directory in a project that's configured for unit tests. Your options depend on your project's structure and testing framework.
    * You can use the Ask agent to suggest updates for specific tests after creating the test file, or use other GitHub Copilot tools to help with updates.

8. Run the tests to ensure they pass and verify the functionality of your code.
9. If necessary, refine the tests by adding more test cases or modifying existing ones.
10. Save the file again after making any changes to the tests.

### Use the Plan agent to plan unit tests

The Plan agent can be used to create a detailed implementation plan for your unit tests before writing any code. The Plan agent researches your task comprehensively, asks clarifying questions, and produces a step-by-step plan. Once the plan is reviewed and approved, you can hand it off to the Agent for implementation.

To plan unit tests using the Plan agent, follow these steps:

1. Open the file that contains the code you want to test.
2. Open the Chat view and start a new chat session using the Plan agent. You can select Plan from the agents dropdown, or type /plan followed by your task description.
3. Enter a prompt that describes the unit tests you want to create.

    * For example: "I need to create unit tests for the code in this file. The tests should be written in Python and use the unittest framework. Create a test file in the same directory as the code file."

4. Answer any clarifying questions the Plan agent asks after researching your task.

    * The Plan agent may ask questions to resolve ambiguities before drafting the plan.

5. Preview the proposed plan draft and provide feedback for iteration.

    * The Plan agent provides a high-level summary, a breakdown of steps, verification steps for testing, and documented decisions made during planning.
    * Stay in the Plan agent to refine your plan before implementation. You can iterate multiple times to clarify requirements, adjust scope, or provide additional context.

6. Once finalized, use the buttons to start implementation of the plan or to open the plan in the editor for further review.

    * You can choose to implement the plan in the same chat session, or start a background or cloud agent session to work on the implementation autonomously.
    * When starting to implement the plan, you can still provide clarifying instructions, like "Start with the UI", or "only step 1 and 2".

### Use the Agent to create unit tests

The Agent can be used to automate tasks within your unit testing process. For example, you can use the Agent to scaffold a test project, create test files, run tests, generate test reports, or perform other tasks related to unit testing. The Agent is best for creating unit tests that require a more in-depth understanding of the project.

To create unit tests using the Agent, follow these steps:

1. Open the file that contains the code you want to test.
2. Open the Chat view and start a new chat session using the Agent.
3. Let the Agent determine the context.

    When using the Agent, you don't need to specify the context. GitHub Copilot will automatically determine the relevant context and files to edit.

4. Optionally, select the Tools icon to configure which tools can be used for responding to your request.

    * You can select the tools that you want to use for responding to your request. For example, you can select the Test Explorer tool to run tests or the Terminal tool to run commands.
    * You can also select the GitHub Copilot tool to use GitHub Copilot's code generation capabilities.

5. Enter a prompt that defines the intended tasks.

    * For example: "Ensure that a suitable unit tests project is prepared for the selected code file. Create a test file in the unit test project that includes unit tests for all methods in the selected file. Unit tests should be written in C# and use the xUnit framework. Run the tests to ensure expected results."

6. Monitor the progress of the Agent as it performs the tasks.

    * Confirm tool invocations and terminal commands. You can confirm or reject the tool invocations and terminal commands that the Agent suggests. For example, you can confirm the command to run the tests or the command to generate a test report.
    * Interrupt the Agent if necessary. You can interrupt the Agent if you want to stop the tasks that it's performing. For example, you can interrupt the Agent if you want to change the context or if you want to change the tools that are being used.

7. Review the files that the Agent created or updated during the specified tasks, and then keep or discard updates.

    * You can use new prompts to correct or enhance specific tests if necessary.


