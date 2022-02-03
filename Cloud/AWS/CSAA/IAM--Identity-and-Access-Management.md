# Identity and Access Management (IAM)

Identity and Access Management is a Global service.

* **Root Account** created by default, should not be used or shared.
* **Users** are people within an organization and can be grouped.
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

* Version: ```"2012-10-17"```
* Id: an identifier for the policy (optional)
* Statement: one or more individual statements (required)

The statement consists of ...

* Sid: an identifier for the statement (optional)
* Effect: (Allow, Deny) access
* Principal: account, user, role to which this policy will be applied to
* Action: list of actions allowed or denied
* Resource: list of resources to which the action will be applied to
* Condition: conditions for then this policy is in effect (optional)

## Password Policy

Strong passwords equal higher security for the account.

* Set minimum password length.
* Require specific character types.
* Allow all IAM users to change their passwords.
* Require users to change their passwords after some time (password expiration).
* Prevent password re-use.

## Multifactor-Authentication (MFA)

MFA is a Password (you know) and a security device (you own).

* Need to protect at least the **Root Account** and **IAM USers**

### Device Options

* Virtual MFA Device (Google Authenticator, Authy) - support for multiple tokens on a single device
* Universal 2nd Factor (U2F) Security Key (YubiKey) - supports multiple root and IAM Users using a single security key
* Hardware Key Fob MFA Device (Gemalto)
* Hardware Key Fob MFA Device for AWS GovCloud (US) (SurePassID)

## AWS Access Keys, CLI and SDK

There are three options to access AWS:

1. **AWS Management Console** (protected by password and MFA)
2. **AWS Command Line Interface** (CLI): protected by access keys
3. **AWS Software Development Kit** (SDK) - for code: protected by access keys

Access Keys are generated through the AWS Console

* Users manage their own access keys.
* **Access Keys are secret, just like a password. Do not share them.**

  * Access Key ID ~= username
  * Secret Access Key ~= password

### AWS CLI

A tool that allows interaction with AWS services using commands in the command-line shell.

* Direct access to the public APIs of AWS services.
* Scripts can be used to manage resources.
* It is open-source: http://github.com/aws/aws-cli
* Alternative to using AWS Management Console.

### AWS SDK

AWS Software Development Kit (AWS SDK).

* Language-specific APIS (set of libraries).
* Enables access and management of AWS services programmatically.
* Embedded within an application.

Supports ...

* SDKs: JavaScript, Python, PHP, .NET, Ruby, Java, Go, NodeJS, C++.
* Mobile SDKs: Android, iOS.
* IoT Device SDK: Embedded C, Arduino.

## AWS CloudShell

It may not be available in all regions. Terminal (CLI) in the cloud.

## IAM Roles for AWS Services

* Some AWS services will need to perform actions on our behalf.
* Assign **permissions** to AWS services with **IAM Roles**.

Common Roles:

* EC2 Instance Roles
* Lambda Function Roles
* Roles for CloudFormation

## IAM Security Tools

IAM Credential Report (account-level)

* A report that lists all account users and the status of their various credentials.

IAM Access Advisor (user-level)

* A report that shows the service permissions granted to a user and when those services were last accessed.
* This information can be used to revise policies.

## IAM Best Practices

* Do not use the root account except for AWS account setup.
* One physical user equals one AWS user.
* **Assign users to groups** and assign permissions to groups.
* Create a **strong password policy**.
* Use and enforce the use of **Multi-Factor Authentication (MFA)**.
* Create and use **Roles** for giving permissions to AWS services.
* Use Access Keys for Programmatic Access (CLI / SDK).
* Audit permissions of your account with the IAM Credentials Report.
* **Never share IAM Users and Access Keys**
