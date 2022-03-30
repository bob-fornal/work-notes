# Relational Database Service (RDS)

## Database Refresher

### Relational (SQL)

* Relational Database Management System (RDMS).
* Structured Query Language (SQL).
* Structure **in and between** tables of data - **Rigid Schema**.
* Relationships between tables.
* Online Transaction Processing (OLTP).

### Non-Relational (NoSQL)

* NoSQL is **not one single thing**. **There are different models**.
* Generally a much more relaxed Schema.
* Relationships are handled differently.

Types ...

1. Key/Value (No Schema, No Structure), Scalable and Fast.
2. Wide Column Store (Partition Key, Optional Other Key), Grouping of Items called Tables. No Attribute Schema - Any, All, or None.
3. Document: Ideal Scenarios - Interacting with **whole documents** or **deep attribute interactions**. Examples: Orders, Contacts Collections.
4. Column Databases (Redshift) - Columns are stored together. This is ideal for reporting or when all values for a specific attribute are required.
5. Graph - Nodes (relationships between Edges).

## ACID versus BASE

* ACID and BASE are database **transaction models**.
* CAP Theorem - Consistency, Availability, and Partition Tolerant (resilience) - Choose 2.
* ACID is Consistent.
* BASE is Available.

ACID ...

(Generally) RDS Databases limits scaling.

* ATOMIC: ALL or NO components of a transaction SUCCEEDS or FAILS.
* CONSISTENT: Transactions move the database from **one valid state to another** - nothing in-between is allowed.
* ISOLATED: If multiple transactions occur at once, they **do not interfere with each other**. Each executes as if it is the only one.
* DURABLE: Once committed, transactions are durable. Stored on non-volatile memory, resilient to power outages or crashes.

BASE ...

* DynamoDB Consistency.
* BASICALLY AVAILABLE: READ and WRITE operations are available "as much as possible" but **without any consistency guarantees**.
* SOFT STATE: The database **does not enforce consistency**, this is offloaded onto the application or user.
* EVENTUALLY CONSISTENT: Waiting long enough, READS from the system will be consistent.

## Databases on EC2

Why it might be done ...

* Access to the DB Instance OS.
* Advanced DB Option Tuning (DBROOT).
* Vendor demands.
* **Database or Database Versions that AWS does not provide**.
* Specific **OS/Database Combination** that AWS does not provide.
* Architecture AWS does not provide (replication and resilience).
* Decision makers that "**just want it**."

Why it should not be done ...

* **Admin overhead** - Managing EC2 and Database Host.
* **Backup** and Disaster Recovery Management.
* EC2 is **running in a single AZ**.
* **Features** - Some AWS Database products are amazing.
* EC2 is **ON** or **OFF** - No serverless option, not easy to scale.
* **Replication** - Skills, setup time, monitoring, and effectiveness.
* **Performance** - AWS investment in time into optimizations and features.

## Relational Database Service (RDS)

* Database-as-a-Service (DBaas) ... Database Server as a Service.
* Managed Database Instance (1 more more databases).
* Multiple engines: MySQL, MariaDB, PostgreSQL, Oracle, or Microsoft SQL Server.
* Amazon Aurora

## RDS High-Availability (Multi AZ)

* Primary - Synchronous Replication - Standby in another AZ.
* RDS Access **ONLY** via CNAME, points at the Primary Instance.
* CNAME endpoint can be failed over to Standby Instance from Primary.

1. Writes to Primary.
2. Disk Write to Primary.
3. Replicated to Standby.
4. Disk Write to Secondary.

* **No Free-Tier** - Extra cost for Standby Replica.
* Standby Replica **cannot be used directly**.
* Failover takes between 60-120 Seconds.
* **Same region only** (other AZs in the VPC).
* Backups taken **from Standby Replica** (removes performance impact).
* Failovers: AZ Outage, Primary Failure, Manual Failover, Instance type change, and software patching.

## RDS Automatic Backup, RDS Snapshots and Restores

RTO versus RPO ...

* Recovery Time Objective (RTO)

   Time between the Disaster Recovery event and full recovery. Influenced by process, staff, tech, and documentation. Generally lower values cost more.

* Recovery Point Objective (RPO)

   Time between the last backup and the incident. Amount of maximum data loss. Influences technical solution and cost. Generally lower values cost more.

* Automated Backups and Manual Snapshots via AWS Managed S3 Buckets.
* First Snapshot is FULL, the size of consumed data. From that point it is Incremental.
* Retention: 0 to 35 Days.

RDS Restores ...

* Creates a **NEW RDS Instance**, new address.
* Snapshots are a **single point in time**, creation time.
* Automated ... **any 5 minute point in time**.
* Backup is restored and transaction logs are "replayed** to bring the database to the desired point in time.
* Restores **are not fast**, think about RTO.

## RDS Read-Replicas

* Primary - Asynchronous Replication - Read Replica(s).

Performance Improvements (read) ...

* **5x** direct read-replicas per Database Instance.
* Each provides an **additional instance of read performance**.
* Read-Replicas can have read-replicas - **but lag starts to become a problem**.
* **Global** performance improvements.

Availability Improvements ...

* Snapshots and Backups improve RPO.
* **RTOs are a problem**.
* Read-Replicas offer a near zero RPO.
* Read-Replica can be **promoted quickly, low RTO**.
* **Failure only**, they watch for data corruption.
* **Read only until promoted**.
* **Global availability improvements, global resilience**.
