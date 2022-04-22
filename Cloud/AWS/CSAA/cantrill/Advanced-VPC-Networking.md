# Advanced VPC Networking

## VPC Flow Logs

* Capture packet metadata (**NOT CONTENTS**).

Attached to ...

1. A VPC - All ENIs in that VPC
2. A Subnet - All ENIs in that subnet
3.  ENIs directly.

* Flow Logs are **NOT realtime**.
* Log Destinations, S3 or CloudWatch Logs.
* Or Athena for querying.
* Flow Logs can capture ACCEPTED, REJECTED, or ALL metadata.

## Egress-Only Internet Gateway

* With IPv4 addresses are private or public.
* NAT allows private IPs to access public networks **without allowing** externally initiated connections (IN).
* With IPv6 all IPs are public.
* Internet Gateway (IPv6) allows all IPs IN and OUT.
* The Egress-Only is outbound-only for IPv6.
* The Egress-Only Gateway is Highly Available by default across all AZs in the region. It scales as required.

## VPC Endpoints (Gateway)

* Provide private access to S3 and DynamoDB.
* Prefix List added to the Route Table and used as the destination and the target is the Gateway Endpoint.
* Highly Available (HA) across all AZs in a region by default.
* Endpoint policy is used to control what it can access.
* Regional. **Cannot access cross-region** services.
* Prevent Leaky Buckets - S3 Buckets can be set to private only by allowing access ONLY from a Gateway Endpoint.

## VPC Endpoints (Interface)

* Provide private access to AWS Public Services.
* Historically - anything NOT S2 and DynamoDB, but S3 is now supported.
* Add to specific subnets - an ENI. Not Highly Available (HA).
* For HA, add one endpoint to one subnet, per AZ used in the VPC.
* Network access controlled via Security Groups.
* Endpoint Policies - restrict what can be done with the endpoint.
* **TCP and IPv4 ONLY**.
* Uses PrivateLink.

Notes ...

* Endpoint provides a NEW service endpoint DNS.
* Endpoint Regional DNS.
* Endpoint Zonal DNS.
* Applications can optionally use these or PrivateDNS overrides the default DNS for services.
