# ELB & ASG - High Availability and Scalability

## High Availability and Scalability

Scalability means that an application/system can handle greater loads by adapting.

* Vertical Scalability
* Horizontal Scalability (= elasticity)

**Scalability is linked to, but different from High Availability**.

### Vertical Scalability

Means that the size of the instance is increased.

* Vertical scalability is very common for non-distributed systems, such as a database.
* RDS and Elasticache are services that can scale vertically.
* There is usually a limit to how much vertical scaling can be achieved (hardware limit).

### Horizontal Scalability

Means increasing the number of instances/systems for the application.

* Horizontal scaling implies distributed systems.

### High Availability

* High Availability usually goes hand-in-hand with horizontal scaling.
* This means running an application/system in at least two data centers (=== Availability Zones)
* The goal is to survive a data center loss.
* It can be passive (for RDS Multi AZ, for example).
* It can be active (fro horizontal scaling).

## Elastic Load Balancing (ELB) Overview

Load Balancers are servers that forward traffic to multiple servers (e.g. EC2 Instances) downstream.

### Why use a load balancer?

* Spread load across multiple downstream instances.
* Expose a single point of access (DNS) to the application.
* Seamlessly handle failure of downstream instances.
* Do regular health checks on the instances.
* Provide SSL termination (HTTPS) for the sites.
* Enforce stickiness with cookies.
* High availability across zones.
* Separate public traffic from private traffic.

### Why use an Elastic Load Balancer?

An Elastic Load Balancer is a **managed load balancer**.

* AWS guarantees that it will be working.
* AWS takes care of upgrades, maintenance, and high availability.
* It is integrated with many AWS offerings and services.

### Health Checks

* Health Checks are crucial for Load Balancers.
* They enable the load balancer to know if an instance that it forwards traffic to is available to reply to requests.
* The health check is done on a port and a route (```/health``` is common).
* If response is not ```200 (OK)```, then the instance is unhealthy.

### Four Kinds of Managed Load Balancers

1. Classic Load Balancer (v1 - old generation, CLB): HTTP, HTTPS, TCP, SSL.
2. Application Load Balancer (v2 - new generation, ALB): HTTP, HTTPS, WebSocket.
3. Network Load Balancer (v2 - new generation, NLB): TCP, TLS, UDP.
4. Gateway Load Balancer (GWLB): Operates at Layer 3 (Network Layer) - IP Protocol.

## Classic Load Balancer (CLB)

* Supports TCP (Layer 4) and HTTP, HTTPS (Layer 7).
* Health Checks are TCP or HTTP based.
* Fixed hostname: XXX.region.elb.amazonaws.com

## Application Load Balancer (ALB)

* Application Load Balancers are HTTP (Layer 7).
* Load balancing to multiple HTTP applications across machines (target groups).
* Load balancing to multiple applications on the same machine (e.g. containers).
* Support for HTTP/2 and WebSocket.
* Supports redirect (e.g. from HTTP to HTTPS).

Route tables to different target groups.

* Routing based on path in URL (example.com```/users``` and example.com```/posts```).
* Routing based on hostname in URL (```one.example.com``` and ```other.example.com```).
* Routing based on Query String, Headers (example.com/users?```id=123&order=false```)

ALBs are a great fit for micro-services and container-based applications.

### ALB Target Groups

* EC2 Instances (can be managed by an Auto Scaling Group) - HTTP.
* ECS tasks (managed by ECS itselt) - HTTP.
* Lambda functions - HTTP request is translated into a JSON event.
* IP Addresses - must be private IPs.
* ALB can route to multple target groups.
* Health checks are done at the target group level.

### Good to Know

* Fixed hostname: XXX.region.elb.amazonaws.com
* The application servers do not see the IP of the client directly.

  * The true IP of the client is inserted in the header **X-Forwarded-For**.
  * The Port (X-Forwarded-Port) and protocol (X-Forwarded-Proto) are also available.

## Network Load Balancer (NLB)

Network Load Balancers (Layer 4) allow ...

* Forward TCP and UDP traffic to instances.
* Handle millions of requests per second.
* Less latency ~100md (vs 400ms for ALB).

