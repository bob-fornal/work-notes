# IAM, Accounts, and AWS Organizations

## Identity Policies

They are a type of policy that gets attached to AWS identities and either `ALLOW` or `DENY` access to AWS resources.

* IAM Policy Document (JSON) has one or more `Statements`.

Statement ...

Action and Resources must match.

* Sid: Statement ID (optional field) to describe what it does.
* Effect
* Action
* Resource

`ALLOW` and `DENY` can be applied at the same time with an overlap; both statements are processed.

1. Explicit `DENY`.
2. Explicity `ALLOW`, unless explicitly `DENY` exists.
3. Default (IMPLICIT) `DENY`.

Policy Types ...

* **Inline Policies**: Policy applied to each account individually (change needs to be applied to each). Special or exceptional need to `ALLOW` or `DENY`.
* **Managed Policy**: Attached to any identities that should get the rights. They are reusable with low management overhead.

## IAM Users and ARNs

### IAM Users

**IAM Users** are an identity used for anything requiring **long-term** AWS access (for example, humans, applications, or service accounts).

* Principal makes requests to IAM to interact with resources.
* Principal needs to **Authenticate** against an identity within IAM. Username/Password or Access Keys are used.
* Principal is now known as an **Authenticated Identity**.

Notes ...

* 5,000 IAM Users per Account.
* IAM Users can be a member of 10 groups.

These factors can have a system design impact ...

* Internet-scale applications.
* Large organizations or when organizations merge

IAM Roles and Identity Federation fix the system design impact issues.

### Amazon Resource Name

**Amazon Resource Name (ARN)** is used to uniquely identify resources within any AWS accounts.

```script
arn:partition:service:region:account-id:resource-id
arn:partition:service:region:account-id:resource-type/resource-id
arn:partition:service:region:account-id:resource-type:resource-id
```

Bucket (naming is globally unique) ...

```script
arn:aws:s3:::catgifs
```

Objects in the bucket ...

```script
arn:aws:s3:::catgifs/*
```

## DEMO: Simple Identity Permissions in AWS

1. Go to CloudFormation Console.
2. Click the **Create stack** button.
3. Click **Upload a template file** and **Choose file**.
4. Select the file and click the **Next** button.
5. Enter a Stack Name and complete parameters.
6. Click the **Next** button.
7. Click the **Next** button.
8. At the bottom, check the acknowledge.
9. Click the **Create stack** button.

IAM Users ...

1. Go to IAM Console.
2. Click the **Users** link on the left side.
3. Click "Sally" ...
4. Click the **Dashboard** link on the left side.
5. Copy the sign in link and open a Private Browser Tab or now Browser.
6. Enter the username from the Stack Outputs.
7. Enter the password entered previously.
8. Change the password when asked.

## IAM Groups

IAM Groups are containers for Users.

IAM Groups are not a true identity. They cannot be referenced as a principal in a policy.

* Used solely for making managing groups of users easier.
* No native All Users group.
* No nesting of groups.

1. Effective administrative style of groups of users.
2. Groups can have policies attached (inline and managed).

## DEMO: Permission control using IAM Groups

1. Go to IAM Console.
2. Select User Groups from the left side.
3. Click the **Create group** button.
4. Enter a name, select users to add, and attach policies.
5. Click the **Create group** button.

## IAM Roles - The Tech

* A Role is one type of identity that exists inside an AWS Account. The other type is an IAM User.
* Authenticated and Authorized can access AWS Resources.
* Single Principal, think IAM User.
* Multiple Principals (inside or outside of the account), think IAM Role.
* IAM Roles are **assumed** (temporary) ... principals become that role.

Types of Policies that can be attached ...

* Trust Policy
* Permissions Policy

Temporary Security Credential allows a role to be assumed: `sts:AssumeRole`.

## IAM Roles - When to Use

* AWS Services can **assume** Roles.

Examples ...

* Lambda Execution Role trusts AWS Lambda and provides permission via `sts:AssumeRole` to access resources.
* Emergency our unusual situations (Break Glass Situation). Emergency Role is assumed by a User (access is logged).
* Existing identities (i.e. Active Directory) with a company that has more than 5,000 identities. External accounts cannot be used in AWS directly. The Role is assumed and temporary credentials are generated for access.
* Application with an unknown number of users. The application uses Web Identity Federation that uses IAM Roles. No AWS Credentials are stored within the application. Uses existing customer logins. Can scale, as needed.
* Cross-Account access. Use a Role in the partner account that the original account can assume.

## AWS Organizations

Take a single AWS Account (Standard AWS Account) that is not within an Organization.

