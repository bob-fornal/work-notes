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

### Producers

* Record / partition key, data blob (up to 1M).

### Consumers

* Record / partition key, sequence number, data blob.
