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

## Stateful versus Stateless Firewalls

Transmission Control Protocol (TCP) ...

* Layer 4 Protocol.
* TCP is a connection-based protocol.
* A connection is established between two devices using a random port (ephemeral port) on a client and a (well-known port) known port on the server.
* Once established, the connection is bi-directional.
* The **connection** is reliable, provided via the segments encapsulated in IP packets.
* Segments are linked to a connection, error checking, ordering, and retransmission.

### Stateless Firewalls

What most people imagine ...

* Is a **SINGLE OUTBOUND** connection, via HTTPS which is `tcp/443`.
* Every "connection" has two parts, **REQUEST** (initiation) and **RESPONSE**.

What actually happens ...

1. The client picks a temporary (ephemeral) source port, `1024-65535` (depends on the OS).
2. The client initiates a connection to the server on a well-known destination port HTTPS `tcp/443`.
3. The server responds using the source port of `tcp/443` and the destination ephemeral port picked by the client.

* Directionality ... **INBOUND** or **OUTBOUND** depends on (CLIENT/SERVER) perspective.
* With Stateless Firewalls remember that it uses the **response ephemeral ports**, not the well-known application port.

### Stateful Firewalls

* Stateful Firewalls mean lower administrative overhead.
* A stateful firewall is intelligent enough to identify that the **REQUEST** and **RESPONSE** components of a connection are related.
* Allowing the **REQUEST** (INBOUND or OUTBOUND) means the **RESPONSE** (INBOUND or OUTBOUND) is automatically allowed.

## Network Access Control Lists (NACLs)

* NACLs are Stateless, both the REQUEST and RESPONSE parts need individual rules (1 x INBOUND and 1 x OUTBOUND).
* NACLs filter traffic crossing the subnet boundary (INBOUND or OUTBOUND).
* Connections within a subnet are not impacted by NACLs.
* NACLs contain rules grouped into INBOUND and OUTBOUND. Inbound rules match traffic ENTERING the subnet. Outbound rules match traffic LEAVING the subnet.
* Rules match the DESTINATION IP/Range, DESTINATION Port, and Protocol, and ALLOW or DENY based on that match.
* Rules are processed **in order**, lowest rule number first. Once a match occurs, processing STOPS. `*` is an **implicit DENY** if nothing else matches.

Default NACL ...

* A VPC is created with a Default NACL.
* Inbound and outbound rules have **implicit deny (`*`)** and in ALLOW ALL rule.
* The result is all traffic is **allowed**, the NACL has no effect.

Custom NACLs ...

* Custom NACLs can be created for a specific VPC and are initially associated **with NO subnets**.
* They only have 1 x INBOUND and 1 x OUTBOUND rule, the explicit (`*`) DENY.
* The result is that **ALL traffic is DENIED**.

## Security Groups (SG)

* VPC Security Groups are **STATEFUL**, they detect response traffic automatically.
* When an INBOUND or OUTBOUND request is allowed, the response is automatically allowed.
* **NO EXPLICIT DENY**,  only ALLOW or Implicit DENY.
* **They cannot be used to block specific bad actors**.
* Support IP and CIFR based rules, and logical resources, including other **security groups** AND ITSELF.
* Attached to ENIs, not Instances (even if the UI shows it this way).

Security Group (SG) Logical References ...

* Source can be another Security Group.
* Logical referencing scales; any new Instances which use the Security Group referenced are allowed to communicate with any Instances using the referencing Security Group.

Security Group (SG) Self References ...

* Within a Security Group (SG), an "SG source" is the same as "anything with the SG attached."
* Using a "self-reference" means "anything with this SG attached."
* This scales with ADDS and REMOVES from the SG.
* IP changes are automatically handled.

## Network Address Translation (NAT) and NAT Gateway

Network Address Translation (NAT) ...

* A set of prepoccesses that remap SOURCE or DESTINATION IPs.
* **IP Masquerading** hiding CODR Blocks behind one IP.
* Gives Private CIDR range **outgoing** Internet access.

NAT Gateway ...

* Runs from a **public subnet**.
* Uses **Elastic IPs** (Static IPv4 Public)
* **AZ Resilient Service** (HA within the AZ).
* For regional resilience, deploy a NATGW in each AZ and have a Route Table (RT) in each AZ with the NATGW as the target.
* Managed, scales to 45 Gbps. Billed for duration and data volume.

NAT Instance versus NAT Gateway ...

| Attribute |	NAT Gateway |	NAT Instance |
|-----------|-------------|--------------|
| Availability | Highly available. NAT gateways in each Availability Zone are implemented with redundancy. Create a NAT gateway in each Availability Zone to ensure zone-independent architecture. | Use a script to manage failover between instances. |
| Bandwidth | Scale up to 45 Gbps. | Depends on the bandwidth of the instance type. |
| Maintenance | Managed by AWS. You do not need to perform any maintenance. | Managed by you, for example, by installing software updates or operating system patches on the instance. |
| Performance | Software is optimized for handling NAT traffic. | A generic AMI that's configured to perform NAT. |
| Cost | Charged depending on the number of NAT gateways you use, duration of usage, and amount of data that you send through the NAT gateways. | Charged depending on the number of NAT instances that you use, duration of usage, and instance type and size. |
| Type and size | Uniform offering; you don’t need to decide on the type or size. | Choose a suitable instance type and size, according to your predicted workload. |
| Security groups | Cannot associate security groups with NAT gateways. You can associate them with the resources behind the NAT gateway to control inbound and outbound traffic. | Associate with your NAT instance and the resources behind your NAT instance to control inbound and outbound traffic. |
| Network ACLs | Use a network ACL to control the traffic to and from the subnet in which your NAT gateway resides. | Use a network ACL to control the traffic to and from the subnet in which your NAT instance resides. |
| Flow logs | Use flow logs to capture the traffic. | Use flow logs to capture the traffic. |
| Port forwarding | Not supported. | Manually customize the configuration to support port forwarding. |
| Bastion servers | Not supported. | Use as a bastion server. |

* NAT Instance, "Disable Source/Destination Checks."

What about IPv6?

* NAT is not required for IPv6.
* All IPv6 addresses in AWS are publicly routable.
* The Internet Gateway works with ALL IPv6 IPs directly.
* NAT Gateways **do not work with IPv6**.
* `::/0` Route and IGW for bi-directional connectivity.
*  `::/0` Route and Egress-Only Internet Gateway, Outbound Only.

## DEMO: Implementing Private Internet Access Using NAT Gateways

1. Use CloudFormation to redo the previous demo.
2. Create a private-only EC2 Instance.

SSH Agent Forwarding ...

* Public and Private SSH Keys are created. The private part is stored securely on the SSH client (laptop).
* The client begins a connection to the Bastion Host. The Bastion asks the user to prove its identity, which it can do using the **Private Key**.
* The public part is added as an "authorized key" on the SSH servers.
* ssh-agent service on the laptop. `ssh-add` adds the private key into the agent for authentication.
* SSH Client connects with "-A" (Agent Forwarding), `client ssh-agent` can be used to prove identity.
* The Private Key remains on the client at all times, authentication requests are forwarded. The same "identity" is used to connect to the BASTION and then through to InternalTest.
