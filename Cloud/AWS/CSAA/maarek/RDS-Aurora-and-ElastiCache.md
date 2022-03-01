# RDS, Aurora, and ElastiCache

## RDS Overview

RDS = Relational Database Service

* It is a managed database service for databases that use SQL as a query language.

It allows the creation of databases in the cloud that are managed by AWS ...

* Postgres
* MySQL
* MariaDB
* Oracle
* Microsoft SQL Server
* Aurora (AWS proprietary database)

### RDS versus deploying Database on EC2

RDS is a managed service ...

* Automated provisioning, OS patching.
* Continuous backups and restore to specific timestamp (Point-in-Time-Restore).
* Monitoring dashboards.
* Read replicas for improved read performance.
* Multi-AZ setup for Disaster Recovery.
* Maintenance windows for upgrades.
* Scaling capability (vertical and horizontal).
* Storage backed by EBS (gp2 or io1).

BUT, cannot SSH into the instances.

### RDS Backups

Backups are automatically enabled in RDS.

#### Automated Backups

* Daily full backup of the database (during the maintenance window).
* Transaction logs are backed up by RDS every 5-minutes.
* Ability to restore to any point-in-time (from oldest backup to 5-minutes ago).
* 7-day retention (can be increased to 35-days).

#### Database Snapshots

* Manually triggered by the user.
* Retention of backup for as long as needed.

### RDS - Storage Auto Scaling

* Helps increase storage on an RDS Database Instance dynamically.
* When RDS detects database storage is running out of free space, it scales automatically.
* Avoid manually scaling database storage.
* Can set **Maximum Storage Threshold** (maximum limit for database storage).
* Automatically modify storage if:

  * Free storage is less than 10% of allocated storage.
  * Low storage lasts at least 5 minutes.
  * 6-hours have passed since the last modification

* Useful for applications with **unpredictable workloads**.
* Supports all RDS database engines (MariaDB, MySQL, PostgreSQL, SQL Server, Oracle).

## RDS Read Replicas for Read Scalability

* Up to 5 Read Replicas.
* Within AZ, Cross AZ, or Cross Region.
* Replication is ASYNC so reads are eventually consistent.
* Replicas can be promoted to their database.
* Applications must update the connection string to leverage read replicas.
* Read Replicas are used for SELECT-only statements, not INSERT, UPDATE, or DELETE.

### Use Cases

* A production database that is taking on a normal load.
* A new team comes in with a reporting application to run some analytics.
* A Read Replica can be created to run the new workload.

### RDS Read Replicas - Network Cost

* In AWS there is a network cost when data goes from one AZ to another.
* **For RDS Read Replicas within the same Region, there is no cross AZ fee**.

### RDS Multi-AZ (Disaster Recovery)

* SYNC replication.
* There is one DNS name - automatic application failover to standby.
* Increased **availability**.
* Failover in case of loss of AZ, loss of network, instance, or storage failure.
* No manual intervention in applications.
* Not used for scaling.

**NOTE**: The Read Replicas can be set up as a Multi-AZ for Disaster Recovery (DR).

### RDS - From Single-AZ to Multi-AZ

* Zero downtime operation (no need to stop the database).
* Just click on "modify" for the database.

## RDS Security and Encryption

### At-rest encryption

* Possibility to encrypt the master and read replicas with AWS-KMS - AES-256 encryption.
* Encryption has to be defined at launch time.
* **If the master is not encrypted, the read replicas cannot be encrypted**.
* Transparent Data Encryption (TDE) available for Oracle and SQL Server.

### In-flight encryption

* SSL certificates to encrypt data to RDS in flight.
* Provide SSL options with trust certificate when connecting to the database.

To *enforce* SSL ...

* **PostgreSQL**: ```rds.force_ssl=1` in the AWS RDS Console (Parameter Groups).
* **MySQL**: Within the database, ```GRANT USAGE ON *.* 'mysqluser'@'%' REQUIRE SSL;```

### RDS Encryption Operations

#### Encrypting RDS Backups

* Snapshots of un-encrypted RDS databases are un-encrypted.
* Snapshots of encrypted RDS databases are encrypted.
* Can copy a snapshot into an encrypted database.

#### Encrypt an Unencrupted RDS Database

* Create a snapshot of the un-encrypted database.
* Copy the snapshot and enable encryption for the snapshot.
* Restore the database from the encrypted snapshot.
* Migrate applications to the new database, and delete the old database.

### RDS Security - Network and IAM

Network Security

* RDS databases are usually deployed within a private subnet, not in a public one.
* RDS security works by leveraging security groups (the same concept as EC2 Instances) - it controls which IP / security group can **communicate** with RDS.

Access Management

* IAM policies help control who can **manage** AWS RDS (through the RDS API).
* Traditional Username and Password can be used to **login into** the database.
* IAM-based authentication can be used to login into RDS MySQL and PostgreSQL.

### IAM Authentication

* IAM database authentication works with **MySQL and PostgreSQL**.
* Password is not needed; just an authentication token obtained through IAM and RDS API calls.
* Auth token has a lifetime of 15-minutes.

Benefits

* Network in and out must be encrypted using SSL.
* IAM to centrally manage users instead of a database.
* Can leverage IAM Roles and EC2 Instance profiles for easy integration.

## Aurora Overview

Aurora is a proprietary technology from AWS (not open sourced).

