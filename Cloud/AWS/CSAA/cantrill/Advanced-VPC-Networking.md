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
