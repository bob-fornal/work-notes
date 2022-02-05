# Monitoring and Audit: CloudWatch, CloudTrail, and Configuration

## CloudWatch Metrics

* CloudWatch provides metrics for *every* service in AWS.
* **Metric** is a variable to monitor (`CPUUtilization`, `NetworkIn`, ...).
* Metrics belong to **namespaces**.
* **Dimension** is an attribute of a metric (instance id, environment, etc. ...).
* Up to 10 dimensions per metric.
* Metrics have **timestamps**.
* Can create CloudWatch dashboards of metrics.

## CloudWatch Custom Metrics

* It is possible to define and send custom metrics to CloudWatch.
* Example: Memory (RAM) usage, disk space, number of logged-in users, ...
* Use API call `PutMetricData`.
* Ability to use dimensions (attributes) to segment metrics.

Metric resolution (`StorageResolution` API parameter - two possible values) ...

* Standard: 1-minute (60-seconds).
* High Resolution: 1, 5, 10, 30-second(s) - higher cost.

**Important**: Accepts metric data points two weeks in the past and two hours in the future (make sure to configure the EC2 Instance time correctly).

## CloudWatch Dashboards

* Great way to set up custom dashboards for quick access to key metrics and alarms.
* **Dashboards are global**.
* **Dashboards can include graphs from different AWS accounts and regions**.
* Time zone and time range of the dashboards can be changed.
* Automatic refresh (10-second, 1-minutes, 2-minute, 5-minute, 15-minutes) can be set up.
* Dashboards can be shared with people who do not have an AWS account (public, email address, 3rd-party SSO provider through Amazon Cognito).

Pricing ...

* 3 dashboards (up to 50 metrics) for free.
* $3.00 per dashboard per month afterward.

## CloudWatch Logs

* **Log groups**: Arbitrary name, usually representing an application.
* **Log stream**: Instances within the application, log files, and containers.
* Can define log expiration policies (never expire, 30-days, etc. ...).

Can send logs to ...

* Amazon S3 (exports)
* Kinesis Data Streams
* Kinesis Data Firehose
* AWS Lambda
* ElasticSearch

### CloudWatch Logs - Sources

* SDK, CloudWatch Logs Agent, and CloudWatch United Agent.
* Elastic Beanstalk: Collection of logs from the application.
* ECS: Collection from containers.
* AWS Lambda: Collection from function logs.
* VPC Flow Logs: VPC specific logs.
* API Gateway.
* CloudTrail based on a filter.

### CloudWatch Logs Metric Filter and Insights

* CloudWatch Logs can use filter expressions.
* Metric filters can be used to trigger CloudWatch alarms.
* CloudWatch Logs Insights can be used to query logs and add queries to CloudWatch Dashboards.

### CloudWatch Logs - S3 Export

* Log data can take up to 12 hours to become available for export.
* The API call is `CreateExportTask`.
* Not near-real-time or real-time. Use Logs Subscriptions instead.

## CloudWatch Agent and CloudWatch Logs Agent

### CloudWatch Logs for EC2

* By default, no logs from the EC2 machine will go to CloudWatch.
* Need to run a CloudWatch agent on EC2 to push the log files.
* Make sure IAM permissions are correct.
* The CloudWatch Log agent can be set up on-premises too.

### CloudWatch Logs Agent and Unified Agent

For virtual servers (EC2 Instances, on-premise servers, ...).

CloudWatch Logs Agent

* Older version of the agent.
* Can only send to CloudWatch Logs.

CloudWatch Unified Agent

* Collect additional system-level metrics such as RAM, processes, etc. ...
* Collect logs to send to CloudWatch Logs.
* Centralized configuration using SSM Parameter Store.

## CloudWatch Alarms

* Alarms are used to trigger notifications for any metric.
* Various options (sampling, percent, maximum, minimum, etc. ...).

Alarm States ...

* OK
* INSUFFICIENT_DATA
* ALARM

Period ...

* Length of time in seconds to evaluate the metric.
* High-resolution custom metrics: 10-seconds, 30-seconds, or multiples for 60-seconds.

### CloudWatch Alarm Targets

* Stop, Terminate, Reboot, or Recover an EC2 Instance.
* Trigger Auto Scaling Action.
* Send notification to SNS (from which pretty much anything can be done).

### EC2 Instance Recovery

**Status Check** ...

* Instance status = check the EC2 VM.
* System status = check the underlying hardware.
* **Recovery**: Same Private, Public, Elastic IP, metadata, and placement group.

## CloudWatch Events

* Event Pattern: Intercept events from AWS services (Sources).
* Schedule or Cron (example: create an event every 4-hours).

A JSON payload is created from the event and passed to a target ...

* **Compute**: Lambda, Batch, ECS task.
* **Integration**: SQS, SNS, Kinesis Data Streams, Kinesis Data Firehose.
* **Orchestration**: Step Functions, CodePipeline, CodeBuild.
* **Maintenance**: SSM, EC2 Actions.

## Amazon EventBridge

