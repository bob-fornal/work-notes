# Route 53

## What is a DNS?

DNS = Domain Name System which translates the human friendly hostnames into the machine IP addresses.

* DNS is the backbone of the Internet.
* DNS uses hierarchical naming structure.

### Terminologies

* **Domain Registrar**: Amazon Route 53, GoDaddy, ...
* **DNS Records**: A, AAAA, CNAME, NS, ...
* **Zone File**: Contains DNS records.
* **Name Server**: Resolves DNS queries (Authoritative or Non-Authoritative).
* **Top Level Domain (TLD)**: .com, .us, .in, .gov, .org, ...
* **Second Level Domain (SLD)**: amazon.com, google.com, ...

## Route 53 Overview

Authoritative = The customer can update the DNS records.

* A highly available, scalable, fully managed and *Authoritative* DNS.
* Route 53 is also a Domain Registrar.
* Ability to check the health of resources.
* The only AWS service which provides 100% availability SLA.

### Route 53 - Records

* How to route traffic to a domain.

Each record contains ...

* **Domain/subdomain Name**: e.g. example.com
* **Record Type**: e.g. A or AAAA
* **Value**: e.g. 12.34.56.78
* **Routing Policy**: How Route 53 responds to queries
* **TTL**: Amount of time the record is cached at DNS Resolvers

Route 53 supports the following DNS record types ...

* (must know): A, AAAA, CNAME, NS
* (advanced): CAA, DS, MX, NAPTR, PTR, SOA, TXT, SPF, SRV

### Route 53 - Record Types

* **A**: Maps a hostname to IPv4.
* **AAAA**: Maps a hostname to IPv6.
* **CNAME**: Maps a hostname into another hostname.
* **NS**: Name Servers for the Hosted Zone.

CNAME Notes

* The target is a domain name whiehc must have an A or AAAA record.
* Cannot create a CNAME record for the top node of a DNS name space (Zone Apex).

### Route 53 - Hosted Zones

* A container for records that define how to route traffic to a domain and its subdomains.
* **Public Hosted Zones**: Contains records that specify how to route traffic on the Internet (public domain names).
* **Private Hosted Zones**: Contain records that specify how to route traffic within one or more VPCs (private domain names).
* COST: $0.50 per month per hosted zone.

## Route 53 - Records TTL (Time-To-Live)

**Except for Alias records, TTL is mandatory for each DNS record**.

### High TTL - e.g. 24-hours

* Less traffic on Route 53.
* Possibly outdated records.

### Low TTL - e.g. 60-seconds

* More traffic on Route 53.
* Records are outdated for less time.
* Easy to change records.

## CNAME versus Alias

AWS Resources (Load Balancer, CloudFront, ...) expose an AWS hostname ...

### CNAME

* Points a hostname to another hostname (app.mydomain.com => blabla.anything.com).
* **ONLY FOR NON ROOT DOMAIN** (aka something.mydomain.com).

### Alias

* Points a hostname to an AWS resource (app.mydomain.com => blabla.amazonaws.com).
* **Works for ROOT DOMAIN and NON ROOT DOMAIN** (aka mydomain.com).
* Free of charge.
* Native health capability.

Detail

* Maps a hostname to an AWS resource.
* An extension to DNS functionality.
* Automatically recognizes changes in the resource's IP addresses.
* Unlike CNAME, it can be used for the top node of a DNS namespace (Zone Apex), e.g. example.com
* Alias Record is always of type A/AAAA for AWS resources (IPv4/IPv6).
* **Cannot set the TTL**.

Targets

* Elastic Load Balancers
* CloudFront Distributions
* API Gateway
* Elastic Beanstalk environments
* S3 Websites
* VPC Interface Endpoints
* Global Accelerator accelerator
* Route 53 record in the same hosted zone
* **Cannot set an ALIAS record for an EC2 DNS name**.

## Routing Policies

Define how Route 53 responds to DNS queries. Route 53 supports ...

* Simple
* Weighted
* Failover
* Latency-based
* Geolocation
* Multi-Value Answer
* Geoproximity (using Route 53 Traffic Flow feature)

