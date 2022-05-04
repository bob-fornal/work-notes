# Infrastructure as Code (CloudFormation)

## CloudFormation Physical and Logical Resources

* CloudFormation Template - YAML or JSON.
* Templates contain **logical resources** - the "WHAT."
* Templates are used to create Stacks: 1 stack, 100 stacks in different regions.
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
