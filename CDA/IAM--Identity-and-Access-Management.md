# IAM: Identity and Access Management

> IAM is a Global Service

When accessing AWS, the ROOT account should never be used. Users must be created with the proper permissions.

* **Users**: A physical person.
* **Groups**: Functions (admin, devops) Teams (engineering, design) which contain a group of users.
* **Roles**: Internal usage within AWS resources.
* **Policies** (JSON documents): Defines what each of the above can and cannot do. Use the principle of Least Privilege.

**Note**: IAM has predefined managed policies.

For enterprise:

* **IAM Federation**: Integrate their own repository of users with IAM using SAML standard.

## Policies

IAM policies define permissions for an action regardless of the method used to perform the operation.

## Policy types

### Identity-based policies

* Attach managed and inline policies to IAM identities (users, groups to which users belong, or roles).
* Identity-based policies grant permissions to an identity.

### Resource-based policies

* Attach inline policies to resources.
* The most common examples of resource-based policies are Amazon S3 bucket policies and IAM role trust policies.
* Resource-based policies grant permissions to a principal entity that is specified in the policy.
* Principals can be in the same account as the resource or in other accounts.

### Permissions boundaries

* Use a managed policy as the permissions boundary for an IAM entity (user or role). That policy defines the maximum permissions that the identity-based policies can grant to an entity, but does not grant permissions.
* Permissions boundaries do not define the maximum permissions that a resource-based policy can grant to an entity.

### Organizations SCPs

* Use an AWS Organizations service control policy (SCP) to define the maximum permissions for account members of an organization or organizational unit (OU).
* SCPs limit permissions that identity-based policies or resource-based policies grant to entities (users or roles) within the account, but do not grant permissions.

### Access control lists (ACLs)

* Use ACLs to control which principals in other accounts can access the resource to which the ACL is attached.
* ACLs are similar to resource-based policies, although they are the only policy type that does not use the JSON policy document structure.
* ACLs are cross-account permissions policies that grant permissions to the specified principal entity.
* ACLs cannot grant permissions to entities within the same account.

### Session policies

* Pass advanced session policies when using the AWS CLI or AWS API to assume a role or a federated user.
* Session policies limit the permissions that the role or user's identity-based policies grant to the session.
* Session policies limit permissions for a created session, but do not grant permissions.

## AWS Policy Simulator

When creating new custom policies test it here:

* https://policysim.aws.amazon.com/home/index.jsp
* This policy tool can save time in case a custom policy statement's permission is denied

Alternatively, use the CLI:

* Some AWS CLI commands (not all) contain `--dry-run` option to simulate API calls. This can be used to test permissions.
* If the command is successful, the message: `Request would have succeeded, but DryRun flag is set` is returned.
* Otherwise, the message: `An error occurred (UnauthorizedOperation) when calling the {policy_name} operation` is returned.

## Best practices:

* Never use the ROOT account except for initial setup.
* One IAM User per person ONLY.
* One IAM Role per Application.
* IAM credentials should NEVER be shared.
* Never write IAM credentials in code.
* Use access keys for programmatic access (CLI/SDK).
* Least Privilege Principle.