* EventBridge is the next evolution of CloudWatchEvents.
* **Default event bus**: Generated by AWS services (CloudWatch Events).
* **Partner event bus**: Receive events from SaaS service or applications (Zendesk, DataDog, Segment, Auth0, ...).
* **Custom event buses**: For developer applications.
* Event buses can be accessed by other AWS accounts.
* **Rules**: How to process the events (similar to CloudWatchEvents).

### Amazon EventBridge Schema Registry

* EventBridge can analyze the events in a bus and infer the **schema**.
* The **Schema Registry** allows the generation of code for an application that will know in advance how data is structured in the event bus.
* Schema can be versioned.

### Amazon EventBridge versus CloudWatch Events

* Amazon EventBridge built upon and extends CloudWatch Events.
* It uses the same service API and endpoint, and the same underlying service infrastructure.
* EventBridge allows extensions to add event buses for custom applications and third-party SaaS applications.
* EventBridge has the Schema Registry capability.
* EventBridge has a different name to mark the new capabilities.
* Over time, the CloudWatch Events name will be replaced with EventBridge.

## CloudTrail Overview

* **Provides governance, compliance, and audit for an AWS Account**.
* CloudTrail is enabled by default.
* Get a history of events, API calls made within an AWS Account via Console, SDK, CLI, AWS Services.
* Can put logs from CloudTrail into CloudWatch Logs or S3.
* **A trail can be applied to All Regions (default) or a single Region**.
* If a resource is deleted in AWS, investigate CloudTrail first.

### CloudTrail Events

#### Management Events

* Operations that are performed on resources in an AWS Account.
* **By default, trails are configured to log management events**.
* Can separate **Read Events** (that do not modify resources) from **Write Events** (that may modify resources).

#### Data Events

* **By default, data events are not logged (because they are high volume operations)**.
* Amazon S3 object-level activity (example: `GetObject`, `DeleteObject`, and `PutObject`): Can separate Read and Write Events.
* AWS Lambda function execution activity (the `Invoke` API).

#### CloudTrail Insights

Enable **CloudTrail Insights to detect unusual activity** in an account ...

* Inaccurate resource provisioning.
* Hitting service limits.
* Bursts of AWS IAM actions.
* Gaps in periodic maintenance activity.

CloudTrail Insights analyzes normal management events to create a baseline and then **continuously analyzes write events to detect unusual patterns**.

* Anomalies appear in the CloudTrail console.
* Event is sent to Amazon S3.
* An EventBridge is generated (for automation needs).

### CloudTrail Events Retention

* Events are stored for 90 days in CloudTrail.
* To keep events beyond this period, log them to S3 and use Athena.

## AWS Config - Overview

* Helps with auditing and recording **compliance** of AWS resources.
* Helps record configurations and changes over time.
* Can receive alerts (SNS Notifications) for any changes.
* AWS Config is a per-region service.
* Can be aggregated across regions and accounts.
* Possibility of storing the configuration data into S3 (analyzed by Athena).

Questions that can be solved by AWS Config ...

* Is there unrestricted SSH access to security groups?
* Do buckets have any public access?
* How has ALB configuration changed over time?

### Config Rules

* Can use AWS-managed config rules (over 75).
* Can make custom config rules (must be defined in AWS Lambda).
* Rules can be evaluated and triggered for each config change and/or at regular time intervals.
* **AWS Config Rules do not prevent actions from happening (no deny)**.

### Config Resource

* View compliance of a resource over time.
* View configuration of a resource over time.
* View CloudTrail API calls of a resource over time.

### Config Rules - Remediation

* Automate remediation of non-compliant resources using SSM Automation Documents.
* Use AWS-Managed Automation Documents or create custom Automation Documents.
* Tip: Can create custom Automation Documents that invoke Lambda functions.
* Can set **Remediation Retries** if the resource is still non-compliant after auto-remediation.

### Config Rules - Notifications

* Use EventBridge to trigger notifications when AWS resources are non-compliant.
* Ability to send configuration changes and compliance state notifications to SNS (all events - use SNS Filtering or filter at client-side).

## CloudTrail versus CloudWatch versus Config

| CloudTrail | CloudWatch | Config |
|------------|------------|--------|
| Record API calls made within an Account by everyone. | Performance monitoring (metrics, CPU, network, etc.) and dashboards. | Record configuration changes. |
| Can define trails for specific resources. | Events and Alerting. | Evaluate resources against compliance rules. |
| Global Service. | Log Aggregation and Analysis. | Get a timeline of changes and compliance. |

For an Elastic Load Balancer ...

| CloudTrail | CloudWatch | Config |
|------------|------------|--------|
| Track who made any changes to the Load Balancer with API calls. | Monitor Incoming connections metric. | Track security group rules for the Load Balancer. |
| | Visualize error codes as a percent over time. | Track configuration changes for the Load Balancer.
| | Make a dashboard to get an idea of the Load Balancer performance. | Ensure an SSL certificate is always assigned to the Load Balancer (compliance).