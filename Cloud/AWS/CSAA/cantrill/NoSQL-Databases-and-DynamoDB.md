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
