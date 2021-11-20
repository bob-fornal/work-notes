# CLI: Command Line Interface

Add user credentials locally using this command:

```script
$ aws configure
```

When using multiple AWS accounts, add custom profiles with seperate credentials using this command ...

```script
$ aws configure --profile {my-other-aws-account}
```

To execute commands on a specific profile ...

* example: `aws s3 ls --profile {my-other-aws-account}`

When not specifying the AWS profile, the commands will be executed to the default profile

## AWS CLI on EC2

* IAM roles can be attached to EC2 instances.
* IAM roles can come with a policy authorizing exactly what the EC2 instance should be able to do. This is the best practice.
* EC2 Instances can then use these profiles automatically without any additional configurations.

## CLI STS Decode Errors

* When API calls fail, a long, encoded error message code is returned.
* This error can be decoded using STS via `aws sts decode-authorization-message --encoded-message {encoded_message_code}`.
* The IAM user must have the correct permissions to use this command by adding the STS service to the user policy.

