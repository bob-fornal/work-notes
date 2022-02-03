# Databases in AWS

OLTP = Online Transaction Processing

OLAP = Online Analytic Processing

## Choosing the Right Database

There are a lot of managed databases on AWS to choose from.

Selecting the right database based on the architecture ...

* Read-heavy, write-heavy, or balanced workload? Throughput needs? Will it change, does it need to scale or fluctuate during the day?
* How much data to store and for how long? Will it grow? Average object size? How are they accessed?
* Data durability? Source of truth for the data?
* Latency requirements? Concurrent users?
* Data model? How will the data be queried? Joins? Structured? Semi-Structured?
* Strong schema? More flexibility? Reporting? Search? RDBMS? NoSQL?
* License cost? Switch to Cloud-Native DB such as Aurora?

### Database Types

* **RDBMS (= SQL, OLTP)**: RDS, Aurora - great for joins.
* **NoSQL database**: DynamoDB (~JSON), ElastiCache (key, value pairs), Neptune (graphs) - no joins, no SQL.
* **Object Store**: S3 (for big objects), Glacier (for backups, archives).
* **Data Warehouse (= SQL Analytics, BI)**: Redshift (OLAP), Athena.
* **Search**: ElasicSearch (JSON) - free text, unstructured searches.
* **Graphs**: Neptune - displays relationship between data.

## RDS Overview

Managed PostgreSQL, MySQL, Oracle, SQL Server

* Must provision an EC2 Instance and EBS Volume type and size.
* Support for Read Replicas in Multi-AZ.
* Security through IAM, Security Groups, KMS, SSL in-transit.
* Backup, Snapshot, and Point-in-time restore feature.
* Managed and Scheduled maintenance.
* Monitored through CloudWatch.
* **Use-case**: Store relational datasets (RDBMS, OLTP), perform SQL queries, transactional insert, update, delete are available.

### RDS for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | Small downtime when failover happens, when maintenance happens, scaling in read replicas, EC2 Instance, restore EBS implies manual intervention, application changes. |
| **Security** | AWS responsible for OS security, developers are responsible for setting up KMS, security groups, IAM policies, authorizing users in DB, using SSL. |
| **Reliability** | Multi-AZ feature, failover in case of failures. |
| **Performance** | Depends on EC2 Instance types, EBS volume type, ability to add Read Replicas. Storage auto-scaling and manual scaling of instances. |
| **Cost** | Pay per hour based on provisioned EC2 and EBS. |

## Aurora Overview

* Compatible API for PostgreSQL and MySQL.
* Data is held in six (6) replicas, across 3 AZs.
* Auto healing capability.
* Multi-AZ, Auto Scaling Read Replicas.
* Read Replicas can be Global.
* Aurora database can be Global for Disaster Recovery or latency purposes.
* Auto scaling of storage from 10GB to 128TB.
* Define EC2 Instance type for Aurora instances.
* Same security, monitoring, and maintenance features as RDS.
* **Aurora Serverless** - for unpredictable, intermittent workloads.
* **Aurora Multi-Master** - for continuous writes failover.
* **Use-cases**: Same as RDS, but with less maintenance, more flexibility, and more performance.

### Aurora for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | Less operations, auto-scaling storage. |
| **Security** | AWS responsible for OS security, developers are responsible for setting up KMS, security groups, IAM policies, authorizing users in DB, using SSL. |
| **Reliability** | Multi-AZ, highly available, possibly more than RDS, Aurora Serverless option, Aurora Multi-Master option. |
| **Performance** | 5x performance (according to AWS) due to architectural optimizations. Up to 15 Read Replicas (only 5 for RDS). |
| **Cost** | Pay per hour based on EC2 and storage usage. Possibly lower costs compared to Enterprise-grade databases such as Oracle. |

## ElastiCache

Managed Redis, Memcached (similar offering as RDS, but for caches).

