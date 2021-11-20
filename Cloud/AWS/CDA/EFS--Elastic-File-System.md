# EFS: Elastic File System

Managed NFS (Network File System) that can be mounted on many EC2.

EFS works with EC2 Instances in multi-AZ.

* NFSv4.1 Protocol
* Use Security Group to control access.
* Compatible with Linux-based AMI.
* Encryption at-rest using KMS.

## Performance Mode

Set at creation

* General Purpose: Default, for Web Server, CMS, ...
* Max I/O: Higher latency, throughput, highly parallel (Big Data, Media, ...)
* Throughput Mode

> Bursting (1TB = 50 MB/s plus burst to 100 MB/s)

> Provisioned: Set regardless of storage

* Storage Tiers: Lifecycle Management Feature ... move file after n-days.

> Standard

> Infrequent Access (EFS-IA)