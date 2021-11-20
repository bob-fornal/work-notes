# Amazon Kinesis

Collect, process, and analyze streaming data in real-time.

1. Kinesis Data Streams
2. Kinesis Data Firehose
3. Kinesis Data Analytics
4. Kinesis Video Streams

## Kinesis Data Streams

* 1 ... n Shards.
* Retention default 1-day, to 365-days.
* Ability to re-process data.

### Kinesis Producers

Puts data records into data streams

* Sequence Number
* Partition Key
* Data Blob (up to 1M)

Implementation

* AWS SDK (simple)
* Kinesis Producer Library (KPL)
* Kinesis Agent (monitor log files)

Notes

* Write throughput: 1M per second or 1,000 records per second per Shard.
* `PutRecord` API.
* Batching with `PutRecords` to reduce cost and increase throughput.

#### Handling `ProvisionedThroughputExceeded`

* Highly distributed partition key.
* Retried with exponential backoff.
* Increase Shards (scaling).

### Kinesis Consumers

* Record / partition key, sequence number, data blob.

Get data records from data streams and process.

Implementation

* AWS Lambda
* Kinesis Data Analytics
* Kinesis Data Firehose
* Custom Consumer (AWS SDK): Classic or Enhanced Fan-Out
* Kinesis Client Library (KCL)

#### Shared (Classic) Fan-Out Consumer

* Minimize cost.
* Consumers poll (`GetRecords` API).

#### Enhanced Fan-Out Consumer

* Lower latency
* HTTP/2 (`SubscribeToShard` API).

#### AWS Lambda Consumer

* Process and save to DynamoDB.

#### Kinesus Client Library Consumer

* Each shard is read by one and only one KCL instance.

### Kinesis Operations - Shard Splitting

* Used to increase Stream Capacity.
* Used to divide a "hot shard."

### Kinesis Operations - Merging Shards

* Decrease Stream capacity and save cost.
* Used to group "cold shards."

## Kinesis Data Firehose

Takes data from Producers, optionally transforms the data, and writes the data in batches into Destinations.

1. AWS Destinations

    * Amazon S3
    * Amazon Redshift (copy through S3)
    * Amazon ElastiSearch

2. 3rd-Party Destinations
3. Custom Destinations (HTTP Endpoint)

All or failed can also be sent to an S3 Bucket

## Kinesis Data Analytics

SQL Application

* Real-time analytics on Kinesis Streams using SQL.
* Fully managed, Automatic Scaling

Use-Cases

* Time-series analytics
* Real-time dashboards
* Real-time metrics


