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

## Storage Gateway

* Hybrid Storage Virtual Appliance (On-Premises).
* Extension of File and Volume Storage in AWS.
* Volume storage backup into AWS.
* Tape Backups into AWS.
* Migration of existing infrastructure into AWS.

Main Modes ...

1. Tape Gateway (VTL) Mode, virtual tapes stored on S3 and Glacier.
2. File Mode - SMB and NFS, File Storage backed by S3 Objects.
3. Volume Mode (Gateway Cache and Stored) - iSCSI, block storage backed by S3 and EBS Snapshots.

File Gateway ...

* HTTPS to Public Endpoint.
* Files are stored to shares using NFS or SMB.
* Mapped directly 1:1 as S3 objects.
* Lifecycle Policies can automatically control Storage Classes.
* SMB shares can integrate with Active Directory for file authorization.

Tape Gateway ...

* Pretends to be an iSCSI tape library, changer, and drive.
* HTTP via Public Endpoint.
* Active tapes are stored in S3, archived/exported takes are stored in VTS in Glacier.
* Virtual tape 100 GiB to 5 TiB. 1 PB total storage across 1,500 virtual tapes.
* Unlimited VTS (Archive) Storage.

Volume Gateway (Stored) ...

* 16 TB per volume, 32 Volumes (MAX), 512 TB total capacity.
* Primary data is stored on-premises. Backup data is asynchronously replicated to AWS.
* Volumes are made available via iSCSI for network-based servers to access (single connection per volume unless servers are clustered).
* AWS side creates EBS Snapshots from backup data. Can be used to creat standard EBS volumes.
* Ideal for migrations to AWS. Assists with Disaster Recovery.

Volume Gateway (Cached) ...

* HTTP via Public Endpoint.
* Volumes are made available via iSCSI for network-based servers to access (single connection per volume unless servers are clustered).
* Primary Data is stored in AWS. Data which is accessed frequently is cached locally. Ideal for extending storage into AWS.
* Primary data is stored on a S3-Backed volume (AWS Managed Bucket). Snapshots are stored as standard EBS Snapshots.
* 32 TB per volume, 32 Volumes (MAX), 1 PB total capacity.

## Snowball and Snowmobile

Key Concepts ...

* Move large amounts of data IN or OUT of AWS.
* Physical storage, suitcase or truck.
* Ordered from AWS empty, load up, and return.
* Ordered from AWS with data, empty, and return.

Snowball ...

* Ordered from AWS, log a job, and device delivered (not instantly).
* Data Encryption uses KMS.
* 50 TB or 80 TB Capacity.
* 1 Gbps (RJ45 1GBase-TX) or 10 Gbps (LR/SR) Network.
* 10 TB to 10 PB economical range (multiple devices).
* Multiple devices can be sent to multiple premises.
* Only storage.

Snowball Edge ...

* Both Storage and Compute.
* Larger capacity than Snowball.
* 10 Gbps (RJ45), 10/25 (SFP), or 40/50/100 Gbps (QSFP+).
* Storage Optimized (with EC2) - 80 TB, 24 vCPU, and 32 GiB RAM, **1 TB SSD**.
* Compute Optimized - 100 TB, 7,68 NVME, 52 vCPU, and 208 GiB RAM.
* Compute Optimized (with GPU).
* Ideal for remote sites or where data processing on ingestion is needed.

Snowmobile ...

* Portable Data Center within a shipping container on a truck.
* Special order.
* Ideal for a single location when 10 PB+ is required.
* Up to 100 PB per Snowmobile.
* Not economical for multi-site (**unless huge**) or sub 10 PB.

## AWS Directory Service

What is a Directory?

* Stores objects (example, Users, Groups, Compters, Servers, File Shares) with a structure (domain/tree).
* Multiple trees can be grouped into a forest.
* Commonly used in Windows Environments.
* Sign-in to multiple devices with the same username/password provides centralized management for assets.
* ... Microsoft Active Directory Domain Services (AD DS).
* AD DS is the most popular, open-source alternatives (SAMBA).

Directory Service ...

* AWS Managed implementation.
* Runs within a VPC.
* To implement High Availability, deploys into multiple AZs.
* Some AWS service **NEED** a directory. Example, Amazon Workspaces.
* Can be isolated.
* Can be integrated with an existing on-premises system.
* Can act as a "proxy" back to on-premises.

Simple AD Mode ...

* Standalone directory which uses Samba 4.
* Up to 500 users (Small) or 5,000 users (Large).
* Integrates with AWS Services - EC2 Instances can join SimpleAD and Workspaces can use it for logins and management.
* Not designed to integrate with any existing on-premises directory system such as Microsoft AD.

AWS Managed Microsoft AD Mode ...

* Primary running location is AWS. Trust relationships can be created between AWS and on-premises directory systems.
* Resilient if the VPN fails. Services in AWS will still be able to access the local directory running in Directory Service.
* Full Microsoft AD DS running in 2012 R2 Mode. Microsoft AD aware applications running in AWS.
* Supports applications which require MS AD Specific schema or schema updates.

AD Connector Mode ...

* Allows AWS services which NEED a directory to use an existing on-premises directory.
* ONLY a proxy, no local functionality.
* Primary Directory is located on-premises. Requests from AWS are proxied back to the existing directory.
* If private connectivity fails, the AD proxy will not function, interrupting services on the AWS side.

Notes ...

* Simple AD - the default. Simple requirements, a directory in AWS.
* Microsoft AD - applications in AWS which need MS AD DS, or there is a need to TRUST AD DS.
* AD Connector - use AWS services which need a directory **without storing any directory information in the cloud**, proxy to an on-premises Directory.
