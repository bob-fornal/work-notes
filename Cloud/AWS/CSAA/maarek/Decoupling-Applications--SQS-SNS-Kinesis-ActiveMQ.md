# Decoupling Applications: SQS, SNS, Kinesis, ActiveMQ

## Introduction to Messaging

There are two patterns of application communication.

1. Synchronous communications (application to application).
2. Asynchronous / Event-based (application to queue to application).

* Synchronous communications can be problematic if there are sudden spikes in traffic.
* It's better to **decouple** the applications.
* The services used to decouple can scale independently from the application.

What is a queue?

* **Producer(s)** send messages to the SQS Queue.
* **Consumer(s)** poll messages from the SQS Queue.

## Amazon SQS - Standard Queues Overview

* Fully managed service, used to decouple applications.

Attributes ...

* Unlimited throughput, unlimited number of messages in the queue.
* Default retention of messages: 4-days, maximum of 14-days.
* Low latency (< 10ms on publishing and receive).
* Limitation of 256KB per message sent.

Messages ...

* Can have duplicate messages (at least once per delivery, occasionally).
* Can have out-of-order messages (best-effort ordering).

### SQS - Producing Messages

* Produced to SQS using the SDK (SendMessage API).
* The message is **persisted** in SQS until a consumer deletes it.
* Message retention: Default 4-days, up to 14-days.
* SQS Standard: Unlimited throughput.

### SQS - Consuming Messages

* Consumers (running on EC2 Instances, Servers, or AWS Lambda) ...
* Poll SQS for messages (receive up to 10 messages at a time).
* Process the messages.
* Delete the messages using the DeleteMessage API.

### Amazon SQS - Security

#### Encryption

* In-flight encryption using HTTPS API.
* At-rest encryption using KMS keys.
* Clinet-side encryption if the client wants to perform encryption/decription itself.

#### Access Controls

IAM policies to regulate access to the SQS API.

#### SQS Access Policies

(similar to S3 bucket policies)

* Useful for cross-account access to SQS queues.
* Useful for allowing other services (SNS, S3, ...) to write to an SQS queue.

## SQS Queue Access Policy

### Cross-Account Access

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": [ "111122223333" ] },
    "Action": [ "sqs:ReceiveMessage" ],
    "Resource": "arn:aws:sqs:us-east-1:444455556666:queue1"
  }]
}
```

### Publish S3 Event Notifications to SQS Queue

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "*" },
    "Action": [ "sqs:SendMessage" ],
    "Resource": "arn:aws:sqs:us-east-1:444455556666:queue1",
    "Condition": {
      "ArnLike": { "aws:SourceArn": "arn:aws:s3:*:*:bucket1" },
      "StringEquals": { "aws:SourceAccount": "<BUCKET1_OWNER_ACCOUNT_ID>" }
    }
  }]
}
```

## SQS - Message Visibility Timeout

* After a message is polled by a consumer, it becomes invisible to other consumers.
* By default, the "message visibility timeout" is 30-seconds.
* That means that the message has 30-seconds to be processed.
* After the message visibility timeout is over, the message is "visible" in SQS.

More ...

* If a message is not processed within the visibility timeout, it will be processed twice.
* A consumer could call the `ChangeMessageVisibility` API to get more time.
* If visibility timeout is high (hours), and consumer crashes, re-processing will take time.
* If visibility timeout is too low (seconds), there may be duplicates.

## SQS - Dead Letter Queues

If a consumer fails to process a message within the VisibilityTimeout ... the message goes back to the queue.

* Can set a threshold of how many times a message can go back to the queue.
* After the `MaximumReceives` threshold is exceeded, the message goes into a dead letter queue (DLQ).
* Useful for **debugging**.
* Make sure to process the messages in the DLQ before they expire: Good to set retention of 14-days in the DLQ.

## SQS - Delay Queues

* Delay a message (consumers do not see it immediately) up to 15-minutes.
* Default is 0-seconds (message is available right away).
* Can set a default at queue level.
* Can override the default on send using the `DelaySeconds` parameter.

## SQS - Long Polling

When a consumer requests messages from the queue, it can optionally "wait" for messages to arrive if there are none in the queue.

* This is called Long Polling.
* **Long Polling decreases the number of API calls made to SQS while increasing the efficiency and latency of the application**.
* The wait time can be between 1-second to 20-seconds (20-seconds is preferable).
* Long Polling is preferable to Short Polling.
* Long Polling can be enabled at the queue level or at the API level using `WaitTimeSeconds`.

## SQS - Request-Response Systems

* To implement this pattern, use the **SQS Temporary Queue Client**.
* It leverages virtual queues instead of creating and deleting SQS queues (cost-effective).

## SQS - FIFO Queues

FIFO = First In First Out (ordering of the messages in the queue).

* Limited throughput: 300 messages/second without batching, 3,000 messages/second with batching.
* Exactly-once send capability (by removing duplicates).
* Messages are processed in order by the consumer.

## SQS with Auto Scaling Group (ASG)

* CloudWatch Custom Metric: Queue Length divided by Number of Instances.
* CloudWatch Alarm that scales the ASG.

## Amazon SNS - Overview

What if one sent message should go to many receivers?

* The "event producer" only sends messages to one SNS Topic.
* As many "event receivers" (subscriptions) as needed want to listen to the SNS Topic notifications.
* Each subscriber to the topic will get all the messages (note: new feature to filter messages).
* Up to 10,000,000 subscriptions per topic.
* 100,000 topic limit.

