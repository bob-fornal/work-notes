# Serverless Overviews from a Solution Architect Perspective

## What is Serverless?

Serverless is a new paradigm in which developers do not have to manage servers anymore.

* Developers just deploy code.
* Developers just deploy ... functions.
* Initially, Serverless was Function as a Service (Faas).
* Serverless was pioneered by AWS Lambda but now also includes anything that is managed: "databases, messaging, storage, etc."
* **Serverless does not mean that there are no servers**; it means the developers do not manage, provision, or see them.

### Serverless in AWS

* AWS Lambda
* DynamoDB
* AWS Cognito
* AWS API Gateway
* Amazon S3
* AWS SNS and SQS
* AWS Kinesis Data Firehose
* Aurora Serverless
* Step Functions
* Fargate

## Lambda Overview

Amazon EC2 ...

* Virtual Servers in the Cloud.
* Limited by RAM and CPU.
* Continuously running.
* Scaling means intervention to add and remove servers.

Amazon Lambda ...

* Virtual **functions** - no servers to manage.
* Limited by time - **short executions**.
* Run **on-demand**.
* **Scaling is automated**.

### Benefits of AWS Lambda

* Easy pricing: Pay per request and compute time.
* Integrated with the whole AWS suite of services.
* Integrated with many programming languages.
* Easy monitoring through AWS CloudWatch.
* Easy to get more resources per function (up to 10GB of RAM).
* Increasing RAM will also improve CPU and network.

### AWS Lambda Language Support

* Node.js (JavaScript)
* Python
* Java (Java 8 compatible)
* C# (.NET Core)
* Golang
* C# / Powershell
* Ruby
* Custom Runtime API (community supported, example Rust)

Lambda Container Image

* The container image must implement the Lambda Runtime API.
* ECS and Fargate are preferred for running arbitrary Docker images.

## Lambda Limits

### Execution

* Memory allocation: 128MB to 10GB (1MB increments).
* Maximum execution time: 900-second (15-minutes).
* Environment variables: 4KB.
* Disk capacity in the "function container" (in `/tmp`): 512MB.
* Concurrency executions: 1,000 (can be increased).

### Deployment

* Lambda function deployment size (compressed `.zip`): 50MB.
* Size of uncompressed deployment (code, plus dependencies): 250MB.
* Can use the `/tmp` directory to load other files at startup.
* Size of environment variables: 4KB.

## Lambda@Edge

Assuming ...

* A CDN deployed using CloudFront.
* Have a need to run a global AWS Lambda alongside the CDN.
* Want to implement request filtering before it reaches the application.

Use **Lambda@Edge** ...

Deploy Lambda functions alongside the CloudFront CDN.

* Build more responsive applications.
* Do not manage servers, Lambda is deployed globally.
* Customize the CDN content.
* Pay only for what is used.

Use Lambda to change CloudFront requests and responses ...

* After CloudFront receives a request from a viewer (viewer request).
* Before CloudFront forwards the request to the origin (origin request).
* After CloudFront receives the response from the origin (origin response).
* Before CloudFront forwards the response to the viewer (viewer response).

Can also generate responses to viewers without ever sending the request to the origin.

### Lambda@Edge Use-Cases

* Website Security and Privacy.
* Dynamic Web Application at the Edge.
* Search Engine Optimization (SEO).
* Intelligently Route Across Origins and Data Centers.
* Bot Mitigation at the Edge.
* Real-time Image Transformation.
* A/B Testing
* User Authentication and Authorization.
* User Prioritization.
* User Tracking and Analytics.

## DynamoDB Overview

* Fully managed, highly available with replication across multiple AZs.
* NoSQL database - not a relational database.
* Scales to massive workloads, distributed database.
* Millions of requests per second, trillions of rows, 100s of TB of storage.
* Fast and consistent in performance (low latency on retrieval).
* Integrated with IAM for security, authorization, and administration.
* Enabled event driven programming with DynamoDB Streams.
* Low cost and auto-scaling capabilities.

### DynamoDB - Basics

* DynamoDB is made of **Tables**.
* Each table has a **Primary Key** (must be decided at creation time).
* Each table can have an infinite number of items (= rows).
* Each item has **attributes** (can be added over time, can be null).
* Maximum size of an item is **400KB**.

Data types supported ...

* **Scalar Types** - String, Number, Binary, Boolean, Null.
* **Document Types** - List, Map.
* **Set Types** - String Set, Number Set, Binary Set.

### DynamoDB - Read/Write Capacity Modes

Control how the table's capacity is managed (read/write throughput).

#### Provisioned Mode (default)

* Specify the number of reads/writes per second.
* Need to plan capacity beforehand.
* Pay for *provisioned* Read Capacity Units (RCU) and Write Capacity Units (WCU).
* Possibility to add *auto-scaling* mode for RCU and WCU.

#### On-Demand Mode

* Read/writes automaticall scale up and down with workloads.
* No capacity planning needed.
* Pay for what is used, more expensive.
* Great for *unpredictable* workloads.

## DynamoDB Advanced Features

### DynamoDB Accelerator (DAX)

* Fully-managed, highly available, seamless in-memory cache for DynamoDB.
* **Help solve read congestion by caching**.
* Microseconds of latency for cached data.
* Does not require application logic modification (compatible with existing DynamDB APIs).
* 5-minutes TTL for cache (default).

