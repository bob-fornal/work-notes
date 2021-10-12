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
