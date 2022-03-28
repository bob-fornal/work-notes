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
