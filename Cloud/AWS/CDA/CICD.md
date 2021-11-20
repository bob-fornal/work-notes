# CI/CD

## Continuous Integration / Continuous Deployment

### Why use CICD?

* Ideally, you'd want to set up a CICD to help you automate multiple steps to automate builds, push code to a repository and then deploy to your updated code to AWS.
* This is a faster, efficient way that also helps minimize potential mistakes as opposed to running multiple manual steps
* Automate deployement to different stages (dev, staging, and production)
* May add manual approvals when needed
* To be a proper AWS developer, you'd need to learn CICD

### CICD Services in AWS

* AWS CodeCommit: storing our code (similar to Github)
* AWS CodePipeline: automatig our pipeline from code to ElasticBeanstalk
* AWS CodeBuild: To build and test code
* AWS CodeDeploy: deploying code to EC2 fleets (not Beanstalk)

### Continuous Integration

* Developers push code to a repository (Github, Bitbucket, CodeCommit, etc)
* A testing or build server checks the code as soon as it's pushed to the repository (CodeBuild, Jenkins CI, etc)
* The developer gets feedback about the tests and checks that have passed or failed

### Benefits of Continuous Integration

* Find bugs and fix it early on
* Deliver fast as soon as the code is tested
* Deploy frequently
* Unblocked developers are happy

### Benefits of Continuous Delivery

* Ensure that the software can be released reliably whenever needed
* Ensures deployment happen often and quick
* Ability to shift away from "one release every 3 months" to "5 releases a day"
* Automated deployments

Orchestration == CICD

## CodeCommit

* Version controlled - various changes to code over time.
* Central online respository.

### Repository

* Private Git repository
* No size limit
* Fully managed, highly available.

### Additional

* Interactions done via Git

Authentication:

* SSH Keys: in IAM Console
* HTTPS: AWS CLI Authentication or Generating HTTPS credentials (can use MFA)

Authorization

* IAM Policies manage user / roles rights to repository.

Encryption

* At-rest using KMS

Cross-Account Access

* Use IAM Role in AWS Account and use AWS STS (with AssumeRole API).

### CodeCommit Notifications

Trigger notifications in CodeCommit using **AWS SNS**, **AWS Lambda**, or **AWS CloudWatch Event Rules**.

AWS SNS and AWS Lambda

* Deletion of branches
* Pushes to master
* Notify external build system
* AWS Lambda to perform codebase analysis

AWS CloudWatch Event Rules

* Trigger for pull request updates (created, updated, deleted, commented).
* Comment on top of commit.

## CodePipeline

Visual tool to perform Continuous Delivery

* Source
* Build
* Test
* Deploy

### Stages

* Each stage can have sequential or parallel actions.
* Manual approval can be defined at any stage.
* Each pipeline stage can create "artifacts" stored in S3 and passed on to the next stage.

### Troubleshooting

* State change AWS CloudWatch Events, which can create SNS Notifications.
* Fails a Stage, stops and information passed on to Console.
* AWS CloudTrail can audit AWS API calls.
* If it cannot perform an action, check IAM Service Role attached.

## CodeBuild

* Fully managed build service.
* Continuous scaling.
* Leverages Docker under-the-hood for reproducible results.
* Build instructions can be defined in-code (`buildspec.yml`).

### `buildspec.yml`

* Plain-text variables
* Secure Secrets: use SSM Parameter Store.

### Phases

Specify commands to run.

* Install: dependencies needed for build.
* Pre-build: final commands to execute before the build.
* Build: actual build command.
* Post-build

Artifacts are uploaded to S3.

Cache - ususally dependencies to S3 to speed up future builds.

### VPC

By default, CodeBuild is launched outside of the VPC and cannot access resources in a VPC.

* A VPC configuration can be specified.

## CodeDeploy

* Deploy an application automatically to EC2 Instances.
* These instances are NOT managed by EB.
* Managed service.
* Each EC2 machines MUST be running the CodeDeploy Agent (it polls for work).
* Does not provision resources.

### CodeDeploy for EC2 and ASG

**In-Place**: same; instances added to ASG will get automatic deployments.
**Blue/Green**: new ASG is created.

* Choose how long to keep the old instances
* Must be using ELB.

## CodeStar

Integrated solution that brings together GitHub, CodeCommit, CodeBuild, CodeDeploy, CloudFormation, CodePipeline, and CloudWatch.
