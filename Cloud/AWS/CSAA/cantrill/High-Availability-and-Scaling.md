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

* Three types of load balancers (ELB) are available within AWS.
* Split between v1 (**avoid / migrate**) and v2 (**prefer**).
* Classic Load Balancer (CLB) - v1 - Introduced in 2009. Not really Layer 7, lacking features, **1 SSL per CLB**.
* Application Load Balancer (ALB) - v2 - HTTP(s), WebSocket.
* Network Load Balancer (NLB) - v2 - TCP, TLS, and UDP.
* v2 is faster, cheaper, and supports target groups and rules.

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
* v2 Load Balancers support rules and target groups. Host-based rules using SNI and an ALB allow consolidation.

### Application Load Balancer (ALB)

* **Layer 7** Load Balancer that listens on HTTP and/or HTTPS.
* **No other Layer 7 protocols** (SMTP, SSH, Gaming, ...) are supported.
* ... and **NO TCP, UDP, or TLS Listeners**.
* Layer 8 content type, cookies, custom headers, user location, and application behavior.
* HTTP or HTTPS (SSL/TLS) always terminated on the ALB - **no unbroken SSL** (security teams), a new connection is made to the application.
* All ALBs must have SSL Certificates if HTTP(s) are used.
* ALBs are slower than NLB. More levels of the network stack to process.
* Health checks **evaluate application health** at Layer 7.

ALB Rules ...

* Rules direct connections which arrive at a listener.
* Processed in priority order.
* Default rule.
* Rule Conditions: `host-headers`, `http-headers`, `http-request-method`, `path-pattern`, `query-string`, and `source-ip`.
* Actions: `forward`, `redirect`, `fixed-response`, `authenticate-oidc`, and `authenticate-cognito`.

### Network Load Balancer (NLB)

* Layer 4 Load Balancer that listens on TCP, TLS, UDP, and TCP_UDP.
* **No visibility or understanding** of HTTP or HTTP(s).
* **No headers, no cookies, and no session stickiness**.
* Fast (millions of Requests Per Second, 25% of ALB Latency).
* ... SMTP, SSH, Game Servers, financial applications (**non-HTTP/HTTP(s)).
* Health checks **JUST** check ICMP and TCP Handshake, not application-aware.
* NLBs can have static IPs, which is useful for whitelisting.
* Forward TCP to instances with **unbroken encryption**.
* Used with a private link to provide services to other VPCs.

## Launch Configurations and Launch Templates

Key Concepts ...

* Allow the definition of the configuration of an EC2 Instance to be set in advance.
* AMI, Instance Type, Storage, and Key Pair.
* Networking and Security Groups.
* Userdata and IAM Role.
* Both are NOT editable, defined once. Launch Templates have versions.
* Launch Templates provide newer features including T2/T3 Unlimited, Placement Groups, Capacity Reservations, and Elastic Graphics.

## EC2 Auto-Scaling Groups

* Automatic Scaling and *Self-Healing* for EC2.
* Uses Launch Templates or Configurations.
* Has a Minimum, Desired, and Maximum Size (example, 1:2:4).
* Keep the number of running instances at the Desired Capacity by provisioning or terminating Instances.
* Scaling Policies automate based on metrics.

Scaling Policies ...

* Manual Scaling - Manually adjust the desired capacity.
* Scheduled Scaling - Time-based adjustment (example, Sales).
* Dynamic Scaling: Simple, Stepped, and Target Tracking
* Cooldown Periods - Time between changes.

Dynamic Scaling Types ...

   * Simple Scaling - "CPU is above 50% +1", "CPU is below 50% -1"
   * Stepped Scaling - Bigger +/- based on the difference.
   * Target Tracking - Desired Aggregate CPU = 40%, let ASG handle the changes needed.

Scaling Processes ...

* `Launch` and `Terminate` - SUSPEND and RESUME.
* `AddToLoadBalancer` - Add to Load Balancer on launch.
* `AlarmNotification` - Accept notification from CloudWatch (CW).
* `AZRebalance` - Balances Instances evenly across all of the AZs.
* `HealthCheck` -  Instance health checks on or off.
* `ReplaceUnhealthy` - Terminate unhealthy and replace.
* `ScheduledActions` - Scheduled on or off.
* `Standby` - Use this for Instances that are Inservice versus Standby

## Auto-Scaling Groups (ASG) Scaling Policies

* ASGs do not NEED scaling policies - they can have none.
* Manual - Minimum, Maximum, and Desired - Testing and Urgent situations.
* Simple Scaling (Rigid).
* Step Scaling (Step Adjustments).
* Target Tracking (Predefined set of metrics).
* Scaling Based on SQS - `ApproximateNumberOfMessagesVisible`.

## Auto-Scaling Groups (ASG) Lifecycle Hooks

* Custom Actions on Instances during ASG actions.
* **Instance Launch** or **Instance Terminate** transitions.
* Instances are paused within the flow, they wait until a timeout (then either **CONTINUE** or **ABANDON**) or resume the ASG process `CompleteLifecycleAction`.
* EventBridge or SNS Notifications.

## Auto-Scaling Groups (ASG) HealthCheck Comparison - EC2 versus ELB

* EC2 (Default), ELB (Can be enabled), and Custom.
* EC2 - Stopping, Stopped, Terminated, Shutting Down, or Impaired is **UNHEALTHY**.
* ELB - **HEALTHY** is Running and passing ELB health check and can be more application-aware (Layer 7).
* Custom - Instances marked **healthy and unhealthy** by an external system.
* Health check grace period (Default 300s) - Delay before starting checks allows system launch, bootstrapping, and application start.

## SSL Offload and Session Stickiness

SSL Offload ...

* SSL Bridging

   The listener is configured for HTTPS. Connection is **terminated on the ELB** and **needs a certificate** for the domain name. ELB initiates a new SSL connection to the backend instances. Instances need SSL certificates and the compute required for cryptographic operations.

* SSL Passthrough

   The listener is configured for TCP. **No encryption or decryption happens on the NLB. Connection is passed to the backend Instance. Each Instance needs to have the appropriate SSL certificate installed. With this architecture there is no certificate exposure to AWS, it is all self-managed and secured.

* SSL Offload

   The listener is configured for HTTPS. Connection is **terminated on the ELB** and then backend connections use HTTP. ELB to Instance connections uses HTTP. No certificate or cryptographic requirements. 

Connection Stickiness ...

* With no Stickiness connections are distributed across all in-service backend instances. Unless the application handles the user state, this could cause user logoffs or missing information.
* Stickiness generates a cookie (`AWSALB`) that locks the device to a single backend instance for a duration (1-second to seven days). Can cause uneven loads.

## Gateway Load Balancers

Why do we need a GWLB?

* Transparent security appliance scans data **after it leaves and before it enters** the application instance.

What is a GWLB?

* Help run and scale 3rd party appliances, things like **firewalls, intrusion detection and prevention** systems.
* Inbound and Outbound traffic (transparent inspection and protection) via **GWLB Endpoints**, traffic enters and leaves via these endpoints.
* The GWLB balances across multiple backend appliances.
* Traffic and metadata is tunnelled using **GENEVE** protocol.
* Original packets remain unaltered encapsulated through to the appliance and back.
