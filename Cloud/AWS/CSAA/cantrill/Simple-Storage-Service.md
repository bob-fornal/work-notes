# Simple Storage Service (S3)

## S3 Security

* **S3 is private by default**.

S3 Bucket Policies ...

* A form of resource policy.
* A resource policy is like an identity policy, but attached to a bucket.
* Resource perspective permissions.
* Can `ALLOW` or `DENY` access on the same or different accounts.
* Can `ALLOW` or `DENY` to anonymous principals.

Access Control Lists (ACLs) ...

* Are on objects and buckets.
* A subresource.
* Legacy.
* Inflexible and only allow simple permissions.

| Permission | Bucket | Object |
|----------------|--------|--------|
| READ | Allows grantee to list the objects in the bucket. | Allows grantee to read the object data and its metadata. |
| WRITE | Allows grantee to create, overwrite, and delete any object in the bucket. | NA |
| READ_ACP | Allows grantee to read the bucket ACL. | Allows grantee to read the object ACL. |
| WRITE_ACP | Allows grantee to write the ACL for the applicable bucket. | Allows grantee to write the ACL for the applicable object. |
| FULL_CONTROL | Allow grantee the READ, WRITE, READ_ACP, and WRITE_ACP permissions on the bucket. |  Allow grantee the READ, WRITE, READ_ACP, and WRITE_ACP permissions on the object. |

Security ...

* Identity: Controlling different resources.
* Identity: Preference for IAM.
* Identity: Same account.
* Bucket: Just controlling S3.
* Bucket: Anonymous or Cross-Account.
* ACLs: NEVER - unless there is no choice.

## S3 Static Hosting

* Normal access is via **AWS APIs**.
* This feature allows access via **HTTP** - for example, a simple blog.
* Index and Error documents are set.
* A static **Website Endpoint** is created.
* Custom Domain via Route 53, then **Bucketname Matters**.

## DEMO: Create a static website with S3

1. Go to the S3 Console.
2. Click on the **Create bucket** button.
3. Bucket Name: `top10.<domain-name>.com`.
4. Uncheck "Block all public access" and acknowledge.
5. Click on the **Create bucket** button.
6. Click on the name of the bucket.
7. Go to the Properties tab.
8. Find "Static website hosting" and click on the **Edit** button.
9. Select Enable.
10. Enter the Index and Error documents.
11. Click on the **Save changes** button.
12. Find "Static website hosting" again and copy the Bucket website endpoint.
13. Go to the Objects tab.
14. Click on the **Upload** button.
15. Upload the necessary files and folders.
16. Click on the **Upload** button.
17. Click on the **Close** button.
18. Go to the Permissions tab.
19. Locate Bucket policy and click on the **Edit** button.
20. Replace the policy with an `ALLOW` policy.
21. Click on the **Save changes** button.

Website URL ...

1. Copy the Bucket website endpoint.
2. Go to the Route 53 Console.
3. Click on the **Hostex zones** link to the left.
4. Click on the name previously created.
5. Click on the **Create route** button.
6. (Switch to Wizard Mode).
7. Select Simple routing and click the **Next** button.
8. Click on the **Define simple record** button.
9. Enter the record name as defined above.
10. Under Value/Route traffic, select Alias to S3 website endpoint, the region, and the S3 Bucket from above.
11. Click on the **Define simple record** button.
12. Click on the **Create records** button.

## Object Versioning and MFA Delete

### Object Versioning

* Versioning is Disabled by default.
* Versioning can be Enabled, but cannot then be Disabled again.
* Versioning can be Suspended and Enabled again.

Versioning ...

Versioning allows storage of **multiple versions** of objects within a bucket. Operations which would modify objects **generate a new version**.

* The Key is the name of the file.
* IDs are used to version objects.
* Deletion places a Delete Marker, hides the previous versions. The Delete Maker can be removed.
* Version Deletion actually removes the object.

Notes ...

* Space is consumed by all versions.
* Billing is applied to all versions.
* The only way to zero costs is to delete the bucket.

MFA Delete ...

* Enabling in versioning configuration.
* MFA is required to change bucket **versioning state**.
* MFA is required to **delete versions**.
* Serial number (MFA), as well as the generated code, is passed to any API calls.

## DEMO: S3 Versioning

