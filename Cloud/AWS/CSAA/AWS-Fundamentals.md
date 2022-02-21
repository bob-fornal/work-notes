# AWS Fundamentals

## AWS Public versus Private Services

Networking Perspective ...

1. "Public Internet" Zone
2. "AWS Public" Zone
3. "AWS Private" Zone

AWS Private Zone ...

* VPCs are isolated unless configured otherwise.
* On-premises can only access VPCs if configured via VPN or Direct Connect.
* Private services (example, EC2) can be given a **public IP - 1:1** that is translated by the IGW.

AWS Public Zone ...

* Connected to the Public Internet Zone.

## AWS Global Infrastructure

* AWS Regions (not mapped to countries).
* AWS Edge Locations (local distribution points).

Regions ...

* Geographic Separation - Isolated Fault Domain.
* Geopolitical Separation - Different governance.
* Location Control - Performance.

Availability Zones (AZs) ...

* Isolated infrastructure within a region.

Service Resilience ...

* Globally Resilient (examples, IAM and Route 53).
* Region Resilient.
* AZ Resilient.

## AWS Default Virtual Private Cloud (VPC)

A VPC is a Virtual Network inside AWS.

* A VPC is within one account and one region.
* By default, it is Private and Isolated unless it's configured otherwise.
* Two types - Default VPC (one per Region) and Custom VPCs.

Default VPC Notes ...

* **One Default VPC per Region**, it can be removed and recreated.
* Default VPC CIDR is always `127.31.0.0/16`.
* `/20` Subnet in each AZ in the Region.
* Comes with and Internet Gateway (IGW), Security Group (SG), and NACL preconfigured.
* Subnets assign public IPv4 addresses.

## Elastic Compute Cloud (EC2)

IaaS = Infrastructure as a Service.

* EC2 Provides Virtual Machines, Instances.
* **Private** service by-default, uses VPC networking.
* AZ Resilient, Instance fails if an AZ fails.
* Different instance sizes and capabilities.
* On-Demand Billing, per second or per hour.
* Local on-host storage or Elastic Block Store (EBS).

Instance Lifecycle ...

Involves CPU, Memory, Disk, and Networking.

1. Running - charges for all four.
2. Stopped - charge only for storage.
3. Terminated - no charges.

### Amazon Machine Image (AMI)

* Can be used to create a Machine Image.
* Can be created from a Machine Image.

Contains ...

* Root Volume
* Block Device Mapping
* Permissions

Permissions ...

  1. Public - Everyone allowed.
  2. Owner - Implicit allow.
  3. Explicit - Specific AWS Accounts allowed.