NLBs have **one static IP per AZ, and support assigning Elastic IP** (helpful for whitelisting specific IPs).

* NLBs are used for extreme performance, TCP or UDP traffic.

### NLB Target Groups

* EC2 Instances.
* IP Addresses - must be private IPs.
* Application Load Balancer.

## Gateway Load Balancer (GWLB)

Deploy, scale, and manage a fleet of 3rd-party network virtual appliances in AWS.

* Example: Firewalls, Instrusion Detection and Prevention Systems, Deep Packet Inspection Systems, payload manipulation, ...
* Operates at Network Layer (Layer 3) - IP Packets.
* Combines: **Transparent Network Gateway** (single entry/exit for all traffic) and **Load Balancer** (distributes traffic to virtual appliances).
* Uses the **GENEVE** protocol on port **6081**.

## ELB - Sticky Sessions

Session Affinity - it is possible to implement stickiness so that the same client is always redirected to the same instance behind a load balancer.

* Works for Classic Load Balancer and Application Load Balancer
* The "cookie" used for stickiness has an expiration date that can be controlled.
* Use case: the user does not lose session data.
* Enabling stickiness may imbalance the load over backend EC2 Instances.

### Cookie Names

#### Application-based Cookies

Custom Cookie

* Generated by the target.
* Can include any custom attributes required by the application.
* Cookie name must be specified individually for each target group.
* Do not use **AWSALB**, **AWSALBAPP**, or **AWSALBTG** (reserved for the ELB).

Application Cookie

* Generated by the load balancer.
* Cookie name is **AWSALBAPP**.

#### Duration-based Cookes

* Cookie generated by the load balancer.
* Cookie name is **AWSALB** for ALB, **AWSELB** for CLB.

## ELB - Cross-Zone Load Balancing

>With **Cross-Zone Load Balancing**: each load balancer instance distributes evenly across all registered instances in all AZs.

>Without **Cross-Zone Load Balancing**: requests are distributes in the instances of the node of the Elastic Load Balancer.

### Application Load Balancer

* Always on (cannot be disabled).
* No charges for inter-AZ data.

### Network Load Balancer

* Disabled by default.
* There are charges for inter-AZ data, if enabled.

### Classic Load Balancer

* Disabled by default.
* No charges for inter-AZ data, if enabled.

## ELB - SSL/TLS Certificates

* An SSL Certificate allows traffic between clients and load balancer to be encrypted in-transit (in-flight encryption).
* SSL = Secure Socket Layer, used to encrypt connections.
* TLS = Transport Layer Security, newer version.
* **TLS Certificates are used in most cases**, but they are referred to as SSL.
* Public SSL Certificates are issued by Certificate Authorities (CA).
* SSL Certificates had an expiration date and must be renewed.

### SSL Certificates - Load Balancer

* The load balancer uses and X.509 Certificate (SSL/TLS Server Certificate).
* Manage certificates using ACM (AWS Certificate Manager).
* Upload certificates alternatively.

HTTPS listener ...

* Must specify a default certificate.
* Can add an optional list of certificates to support multiple domains.
* **Clients can use SNI (Server Name Indication) to specify the hostname they reach**.
* Ability to specify a security policy to support older versions of SSL/TLS (legacy clients).

### Server Name Indication

SNI solves the problem of loading **multiple SSL Certificates onto one web server** (to serve multple websites).

* It is a "newer" protocol, and requires the client to **indicate** the hostname of the target server in the initial SSL handshake.
* The server will then find the correct certificate, or return the default one.

Note:

* This only works for ALB and NLB (newer generation), CloudFront.
* Does not work for CLB (older generation).

## ELB - SSL Certificate Support

### Classic Load Balancer (v1)

* Support only one SSL Certificate.
* Must use multiple CLB for multiple hostnames with multiple SSL Certificates.

### Application Load Balancer (v2)

* Supports multiple listeners with multiple SSL Certificates.
* Uses Server Name Indication (SNI) to make it work.

### Network Load Balancer (v2)

* Supports multple listerners with multiple SSL Certificates.
* Uses Server Name Indication (SNI) to make it work.

## ELB - Connection Draining

Feature Naming

* For CLB, it is Connection Draining.
* For ALB and NLB, it is Deregistration Delay.

