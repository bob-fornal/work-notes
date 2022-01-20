# EC2 - Fundamentals

Elastic Compute Cloud (Virtual Machines)

> Infrastructure as a Service

## EC2 Basics

Consists mainly of ...

* Rending virtual machines (EC2)
* Storing data on virtual drives (EBS)
* Distributing local across machines (ELB)
* Scaling the services using an auto-scaling group (ASC)

### EC2 Sizing and Configuration Options

* OS: Linux, WIndows, or Mac OS
* CPU: Compute power and Cores
* RAM: Memory
* Storage: Network-attached (EDS & EFS)
* Storage: Hardware (EC2 Instance Store)
* Network Card: Speed and Public IP Address
* Firewall Rules: Security Group
* Bootstrap Script: EC2 User Data (configure at first launch)

### EC2 User Data

It is possible to bootstrap our instances using an EC2 User Data script

* **bootstrapping** means launching commands when a machine starts.
* The script is **only run once** when the instance **first starts**.
* Runs as to "root" user (sudo rights).

EC2 User Data is used to automate boot tasks such as ...

* Installing updates
* Installing software
* Downloading common files from the Internet.

## EC2 Instance Types - Overview

* Different types of EC2 instances are optimized for difference use-cases: [Instance Types](https://aws.amazon.com/ec2/instance-types/).

Naming Convention

* Instance Class
* Generation
* Size within the instance class

Details

### General Purpose

Web servers or code repositories; balance compute, memory, networking.

### Compute Optimized

Compute-intensive tasks.

* Batch processing workloads.
* Media transcoding.
* High performance web servers.
* High perforamnce computing (HPC).
* Scientific modeling and machine learning.
* Dedicated gaming servers.

### Memory Optimized

Fast perforamnce for workloads that process large data sets in memory

* High perforamnce, relational/non-relational databases.
* Distributed web scale cache stores.
* In-memory databases optimized for BI.
* Applications performing real-time processing of big unstructured data.

### Storage Optimized

Storage-intensive tasks that require high, sequential read and write access to large data sets on local storage.

* High frequency online transaction processing (OLTP) systems.
* Relational and NoSQL databases.
* Cache for in-memory databases (for example, Redis).
* Data warehousing applications.
* Distributed file systems.

## Introduction to Security Groups

They control how traffic flows into our out of the EC2 Instances.

* Security groups only contain ```allow``` rules.
* Security groups fules can reference by IP or by security group.

### Deeper Dive

Security groups are acting as a "firewall" on EC2 instances.

They regulate ...

* Access to Ports
* Authorized IP ranges - IPv4 and IPv6
* Control of inbound network
* Control of outbound network

### Good to Know

* Can be attached to multiple instances
* Locked down to a region / VPC combination
* Lives "outside" the EC2 - if traffic is blocked, the EC2 instance will not see it
* **It's good to maintain one separate security group for SSH access**

TEST NOTES

* If the application is not accessible (timeout issue), then it is a security group issue.
* If the application gives "connection refused" error, then it is an application error or it is not launched.
* All inbound traffic is ```blocked``` by default.
* All outbound traffic is ```authorized``` by default.

### Classic Ports to Know

* 22 = SSH (Secure Shell)
* 21 = FTP (File Transfer Protocol)
* 22 = SFTP (Secure File Transfer Protocol)
* 80 = HTTP - access unsecured websites
* 443 = HTTPS - access secured websites
* 3389 = RDP (Remote Desktop Protocol)

## SSH Overview

SSH allows the user to control a remote from machine from the command line.

| System        | SSH | Putty | EC2 Instance Connect |
|---------------|-----|-------|----------------------|
| Mac           |  x  |       |          x           | 
| Linux         |  x  |       |          x           | 
| Windows < 10  |     |   x   |          x           | 
| Windows >= 10 |  x  |   x   |          x           | 


### SSH Troubleshooting

1. Rewatch the lecture.
2. Read the troubleshooting guide.
3. Try EC2 Instance Connect.

* **If one method works, you are good**.
* If no method works, SSH isn't used much in the course.

## EC2 Instance Launch Types

* **On-Demand Instances**: Short workload, predictable pricing.
* **Reserved Instances** (MINIMUM 1-year): long workloads.
* **Convertible Reserved Instances** (MINIMUM 1-year): long workloads with flexible instances.
* **Scheduled Reserved Instances** (MINIMUM 1-year): example - every Thursday between 3pm and 6pm **(DEPRECATED)**.
* **Spot Instances**: Short workload, cheap, can lose instances (less reliable).
* **Dedicated Hosts** (3-year period reservation): Book an entire physical server, control instance placement. Can help address **compliance requirements** and use **existing server-bound software licenses**.