## Routing Policy - Simple

* Typically, route traffic to a single resource.
* Can specify multiple values in the same record.
* **If multiple values are returned, a random one is selected by the client**.
* When Alias enabled, specify only one AWS resource.
* Cannot be associated with Health Checks.

## Routing Policy - Weighted

* Control the percent (%) of the requests that go to each specific resource.
* Assign each record a relative weight.
* DNS records must have the same name and type.
* Can be associated with Health Checks.
* Use cases: load balancing between regions, testing new application versions.
* **Assign a weight of zero (0) to a record to stop sending traffic to a resource**.
* **If all records have a weight of zero (0), then all records will be returned equally**.

## Routing Policy - Latency

* Redirect to the resource that has the least latency (distance).
* Helpful when latency for users is a priority.
* **Latency is based on traffic between users and AWS Regions**.
* Can be associated with Health Checks (has a failover capability).

## Route 53 - Health Checks

* HTTP Health Checks are only for **public resources**.

Health Check => Automated DNS Failover ...

1. Health checks that monitor an endpoint (application, server, other AWS resource).
2. Health checks that monitor other health checks (Calculated Health Checks).
3. Health checks that monitor CloudWatch Alarms (full control) - e.g. throttles of DynamoDB, alarms on RDS, custom metrics, ... (helpful for private resources).

* Health Checks are integrated with CloudWatch metrics.
* Health Checks pass only when the endpoint responds with the 2xx and 3xx status codes.
* Health Checks can be setup to pass or fail based on the contents in the first 5,120 bytes of the response.
* Configure the router/firewall to allow incoming requests from Route 53 Health Checkers.

### Calculated Health Checks

* Combine the results of multiple Health Checks into a single Health Check.
* Can use OR, AND, or NOT.
* Can monitor up to 256 Child Heath Checks.
* Specify how many of the Health Checks need to pass to make the parent pass.
* Usage: Perform maintenance to the site without causing all health checks to fail.

### Private Hosted Zones

* Route 53 Health Checkers are outside the VPC.
* They cannot access **private** endpoints (private VPC or on-premises resource).
* Create a **CloudWatch Metric** and associate a **CloudWatch Alarm**, then create a Health Check that checks the alarm itself.

## Routing Policy - Failover (Active-Passive)

1. Primary (with **mandatory** Health Check).
2. Secondary - Disaster Recovery (Failover).

## Routing Policy - Geolocation

**This routing is based on user location**.

* Specify location by Continent, Country, or by US State (if there's overlapping, most precise location is selected).
* Should create a "**Default**" record (in case there is no match on location).
* Use cases: Website localization, restrict content distribution, load balancing, ...
* Can be associated with Health Checks.

## Routing Policy - Geoproximity

Route traffic to resources based on the geographic location of users and resources.

* Ability **to shift more traffic to resources based** on the defined bias.
* Must use Route 53 Traffic Flow (advanced) to use this feature.

To change the size of the geographic region, specify **bias** values ...

* To expand (1 to 99) - more traffic to the resource.
* To shrink (-1 to -99) - less traffic to the resource.

Resources can be ...

* AWS resources (specify AWS region).
* Non-AWS resources (specify Latitiude and Longitude).

## Routing Policy - Multi Value

* Use when routing traffic to multiple resources.
* Route 53 returns multiple values/resources.
* Can be associated with Health Checks (returns only values for healthy resources).
* Up to 8 healthy records are returned for each Multi-Value query.
* **Multi-Value is not a substitute for having an ELB**.

## Third Party Domains and Route 53

Domain Registrar versus DNS Service

* Domain names can be registered with a Domain Registrar.
* The Domain Registrar usually provides a DNS service to manage DNS records.
* Another DNS service can be used to manage DNS records.

Summary: **If the domain is on a 3rd party registrar, can use Route 53 as the DNS Service Provider**.

1. Create a Hosted Zone in Route 53.
2. Update NS (Name Server) Records on 3rd party site to use Route 53 **Name Servers**.

