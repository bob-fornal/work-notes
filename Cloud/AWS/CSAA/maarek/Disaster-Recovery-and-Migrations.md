# Disaster Recovery and Migrations

**RESOURCE**: [AWS Disaster Recovery.pdf](aws-disaster-recovery.pdf)

Any event that has a negative impact on a company's business continuity or finances is a disaster.

* Disaster recovery (DR) is about preparing for and recovering from a disaster.

| Data Center | Type of Recovery |
|-------------|------------------|
| On-premise  | On-premise; traditional DR and very expensive. |
| On-premise  | AWS Cloud; hybrid recovery. |
| AWS Cloud Region | AWS Cloud (another) Region |

Terminology

* RPO: Recovery Point Objective.
* RTO: Recovery Time Objective.

### RPO and RTO

* RPO is the point-in-time when a backup is taken.
* Data Loss is the difference between RPO and a disaster.
* RTO is point-in-time when recovered.
* Downtime is the difference between a disaster and the RTO.

### Disaster Recovery Strategies

RTO becomes faster and more costs are incurred (top-to-bottom).

* Backup and Restore
* Pilot Light
* Warm Standby
* Hot Site / Multi-Site Approach

#### Backup and Restore (High RPO)

Snapshots in the cloud.

#### Pilot Light

* A small version of the application is always running in the cloud.
* Useful for the critical code (pilot light).
* Very similar to Backup and Restore.
* Faster than Backup and Restore as critical systems are already up and running.

#### Warm Standby

* Full system is up and running, but at minimum size.
* When a disaster occurs it can scale to production load.

#### Hot Site / Multi-Site Approach

* Very low RTO (minutes or seconds), very expensive.
* Full Production Scale is running AWS and on-premise.

#### All AWS Multi-Region

* Full Production Scale is running in multiple regions with Route 53 and Data Replication (Aurora Global, master and slave).

### Disaster Recovery Tips

Backups ...

* EBS Snapshots, RDS automated backups, Snapshots, etc. ...
* Regular pushes to S3, S3 IA, Glacier, Lifecycle Policy, Cross-Region Replication.
* From On-Premise: Snowball or Storage Gateway.

High Availability ...

* Use Route 53 to migrate DNS over from Region to Region
* RDS Multi-AZ, ElastiCache Multi-AZ, EFS, S3.
* Site-to-Site VPN as recovery from Direct Connect

Replication ...

* RDS Replication (Cross-Region), AWS Aurora + Global Databases.
* Database replication from on-premise to RDS.
* Storage Gateway.

Automation ...

* CloudFormation, Elastic Beanstalk to re-create a whole new environment.
* Recover, Reboot EC2 Instances with CloudWatch if alarms fail.
* AWS Lambda functions for customized automation.

Chaos Testing ...

* Netflix has a "simian-army" randomly terminating EC2.

## Database Migration Service (DMS)

* Quickly and securely migrate databases to AWS, resilient, and self-healing.
* The source database remains available during the migration.
* Continuous Data Replication using CDC (Continuous Data Catcher).
* Must create an EC2 Instance to perform the replication tasks.

Supports ...

* Homogeneous migrations: Example, Oracle to Oracle.
* Heterogeneous migrations: Example, Microsoft SQL Server to Aurora.

### AWS Schema Conversion Tool (SCT)

* Convert Database's Schema for one engine to another.
* Do not need to use SCT if migrating the same database engine.

## On-Premises Strategies with AWS

Ability to download Amazon Linux 2 AMI as a VM (.iso format) ...

* VMWare, KVM, Virtual Box (Oracle VM), Microsoft Hyper-V.

VM Import, Export ...

* Migrate existing applications into EC2.
* Create a DR repository strategy for on-premise VMs.
* Can export the VMs back from EC2 to on-premise.

AWS Application Discovery Service ...

* Gather information about on-premise servers to plan a migration.
* Server utilization and dependency mappings.
* Track with AWS Migration Hub.

AWS Database Migration Service (DMS) ...

* Replicate on-premise to AWS, AWS to AWS, AWS to on-premise.
* Works with various database technologies (Oracle, MySQL, DynamoDB, etc. ...).

AWS Server Migration Service (SMS) ...

* Incremental replication of on-premise live servers to AWS.

## AWS DataSync

* Move large amounts of data from on-premise to AWS.
* Can synchronize to **Amazon S3 (any storage classes, including Glacier), Amazon EFS, Amazon FSx for Windows.
* Move data from NAS or file system via **NFS** or **SMB**.
* Replication tasks can be scheduled hourly, daily, or weekly.
* Leverate the DataSync agent to connect to the systems.
* Can set up a bandwidth limit.

## Transferring Large Datasets into AWS

**Example**: Transferring 200 TB of data to the cloud.

### Over the Internet, Site-to-Site VPN (100 Mbps connection)

* Immediate to set up.
* Will take 200TB * 1000GB * 1000MB*8MB / 100 Mbps = 16,000,000 seconds = 185 days.

### Over Direct Connect (1 Gbps)

* Long for the one-time setup (over a month).
* Will take 200TB * 1000GB * 8GB / 1GB = 1,600,000 seconds = 18.5 days.

### Over Snowball

* Will take 2 to 3 Snowballs in parallel.
* Takes about 1 week for the end-to-end transfer.
* Can be combined with DMS.

### For ongoing replication, transfers

Site-to-Site VPN, DX with DMS, or DataSync.

## AWS Backup

* Fully managed service.
* Centrally manage and automate backups across AWS services.
* No need to create custom scripts and manual processes.
* Supports cross-region backups.
* Supports cross-account backups.
* Supports Point-in-Time Recovery (PITR) for supported service.
* On-Demand and Scheduled backups.
* Tag-based backup policies.

Can create backup policies known as **Backup Plans** ...

* Backup frequency *every 12 hours, daily, weekly, monthly, cron expression).
* Backup window.
* Transition to Cold Storage (Never, Days, Weeks, Months, Years).
* Retention Period (Always, Days, Weeks, Months, Years).
