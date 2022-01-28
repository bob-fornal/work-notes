# Advanced S3 and Athena

## S3 MFA-Delete

**Only the bucket owner (root account) can enable/disable MFA-Delete**.

* Multi-Factor Authentication (MFA) forces users to generate a code on a device (usually a mobile phone or hardware) before doing important operations on S3.
* To use MFA-Delete, enable Versioning on the S3 bucket.
* MFA-Delete currently can only be enabled using the CLI.

### MFA Needed To

* Permanently delete an object version.
* Suspend versioning on the bucket.

### MFA Not Needed

* Enabling versioning.
* Listing deleted versions.

## S3 Default Encryption

One way to "force encryption" is to use a Bucket Policy and refuse any API call to PUT an S3 object without encryption headers ...

```json
{
  "Version": "2012-10-17",
  "Id": "PutObjPolicy",
  "Statement": [
    {
      "Sid": "DenyIncorrectEncryptionHeader",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::<BUCKET_NAME>/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "AES256"
        }
      }
    },
    {
      "Sid": "DenyUnencryptedObjectUploads",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::<BUCKET_NAME>/*",
      "Condition": {
        "Null": {
          "s3:x-amz-server-side-encryption": true
        }
      }
    }
  ]
}
```

* Another way to "force encryption" is to use the "default encryption" option in S3.
* **NOTE**: Bucket Policies are evaluated before "default encryption."

## S3 Access Logs

* For audit purposes, may want to log all access to S3 buckets.
* Any request made to S3, from any account, authorized or denied, will be logged into another S3 bucket.
* The data can be analyzed using a data analysis tool.

### Warning

* Do not set the logging bucket to be the monitored bucket.
* This will create a logging loop and **the bucket will grow exponentially in size**.

## S3 Replication

CRR and SRR = Cross Region Replication and Same Region Replication

* **Must enable versioning** in source and destination.
* Buckets can be in different accounts.
* Copying is asynchronous.
* Must give proper IAM permissions to S3.

### Use Cases

* **CRR Use Cases**: Compliance, lower latency access, replication across accounts.
* **SRR Use Cases**: Log aggregation, live replication between production and test accounts.

### Notes

* After activating, only new objects are replicated (not retroactive).

For DELETE operations ...

* Can replicate delete markers from source to target (optional setting).
* Deletions with a version ID are not replicated (to avoid malicious deletes).

There is no "chaining" of replication ...

* If bucket 1 has replication into bucket 2, which has replication into bucket 3.
* The objects created in bucket 1 are not replicated into bucket 3.

## S3 Pre-signed URLs

Can generate pre-signed URLs using SDK or CLI ...

* For downloads (easy, can use the CLI).
* For uploads (harder, must use the SDK).

Valid for a default of 3,600 seconds. Can change timeout with `expires-in [TIME_IN_SECONDS]` argument.

* Users given a pre-signed URL inherit the permissions of the person who generated the URL for GET/PUT.

Examples ...

* Allow only logged-in users to download a premium video on the S3 bucket.
* Allows an ever changing list of users to download files by generating URLs dynamically.
* Allow a user to temporarily upload a file to a precise location in the bucket.

## S3 Storage Classes

* `[DEPRECATED]` Amazon S3 Reduced Redundancy Storage (omitted)

### Amazon S3 Standard - General Purpose

* High durability 99.999999999% of objects across multiple AZ.
* 99.99% Availabiity over a given year.
* Sustain two (2) concurrent facility failures.

#### Use Cases

Big Data analytics, mobile and gaming applications, content distribution.

### Amazon S3 Standard-Infrequent Access (IA)

* Suitable for data that is less frequently accessed, but requires rapid access when needed.
* High durability 99.999999999% of objects across multiple AZ.
* 99.9% Availabiity over a given year.
* Lower cost compared to Amazon S3 Standard.
* Sustain two (2) concurrent facility failures.

#### Use Cases

As a data store for disaster recovery, backups.

### Amazon S3 One Zone-Infrequent Access

* Same as IA but data is stored in a single AZ.
* High durability 99.999999999% of objects in a single AZ; data is lost if AZ is destroyed.
* 99.5% Availabiity over a given year.
* Low latency and high thoughput performance.
* Supports SSL for data in-transit and encryption-at-rest.
* Lower cost compared to IA (by 20%).

#### Use Cases

Storing secondary backup copies of on-premise data, or storing data that can be recreated.

### Amazon S3 Intelligent Tiering

* Same low latency and high throughput performance of S3 Standard.
* Small monthly monitoring and auto-tiering fee.
* Automatically moves objects between two access tiers based on changing access patterns.
* Designed for durability of 99.999999999% of objects across multiple AZ.
* Resilient against events that impact an entire AZ.
* 99.9% Availabiity over a given year.

### Amazon Glacier

* Low cost object storage meant for archiving/backup.
* Data is retained for longer terms (10s of years).
* Alternative to on-premise magnetic tape storage.
* Designed for durability of 99.999999999%.
* Const per storage per month ($0.004/GB) + retrieval cost.
* Each item in Glacier is called an "**Archive**" (up to 40TB).
* Archives are stored in "**Vaults**."

#### Retrieval Options

Minimum storage duration of 90-days.

* Expedited (1 to 5 minutes)
* Standard (3 to 5 hours)
* Bulk (5 to 12 hours)

### Amazon Glacier Deep Archive

* Long term storage - cheaper.

