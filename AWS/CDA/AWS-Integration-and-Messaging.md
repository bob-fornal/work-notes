# AWS Integration and Messaging

Communication and Integration

1. Synchronous Communication (application to application)
2. Asynchronous, Event-Based (application to queue to application)

Can scale independently from application.

## Amazon SQS

Simple Queue Service

* Producer (send messages)
* Consumers (poll messages)

### Standard Queue

Unlimited throughput and number.

* Default retention: 4-days, 14-days maximum.
* Low latency < 10ms.
* Small, 256K per message.
* Duplicate messages possible.
* Out-of-order possible.

### Security

#### Encryption

* In-flight with HTTPS API.
* At-rest with KMS keys.
* Client-side if encryption / decryption is done on client.

#### Access Controls

* IAM Policies to regulate access to the SQS API.

#### Access Policies

* Useful for cross-account access.
* Useful to allow other services to write to an SQS Queue.

### Message Visibility Timeout

* When polled by consumer, a message becomes invisible to other consumers.
* Default timeout 30-seconds (to be processed).
* `ChangeMessageVisibility` API.

### Dead Letter Queues

* Consumer lets message return to the queue; threshold max receives (MaximumReceives), then to DLQ.
* Useful for debugging.
* Expires maximum of 14-days.

### Delay Queue

* Delay a message upt to 15-minutes.
* Default: 0-seconds.
* Can set queue-level default.

### Long Polling

* Queue level or `WaitTimeSeconds` at API level.

### Must-Know APIs

* `CreateQueue` (`MessageRetentionPeriod`)
* `DeleteQueue`
* `PurgeQueue`
* `SendMessage` (`DelaySeconds`), `ReceiveMessage`, `Delete Message`
* `MaxNumberOfMessages`: default 1, maximum 10.
* `ReceiveMessagesWaitTimeSeconds`
* `ChangeMessageVisibility`

### FIFO Queues

* First In First Out
* Limited Throughput

## SNS

* Direct Integration
* Pub-Sub (into SNS Topic)

### Event

* Event Producer: one SNS Topic
* Event Receivers (subscriptions)

### Security

* Encryption: Same as SQS.
* Access Controls: IAM Policies
* SNS Access Policies

## SNS and SQS Fan-Out

Sending to multiple SQS Queues

* Push once to SNS.
* SQS are subscribers (single message sent, decoupled and no data loss).

## SNS Message Filtering

* No filter policy, subscription gets all messages.
