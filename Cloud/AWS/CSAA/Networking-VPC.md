# Networking - VPC

## CIDR, Private versus Public IP

Understanding CIDR - IPv4

* **Classless Inter-Domain Routing** - a method for allocating IP addresses.
* Used in **Security Group** rules and AWS networking in general.

Detail ...

A SIDR consists of two components.

**Base IP**

* Represents an IP contained in the range (xx.xx.xx.xx).

**Subnet Mask**

* Defined how many bits can change in the IP range.
* The Subnet Mask allows part of the underlying IP to get additional next values from the base IP.

| Mask |            | IPs       | Addresses                      |
|------|------------|-----------|--------------------------------|
| /32  | allows for | 1 IP      | 192.168.0.0                    |
| /24  | allows for | 256 IP    | 192.168.0.0 to 192.168.0.255   |
| /16  | allows for | 65,536 IP | 192.168.0.0 to 192.168.255.255 |
| /0   | allows for | ALL IPs   | 0.0.0.0 to 255.255.255.255     |

### Public versus Private IP (IPv4)

The Internet Assigned Numbers Authority (IANA) established certain blocks of IPv4 addresses for the use of private (LAN) and public (Internet) addresses.

**Private IPs** can only be within certain ranges ...

| Range                                           | Network               |
|-------------------------------------------------|-----------------------|
| 10.0.0.0 to 10.255.255.255 (10.0.0.0/8)         | Big Networks          |
| 172.16.0.0 to 172.31.255.255 (172.16.0.0/12)    | AWS default VPC range |
| 192.168.0.0 to 192.168.255.255 (192,168.0.0/16) | Home Networks         |

* The remainder of the IP addresses are Public (on the Internet).

## Default VPC Overview

* All new AWS accounts have a default VPC.
* New EC2 Instances are launched into the default VPC if no subnet is specified.
* Default VPC has Internet connectivity and all EC2 Instances inside it have public IPv4 addresses.
* There are also public and private IPv4 DNS names.

## VPC in AWS - IPv4

* **VPC = Virtual Private Cloud**
* Multiple VPCs can exist in an AWS region (maximum of 5 per region - soft limit).

The maximum CIDR per VPC is 5, for each CIDR ...

* Minimum size is /28 (16 IP addresses).
* Maximum size is /16 (65,536 addresses).

Because VPC is private, only the private IPv4 ranges are allowed ...

| Range                                           | Network               |
|-------------------------------------------------|-----------------------|
| 10.0.0.0 to 10.255.255.255 (10.0.0.0/8)         | Big Networks          |
| 172.16.0.0 to 172.31.255.255 (172.16.0.0/12)    | AWS default VPC range |
| 192.168.0.0 to 192.168.255.255 (192,168.0.0/16) | Home Networks         |

* **The VPC should not overlap with other networks (example, corporate)**.

## VPC - Subnet Overview

* AWS reserves 5 IP addresses (first 4 and last 1) in each subnet.
* These 5 IP addresses are not available for use and can't be assigned to an EC2 Instance.

If CIDR block 10.0.0.0/24, then reserved IP addresses are ...

* 10.0.0.0 - Network Address.
* 10.0.0.1 - Reserved by AWS for the VPC router.
* 10.0.0.2 - Reserved by AWS for mapping to Amazon-provided DNS.
* 10.0.0.3 - Reserved by AWS for future use.
* 10.0.0.255 - Network Broadcast Address. AWS does not support broadcast in a VPC, therefore the address is reserved.

## Internet Gateways and Route Tables

IGW = Internet Gateway

* Allow resources in a VPC to connect to the Internet.
* It scales horizontally and is highly available and redundant.
* Must be created separately from a VPC.
* One VPC can only be attached to one IGW and vice versa.
* Internet Gateways on their own do not allow Internet access.
* Route tables must also be edited.

## Bastion Hosts

The Bastion Host is used to SSH into private EC2 Instances.

* The bastion is in the public subnet which is then connected to all other private subnets.
* **Bastion Host security group must be tightened**.
* **Exam Tip**: Make sure the Bastion Host only has port 22 traffic from the IP address needed, not from the Security Groups of other EC2 Instances.

## NAT Instances

**Outdated**, but still on the exam.

NAT = Network Address Translation

* Allows EC2 Instances in private subnets to connect to the Internet.
* Must be launched in a public subnet.
* Must disable EC2 setting: **Source and Destination Check**.
* Must have Elastic IP attached to it.
* Route Tables must be configured to route traffic from private subnets to the NAT Instance.

Notes ...

Pre-configured Amazon Linux AMI is available.

* Reached the end of standard support on December 21, 2020.

Not highly available, resilient setup out of the box.

* Create an ASG in Multi-AZ and resilient user-data script.

Internet traffic bandwidth depends on the SC2 Instance type.

## NAT Gateways

AWS-managed NAT, higher bandwidth, high availability, no administration.

* Pay per hour for usage and bandwidth.
* NATGW is created in a specific Availability Zone (AZ) and uses Elastic IP.
* Cannot be used by EX2 Instance in the same subnet (only from other subnets).
* Requires an IGW (Private subnet -> NATGW -> IGW).
* 5 Gbps of bandwidth with automatic scaling up to 45 Gbps.
* No Security Groups to manage required.

### NAT Gateway with High Availability

* **NAT Gateway is resilient within a single AZ**.
* Must create **multiple NAT Gateways** in **multiple AZs** for fault-tolerance.
* There is no cross-AZ failover needed because if an AZ goes down, it does not need NAT.

## DNS Resolution Options and Route 53 Private Zones


