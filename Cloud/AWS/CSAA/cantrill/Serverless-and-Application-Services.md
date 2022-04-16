# Serverless and Application Services

## Architecture Deep Dive

### Event-Driven Architecture

* Monolithic Architecture

  Everything fails, scales, and bills as one.

* Tiered Architecture

  Vertical Scaling of each tier independently. Utilize load balancers (internally) to allow for horizontal scaling.

* Evolving with Queues

  Decouples via a queue. ASG based on Queue Length.

* Microservice Architecture

  Collection of microservices. They do individual things very well.

* Collection of Event Components: Event Producers, Event Consumers, or both Producers and Consumers.
* Event Router: Event Bus ... Producers add to Event Router which passes Events to Consumers.

Notes ...

* No constant running or waiting for things to happen.
* Producers generate events when something happens: clicks, errors, criteria met, or actions.
* Events are delivered to Consumers, actions are taken, and the system returns to waiting.
* Mature event-driven architecture only consumes resources while handling events (serverless).

## AWS Lambda

* Function-as-a-Service (FaaS) - short running and focused.
* Lambda Function is a piece of code that Lambda runs.
* Functions use a runtime (example, Python 3.8).
* Functions are loaded and run in a **runtime environment**.
* The environment has a direct memory (indirect CPU) allocation.
* Billed for the **duration that a function runs**.
* A key part of **Serverless Architectures**.

### Environment

* Function Timeout: 900-seconds (15-minutes).
* Common Runtimes: Python, Ruby, Java, Go, C#.
* Memory: 128MB to 10,240MB in 1MB Steps.
* Storage: 512MB available as `/tmp`.

### Common Uses

* Serverless Applications (S3, API Gateway, Lambda).
* File Processing (S3, S3 Events, Lambda).
* Database Triggers (DynamoDB, Streams, Lambda).
* Serverless CRON (EventBridge or CloudWatch Events with Lambda).
* Real-time Stream Data Processing (Kinesis and Lambda).

### Public Lambda

* By **default** Lambda Functions are given public networking. They can access public AWS service and the public internet.
* Public networking offers the best performance because no customer-specific VPC networking is required.
* Lambda functions have **no access** to VPC-based services unless public IPs are provided and security controls allow external access.

### Private Lambda

* Lambda Functions running in a VPC **obey all NVP networking rules**.
* VPC Endpoints can provide access to public AWS services.
* NatGW and Internet Gateway are required for VPC Lambdas to access internet resources.

### Security

* Provided with an Execution Role.
* Lambda execution roles are IAM Roles attached to Lambda Functions which control the **PERMISSIONS** the Lambda Function **RECEIVES**.
* Lambda resource policy controls **WHAT** services and accounts can **INVOKE** Lambda Functions.

### Logging

* Lambda uses **CloudWatch, CloudWatch Logs, and X-RAY**.
* Logs from Lambda executions - CloudWatch Logs.
* **Metrics** - invocation success or failure, retries, latency are stored in CloudWatch.
* Lambda can be integrated with **X-Ray for distributed tracing**.
* CloudWatch Logs require **permissions via Execution Role**.

### Invocation

Synchronous invocation ...

* CLI or API invokes a Lambda Function, passing in data and waiting for a response.
* Client communicating via APIGW, proxied to Lambda Function. Lambda responds with success or failure.
* Result (Succeed or Failure) is returned during the request. Errors or Retries have to be handled by the client.

Asynchronous invocation ...

* Typically used when AWS service invokes Lambda Functions.
* If the processing of the event fails, Lambda will retry between zero and two times (configurable). Lambda handles the retry logic.
* The Lambda Function needs to be idempotently reprocessing a result should have the same end state.
* Events can be sent to dead-letter queues after repeated failed processing.
* Lambda supports destinations (SQS, SNS, Lambda, and EventBridge) where successful or failed events can be sent.

Event source mappings ...

* Typically used on streams or queues which do not support event generation to invoke Lambda (Kinesis, DynamoDB Streams, SQS).
* Read or poll data from the stream or queue and deliver event batches to Lambda. Event batches are processed OK or FAIL as a batch.
* Permissions from the Lambda Execution Role are used by the event source mapping to interact with the event source.
* SQA Queues or SNS Topics can be used for any discarded failed event batches.
  
