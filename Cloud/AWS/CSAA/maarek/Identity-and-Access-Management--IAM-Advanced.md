# Identity and Access Management (IAM) Advanced

## AWS STS - Security Token Service

**Can grant limited and temporary access to AWS resources**.

* Token is valid for up to one hour (must be refreshed).

### `AssumeRole`

* Within an account, for enhanced security.
* Cross-Account Access: Assume a role in the target account to perform actions there.

### `AssumeRoleWithSAML`

* Return credentials for users logged in with SAML.

### `AssumeRoleWithWebIdentity`

* Returns credentials for users logged in with an Identity Provider (IdP) (Facebook Login, Google Login, OIDC compatible, ...).
* AWS recommends against using this and using **Cognito** instead.

### `GetSesstionToken`

* For MFA, from a user or AWS account root user.

### Using STS to Assume a Role

* Define an IAM Role within an account or cross-account.
* Define which principals can access this IAM Role.
* Use AWS STS to retrieve credentials and impersonate the IAM Role (`AssumeRole` API).
* Temporary credentials can be valid between 15 minutes and 1 hour.

## Identity Federation in AWS

Federation lets users outside AWS assume temporary roles for accessing AWS resources.

**Using federation, do not need to create IAM USERS (user management is outside of AWS)**.

* These users assume identity-provided access roles.

Federations can have many flavors ...

* SAML 2.0
* Custom Identity Broker
* Web Identity Federation with Amazon Cognito
* Web Identity Federation without Amazon Cognito
* Single Sign-On
* Non-SAML with AWS Microsoft AD

### SAML 2.0 Federation

* To integrate Active Directory, ADFS with AWS (or any SAML 2.0).
* Provides access to AWS Console or CLI (through temporary credentials).
* No need to create an IAM user for each employee.

Summary ...

* Need to set up a trust between AWS IAM and SAML (both ways).
* SAML 2.0 enabled web-based, cross-domain SSO.
* Uses the STS API, `AssumeRoleWithSAML`.

Note ...

* Federation through SAML is the "old way" of doing things.
* **Amazon Single Sign On (SSO)** Federation is the new managed and simpler way.

### SAML 2.0 Federation - Active Directory FS

* Same process as with any SAML 2.0 compatible IdP.

### Custom Identity Broker Application

* Use only if the identity provider is not compatible with SAML 2.0.
* **The identity broker must determine the appropriate IAM policy**.
* Uses the STS API, `AssumeRole` or `GetFederationToken`.

## Web Identity Federation - `AssumeRoleWithWebIdentity`

* Not recommended by AWS - use Cognito instead (allows for anonymous users, data synchronization, MFA).

## AWS Cognito

Goal ...

* Provide direct access to AWS Resources from the Client-Side (mobile or web application).

Example ...

* Provide (temporary) access to write to S3 bucket using Facebook Login.

Problem ...

* Do not want to create IAM users for our application users.

Solution ...

* Login to federated identity provider - or remain anonymous.
* Get temporary AWS credentials back from the Federated Identity Pool.
* These credentials come with a pre-defined IAM policy stating their permissions.

## Directory Services - Overview

What is Microsoft Active Directory (AD)?

* Found on any Windows Server with AD Domain Services.
* Database of **objects**: User Accounts, Computers, Printers, File Shares, Security Groups.
* Centralized security management, create accounts, assign permissions.
* Objects are organized into **trees**.
* A group of trees is a **forest**.

### AWS Directory Services

#### AWS Managed Microsoft AD

* Create an AD in AWS, manage users locally, supports MFA.
* Establish a "trust" connection with on-premise AD.

#### AD Connector

* Directory Gateway (proxy) to redirect to on-premise AD.
* Users are managed in the on-premise AD.

#### Simple AD

* AD-compatible managed directory on AWS.
* Cannot be joined with on-premise AD.

## Organizations - Overview

* Global service.
* Allows management of multiple AWS accounts.
* The main account is the master account - cannot be changed.
* Other accounts are member accounts.
* Member accounts can only be part of one organization.
* Consolidated Billing across all accounts - single payment method.
* Pricing benefits from aggregated usage (volume discounts for EC2, S3, ...).
* API is available to automate AWS account creation.

### Multi-Account Strategies

* Create accounts per **department**, per **cost center**, per **dev, test, prod**, based on **regulatory restrictions** (using SCP), for **better resource isolation (example: VPC)**, to have **separate per-account service limits**, and isolated account for **logging**.
* Multi-Account versus One Account Multi VPC.
* Use tagging standards for billing purposes.
* Enable CloudTrail on all accounts, send logs to a central S3 account.
* Send CloudWatch Logs to central logging account.
* Establish Cross-Account Roles for Administration purposes.

OU = Organizational Unit

### Service Control Policies (SCP)

