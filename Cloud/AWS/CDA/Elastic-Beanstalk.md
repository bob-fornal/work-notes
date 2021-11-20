# Elastic Beanstalk

Elastic Beanstalk is a developer-centric view of deploying application on AWS.

A managed service

* Instance configuration
* OS is handled by Beanstalk
* Deployment strategy is configurableut performed by Beanstalk
* Application code configurable

It will leverage all the AWS components that we have gone over thus far:

* EC2
* ASG
* ELB
* RDS
* Etc..

Elastic Beanstalk is free but you pay for the underlying instances

## Three architecture models:

* Single instance deployment: good for developers
* LB + ASG: great for production or staging web applications
* ASG only: great for non-web apps in production

## Elastic Beanstalk has three components:

* Application
* Application Version (Each deployment gets assigned a version)
* Environment name (dev, staging, prod): free naming

You deploy application versions to environments and can promote application versions to the next environment

* Rollback feature to previous application versions
* Full control over the lifecycle of environments

## Options for Updating

* All-at-Once: fastest with down time.
* Rolling: bucket, then next when healthy.
* Rolling with Additional Batches: spins up new instances to move bucket.
* Immutable: new instances, deploy to new, swap when healthy.

Blue/Green

* Not a direct feature of Elastic Beanstalk.
* Zero down time and release facility.
* Create new STAGE environment and deploy V2 there.
* Validated, possible rollback.
* Route 53, weighted policies to pass traffic to STAGE.
* Swap URLs when done testing.

## Traffic Splitting

Canary Testing

* New version to temporary ASG with same capacity.
* A percentage of the traffic goes to the new ASG for a configurable amount of time.
* Deployment health is monitored. FAILURE triggers an automated rollback.

## Elastic Beanstalk CLI

`eb`

* `create`
* `status`
* `health`
* `events`
* `logs`
* `open`
* `deploy`
* `config`
* `terminate`

## Elastic Beanstalk Lifecycle Policy

* 1,000 applications versions, maximum.
* Lifecycle Policy (time or space).
* Current is not deleted.

## Elastic Beanstalk Extensions

`.ebextensions/` (root of source code)

* YAML or JSON format (.config files)

## Elastic Beanstalk and CloudFormation

* EB relies on CloudFormation to provision other AWS services.

## Elastic Beanstalk Cloning

* With exact same configuration.
* Settings can be changed after cloning occurs.

## Elastic Beanstalk Migrations

After creating an EB environment, the developer cannot change the ELB type (only the configuration).

Migration:

1. Create new environment with the same configuration (cannot clone), change the Load Balancer.
2. Deply
3. CNAME Swap or Route 53 Update.

## Support for many platforms:

* Go
* Java
* Python
* Node.js
* Ruby
* Single Container Docker
* Multi Container Docker
* Preconfigure Docker
* Write your own custom platforms (If the any of the above is not supported)

