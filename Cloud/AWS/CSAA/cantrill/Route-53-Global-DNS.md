# Route 53 - Global DNS

## Hosted Zones

* A **Route 53 Hosted Zone** is a DNS Database for a domain (example, bob-ts.com).
* **Globally resilient** (multiple DNS Servers).
* Created with domain registration via Route 53, can be created separately.
* Host DNS Records (examples: A, AAAA, MX, NS, TXT).
* Hosted Zones are what the DNS system references - **Authoritative** for a domain (example, bob-ts.com).

## Public Hosted Zones

* DNS Database (**zone file**) hosted by Route 53 (Public Name Servers).
* Accessible from the public internet and VPCs.
* Hosted on "4" Route 53 Name Servers (NS) specified for the zone.
* Use "NS records" to point at these NS (connected to global DNS).
* Resource Records (RR) created within the Hosted Zone.
* Externally registered domains can point at Route 53 Public Zone.

## Private Hosted Zones

* A **Public** Hosted Zone, which is not public.
* Associated with VPCs and only accessible in those VPCs.
* Using different accounts is supported via CLI/API.
* Split-view (overlapping public and private) for PUBLIC and INTERNAL use with the same zone name.

## CNAME versus Route 53 Alias

The Problem ...

* "A" maps a NAME to an IP Address ... catagram.io to 1.3.3.7
* CNAME maps a NAME to another NAME ... www.catagram.io to catagram.io
* CNAME is **invalid for naked/apex (catagram.io).
* Many AWS services use a DNS Name (ELBs).
* With just CNAME - catagram.io to ELB would be invalid.

The Solution ...

* **ALIAS** records map a NAME to an AWSS resource.
* Can be used for both naked/apex and normal records.
* For non-apex/naked - functions like CNAME.
* There is no change for **ALIAS** requests pointing at AWS resources.
* For AWS Services - **default** to picking **ALIAS**.
* Should be the same "Type" as what the record is pointing at.
* API Gateway, CloudFront, Elastic Beanstalk, ELB, Global Accelerator, and S3.

## Simple Routing

* Simple Routing supports **one record per name**.
* Each Record can have multiple values.
* All values are returned in random order.
* Client chooses and uses one value.
* Simple Routing **does not support health checks** - all values are returned for a record when queried.
* Use **Simple Routing** to route requests toward **one service** such as a web browser.

## Route 53 Health Checks

* Health checks are **separate from**, but are **used by** records.
* Health checkers are located **globally**.
* Health checkers check every 30 seconds (every 10 seconds costs extra).
* TCP, HTTP/HTTPS, HTTP/HTTPS with String Matching.
* **Healthy** or **Unhealthy**.
* Endpoint, CloudWatch Alarm, Checks of Checks (Calculated).

## Failover Routing

* A common architecture is to use **failover** for an "out of band" failure or maintenance page for a service.
* To configure active, passive failover.
* If the target of the health check is **Healthy** the Primary record is used.
* If the target of the health check is **Unhealthy** the Secondary record is used.

## Multi Value Routing

* Multi Value Routing supports **multiple records** with the same name.
* Up to 8 HEALTHY records are returned. If more exist, 8 are randomly selected.
* Each record is independent and can have an **associated health check**.
* Any records which **fail health checks will not be returned** when queried.
* Multi Value Routing improves availability. It is **NOT a replacement for load balancing**.

## Weighted Routing

* Simple load balancing or testing new software versions.
* A Record Weight is assigned to each record.
* Each record is returned based on its Record Weight versus Total Weight.
* A "0" weight means a record is never returned unless all are "0," then all are considered.
* If a chosen record is UNHEALTHY, the process of selection is repeated until a HEALTHY record is chosen.

## Latency Routing

* Use latency-based routing when optimizing for **performance and user experience**.
* Latency-based routing supports one record with the same name in each AWS Region.
* AWS maintains a database of latency between the user's general location and the regions tagged in the records.
* The record returned is the one that offers the lowest estimated latency and is HEALTHY.

## Geolocation Routing

* With Geolocation, records are tagged with locations. Either "US State," "country," "continent," or "default."
* An IP check verifies the location of the user (normally the resolver).
* Geolocation **does not return the "closest"** records, only the relevant (location) records.
* Can be used for **regional restrictions, language-specific content, or load balancing across regional endpoints**.

Route 53 checks for records ...

1. In the state.
3. In the country.
3. In the continent.
4. (optionally) default - it returns the most specific record or "NO ANSWER."

## Geoproximity Routing

* Records can be tagged with an AWS Region or latitude and longitude coordinates.
* "+/-" bias can be added to rules. A "+" increases a region's size and decreases neighboring regions.
* Routing is distance-based (including bias).

## Route 53 Interoperability

* Route 53 normally has two jobs - **Domain Registrar** and **Domain Hosting**.
* Route 53 can do BOTH, or either Domain Registrar or Domain Hosting.
* Route 53 accepts money (domain registration fee).
* Route 53 allocates 4 Name Servers (NS) (domain hosting).
* Route 53 creates a zone file (domain hosting) on the above NS.
* Route 53 communicates with the registry of the TLD (Domain Registrar).
* Sets the NS records for the domain to point at the 4 NS above.
