# AWS Storage Extras

## AWS Snow Family

* Highly-secure, portable devices to **collect and process data at the edge** and **migrate data into and out of AWS**.
* Data Migration: Snowcone, Snowball Edge, Snowmobile
* Edge computing: Snowcone, Snowball Edge

### Data Migration with AWS Snow Family

Time To Transfer Data

| Volume | 100 Mbps | 1 Gbps   | 10 Gbps  |
|--------|----------|----------|----------|
| 10 TB  | 12 days  | 30 hours | 3 hours  |
| 100 TB | 124 days | 12 days  | 30 hours |
| 1 PB   | 3 years  | 124 days | 12 days  |

Challenges

* Limited connectivity.
* Limited bandwidth.
* High network cost.
* Shared bandwidth (cannot maximize the line).
* Connectivity stability.

### Snowball Edge (for  data transfers)

* Physical data transport solution: move TBs or PBs of data in or out of AWS.
* Alternative to moving data over the network (and paying network fees).
* Pay per data transfer job.
* Provide block storage and Amazon S3-compatible object storage.
* **Snowball Edge Storage Optimized**:  *80 TB of HDD Capacity* for block volume and S3-compatible object storage.
* **Snowball Edge Compute Optimized**:  *42 TB of HDD Capacity* for block volume and S3-compatible object storage.
* **Use-cases**: Large data cloud migrations, DC decommision, disaster recovery.

### AWS Snowcone

* **Small, portable computing, anywhere, rigged and secure, withstands harsh environments**.
* Light (4.5 pounds, 2.1 kg).
* Device used for edge computing, storage, and data transfer.
* **8 TG of usable storage**.
* Use Snowcone where Snowball does not fit (space-constrained environment).
* Must provide battery and cables.
* Can be sent back to AWS offline, or connect it to the Internet and use **AWS DataSync** to send data.

### AWS Snowmobile

![AWS Snowmobile Tractor Trailer](./snowmobile.png)

* Transfer exabytes of data (1 EB = 1,000 PB = 1,000,000 TBs).
* Each Snowmobile has 100 PB of capacity (use multiple in parallel).
* High security: Temperature controlled, GPX, 24/7 video surveillance.
* **Better than Snowball if transferring more than 10 PB**.

### Snow Family - Usage Process

1. Request Snowball devices from the AWS console for delivery.
2. Install the snowball client / AWS OpsHub on servers.
3. Connect the snowball to the servers and copy files using the client.
4. Ship the device back when done (goes to the right AWS facility).
5. Data will be loaded into an S3 bucket.
6. Snowball device is completely wiped.

### Edge Computing

Processing data while it is being created on **an edge location**: No internet or far from the cloud. Limited: No internet access or easy access to computing power.

Setup a **Snowball Edge**, **Showcone** device to do edge computing ...

* Preprocess data.
* Machine learning at the edge.
* Transcode media streams.

Eventually (if need be) the device can be shipped back to AWS (for transferring data, for example).

### Show Family - Edge Computing

All of these devices can run EC2 Instances and AWS Lambda functions (using AWS IoT Greengrass).

Long-term deployment options: 1 and 3-year discounted pricing.

#### Snowcone (smaller)

* 2 CPUs, 4 GB memory, wired or wireless access.
* USB-C power using a cord or optional battery.

#### Snowball Edge - Compute Optimized

* 52 vCPUs, 208 GB RAM.
* Optional GPU (useful for video processing or machine learning).
* 42 TB usable storage.

#### Snowball Edge - Storage Optimized

* Up to 40 vCPUs, 80 GB RAM.
* Object storage clustering available.

### AWS OpsHub

* Historically, to use Snow Family Devices, needed a CLI (Command Line Interface) tool.
* Today, use **AWS OpsHub** (sofware installed on computer or laptop) to manage Show Family Device.

## Architecture: Snowball into Glacier

**Snowball cannot import into Glacier directly**.

* Use Amazon S3 first, in combination with an S3 Lifecycle Policy.

## Amazon FSx - Overview

A service that allows the **launch of 3rd-party high-performance file systems on AWS**.

* Fully managed service.

### Windows File Server

EFS is a shared POSIX system for Linux Systems.

