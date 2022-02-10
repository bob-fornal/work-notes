# More Solution Architectures

## Event Processing

### Lambda, SNS, and SQS

* SQS and Lambda (try, retry, and poll) with DLQ from SQS.
* SQS FIFO and Lambda (try, retry, and block) with DLQ from SQS FIFO.
* SNS and Lambda (asynchronous, Lambda retries internally) with DLQ from Lambda (could be SQS).

### Fan-Out Pattern (deliver data to multiple SQS)

* SDK sends a message to each SQS individually.
* SDK sends a message to SNS Topic, SQS subscribed to SNS Topic.

### S3 Event Processing

S3 Events can be sent to SNS, SQS, and Lambda.

* `S3:ObjectCreated`, `S3:ObjectRemoved`, `S3:ObjectRestore`, `S3:Replication`, ...
* Object name filtering is possible (*.jpg).
* **Can create as many "S3 events" as desired**.
* S3 event notifications typically deliver in seconds but can sometimes take a minute or longer.
* If two writes are made to a single non-versioned object at the same time, it is possible that only a single event notification will be sent.
* To ensure that an event notification is sent for every successful write, enable versioning on the bucket.

## Caching Strategies in AWS

Need to take into account Caching, TTL, Network, Computation, Cost, and Latency in a caching strategy.

## Blocking an IP Address in AWS

Scenario ...

* EC2 Instance (with a Public IP), in a Security Group, in a VPC.
* First line of defense would be the NACL and the VPC.
* NACL can have a `DENY` rule; simply, quick, and cheap.
* Security Group; only allow rules, define the subset allowed (maybe).
* Optional Firewall Software in the EC2; the address is allowed in, but blocked at the EC2 level.

With ALB ...

* ALB and ALB Security Group within the VPC.
* Connection Termination; terminates the connection to the ALB and issues a new connection request to the EC2 Instance.
* EC2 Instance Security Group must allow the ALB.
* Puts the primary line of defense against an IP Address at the NACL-level.

With NLB ...

* NLB within the VPC (traffic does not go through a Security Group to reach the NLB).
* Simply: The NLB is a passthrough. NLB and EC2 see the client's IP Address.

With ALB + WAF ...

* ALB and ALB Security Group within the VPC.
* WAF provides more complex filtering for IP Addresses.

With ALB, CloudFront WAF

* CloudFront, sits outside the VPC.
* Here, the NACL is not helpful since the CloudFront Public IPs are what reaches the ALB.
* CloudFront Geo Restriction.
* WAF attached to CloudFront.

## High-Performance Computing (HPC) on AWS

The cloud is the perfect place to perform HPC.

* Can create a very high number of resources in no time.
* Can speed up time-to-results by adding more resources.
* Only pay for the systems used.

> Perform genomics, computational chemistry, financial risk monitoring, weather prediction, machine learning, deep learning, autonomous driving, ...

### Data Management and Transfer

**AWS Direct Connect** ...

* Move GB/s of data to the cloud, over a private secure network.

**Snowball and Snowmobile** ...

* Move PB of data to the cloud.

**AWS DataSync** ...

* Move large amounts of data between on-premise and S3, EFS, FSx for Windows.

### Compute and Networking

EC2 Instances ...

* CPU and GPU optimized.
* Spot Instances, Spot Fleets for cost savings, and Auto Scaling.
* EC2 Placement Groups: **Cluster** for good network performance.

EC2 Enhanced Networking (SR-IOV) ...

* Higher bandwidth, higher PPS (packets per second), lower latency.
* Option 1: **Elastic Network Adapter (ENA)** up to 100 Gbps.
* Option 2: Intel 82599VF up to 10 Gbps - LEGACY.

**Elastic Fabric Adapter (EFA)** ...

* Improved ENA for **HPC**, only works for Linux.
* Great for inter-node communications, **tightly coupled workloads**.
* Leverages Message Passing Interface (MPI) standard.
* Bypasses the underlying Linux OS to provide low-latency, reliable transport.

### Storage

Instance-attached storage ...

* **EBS**: Scale up to 256,000 IOPS with io2 Block Express.
* **Instance Store**: Scale to millions of IOPS, linked to EC2 Instance, low-latency.

Network storage ...

* **Amazon S3**: Large blob, not a file system.
* **Amazon EFS**: Scale IOPS based on the total size, or use provisioned IOPS.
* **Amazon FSx for Lustre**: HPC-optimized distributed file-system, millions of IOPS and backed by S3.

## Automation and Orchestration

AWS Batch ...

* **AWS Batch** supports multi-node parallel jobs, which enable running single jobs that span multiple **EC2** Instances.
* Easily schedule jobs and launch EC2 Instances accordingly.

AWS ParallelCluster ...

* Open source cluster management tool to deploy HPC on AWS.
* Configure with text files.
* Automate creation of VPC, Subnet, cluster type, and instances types.

## EC2 Instance High-Availability

Example ...

* EC2 Instance with a website.
* Attach an Elastic IP.
* EC2 Instance as standby.
* Monitor using CloudWatch Event (or Alarm based on a metric).
* Trigger a Lambda function to start the Instance, attach to the Elastic IP, and terminate the original Instance.

With an Auto Scaling Group...

* Elastic IP connected to an ASG.
* Configure ASG with 1 minimum, 1 maximum, and 1 desired over >= 2 AZ.
* EC2 User Data to attach to the Elastic IP.
* ASG on the failure of an Instance will start a new one in the other AZ.
* Need an EC2 Instance Role to allow API calls to attach to the Elastic IP.

With ASG + EBS ...

* Elastic IP connected to an ASG.
* Configure ASG with 1 minimum, 1 maximum, and 1 desired over >= 2 AZ.
* EBS Volume attached to Instance.
* EBS Snapshot (on ASG *Terminate* lifecycle hook) and tags.
* EBS Volume created and attached (on ASG *Launch* lifecycle hook).
* EC2 User Data to attach to the Elastic IP.

## Bastion Host High-Availability

HA options for the Bastion Host ...

* Run 2 across 2 AZ.
* Run 1 across 2 AZ with 1 ASG 1:1:1.

Routing to the Bastion Host ...

* **If 1 Bastion Host**, use an Elastic IP with EC2 User Data script to access it.
* **If 2 Bastion Hosts**, use a Network Load Balancer (Layer 4) deployed in multiple AZ.
* If NLB, the Bastion Host can live in the private subnet directly.

**Note**: Cannot use an ALB because it is Layer 7 and cannot accommodate the TCP traffic.
