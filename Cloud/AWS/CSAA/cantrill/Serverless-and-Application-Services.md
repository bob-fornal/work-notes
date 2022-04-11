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
* Managed services are use where possible.

## Simple Notification Service (SNS)

* Public AWS Service - network connectivity with Public Endpoint.
* Coordinates the sending and delivery of messages.
* Messages are less than or equal to 256KB payloads.
* SNS Topcis are the base entity of SNS - permissions and configurations.
* A Publisher sends messages to a Topic.
* Topics have Subscribers that receive messages.
* HTTP(s), Email(-JSON), SQS, Mobile Push, SMS Messages, and Lambda.
* SNS used across AWS for notifications (example, CloudWatch and CloudFormation).

Notes ...

* Delivery Status - (including HTTP, Lambda, and SQS).
* Delivery Retries - Reliable Delivery.
* Highly Available and Scalable (Region).
* Server Side Encryption (SSE).
* Cross-Account via Topic Policy.
