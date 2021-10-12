# CloudFormation

That code would be deployed and create / update / delete our infrastructure

## What is CloudFormation?

CloudFormation is a declarative way of outlining AWS Infrastructure, for any resources (most of them are supported).

For example, within a CloudFormation template:

* Want a security group
* Want two EC2 machines using this security group
* Want two Elastic IPs for these EC2 machines
* Want an S3 bucket
* Want a load balancer (ELB) in front of these machines

Then CloudFormation creates these, in the right order, with the exact configuration that specified.

**Note:** This is an introduction to CloudFormation.

* The exam does not require the ability to write CloudFormation.
* The exam expects an understanding of how to read CloudFormation.

## Benefits of CloudFormation

### Infrastructure as code

* No resources are manually created, which is excellent for control.
* The code can be version controlled for example using Git.
* Changes to the infrastructure are reviewed through code.

### Cost

* Each resources within the stack is tagged with an identifier; easily visualize the cost of the stack.
* Estimate the costs of resources using the CloudFormation template.
* Savings strategy: In Dev, automatic deletion of templates at 5 PM and recreated at 8 AM, safely.

### Productivity

* Ability to destroy and re-create an infrastructure on the cloud on-the-fly.
* Automated generation of Diagram for templates.
* Declarative programming (no need to figure out ordering and orchestration).

Separation of concern: create many stacks for many apps, and many layers.

For Example ...

* PC stacks
* Network stacks
* App stacks

> Don’t re-invent the wheel

* Leverage existing templates on the web.
* Leverage the documentation.

## How CloudFormation works

* Templates have to be uploaded in S3 and then referenced in CloudFormation.
* To update a template, cannot edit previous ones. Re-upload a new version of the template to AWS.
* Stacks are identified by a name.
* Deleting a stack deletes every single artifact that was created by CloudFormation.

## Deploying CloudFormation templates

Manual

* Editing templates in the CloudFormation Designer.
* Using the console to input parameters, etc.

Automated

* Editing templates in a YAML file.
* Using the AWS CLI (Command Line Interface) to deploy the templates.
* Recommended way to fully automate the flow.

## CloudFormation Building Blocks

Templates components (one course section for each):

1. Resources: AWS resources declared in the template (MANDATORY)
2. Parameters: the dynamic inputs for the template
3. Mappings: the static variables for the template
4. Outputs: References to what has been created
5. Conditionals: List of conditions to perform resource creation
6. Metadata

Templates helpers:

1. References
2. Functions

## CloudFormation Resources

* Resources are the core of the CloudFormation template (MANDATORY).
* They represent the different AWS Components that will be created and configured.
* Resources are declared and can reference each other.
* AWS figures out creation, updates, and deletion of resources.
* There are over 224 types of resources.
* Resource types identifiers are of the form

  `AWS::aws-product-name::data-type-name`

Resource documentation:

* All the resources can be found here: http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html
* Example here (for an EC2 instance): http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html

## Analysis of CloudFormation Templates

Relevant documentation can be found here:

* http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html
* http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html
* http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-eip.html

## FAQ for resources

Can I create a dynamic amount of resources?

* No. Everything in the CloudFormation template has to be declared. Code generation cannot be performed there.

Is every AWS Service supported?

* Almost. Only a select few niches are not there yet.
* Can be worked around using AWS Lambda Custom Resources.

## CloudFormation Parameters

* Parameters are a way to provide inputs to AWS CloudFormation template.

They are important to know about if ...

* There is a need for template reuse.
* Some inputs can not be determined ahead of time.

More

* Parameters are extremely powerful, controlled, and can prevent errors from happening in templates thanks to types.
* AWS offers us pseudo parameters in any CloudFormation template.
* These can be used at any time and are enabled by default.

How to reference a parameter

* The `Fn::Ref` function can be leveraged to reference parameters.
* Parameters can be used anywhere in a template.
* The shorthand for this in YAML is `!Ref`.
* The function can also reference other elements within the template.

## CloudFormation Mappings

* Mappings are fixed variables within a CloudFormation Template.
* They are very handy to differentiate between different environments (dev vs prod), regions (AWS regions), AMI types, etc.
* All the values are hardcoded within the template.
* Use `Fn::FindInMap` to return a named value from a specific key.

## Mapping vs. Parameters?

Mappings are great when all the values are known in advance or can be deduced.

* Region
* Availability Zone
* AWS Account
* Environment (dev vs prod)

They allow safer control over the template.

Use parameters when the values are really user specific

## Cloud Formation Outputs

* The Outputs section declares optional outputs values that we can import into other stacks (if they are exported).
* Can also view the outputs in the AWS Console or in using the AWS CLI.
* It’s the best way to perform some collaboration cross stack, allowing the expert handle their own part of the stack.
* Cannot delete a CloudFormation Stack if its outputs are being referenced by another CloudFormation stack.

Outputs examples

* Creating a SSH Security Group as part of one template.
* Create an output that references that security group.

## Cross Stack Reference

* Use the `Fn::ImportValue` function

Cannot delete the underlying stack until all the references are deleted too.

## CloudFormation Conditions

Conditions are used to control the creation of resources or outputs based on a condition.

Conditions can be whatever they need to be, but common ones are:

* Environment (dev / test / prod)
* AWS Region
* Any parameter value

Each condition can reference another condition, parameter value or mapping.

## Defining Conditions

The intrinsic function (logical) can be any of the following:

* `Fn::And` and `Fn::Equals`
* `Fn::If`
* `Fn::Not`
* `Fn::Or`

Conditions can be applied to resources, outputs, etc.

## CloudFormation Intrinsic Functions

### `Fn::Ref`

The `Fn::Ref` function can be leveraged to reference

* Parameters => returns the value of the parameter
* Resources => returns the physical ID of the underlying resource (ex: EC2 ID)

The shorthand for this in YAML is `!Ref`

### `Fn::GetAtt`

* Attributes are attached to any resources created,
* To know the attributes of a resource, the best place to look at is the documentation.
* For example: the AZ of an EC2 machine

### `Fn::FindInMap`

* Use `Fn::FindInMap` to return a named value from a specific key.
* `!FindInMap [ MapName, TopLevelKey, SecondLevelKey ]`

### `Fn::ImportValue`

Import values that are exported in other templates

* Use the `Fn::ImportValue` function.

### `Fn::Join`

* Join values with a delimiter

### `Fn::Sub`

* `Fn::Sub`, or `!Sub` as a shorthand, is used to substitute variables from a text.
* String must contain `${VariableName}` and will substitute them.

### Condition Functions (`Fn::If`, `Fn::Not`, `Fn::Equals`, etc...)

The intrinsic function (logical) can be any of the following:

* `Fn::And`
* `Fn::Equals`
* `Fn::If`
* `Fn::Not`
* `Fn::Or`

## CloudFormation Rollbacks

### Stack Creation Fails

* Default: everything rolls back (gets deleted).We can look at the log
* Option to disable rollback and troubleshoot what happened

### Stack Update Fails:

* The stack automatically rolls back to the previous known working state
* Ability to see in the log what happened and error messages

## CloudFormation ChangeSets

* Determine what changes will occur for greater confidence.
* Does not mean it will succeed.

## CloudFormation Nested Stacks

* Allow isolation of repeated patterns.
* Only important to upper layer; not shared.

## CloudFormation StackSets

* Create, updated, or deleted stacks across multiple accounts and regions with a single operation.

## CloudFormation Drift

* Does not protect against manual configuration changes.