1. Go to the S3 Console.
2. Click on the **Create bucket** button.
3. Name the bucket, uncheck "block all public access," acknowledge, enabled "Bucket Versioning," and click the **Create bucket** button.
4. Click on the name of the bucket.
5. Select the Properties tab, find "Static website hosting," and click the **Edit** button.
6. Select Enable, set the Index and Error documents, and click the **Save changes** button.
7. Select the Permissions tab, find "Bucket policy," and click the **Edit** button.
8. Replace the policy with an `ALLOW` policy.
9. Click the **Save changes** button.
10. Select the Objects tab, add the files and folders, and click the **Upload** button.
11. Click the **Close** button.
12. Click the **Show versions** toggle.

## S3 Performance Optimization

Single PUT Upload ...

* By default, when data is uploaded it is done on a single data stream to S3.
* If the stream fails, the **upload fails**.
* Requires a full restart.
* Speed and reliability are limited due to the single stream.
* Any upload up to 5GB of data.

Multipart Upload ...

* Data is broken up.
* Minimum data size of 100MB for multipart upload.
* 10,000 maximum number of parts, 5MB ... 5GB.
* Last part can be smaller than 5MB.
* Transfer rate is the speed of all the parts.

S3 Transfer Acceleration ...

* Uses the network of AWS Edge Locations (closest, best performing Edge Location).
* S3 bucket must be enabled, default is off.
* Faster with lower consistent latency.

## DEMO: S3 Performance