### Versions

* Lambda Functions have versions.
* A version of the code and the configuration of the Lambda Function.
* It is **immutable**. It never changes once published and has its own Amazon Resource Name (ARN).
* `$Latest` points at the latest version.
* Aliases (DEV, STAGE, and PROD) point at a version and **can be changed**.

### Lambda Startup Times

* Lambda Code runs inside an Execution Context (runtime environment).
* A **cold start** is a full **creation and configuration** including function code download.
* Future invocations can use a warm start, the same Execution Context can be reused.
* A Lambda invocation can reuse an Execution Context but has to assume it cannot. If used infrequently, contexts will be removed. Concurrent executions will use multiple (potentially new) contexts.
* Provisioned concurrency can be used. AWS will create and keep X contexts warm and ready to use, improving start speeds.

## CloudWatch Events and EventBridge

* If something happens, or at whatever time or period, do something.
* EventBridge is replacing CloudWatch.
* A default Event bus for the account.
* In CloudWatch Events there is only one bus (implicit).
* EventBridge can have additional event buses.
* Rules match incoming events (or scheduled).
* Routes the vent to one or more targets (example, Lambda).

## Serverless Architecture

* Serverless **is not one single thing**.
* Managing few, if any servers - low overhead.
* Applications are a collection of small and specialized functions.
* They run in Stateless and Ephemeral environments - duration billing.
* Event-driven - consumption only when being used.
* FaaS is used where possible for compute functionality.
* Managed services are used where possible.

## Simple Notification Service (SNS)

* Public AWS Service - network connectivity with Public Endpoint.
* Coordinates the sending and delivery of messages.
* Messages are less than or equal to 256KB payloads.
* SNS Topics are the base entity of SNS - permissions and configurations.
* A Publisher sends messages to a Topic.
* Topics have Subscribers that receive messages.
* HTTP(s), Email(-JSON), SQS, Mobile Push, SMS Messages, and Lambda.
* SNS used across AWS for notifications (example; CloudWatch and CloudFormation).

Notes ...

* Delivery Status - (including HTTP, Lambda, and SQS).
* Delivery Retries - Reliable Delivery.
* Highly Available and Scalable (Region).
* Server Side Encryption (SSE).
* Cross-Account via Topic Policy.

## AWS Step Functions

Lambda Limitations ...

* Lambda is FaaS.
* 15-minute maximum execution time.
* Can be chained together; this gets messy at scale.
* Runtime environments are stateless.

State Machines ...

* Serverless workflow - START -> STATES -> END.
* States are THINGS which occur.
* Maximum Duration is one-year.
* Standard Workflow and Express Workflow.
* Started via API Gateway, IOT Rules, EventBridge, Lambda, ...
* Amazon States Language (ASL) - JSON Template.
* IAM Role is used for permissions.

States ...

* SUCCEED and FAIL.
* WAIT.
* CHOICE.
* PARALLEL.
* MAP.
* TASK - A single unit of work performed by a State Machine. These can be Lambda, Batch, DynamoDB, ECS, SNS, SQS, Glue, SageMaker, EMR, Step Functions.

## API Gateway

* Create and manage APIs.
* Endpoint/entry-point for applications.
* Sits between applications and integrations (services).
* Highly available, scalable, handles authorization, throttling, caching,CORS, transformations, OpenAPI specification, direct integration and more.
* Can connect to services and/or endpoints in AWS or on-premises.
* HTTP APIs, REST APIs, and WebSocket APIs.

Phases ...

1. Request: Authorize, validate, and transform.
2. Integrations
3. Response: Transforms, prepares, and returns.

Endpoint Types ...

* Edge-Optimized - Routed to the nearest CloudFront POP.
* Regional - Clients in the same region.
* Private - Endpoint accessible only within a VPC via interface endpoint.

Stages ...

* APIs are deployed to stages, each stage has one deployment.
* Stages can be enabled for canary deployments. If done, deployments are made to the canary not the stage.
* Stages enabled for canary deployments can be configured so that a certain percentage of traffic is sent to the canary. This can be adjusted over time - or the canary can be promoted to make it the new base "stage."

