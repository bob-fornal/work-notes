# Containers on AWS: ECS, Fargate, ECR, and EKS

## What is Docker?

* Docker is a software development platform to deploy applications.
* Applications are packaged in **containers** that can be run on any Operating System (OS).

Applications run the same, regardless of where they are run ...

* Any machine.
* No compatibility issues.
* Predictable behavior.
* Less work.
* Easier to maintain and deploy.
* Works with any language, any OS, and any technology.

### Where are Docker Images Stored?

Docker images are stored in Docker Repositories.

Docker Hub (https://hub.docker.com/): Find base images for many technologies or OS ... Ubuntu, MySQL, NodeJS, Java, ...

* Private: Amazon ECR (Elastic Container Registry).
* Public: Amazon ECR Public.

### Docker versus Virtual Machines

* Docker is "sort of" a virtualization technology, but not exactly.
* Resources are shared with the host => many containers on one server.

### Docker Container Management

Need a container management platform to manage containers.

Three choices ...

* ECS: Amazon's container platform.
* Fargate: Amazon's Serverless container platform.
* EKS: Amazon's managed Kubernetes (open source).

## ECS Overview

ECS = Elastic Container Service

* Launch Docker containers on AWS.
* **Must provision and maintain the infrastructure (the EC2 Instances)**.
* AWS takes care of starting and stopping the containers.
* Has integration with the Application Load Balancer.

### Fargate

* Launch Docker containers on AWS.
* **Do not provision the infrastructure (no EC2 Instances to manage) - simpler**.
* **Serverless offering**.
* AWS just runs containers based on the CPU and RAM needed.

### IAM Roles for ECS Tasks

#### EC2 Instance Profile

* Used by the *ECS agent*.
* Makes API calls to the ECS service.
* Send container logs to CloudWatch Logs.
* Pull Docker image from ECR.
* Reference sensitive data in Secrets Manager or SSM Parameter Store.

#### ECS Task Role

* Allow each task to have a specific role.
* Use different roles for the different ECS Services being run.
* Task Role is defined in the *task definition*.

### ECS Data Volumes = EFS File System

* Works for both EC2 Tasks and Fargate Tasks.
* Ability to mount EFS volumes onto tasks.
* Tasks launched in any Availability Zone (AZ) will be able to share the same data in the EFS volume.
* Fargate and EFS = serverless and data storage without managing servers.
* **Use-case**: Persistent multi-AZ shared storage for containers.

## ECS Services and Tasks

* ECS Tasks can be invoked by an Event Bridge.

### Load Balancing for EC2 Launch Type

* A **dynamic port** can be mapped.
* The ALB supports finding the correct port on the EC2 Instances.
* **Any port from the ALB Security Group must be allowed on the EC2 Instance's Security Group**.

### Load Balancing for Fargate

* Each task has a **unique IP**.
* **The task port** from the ALB Security Group must be allowed on the ENI's Security Group.

## ECS Scaling

* CloudWatch Metric (**ECS Service CPU Usage**) triggers CloudWatch Alarm for scaling.
* CloudWatch Metric (Queue Length) triggers CloudWatch Alarm for scaling.

## ECS Rolling Updates

* When updating from v1 to v2, can control how many tasks can be started, stopped, and in which order.

## ECR Overview

ECR = Elastic Container Registry

* Store, manage, and deploy containers on AWS, pay for use.
* Fully integrated with ECS and IAM for security, backed by Amazon S3.
* Supports image vulnerability scanning, version, tag, and image lifecycle.

## EKS Overview

EKS = Elastic **Kubernetes** Service.

* It is a way to launch **managed Kubernetes clusters on AWS**.
* Kubernetes is an open-source system for automatic deployment, scaling, and management of containerized (usually Docker) applications.
* It is an alternative to ECS, with a similar goal but a different API.
* EKS supports **EC2** to deploy worker nodes or **Fargate** to deploy serverless containers.
* **Use-case**: Already using Kubernetes on-premises or in another cloud, and wants to migrate to AWS using Kubernetes.
* **Kubernetes is cloud-agnostic** (can be used on any cloud service - Azure, GCP, ...).
