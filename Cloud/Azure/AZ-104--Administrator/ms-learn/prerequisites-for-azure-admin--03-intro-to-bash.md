# Introduction to Bash

Bash is a vital tool for managing Linux machines. The name is short for "Bourne Again Shell."

A shell is a program that commands the operating system to perform actions. You can enter commands in a console on your computer and run the commands directly, or you can use scripts to run batches of commands. Shells like PowerShell and Bash give system administrators the power and precision they need for fine-tuned control of the computers they're responsible for.

There are other Linux shells, including csh and zsh, but Bash has become the de facto Linux standard. That's because Bash is compatible with Unix's first serious shell, the Bourne shell, also known as sh. Bash incorporates the best features of its predecessors. But Bash also has some fine features of its own, including built-in commands and the ability to invoke external programs.

One reason for Bash's success is its simplicity. Bash, like the rest of Linux, is based on the Unix design philosophy. As Peter Salus summarized in his book A Quarter Century of Unix, three of the "big ideas" embodied in Unix are:

* Programs do one thing and do it well
* Programs work together
* Programs use text streams as the universal interface

The last part is key to understanding how Bash works. In Unix and Linux, everything is a file. That means you can use the same commands without worrying about whether the I/O stream — the input and output — comes from a keyboard, a disk file, a socket, a pipe, or another I/O abstraction.

## Bash Fundamentals

The full syntax for a Bash command is:

```bash
command [options] [arguments]
```

Bash treats the first string it encounters as a command.

### Get help

Which options and arguments can be used, or must be used, varies from command to command. Fortunately, Bash documentation is built into the operating system. Help is never more than a command away. To learn about the options for a command, use the `man` (for "manual") command. For instance, to see all the options for the `mkdir` ("make directory") command, do this:

```bash
man mkdir
```

`man` will be your best friend as you learn Bash. `man` is how you find the information you need to understand how any command works.

### Use wildcards

Wildcards are symbols that represent one or more characters in Bash commands. The most frequently used wildcard is the asterisk. It represents zero characters or a sequence of characters. Suppose your current directory contains hundreds of image files, but you only want to see the PNG files; the ones whose file names end with .png. Here's the command to list only those files:

```bash
ls *.png
```
