# DynamoDB (No-SQL)

* Non Relational DB (No-SQL), comprised of collections (tables), of documents (rows), with each document consisting of key/value pairs (fields)
* Document oriented DB
* Offers push button scaling, meaning that you can scale your db on the fly without any downtime
* RDS is not so easy, you usually have to use a bigger instance size or add read replicas
* Stored on SSD Storage
* Spread across 3 geographically distinct data centers
* Eventual Consistent Reads (Default)

> Consistency across all copies of data is usually reached within 1 second

> Repeating a read after a short time should return updated data

> Best Read Performance

* Strongly Consistent Reads

> Returns a result that reflects all writes that received a successful response prior to the read

* Structure:

> Tables

> Items (Think rows in a traditional table)

> Attributes (Think columns of data in a table)

* Provisioned throughput capacity
* Write throughput 0.0065 per hour for every 10 units
* Read throughput 0.0065 per hour for every 50 units
* First 25 GB of storage is free
* Storage costs of 25 cents per additional GB per Month
* Can be expensive for writes, but really really cheap for reads
* The combined key/value size must not exceed 400 KB for any given document

### Developer Associate Specific Topics

* Supports attribute nesting up to 35 levels
* Conditional writes are idempotent, you can send the same conditional write request multiple times, but it will have no further effect on the item after the first time DynamoDB performs the update
* Supports atomic counters, using the `UpdateItem` operation to increment or decrement the value of an existing attribute without interfering with other write requests
* Atomic counter updates are not idempotent, the counter will increment each time you call `UpdateItem`
* If you can have a small margin of error in your data, then use atomic counters
* If your application needs to read multiple items, you can use the `BatchGetItem` API endpoint; A single request can retrieve up to 1MB of data with as many as 100 items
* A single `BatchGetItem` request can retrieve items from multiple tables
* All write requests are applied in the order in which they are received

#### Pricing (calculate the amount of writes and reads per second):

* Divide total number of writes per day / 25 (hours) / 60 (minutes) / 60 (seconds) = No. writes per second
* A write or read capacity unit can handle 1 write/read per second
* Individual items or the entire table can be exported to CSV

Example:

* Using 28 GB of storage
* 1,000,000 writes per day = 1,000,000/24 = 41,666.67
* 41,666.67 / 60 (minutes) = 694.44
* 694.44 / 60 (seconds) = 11.574 writes per second
* This example would require 12 write capacity units (single capacity unit is 1 write per second)
* Charge for write is $0.0065 per 10 units
* $0.0065 / 10 = $0.00065 per unit
* $0.00065 * 12 (required write units) = $0.0078
* $0.0078 * 24 (hours per day) = $0.1872 per day for writes
* Charge for read is $0.0065 per 50 units
* $0.0065 / 50 = $0.00013 per unit
* $0.00013 * 12 (required read units) = $0.00156
* $0.00156 * 24 (hours per day) = $0.03744 per day for reads
* Using 28 GB storage with first 25 GB free = 3 GB storage required
* 3 GB * $0.25 per GB (after initial 25) = $0.75

### Indexes

#### Primary Key

Single attribute (unique ID):

* Partition Key (Hash Key composed of one attribute)
* Partition Key's value is used as input to an internal hash function which output determines the partition (physical location in which the data is stored)
* No 2 items in a table can have the same partition key value

Composite (unique ID and date range):

* Partition Key & Sort Key (Hash and Range) composed of two attributes
* Partition Key's value is used as input to an internal hash function which output determines the partition (physical location in which the data is stored)
* 2 Items can have the same partition key, but they MUST have a different sort key
* All Items with the same partition key are stored together, in sorted order by the sort key value

#### Local Secondary Index (LSI)

* Has the SAME partition key, but different sort key
* Can ONLY be created when creating a table
* Can not be removed or modified after creation
* Can have up to 5 LSI's per table

#### Global Secondary Index (GSI)

* Has DIFFERENT partition key and different sort key
* Can be created at table creation or added LATER
* Can have up to 5 GSI's per table

### Streams

