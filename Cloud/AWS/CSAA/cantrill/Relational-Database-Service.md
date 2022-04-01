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

* Database-as-a-Service (DBaaS) ... Database Server as a Service.
* Managed Database Instance (1 or more databases).
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

## RDS Data Security

* **SSL/TLS (in transit)** is available for RDS, can be **mandatory**.
* RDS supports EBS volume encryption - KMS.
* Handled by HOST/EBS.
* AWS or Customer Managed CMK generated data keys.
* **Data keys are used for encryption operations**.
* Storage, Logs, Snapshots, and Replicas are encrypted.
* Encryption cannot be removed.
* RDS MS SQL and RDS Oracle support **Transparent Data Encruption (TDE)**.
* Encryption handled within the Database Engine.
* Much stronger key controls (even from AWS).

IAM Authentication ...

* Policies attached to USers or Roles maps that IAM Identity onto the local RDS USer.
* **Authorization** is controlled by the Database Engine. Permissions are assigned to the local Database USer. **IAM is NOT used to authorize**, only for authentication.

## Aurora Architecture

* Aurora architecture is VERY different from RDS. It uses a "Cluster."
* A single **primary** instance plus zero or more replicas.
* No local storage; it uses a shared **cluster volume**.
* Faster provisioning, improved availability, and performance.
* Cluser Volume: Maximum of 128 TB, 6 Replicas, AZs.
* All SSD-Based: High IOPS and low latency.
* Storage is billed based on **what is used**.
* **High water mark**, billed for the most used.
* Storage which is freed up can be reused.
* Replicas can be added and removed without requiring storage provisioning.
* Cluster Endpoint and Reader Endpoint.

Costs ...

* **No free-tier option**.
* Aurora does not support Micros Instances.
* Beyond RDS single-AZ (Micro), Aurora offers better value.
* Compute - hourly charge, per second, 10-minute minimum.
* Storage - GB-Month consumed, IO cost per request.
* 100% Database Size in backups are included.

Restore, Clone, and Backtrack ...

* Backups in Aurora work in the same way as RDS.
* Restores create a **new cluster**.
* Backtrack can be used which allows **in-place rewinds** to a previous point in time.
* Fast clones make a new database MUCH faster than copying all the data - **copy-on-write**.

## Aurora Serverless

* Scalable - **ACUs** - Aurora Capacity Units.
* Aurora Serverless cluster has a **MINIMUM and MAXIMUM ACU**.
* Cluster adjusts based on load.
* Can go to zero and be paused.
* Consumption billing on a per-second basis.
* Same resilience as Aurora (6 copies across AZs).

Use Cases ...

* **Infrequently** used applications.
* **New** applications.
* **Variable** workloads.
* **Unpredictable** workloads.
* **Development** and **test** databases.
* **Multi-tenant** applications.

## Aurora Global

* **Cross-Region Disaster Recovery (DR) and Business Continuity (BC)**.
* **Global Read Scaling - low latency performance improvements**.
* ~1-second or less replication between regions.
* No impact on database performance.
* Secondary regions can have 16 replicas that can be promoted to R/W.
* Currently there is a MAXIMUM of 5 Secondary Regions.

## Multi-Master Writes

* Default Aurora mode is **Single-Master**.
* One R/W Instance and zero or more Read Only Replicas.
* Cluster Endpoint is used to write, Read Endpoint is used for load balanced reads.
* Failover takes time - replica is promoted to R/W.
* In Multi-Master mode **all instances are R/W**.

## Database Migration Service (DMS)

* A managed database migration service.
* Runs using a **replication instance**.
* Source and Destination Endpoints point at Source and Target Databases.
* **One endpoint MUST be on AWS**.

Notes ...

* Replication instance performs the migration between Source and Destination endpoints which store connection information for source and target databases.

Jobs can be ...

1. **Full Load**: One off migration of all data.
2. **Full Load + CDC (Change Capture Data)**: For ongoing replication which captures changes.
3. **CDC Only**: To use an alternative method to transfer the bulk database data, such as native tooling.

Schema Converstion Tool (SCT) ...

* Can assist with Schema Conversion.
* Is used when converting from one database engine to another.
* Including database to S3 (Migration using DMS).
* SCT is **not used when migrating between databases of the same type**.
* Works with OLTP Type Databases.
* Works with OLAP Type Databases.

(DMS) and Snowball ...

* Larger migrations might be multi-TB in size.
* Moving data over networks takes time and consumes capacity.

DMS can utilize Snowball ...

1. Use SCT to extract data locally and move to a Snowball device.
2. Ship the device back to AWS. They load the data onto an S3 bucket.
3. DMS migrates from S3 into the target store.
4. Change Capture Data (CDC) can capture changes, and via S3 intermediary they are also written to the target database.