* In-memory data store, sub-millisecond latency.
* Must provision an EC2 Instance type.
* Support for Clustering (Redis) and Multi-AZ, Read Replicas (sharding).
* Security through IAM, Security Groups, KMS, Redis Auth.
* Backup, Snapshot, Point-in-time restore features.
* Managed and Scheduled maintenance.
* Monitoring through CloudWatch.
* **Use-case**: Key/Value store, frequent reads, less writes, cache results for DB queries, store session data for websites, cannot use SQL.

### ElastiCache for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | Same as RDS.  |
| **Security** | AWS responsible for OS security, developers are responsible for setting up KMS, security groups, IAM policies, users (Redis Auth), using SSL. |
| **Reliability** | Clustering, Multi-AZ. |
| **Performance** | Sub-millisecond performance, in-memory, read replicas for sharding, very popular cache option. |
| **Cost** | Pay per hour based on EC2 and storage usage. |

## DynamoDB

AWS proprietary technology and managed NoSQL database.

* Serverless, provisioned capacity, auto-scaling, on-demand capacity (Nov 2018).
* Can replace ElastiCache as a key/value store (storing session data for example).
* Highly available, Multi-AZ by default, Read and Writes are decoupled, DAX for read-cache.
* Reads can be eventually consistent or strongly consistent.
* Security, authentication, and authorization is done through IAM.
* DynamoDB Streams to integrate with AWS Lambda.
* Backup and Restore feature, Global Table feature.
* Monitoring through CloudWatch.
* Can only query on the primary key, sort key, or indexes.
* **Use-case**: Serverless applications development (small documents, 100s KB), distributed serverless cache, does not have SQL query language available, has transactions capability as of Nov 2018.

### DynamoDB for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | No operations needed, auto-scaling capability, serverless.  |
| **Security** | Full security through IAM policies, KMS encryption, SSL in-flight. |
| **Reliability** | Multi-AZ, Backups. |
| **Performance** | Single-digit millisecond performance, DAX for caching reads, performance does not degrade if the application scales. |
| **Cost** | Pay per provisioned capacity and storage usage (no need to guess in advance any capacity - can use auto-scaling). |

## S3

S3 is a key/value store for objects.

* It is great for big objects, not so great for small objects.
* Serverless, scales infinitely, the maximum object size is 5TB.
* String consistency.
* Tiers: S3 Standard, S3 IA, S3 One Zone IA, Glacier for backups.
* Features: Versioning, Encryption, Cross-Region Replication, etc. ...
* Security: IAM, Bucket Policies, ACL.
* Encryption: SSE-S3, SSE-KMS, SSE-C, client-side encryption, SSL in-transit.
* **Use-case**: Static files, key/value store for big files, website hosting.

### S3 for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | No operations needed.  |
| **Security** | IAM, Bucket Policies, ACL, Encryption (server/client), SSL. |
| **Reliability** | 99.999999999% durability, 99.99% availability, Multi-AZ, CRR. |
| **Performance** | Scales to thousands of reads, writes per second, transfer acceleration, multi-part uploads for big files. |
| **Cost** | Pay per storage usage, network costs, number of requests. |

## Athena

Fully Serverless database with SQL capabilities.

* Used to query data in S3.
* Pay per query.
* Output results back to S3.
* Secured through IAM.
* **Use-case**: One-time SQL queries, serverless queries on S3, log analytics.

### Athena for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | No operations needed, serverless.  |
| **Security** | IAM, plus S3 security. |
| **Reliability** | Managed service, uses Presto engine, highly available. |
| **Performance** | Queries scale based on data size. |
| **Cost** | Pay per query / per TB of data scanned, serverless. |

## Redshift

Redshift is based on PostgreSQL but **it is not used for OLTP**.

