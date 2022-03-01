# Other Services

## CICD Introduction

### Continuous Integration

* Developers push code to a code repository, often (GitHub, CodeCommit, BitBucket, etc. ...).
* A testing, build server checks the code as soon as it is pushed (CodeBuild, Jenkins CI, etc. ...).

The developer gets feedback about the tests and checks that have passed or failed.

* Find and fix bugs early.
* Deliver faster as the code is tested.
* Deploy often.

### Continuous Delivery

* Ensure that the software can be released reliably, whenever needed.
* Ensures deployments happen often and are quick.
* Shift away from "one release every three months" to "5 releases a day."

This usually means automated deployment ...

* CodeDeploy
* Jenkins CD
* Spinnaker

### Technology Stack for CICD

Orchestrate: AWS CodePipeline

| Process   | AWS                   | Similar        |
|-----------|-----------------------|----------------|
| Code      | AWS CodeCommit        | GitHub         |
| Build     | AWS CodeBuild         | Jenkins CI     |
| Test      | AWS CodeBuild         | Jenkins CI     |
| Deploy    | AWS Elastic Beanstalk | AWS CodeDeploy |
| Provision | AWS Elastic Beanstalk | User-Managed EC2 Instances Fleet (CloudFormation) |

## CloudFormation Introduction

CloudFormation is a declarative way of outlining AWS Infrastructure, for any resources (most of them are supported).

* CloudFormation creates the resources specified in the template, in the **right order** with the **exact configuration** specified.

### Benefits of AWS CloudFormation

Do not need to reinvent the wheel; can leverage existing templates.

Infrastructure as Code ...

* No resources are manually created, which is excellent for control.
* The code can be version-controlled.
* Changes to the infrastructure are reviewed through code.

Cost ...

* Each resource within the stack is tagged with an identifier to easily see how much a stack costs.
* Can estimate the costs of resources using the CloudFormation template.
* Savings strategy: In development, could automate the deletion of templates at 5 PM and recreate them at 8 AM safely.

Productivity ...

* Ability to destroy and recreate an infrastructure on the fly.
* Automated generation of Diagrams for the templates.
* Declarative programming (no need to figure out ordering and orchestration).

Separation of Concerns ...

* Create many stacks for many applications with many layers.

### How Does CloudFormation Work

* Templates have to be uploaded in S3 and then referenced in CloudFormation.
* To update a template, cannot edit the previous one. Have to re-upload a new version of the template to AWS.
* Stacks are identified by a name.
* Deleting a stack deletes every single artifact that was created by CloudFormation.

### Deploying CloudFormation templates

Manual ...

* Editing templates in the CloudFormation Designer.
* Using the console to input parameters, etc. ...

Automated ...

* Editing templates in a YAML file.
* Using the AWS CLI to deploy the templates.
* Recommended way to automate the flow.

## CloudFormation Building Blocks

Template Components ...

1. **Resources**: AWS resources declared in the template (mandatory)**.
2. Parameters: The dynamic inputs for the template.
3. Mappings: The static variables for the template.
4. Outputs: References to what has been created.
5. Conditionals: List of conditions to perform resource creation.
6. Metadata.

Template Helpers ...

1. References
2. Functions

### CloudFormation - StackSets

* Create, update, and delete stacks across **multiple accounts and regions** with a single operation.
* Administrator account is needed to create StackSets.
* Trusted accounts used to create, update, and delete stack instances from StackSets.
* When a stack set is updated, *all* associated stack instances are updated throughout all accounts and regions.

## AWS Step Functions and SWF

### AWS Step Functions

* Build serverless visual workflow to orchestrate Lambda functions.
* Represent the flow as a JSON **state machine**.
* Features sequence, parallel, conditions, timeouts, error-handling, ...
* Can also integrate with EC2, ECS, on-premise servers, API Gateway.
* Maximum execution time of one year.
* It is possible to implement a human approval feature.
* Use cases: Order fulfillment, data processing, web applications, ...

### AWS Simple Workflow Service (SWF)