### DynamoDB - Streams

Ordered stream of item-level modifications (create, update, and delete) in a table.

Stream records can be ...

* Sent to **Kinesis Data Streams**.
* Read by **AWS Lambda**.
* Read by **Kinesis Client Library applications**.

Data Retention for up to 24-hours.

Use-cases ...

* React to changes in real-time (welcome email to users).
* Analytics.
* Insert into derivative tables.
* Insert into ElasticSearch.
* Implement cross-region replication.

### DynamoDB - Global Tables

* Make a DynamoDB table accessible with **low latency** in multiple regions.
* Active-Active replication.
* Applications can **READ** and **WRITE** to the table in any region.
* Must enable DynamoDB Streams as a pre-requisite.

### DynamoDB - Time To Live (TTL)

* Automatically delete items after an expiry timestamp.
* Use-cases: Reduce stored data by keeping only current items, adhere to regulatory obligations, ...

### DynamoDB - Indexes

* Global Secondary Indexes (GSI) and Local Secondary Indexes (LSI).
* High level: Allow to **query** on attributes other than the Primary Key.

### DynamoDB - Transactions

* A Transaction is written to table(s), or none.

## API Gateway Overview

* AWS Lambda and API Gateway: No infrastructure to manage.
* Support for the WebSocket Protocol.
* Handle API versioning (v1, v2, ...).
* Handle different environments (dev, test, prod, ...).
* Handle security (Authentication and Authorization).
* Create API keys, handle request throttling.
* Swagger, Open API import to quickly definte APIs.
* Transform and validate requests and responses.
* Generate SDK and API specifications.
* Cache API responses.

### Integrations - High Level

#### Lambda Function

* Invoke Lambda function.
* Easy way to expose REST API backed by AWS Lambda.

#### HTTP

* Expose HTTP endpoints in the backend.
* Example: Internal HTTP API on-premise, Application Load Balancer, ...
* Add rate limiting, caching, user authentications, API keys, etc. ...

#### AWS Service

* Expose any AWS API through the API Gateway.
* Example: Start an AWS Step Function workflow, post a message to SQS.
* To add authentication, deploy publicly, rate control, ...

### Endpoint Types

#### Edge-Optimized (default)

* For global clients.
* Requests are routed through the CloudFront Edge locations (improves latency).
* The API Geteway still lives in only one region.

#### Regional

* For clients within the same region.
* Could manually combine with CloudFront (more control over the caching strategies and the distribution).

#### Private

* Can only be accessed from a VPC using an interface VPC endpoint (ENI).
* Use a resource policy to define access.

## API Gateway Security

### IAM Permissions

* Create an IAM policy authorization and attach to User or Role.
* API Gateway verifies IAM permissions passed by the calling application.
* Good to provide access within an infrastructure.
* Leverages "Sig v4" capability where IAM credentials are in headers.

### Lambda Authorizer (formerly Custom Authorizers)

* Uses AWS Lambda to validate the token in header being passed.
* Option to cache result of authentication.
* Helps to use OAuth, SAML, 3rd-party type of authentication.
* Lambda must return an IAM policy for the user.

### Cognito User Pools

* Cognito fully manages user lifecycle.
* API Gateway verifies identity automatically from AWS Cognito.
* No custom implementation required.
* **Cognito only helps with authentication, not authorization**.

## AWS Cognito Overview

To give users an identity so they can interact with an application.

### Cognito User Pools

* Sign in functionality for application users.
* Integrated with API Gateway.

Details ...

* Create a serverless datanase of user for mobile applications.
* Simple login: Username (or email) and password combination.
* Possibility to verify email, phone numbers, and add MFA.
* Can enable Federated Identities (Facebook, Google, SAML, ...).
* Sends back a JSON Web Token (JWT).
* **Can be integrated with API Gateway for authentication**.

### Cognito Identity Pools (Federated Identity)

* Provide AWS credentials to users so they can access AWS resources directly.
* Integrate with Cognito User Pools as an identity provider.

Goal ...

* Provide direct access to AWS Resources from the Client Side.

Details ...

* Login to federated identity provider - or remain anonymous.
* Get temporary AWS credentials back from the Federated Identity Pool.
* These credentials come with a pre-defined IAM policy stating their permissions.

Example ...

* Provide (temporary) access to write to an S3 bucket using Facebook Login.

### Cognito Sync

* Synchronize data from device to Cognito.
* May be deprecated and replaced by AppSync.

Details ...

** Deprecated - use AWS AppSync**.

* Store preferences, configuration, state of the application.
* Cross-device synchronization (any platform - iOS, Android, etc. ...).
* Offline capability (synchronization when back online).
* **Requires Federated Identity Pool in Cognito (not User Pool).
* Data is stored in datasets (up to 1MB).
* Up to 20 datasets to synchronize.

## Serverless Application Model (SAM) Overview

SAM = Serverless Application Model

* Framework for developing and deploying serverless applications.

All the configuration is YAML code ...

* Lambda Functions
* DynamoDB Tables
* API Gateway
* Cognito User Pools

Details ...

* SAM can help run Lambda, API Gateway, DynamoDB locally.
* SAM can use CodeDeploy to deploy Lambda functions.
