# EC2 - Solutions Architect Associate Level

## Private versus Public versus Elastic IP

Networking has two sorts of IPs: IPv4 and IPv6.

* IPv4: ```1.160.10.240```
* IPv6: ```3ffe:1900:45454:3:200:f8ff:fe21:67cf```

IPv4 is still the most common format used online. IPv6 is newer.

* IPv4 allows for 3.7 billion different addresses in the public space.
* IPv4: ```[0-255].[0-255].[0-255].[0-255]```

### Public IP

* Means the machine can be identified on the Internet.
* Must be unique across the whole Internet.
* Can be geo-located easily.

### Private IP

* Means the machine can only be identified on a private network only.
* The IP must be unique across the private network.
* Two different private networks can have the same IPs.
* Machines on the private network connect to the Internet using a NAT and Internet Gateway (a proxy).
* Only a specified range of IPs can be used as private IPs.

### Elastic IPs

* When an EC2 Instance is stopped and started, it can change its public IP.
* An Elastic IP is needed if a fixed public IP is needed
* An Elastic IP is a public IPv4 IP that is owned as long as it is not deleted.
* It can be attached to one instance at a time.

## EC2 Placement Groups

For control over the EC2 Instance placement strategy use Placement Groups.

When a placement group is created, the following strategies can be used:

* *Cluster* - clusters instances into a low-latency group in a single Availablility Zone (AZ).
* *Spread* - spreads instances across underlying hardware (max of 7 instances per group per AZ) - critical applications.
* *Partition* - spreads instances across many different partitions (which rely on different sets of racks) within an AZ. Scales to 100s of EC2 Instances per group (Hadoop, Cassandra, Kafka).

## Elastic Network Interfaces (ENI)

Logical component in a VPC that represents a **virtual network card**.

The ENI can have the following attributes:

* Primary private IPv4, one or more secondary IPv4.
* One Elastic IP (IPv4) per private IPv4.
* One Public IPv4.
* One or more security groups.
* A MAC Address.

ENIs can be created independently and attached on the fly (move them) on EC2 Instances for failover.

* Bound to a specific AZ.

### Extra Reading

* [New – Elastic Network Interfaces in the Virtual Private Cloud](https://aws.amazon.com/blogs/aws/new-elastic-network-interfaces-in-the-virtual-private-cloud/) ![Link](../../../foreign.png)

## EC2 Hibernate

### Stopped or Terminated

* Stop: the data on disk (EBS) is kept intact in the next start.
* Terminate: any EBS volumns (root) also setup to be destroyed is lost.

### Started

* First start: the OS boots and the EC2 User Data script is run.
* Following starts: the OS boots.
* Then any application starts, caches get warmed up ... takes time.

### Hibernated

* The in-memory (RAM) state is preserved.
* The instance boot is much faster (the OS is not stopped / restarted).
* Under the hood, the RAM state is written to a file in the root EBS volume.
* The root EBS volume must be encrypted.

Use Cases:

* Long-running processing.
* Saving the RAM state.
* Services that take time to initialize.

Good to Know:

* Not supported on all instance families.
* Instance RAM size - less that 150GB.
* Instance size - not supported on bare metal instances.
* AMI: Amazon Linux 2, Linux AMI, Ubuntu, Windows.
* Root Volumn: must be EBS, encrypted; not instance store and large.
* Available for On-Demand and Reserved Instances.
* An instance cannot be hibernated for more than 60-days.

## EC2 Advanced Concepts

### Nitro

Underlying platform for the next generation of EC2 Instances. New virtualization technology.

* Better networking options.
* Higher speed EBS (64k EBS IOPS, non-Nitro max 32K IOPS).
* Better underlying security.
* Instance Types: Virtualized or Bare Metal

### vCPU

* Multiple threads can run on one CPU (multithreading).
* Each thread is represented as a virtual CPU (vCPU).
* Only specified during instance launch.

### Capacity Reservations

* Capacity Reservations ensure EC2 Capacity when needed.
* Manual or planned end-date for the reservation.
* No need for 1 or 3-year committment.
* Capacity access is immediate, billed at start.
* Specify: the AZ, number of instances, and instance attributes.
* Comibine with Reserved Instances and Savings Plans to do cost savings.
