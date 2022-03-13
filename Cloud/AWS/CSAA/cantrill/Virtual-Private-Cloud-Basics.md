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

## VPC Subnets

* **AZ Resilient**.
* A subnetwork of a VPC - **within a particular AZ**.
* 1 Subnet is created in one AZ, 1 AZ can have zero or more Subnets.
* IPv4 CIDR is a subnet of the VPC CIDR.
* Cannot overlap with other subnets.
* Optional IPv6 CIDR (`/64` subnet of the `/56` VPC - space for 256).
* Subnets can communicate with other subnets within the VPC.

Subnet IP addressing ...

* Reserved IP addresses (5 in total).

Example, 10.16.16.0/20 (10.16.16.0 to 10.16.31.255) ...

* Network Address (10.16.16.0).
* "Network +1" (10.16.16.1) - VPC Router.
* "Network +2" (10.16.16.2) - Reserved (DNS*).
* "Network +3" (10.16.16.3) - Reserved for Future Use.
* Broadcast Address (10.16.31.255) - Last IP in the subnet.

## DEMO: Implement Multi-Tier VPC Subnets

1. Go to the VPC Console.
2. Click on the **Subnets** link on the left side.
3. Click on the **Create subnets** button.
4. Select the previously created VPC in "VPC ID."
5. Add subnets (name, AZ, CIDR block, IPv6), use the **Add new subnet** button to add in batches.
6. Click the **Create subnet** button.
7. For each created subnet ... select, **Edit subnet settings**, and check "Enabled auto-assign IPv6 address," then click the **Save** button.