Errors ...

* 4xx - Client Error - Invalid request on the client side.
* 5xx - Server Error - Valid request, backend issue.

Error Codes ...

* 400 - Bad Request, Generic.
* 403 - Access Denied - Authorizer denies, WAF Filtered.
* 429 - API Gateway can throttle, this means exceeded the throttled amount.
* 502 - Bad Gateway Exception - bad output returned by a Lambda.
* 503 - Service Unavailable - backing endpoint offline, major service issues.
* 504 - Integration Failure/Timeout - 29-second limit.

Caching ...

* Configured per stage within API Gateway.
* Cache TTL default is 300-seconds.
* Configurable minimum of zero and maximum of 3,600-seconds.
* Can be encrypted.
* Cache size 500MB to 237GB.
* Calls are only made to backend integrations if request is a cache miss.

## Simple Queue Service (SQS)

* Public, Fully Managed, Highly-Available Queues - Standard or FIFO.
* Messages up to 256KB in size - link to large data.
* Received messages are hidden (`VisibilityTimeout`), then either reappear (retry) or are explicitly deleted.
* Dead-Letter queues can be used for problem messages.
* ASGs can scale and Lambdas invoke based on queue length.

Notes ...

* Standard - at-least-once.
* FIFO - exactly-once: (Performance) 3,000 messages per second with batching, or up to 300 messages per second without.
* Billed based on "requests."
* 1 request is 1-10 messages up to 256KB total.
* Short (immediate) versus Long (`waitTimeSeconds`) Polling.
* Encryption at rest (KMS) and in-transit.

## Kinesis Data Streams

Concepts ...

* Kinesis is a scalable streaming service.
* Producers send data into a kinesis stream.
* Streams can scale from low to near infinite data rates.
* Public service and highly available by design.
* Streams store a 24-hour moving window of data.
* Multiple consumers can access data from the moving window.

Kinesis Stream ...

* Shards: 1MB Ingestion, 2MB Consumption
* 24-hour window, can be increased to 7-days.
* Kinesis Data Record (1MB).

Kinesis Data Firehose ...

* Connects to a Kinesis Stream.
* Can move the data that arrives en-masse into another AWS service.

SQS versus Kinesis ...

| SQS | Kinesis |
|-----|---------|
| 1 Production Group | Large Scale Ingestion |
| 1 Consumption Group | Multiple Consumers |
| Decoupling and Asynchronous Communication | Data Ingestion, Analytics, Monitoring, App Clicks |
| **No persistence** of messages, **no window** | Some persistance, rolling window |

## Kinesis Data Firehose

* Fully managed service to load data for data lakes, data stores, and analytics services.
* Automatic scaling, fully serverless, and resilient.
* **Near Real Time delivery** (~60-seconds).
* Supports transformation of the data on the fly (Lambda).
* Billing - volume through firehose.

Delivery to ...

* HTTP
* Splunk
* Redshift
* ElasticSearch
* Destination Bucket

## Kinesis Data Analytics

* Real time processing of data using Structured Query Language (SQL).
* Ingests from Kinesis Data Streams or Firehose.
* Destinations.
* Firehose (S3, Redhsift, ELasticSearch, and Splunk).
* AWS Lambda.
* Kinesis Data Streams.

When and Where ...

* Streaming data needing real-time SQL processing.
* Time-series analytics: elections or e-sports.
* Real-time dashboard - leaderboards for games.
* Real-time metrics - Security and Response teams.

## Amazon Cognito

* Provides Authentication, Authorization, and user management for web or mobile applications.

USER POOLS ...

* Sign-in and get a JSON Web Token (JWT).
* User directory management and profiles, sign-up, and sign-in (customizable web UI), MFA, and other security features.

IDENTITY POOLS ...

* Offering access to Temporary AWS Credentials.
* Unauthenticated Identities - Guest Users.
* Federated Identities - SWAP - Google, Facebook, Twitter, SAML2.0, and User Pool for short-term AWS Credentials to access AWS Resources.
