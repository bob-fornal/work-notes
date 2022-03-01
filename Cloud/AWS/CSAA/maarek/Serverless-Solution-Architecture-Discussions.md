# Serverless Solution Architecture Discussions

## Mobile Application: MyTodoList

### Requirements

* Expose REST API with HTTPS.
* Serverless architecture.
* Users should be able to directly interact with their folder in S3.
* Users should authenticate through a managed serverless service.
* Users can write and read todos, but they mostly read them.
* The database should scale, and have some high read throughput.

### REST API Layer

1. Mobile Client - REST HTTPS - Amazon API Gateway
2. Amazon API Gateway - invoke - AWS Lambda
3. AWS Lambda - query - Amazon DynamoDB
4. Amazon Cognito - authenticate - Mobile Client
5. Amazon Cognito - verify authentication - Amazon API Gateway

### Giving users access to S3

1. Mobile Client - authenticate - Amazon Cognito
2. Amazon Cognito - generates temporary credentials - AWS STS
3. Mobile Client - store and retrieve files using permissions - Amazon S3

### High read throughput, static data

* AWS Lambda - query, read - DAX Caching layer - Amazon DynamoDB
* Could also cache at the API Gateway.

### Summary

* Serverless REST API: HTTPS, API Gateway, Lambda, DynamoDB.
* Using Cognito to generate temporary credentials with STS to access S3 bucket with restricted policy. Application users can directly access AWS resources this way. The pattern can be applied to DynamoDB, Lambda, ...
* Caching the reads on DynamoDB using DAX.
* Caching the REST requests at the API Gateway level.
* Security for authentication and authorization with Cognito, STS.

## Serverless Website: MyBlog.com

### Requirements

* This website should scale globally.
* Blogs are rarely written, but often read.
* Some of the website has purely static files, the rest is dynamic REST API.
* Caching must be implemented where possible.
* Any new users that subscribe should receive a welcome email.
* Any photo uploaded to the blog should have a thumbnail generated.

### Serving static content, globally

1. Client - interaction with edge locations - Amazon CloudFront Global distribution
2. Amazon CloudFront Global distribution - OAI - Amazon S3
3. Amazon S3 - Bucket Policy, only authorized from OAI.

OAI = Origin Access Identity

### Adding a public serverless REST API

1. Client - REST HTTPS - Amazon API Gateway
2. Amazon API Gateway - invoke - AWS Lambda
3. AWS Lambda - query, read - DAX Caching layer - Amazon DynamoDB

### Leveraging DynamoDB Global Tables

* Amazon DynamoDB Global Tables

### User Welcome Email Flow

1. Amazon DynamoDB - stream changes - DynamoDB Stream
2. DynamoDB Stream - invoke - AWS Lambda
3. AWS Lambda (with IAM Role) - SDK to send email - Amazon Simple Email Service (SES)

### Thumbnail Generation Flow

1. Client - interaction with edge locations - Amazon CloudFront Global distribution
2. Amazon CloudFront Global distribution - OAI - Amazon S3
3. Amazon S3 - Bucket Policy, only authorized from OAI.
4. Amazon S3 - trigger - AWS Lambda
5. AWS Lambda - thumbnail - Amazon S3

### Summary

* Static content being distributed using CloudFront with S3.
* The REST API was serverless, did not need Cognito because it is public.
* Leveraged a Global DynamoDB table to serve the data globally.
* (could have used Aurora Global Database - not serverless)
* Enabled DynamoDB streams to trigger a Lambda function.
* SES (Simple Email Service) was used to send emails in a serverless way.
* S3 can trigger SQS, SNS, or Lambda to notify of events.

## Micro Services Architecture

* Want to switch to micro-service architecture.
* Many services interact with each other directly using a REST API.
* Each architecture for each micro-service may vary in form and shape.
* A micro-service provides a leaner development lifecycle for each service.

### Discussions

* **Developer is free to design each micro-service the way they want**.
* Synchronous patterns: API Gateway, Load Balancers.
* Asynchronous patterns: SQSm Kinesis, SNS, Lambda triggers (S3).

Challenges with micro-services ...

* Repeated overhead for creating each new micro-service.
* Issues with optimizing server density and utilization.
* Complexity of running multiple versions of multiple micro-services simultaneously.
* Proliferation of client-side code requirements to integrate with many separate services.

Some of the challenges are solved with Serverless patterns ...

