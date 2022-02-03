# AWS SDK, IAM Roles and Policies

## Access Policies

[AWS Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html) versus inline Visual Editor.

### AmazonS3FullAccess

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}
```

### AmazonS3ReadOnlyAccess

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": "*"
    }
  ]
}
```

## AWS Policy Simulator

With the IAM policy simulator, can test and troubleshoot identity-based policies, IAM permissions boundaries, Organization service control policies (SCPs), and resource-based policies.

Here are some common things you can do with the policy simulator:

* Test policies that are attached to IAM users, user groups, or roles in your AWS account.
* Test and troubleshoot the effect of permissions boundaries on IAM entities.
* Test policies that are attached to AWS resources, such as Amazon S3 buckets, Amazon SQS queues, Amazon SNS topics, or Amazon S3 Glacier vaults.
* If your AWS account is a member of an organization in AWS Organizations, then you can test the impact of service control policies (SCPs) on your IAM policies and resource policies.
* Test new policies that are not yet attached to a user, user group, or role by typing or copying them into the simulator. These are used only in the simulation and are not saved.
* Test the policies with selected services, actions, and resources.
* Simulate real-world scenarios by providing context keys, such as an IP address or date, that are included in Condition elements in the policies being tested.
* Identify which specific statement in a policy results in allowing or denying access to a particular resource or action.

## AWS EC2 Instance Metadata

Allows an AWS EC2 Instance to "learn about themselves" **without using an IAM Role for that purpose**.

* The URL is `http://169.254.169.254/latest/meta-data`.
* Retrieve the IAM Role name from the metadata, CAN NOT retrieve the IAM Policy.
* Metadata = Information about the EC2 Instance.
* Userdata = Launch script of the EC2 Instance.

## AWS SDK Overview

To perform actions on AWS directly from application code, use an SDK (Software Development Kit).

* Used the AWS SDK when coding against AWS Services such as DynamoDB.
* Good to know: If a default region is not specified or configured, then `us-east-1` will be chosen by default.
