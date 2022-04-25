# Hybrid Environments and Migration

## Border Gateway Protocol (BGP) 101

* Autonomous Systems (AS) - Routers controlled by one entity, a network in BGP.
* ASNs are unique and allocated by IANA (0-65,535), 64,512 - 65,534 are private.
* BGP Operates over tcp/179 - it is reliable.
* **NOT AUTOMATIC** - peering is manually configured.
* BGP is a **path-vector** protocol. It exchanges the best path to a destination between peers, the path is called the **ASPATH**.
* iBGP = Internal BGP - Routing within an AS.
* eBGP = External BGP - Routing between ASs.

## AWS Site-to-Site VPN

* A logical connection between a VPC and on-premises network encrypted using IPSec, running over the public Internet.
* Full High Availability - if designed and implemented correctly.
* Quick to provision - less than an hour.
* Virtual Private Gateway (VGW).
* Customer Gateway (CGW).
* VPN Connection between the VGW and CGW.

VPN Considerations ...

* Speed Limitations ~1.25 Gbps.
* Latency Considerations - inconsistent, public Internet.
* Cost - AWS hourly cost, GB out cost, data capacity (on-premises).
* Speed of setup - hours (or less) because it is all software configuration.
* Can be used as a backup for Direct Connect (DX).
* Can be used with Direct Connect (DX).
