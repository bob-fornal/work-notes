# Advanced EC2

## Bootstrapping EC2 using User Data

EC2 Bootstrapping ...

* Bootstrapping allows **EC2 Build Automation**.
* User Data is accessed via the metadata IP: `http://169.254.169.254/latest/user-data`
* Anything in User data is **executed by the Instance OS**.
* **ONLY AT Launch**.
* EC2 does not interpret this data, the OS needs to understand the User Data.

User Data Key Points ...

* It is **opaque** to EC2, it is just a **block of data**.
* It is **NOT** secure. Do not use it for passwords or long-term credentials (ideally).
* Limited to 16KB in size.
* Can be modified when the instance is stopped.
* But **only executed once at launch**.

## Enhanced Bootstrapping with CFN-INIT

`AWS::CloudFormation::Init` ...

* `cfn-init` helper script installed on EC2 OS.
* Simple configuration management system.
* Procedural (User Data) versus Desired State (cfn-init).
* Packages, Groups, Users, Sources, Files, Commands, and Services.
* Provided with directives via **Metadata** and `AWS::CloudFormation::Init` on a CFN resource.

## EC2 Instance Roles and Profile

EC2 Instance Roles ...

* IAM Role allows EC2 Service to assume the role.
* An InstanceProfile is created with the same name.
* The Profile is attached to an Instance.
* Temporary Credentials are delivered via instance meta-data.
* `iam/security-credentials/<role-name>`.
* Automatically rotated and always valid.
* Should be used rather than adding access keys into an EC2 Instance.
* CLI Tools will use ROLE credentials automatically.

Configuration settings and precedence ...

The AWS CLI uses credentials and configuration settings located in multiple places, such as the system or user environment variables, local AWS configuration files, or explicitly declared on the command line as a parameter. Certain locations take precedence over others. The AWS CLI credentials and configuration settings take precedence in the following order:

1. **Command line options** – Overrides settings in any other location.
2. **Environment variables** – The system's environment variables.
3. **CLI credentials file** – The credentials and config file are updated when you run the command `aws configure`. The credentials file is located at `~/.aws/credentials` on Linux or macOS, or at `C:\Users\USERNAME\.aws\credentials` on Windows. This file can contain the credential details for the default profile and any named profiles.
4. **CLI configuration file** – The credentials and config file are updated when you run the command `aws configure`. The config file is located at `~/.aws/config` on Linux or macOS, or at `C:\Users\USERNAME\.aws\config` on Windows. This file contains the configuration settings for the default profile and any named profiles.
5. **Container credentials** – You can associate an IAM role with each of your Amazon Elastic Container Service (Amazon ECS) task definitions. Temporary credentials for that role are then available to that task's containers.
6. **Instance profile credentials** – You can associate an IAM role with each of your Amazon Elastic Compute Cloud (Amazon EC2) instances. Temporary credentials for that role are then available to code running in the instance. The credentials are delivered through the Amazon EC2 metadata service.

## AWS System Manager (SSM) Parameter Store

* Storage for **configuration and secrets**.
* Strings, StringList, and SecureString.
* License codes, Database Strings, Full Configurations, and Passwords.
* Hierarchies and Versioning.
* Plaintext Parameters and Ciphertext.
* Public Parameters, **Latest AMIs per region**.

## System and Application Logging on EC2

* CloudWatch is for storing and managing metrics.
* ClousWatch Logs is for logging.
* Neither natively captures **data from inside an Instance**.
* CloudWatch Agent is required, plus **configuration** and **permissions**.

## EC2 Placement Groups

* **Cluster** - Pack instances close together.
* **Spread** - Keep instances separated.
* **Partition** - Groups of instances spread apart.

Cluster Placement Groups ...

* Same Rack, often the same host.
* All members have direct connections to each other.
* 10Gbps per stream rather than 5Gbps normally.
* Lowest latency possible and maximum packets-per-second possible in AWS.

Details ...

* Cannot span AZs - **ONE AZ ONLY**, locked when launching the first instance.
* Can span VPC peers, but this impacts performance.
* Requires a supported instance type.
* Use the same type of instance for the best results (**not mandatory**).
* Launch at the same time (**not mandatory, but strongly recommended**).
* **10Gbps of single-stream performance**.
* Use-cases: **Performance, fast speeds, low latency**.

Spread Placement Groups ...

* **Limited to 7 Instances per AZ** - Isolated infrastructure limit.
* Provides infrastructure isolation, each Instance runs from a different rack.
* Each rack has its own **network and power source**.
* Not supported for Dedicated Instances or Hosts.
* Use-cases: Small number of critical instances that need to be kept separated from each other.

Partition Placement Groups ...

* Divided into **partitions** with a maximum of 7 per AZ.
* Each partition has its oen racks, no sharing between partitions.
* Instances can be placed into a **specific partition** or auto placed.
* Great for topology-aware applications: HDFS, HBase, and Cassandra.
* Contain the impact of failure to part of an application.

## EC2 Dedicated Hosts

**[Dedicated Hosts Options](https://aws.amazon.com/ec2/dedicated-hosts/pricing/)**

* EC2 Hosts that are **dedicated to an AWS Account**.
* Specific family. Example: a1, c5, m5.
* **No instance charges**, the account pays for the host.
* On-Demand and Reserved Options available.
* Host hardware has **physical sockets and cores**.

Limits and Features ...

* **AMI Limits** - RHEL, SUSE Linux, and Windows AMIs are not supported.
* **Amazon RDS** instances are not supported.
* **Placement Groups** are not supported for Dedicated Hosts.
* Host can be shared with other Organization Accounts ... **RAM**.

## Enhanced Networking

* **Single Network, I/O Virtualization (SN-IOV)** - NIC is virtualization-aware.
* No charge, available on most EC2 Types.
* **Higher I/O and Lower Host CPU Usage**.
* More **Bandwidth**.
* Higher packets-per-second (PPS).
* Consistent lower **latency**.

## EBS Optimized Instances

* EBS is Block storage over the **network**.
* Historically the network is **shared, both data and EBS**.
* EBS Optimized means **dedicated capacity** for EBS.
* Most instances support it and have it **enabled by default**.
* Some support, but enabling costs extra.
