# EBS Volumes: Elastic Block Store

* An EC2 machine loses its root volume (main drive) when it is manually terminated.
* Unexpected terminations might happen from time to time.
* Sometimes, need a way to store instance data.
* An EBS (Elastic Block Store) Volume is a network drive that can be attached to instances while they run.
* It allows instances to persist data.

## EBS Volume

* It is a network drive (not a physical drive)

> It uses the network to communicate the instance, which means there might be a bit of latency

* It can be detached from an EC2 instance and attached to another one quickly
* It is locked to an Availability Zone (AZ)

> An EBS Volume in us-east-1a cannot be attached to us-east-1b

> To move a volume across, you first need to snapshot it

* Have a provisioned capacity (size in GBs and IOPs)

> Billed for all the provisioned capacity

> The capacity of the drive can be increased over time

## EBS Volume Types

* EBS Volumes come in 4 types

1. GP2 (SSD): General purpose SSD volume that balances price and performance for a wide variety of workloads
2. IO1 (SSD): Highest-performance SSD volume for mission-critical low-latency or high- throughput workloads
3. ST1 (HDD): Low cost HDD volume designed for frequently accessed, throughput- intensive workloads
4. SC1 (HDD): Lowest cost HDD volume designed for less frequently accessed workloads

* EBS Volumes are characterized in Size | Throughput | IOPS
* When in doubt always consult the AWS documentation

## EBS Volume Resizing

* Feb 2017: You can resize your EBS Volumes
* After resizing an EBS volume, you need to repartition your drive

## EBS Snapshots

* EBS Volumes can be backed up using “snapshots”
* Snapshots only take the actual space of the blocks on the volume
* If you snapshot a 100GB drive that only has 5 gb of data, then your EBS snapshot will only be 5 gb

## Snapshots are used for:

* Backups: ensuring you can save your data in case of catastrophe
* Volume migration

> Resizing a volume down

> Changing the volume type

> Encrypt a volume

## EBS Encryption

When you create an encrypted EBS volume, you get the following:

* Data at rest is encrypted inside the volume
* All the data in flight moving between the instance and the volume is encrypted
* All snapshots are encrypted
* All volumes created from the snapshots are encrypted
* Encryption and decryption are handled transparently (you have nothing to do)
* Encryption has a minimal impact on latency
* EBS Encryption leverages keys from KMS (AES-256)
* Copying an unencrypted snapshot allows encryption

## EBS vs. Instance Store

* Some instance do not come with Root EBS volumes
* Instead, they come with “instance Store”
* Instance store is physically attached to the machine

Pros:

* Better I/O performance

Cons:

* On termination, the instance store is lost
* You can’t resize the instance store
* Backups must be operated by the user
* Overall, EBS-backed instances should fit most applications workloads

## EBS Summary

* EBS can be attached to only one instance at a time
* EBS are locked at the AZ level
* Migrating an EBS volume across AZ means first backing it up (snapshot), then recreating it in the other AZ
* EBS backups use IO and you shouldn’t run them while your application is handling a lot of traffic
* Root EBS Volumes of instances get terminated by default if the EC2 instance gets terminated. (You can disable that)
* In some cases, it's better to externalize your RDS database so that it won't get deleted when you delete your elastic beanstalk enviornment
* Elastic Beanstalk relies on CloudFormation