Functionality

* Time to complete "in-flight requests" while the instance is de-registering or unhealthy.
* Stops sending new requests to the EC2 Instance which is de-registering.
* Between 1 to 3,600 seconds (default: 300 seconds).
* Can be disabled (set value to 0).
* Set to a low value if the requests are short.

## What is an Auto Scaling Group?

In real life, the load on websites and applications can change. In the cloud, servers can be created and gotten rid of very quickly.

The goal of an Auto Scaling Group (ASG) is to ...

* Scale out (add EC2 Instances) to match an increased load.
* Scale in (remove EC2 Instances) to match a decreased load.
* Ensure we have a minimum and a maximum number of machines running.
* Automatically register new instances to a load balancer.

### ASG Attributes

* A launch configuration ... AMI + Instance Type, EC2 User Data, EBS Volumes, Security Groups, SSH Key Pair.
* Min Size, Max Size, and Initial Capacity.
* Network and Subnets Information.
* Load Balancer Information.
* Scaling Policies.

### ASG Alarms

* It is possble to scale an ASG based on CloudWatch Alarms.
* An Alarm monitors a metric (such as Average CPU).
* **Metrics are computed for the overall ASG instances**.

## Auto Scaling Custom Metric

* Auto scale based on a custom metric (example, number of connected users).

### ASG General Information

* Scaling policies can be on CPU, Network ... and can even be on custom metrics or based on a schedule.
* ASGs use Launch Configurations or Launch Templates (newer).
* To update an ASG, provide a new Launch Configuation or Launch Template.
* IAM roles attached to an ASG will get assigned to EC2 Instances.
* ASG are free. Charges are for the underlying resources being launched.
* Having instances under an ASG means that if they get terminates for whatever reason, the ASG will automatically **create new ones as a replacement**.
* ASG can terminate instances marked as unhealthy by a load balancer.

## ASG - Dynamic Scaling Policies

### Target Tracking Scaling

* Simplest to setup.
* Example: Average ASG CPU around 40%.

### Simple / Step Scaling

* When a CloudWatch Alarm is triggered (example, CPU > 70%), then add 2 units.
* When a CloudWatch Alarm is triggered (example, CPU < 30%), then remove 1 unit.

### Scheduled Actions

* Anticipate a scaling based on known usage patterns.
* Example: Increase the minimum capacity to 10 at 5pm on Fridays.

## ASG - Predictive Scaling

**Predictive Scaling**: Continuously forecast load and schedule scaling ahead of time.

## Good Metrics To Scale On

* **CPUUtilization**: Average CPU utilization across instances.
* **RequestCountPerTarget**: To make sure the number of requests per EC2 Instance is stable.
* **Average Network In/Out**: If the application is network bound.
* **Any Custom Metric**: That is pushed using CloudWatch.

## ASG - Scaling Cooldowns

* After a scaling activity occurs, there is a **cooldown period (default of 300 seconds)**.
* During the cooldown period, the ASG will not launch or terminate additional instances (to allow for metrics to stablize).
* Advice: Use a ready-to-use AMI to reduce configuration time in order to be serving requests faster and reduce the cooldown period.

## ASG - For Solutions Architects

### ASG Default Termination Policy (simplified version):

1. Find the AZ which has the most number of instances.
2. If there are multiple instances in the AZ to choose from, delete the one with the oldest launch configuration.

* **ASG tries to balance the number of instances across AZ by default**.

### ASG Lifecycle Hooks

* By default, as soon as an instance is launched in an ASG it is in service.
* Extra steps can be performed before the instance goes in service (Pending state).
* Some actions can be performed before the instance is termated (Terminating state).

### Launch Template versus Launch Configuration

Both ...

* Allow specifying ID of the Amazon Maching Image (AMI), the instance type, a key pair, security groups, and the other parameters used to lauch EC2 Instances.

Launch Configuration (legacy):

* Must be re-created every time.

Launch Template (newer):

* Can have multiple versions.
* Create parameter subsets (partial configuration for re-use and inheritance).
* Provision using both On-Demand and Spot instances (or a mix).
* Can use T2 Unlimited Burst feature.
* **Recommended by AWS going forward**.

