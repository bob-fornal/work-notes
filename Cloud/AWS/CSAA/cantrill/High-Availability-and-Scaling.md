# High Availability and Scaling

## Regional and Global AWS Architecture

Global ...

* Global **Service Location and Discovery**.
* Content Delivery (CDN) and optimization.
* Global **health checks and Failover**.
* Global DNS is used for service discovery, regional-based health checks, and request routing.
* CDNs are used to cache content globally, as close to end-users as possible to improve performance.

Regional ...

* Regional **entry point**.
* **Scaling and Resilience**.
* Application services and components.

## Evolution of the Elastic Load Balancer

* Three Types of load balancers (ELB) available within AWS.
* Split between v1 (**avoid / migrate**) and v2 (**prefer**).
* Classic Load Balancer (CLB) - v1 - Introduced in 2009. Not really Layer 7, lacking features, **1 SSL per CLB**.
* Application Load Balancer (ALB) - v2 - HTTP(s), WebSocket.
* Network Load Balancer (NLB) - v2 - TCP, TLS, and UDP.
* v2 is faster, cheaper, and support target groups and rules.

## Elastic Load Balancer Architecture (ELB)

* One or more Nodes are placed into a subnet in each AZ and scale with load.
* Each ELB is configured with an (A) record DNS name. This resolves to the ELB Nodes.
* Internet-facing Nodes have Public IPs.
* Internal-facing Nodes only have Private IPs.
* Load Balancers (Nodes) are configured with **listeners** which accept traffic on a port and protocol and communicate with targets on a port and protocol.
* Internet-facing Load Balancing Nodes can access Public and Private EC2 Instances.
* Eight or more IPs per subnet and a `/27` or larger subnet allow for scale.
* Internal load balancers can be used to allow scaling between application tiers.
* Load Balancers allow each tier to scale independently.

Cross-Zone Load Balancers ...

* Each node gets **100% / Number of Nodes**.

Notes ...

* ELB is a DNS A Record pointing at one or more Nodes per AZ.
* Nodes (in one subnet per AZ) can scale.
* **Internet-facing** means Nodes have Public IPv4 IPs.
* **Internal-facing** means Private only IPs.
* EC2 **does not need to be public** to work with a Load Balancer.
* Listener Configuration controls **WHAT** the Load Balancer does.
* Require eight or more Free IPs per subnet, and `/27` subnets allow scaling.
