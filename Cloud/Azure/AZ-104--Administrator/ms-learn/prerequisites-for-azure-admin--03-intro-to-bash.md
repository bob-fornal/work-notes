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

### Bash Commands and Operators

#### `ls [-a] [-l]` command

`ls` lists the contents of your current directory or the directory specified in an argument to the command. By itself, it lists the files and directories in the current directory.

#### `cat` command

`cat` shows the contents of a file.

```bash
cat /etc/os-release
```

This is a useful command because it tells you which Linux distribution you're running:

```bash
NAME="Ubuntu"
VERSION="18.04.2 LTS (Bionic Beaver)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 18.04.2 LTS"
VERSION_ID="18.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=bionic
UBUNTU_CODENAME=bionic
```

#### `sudo` command

Some Bash commands can only be run by the root user; a system administrator or superuser. If you try one of these commands without sufficient privileges, it fails.

You don't want to run as root most of the time; it's too dangerous. To run commands that require admin privilege without logging in as a superuser, you'll preface the commands with `sudo`.

`sudo` stands for "superuser do." When you use it, you're telling the shell that for this one command, you're acting with the root-user level of permission.

#### `cd`, `mkdir`, and `rmdir` commands

`cd` stands for "change directory," and it does exactly what the name suggests: it changes the current directory to another directory. It enables you to move from one directory to another just like its counterpart in Windows.

You can create directories by using the `mkdir` command.

The `rmdir` command deletes (removes) a directory, but only if it's empty. If it's not empty, you'll get a warning instead.

#### `rm [-r]` command
The `rm` command is short for "remove." As you'd expect, `rm` deletes files.

#### `cp [-r] [-i]` command
The `cp` command copies not just files, but entire directories (and subdirectories) if you want.

#### `ps [-ef]` command

The ps command gives you a snapshot of all the currently running processes. By itself, with no arguments, it shows all your shell processes; in other words, not much.

`-e` lists all running processes, and there are typically many of them.

For a more comprehensive look at what processes are running in the system, use the `-ef` flag.

#### `w` command

Users come, users go, and sometimes you get users you don't want at all. Sysadmins are also expected to know who's logged in, and who shouldn't be.

To find out who's on your servers, Linux provides the `w` (for "who") command. It displays information about the users currently on the computer system and those users' activities. `w` shows user names, their IP addresses, when they logged in, what processes they're currently running, and how much time those processes are consuming. It's a valuable tool for sysadmins.

#### `pwd` command

`pwd` stands for "print working directory."

### Bash I/O operators

You can do a lot in Linux just by exercising Bash commands and their many options. But you can really get work done when you combine commands by using I/O operators:

* `<` for redirecting input to a source other than the keyboard.
* `>` for redirecting output to destination other than the screen.
* `>>` for doing the same, but appending rather than overwriting.
* `|` for piping output from one command to the input of another.
