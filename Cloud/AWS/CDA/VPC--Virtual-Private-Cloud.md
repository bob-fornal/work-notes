# VPC: Virtual Private Cloud

VPCs can be created within a region.

* Each VPC contain subnets (networks).
* Each subnet must be mapped to an AZ.
* It is common to have a public IP and private IP subnet.
* It is common to have many subnets per AZ.

## Public Subnets usually contain:

* Load Balancers
* Static Websites
* Files
* Public Authentication Layers

## Private Subnets usually contain:

* Web application servers
* Databases

Public and Private subnets can communicate if they are in the same VPC.

## Internet and NAT Gateways

* IGW: connect to the Internet.
* NAT: access to the Internet while remaining private.

## Network ACL

Firewall which controls traffic to and from a subnet.

* Can have ALLOW and DENY rules.
* Attached at subnet level.
* Rules only include IP addresses.

## Security Groups

* Firewall controls traffic to and from an Elastic Network Interface (ENI) or an EC2 instance.
* Only ALLOW rules.
* Include IP addresses and other Security Groups.

## VPC Flow Logs

* Capture information about IP traffic going into interfaces.
* Data sent to S3 or CloudWatch.

## VPC Peering

* Connects two VPC privately using AWS' network.
* Behave as if they are the same network.
* Must not have overlapping CIDR (IP Address Range).
* Not transitive (A -> B - C does not mean A -> C, unless they are connected as well).

## VPC Endpoints

* Allow VPC to connect to AWS Services **using a private network**.
* Enhanced security and lower latency.

## Site-to-Site CPN and Direct Connect

* Site-to-Site: encrypted, over the Internet
* Direct Connect: physical connection on-premises, over private network.

## AWS VPC Summary

* All new accounts come with a default VPC.
* It is possible to use a VPN to connect to a VPC.
* VPC flow logs allow monitoring of the traffic within, in and out of a VPC (useful for security, performance, audit).
* VPC are per Account per Region.
* Subnets are per VPC per AZ.
* Some AWS resources can be deployed in VPC while others cannot.
* VPC can be set up as peer networks (within or across accounts) to make it look like they are part of the same network.
