# Route 53

Route 53 is a managed DNS (Domain Name System)

* Highly available, scalable, fully managed, and Authoritative Domain Names.
* Domain Registrar
* Ability to check resource health.

DNS is a collection of rules and records which helps clients understand how to reach a server through URLs.

In AWS, the most common records are (will be on exam):

* A: URL to IPv4
* AAAA: URL to IPv6
* CNAME: URL to URL
* NS: Name Servers for the Hosted Zones
* ALIAS: URL to AWS resource

## Route 53 Can Use

* Public domain names
* Private domain names that can be resolved by instances in VPCs

## Route53 Advanced Features

* Load balancing (through DNS - also called client load balancing)
* Health checks (although limited…)
* Routing policy: simple, failover, geolocation, geoproximity, latency, weighted

Prefer Alias over CNAME for AWS resources (for performance reasons)

## Route 53 - Records TTL

Time-to-Live - Client-Side

* High TTL: 24-hours (less traffic, possibly outdated)
* Low TTL: 60-seonds (more traffic, higher cost, outdated for a shorter timeframe)
* Except for Alias Records, TTS is mandatory for each DNS reocrd.

## CNAME versus Alias

**CNAME**: Only for non-root domain names.
**Alias**: Works for root and non-root domain names.

* Free of charge
* Native health checks

## Routing Policy - Simple

* Typically route traffic to a single resource.
* Can specify multiple values in the same record (client selects randomly).

## Routing Polity - Weighted

* Control the WEIGHT that go to each resource (WEIGHT, not PERCENT).
* Zero, do not send unless all are Zero, the distribute traffic to all equally.

## Routing Policy - Latency

* Redirect to resource with least latency (closest).
* Health checks.

## Route 53 - Health Checks

HTTP Health Checks are only for public resources.

* Monitor an endpoint.
* Calculated health checks.
* Private Hosted Zones (CloudWatch Metric and an associated CloudWatch Alarm).

## Routing - Failover

* Active-Passive, primary to secondary.

## Routing Policy - Geolocation

* Based on user location.
* Create "default" in case of no match.
* Health checks.

## Geoproximity Routing

* Bias - distance between users and resources

## Traffic Flow Policy

* Visual Design of Routing Policies.

## Routing Policies - Multi-Value

* Up to 8 healthy records returned for each multi-value query.
* NOT a substitute for ELB.

## 3rd-Party Domains

* Domain Registrar can be used to register a domain with Route 53 to manage the DNS records.
