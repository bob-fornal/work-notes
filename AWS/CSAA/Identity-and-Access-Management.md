# Identity and Access Management (IAM)

* Global service
* **Root Account** created by default, should not be used or shared.
* Users are people within an organization and can be grouped.
* **Groups** only contain users, not other groups.
* Users do not have to belong to a group, and a user can belong to multiple groups.

## IAM Permissions

* Users or Groups can be assigned policies (JSON documents).
* These policies define the permissions of the users.
* In AWS apply the **least privilege principle**: do not give more permission to a user than they need.

```script
https://<alias or account number>.signin.aws.amazon.com/console
```

## IAM Policies

* Inherit group policy, can be in multiple groups.
* Non-Group User, inline policy.

### Structure

* Version
* Id: an identifier for the policy (optional)
* Statement: one or more individual statements (required)

Statement consists of ...

* Sid: an identifier for the statement (optional)
* Effect: (Allow, Deny) access
* Principal: account, user, role to which this policy applies to
* Action: list of actions allowed or denied
* Resource: list of resources to which the action applies to
* Condition: conditions for then this policy is in effect (optional)

