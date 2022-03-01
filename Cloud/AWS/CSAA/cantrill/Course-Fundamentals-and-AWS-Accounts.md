# Course Fundamentals and AWS Accounts

## AWS Accounts

* An **AWS Account** is a container for *identities* (users) and *resources*.
* When creating an AWS Account, provide an account name, a unique email address, and a credit card.

### Account Root User

* Initially this is the only identity (the only user) created.
* This user has full control over all of **THIS** AWS Account and any resources created within it and *cannot be restricted*.
* Resources bill to the AWS Account payment method as they are consumed.
* Identity and Access Management (IAM) **Users**, **Groups**, and **Roles** can be created and given full or limited permissions.

### Security

* AWS Accounts can contain the impact of administrator errors or exploits by bad actors. Use separate accounts for separate things (DEV, TEST, and PROD), teams, products, or clients.
* Be default all access to an AWS Account and resources is denied except for the Account Root User.
* External identities can be granted access.

### Trick

Gmail address (`example@gmail.com`) ...

* `example+AWS1@gmail.com`
* `example+AWS2@gmail.com`
* `example+AWS3@gmail.com`

## Multi-Factor Authentication (MFA)

Factors = Different pieces of evidence that prove identity.

More factors generally mean more security and are harder to fake.

* Usernames and Passwords - If leaked, anyone can use the account.
* Knowledge - Something that is known, usernames and passwords.
* Possession - Something that is owned, MFA device or application.
* Inherent - Something about an individual ... fingerprint, face, voice, or iris.
* Location - A location (physical), which network (corporate or wifi).

## Securing an AWS Account

AWS Account Root User ...

* Username and Password are not enough to secure this account.
* Update `Security Credentials` (menu, top-right) to include MFA.

## Creating a Budget

* Select `Billing Dashboard` (menu, top-right).
* Select `Billing Preferences` (left side) and check all boxes.

### Cost Budget

* From `Billing Dashboard`.
* Select `Create a Budget`.
* Select Enable Cost Explorer, then Launch Cost Explorer.
* From the original page, create a Cost Budget.

### Alternate Contacts and IAM User and Role Access to Billing Information

* Select `Account` (menu, top-right)
* Scroll down to Alternate Contacts and complete.
* Scroll down to IAM User and Role Access to Billing Information and Edit.
* Check the Activate IAM Access and Update.

## Identity and Access Management (IAM) Basics

* No Cost
* Global service, Global resilience.
* **Allow** or **Deny** its identities on its AWS Account.
* No direct control on external accounts or users.
* Identity federation and MFA.

IAM is a globally resilient service, so any data is always secure across all AWS Regions.

* AWS Account and Root User can be thought of as the same thing.
* All AWS services TRUST the Root User completely.

### Users and Applications

* Every AWS Account comes with its running version of IAM, its database.
* Least Privilege Access for all others that have access.
* IAM is fully trusted by the AWS Account; it has all permissions that the AWS Account and Root User have.

### IAM Basics

* Users - Identities that represent humans or applications that need access to the AWS Account.
* Groups - Collection of related users.
* Roles - Can be used by AWS Services, or for granting external access to the AWS Account.

### IAM Policies

* Objects or documents that can be used to **Allow** or **Deny** access to AWS Services for Users, Groups, or Roles.

### IAM "Three Main Jobs"

1. **Manages Identities** - An Identity Provider (IDP).
2. **Authenticates** the Identities
3. **Authorization** - Allow or Deny access to resources.

## Adding an IAM Admin User

1. Navigate to IAM Dashboard.
2. Create Account Alias, store login URL.
3. Select Users, Add User.
4. Select Password, Custom Password, and enter a password.
5. Uncheck Require Password Reset and click Next.
6. Select Attach Existing Policies Directly and check AdministratorAccess.
7. Click through and Create, then Close.
8. Test sign-in process.
9. Add MFA.

## IAM Access Keys

Authentication at the Command Line is done via IAM Access keys.

* Long-term (in that they don't change automatically or regularly) credentials available through AWS.
* An IAM User has one username and one password.
* An IAM User can have **two access keys** (second set needed for rotation).
* Access keys can be created, deleted, made inactive, or made active.

Generating ...

1. Select `Security Credentials` (menu, top-left).
2. Scroll down to Access keys for CLI, SDK, and API access.
3. Click Create access key (be sure to save).

Using ...

`aws configure --profile iamadmin-general` (or -production).

1. Enter Access Key ID.
2. Enter Secret Access Key.
3. Enter us-east-1.
4. Default output format.

Test with `aws s3 ls --profile iamadmin-general`.
