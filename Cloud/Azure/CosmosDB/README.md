# Data Modeling and Partitioning Patterns in Azure Cosmos DB

## Definition

NoSQL Database that runs on Azure

* Global Distribution
* Horizontally Partitioned
* Provisioned Throughput
* Schema-Free

## SQL

| Customers | Products | Sales Orders |
|----------------|----------|--------------|
| Addresses (1:many) | Categories (1:many) | Details (1:many) |
| Password (1:1) | Tags (many:many) |  |

## Cosmos DB

| Structure | Thoughts | Performance |
|-|-|-|
| **Container per Table** | Should you? worst design| Perform poorly and difficult to maintain. |
|  |  |  |

### Partitioning

Logical Partitions based on the `partitionKey` groups documents together. Guaranteed to be phyically stored on the same server.

Example:

Partition key: `/username`

All documents related to a user are stored in logical partitions.

#### Constraints

* Maximum document size: 2 MB.
* Maximum logical partition size: 20 GB.

#### Hot Partitions

Some large partitions versus some smaller partitions. This generates "hot" partitons. Try for good distributions and access patterns (read and write).

#### Single-partition versus Cross-partition Queries

1. **Single-partition Query**: Retrieving all records for a single user.
2. **Cross-partition Query**: Run on all servers in the cluster (fan-out queries). Generally ***undesireable*** (avoid most of the time).

#### Choosing a Partition Key

Need to be looking for absolute uniqueness between the `id` and partition key, while grouping on the partition key itself.

Know the operations:

1. Creating a record.
2. Query that record by `id`.

### Rework

1. Convert to JSON formatted structure.
2. Convert ID fields to `id`.
3. Embed linked information into parent object; combining tables into the structure.

#### Embedding versus Reference

* **Embed**: (1:1) or (1:few) relationship. Related items are queried or updated together.
* **Reference**: (1:many) or (many:many) relationships. Related items are queried or updated seperately.
