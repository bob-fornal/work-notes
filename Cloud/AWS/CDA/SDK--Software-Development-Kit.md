# SDK: Software Development Kit

To perform actions on AWS directly from application code without using a CLI, use an SDK.

## Official SDKs

* Java
* .NET
* Node.js
* PHP
* Python
* Ruby
* C++

## SDK Takeaways

* AWS SDK are required when coding against AWS Services such as DynamoDB.
* Fact: AWS CLI uses the Python SDK (boto3).
* If default Region is not specified, then `us-east-1` will be chosen by default.

## SDK Credentials Security

* It is recommend to use the default credential provider chain.

The default credential provider chain works seamlessly with

* AWS credentials at `~/.aws/credentials` (only on our computers or on premise).
* Instance Profile Credentials using IAM Roles (for EC2 machines, etc.)
* Environment variables (`AWSACCESSKEYID`, `AWSSECRETACCESSKEY`)
* Overall, NEVER store AWS credentials in code.
* Use IAM Roles if working from within AWS Services to inherit credentials.

## Exponential Backoff

* Any API that fails because of too many calls needs to be retried with Exponential Backoff.
* These apply to rate limited API.
* Retry mechanism is included in SDK API calls.