* Whitelist or blacklist IAM actions.
* Applied at the **OU** or **Account** level.
* Does not apply to the Master Account.
* SCP is applied to all the **Users and Roles** of the Account, including Root.
* SCP must have an explicit Allow (does not allow anything by default).
* The SCP does not affect service-linked roles.
* Service-linked roles enable other AWS services to integrate with AWS Organizations and cannot be restricted by SCPs.
* **Use cases**: Restrict access to certain services or enforce PCI compliance by explicitly disabling services.

### AWS Organization - Moving Accounts

To migrate accounts from one organization to another.

1. Remove the member account from the old organization.
2. Send an invite to the new organization.
3. Accept the invite to the new organization from the member account.

To migrate the master account from one organization to another.

1. Remove the member account from the organization *as listed above*.
2. Delete the old organization.
3. Repeat the process above to invite the old master account to the new organization.

## IAM - Advanced

### IAM Conditions

**aws:SourceIp**: Restrict the client IP **from** which the API calls are being made.

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Deny",
    "Action": "*",
    "Resource": "*",
    "Condition": {
      "NotIpAddress": {
        "aws:SourceIp": [
          "192.0.2.0/24",
          "203.0.113.0/24"
        ]
      }
    }
  }
}
```

**aws:RequestedRegion**: Restrict the region the API calls are made **to**.

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Sid": "AllowOnlyInsideEU",
    "Effect": "Allow",
    "Action": [
      "ec2:*",
      "rds:*",
      "dynamodb:*"
    ],
    "Resource": "*",
    "Condition": {
      "StringEquals": {
        "aws:RequestedRegion": [
          "eu-central-1",
          "eu-west-1"
        ]
      }
    }
  }
}
```

**Restrict based on tags**

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Sid": "StartStopIfTags",
    "Effect": "Allow",
    "Action": [
      "ec2:StartInstances",
      "ec2:StopInstances",
      "ec2:DescribeTags"
    ],
    "Resource": "arn:aws:ec2:region:account-id:instance/*",
    "Condition": {
      "StringEquals": {
        "ec2:ResourceTag/Project": "DataAnalytics",
        "aws:PrincipalTag/Department": "Data"
      }
    }
  }
}
```

**Force MFA**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowActionsForEC2",
      "Effect": "Allow",
      "Action": "ec2:*",
      "Resource": "*"
    },
    {
      "Sid": "DenyStopAndTerminateWhenMFAIsNotPresent",
      "Effect": "Deny",
      "Action": [
        "ec2:StopInstances",
        "ec2:TerminateInstances"
      ],
      "Resource": "*",
      "Condition": {
        "BoolIfExists": { "aws:MultiFactorAuthPresent": false }
      }
    }
  ]
}
```

### IAM for S3

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": ["arn:aws:s3:::test"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": ["arn:aws:s3:::test/*"]
    }
  ]  
}
```

* The first statement is a **bucket-level permission**.
* The second statement is `GetObject`, `PutObject`, and `DeleteObject` that apply to all objects within the bucket and is an **object-level permission**.

### IAM Roles versus Resource-Based Policies

* When assuming a role (user, application, or service), original permissions are given up and permissions assigned to the role are then taken.
* When using a resource-based policy, the principal does not have to give up his permissions.

## IAM - Policy Evaluation Logic

### IAM Permission Boundaries

* IAM Permission Boundaries are supported for users and roles (not groups).
* Advanced feature to use a managed policy to set the maximum permissions an IAM entity can get.
* Can be used in combinations of AWS Organizations SCP.

### IAM Policy Evaluation Logic

![Current Logic Map](https://docs.aws.amazon.com/IAM/latest/UserGuide/images/PolicyEvaluationHorizontal111621.png)

[SEE DOCUMENTATION](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)

1. Deny evaluation.
2. Organizations SCPs.
3. Resource-based policies.
4. IAM permissions boundaries.
5. Session policies.
6. Identity-based policies.

## Resource Access Manager (RAM)

Allows sharing of AWS resources that are owned with other AWS accounts.

* Share with any account or within an Organization.
* Avoid resource duplication.

VPC Subnets ...

* Allow access to all the resources launched in the same subnets.
* Must be from the same AWS Organizations.
* Cannot share security groups and default VPC.
* Participants can manage their resources in the VPC.
* Participants cannot view, modify, or delete resources that belong to other participants or the owner.

Also ...

* AWS Transit Gateway
* Route53 Resolver Rules
* License Manager Configurations

## AWS Single Sign-On (SSO)

Centrally manage Single Sign-On to access **multiple accounts** and **3rd-party business applications**.

* Integrated with **AWS Organizations**.
* **Supports SAML 2.0** markup.
* Integrateion with on-premise **Active Directory**.
* Centralized permission management.
* Centralized auditing with CloudTrail.