TOOL TO COMPARE PERFORMANCE: [HERE](http://s3-accelerate-speedtest.s3-accelerate.amazonaws.com/en/accelerate-speed-comparsion.html)

1. Go to the S3 Console.
2. Create a Bucket, accepting defaults.
3. Select the Properties tab.
4. Find "Transfer acceleration" and enabled it.
5. Use the **Accelerated endpoint** for better performance.

## Encryption 101

### Encryption Approaches

| Encryption At Rest | Encryption In Transit |
|--------------------|-----------------------|
| Designed to protect against physical theft and tampering. | Protecting data while it is being transferred between two places. |
| One entity involved. | Encryption wrapper (a tunnel). |
| | Multiple entities involved. |

### Concepts

* Plaintext: Unencrypted data.
* Algorithm: Takes plaintext and an encryption key and returns encrypted data.
* Key: At its simplest is a password.
* Ciphertext: Encrypted data.

### Symmetric Encryption

Symmetric Keys are used in the Symmetric Encryption process.

1. Both sides agree on an algorithm.
2. Party one generates a Symmetric Encryption Key and using the algorithm encrypts the plaintext, outputting ciphertext.
3. Ciphertext sent to party two. Party two does not have the Key.
4. Sent electronically, in-person, transfer encrypted ... all have issues. Transit of the key is the issue.
5. Algorithm with the key can decrypt the ciphertext.

### Asymmetric

Computationally much more difficult to do than Symmetric Encryption.

1. Both sides agree on an algorithm. Public and private keys are generated for both sides. The public keys are sent to the other side.
2. The public key can only be used to encrypt.
3. The private key can only be used to decrypt.

### Signing

* Uses Asymmetric Keys.
* A message can be signed with the Private Key.
* The Public Key then decrypts the Signed Document and verifies that it was signed by the second party.

### Steganography

Sometimes encryption is not enough.

* This is a method of hiding something inside something else.

## Key Management Service (KMS)

* Regional and Public Service.
* Create, Store, and Manage Cryptographic Keys.
* Symmetric and Asymmetric Keys.
* Cryptographic operations (encrypt, decrypt, and more).
* **Keys never leave KMS** - provides FIPS 104-2 Service (L2).

Customer Master Keys (CMKs) ...

* CMKs are logical. They contain ID, date, policy, description, and state.
* They are backed by **physical** key material.
* They are Generated or Imported.
* They can be used for up to **4KB of data**.

Data Encryption Keys (DEKs) ...

* `GenerateDataKey` - works on more than 4KB.
* Encrypt data using the plaintext key.
* Discard the plaintext key.
* Store encrypted key with the encrypted data.

Key Concepts ...

* CMKs are isolated to a region and never leave.
* **AWS Managed** or **Customer Managed** CMKs.
* Customer-managed keys are more configurable.
* CMKs support rotation.
* Backing key (and **previous** backing keys).
* Aliases.

Key Policies and Security ...

* Key Policies (Resource).
* Every CMK has a policy.
* Key Policies and IAM Policies.

## DEMO: KMS - Encrypting the Battleplans with KMS

1. Go to the Key Management Service Console.
2. Click the **Create a key** button.
3. With "Symmetric" selected, click the **Next** button.
4. Enter an alias and click the **Next** button.
5. Specify the "Key administrators" that can manage the key.
6. Click the **Next** button.
7. Specify who can use this key.
8. Click the **Next** button.
9. Check the "Key policy" generated then click the **Finish** button.

In CloudShell ...

1. Enter each of the following.

   ```script
   $ echo "Find all the doggos, distract them with the yumz." > battleplans.txt
   $ aws kms encrypt \
       --key-id alias/catrobot \
       --plaintext fileb://battleplans.txt \
       --output text \
       --query CiphertextBlob \
       | base64 -- decode > not_battleplans.enc
   ```

   The encrypted file looks like ...

   ```script
   $ cat not_battleplans.enc
   ```

   To decrypt this file ...

   ```script
   # aws kms decrypt \
       --cyphertext-blob fileb://not_battleplans.enc \
       --output text \
       --query Plaintext | base64 --decode > decryptedplans.txt
   ```

   To view the decrypted file ...

   ```script
   cat decryptedplans.txt
   ```

## Object Encryption

**Buckets themselves are not encrypted, objects are**.

* Client-Side Encryption (at-rest).
* Server-Side Encryption (at-rest).

S3 Encryption ...

* Client-Side Encryption with Customer Provided Keys (SSE-C).
* Server-side Encryption with Amazon S3-Managed Keys (SSE-S3), AES256.
* Server-Side Encryption with Customer Master Keys (CMKs) Stored in AWS Key Management Service (SSE-KMS).

Summary ...

| Method | Key Management | Encryption Processing | Extras |
|--------|----------------|-----------------------|--------|
| Client-Side | Client | Client |  |
| SSE-C | Client | S3 |  |
| SSE-S3 | S3 | S3 |  |
| SSE-KMS | S3 and KMS | S3 | Rotation Control and Role Separation |

Default Bucket Encryption ...

* Specifying this header: `x-ams-server-side-encryption`.
* AES256 (SSE-S3) and `aws:kms`.
* Default encryption on the bucket is AES256.

## DEMO: Object Encryption

1. Go to the S3 Console.
2. Create a bucket.
3. Go to the Key Management Service Console.
4. Create a Symmetric KMS Key with an alias and no administrators.
5. Go to the S3 Console.
6. Upload files: Unencrypted, SSE-S3, SSE-KMS (default), and SSE-KMS (using the aliased key above).
7. Go to the IAM Console.
8. Click the **Users** link on the left side.
9. Select the iamadmin user.
10. Click the **Add inline policy** link.
11. Add in the JSON ...

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "VisualEditor0",
                "Effect": "Deny",
                "Action": "kms:*",
                "Resource": "*"
            }
        ]
    }
    ```

12. Click the **Review policy** button.
13. Name the policy "denyKMS:/
14. Click the **Create policy** button.

## S3 Object Storage Classes

### S3 Standard

* Objects are replicated across **at least 3 AZs** in the AWS Region.
* 11-9s of durability (for 10,000,000 objects, there will be one object loss per 10,000 years).
* Replication over 3 AZs, Content-MD5 Checksums, and Cyclic Redundancy Checks (CRCs) are used to detect and fix any data corruption.
* When objects are stored, an **HTTP/1.1 200 OK** response is provided by the S3 API Endpoint.
* Billed a GB/month fee for data stored. A per GB change for transfer OUT (IN is free) and a price per 1,000 requests. **No specific retrieval fee, no minimum duration, no minimum size**.
* It has a 'milliseconds' first-byte latency and objects can be made publicly available.
* Should be used for Frequently Accessed Data which is important and Non-Replaceable.

### S3 Standard-IA (Infrequent Access)

* Objects are replicated across **at least 3 AZs** in the AWS Region.
* 11-9s of durability (for 10,000,000 objects, there will be one object loss per 10,000 years).
* Replication over 3 AZs, Content-MD5 Checksums, and Cyclic Redundancy Checks (CRCs) are used to detect and fix any data corruption.
* When objects are stored, an **HTTP/1.1 200 OK** response is provided by the S3 API Endpoint.
* Billed a GB/month fee for data stored. A per GB change for transfer OUT (IN is free) and a price per 1,000 requests. **No specific retrieval fee, no minimum duration, no minimum size**.
* Retrieval Fee; it has a per GB data retrieval fee, overall cost increases with frequent data access.
* There is a **minimum duration charge of 30 days** - objects can be stored for less, but the minimum billing always applies.
* Minimum capacity change of 128KB per object.
* Should be used for long-lived data, which is important but where access is infrequent.

### S3 One Zone-IA (Infrequent Access)

* **It does not provide the multi-AZ resilience model of Standard or Standard-IA. Instead, only one AZ is used within the Region**.
* 11-9s of durability (for 10,000,000 objects, there will be one object loss per 10,000 years), **ASSUMING the AZ does not fail**.
* Billed a GB/month fee for data stored. A per GB change for transfer OUT (IN is free) and a price per 1,000 requests. **No specific retrieval fee, no minimum duration, no minimum size**.
* Retrieval Fee; it has a per GB data retrieval fee, overall cost increases with frequent data access.
* There is a **minimum duration charge of 30 days** - objects can be stored for less, but the minimum billing always applies.
* Minimum capacity change of 128KB per object.
* Should be used for long-lived data, which is NON-CRITICAL and REPLACEABLE and where access is infrequent.

### S3 Glacier

* Objects are replicated across **at least 3 AZs** in the AWS Region.
* 11-9s of durability (for 10,000,000 objects, there will be one object loss per 10,000 years).
* Replication over 3 AZs, Content-MD5 Checksums, and Cyclic Redundancy Checks (CRCs) are used to detect and fix any data corruption.
* Objects **cannot be made publicly accessible**. Any access of data (beyond object metadata) requires a **retrieval process**.
* 40KB minimum size and 90 days minimum duration.
* First-byte latency is minutes or hours.
* For **archival data where frequent or real-time access is not needed**. Minutes to hours to retrieve data.

Data in Glacier is retrieved to S3 Standard-IA temporarily.

| Type | Time Frame |
|------|------------|
| Expedited | 1-5 minutes |
| Standard | 3-5 hours |
| Bulk | 5-12 hours |

### S3 Glacier Deep Archive

* Objects are replicated across **at least 3 AZs** in the AWS Region.
* 11-9s of durability (for 10,000,000 objects, there will be one object loss per 10,000 years).
* Replication over 3 AZs, Content-MD5 Checksums, and Cyclic Redundancy Checks (CRCs) are used to detect and fix any data corruption.
* Objects **cannot be made publicly accessible**. Any access of data (beyond object metadata) requires a **retrieval process**.
* 40KB minimum size and 180 days minimum duration.

Data in Glacier Deep Archive is retrieved to S3 Standard-IA temporarily.

| Type | Time Frame |
|------|------------|
| Standard | 12 hours |
| Bulk | up to 48 hours |

### Intelligent-Tiering

It contains four different tiers of storage. The intelligent tiering system manages where the objects are stored.

* Frequent Access
* Infrequent Access
* Archive
* Deep Archive

Notes ...

* Intelligent-Tiering monitors and automatically moves any objects not accessed for 30 days to a low-cost infrequent access tier and eventually to archive or deep archive tiers.
* If objects are accessed, they are moved back to the frequent access tier. There are no retrieval fees for accessing objects, only a 30-day minimum duration.
* It had a **monitoring and automation cost per 1,000 objects**. The frequent access tier costs the same as S3 Standard and the infrequent the same as Standard-IA. Archive and Deep Archive are comparable to their Glacier equivalents.
* Should be used for long-lived data, with changing or unknown patterns.

## S3 Lifecycle Configuration

* A Lifecycle Configuration is a **set of rules**.
* Rules consist of actions on a Bucket or group of objects.
* Transition Actions
* Expiration Actions

Transitions ...

* Downward direction only.
* Smaller objects can **cost more** (minimum size).
* **Minimum of 30 days before** transition.
* A **single rule** cannot transition to Standard-IA, Intelligent-Tiering, or One Zone-IA and THEN to either Glacier type ... within 30 days (duration minimums).

1. S3 Standard
2. S3 Standard-IA
3. S3 Intelligent Tiering
4. S3 One Zone-IA
5. S3 Glacier
6. S3 Glacier Deep Archive

## S3 Replication

This replication can occur within the same account or different accounts.

* Cross-Region Replication (CRR).
* Same-Region Replication (SRR).

Replication Options ...

* All objects or a subset of objects.
* Storage Class: The default is to maintain the same class.
* Ownership: The default is the source account.
* Replication Time Control (RTC).

Considerations ...

* **Not retroactive and Versioning needs to be ON**.
* One-way replication only, from Source to Destination.
* Unencrypted, SS3-S3, and SSE-KMS (with extra configuration).
* Source bucket owner needs permissions to objects.
* **No system events, Glacier, or Glacier Deep Archive**.
* **NO DELETES**.

Why use replication?

* SRR - Log Aggregation.
* SRR - PROD and TEST synchronization.
* SRR - Resilience with strict sovereignty.
* CRR - Global Resilience Improvements.
* CRR - Latency Reduction.

## DEMO: Cross-Region Replication of an S3 Static Website

1. Go to the S3 Console.
2. Create a bucket, source-bucket, `us-east-1`.
3. Click on the bucket name, the Properties tab, then click the "Edit static website hosting."
4. Specify the files and click the **Save changes** button.
5. Go to Permissions, then click the **Edit Block public access (bucket settings)** button, uncheck access, save changes, and confirm.
6. In "Bucket policy," click the **Edit** button and add the policy with updated ARN.

    ```json
    {
        "Version":"2012-10-17",
        "Statement":[
            {
                "Sid":"PublicRead",
                "Effect":"Allow",
                "Principal": "*",
                "Action":["s3:GetObject"],
                "Resource":["arn:aws:s3:::examplebucket/*"]
            }
        ]
    }
    ```

7. Click the **Save changes** button.
8. Go to the S3 Console.
9. Create a bucket, destination-bucket, `us-west-1`.
10. Click on the bucket name, the Properties tab, then click the "Edit static website hosting."
11. Specify the files and click the **Save changes** button.
12. Go to Permissions, then click the **Edit Block public access (bucket settings)** button, uncheck access, save changes, and confirm.
13. In "Bucket policy," click the **Edit** button and add the policy with updated ARN.

    ```json
    {
        "Version":"2012-10-17",
        "Statement":[
            {
                "Sid":"PublicRead",
                "Effect":"Allow",
                "Principal": "*",
                "Action":["s3:GetObject"],
                "Resource":["arn:aws:s3:::examplebucket/*"]
            }
        ]
    }
    ```

14. Click the **Save changes** button.

Enable Cross-Region Replication ...

1. Click on the source-bucket name, then go to the Management tab.
2. Click on the **Create replication rule** button.
3. Click on the **Enable Bucket Versioning** button.
4. Enter a rule name (`staticwebsiteDR`, disaster recovery).
5. Select "This rule applies to *all* objects in the bucket."
6. Select a destination.
7. Click on the **Enable Bucket Versioning** button.
8. Within IAM role, select "Create new role." 
9. Click the **Save** button and then the **Submit** button.

## S3 PreSigned URLs

* An identity can create a URL for an object it **does not have access to**.
* When using the URL, the permissions match the **identity that generated it**.
* Access denied could mean that the identity that generated the URL **never had access or does not now**.
* **Don't generate with a role** since the URL stops working when temporary credentials expire.

## DEMO: Creating and using PreSigned URLs

1. Go to the S3 Console.
2. Create an S3 Bucket.
3. Upload an image.
4. Select the image that was uploaded.
5. Click the **Open** button, examine the URL (has authentication information).
6. Copy the URL and enter it into a new tab (no authentication information), Access Denied.

Generating a Time Limited URL ...

1. Click on the CloudShell Icon.
2. `aws s3 presign <URI> --expires-in <seconds>`

## S3 Select and Glacier Select

S3 can store large objects (up to 5TB) ...

* Users often want to retrieve the **entire object**.
* Retrieving a 5TB object takes time and uses 5TB of transfer.
* Can filter client-side **doesn't reduce anything here**.

S3 Select and Glacier Select allow the use of SQL-like statements to select part of the object, **pre-filtered by S3**.

* File formats: CSV, JSON, and Parquet. BZIP2 compression for CSV and JSON.

## S3 Events

* Notifications are generated when events occur in a bucket.
* These notifications can be delivered to SNS, SQS, and Lambda Functions.

Notifications can occur when ...

* Objects are Created (`Put`, `Post`, `Copy`, and `CompleteMultiPartUpload`).
* Objects are Deleted (`*`, `Delete`, and `DeleteMarkerCreated`).
* Objects are Restored (`Post` (initiated) and `Completed`).
* Replication (`OperationsMissedThreshold`, `OperationReplicatedAfterThreshold`, `OperationNotTracked`, and `OperationFailedReplication`).

## S3 Access Logs

* Bucket and Object Access of a Source Bucket with the results going to a Target Bucket.
* Access Logging can be enabled via the Console UI or via `PUT Bucket Logging`.
* Best Effort log delivery, access to the Source Bucket is usually logged into the Target Bucket within a few hours.
* Bucket ACL Allows "S3 Log Delivery Group" on the Target Bucket.
* Log Files consist of Log Records. Records are newline-delimited. Attributes are space-delimited.
