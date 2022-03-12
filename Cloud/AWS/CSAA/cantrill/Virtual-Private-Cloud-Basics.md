# Virtual Private Cloud (VPC) Basics

## VPC Sizing and Structure

VPC Considerations ...

1. What **size** should the VPC be?
2. Are there any networks **that cannot be used**?
3. Are there other VPCs, other Cloud environments, On-premises, Partners, or Vendors to be aware of?
4. Try to predict the future.
5. Consider the VPC Structure - Tiers and Resiliency (Availability) Zones.

IP Ranges to avoid ...

* This is information gathered from the various client parties.

More considerations ...

* On AWS, a VPC can be at its smallest `/28` (16 IPs) and maximum `/16` (65,456 IPs).
* Often a preference for the `10.x.y.z` range.
* Avoid common ranges - avoid future issues.
* Reserve 2+ networks per region being used per account.

VPC sizing ...

| VPC Size | Netmask | Subnet Size | Hosts/Subnet | Subnets/VPC | Total IPs |
|----------|---------|-------------|--------------|-------------|-----------|
| Micro | /24 | /27 | 27 | 8 | 216 |
| Small | /21 | /24 | 251 | 8 | 2,008 |
| Medium | /19 | /22 | 1,019 | 8 | 8,152 |
| Large | /18 | /21 | 2,043 | 8 | 16,344 |
| Extra Large | /16 | /20 | 4.091 | 16 | 65,456 |

* How many **subnets** will be needed?
* How many **IPs total**? How many **per subnet**?

## Custom VPCs

* Regional Service - all AZs in the region.
* Isolated network.
* Nothing **IN** or **OUT** without explicit configuration.
* Flexible configuration - simple or multi-tier.
* Hybrid Networking - other cloud and on-premises.
* Default or Dedicated Tenancy.
* IPv4 Private CIDR Blocks and Public IPs.
* 1 Primary Private IPv4 CIDR Block, minimum `/28` (16 IPs) and maximum `/16` (65,536 IPs).
* Optional secondary IPv4 Blocks.
* Optional single **assigned** IPv6 `/56` CIDR Block.

DNS in a VPC ...

* Provided by Route 53.
* VPC **Base IP +2** Address.
* `enableDNSHostnames` - gives instances DNS names.
* `enableDNSSupport` - enabled DNS resolution in the VPC.
