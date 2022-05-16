# NoSQL Databases and DynamoDB

## Amazon DynamoDB (DDB) Architecture

* NoSQL Public Database-as-a-Service (DBaaS) - Key/Value and Document.
* **No self-managed servers** or infrastructure.
* Manual or automatic provisioned performance IN/OUT or On-Demand.
* Highly Resilient; either across AZs and optionally global.
* Fast, single-digit millisecond access (SSD-based).
* Backups, point-in-time recovery and encryption at-rest.
* Event-Driven integration, do things when the data changes.

### DynamoDB Tables

* A Table is a grouping of ITEMS that share the same PRIMARY KEY.
* PRIMARY KEY can be either Simple (Partition) or Composite (Partition and Sort).
* Each item **MUST** have a unique value for PK and SK. Can have none, all, mixture, or different attributes (DDB has no rigid attribute schema).
* ITEM MAXIMUM of 400KB.

Capacity (SPEED) is set on a Table ...

* WRITES, 1 WVU = 1KB per second.
* READS, 1 RCU = 4KB per second.

### DynamoDB On-Demand Backups

* On-Demand Backup: Full Copy of the Table, Retained until Removed.
* Point-in-time Recovery (PITR): Not Enabled by Default. Continuous record of chagnes allows replay to any point in the window. 35-day recovery window. 1-second granularity.

### Condiderations

* NoSQL, prefer DynamoDB.
* Relational Data, generally **NOT** DynamoDB.
* Key/Value, preference DynamoDB.
* Access via the console, CLI, API ... 'NO SQL.'
* Billed based on RCU, WCU, Storage, and Features.

## DynamoDB Operations, Consistency, and Performance

Reading and Writing ...

* On-Demand - unknown, unpredictable, or low administration overhead.
* On-Demand - price per million Read or Write Units.
* Provisioned Capacity, RCU and WCU set on a per table basis.
* Every operation consumes at least 1 RCU/WCU.
* 1 RCU is 1 x 4KB read operation per second.
* 1 WCU is 1 x 1KB write operation per second.
* Every table has a RCU and WCU burst pool (300-seconds).

Query ...

* Query accepts a single Primary Key (PK) value and optionally a Secondary Key (SK) or tange.
* Capacity consumed is the size of all returned items.
* Further filtering discards data - capacity is still consumed.
* **Can ONLY query on PK or PK and SK**.

Scan ...

* Scan moves through a table consuming the capacity of every ITEM.
* Complete control on what data is selected, any attributes can be used and any filters applied but SCAN consumes capacity for every ITEM scanned through.

Consistency Model ...

* Eventually Consistent Reads and Strongly Consistent Reads.
* Writes are directed at the leader node. The leader node is elected from all storage notes.
* The leader node replicates data to other nodes.
* Strongly consistent reads connect to the leader node to get the most up-to-date copy of the data.
* Not every application or access type **tolerates** eventually consistency.

Calculating WCU and RCU ...

* Notes **[HERE](https://dev.to/rfornal/aws-database-request-units-a7i)**

## DynamoDB Local (LSI) and Global (GSI) Secondary Index

* Query is the most efficient operation in DynamoDB.
* Query can only work on one Partition Key (PK) at a time and optionally a single, or range of Sort Key (SK) values.
* Indexes are alternative views on table data.
* Different SK (LSI) or Different PK and SK (GSI).
* Some or all attributes (projection).

Local Secondary Indexes (LSI) ...

* LSI is an alternative view for a table.
* **MUST be created with a table**.
* 5 LSIs per base table.
* Alternative SK on the table.
* Share the RCU and WCU with the table.
* Attributes: `ALL`, `KEYS_ONLY`, or `INCLUDE`.
* Indexes are sparse which means that only items which have a value in the index alternative sort key are added to the index.

Global Secondary Index (GSI) ...

* Can be created at any time.
* Default limit of 20 per base table.
* Alternative PK and SK.
* GSIs have their own RCU and WCU allocations.
* Indexes are sparse which means that only items which have a value in the new PK and optional SK are added.
* GSIs are **ALWAYS** eventually consistent, replication between base and GSI is asynchronous.

Considerations ...

* Careful with projections (`KEYS_ONLY`, `INCLUDE`, and `ALL`).
* Queries on attributes NOT projected are expensive.
* Use GSIs by default. LSI when **strong consistency** is required.
* Use indexes for alternative access patterns.

## DynamoDB Streams and Triggers

Stream Concepts ...

* Time ordered list of ITEM CHANGES in a table.
* 24-hour rolling window.
* Enabled an a per table basis.
* Records INSERTS, UPDATES, and DELETES.
* Different view types influence what is in the stream.

View Types ...

* `KEYS_ONLY`
* `NEW_IMAGE`
* `OLD_IMAGE`
* `NEW_AND_OLD_IMAGE`

Trigger Concepts ...

* ITEM changes generate an event.
* That event contains the data that changed.
* An action is taken using that data.
* AWS = Streams and Lambda.
* Reporting and Analytics.
* Aggregation, Messaging, or Notifications.

## DynamoDB Global Tables

* Global tables provide multi-master cross-region replication.
* Tables are created in multiple regions and added to the same global table (becomes replica tables).
* Last writer wins is used for conflict resolution.
* Reads and Writes can occur in any region.
* Generally sub-second replication between regions.
* Strongly consistent reads ONLY in the same region as writes.
* Globally, eventually consistent.

## DynamoDB Accelerator (DAX)

Traditional Caches versus DAX ...

1. Application checks cache for data - a CACHE MISS occurs if it isn't cached.
2. Data is loaded from the database with a separate operation and SDK.
3. Cache is updated with retrieved data. Subsequent queries will load data from cache as a CACHE HIT.

DAX ...

1. Application uses the DAX SDK and makes a single call for the data which is returned by DAX.
2. DAX either returns the data from its cache or retrieves is from the database and then caches is.

* Less complexity for the application developer and tighter integration.

DAX Architecture ...

* DAX is a cluster service where nodes are placed into different AZs.
* PRIMARY RW Node and other nodes are READ-REPLICAS.
* Item Cache holds results of (BATCH) `GetItem`.
* Query Cache holds data based on query/scan parameters.
* DAX is accessed via endpoint. Cache HITS are returned in microseconds. **MISSES are returned in milliseconds**.
* Write-Through is supported, data is written to DynamoDB then DAX.
* If a CACHE MISS occurs data is also written to the primary node of the cluster.

DAX Considerations ...

* Primary NODE (Writes) and Replicas (Read).
* Nodes are Highly Available, Primary failure performs an election.
* In-Memory cache - Scaling: Much faster reads and reduced cost.
* Scale UP and Scale OUT (Better or More).
* Supports write-through.
* DAX is deployed WITHIN a VPC.

## Amazon Athena

* Serverless Interactive Querying Service.
* Ad-hoc queries on data - pay only for data consumed.
* **Schema-on-read** - table-like translation.
* Original data never changes - remains on S3.
* Schema translates data and it becomes relational-like when read.
* Output can be sent to other services.

Notes ...

* Supports standard formats of structured, semi-structured, and unstructured data. Source data is stored in S3.
* Athena can directly read many AWS data formats such as CloudTrail, ELB Logs, and Flow Logs.
* "Tables" are defined in advance in a data catalog and data is projected through when read. It allows SQL-like queries on data without transforming the source data.
* Billed based on data consumed during the query.
* Output can be sent to visualization tools.
