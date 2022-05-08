# Infrastructure as Code (CloudFormation)

## CloudFormation Physical and Logical Resources

* CloudFormation Template - YAML or JSON.
* Templates contain **logical resources** - the "WHAT."
* Templates are used to create Stacks: 1 stack or 100 stacks in different regions.
* Stacks create **physical resources** from the logical resources.
* If a stack template is changed, physical resources are changed.
* If a stack is deleted, normally the physical resources are deleted.

Resources ...

* Logical Resources (NAME) and (TYPE).
* Resource Properties are used by CloudFormation when creating the matching Physical Resources.
* CreateStack uses a template, parameters, and options to create a Stack.
* A Stack - creates, updates, and deletes physical resources based on logical resources in the template.
* Once a logical resource moves to `create_complete` (meaning the physical resource is active) it can be queried for attributes of the physical resource within the template.

## Demo: Non-Portable

1. The `BucketName` is not globally unique.
2. The `ImageId` is specific to a region.

```yaml
Resources:
  Bucket:
    Type: 'AWS::S3::Bucket'
    Properties:
      BucketName: 'accatpics13333337'
  Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      KeyName: 'A4L'
      InstanceType: 't2.micro'
      ImageId: 'ami-0f9fc25dd2506cf6d'
```

## CloudFormation Template Parameters and Pseudo Parameters

* Template Parameters accept input via console, CLI, or API when a stack is created or updated.
* Can be referenced from within Logical Resources and influence physical resources and/or configuration.
* Can be configured with Defaults, AllowedValues, Minimum and Maximum length, AllowedPatterns, NoEcho, and Type.
* Pseudo Parameters are similar to Template Parameters. They are provided by AWS based on the environment when creating the stack.

## CloudFormation Intrinsic Functions

* `Ref` and `Fn::GetAtt`
* `Fn::Join` and `Fn::Split`
* `Fn::GetAZs` and `Fn::Select`
* Conditions (`Fn::IF`, `And`, `Equals`, `Not`, and `Or`)
* `Fn::Base64` and `Fn::Sub`
* `Fn::Cidr`
* `Fn::ImportValue`, `Fn::FindInMap`, and `Fn::Transform`

`Ref` and `Fn::GetAtt` ...

* Physical attributes can be references in the template. The attributes depend on the resource type.
* `!Ref Instance`: Using `!Ref` on a template or pseudo parameters returns their value. When used with logical resources, the physical ID is usually returned.
* `!GetAtt LogicalResource.Attribute`: `!GetAtt` can be used to retrieve any attribute associated with the resource. Most logical resources return a detailed configuration of the physical resource.

`Fn::GetAZs` and `Fn::Select` ...

* `!GetAZs "us-east-1"` or `!GetAZs ""` (current region): Returns a list of AZs in the explicit region, or the current region. 
* The `Fn::Select` or `!Select` function returns an object from a list of objects. Lists start at index 0, meaning the first object.

   ```yaml
   AvailabilityZone: !Select [ 0, !GetAZs '' ]
   ```
* In this example, by using `!GetAZs` and `!Select`, a template can be made portable. Rather than explicitly specifying AZs, by using intrinsic functions, resources can be launched or created in AZs which are dynamically assigned from the available AZs at run time.

`Fn::Join` and `Fn::Split` ...

* `!Split [ "|", "roffle|truffles|penny|winkie" ]` becomes `[ "roffle", "truffles", "penny", "winkie" ]`.
* `!Join [ '', [ 'http://', !GetAtt Instance.DNSName ] ]` creates a Web URL running on an EC2 Instance created via CloudFormation.

`Fn::Base64` and `Fn::Sub` ...

* `UserData` requires base64 encoded data which is passed to the instance.
* `Fn::Base64` accepts plaintext and outputs Base64 encoded text.
* `FN::Sub` substitutes variables in the input, with their actual runtime values.

`Fn::Cidr` ...

* `Fn::Cidr` is used to generate several smaller CIDR ranges for subnets, from a larger VPC range.

```yaml
VPC:
  Type: AWS::EC2::VPC
  Properties:
    CidrBlock: "10.16.0.0/16"
Subnet1:
  Type: AWS::EC2::Subnet
  Properties:
    CidrBlock: !Select [ "0", !Cidr [ !GetAtt VPC.CidrBlock, "16", "12" ] ]
    VpcId: !Ref VPC
Subnet2:
  Type: AWS::EC2::Subnet
  Properties:
    CidrBlock: !Select [ "1", !Cidr [ !GetAtt VPC.CidrBlock, "16", "12" ] ]
    VpcId: !Ref VPC
```

## CloudFormation Mappings

Templates can contain a Mappings object ...

* Which contain many mappings.
* Which map keys to values, allowing lookup.

Notes ...

* Can have one key or Top and Second Level.
* Mappings use the `!FindInMap` intrinsic function.
* Common use-case: Retrieve AMI for given region and architecture.
* Improve Template Portability.

```yaml
!FindInMap [ MapName, TopLevelKey, <SecondLevelKey> ]
```

## CloudFormation Outputs

* Templates can have an *optional* Outputs section.

Values can be declared in this section ...