* **FSx for Windows** is a fully managed **Windows** file system share drive.
* Supports SMB protocol and Windows NTFS.
* Microsoft Active Directory integration, ACLs, user quotas.
* Built on SSD, scale up to 10s of GB/s, millions of IOPS, 100s PB of data.
* Can be accessed from on-premise infrastructure.
* Can be configured to be Multi-AZ (high availability).
* Data is backed-up daily to S3.

### Lustre

Lustre is a type of parallel distributed file system, for large-scale computing.

The name Lustre is derived from "Linux" and "cluster."

* Machine Learning, **High Performance Computing (HPC)**.
* Video Processing, Financial Modeling, Electronic Design Automation.
* Scales up to 100s GB/s, millions of IOPS, sub-ms latencies.
* **Seamless integration with S3**.
* Can be used form on-premise servers.

### FSx File System Deployment Options

Scratch File System

* Temporary storage.
* Data is not replicated (does not persist if the file server fails).
* High burst (6 times faster, 200 MBps per TB).
* **Use-case**: Short-term processing, optimize cost.

Persistent File System

* Long-term storage.
* Data is replicated within the same AZ.
* Replace failed files within minutes.
* **Use-case**: Long-term processing, sensitive data.

## Storage Gateway Overview

AWS is pushing for "hybrid cloud" where part of the infrastructure is on the cloud and part is on-premises.

This can be due to ...

* Long cloud migrations.
* Security requirements.
* Compliance requrements.
* IT strategy.

S3 is a proprietary storage technology (unlike EFS, NFS) that uses **AWS Storage Gateway** to expose the S3 data on-premises.

### AWS Storage Gateway

* Bridge between on-premises data and cloud data in S3.
* **Use-cases**: Disaster recovery, backup and restore, tiered storage.

Three types of Storage Gateway ...

* File Gateway
* Volume Gateway
* Tape Gateway

### File Gateway

* Configured S3 buckets are accessible using the NFS and SMB protocol.
* Supports S3 standard, S3 IA, S3 One Zone IA.
* Bucket access using IAM roles for each File Gateway.
* Most recently used data is cached in the File Gateway.
* Can be mounted on many servers.
* **Integrated with Active Directory (AD)** for user authentication.

### Volume Gateway

* Block storage using the iSCSI protocol backed by S3.
* Backed by EBS snapshots which can help restore on-premises volumes.
* **Cached volumes**: Low-latency access to most recent data.
* **Stored volumes**: Entire dataset is on-premise, scheduled backups to S3.

### Tape Gateway

* Some companies have backup processes using physical tape.
* With Tape Gateway, companies use the same process but in the cloud.
* Virtual Tape Library (VTL) backed by Amazon S3 and Glacier.
* Back up data using existing tape-based processes (and iSCSI interface).
* Works with leading backup software vendors.

### Storage Gateway - Hardware Appliance

* Using Storage Gateway means a need for on-premises virtualization.
* Otherwise, use a **Storage Gateway Hardware Appliance**.
* Works with File Gateway, Volume Gateway, and Tape Gateway.
* Has the required CPU, memory, networ, SSD cache resources.
* Helpful for daily NFS backups in small data centers.

## Amazon FSx File Gateway

* Native access to Amazon FSx for Windows File Server.
* **Local cache for frequently accessed data**.
* Windows native compatibility (SMB, NTFS, Active Directory, ...).
* Useful for group file shares and home directories.

## AWS Transfer Family

A fully-managed service for file transfers into and out of Amazon S3 or Amazon EFS using the FTP protocol.

Supported protocols ...

* **AWS Transfer for FTP (File Transfer Protocol)**.
* **AWS Transfer for FTPS (File Transfer Protocol over SSL)**.
* **AWS Transfer for SFTP (Secure File Transfer Protocol)**.

Details ...

* Managed infrastructure, Scalable, Reliable, Highly Available (multi-AZ).
* Pay per provisioned endpoint per hour plus data transfers in GB.
* Store and manage users' credentials within the service.
* Integrate with existing authentication systems (Microsoft Active Directory, LDAP, Okta, Amazon Cognito, custom).
* **Use-Case**: Sharing files, public datasets, CRM, ERP, ...


