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

## VPC Routing and Internet Gateway

* Every VPC has a VPC Router, it is Highly Available.
* In every subnet, at the 'network +1' address.
* Routes traffic between subnets.
* Controlled by **route tables**. Each subnet has one.
* A VPC has the Main route table, subnet default.

Internet Gateway (IGW) ...

* **Region resilient** gateway attached to a VPC.
* One VPC can have zero or one IGW. One IGW can connect with zero or one VPC.
* Runs from within the AWS Public Zone.
* Gateway's traffic between the VPC and the Internet or AWS Public Zone (S3, SQS, SNS, etc.).
* Managed, AWS handles the performance.

Using an Internet Gateway ...

1. Create an IGW.
2. Attach the IGW to a VPC.
3. Create a custom Route Table.
4. Associate the Route Table with the IGW.
5. Default Routes => IGW.
6. Subnet allocate IPv4.

## Bastion Host / Jumpbox

* Bastion Host and Jumpbox are essentially one-and-the-same.
* An instance in a public subnet.
* Incoming management connections arrive there, then access internal VPC resources.
* Often the only way INTO a VPC.

## DEMO: Configuring Public Subnets and Jumpbox

Create an Internet Gateway and attach it ...

1. Go to the VPC Console.
2. Click the **Internet Gateways** link on the left.
3. Click the **Create internet gateway** button.
4. Give the IGW a name and click the **Create internet gateway** button.
5. Click on **Actions** > "Attach to VPC."
6. Select the correct VPC and click the **Attach internet gateway** button.

Route Tables ...

1. Click the **Route Tables** link on the left.
2. Click the **Create route table** button.
3. Select the correct VPC, give the Route Table a name, and click the **Create route table** button.
4. Select the Route Table and the "Subnet associations" tab.
5. Click the **Edit subnet associations** button.
6. Select the three "web" subnets previously created and click the **Save associations** button.

Default Routes ...

1. Select the "Routes" tab and click the **Edit routes** button.
2. Click the **Add route** button, add a default route (`0.0.0.0/0` and `::/0` to the IGW), then click the **Save changes** button.

Add Auto-Assigned IPv4 to Web Subnets ...

1. Click the **Subnets** link on the left.
2. Select each web subnet, "Actions," then "Edit subnet settings," "Enable auto-assign public IPv4 address," then click the **Save** button.

Bastion Host ...

1. Launch an EC2 Instance, tag Name: BASTION (select free-tier).
2. Connect to the EC2 Instance.