* Coordinate work amongst applications.
* Code runs on EC2 (not serverless).
* One year maximum run time.
* Concept of "activity step" and "decision step."
* Has built-in "human intervention" step.

**Step Functions are recommended to be used with new applications**, except if there is a need ...

* For external signals to intervene in the process.
* For child processes that return values to parent processes.

## EMR

EMR = Elastic MapReduce.

* EMR helps create **Hadoop clusters (Big Data)** to analyze and process vast amounts of data.
* The clusters can be made of hundreds of EC2 Instances.
* Also supports Apache Spark, HBase, Presto, Flink, ...
* EMR takes care of all the provisioning and configuration.
* Auto-scaling and integration with Spot instances.
* Use cases: data processing, machine learning, web indexing, big data, ...

## OpsWorks

* Chef and Puppet help to perform server configuration automatically, or handle repetitive actions.
* Work great with EC2 and on-premise VM.
* AWS OpsWorks = Managed Chef and Puppet.
* It is an alternative to AWS SSM.

### Chef and Puppet

* They help with managing configuration as code.
* Helps for having consistent deployments.
* Works with Linux and Windows.
* Can automate user accounts, cron, ntp, packages, services, ...
* The leverage "Recipes" or "Manifests."
* Chef and Puppet have similarities with SSM, Beanstalk, and CloudFormation but they are open-source tools that work cross-cloud.

## AWS Workspaces

**Managed, Secure Cloud Desktop**.

* **Great to eliminate management of on-premise VDI (Virtual Desktop Infrastructure)**.
* On-Demand, pay per usage.
* Secure, Encrypted, Network Isolation.
* Integrated with Microsoft Active Directory.

## AppSync

Store and synchronize data across mobile and web applications in real-time.

* **Makes use of GraphQL (mobile technology from Facebook)**.
* Client Code can be generated automatically.
* Integrations with DynamoDB and Lambda.
* Real-time subscriptions.
* Offline data synchronization (replaces Cognito Sync).
* Fine-grained security.

## Cost Explorer

Allows visualization, understanding, and management of AWS costs and usage over time.

* Create custom reports that analyze cost and usage data.
* Analyze data at a high level, total costs, and usage across all accounts.
* Monthly, hourly, resource level granularity.
* Choose an optimal **Savings Plan** (to lower prices on the bill).
* **Forecast usage up to 12 months based on previous usage**.

## Other Services Cheatsheet

| Service | Notes |
|---------|-------|
| **CodeCommit** | Service where code can be stored. A similar service is GitHub |
| **CodeBuild** | Build and testing service in the CICD pipelines. |
| **CodeDeploy** | Deploy the packaged code onto EC2 and AWS Lambda. |
| **CodePipeline** | Orchestrate the actions of CICD pipelines (build stages, manual approvals, many deploys, etc). |
| **CloudFormation** | Infrastructure as Code for AWS. Declarative way to manage, create and update resources. |
| **ECS (Elastic Container Service)** | Docker container management system on AWS. Helps with creating micro-services. |
| **ECR (Elastic Container Registry)** | Docker images repository on AWS. Docker Images can be pushed and pulled from there. |
| **Step Functions** | Orchestrate and Coordinate Lambda functions and ECS containers into a workflow. |
| **SWF (Simple Workflow Service)** | Old way of orchestrating a big workflow. |
| **EMR (Elastic Map Reduce)** | Big Data, Hadoop, and Spark clusters on AWS, deployed on EC2. |
| **Glue** | ETL (Extract Transform Load) service on AWS. |
| **OpsWorks** | Managed Chef & Puppet on AWS. |
| **ElasticTranscoder** | Managed media (video, music) converter service into various optimized formats. |
| **Organizations** | Hierarchy and centralized management of multiple AWS accounts. |
| **Workspaces** | Virtual Desktop on Demand in the Cloud. Replaces traditional on-premise VDI infrastructure. |
| **AppSync** | GraphQL as a service on AWS. |
| **SSO (Single Sign-On)** | One login managed by AWS to log in to various business SAML 2.0-compatible applications (office 365 etc). |