Subscribers can be ...

* SQS
* HTTP / HTTPS (with delivery retries - how many times).
* Lambda
* SMS messages
* Mobile Notifications

Integrates with ...

* CloudWatch (for alarms)
* Auto Scaling Groups notifications
* Amazon S3 (on bucket events)
* CloudFormantion (upon state change => failed to build, etc.)

### AWS SNS - How to Publish

Topic Publish (using the SDK) ...

* Create a topic.
* Create a subscription (or many).
* Publish to the topic.

Direct Publish (for mobile application SDK) ...

* Create a platform application.
* Create a platform endpoint.
* Publish to the platform endpoint.
* Works with Google GCM, Apple APNS, Amazon ADM, ...

### Amazon SNS - Security

#### Encryption

* In-flight encryption using HTTPS API.
* At-rest encryption using KMS keys.
* Clinet-side encryption if the client wants to perform encryption/decription itself.

#### Access Controls

IAM policies to regulate access to the SNS API.

#### SNS Access Policies

(similar to S3 bucket policies)

* Useful for cross-account access to SNS queues.
* Useful for allowing other services (S3, ...) to write to an SQS queue.

## SNS and SQS - Fan Out Pattern

* Push once in SNS, receive in all SQS queues that are subscribers.
* Fully decoupled, no data loss.
* SQS allows for data persistence, delayed processing, and retries of work.
* Ability to add more SQS subscribers over time.
* Make sure the SQS queue access policy allows for SNS writing.

### SNS - FIFO Topic

Similar featerues to SQS FIFO ...

* Ordering by Message Group ID (all messages in the same group are ordered).
* Deduplication using a Deduplication ID or Content Based Deduplication.

**Can only have SQS FIFO queues as subscribers**.

* Limited throughput (same as SQS FIFO).

### SNS - Message Filtering

* JSON policy used to filter messages sent to SNS Topic's subscriptions.
* If a subscription does not have a filter policy, it receives every message.

## Kinesis Overview

Makes it easy to collect, process, and analyze streaming data in real-time.

Ingest real-time data such as Application Logs, Metrics, Website clickstreams, IoT telemetry data, ...

* **Kinesis Data Streams**: Capture, process, and store data streams.
* **Kinesis Data Firehose**: Load data streams into AWS data stores.
* **Kinesis Data Analytics**: Analyze data streams with SQL or Apache Flink.
* **Kinesis Video Streams**: Capture, process, and store video streams.

### Kinesis Data Streams

* Billing is per shard provisioned, can have any number of shards.
* Retention between 1-day (default) to 365-days.
* Ability to reprocess (replay) data.
* Once data is inserted in Kinesis, it cannot be deleted (immutability).
* Data that shares the same partition goes to the same shard (ordering).
* Producers: AWS SDK, Kinesis Producer Library (KPL), Kinesis Agent.
* Consumers: Client developed or managed.

### Kinesis Data Firehose

Fully Managed Service, no administration, automatic scaling, serverless.

* AWS: Redshift, Amazon S3, ElastiSearch
* 3rd Party Partner: Splunk, MongoDB, DataDog, New Relic, ...
* Custom: Send to any HTTP endpoint.

Pay for data going through Firehose.

**Near Real-Time** ...

* 60-seconds latency minimum for nonfull batches.
* Minimum 32 MB of data at a time.

More ...

* Supports many data formats, conversions, transformations, and compression.
* Supports custom data transformations using AWS Lambda.
* Can send failed or all data to a backup S3 bucket.

### Kinesis Data Analytics

(SQL application)

* Perform real-time analytics on Kinesis Streams using SQL.
* Fully managed, no servers to provision.
* Automatic scaling.
* Real-time analytics.
* Pay for actual consumption rate.
* Can create streams out of the real-time queries.

Use Cases ...

* Time-series analytics.
* Real-time dashboards.
* Real-time metrics.

## Data Ordering for Kinesis versus SQS FIFO

Kinesis ...

* Partition Key is hashed to determine which shard gets the data.

SQS ...

* For SQS Standard, there is no ordering.
* For SQS FIFO, if there is no Group ID, messages are consumed in the order they are sent, with only one consumer.
* The number of consumers can be scaled, but the messages need to be "grouped" when they are related to each other.
* Use a Group ID (similar to Partition Key in Kinesis).

Comparison ...

Assuming 100 trucks, 5 Kinesis Shards, 1 SQS FIFO

| Kinesis Data Streams | SQS FIFO |
|----------------------|----------|
| Average 20 trucks per shard. | Only one SQS FIFO queue. |
| Trucks will have data ordered within each shard. | 100 Group IDs. |
| The maximum amount of consumers in parallel is 5. | Can have up to 100 consumers. |
| Can receive up to 5MB/s of data. | Up to 300 messages per second (3,000 if batching). |

## Amazon MQ

* SQS and SNS are "cloud-native" services and they are using proprietary protocols from AWS.
* Traditional applications running from on-premise may use open protocols such as MQTT, AMQP, STOMP, Openwire, WSS.
* When migrating to the cloud, instead of re-engineering the application to use SQS and SNS use Amazon MQ.

Amazon MQ

(Managed Apache ActiveMQ)

* Amazon MQ does not "scale" as much as SQS and SNS.
* Amazon MQ runs on a dedicated machine, can run in High Availability (HA) with failover.
* Amazon MQ has both queue features (~SQS) and topic features (~SNS).
