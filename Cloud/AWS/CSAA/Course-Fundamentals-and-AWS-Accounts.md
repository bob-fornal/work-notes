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

Factors = Different pieces of evidence which prove identity.

More factors generally means more security and is harder to fake.

* Usernames and Passwords - If leaked, anyone can use the account.
* Knowledge - Something that is known, usernames and passwords.
* Possession - Something that is owned, MFA device or application.
* Inherent - Something about an individual ... fingerprint, face, voice, or iris.
* Location - A location (physical), which network (corporate or wifi).

## Securing an AWS Account

AWS Account Root User ...

* Username and Password is not enough to secure this account.
* Update `Security Credentials` (menu, top-right) to include MFA.

## Creating a Budget

* Select `Billing Dashboard` (menu, top-right).
* Select `Billing Preferences` (left side) and check all boxes.

### Cost Budget

* Select `Create a Budget`.
* Select Enable Cost Explorer, then Launch Cost Explorer.
* From the original page, create a Cost Budget.
