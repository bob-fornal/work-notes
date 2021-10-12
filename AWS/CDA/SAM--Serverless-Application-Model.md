# SAM: Serverless Application Model

Framework for developing and deploying serverless applications.

* Generate complex CloudFormation from simple SAM YAML files.
* Support anything CloudFormation supports.

## Recipe

* `Transform` header indicates SAM.

### Write Code

* `AWS::Serverless::Function`
* `AWS::Serverless::Api`
* `AWS::Serverless::SimpleTable`

### Package and Deploy

```script
> aws cloudformation package
> sam package

> saw cloudformation deploy
> sam deploy

> aws cloudformation build
> sam build
```