* Used to capture any kind of modification of the DynamoDB tables
* If new item is added to the table, the stream captures an image of the entire item, including all of its attributes
* If an item is updated, the stream captures the before and after image of any attributes that were modified in the item
* If an item is deleted from the table, the stream captures an image of the entire item before it was deleted
* Streams are stored for 24 hours and then is lost
* Streams can trigger functions with Lambda that will perform actions based on the instantiation of a stream event

### Querys

* Operation that finds items in a table using only the primary key attribute value
* Must provide a partition attribute name and distinct value to search for
* Optionally can provide a sort key attribute name and value and use comparison operator to refine the search results
* By default a query returns all of the data attributes for items with the specified primary key(s)
* The ProjectionExpression parameter can be used to only return some of the attributes from a query as opposed to the default all
* Results are always sorted by the sort key
* If the data type of the sort key is a number, the results are returned in numeric order
* If the data type of the sort key is a string, the results are returned in order of ASCII character code values
* Sort order is ascending, the ScanIndexForward parameter can be set to false to sort in descending order
* By default queries are eventually consistent but can be changed to strongly consistent
* More efficient then a scan operation
* For quicker response times, design your tables in a way that can use the query, GET, or `BatchGetItem` API

### Scans

* Examines every item in the table
* By default, a scan returns all of the data attributes for every item
* Can use the `ProjectionExpression` parameter so that the scan only returns some of the attributes, instead of all
* Always scans the entire table, then filters out values to provide the desired result (added step of removing data from initial dataset)
* Should be avoided on a large table with a filter that removes many results
* As table grows, the scan operation slows
* Examines every item for the requested values, and can use up provisioned throughput for a large table in a single operation

### Provisioned Throughput

400 HTTP status code - `ProvisionedThroughputExceededException` error will indicate that you exceeded your max allowed provisioned throughput for a table or for one or more GSI's

Unit of read provisioned throughput:

* All reads are rounded up to increments of 4 KB
* Eventual consistent reads (default) consist of 2 reads per second
* Strongly consistent reads consist of 1 read per second
* Take the (size of the read rounded to the nearest 4 KB chunk / 4 KB) * No. of items = read throughput
* Divide by 2 if eventually consistent

Example:

* Application requires to read 10 items of 1 KB per second using eventual consistency, whats the read throughput
* Calculate the number of read units per item needed
* 1 KB rounded to the nearest 4 KB increment = 4 (KB) or a single chunk
* 4 KB / 4 KB = 1 read unit per item
* 1 x 10 read items = 10
* Using eventual consistency is 10 /2 = 5
* 5 units of read throughput

Example 2:

* Application requires to read 10 items of 6 KB per second using eventual consistency, whats the read throughput
* Calculate the number of read units per item needed
* 6 KB rounded to the nearest 4 KB increment = 8 (KB) or 2 chunks of 4 KB
* 8 KB / 4 KB = 2 read unit per item
* 2 x 10 read items = 20
* Using eventual consistency is 20 /2 = 10
* 10 units of read throughput

### Unit of write provisioned throughput

* All writes are 1 KB
* All writes consist of 1 write per second

Example:

* Application requires to write 5 items with each being 10KB in size per second
* Each write unit consists of 1 KB of data, need to write 5 items per second with each item using 10 KB of data
* 5 items * 10 KB = 50 write units
* Write throughput is 50 units

Example 2:

* Application requires to write 12 items with each being 100KB in size per second
* Each write unit consists of 1 KB of data, need to write 12 items per second with each item using 100 KB of data
* 12 items * 100 KB = 1200 write units
* Write throughput is 1200 units

### Web Identity Providers

* Authenticate users using Web Identity Providers such as Facebook, Google, Amazon or any other ID Connect-compatible identity provider
* Accomplished using `AssumeRoleWithWebIdentity` API
* Need to create a role first

Process:

* User authentication request sent and received with the identity provider such as Facebook, Google, etc..
* Web Identity token returned from provider
* Token, App ID of provider, and ARN of IAM Role sent to `AssumeRoleWithIdentity` API endpoint
* AWS issues temporary security credentials back to the user allowing the user to access resources (1 hour default)
* Temporary security credentials response consist of 4 things:

1. AccessKeyID, SecretAccessKey, SessionToken
2. Expiration (time limit, 1 hour by default)
3. AssumeRoleID
4. SubjectFromWebIdentityToken