* Postgres and MySQL are both supported as Aurora DB (that means drivers will work as Aurora was a Postgres or MySQL database).
* Aurora is "AWS cloud-optimized" and claims to be 5x performance improvement over MySQL on RDS, over 3x the performance of Postgres on RDS.
* Aurora storage automatically grows in increments of 10GB, up to 128TB.
* Aurora can have 15 replicas while MySQL has 5, the replication process is faster (sub 10ms replica lag).
* Failover in Aurora is instantaneous. It is a High-Availability native.
* Aurora costs more than RDS (20% more) - but it is more efficient.

### Aurora High Availability and Read Scaling

Six (6) copies of data across 3 AZs.

* 4 copies out of 6 needed for writes.
* 3 copies out of 6 needed for reads.
* Self-healing with peer-to-peer replication.
* Storage is striped across 100s of volumes.

Details

* One Aurora Instance takes writes (master).
* Automated failover for the master is less than 30-seconds.
* Master and up to 15 Aurora Read Replicas serve reads.
* Support for Cross-Region Replication.

### Aurora Features

* Automatic fail-over.
* Backup and Recovery.
* Isolation and security.
* Industry compliance.
* Push-button scaling.
* Automated Patching with Zero Downtime.
* Advanced Monitoring.
* Routine Maintenance.
* Backtrack: Restore data at any point in time without using backups.

### Aurora Security

* Similar to RDS because it uses the same engines.
* Encryption at rest using KMS.
* Automated backups, snapshots, and replicas are also encrypted.
* Encryption in-flight using SSL (same process as MySQL or Postgres).
* **Possibility to authenticate using IAM token (same method as RDS)**.
* Protect the instance with security groups.

## Aurora - Advanced Topics

### Aurora Replicas - Auto Scaling

* Adds Amazon Aurora Replicas to Reader Endpoint.

### Aurora - Custom Endpoints

* Define a subset of Aurora Instances as a Custom Endpoint.
* Example: Run analytical queries against specific replicas.

### Aurora Serverless

* Automated database instantiation and auto-scaling based on actual usage.
* Good for infrequent, intermittent, or unpredictable workloads.
* No capacity planning is needed.
* Pay per second, can be more cost-effective.

### Aurora Multi-Master

* In case of immediate failover for write node (High Availability).
* Every node does Read/Write versus promoting a Read Replica as the new master.

### Global Aurora

#### Aurora Cross Region Read Replicas

* Useful for disaster recovery.
* Simple to put in place.

#### Aurora Global Database (recommended)

* 1 Primary Region (read / write).
* Up to 5 secondary (read-only) regions, replication lag is less than one second.
* Up to 15 Read Replicas per secondary region.
* Helps for decreasing latency.
* Promoting another region (for disaster recovery) has a Recovery Time Objective (RTO) of < 1-minute.

### Aurora Machine Learning (ML)

* Allows adding ML-based predictions to an application via SQL.
* Simple, optimized, and secure integration between Aurora and AWS ML services.
* Supported services: Amazon SageMaker (use with any ML model) and Amazon Comprehend (for sentiment analysis).
* Do not need to have ML experience.
* Use cases: Fraud detections, ad targeting, sentiment analysis, product recommendations.

## ElastiCache Overview

ElastiCache manages Redis or Memcached, the same way RDS is used to manage Relational Databases.

* Caches are in-memory databases with really high-performance, low latency.
* Helps reduce the load off of the databases for read-intensive workloads.
* Helps make applications stateless.
* AWS takes care of OS maintenance, patching, optimizations, setup, configuration, monitoring, failure recovery, and backups.
* **Using ElastiCache involves heavy application code changes**.

### Solution Architecture - Database Cache

* Application queries ElastiCache. If the data is not available, get it from RDA and store it in ElastiCache.
* Helps relieve load in RDS.
* Cache must have an invalidation strategy to make sure only the most current data is used.

### Solution Architecture - User Session Store

* Use logs into any application.
* The application writes the session data into ElastiCache.
* The user hits another application.
* The instance retrieves the data and the user is already logged in.

### ElastiCache - Redis versus Memcached

| Redis | Memcached |
|-------|-----------|
| **Multi-AZ** with Auto-Failover | Multi-node for partitioning of data (sharding) |
| **Read Replicas** to scale reads and have **high availability** | **No high availability (replication)** |
| Data Durability using AOF persistence | **Nonpersistent** |
| **Backup and restore features** | **No backup and restore** |
| | Multi-threaded architecture |

## ElastiCache for Solution Architects

### Cache Security

All caches in ElastiCache

* **Does not support IAM authentication**.
* IAM policies on ElastiCache are only used for AWS API-level security.

Redis AUTH ...

* A "password/token" can be set when a Redis cluster is created.
* This is an extra level of security for the cache (on top of security groups).
* Supports SSL in-flight encryption.

Memcached ...

* Supports SASL-based authentication (advanced).

### Patterns for ElastiCache

* **Lazy Loading**: All the read data is cached, data can become stale in the cache.
* **Write Through**: Adds or updates data in the cache when written to a database (no stale data).
* **Session Store**: Store temporary session data in a cache (using TTL features).

### Redis Use Case

Gaming Leaderboards are computationally complex.

* **Redis Sorted sets** guarantee both uniqueness and element order.
* Each time a new element is added, it is ranked in real-time, then added in the correct order.

## Ports to be Familiar With

Important ports:

* FTP: 21
* SSH: 22
* SFTP: 22 (same as SSH)
* HTTP: 80
* HTTPS: 443

... vs RDS Databases ports:

* PostgreSQL: 5432
* MySQL: 3306
* Oracle RDS: 1521
* MSSQL Server: 1433
* MariaDB: 3306 (same as MySQL)
* Aurora: 5432 (if PostgreSQL compatible) or 3306 (if MySQL compatible)
