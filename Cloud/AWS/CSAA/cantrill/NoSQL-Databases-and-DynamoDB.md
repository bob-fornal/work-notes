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
