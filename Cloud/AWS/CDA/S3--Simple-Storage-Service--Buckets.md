# S3: Simple Storage Service Buckets

* Amazon S3 allows people to store objects (files) in “buckets” (directories).
* Each bucket must have a globally unique name.
* Buckets are defined at the Region level.

## Naming Conventions

* No uppercase
* No underscore
* 3-63 characters long
* Not an IP
* Must start with lowercase letter or number

## Objects

* Objects (files) have a Key. The key is the FULL path:

    ```script
    <mybucket>/myfile.txt
    <mybucket>/myfolder/anotherfolder/myfile.txt
    ```

* There is no concept of “directories” within buckets
* There are keys with very long names that contain slashes (“/“)
* Object Values are the content of the body:

    * Max Size is 5TB
    * If uploading more than 5GB, must use “multi-part upload”

* Metadata (list of text key / value pairs - system or user metadata)
* Tags (Unicode key / value pair - up to 10) - useful for security / lifecycle
* Version ID, if enabled.

## AWS S3 - Versioning

* Is enabled at the bucket level
* Same key overwrite will increment the “version”: 1, 2, 3

It is best practice to version buckets

* Protect against unintended deletes (ability to restore a version)
*  Easy roll back to previous versions

Any file that is not version prior to enabling versioning will have the version “null”

## S3 Encryption for Objects

There are 4 methods of encrypt objects in S3

1. SSE-S3: encrypts S3 objects

* Encryption using keys handled & managed by AWS S3
* Object is encrypted server side
* AES-256 encryption type
* Must set header: “x-amz-server-side-encryption”:”AES256”

2. SSE-KMS: encryption using keys handled & managed by KMS

* KMS Advantages: user control + audit trail
* Object is encrypted server side
* Maintain control of the rotation policy for the encryption keys
* Must set header: “x-amz-server-side-encryption”:”aws:kms”

3. SSE-C: server-side encryption using data keys fully managed by the customer outside of AWS

* Amazon S3 does not store the encryption key provided
* HTTPS must be used
* Encryption key must provided in HTTP headers, for every HTTP request made

4. Client Side Encryption

* Client library such as the amazon S3 Encryption Client
* Clients must encrypt data themselves before sending to S3
* Clients must decrypt data themselves when retrieving from S3
* Customer fully manages the keys and encryption cycle

## Encryption in transit (SSL)

AWS S3 exposes:

* HTTP endpoint: non encrypted
* HTTPS endpoint: encryption in flight
* HTTPS is mandatory for SSE-C
* Encryption in flight is also called SSL / TLS

## S3 Security

### User based

* IAM policies - which API calls should be allowed for a specific user from IAM console

### Resource based

* Bucket policies - bucket wide rules from the S3 console - allows cross account
* Object Access Control List (ACL) - finer grain
* Bucket Access Control List (ACL) - less common

## Networking

* Support VPC endpoints (for instances in VPC without www internet)

## Logging and Audit

* S3 access logs can be stored in other S3 buckets
* API calls can be logged in AWS CloudTrail

## User Security

* MFA (multi factor authentication) can be required in versioned buckets to delete objects
* Signed URLs: URLS that are valid only for a limited time (ex: premium video services for logged in users)

## S3 Bucket Policies

JSON based policies

* Resources: buckets and objects
* Actions: Set of API to Allow or Deny
* Effect: Allow / Deny
* Principal: The account or user to apply the policy to

Use S3 bucket for policy to:

* Grant public access to the bucket
* Force objects to be encrypted at upload
* Grant access to another account (Cross Account)

Policies can be verified via:

* AWS Policy Simulator
* AWS CLI `--dry-run`

## S3 Websites

S3 can host static website sand have them accessible on the world wide web

The website URL will be:

* .s3-website..amzonaws.com -OR-
* .s3-website..amazonaws.com

A 403 (forbidden) error, make sure the bucket policy allows public reads!

## S3 CORS

* When request data from another S3 bucket, enable CORS.
* Cross Origin Resource Sharing limits the number of websites that can request the files in S3 (and limit costs).

## AWS S3 - Consistency Model

Read after write consistency for PUTS of new objects

* As soon as an object is written, we can retrieve itex: (PUT 200 -> GET 200)
* This is true, except if we did a GET before to see if the object existedex: (GET 404 -> PUT 200 -> GET 404) - eventually consistent

Eventual Consistency for DELETES and PUTS of existing objects

* If we read an object after updating, we might get the older versionex: (PUT 200 -> PUT 200 -> GET 200 (might be older version))
* If we delete an object, we might still be able to retrieve it for a short timeex: (DELETE 200 -> GET 200)

## AWS S3 - Other

S3 can send notifications on changes to

* AWS SQS: queue service
* AWS SNS: notification service
* AWS Lambda: serverless service

S3 has a cross region replication feature (managed)

## S3 MFA Delete

* Only the ROOT account can enable or disable MFA Delete.
* MFA Delete can only be enabled via CLI.

## S3 Default Encryption

Policies are applied before "Default Encryption."

## S3 Access Logs

* Any request can be logged to another S3 bucket.
* Analyze via analysis tools or Amazon Athena.

DO NOT set logging bucket to be the monitoring bucket.

## S3 Replication

**CRR**: Cross-Region Replication

**SRR**: Same-Region Replication

* Versioning must be enabled in source and destination.
* Buckets can be in different accounts.
* Copying is asynchronous.
* Proper IAM Role needs to be attached to the S3.

## S3 Presigned URLs

* Can be generated using SDK or CLI.
* Expiration default: 3,600-seconds.

## S3 Storage Classes

* Amazon S3 Standard - General Purpose
* Amazon S3 Standard Infrequent-Access
* Amazon S3 One-Zone Infrequent-Access
* Amazon S3 Intelligent Tiering
* Amazon Glacier
* Amazon Glacier Deep Archive
* Amazon S3 Reduced Redundancy Storage (deprecated)

## S3 Lifecycle Rules

* Transition Actions - define when objects are transitioned to another storage class.
* Expiration Actions - configure objects to expire (delete) after some time.

Rules:

* Rules can be created for a specific prefix.
* Rules can be created for specific object tags.

## S3 Performance

Faster upload of large objects (>5GB), use multipart upload

* Parallelizes PUTs for greater throughput
* Maximize network bandwidth
* Decrease time to retry in case a part fails

More:

* Use CloudFront to access S3 objects around the world (improves reads).
* S3 Transfer Acceleration (uses edge locations) - just need to change the endpoint, not the code.
* If using SSE-KMS encryption, may be limited to AWS limits for KMS usage (~100s - 1000s downloads / uploads per second).

