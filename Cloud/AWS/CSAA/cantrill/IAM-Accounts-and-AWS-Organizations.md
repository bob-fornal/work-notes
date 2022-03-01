# IAM, Accounts, and AWS Organizations

## Identity Policies

They are a type of policy that gets attached to AWS identities and either `ALLOW` or `DENY` access to AWS resources.

* IAM Policy Document (JSON) has one or more `Statements`.

Statement ...

Action and Resource must match.

* Sid: Statement ID (optional field) to describe what it does.
* Effect
* Action
* Resource

`ALLOW` and `DENY` can be applied at the same time with an overlap; both statements are processed.

1. Explicit `DENY`.
2. Explicity `ALLOW`, unless explicitly `DENY` exists.
3. Default (IMPLICIT) `DENY`.

Policy Types ...

* **Inline Policies**: Policy applied to each account individually (change needs applied to each). Special or exceptional need to `ALLOW` or `DENY`.
* **Managed Policy**: Attached to any identities that should get the rights. They are reusable with low management overhead.

## IAM Users and ARNs

### IAM Users

**IAM Users** are an identity used for anything requiring **long-term** AWS access (example, humans, applications, or service accounts).

* Principal makes requests to IAM to interact with resources.
* Principal needs to **Authenticate** against an identity within IAM. Username/Password or Access Keys are used.
* Principal is now known as an **Authenticated Identity**.

Notes ...

* 5,000 IAM Users per Account.
* IAM Users can be a member of 10 groups.

These factors can have system design impact ...

* Internet scale applications.
* Large organizations or when organizations merge

IAM Roles and Identity Federation fix the system design impact issues.

### Amazon Resource Name

**Amazon Resource Name (ARN)** are used to uniquely identify resources within any AWS accounts.

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
5. Copy the signin link and open a Private Browser Tab or now Browser.
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
2. Groups can actually have policies attached (inline and managed).

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

Temporary Security Credential allow a role to be assumed: `sts:AssumeRole`.

## IAM Roles - When to Use

* AWS Services can **assume** Roles.

Examples ...

* Lambda Execution Role trusts AWS Lambda and provides permission via `sts:AssumeRole` to access resources.
* Emergency our unusual situations (Break Glass Situation). Emergency Role is assumed by a User (access is logged).
* Existing identities (i.e. Active Directory) with a company that has more than 5,000 identities. External accounts cannot be used in AWS directly. The Role is assumed and temporary credentials are generated for access.
* Application with unknown number of users. The application uses Web Identity Federation that uses IAM Roles. No AWS Credentials are stored within the application. Uses existing customer logins. Can scale, as needed.
* Cross Account access. Use a Role in the partner account that original account can assume.