* Visible as outputs when using the CLI.
* Visible as outputs in the console UI.
* Accessible from a parent stack when using nesting.
* Can be exported, allowing cross-stack references.

## CloudFormation `Conditions`

* Created in the optional "Conditions" section of a template.
* Conditions are evaluated to TRUE or FALSE, processed before resources are created.
* Use the other intrinsic functions: `AND`, `EQUALS`, `IF`, `NOT`, `OR`.
* Associated with logical resources to control if they are created or not.
* Example, `ONEAZ`, `TWOAZ`, and `THREEAZ` - control how many AZs to create resources in.
* Example. `PROD`, `DEV` - control the size of instances created within a stack.

## CloudFormation `DependsOn`

* CloudFormation tries to be efficient, it does things in parallel (create, update, and delete).
* It tries to determine a dependency order (VPC, then Subnet, then EC2) using references for functions to create these.
* `DependsOn` allows the explicit definition of resources.

## CloudFormation `WaitCondition`, Creation Policy, and `cfn-signal`

### CloudFormation Provisioning

* Logical Resources in the template are used to create a Stack.
* It creates physical resources in AWS.
* Logical Resource `CREATE_COMPLETE` = All OK?

### CloudFormation Signal

* Configure CloudFormation to hold
* Wait for "N" number of success signals.
* Wait for "Timeout H:M:S" for those signals (12-hour maximum).
* If a success signal is received, then `CREATE_COMPLETE`.
* If a **failure** signal is received, then **creation fails**.
* If the timeout is reached, then **creation fails**.
* ... `CreationPolicy` or `WaitCondition`.

## CloudFormation Nested Stacks

Most Stacks are built from a single stack.

* Resources in a single stack share a lifecycle.
* Stack resource limit of 500.
* Cannot easily reuse resources.
* Cannot reference other stacks.

Root Stack and Parent Stack ...

* Parameters and Outputs.
* Reference Output that is made visible in the nested stack: `<Nested-Stack>.Outputs.<Parameter>`.
* Root Stack can take outputs of a nested stack as Parameters for another stack.
* Use when the stacks form part of one solution - **lifecycle linked**.

Notes ...

* Overcome the 500 Resource Limit of one stack.
* Modularizing templates; code reuse.
* Make the installation process easier.
* Nested stacks created by the root stack.
* **Use only when everything is lifecycle linked**.

## CloudFormation Cross-Stack References

* Service Oriented, different lifecyces, and Stack reuse.
* CloudFormation Stacks are designed to be isolated and self-contained.
* Outputs are normally **not visible** from ohter stacks.
* Nested stackes can reference them.
* Outputs can be exported, making them visibile from other stacks.
* Exports must have a unique name in the region.
* `Fn::ImportValue` can be used instead of `Ref`.

## CloudFormation StackSets

* Deploy CloudFormation Stacks across many accounts and regions.
* StackSets are containers in an admin account.
* StackSets contain stack instances whic reference stacks.
* Stack instances and stacks are in "target accounts."
* Each stack is in 1 region in 1 account.
* Security: **self-managed** or **service-managed**.

Notes ...

* The template for the stack set is a normal CloudFormation Template.
* Permissions granted via self-managed IAM Roles or service-managed within an Organization.
* StackSets gain access to Target Accounts and create stack instances and stacks.
* Term: Concurrent Accounts.
* Term: Failure Tolerance.
* Term: Retain Stacks.
* Scenario: Enable AWS Config.
* Scenario: AWS Config Rules - MFA, EIPS, EBS Encryption.
* Scenario: Create IAM Roles for cross-account access.

## CloudFormation Deletion Policy

* If a logical resource is **deleted** from a template, by default, the physical resource is **deleted**.
* This can cause data-loss.
* With deletion policy, a **Delete (Default), Retain, or (if supported) Snapshot can be defined on each resource.
* Snapshot: EBS Volume, ElastiCache, Neptune, RDS, and Redshift.
* Snapshots continue on past Stack lifetime - they have to be cleaned up or cost is incurred.
* **ONLY APPLIES TO DELETE ... NOT REPLACE**.

## CloudFormation Stack Roles

* When a stack is created, CloudFormation creates physical resources.
* CloudFormation uses the permissions of the logged in identity.
* This means that the logged in user needs permissions for AWS.
* CloudFormation can assume a role to gain the permissions.
* This allows for role separation.
* The identity creating the stack **doesn't need resource permissions, only PassRole**.

## CloudFormation Init (`cfn-init`)

* `AWS::CloudForamtion::Init` and `cfn-init`.
* Simple configuration management system.
* Configuration directives are stored in a template.
* `AWS::CloudFormation::Init` is part of a logical resource.
* Procedural - HOW (User Data) versus Desired State - WHAT (`cnf-init`).
* `cfn-init` helper script - installed on EC2 OS.

## CloudFormation `cfn-hup`

* `cfn-init` is run once as part of bootstrapping (user data).
* If `CloudForamation::Init` is updated it is not rerun.
* `cfn-hup` helper is a daemon which can be installed; it detects changes in resource metadata.
* It can run configurable actions when a change is detected.
* `UpdateStack` allows updating the configuration on EC2 Instances.
