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

## Application Load Balancing (ALB) versus Network Load Balancing (NLB)

Load Balancer Consolidation ...

* Classic Load Balancers (CLB) do not scale. Every unique HTTPS name requires an individual CLB because SNI is not supported.
* v2 Load Balancers support rules and target groups. Host-based rules using SNI and an ALB allows consolidation.

### Application Load Balancer (ALB)

* **Layer 7** Load Balancer that listens on HTTP and/or HTTPS.
* **No other Layer 7 protocols** (SMTP, SSH, Gaming, ...) are supported.
* ... and **NO TCP, UDP, or TLS Listeners**.
* Layer 8 content type, cookes, custom headers, user location, and application behavior.
* HTTP or HTTPS (SSL/TLS) always terminated on the ALB - **no unbroken SSL** (security teams), a new connection is made to the application.
* All ALBs must have SSL Certificates if HTTPs is used.
* ALBs are slower than NLB. More levels of the network stack to process.
* Health checks **evaluate application health** at Layer 7.

ALB Rules ...

* Rules direct connections which arrive at a listener.
* Processed in priority order.
* Default rule.
* Rule Conditions: host-headers, http-headers, http-request-method, path-pattern, query-string, and source-ip.
* Actions: forward, redirect, fixed-response, authenticate-oidc, and authenticate-cognito.

### Network Load Balancer (NLB)

* Layer 4 Load Balancer that listens on TCP, TLS, UDP, and TCP_UDP.
* **No visibility or understanding** of HTTP or HTTPs.
* **No headers, no cookes, and no session stickiness**.
* Really Fast (millions of Requests Per Second, 25% of ALB Latency).
* ... SMTP, SSH, Game Servers, financial applications (**non-HTTP/HTTPs).
* Health checks **JUST** check ICMP and TCP Handshake, not application aware.
* NLBs can have static IPs, which is useful for whitelisting.
* Forward TCP to instances with **unbroken encryption**.
* Used with private link to provide services to other VPCs.

## Launch Configurations and Launch Templates

Key Concepts ...

* Allow the definition of the configuration of an EC2 Instance to be set in advance.
* AMI, Instance Type, Storage, and Key Pair.
* Networking and Security Groups.
* Userdata and IAM Role.
* Both are NOT editable, defined once. Launch Templates have versions.
* Launch Templates provide newer features inclusing T2/T3 Unlimited, Placement Groups, Capacity Reservations, and Elastic Graphics.