* Standard Account creates an Organization, this becomes a Management Account (or Master Account).
* Can invite other existing Standard Accounts. They need to approve joining the Organization. They become Member Accounts.
* One Management Account and zero or more Member Accounts.
* There is an Organization Root, just a container that can contain AWS Accounts and Organizational Units. It can also contain other Organizational Units.
* Consolidated billing; Member Accounts pass their bills through to the Management Account (or Payer Account). Consolidation of reservations and volume discounts.
* Management Account can also create new Accounts directly within it. Need a unique email address; there is no invitation process.

Best Practice ...

* Single login to access all Member Accounts via Roles (Role Switch).
* Account separate from Management Account should be used.

## DEMO: AWS Organizations

Accounts will be created within the AWS Organization. UI Role Switching or CLI Roles will be used to access Member Accounts. The Management Account is the store of identities.

Create an Organization ...

1. Go to AWS Organizations Console.
2. Click the **Create an organization** button.
3. Go to the associated Email and **Verify your email address**, following the associated steps.

Add an Account to an Organization ...

1. Obtain the Account ID from the account to be added.
2. Click on the **Add an AWS Account** button.
3. Select "Invite an existing AWS Account", paste the Account ID, and click the **Send Invitation** button.
4. In the invited account, go to AWS Organizations Conole.
5. Click the **View 1 invitation** button.
6. Click the **Accept invitation** button and the account is now joined to the organization.

Add Role to the Account for Role Switching ...

1. Go to the IAM Console.
2. Click on Roles on the left side.
3. Click on the **Create role** button.
4. Select **AWS Account** as a trusted entity.
5. 

Create an Account within an Organization ...

1. Obtain the Account ID from the original account.
2. Click on the **Add an AWS Account** button.
3. Select "Create an AWS account", add an account name and Email address, and click the **Send Invitation** button.
4. Click the **Create AWS Account** button.
5. Select "Another Account" and paste the Account ID.
6. Click the **Next** button.
7. Select "AdministratorAccess" and then click the **Next** button.
8. Enter "OrganizationAccountAccessRole" for the Role name.
9. Click the **Create role** button.

Set Up Role Switching ...

1. Obtain the Account ID for Development or Production.
2. Click the **Switch Roles** button on the account menu.
3. Click the **Switch Role** button.
4. Enter Account ID, Role, Display Name, and Color.
5. Click the **Switch role** button.

## Service Control Policies (SCPs)

* SCPs can be applied to the organization, Organizational Units, or individual accounts.
* Member Accounts can be affected; the Management Account cannot.
* SCPs do not GRANT any permissions. They just control what an account CAN and CAN NOT grant via identity policies.

Allow List and Deny List ...

`FullAWSAccess`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```

`DenyS3`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Deny",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}
```

1. Remove `FullAWSAccess`.
2. `AllowS3EC2`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*",
        "ec2:*",
      "Resource": "*"
    }
  ]
}
```

* Where Identity Policies and SCP overlap are the allowed accesses.

## DEMO: Using Service Control Policies

1. Go to Organizations Console.
2. Check the **Root**, then click the **Actions** button, and **Create new** from the menu.
3. Name the Organizational Unit (OU), then click the **Create organizational unit** button.
4. Check the Account to place into the OU, then click the **Actions** button, and **Move** from the menu.
5. Select the OU, then click the **Move AWS account** button.

## CloudWatch Logs

A **Public Service** and is usable from AWS or on-premises.

* Store, monitor, and access logging data.
* **AWS Integrations** with EC2, VPC Flow Logs, Lambda, CloudTrail, Route53, and more.
* Can generate metrics based on logs; called a **metric filter**.

## CloudTrail

A product that logs API actions that affect an AWS Account.

* Logs API calls or account activities as a **CloudTrail Event**.
* Stored the last 90-days by default in the **Event History**.
* Enabled by default, not cost for 90-days of history.
* To customize the service create one or more Trails.
* There are two types of trails, Management Events, and Data Events.

Notes ...

* CloudTrail is enabled by default, only 90-days of Event History and no S3 storage.
* Trails are how you configure storage in S3 or CloudWatch Logs.
* Management Events only, by default.
* IAM, STS, and CloudFront log their data as Global Service Events.
* It is **not real-time**, there is a delay.

## DEMO: Implementing an Organizational Trail

1. Go to the CloudTrail Console.
2. Click the **Trails** option on the left menu.
3. Click the **Create trail** button.
4. Enter a name for the trail and enable it for all accounts.
5. Click the **Next** button.
6. Click the **Next** button.
7. Click the **Create trail** button.
