# Solutions Architecture Overview

## Five Pillars for a Well-Architected Application

1. Costs
2. Performance
3. Reliability
4. Security
5. Operational Excellence

## Stateless Web Application

> **Scenario**: whatisthetime.com allows people to know what time it is.

* Do not need a database.
* Start small and can accept downtime.
* Want to fully scale vertically and horizontally, no downtime.

### 1. Starting Simple

* Public T2 Micro
* Elastic IP for instance

### 2. Scaling Vertically

* **Stop T2 Micro, replace, and restart as M5 Large**
* **Downtime while upgrading**
* Public M5 Large
* Elastic IP for instance

### 3. Scaling Horizontally

* **Adding M5 Instances**
* ((Adding Elastic IPs for each instance))
* Users have to be aware of IPs

### 4. (more) Scaling Horizontally

* Public M5 Large Instances
* No Elastic IP
* **Route 53: DNS Query for api.whatisthetime.com, A Record, TTL 1-hour**

### 5. Scaling Horizontally (Load Balancer)

* **Availability Zone (AZ) 1, Private EC2 Instances, M5 Large**
* **Elastic Load Balancer (ELB) + Health Checks**, Restricted security group rules
* Route 53: DNS Query, Alias Record, TTL 1-hour

### 6. Scaling Horizontally (Auto-Scaling Group)

* Availability Zone (AZ) 1, Private EC2 Instances, **ASG: M5 Large (scale in/out)**
* Elastic Load Balancer (ELB) + Health Checks, Restricted security group rules
* Route 53: DNS Query, Alias Record, TTL 1-hour

### 7. Scaling Horizontally (Multi-AZ)

* Availability Zone (AZ) **1 to 3**, Private EC2 Instances, **ASG across three AZ**: M5 Large (scale in/out)
* Elastic Load Balancer (ELB) + Health Checks, Restricted security group rules
* Route 53: DNS Query, Alias Record, TTL 1-hour

### 8. More

* Minimum of 2 AZ => Reserve Capacity (reduce cost)

## Stateful Web Application

> **Scenario**: myclothes.com allows people to buy clothes online.

* Shopping cart.
* Hundreds of simultaneous users.
* Scale, maintain horizontal scalability and keep the web application as stateless as possible.
* Users should not lose their shopping cart.
* Users should have their details (address, etc.) in a database.

### 1. Start

* AZ 1 to 3, Private EC2 Instances, ASG across three AZ.
* ELB + Health Checks, **Stickiness**
* Route 53

### 2. User Cookies

* Rather than contents of a card on EC2, **send cart contents in Web Cookies**.
* AZ 1 to 3, Private EC2 Instances, ASG across three AZ.
* ELB + Health Checks
* Route 53

Outcome

* **Stateless**, HTTP Requests are heavier.
* **Security Rist**, cookies can be altered.
* Cookies must be validated.
* Cookies must be less than 4KB total.

### 3. Server Session

* **Send session_id in Web Cookies**.
* **ElastiCache to store and retrieve session data**.
* AZ 1 to 3, Private EC2 Instances, ASG across three AZ.
* ELB + Health Checks
* Route 53

Alternative

* Amazon DynamoDB rather than ElastiCache.

### 4. User Data in a Database

* **Store and retrieve data from Amazon RDS**.
* AZ 1 to 3, Private EC2 Instances, ASG across three AZ.
* ELB + Health Checks
* Route 53

### 5. Scaling Reads

* Amazon RDS, **Master (writes), replication with RDS Read Replicas**.
* AZ 1 to 3, Private EC2 Instances, ASG across three AZ.
* ELB + Health Checks
* Route 53

Alternative

* Amazon RDS, **ElastiCache Write Through**.
* AZ 1 to 3, Private EC2 Instances, ASG across three AZ.
* ELB + Health Checks
* Route 53

### 6. Multi-AZ - Survive Disasters

* Amazon RDS **Multi-AZ**, Master (writes), replication with RDS Read Replicas.
* **ElastiCache Multi-AZ**.
* AZ 1 to 3, Private EC2 Instances, ASG across three AZ.
* **Multi-AZ** ELB + Health Checks
* Route 53

Security Groups

* Open HTTP/HTTPS to 0.0.0.0/0
* Restrict traffic to EC2 Security Group from the Load Balancer.
* Restrict traffic to ElastiCache Security Group from the EC2 Security Group.
* Restrict traffic to RDS Security Group from the EC2 Security Group.

## Stateful Web Application

> **Scenario**: mywordpress.com - create a fully scalable WordPress site.

* The site should access and correctly image picture uploads.
* User data and the blog content should be stored in a MySQL database.

### 1. RDS Layer

* Amazon RDS Multi-AZ.
* AZ 1 to 3, ASG across three AZ.
* Multi-AZ ELB
* Route 53

### 2. Scaling with Aurora: Multi-AZ and Read Replicas

* **Aurora MySQL Multi-AZ Read Replicas**.
* AZ 1 to 3, ASG across three AZ.
* Multi-AZ ELB
* Route 53

Storing Images with EBS

* **Elastic File System (EFS)** for shared storage.
* Creates Elastic Network Interface (ENI) for each AZ so that all the EC2 Instances can access the drive.

## Instantiating Applications Quickly

When launching a full-stack (EC2, EBS, RDS), it can take time to ...

* Install applications
* Insert initial (or recovery) data
* Configure everything
* Launch the application

For EC2 Instances

* **Use a Golden AMI**: Install applications, OS dependencies, etc. beforehand and launch the EC2 Instance from the Golden AMI.
* **Bootstrap using User Data**: For dynamic configuration, use User Data scripts.
* **Hybrid**: Mix of Golden AMI and User Data (Elastic Beanstalk).

For RDS Databases

* Restore from a snapshot: the database will have schemas and data ready.

For EBS Volumes

* Restore from a snapshot: the disk will already be formatted and have data.

## Elastic Beanstalk Overview

Typical Architecture: Web Application 3-Tier

#### Public Subnet

* Multi-AZ Elastic Load Balancer (ELB).

#### Private Subnet

* Multi-AZ Auto-Scaling Group (ASG).

#### Data Subnet

* ElastiCache
* Amazon RDS

### Developer Issues on AWS

* Managing infrastructure
* Deploying code
* Configuring all the databases, load balancers, etc.
* Scaling concerns

When ...

* Most web applications have the same architecture (ALB + ASG).
* All the developer wants is to run the code.
* Possibly, consistent across different applications and environments.

### Overview

Elastic Beanstalk is a developer-centric view of deploying an application on AWS.

* It uses components we have seen before: EC2, ASG, ELB, RDS, ...
* It is a Managed Service that automatically handles capacity provisioning, load balancing, scaling, application health monitoring, instance configuration, and more.
* The developer's responsibility is the application code.
* The developer still has full control over the configuration.

Components

* **Application**: Collection of Elastic Beanstalk components (environments, versions, configurations, ...).
* **Application Version**: an iteration of the application code.

Environment ...

* Collection of AWS resources running an application version (only one application version at a time).
* **Tiers**: Web Server Environment Tier and Worker Environment Tier.
* Multiple environments (dev, test, prod, ...) can be created.
