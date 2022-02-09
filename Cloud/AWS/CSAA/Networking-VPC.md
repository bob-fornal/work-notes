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

### DNS Resolution in VPC

* If using custom DNS domain names in a Private Hosted Zone in Route 53, set both the attributes (`enableDnsSupport` and `enableDnsHostname`) to `true`.

DNS Resolution (`enableDnsSupport`) ...

* Decides if DNS resolution from Route 53 Resolver server is supported for the VPC.
* If `true` (default), it queries the Amazon Provider DNS Server at **192.254.169.253** or the reserved IP address at the base of the **VPC IPv4 network range plus two (.2)**.

DNS Hostnames (`enableDnsHostnames`) ...

* By default, it is `true` if it is a default VPC or `false` for newly created VPCs.
* Will not do anything unless `enableDnsSupport=true`.
* If `true`, assigns a public hostname to the EC2 Instance if it has a public IPv4.

## NACL and Security Groups

### Network Access Control List

* NACLs are like a firewall that controls traffic from and to **subnets**.
* **One NACL per subnet**, new subnets are assigned the **Default NACL**.
* Newly created NACLs will deny everything.
* NACLs are a great way of blocking a specific IP address at the subnet level.

Defining **NACL Rules** ...

* Rules are numbered (1-32,766), higher precedence to rules with a lower number.
* The first rule match drives the decision.
* The last rule is an asterisk (*) and denies a request in case of no rule match.
* AWS recommends adding rules by increments of 100.

### Default NACL

* Accepts everything inbound and outbound with the subnets it is associated with.
* Do **NOT** modify the Default NACL, instead create custom NACLs.

Inbound Rules ...

| Rule # | Type | Protocol | Port Range | Source | Allow/Deny |
|--------|------|----------|------------|--------|------------|
| 100 | All IPv4 Traffic | All | All | 0.0.0.0/0 | ALLOW |
| * | All IPv4 Traffic | All | All | 0.0.0.0/0 | DENY |

Outbound Rules ...

| Rule # | Type | Protocol | Port Range | Source | Allow/Deny |
|--------|------|----------|------------|--------|------------|
| 100 | All IPv4 Traffic | All | All | 0.0.0.0/0 | ALLOW |
| * | All IPv4 Traffic | All | All | 0.0.0.0/0 | DENY |

### Ephemeral Ports

* For any two endpoints to establish a connection, they must use ports.
* Clients connect to a **defined port**, and expect a response on an **ephemeral port**.

Different Operating Systems use different port ranges ...

| System | Port Range |
|--------|------------|
| IANA and Microsoft Windows | 49,152 - 65,535 |
| Many Linux Kernels | 32,768 - 60,999 |

### Security Groups versus NACLs

| Security Group | NACL |
|----------------|------|
| Operates at the instance level. | Operates at the subnet level. |
| Supports allow rules only. | Supports allow and deny rules. |
| **Stateful**: Return traffic is automatically allowed, regardless of any rules. | **Stateless**: Return traffic must be explicitly allowed by rules (think of ephemeral ports). |
| All rules are evaluated before deciding whether to allow traffic. | Rules are evaluated in order (lowest to highest) when deciding whether to allow traffic, first match wins. |
| Applies to an EC2 Instance when specified by someone. | Automatically applies to all EC2 Instances in the subnet that it is associated with. |

## VPC - Reachability Analyzer

A network diagnostic tool that troubleshoots network connectivity between two endpoints in the VPC(s).

* It builds a model of the network configuration, then checks the reachability based on these configurations **(it does not send packets)**.

When the destination is ...

* **Reacheable** - it produces hop-by-hop details of the virtual network path.
* **Not Reachable** - it identifies the blocking component(s) (e.g. configuration issues in SGs, NACLS, Route Tables, ...).

## VPC Peering

* Privately connect two VPCs using AWS' network.
* Make them behave as if they were in the same network.
* Must not have overlapping CIDRs.
* VPC Peering connection is **NOT transitive** (must be established for each VPC that needs to communicate with another).
* **Must update route tables in each VPC's subnets to ensure EC2 Instances can communicate with each other**.

Good to know ...

* Can create VPC Peering connection between VPCs in **different AWS accounts and regions**.
* Can reference a security group in a peered VPC (works cross accounts - same region).

## VPC Endpoints (AWS PrivateLink)

