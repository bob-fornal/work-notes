# Introduction to PowerShell

PowerShell is a command-line shell and a scripting language all in one. It was designed as a task engine that uses cmdlets to wrap tasks that people need to do. In PowerShell, you can run commands on local or remote machines. You can do tasks like managing users and automating workflows.

Whether you're part of an operations team or a development team that's adopting DevOps principles, PowerShell can help. You can use it to address various tasks, such as managing cloud resources and continuous integration and continuous delivery (CI/CD). PowerShell offers many helpful commands, but you can expand its capabilities at any time by installing modules.

## What is PowerShell?

PowerShell consists of two parts: a command-line shell and a scripting language. It started out as a framework to automate administrative tasks in Windows. PowerShell has grown into a cross-platform tool that's used for many kinds of tasks.

## Features

PowerShell shares some features with traditional shells:

* Built-in help system: Most shells have some kind of help system, in which you can learn more about a command. For example, you can learn what the command does and what parameters it supports. The help system in PowerShell provides information about commands and also integrates with online help articles.
* Pipeline: Traditional shells use a pipeline to run many commands sequentially. The output of one command is the input for the next command. PowerShell implements this concept like traditional shells, but it differs because it operates on objects over text. You learn more about this feature later in this module.
* Aliases: Aliases are alternate names that can be used to run commands. PowerShell supports the use of common aliases such as `cls` (clear the screen) and `ls` (list the files). Therefore, new users can use their knowledge of other frameworks and don't necessarily have to remember the PowerShell name for familiar commands.

PowerShell differs from a traditional command-line shell in a few ways:

* It operates on objects over text. In a command-line shell, you have to run scripts whose output and input might differ, so you end up spending time formatting the output and extracting the data you need. By contrast, in PowerShell you use objects as input and output. That means you spend less time formatting and extracting.
* It has cmdlets. Commands in PowerShell are called cmdlets (pronounced commandlets). In PowerShell, cmdlets are built on a common runtime rather than separate executables as they are in many other shell environments. This characteristic provides a consistent experience in parameter parsing and pipeline behavior. Cmdlets typically take object input and return objects. The core cmdlets in PowerShell are built in .NET Core, and are open source. You can extend PowerShell by using more cmdlets, scripts, and functions from the community and other sources, or you can build your own cmdlets in .NET Core or PowerShell.
* It has many types of commands. Commands in PowerShell can be native executables, cmdlets, functions, scripts, or aliases. Every command you run belongs to one of these types. The words command and cmdlet are often used interchangeably, because a cmdlet is a type of command.

## Locate commands

A *cmdlet* (pronounced "command-let") is a compiled command. A cmdlet can be developed in .NET or .NET Core and invoked as a command within PowerShell. Thousands of cmdlets are available in your PowerShell installation. The challenge lies in discovering what the cmdlets are and what they can do for you.

Cmdlets are named according to a verb-noun naming standard. This pattern can help you to understand what they do and how to search for them. It also helps cmdlet developers create consistent names. You can see the list of approved verbs by using the `Get-Verb` cmdlet. Verbs are organized according to activity type and function.

Three core cmdlets allow you to delve into what cmdlets exist and what they do:

* Get-Command: The `Get-Command` cmdlet lists all of the available cmdlets on your system. Filter the list to quickly find the command you need.
* Get-Help: Run the `Get-Help` core cmdlet to invoke a built-in help system. You can also run an alias help command to invoke `Get-Help` but improve the reading experience by paginating the response.
* Get-Member: When you call a command, the response is an object that contains many properties. Run the `Get-Member` core cmdlet to drill down into that response and learn more about it.

### Locate commands by using Get-Command

When you run the `Get-Command` cmdlet in Cloud Shell, you get a list of every command that's installed in PowerShell. Because thousands of commands are installed, you need a way to filter the response so you can quickly locate the command that you need.

To filter the list, keep in mind the verb-noun naming standard for cmdlets. For example, in the `Get-Random` command, `Get` is the verb and `Random` is the noun. Use flags to target either the verb or the noun in the command you want. The flag you specify expects a value that's a string. You can add pattern-matching characters to that string to ensure you express that, for example, a flag's value should start or end with a certain string.