* **It is OLAP - online analytical processing (analytics and data warehousing)**.
* 10x better performance than other data warehouses, scales to PBs of data.
* **Columnar** storage of data (instead of row-based).
* Massively Parallel Query Execution (MPP).
* Pay-as-you-go based on the instances provisioned.
* Has a SQL interface for performing the queries.
* BI tools such as AWS Quicksight or Tableau integrate with it.
* Data is loaded from S3, DynamoDB, DMS, other DBs, ...
* From 1-node to 128-nodes, up to 128TB of space per node.
* **Leader node**: For query planning, aggregation of results.
* **Compute node**: For performing the queries, send results to leader.
* **Redshift Spectrum**: Perform queries directly against S3 (no need to load).
* Backup and Restore, Security VPC, IAM, HMS, and Monitoring.
* **Redshift Enhanced VPC Routing**: COPY and UNLOAD go through the VPC.

### Snapshots and Disaster Recovery

* **Redshift has no "Multi-AZ" mode**.
* Snapshots are point-in-time backups of a cluster, stored internally in S3.
* Snapshots are incrementally (only what has changed is saved).
* Can restore a snapshot into a **new cluster**.
* Automated: Every 8-hours, every 5GB, or on a schedule. Set retention.
* Manual: Snapshot is retained until it is deleted.
* **Can configure Amazon Redshift to automatically copy snapshots (automated or manual) of a cluster into another AWS Region**.

### Loading Data into Redshift

1. Amazon Kinesis Data Firehose.
2. S3 using COPY command.
3. EC2 Instance JDBC driver.

### Redshift Spectrum

* Query data that is already in S3 without loading it.
* **Must have a Redshift cluster available to start the query**.
* The query is then submitted to thousands of Redshift Spectrum nodes.

### Redshift for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | Like RDS.  |
| **Security** | Like RDS. |
| **Reliability** | Auto healing features, cross-region snapshot copy. |
| **Performance** | 10x performance versus other data warehousing, compression. |
| **Cost** | Pay per node provisioned, 1/10th the cost versus other warehouses. |
| **versus Athena** | Faster queries, joins, aggregations thanks to indexes. |

## Glue

Managed **extract, transform, and load (ETL)** service in AWS.

* Useful to prepare and transform data for analytics.
* Fully **serverless** service.

### Glue Data Catalog

* Catalog of the datasets in AWS (metadata).

## Neptune

Fully managed **graph** database.

* Highly available across 3 AZs, with up to 15 read replicas.
* Point-in-time recovery, continuous backup to Amazon S3.
* Support for KMS encryption at-rest and HTTPS.

Examples ...

* High relationship data.
* Social Networking: User is friends with Users, replied to comments on the post of users, and likes other comments.
* Knowledge graphs (Wikipedia).

### Neptune for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | Similar to RDS.  |
| **Security** | Similar to RDS with IAM Authentication. |
| **Reliability** | Multi-AZ, clustering. |
| **Performance** | Best suited for graphs, clustering to improve performance. |
| **Cost** | Pay per node provisioned (similar to RDS). |

## ElasticSearch / OpenSearch

> **Amazon ElasticSearch Service** is now **Amazon OpenSearch Service**.

* Background: In DynamoDB, can only find data by primary key or indexes.
* With ElasticSearch, can **search any field**, even partial matches.
* It is common to use ElasticSearch as a complement to another database.
* ElasticSearch also has some usage for Big Data applications.
* Can provision a cluster of instances.
* Built-in integrations: Amazon Kinesis Data Firehose, AWS IoT, and Amazon CloudWatch Logs for data ingestion.
* Security through Cognito and IAM, KMS encryption, SSL, and VPC.
* Comes with Kibana (visualization) and Logstash (log ingestion) - ELK stack.

### ElasticSearch for Solutions Architect

| Pillar | Detail |
|--------|--------|
| **Operations** | Similar to RDS.  |
| **Security** | Cognito, IAM, VPC, KMS, SSL. |
| **Reliability** | Multi-AZ, clustering. |
| **Performance** | Based on ElasticSearch project (open-source), PB scale. |
| **Cost** | Pay per node provisioned (similar to RDS). |
