# Advanced Identity

## STS: Security Token Service

Granting limited, temporary access to AWS resources, up to 1-hour.

* `AssumeRole` (within or cross-account).
* `AssumeRolwWithSAML` (SAML credentials).
* `AssumeRolwWithWebIdentity` (credentials for Identity Provider users, should use Cognito instead).
* `GetSessionToken` (MFA).
* `GetFederationToken` (temporary credentials for federated users).
* `GetCallderIdentity` (user and role information).
* `DecodeAuthorizationMessage` (decode error message when AWS API is denied).

### STS Assume Role

* Define an IAM Role within account or cross-account.
* Define which principals can access the IAM Role.
* Use AWS STS to retrieve credentials and impersonate the IAM Role (`AssumeRole` API).
* Temporary credentials (15-60 minutes).

### STS with MFA

* Use `GetSessionToken` from STS.
* Appropriate IAM policy using `IAMConditions`.
* `aws:MultiFactorAuthPresent:true`

## Advanced IAM

Authorization Model Policy Evaluation

1. If there is an explicit DENY, done.
2. If there is an ALLOW, done.
3. Else, DENY.

### IAM Policies and S3 Bucket Policies

* IAM Policies attached to Users, Roles, and Groups.
* S3 Bucket Policies attached to Buckets.
* Union of assigned Policies evaluated.

### Dynamic Policies

* Use special policy variables to make it dynamic.

### Inline versus Managed Policies

#### AWS Managed Policies

#### Customer Managed Policies

* Version controlled, central change mangement.

#### Inline

* Strict one-to-one between policy and principal.
* Deleted with IAM Principal.

### Granting User Permission to Pass a Role to an AWS Service

* Need the IAM permission `iam:PassRole`.
* Often used with `iam:GetRole`.

Can any Role be passed to any Service?

* NO. Roles can only be passed based on what their **trust** allows.

## Delivery Services

* AWS Managed Microsoft AD (in AWS, establish trust to on-prem).
* AD Connector (gateway proxy on-prem).
* Simple AD (cannot be joined on-prem).