* Every AWS service is publicly exposed (public URL).
* VPC Endpoints (powered by AWS PrivateLink) allows a connection to AWS services using a private network instead of the public Internet.
* They are redundant and scale horizontally.
* They remove the need for IGW, NATGW, ... to access AWS Service.

In case of issues ...

* Check DNS Setting Resolution in the VPC.
* Check Route Tables.

### Types of Endpoints

**Interface Endpoints** ...

* Provisions an ENI (private IP address) as an entry point (must attach a Security Group).
* Supports most AWS services.

**Gateway Endpoints** ...

* Provision a gateway and must be used as a target in a Route Table.
* Supports both S3 and DynamoDB.

## VPC Flow Logs

Three Types ...

* VPC Flow Logs
* Subnet Flow Logs
* Elastic Network Interface (ENI) Flow Logs

Capture information about the IP traffic going into the interfaces.

* Helps to monitor and troubleshoot connectivity issues.
* Flow Logs data can go to S3 and CloudWatch Logs.
* Captures network information from AWS managed interfaces too: ELB, RDS, ElastiCache, Redshift, WorkSpaces, NATGW, Transit Gateway, ...

### VPC Flow Logs Syntax

* **srcaddr and dstaddr** - help identify problematic IP.
* **srcport and dstport** - help identify problematic ports.
* **Action** - success or failure of the request due to Security Group and NACL.
* Can be used for analytics on usage patterns, or malicious behavior.
* **Query VPC Flow Logs using Athena on S3 or CloudWatch Logs Insights**.

## Site-to-Site VPN, Virtual Private Gateway, and Customer Gateway

### AWS Site-to-Site VPN

**Virtual Private Gateway (VGW)** ...

* VPN concentrator on the AWS side of the VPN connection.
* VGW is created and attached to the VPC from which the Site-to-Site VPN connection is created.
* Possibility to customize the ASN (Autonomous System Number).

**Customer Gateway (CGW)** ...

