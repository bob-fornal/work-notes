# ECS: Elastic Container Software

## Docker

* Docker is a software development platform to deploy apps
* Apps are packaged in containers that can be run on any OS
* Apps run the same, regardless of where they’re run
* Any machine
* No compatibility issues
* Predictable behavior
* Less work
* Easier to maintain and deploy
* Works with any language, any OS, any technology

## Docker Containers Management

* To manage containers, we need a container management platform

Three choices:

1. ECS: Amazon’s own platform
2. Fargate: Amazon’s own Serverless platform
3. EKS: Amazon’s managed Kubernetes (open source)

## ECS Clusters

* ECS Clusters are logical grouping of EC2 instances
* EC2 instances run the ECS agent (Docker container)
* The ECS agents registers the instance to the ECS cluster
* The EC2 instances run a special AMI, made specifically for ECS

## ECS Task Definitions

Tasks definitions are metadata in JSON form to tell ECS how to run a Docker Container

It contains crucial information around:

* Image Name
* Port Binding for Container and Host
* Memory and CPU required
* Environment variables
* Networking information
* IAM Role
* Logging configuration (ex CloudWatch)

## ECR: Docker Container Registry

So far we’ve been using Docker images from Docker Hub (public)

* ECR is a private Docker image repository
* Access is controlled through IAM (permission errors => policy)
* AWS CLI v1 login command (may be asked at the exam)

> `$(aws ecr get-login --no-include-email --region eu-west-1)`

* AWS CLI v2 login command (newer, may also be asked at the exam - pipe)

> `aws ecr get-login-password --region eu-west-1 | docker login --username AWS -- password-stdin 1234567890.dkr.ecr.eu-west-1.amazonaws.com`

* Docker Push & Pull:

> `docker push 1234567890.dkr.ecr.eu-west-1.amazonaws.com/demo:latest`

> `docker pull 1234567890.dkr.ecr.eu-west-1.amazonaws.com/demo:latest`

## Fargate

* When launching an ECS Cluster, we have to create our EC2 instances
* If we need to scale, we need to add EC2 instances
* So we manage infrastructure…
* With Fargate, it’s all Serverless!
* We don’t provision EC2 instances
* We just create task definitions, and AWS will run our containers for us
* To scale, just increase the task number. Simple! No more EC2

## ECS Task Placement Process

Task placement strategies are a best effort

When Amazon ECS places tasks, it uses the following process to select container instances:

* Identify the instances that satisfy the CPU, memory, and port requirements in the task definition.
* Identify the instances that satisfy the task placement constraints.
* Identify the instances that satisfy the task placement strategies.
* Select the instances for task placement.

## ECS Task Placement Strategies

### Binpack

* Place tasks based on the least available amount of CPU or memory
* This minimizes the number of instances in use (cost savings)

### Random

* Place the task randomly

### Spread

* Place the task evenly based on the specified value
* Example: instanceId, attribute:ecs.availability-zone

## ECS – Service Auto Scaling

* CPU and RAM is tracked in CloudWatch at the ECS service level
* Target Tracking: target a specific average CloudWatch metric
* Step Scaling: scale based on CloudWatch alarms
* Scheduled Scaling: based on predictable changes
* ECS Service Scaling (task level) ≠ EC2 Auto Scaling (instance level)
* Fargate Auto Scaling is much easier to setup (because serverless)
