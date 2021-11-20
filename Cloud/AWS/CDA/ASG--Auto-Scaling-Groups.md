# ASG: Auto Scaling Group

In real-life, the load of websites and applications will change. Servers can be created and removed very quickly.

The goal of an Auto Scaling Group (ASG) is to:

* Scale out (add EC2 Instances) to match an increased load.
* Scale in (remove EC2 Instances) to match a decreased load.
* Ensure a minimum and maximum number of machines running.
* Automatically register new instances to a load balancer.

## ASGs have the following attributes

A launch configuration

* AMI + Instance Type
* EC2 User Data
* EBS Volumes
* Security Groups
* SSH Key Pair

With

* Min Size / Max Size / Initial Capacity
* Network + Subnets Information
* Load Balancer Information
* Scaling Policies

## Auto Scaling Alarms

* It is possible to scale an ASG based on CloudWatch alarms
* An alarm monitors a metric (such as Average CPU)
* Metrics are computed for the overall ASG instances

Based on the alarm:

* Create a scale-out policies (increase the number of instances)
* Create a scale-in policies (decrease the number of instances)

## Auto Scaling Policies

### Dynamic Scaling

* Target Tracking Scaling (simple)
* Simple / Step Scaling (define Alarms and Steps)

### Predictive Scaling

** Forcasted load / Schedule scaling before changes.

### Scheduled Actions

## Scaling Cooldowns

** Default: 300-seconds
* ASG will not scale instance during the period.

## New Auto Scaling Rules

It is now possible to define “better” auto scaling rules that are directly managed by EC2

* Target Average CPU Usage
* Number of requests on the ELB per instance
* Average Network In
* Average Network Out

These rules are easier to set up and can make more sense

## Auto Scaling Custom Metric

Auto scale based on a custom metric (ex: number of connected users)

1. Send custom metrics from an application on EC2 to CloudWatch (PutMetric API)
2. Create a CloudWatch alarm to react to low / high values
3. Use the CloudWatch Alarm as the scaling policy for ASG

## ASG Summary

* Scaling policies can be on CPU, Network ... and can even be on custom metrics or based on a schedule (if visitors patterns are known).
* ASGs use Launch configurations and update an ASG by providing a new launch configuration.
* IAM roles attached to an ASG will get assigned to EC2 instances.
* ASG are free. Pay for the underlying resources being launched.
* Having instances under an ASG means that if they get terminated for whatever reason, the ASG will restart them. Extra safety.
* ASG can terminate instances marked as unhealthy by an LB (and hence replace them).