* Software application or physical device on the customer-side of the VPN connection.
* [Customer Gateway Device](https://docs.aws.amazon.com/vpn/latest/s2svpn/your-cgw.html)

### Site-to-Site VPN Connections

**Customer Gateway Device (On-premises)**

* Public Internet-routable IP address for the Customer Gateway device.
* If it is behind a NAT device that is enabled for NAT traversal (NAT-T)m use the public IP address of the NAT device.

**Important Step**: Enable **Route Propagation** for the Virtual Private Gateway in the Route Table that is associated with the subnets.

* If there is a need to ping the EC2 Instances from on-premises, make sure to add the ICMP protocol on the inbound of the Security Groups.

### AWS VPN CloudHub

* Provide secure communication between multiple sites, if there are multiple VPN connections.
* Low-cost hub-and-spoke for primary or secondary network connectivity between different locations (VPN only).
* It is a VPN connection so it goes over the public Internet.
* To set it up, connect multiple VPN connections on the same VGW, set up dynamic routing, and configure the Route Tables.

## Direct Connect and Direct Connect Gateway

### Direct Connect (DX)

Provides a dedicated **private** connection from a remote network to a VPC.

* A dedicated connection must be set up between the DC and AWS Direction Connect location.
* Need to set up a Virtual Private Gateway on the VPC.
* Access public resources (S3) and private (EC2) on the same connection.
* Supports both IPv4 and IPv6.

Use-cases ...

* Increased bandwidth throughput; good when working with large data sets and lower cost.
* More consistent network experience; applications using real-time data feeds.
* Hybrid Environments (on-premises and cloud).

### Direct Connect Gateway

* **Use a Direct Connect Gateway to set up a Direct Connect to one or more VPCs in many different regions (same account)**.

## Direct Connect - Connection Types

* Lead times are often longer than 1 month to establish a new connection.

**Dedicated Connections**: 1Gbps and 10Gbps capacity.

* Physical ethernet port dedicated to a customer.
* Request made to AWS first, then completed by AWS Direct Connect Partners.

**Hosted Connections**: 50Mbps, 500Mbps, to 10Gbps.

* Connections requests are made via AWS Direct Connect Partners.
* Capacity can be **added or removed on-demand**.
* 1Gbps, 2Gbps, 5Gbps, 10Gbps available at select AWS Direct Connect Partners.

### Direct Connect - Encryption

* Data in transit is **not encrypted** but is private.
* AWS Direct Connect and VPN provide an IPsec-encrypted private connection.
* Good for an extra level of security, but slightly more complex to put in place.

### Direct Connect - Resiliency

* High Resiliency for Critical Workloads, one connection through multiple locations.
* Maximum Resiliency for Critical Workloads, achieved using separate connections terminating on separate devices in more than one location.

## AWS PrivateLink (VPC Endpoint Services)

Exposing services in a VPC to another VPC ...

Option 1: Make it public ...

* Goes through the public Internet.
* Tough to manage access.

Option 2: VPC Peering ...

* Must create many peering relations.
* Opens the **whole** network.

### AWS PrivateLink (VPC Endpoint Services)

* Most secure and scalable way to expose a service to 1,000s of VPCs (on individual or many accounts).
* Does not require VPC Peering, Internet Gateway, NAT, Route Tables, ...
* Requires a Network Load Balancer (Service VPC) and ENI (Customer VPC) or GWLB.
* If the NLB is in multiple AZ and the ENIs are in multiple AZ, the solution is fault-tolerant.

## AWS ClassicLink

> **Likely to be distractors on the exam**.

**EC2-Classic and AWS ClassicLink (deprecated)**.

* **EC2-Classic**: Instances run in a single network shared with other customers.
* **Amazon VPC**: Instances run logically isolated to the AWS account.

**ClassicLink** allows linking EC2-Classic Instances to a VPC in the account.

* Must associate a Security Group.
* Enables communication using private IPv4 addresses.
* Removes the need to make use of public IPv4 addresses or Elastic IP addresses.

## Transit Gateway

For having transitive peering between thousands of VPCs and on-premises, hub-and-spoke (star) connections.

* Regional resource, can work cross-region.
* Share cross-account using Resource Access Manager (RAM).
* Can peer Transit Gateways across regions.
* Route Tables limit which VPC can talk to other VPCs.
* Works with Direct Connect Gateway and VPN connections.
* Supports **IP Multicast** (not supported by any other AWS service).

### Transit Gateway: Site-to-Site VPN ECMP

**ECMP = Equal-cost multi-path routing**.

* Routing strategy to allow to forward a packet over multiple best-paths.
* Use-case: Create multiple Site-to-Site VPN connections **to increase the bandwidth of the connection to AWS**.

### Transit Gateway: Throughput with ECMP

| VPN to Virtual Private Gateway | VPN to Transit Gateway                          |
|--------------------------------|-------------------------------------------------|
| 1 connection = 1 VPC           | 1 connection  = many VPC                        |
| 1 connection = 1.25 Gbps       | 1 connection  = 2.5 Gbps (ECMP), 2 tunnels used |
| VPN connection (2 tunnels)     | 2 connections = 5.0 Gbps (ECMP)                 |
|                                | 3 connections = 7.5 Gbps (ECMP)                 |

## VPC - Traffic Mirroring

* Allows capturing and inspecing network traffic in a VPC.
* Route the traffic to security appliances that user manages.
* Capture all packets or capture the packets of interest (optionally, truncate packets).
* Source and Target can be in the save VPC or difference VPCs (VPC Peering).

Capture the traffic ...

* **From (Source)** - ENIs.
* **To (Targets)** - an ENI or a Network Load Balancer.

## IPv6 for VPC

* IPv4 designed to provide 4.3 Billion addresses.
* IPv6 is the successor to IPv4.
* IPv6 is designed to provide **3.4 x 10<sup>38</sup>** unique IP addresses.
* Every IPv6 address is public and Internet-routable (no private range).

**IPv4 cannot be disabled for VPC and subnets**.

* Can enable IPv6 (they are public IP addresses) to operate in dual-stack mode.
* EC2 Instances will get at least a private internal IPv4 and a public IPv6.
* The can communicate using either IPv4 or IPv6 to the Internet through an Internet Gateway.

### IPv6 Troubleshooting

If an EC2 Instance cannot be launched in the subnet ...

* It is not because it cannot acquire an IPv6, it is because there are no available IPv4 in the subnet.
* **Solution**: Create a new IPv4 CIDR in the subnet.

## Egress Only Internet Gateway

Allows instances in VPC outbound connections over IPv6 while preventing the Internet from initiating an IPv6 connection to the Instances.

* **Used only for IPv6**.
* Similar to a NAT Gateway, but for IPv6.
* **Must update the Route Tables**.
