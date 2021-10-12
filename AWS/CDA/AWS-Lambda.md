# AWS Lambda

* Virtual Functions: no servers to manage.
* Time-limited, short executions.
* Run on-demand.
* Scaling is automated.
* Increasing RAM will also improve CPU and network.

## AWS Lambda language support

* Node.js (JavaScript)
* Python
* Java (Java 8 compatible)
* C# (.NET Core)
* Golang
* C# / Powershell
* Ruby
* Custom Runtime API (community supported, example Rust)

## AWS Lambda Pricing: example

Overall pricing information here: https://aws.amazon.com/lambda/pricing/

Pay per calls :

* First 1,000,000 requests are free
* $0.20 per 1 million requests thereafter ($0.0000002 per request)

Pay per duration: (in increment of 100ms)

* 400,000 GB-seconds of compute time per month if FREE
* = 400,000 seconds if function is 1GB RAM
* = 3,200,000 seconds if function is 128 MB RAM
* After that $1.00 for 600,000 GB-seconds

## Lambda – Synchronous Invocations

* Synchronous: CLI, SDK, API Gateway, Application Load Balancer
* Results is returned immediately
* Error handling must happen client side (retries, exponential backoff, etc…)

## Lambda - Synchronous Invocations - Services

User Invoked:

* Elastic Load Balancing (Application Load Balancer)
* Amazon API Gateway
* Amazon CloudFront (Lambda@Edge)
* Amazon S3 Batch

Service Invoked:

* Amazon Cognito
* AWS Step Functions

Other Services:

* Amazon Lex
* Amazon Alexa
* Amazon Kinesis Data Firehose

## Lambda – Asynchronous Invocations

* S3, SNS, CloudWatch Events…
* The events are placed in an Event Queue
* Lambda attempts to retry on errors

> 3 tries total

> 1 minute wait after 1st , then 2 minutes wait

* Make sure the processing is idempotent (in case of retries)
* If the function is retried, there will be duplicate logs entries in CloudWatch Logs
* Can define a DLQ (dead-letter queue) – SNS or SQS – for failed processing (need correct IAM permissions)
* Asynchronous invocations allow faster processing if there is no need to wait for the result (e.g. need 1000 files processed)

## Lambda - Asynchronous Invocations - Services

* Amazon Simple Storage Service (S3)
* Amazon Simple Notification Service (SNS)
* Amazon CloudWatch Events / EventBridge
* AWS CodeCommit (CodeCommit Trigger: new branch, new tag, new push)
* AWS CodePipeline (invoke a Lambda function during the pipeline, Lambda must callback)
* Amazon CloudWatch Logs (log processing)
* Amazon Simple Email Service
* AWS CloudFormation
* AWS Config
* AWS IoT
* AWS IoT Events

## Lambda@Edge

* Deployed a CDN using CloudFront.
* Wanted to run a global AWS Lambda alongside?
* Or, how to implement request filtering before reaching the application?
* For this, use Lambda@Edge: deploy Lambda functions alongside the CloudFront CDN.

Reasons to use ...

* Build more responsive applications.
* Not managing servers, Lambda is deployed globally.
* Customize the CDN content.
* Pay only for what is used.

## Lambda Execution Role (IAM Role)

* Grants the Lambda function permissions to AWS services / resources
* Sample managed policies for Lambda:

Roles

* `AWSLambdaBasicExecutionRole` – Upload logs to CloudWatch.
* `AWSLambdaKinesisExecutionRole` – Read from Kinesis.
* `AWSLambdaDynamoDBExecutionRole' – Read from DynamoDB Streams.
* ` AWSLambdaSQSQueueExecutionRole' – Read from SQS.
* ` AWSLambdaVPCAccessExecutionRole' – Deploy Lambda function in VPC.
* ` AWSXRayDaemonWriteAccess' – Upload trace data to X-Ray.

Notes

* When an event source mapping is used to invoke the function, Lambda uses the execution role to read event data.
* Best practice: create one Lambda Execution Role per function.

## Lambda Resource Based Policies

* Use resource-based policies to give other accounts and AWS services permission to use a Lambda resource.
* Similar to S3 bucket policies for S3 bucket.
* An IAM principal can access Lambda if the IAM policy attached to the principal authorizes it (e.g. user access).
* OR if the resource-based policy authorizes (e.g. service access).
* When an AWS service like Amazon S3 calls the Lambda function, the resource-based policy gives it access.

## Lambda Environment Variables

* Environment variable = key / value pair in “String” form.
* Adjust the function behavior without updating code.
* The environment variables are available to code.
* Lambda Service adds its own system environment variables as well.
* Helpful to store secrets (encrypted by KMS).
* Secrets can be encrypted by the Lambda service key, or CMK.

## Lambda Functions `/tmp` space

* If the Lambda function needs to download a big file to work.
* If the Lambda function needs disk space to perform operations ... can use the `/tmp` directory.
* Max size is 512MB.
* The directory content remains when the execution context is frozen, providing transient cache that can be used for multiple invocations (helpful to checkpoint work).
* For permanent persistence of object (non temporary), use S3.

## Lambda Function Dependencies

* If the Lambda function depends on external libraries: for example AWS X-Ray SDK, Database Clients, etc.
* Need to install the packages alongside the code and zip it together.
* For Node.js, use npm & “node_modules” directory.
* For Python, use `pip --target` options.
* For Java, include the relevant .jar files.
* Upload the zip straight to Lambda if less than 50MB, else to S3 first.
* Native libraries work: they need to be compiled on Amazon Linux.
* AWS SDK comes by default with every Lambda function.

## AWS Lambda Limits to Know - per Region

Execution:

* Memory allocation: 128 MB – 3008 MB (64 MB increments).
* Maximum execution time: 900 seconds (15 minutes).
* Environment variables (4 KB).
* Disk capacity in the “function container” (in `/tmp`): 512 MB.
* Concurrency executions: 1000 (can be increased).

Deployment:

* Lambda function deployment size (compressed .zip): 50 MB.
* Size of uncompressed deployment (code + dependencies): 250 MB.
* Can use the /tmp directory to load other files at startup.
* Size of environment variables: 4 KB.

## AWS Lambda Best Practices

* Perform heavy-duty work outside of the function handler
* Connect to databases outside of the function handler
* Initialize the AWS SDK outside of the function handler
* Pull in dependencies or datasets outside of the function handler

Use environment variables for:

* Database Connection Strings, S3 bucket, etc. ... do not put these values in code.
* Passwords, sensitive values… they can be encrypted using KMS.
* Minimize deployment package size to its runtime necessities.
* Break down the function if need be.
* Remember the AWS Lambda limits.
* Use Layers where necessary.
* Avoid using recursive code, never have a Lambda function call itself.

