# Best Practices

## Never push to the Main branch

Pushing directly to the Main branch doesn't make much sense as it does not promote collaboration.

Instead, make use of merges/rebases from **pull requests** that most providers have (GitHub, AWS CodeCommit, etc.).

## Define patterns & standards within your team

Every team has its patterns and standards for naming conventions, tags, and commit messages. Those should be followed and pointed out in all pull-request reviews.

If the team does not have any starting pattern, here are a couple of suggestions:

* **branch name**: `user_name/ticket_number,-short_description_dashed`
* **commit title**: `type(scope): short_description`

## Write useful commit messages

Try to focus more on "why" and "what" instead of "how". You are spending a bit more time to complete your commit, but it will pay back when your future self or teammates revisit that piece of code.

## Rebase your branch frequently

Rebasing your branch frequently ensures you are always working with the latest version from the main branch. Your teammates will review the correct changes, and you will usually encounter no conflicts when merging to the main branch.

```script
$ git merge master
```
