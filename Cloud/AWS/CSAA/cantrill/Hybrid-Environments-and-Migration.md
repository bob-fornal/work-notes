# Hybrid Environments and Migration

## Border Gateway Protocol (BGP) 101

* Autonomous Systems (AS) - Routers that are controlled by one entity, a network in BGP.
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

## Direct Connect (DX)

A **1 Gbps** or **10 Gbps** Network Port into AWS.

* At a DX Location (1000-Base-LX or 10GBASE-LR).
* To Customer Router (requires VLANS/BGP). or Partner Router (if extending to your location).
* Multiple Virtual Interfaces (VIFS) over one DX.
* Private VIF (VPC) and Public VIF (Public Zone Services).
* One physical cable, therefore **NO High Availability (HA)** and **NO Encryption**

Considerations ...

* Takes MUCH longer to provision than VPN.
* DX Port provisioning is quick; the cross-connect takes longer.
* Extension to premises can take weeks or months.
* Use VPN first, then replace it with DX (or leave VPN as a backup).
* Faster, up to 40 Gbps with Aggregation.
* Low consistent latency, does not use business bandwidth.
* **NO ENCRYPTION**.

## Direct Connect (DX) Resilience and High Availability

* AWS Regions have multiple Direct Connect (DX) Locations. These are normally major metropolitan DCs.
* DX Locations are connected to the AWS Region via redundant high-speed connections.
* By default, **a single cross-connect** links a DX Port with a Customer or Provider Router.
* A DX is extended from the DX Location to a Customer Premises.

Possible Failure Points ...

1. DX Location
2. DX Router
3. Cross-Connect
4. Customer DX Router
5. Extension
6. Customer Premises
7. Customer Router

Initial Provisioning for Resilience ...

* Provision multiple Direct Connects, provided on separate routers.
* Single Points of Failure: DX Location, Customer Premises, and potentially extension link path.

Improved Provisioning for Resilience ...

* Two customer premises, allows for connection to two DX Locations.
* This architecture can protect against the failure of a location or hardware and will continue to operate at a reduced resiliency level.
* Risk of an outage if an entire location fails AND a router in the other location or corresponding customer premises fails.

Further Improved Provisioning for Resilience ...

* AWS Region, two DX Locations, and two customer premises.
* Each "route" has two DX Routers to Customer Routers.

## Transit Gateway (TGW)

* Network Transit Hug to connect VPCs to on-premises networks.
* Significantly reduces network complexity.
* Single network object - High Availability and Scalable.
* Attachments to other network types.
* Valid attachments are VPC, Site-to-Site VPN, and Direct Connect Gateway.

Considerations ...

* Supports transitive routing.
* Can be used to create global networks.
* Share between accounts using AWS RAM.
* Peer with different regions in the same or cross-account.
* Less complexity.
