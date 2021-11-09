# Identity and Access Management (IAM)

* Global service
* **Root Account** created by default, should not be used or shared.
* Users are people within an organization and can be grouped.
* **Groups** only contain users, not other groups.
* Users do not have to belong to a group, and a user can belong to multiple groups.

## Permissions

* Users or Groups can be assigned policies (JSON documents).
* These policies define the permissions of the users.
* In AWS apply the **least privilege principle**: do not give more permission to a user than they need.

```script
https://<alias or account number>.signin.aws.amazon.com/console
```

## Policies

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

## Password Policy

Strong passwords equal higher security for the account.

* Set minimum password length
* Require specific character types
* Allow all IAM Users to change their own passwords
* Require users to change their passwords after some time (password expiration)
* Prevent password re-use

## Multifactor-Authentication (MFA)

* Need to protect at least the Root Account and IAM USers
* Password (you know) and security device (you own)

### Device Options

* Virtual MFA Device (Google Authenticator, Authy) - support for multiple tokens on a single device.
* Universal 2nd Factor (U2F) Security Key (YubiKey) - supports multiple root and IAM Users using a signle security key.
* Hardware Key Fob MFA Device (Gemalto)
* Hardware Key Fob MFA Device for AWS GovCloud (US) (SurePassID)

## AWS Access Keys, CLI and SDK


