# Whitepapers and Architectures

## Well-Architected Framework

### Guiding Principles

* Stop guessing capacity needs.
* Test systems at production scale.
* Automate to make architectural experimentation easier.
* Allow for evolutionary architectures; design based on changing requirements.
* Drive architectures using data.
* Improve through game days; simulate applications for flash sale days.

### Five Pillars

**They are not something to balance or trade-off, they are a synergy**.

1. Operational Excellence
2. Security
3. Reliability
4. Performance Efficiency
5. Cost Optimization

* It is also about **questions**.
* Look into the [Well-Architected Tool](https://console.aws.amazon.com/wellarchitected).

## PILLAR 1: Operational Excellence

Includes the ability to run and monitor systems to deliver business value and to continually improve supporting processes and procedures.

Design Principles ...

* **Perform operations as code** - Infrastructure as code.
* **Annotate documentation** - Automate the creation of annotated documentation after every build.
* **Make frequent, small, reversible changes** - So that, in case of any failure, the changeset can be reversed.
* **Refine operations procedures frequently** - And ensure that team members are familiar with it.
* **Anticipate failure** - Learn from all operational failures.

## PILLAR 2: Security

Includes the ability to protect information systems and assets while delivering business value through risk assessments and mitigation strategies.

Design Principles ...

* **Implement a strong identity foundation** - Centralize privilege management and reduce (or even eliminate) reliance on long-term credentials - Principle of least privilege - IAM.
* **Enable traceability** - Integrate logs and metrics with systems to automatically respond and take action.
* **Apply security at all layers** - Like edge network, VPC, subnet, load balancer, every instance, operating system, and application.
* **Automate security best practices**.
* **Protect data in-transit and at-rest** - Encryption, tokenization, and access control.
* **Keep people away from the data** - Reduce or eliminate the need for direct access or manual processing of data.
* **Prepare for security events** - Run incident response simulations and use tools with automation to increase speed for detection, investigation, and recovery.

## PILLAR 3: Reliability

The ability of a system to recover from infrastructure or service disruptions, dynamically acquire computing resources to meet demand, and mitigate disruptions such as misconfigurations or transient network issues.

Design Principles ...

* **Test recovery procedures** - Use automation to simulate different failures or to recreate scenarios that led to failures before.
* **Automatically recover from failure** - Anticipate and remediate failures before they occur.
* **Scale horizontally to increase aggregate system availability** - Distribute requests across multiple, smaller resources to ensure that they do not share a common point-of-failure.
* **Stop guessing capacity** - Maintain the optimal level to satisfy demand without over or under-provisioning - use Auto Scaling.
* **Manage change in automation** - Use automation to make changes to infrastructure.

## PILLAR 4: Performance Efficiency

Includes the ability to use computing resources efficiently to meet system requirements, and to maintain that efficiency as demand changes and technologies evolve.

Design Principles ...

* **Democratize advanced technologies** - Advanced technologies become services and can allow for more focus on product development.
* **Go global in minutes** - Easy deployment in multiple regions.
* **Use serverless architectures** - Avoid the burden of managing servers.
* **Experiment more often** - Easy to carry out comparative testing.
* **Mechanical sympathy** - Be aware of all AWS services.

## PILLAR 5: Cost Optimization

Includes the ability to run systems to deliver business value at the lowest price point.

Design Principles ...

* **Adopt a consumption mode** - Pay only for what you use.
* **Measure overall efficiency** - Use CloudWatch.
* **Stop spending money on data center operations** - AWS does the infrastructure part and enables customers to focus on organization projects.
* **Analyze and attribute expenditures** - Accurate identification of system usage and costs, help measure return on investment (ROI) - make sure to use tags.
* **Use managed and application-level services to reduce the cost of ownership** - As managed services operate at cloud scale, they can offer a lower cost per transaction or service.

## AWS Trusted Advisor

* No need to install anything; it's a high-level AWS account assessment.
* **Analyze AWS accounts and provide recommendations** in the Five Pillars.
* Core Checks and recommendations - available for all customers.
* Can enable weekly email notification from the console.

Full Trusted Advisor - Available for **Business and Enterprise** support plans.

* Ability to set CloudWatch alarms when reaching limits.
* **Programmatic Access using AWS Support API**.
