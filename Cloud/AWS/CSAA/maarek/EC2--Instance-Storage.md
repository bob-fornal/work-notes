# EC2 - Instance Storage

## EBS Volume

* An **Elastic Block Store (EBS)** is a network drive that can be attached to an instance while it is running.
* It allows instances to persist data, even after termination.
* **They can only be mounted to one instance at a time; there is a "multi-attach" feature for some EBS**.
* Bound to **a specific Availability Zone (AZ)**.
* Has a provisioned capacity (size in BGs and IOPS).

### EBS - Delete on Termination attribute

* Controls the EBS behavior when an EC2 Instance terminates.
* By default, the root EBS volume is deleted (attribute enabled) and any other attached SBD volume is not deleted (attribute disabled).
* This can be controlled by the AWS Console or AWS CLI.
* **Use case: preserve the root volume when the instance is terminated.**

## EBS Snapshots

* Make a snapshot of an EBS volume at a point in time.
* Not necessary to detach the volume to do a snapshot, but it is recommended.
* Can copy snapshots across AZ or Region.

## AMI Overview

* AMI = Amazon Machine Image
* AMIs are a **customization** of an EC2 Instance.
* AMIs are built for a **specific region** (and can be copied across regions).

AMIs can launch EC2 Instances from ...

* **A Public AMI**: AWS provided.
* **Your own AMI**: you make and maintain them yourself.
* **An AWS Marketplace AMI**: an AMI someone else made (and potentially sells).

## EC2 Instance Store

* EBS volumes are **network drives** with good but "limited" performance.

**For high-performance hardware disk, use EC2 Instance Store**.

* Better I/O performance.
* EC2 Instance Store lose their storage if they are stopped (ephemeral).
* Good for a buffer, cache, scratch data, and temporary content.
* Risk of data loss if hardware fails.
* Backups and Replication are your responsibility.

## EBS Volume Types

* **gp2 / gp3 (SSD)**: General purpose SSD volume that balances price and performance for a wide variety of workloads.
* **io1 / io2 (SSD)**: Highest performance SSD volume for mission-critical low-latency or high-throughput workloads.
* **st1 (HDD)**: Low-cost HDD volume designed for frequently accessed, throughput-intensive workloads.
* **sc1 (HDD)**: Lowest cost HSS volume designed for less frequently accessed workloads.

EBS Volumes are characterized in Size, Throughput, IOPS (I/O Operations Per Second).

* **Only gp2 / gp3 and io1 / io2 can be used as boot volumes**.

### Provisioned IOPS (PIOPS) SSD

* Critical business applications with sustained IOPS performance.
* Or applications that need more than 16,000 IOPS.
* Great for **database workloads** (sensitive to storage performance and consistency).

## EBS Multi-Attach - io1 / io2 Family

* Attach the same EBS volume to multiple EC2 instances in the same AZ.
* Each instance has full read and write permissions to the volume.
* Use to achieve **higher application availability** in clustered Linux applications.
* Applications must manage concurrent write operations.
* Must use a file system that is cluster-aware.

## EBS Encryption

When an encrypted EBS volume is created ...

* Data at rest is encrypted inside the volume.
* All the data in-flight, moving between the instance and the volume is encrypted.
* All snapshots are encrypted.
* Encryption and decryption are handled transparently.
* Encryption has minimal impact on latency.
* EBS Encryption leverages keys from KMS (AES-256).
* Copying an unencrypted snapshot allows encryption.
* Snapshots of encrypted volumes are encrypted.

### Encryption: Encrypt and Unencrypted EBS Volume

* Create an EBS snapshot of the volume.
* Encrypt the EBS snapshot (using copy).
* Create a new EBS Volume from the snapshot (the volume will also be encrypted).
* Attach the encrypted volume to the original instance.

## EFS Overview

EFS = Elastic File System

* Managed NFS (network file system) that can be mounted on many EC2 Instances.
* EFS works with EC2 Instances in multi-AZ.
* Highly available, scalable, expensive (3x gp2), pay per use.
* Use cases: content management, web serving, data sharing, WordPress.
* Use security group to control access to EFS.
* **Compatible with Linux-based AMI (not Windows)**.
* Encryption at rest using KMS.
* File system scales automatically, pay-per-use, no capacity planning.

EFS Scale

* Performance Mode
* Throughput Mode
* Provisioned Throughput Mode

## EFS versus EBS

EBS Volumes ...

* Can be attached to only one instance at a time.
* Are locked at the AZ level.

EFS ...

* Mounting 100s of instances across AZ.
* EFS shares website files (WordPress).