* API Gateway, Lambda scale automatically and it is pay-per-usage.
* Clone an API, reproducing environments.
* Generated client SDK through Swagger integration for the API Gateway.

## Distributing Paid Content

### Requirements

The client sells videos online and users have to pay to buy videos.

* Each video can be purchased by different customers.
* Only want to distribute videos to users who are premium users.
* Have a database of premium users.
* Links sent to premium users should be short-lived.
* The application is global.
* The application should be fully serverless.

### Simple, Premium User Service

1. Client - REST HTTPS - Amazon API Gateway
2. Amazon API Gateway - invoke - AWS Lambda
3. AWS Lambda - query, read - Amazon DynamoDB (Tables of users and who is premium)

### Add Authentication

1. Client - authenticate - Amazon Cognito
2. Amazon Cognito - verify authentication - Amazon API Gateway

### Distribute Globally and Securely

* Amazon CloudFront - OAI - Amazon S3 (Bucket Policy: Only authorize from OAI)

### Use Signed URL

1. Amazon Cognito - verify authentication - Amazon API Gateway (second)
2. Client - Query for URL - Amazon API Gateway (second)
3. Amazon API Gateway (second) - invoke - AWS Lambda (second)
4. AWS Lambda (second) - verify premium user - Amazon DynamoDB

IF PREMIUM ...

5. AWS Lambda (second) - generate Signed URL - Amazon CloudFront Global distribution
6. AWS Lambda - returns Signed URL - Amazon API Gateway (second)
7. Amazon API Gateway (second) - returns Signed URL - Client

### Summary

Implemented a fully serverless solution.

* Cognito for authentication.
* DynamoDB for storing users that are premium.
* Two serverless applications: Premium User Registration and CloudFront Signed URL Generator.
* Content is stored in S3 (serverless and scalable).
* Integrated with CloudFront with OAI for security (users can not bypass).
* CloudFront can only be used using Signed URLs to prevent unauthorized users.
* What about S3 Signed URLs? They are not efficient for global access.

## Software Update Distribution

### Requirements

* An application is running on EC2, that distributes software updates once in a while.
* When a new software update is out, there are a lot of requests, and the content is distributed en-mass over the network. This is very costly.
* Without changing the application, can the costs and CPU be optimized?

### Current State

* Classic ALB - Auto Scaling Group across three AZ with various EC2.
* Application is stored in an Amazon Elastic File System.

### Fix

* Place Amazon CloudFront before the ALB.

### Summary

Why CloudFront?

* No changes to the architecture.
* Will cache software updates at the edge.
* Software update files are not dynamic, they are static (never changing).
* The EC2 Instances are not serverless.
* CloudFront is serverless and will scale.
* The ASG will not scale as much and there will be tremendous savings in EC2.
* Also save in availability, network bandwidth cost, etc.
* Easy way to make an existing application more scalable and cheaper.

## Big Data Ingestion Pipeline

### Requirements

* Want the ingestion pipleine to be fully serverless.
* Want to collect data in real-time.
* Want to transform the data.
* Want to query the transformed data using SQL.
* The reports created using the queries should be in S3.
* Want to load that data into a warehouse and create dashboards.

### Pipeline

1. IoT Devices - real-time - Amazon Kinesis Data Streams
2. Amazon Kinesis Data Streams - every minute - Amazon Kinesis Data Firehose
3. Amazon Kinesis Data Firehose - cleanse data - AWS Lambda
4. Amazon Kinesis Data Firehose - ingestion - Amazon S3 Ingestion Bucket
5. Amazon S3 - (optional) Amazon SQS
6. (optional) Amazon SQS - AWS Lambda
7. AWS Lambda - trigger - Amazon Athena (pull data from Ingestion Bucket)
8. Amazon Athena - Amazon S3 Reporting Bucket
9. a. Amazon S3 Reporting Bucket - directly - Amazon QuickSight
9. b. Amazon S3 Reporting Bucket - directly - Amazon Redshift (not serverless)

### Summary

* IoT Core allows harvesting data from IoT Devices.
* Kinesis is great for real-time data collection.
* Firehose helps with data delivery to S3 in near-real-time (1-minute).
* Lambda can help Firehost with data transformations.
* Amazon S3 can trigger notifications to SQS.
* Lambda can subscribe to SQS (could have connected S3 to Lambda).
* Athena is a serverless SQL service and results are stored in S3.
* The Reporting Bucket contains analyzed data and can be used by reporting tools such as AWS QuickSight, Redshift, etc. ...
