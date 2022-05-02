# Infrastructure as Code (CloudFormation)

## CloudFormation Physical and Logical Resources

* CloudFormation Template - YAML or JSON.
* Templates contain **logical resources** - the "WHAT."
* Templates are used to create Stacks: 1 stack, 100 stacks in different regions.
* Stacks create **physical resources** from the logical.
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