#### Retrieval Options

Minimum storage duration of 180-days.

* Standard (12 hours)
* Bulk (48 hours)

## S3 Lifecycle Rules

Moving Between Storage Classes

* Transition objects between storage classes.
* For infrequently accessed objects, move them to STANDARD_IA.
* For archive objects not needed in real-time, GLACIER or DEEP_ARCHIVE.
* Moving objects can be automated using a **lifecycle configuration**.

### Actions

#### Transition Actions

It defined when objects are transitioned to another storage class.

* Move objects to Standard IA class 60-days after creation.
* Move to Glacier for archiving after 6-months.

#### Expiration Actions

Configure objects to expire (delete) after some time.

* Access log files can be set to delete after 365-days.
* **Can be used to delete old versions of files (if versioning is enabled)**.
* Can be used to delete incomplete multi-part uploads.

Notes

* Rules can be created for a certain prefix (example - `s3://mybucket/mp3/*`).
* Rules can be created for certain object tags (example - `Department: Finance`).

## S3 Analytics

* S3 Analytics can be setup to help determine when to transition objects from Standard to Standard_IA.
* This does not work for ONEZONE_IA or GLACIER.
* The report us updated daily.
* It takes about 24 to 48-hours to first start.
* It is a good first step to put together (or improve) Lifecycle Rules.

## S3 - Baseline Performance

* Amazon S3 automatically scales to high requests rates, latency 100-200ms.
* An application can achieve at least **3,500 PUT, COPY, POST, DELETE** and **5,500 GET, HEAD** requests per second per prefix in a bucket.
* There is no limit to the number of prefixes in a bucket.

Examples

| Object Path              | Prefix        |
|--------------------------|---------------|
| bucket/folder1/sub1/file | /folder/sub1/ |
| bucket/folder1/sub2/file | /folder/sub2/ |
| bucket/1/file            | /1/           |
| bucket/2/file            | /2/           |

* If reads are spread across the prefixes evenly, this example can achieve 22000 requests per second for GET and HEAD.

## S3 - KMS Limitation

* If SSE-KMS is used, the KMS limits may cause impacts.
* When objects are uploaded, it calls the **GenerateDataKey KMS API**.
* When objects are downloaded, it calls the **Decrypt KMS API**.
* These calls count toward the KMS quota per second (5,000, 10,000, 30,000 requests per second based on region).
* A quota increase can be requested using the Service Quotas Console.

## S3 Performance

### Multi-Part Upload

* Recommended for files > 100MB, must use for files > 5GB.
* Can help parallelize uploads (speed up transfers).

### S3 Transfer Acceleration

* Increase transfer speed by transferring files to an AWS edge location which will forward the data to the S3 bucket in the target region.
* Compatible with multi-part upload.

## S3 Byte Range Fetches

* Parallelize GETs by requesting specific byte ranges.
* Better resilience in case of failures.
* **Can be used to speed up downloads**.
* **Can be used to retrieve only partial data (for example, the head of a file)**.

## S3 Select and Glacier Select

* Retrieve less data using SQL by performing **server side filtering**.
* Can filter by rows and columns (simple SQL statements).
* Less network transfer, less CPU cost client-side.

## S3 Event Notifications

* `S3:ObjectCreated`, `S3:ObjectRemoved`, `S3:ObjectRestore`, `S3:ObjectReplication`, ...
* Object name filtering possible (*.jpeg).
* **Use Case**: Generate thumbnails of images uploaded to S3.
* **Can create as many "S3 events" as desired**.
* S3 event notifications typically deliver events in seconds but can sometimes take a minute or longer.
* If two writes are made to a single non-versioned object at the same time, it is possible that only a single event notification will be sent.
* To ensure that an event notificaiton is sent for every successful write, enable versioning on the bucket.

## S3 Requester Pays

* In general, bucket owners pay for all Amazon S3 storage and data transfer costs associated with their bucket.
* **With Requester Pays buckets**, the requester instead of the bucket owner pays the cost of the request and the data download from the bucket.
* This is helpful when sharing large datasets with other accounts.
* The requester must be authenticated in AWS (cannot be anonymous).

## Athena Overview

* **Serverless** query service to **perform analytics against S3 objects**.
* Uses standard SQL language to query the files.
* Supports CSV, JSON, ORC, Avro, and Parquet (built on Presto).
* Pricing: $5.00 per TB of data scanned.
* Use compressed or columnar data for cost savings (less scan).
* **Use Cases**: Business intelligence, analytics, reporting, analyze and query VPC Flow Logs, ELB Logs, CloudTrail trails, etc. ...
* **EXAM TIP**: Analyze data in S3 using serverless SQL, use Athena.

## Glacier Vault Lock

* Adopt a WORM (Write Once Read Many) model.
* Lock the policy for future edits (can no longer be changed).
* Helpful for compliance and data retention.

## S3 Object Lock

(Versioning must be enabled)

* Adopt a WORM (Write Once Read Many) model.
* Block an object version deletion for a specified amount of time.

### Object Retention

* **Retention Period**: Specifies a fixed period.
* **Legal Hold**: Same protection, no expiration date.

### Modes

* **Governance Mode**: Users cannot overwrite or delete an object version or alter its lock settings unless they have special permissions.
* **Compliance Mode**: A protected object version cannot be overwritten or deleted by any user, including the root user. When an object is locked in compliance mode, its retention mode cannot be changed, and its retention period cannot be shortened.
