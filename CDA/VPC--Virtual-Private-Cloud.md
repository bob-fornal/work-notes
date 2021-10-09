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

## AWS VPC Summary

* All new accounts come with a default VPC.
* It is possible to use a VPN to connect to a VPC.
* VPC flow logs allow monitoring of the traffic within, in and out of a VPC (useful for security, performance, audit).
* VPC are per Account per Region.
* Subnets are per VPC per AZ.
* Some AWS resources can be deployed in VPC while others cannot.
* VPC can be set up as peer networks (within or across accounts) to make it look like they are part of the same network.
