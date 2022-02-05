# AWS Security and Encryption: KMS, SSM Parameter Store, CloudHSM, Shield, WAG

## Encryption 101

### Encryption In-Flight (SSL)

* Data is encrypted before sending and decrypted after receiving.
* SSL certificates help with encryption (HTTPS).
* Encryption in-flight ensures no Man-In-The-Middle Attack (MITM) can occur.

### Server-Side Encryption At-Rest

* Data is encrypted after being received by the server.
* Data is decrypted before being sent.
* It is stored in an encrypted form thanks to a key (usually a data key).
* The encryption and decryption keys must be managed somewhere and the server must have access to them.

### Client-Side Encryption

* Data is encrypted by the client and never decrypted by the server.
* Data will be decrypted by a receiving client.
* The server should not be able to decrypt the data.
* Could leverage Envelope Encryption.

## KMS Overview

KMS = Key Management Service

* Anytime "encryption" is mentioned for an AWS service, it is most likely KMS.
* Easy way to control access to data, AWS manages the keys.
* Fully integrated with IAM for authorization.
* Can also use the SLI and SDK.

Seamlessly integrated into ...

* Amazon EBS: Encrypt volumes.
* Amazon S3: Server-side encryption of objects.
* Amazon Redshift: Encryption of data.
* Amazon RDS: Encryption of data.
* Amazon SSM: Parameter store.
* More ...

### KMS - Customer Master Key (CMK) Types

#### Symmetric (AES-256 keys)

* First offering of KMS, a single encryption key that is used to Encrypt and Decrypt.
* AWS services that are integrated with KMS use Symmetric CMKs.
* Necessary for envelope encryption.
* Never get access to the Key unencrypted (must call KMS API to use).

#### Asymmetric (RSA and ECC key pairs)

* Public (Encrypt) and Private Key (Decrypt) pair.
* Used for Encrypt/Decrypt, or Sign/Verify operations.
* The Public Key is downloadable, but can not access the Private Key unencrypted.
* **Use-case**: Encryption outside of AWS by users who cannot call the KMS API.

### AWS KMS (Key Management Service)

* Able to fully manage the keys and policies: Create, Rotation policies, Disable, Enable.
* Able to audit key usage (using CloudTrail).
* Pay for API calls to KMS ($0.03 per 10,000 calls).

Three types of Customer Master Keys (CMK) ...

* AWS Managed Service Default CMK: Free.
* User Keys created in KMS: $1.00 per month.
* User Keys imported (must be 256-bit symmetric key): $1.00 per month.

### AWS KMS 101

* Anytime you need to share sensitive information ... use KMS: Database passwords, credentials to external service, Private Key of SSL certificates.
* The value of KMS is that the CMK used to encrypt data can never be retrieved by the user and the CMK can be rotated for extra security.
* **Never store secrets in plaintext, especially in code**.
* Encrypted secrets can be stored in the code and environment variables.
* **KMS can only help in encrypting up to 4KB of data per call**.
* If data is greater than 4KB, use envelope encryption.

To give someone access to KMS ...

* Make sure the Key Policy allows the user.
* Make sure the IAM Policy allows the API calls.

### KMS Key Policies

* Control access to KMS keys "similar" to S3 bucket policies.
* The difference is that developers cannot control access without them.

Default KMS Key Policy ...

* Created if a specific KMS Key Policy is not provided.
* Complete access to the key to the root user = entire AWS account.
* Gives access to the IAM policies to the KMS key.

Custom KMS Key Policy ...

* Define users and roles that can access the KMS key.
* Define who can administer the key.
* Useful for cross-account access to the KMS key.

### Copying Snapshots across accounts

```json
{
  "Sid": "Allow use of the key with destination account",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::TARGET-ACCOUNT-ID:role/ROLENAME"
  },
  "Action": [
    "kms:Decrypt",
    "kms:GreateGrant"
  ],
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "kms:ViaService": "sc2.REGION.amazonaws.com",
      "kms:CallerAccount": "TARGET-ACCOUNT-ID"
    }
  }
}
```

1. Create a Snapshot, encrypted with CMK.
2. **Attach a KMS Key Policy to authorize cross-account access**.
3. Share the encrypted snapshot.
4. (in target) Create a copy of the Snapshot, encrypt it with a KMS Key in the target account.
5. Create a volume from the Snapshot.

## KMS Key Rotation

### KMS Automatic Key Rotation

* **For Customer-managed CMK** (not AWS managed CMK).
* If enabled, automatic key rotation happens **every one year**.
* Previous key is kept active to allow decryption of old data.
* New key has the same CMK ID (only the backing key is changed).

### KMS Manual Key Rotation

* **When there is a need to rotate the key every 90 days, 180 days, etc.** ...
* New key has a different CMK ID.
* Keep the previous key active to decrypt old data.
* Better to use aliases in this case (to hide the change of key for the application).
* Good solution is to rotate CMK that are not eligible for automatic rotation (like asymmetric CMK).

## SSM Paramter Store Overview

* Secure storage for configuration and secrets.
* Optional Seamless Encryption using KMS.
* Serverless, scalable, durable, easy SDK.
* Version tracking of configuration and secrets.
* Configuration management using path and IAM.
* Notifications with CloudWatch Events.
* Integration with CloudFormation.

### Parameter Policies (for advanced parameters)

* Allow the assignment of a TTL to a parameter (expiration date) to force updating or deleting of sensitive data such as passwords.
* Can assign multiple policies at a time.

## AWS Secrets Manager Overview

* Newer service, meant for storing secrets.
* Capability to force **rotation of secrets** every X days.
* Automate generation of secrests on rotation (uses Lambda).
* Integration with **Amazon RDS** (MySQL, PostgreSQL, Aurora).
* Secrets are encrypted using KMS.
* Mostly meant for RDS integration.

## CloudHSM

* With KMS, AWS manages the software for encryption.
* With CloudHSM, AWS provisions encryption **hardware**.
* Dedicated Hardware (HSM = Hardware Security Module).
* Encryption keys are entirely managed by developers (not AWS).
* HSM device is tamper resistant, FIPS 140-2 Level 3 compliance.
* Supports both symmetric and asymmetric encryption (SSL/TLS keys).
* No free tier available.
* Must use the CloudHSM Client Software.
* Redshift supports CloudHSM for database encryption and key management.
* **Good option to use with SSE-C encryption**.

### CloudHSM - High Availability

* CloudHSM clusters are spread across Multi-AZ (high availability).
* Great for availability and durability.

## Shield - DDoS Protection

### AWS Shield Standard

* Free service that is activated for every AWS customer.
* Provides protection from attacks such as SYN/UDP Floods, Reflection attacks, and other layer 3 and layer 4 attacks.

### AWS Shield Advanced

* Optional DDoS mitigation service ($3,000 per month per organization).
* Protects against more sophisticated attach on Amazon EC2, Elastic Load Balancing (ELB), Amazon CloudFront, AWS Global Accelerator, and Route 53.
* 24/7 access to AWS DDoS response team (DRP).
* Protection against higher fees during usage spikes due to DDoS.

## Web Application Firewall (WAF)

Protects web applications from common web exploits (Layer 7).

* **Layer 7 is HTTP** (versus Layer 4 is TCP).
* Deploy on **Application Load Balancer**, **API Gateway**, and **CloudFront**.

Define Web ACL (Web Access Control List) ...

* Rules can include **IP Addresses**, HTTP headers, HTTP body, or URI strings.
* Protects from common attacks - **SQL injection** and **Cross-Site Scripting (XSS)**.
* Size constraints, **geo-matched (block countries).
* **Rate-based rules** *to count occurences of events) - **for DDoS protection**.

### AWS Firewall Manager

* Mnage rules in all accounts of an AWS Organization.

Common set of security rules ...

* WAF rules (Application Load Balancer, API Gateway, CloudFront).
* AWS Shield Advanced (ALB, CLB, Elastic IP, CloudFront).
* Security Groups for EC2 and ENI resources in VPC.

## GuardDuty

Intelligent threat discovery to protect AWS Accounts.

* Uses Machine Learning algorithms, anomaly detection, 3rd-party data.
* One-click to enable (30 days trial), no need to install software.
* Can setup **CloudWatch Event rules** to be notified in case of findings.
* CloudWatch Event rules can target AWS Lambda or SNS.
* **Can protect against CryptoCurrency attacks (has a dedicated "finding" for it)**.

Input data includes ...

* CloudTrail Logs: Unusual API calls, unauthorized deployments.
* VPC Flow Logs: Unusual internal traffic, unusual IP addresses.
* DNS Logs: Compromised EC2 Instances sending encoded data within DNS queries.

## Amazon Inspector

* **Automated Security Assessments** for EC2 Instances.
* Analyze the **running OS** against **known vulnerabilities.
* Analyze against **unintended network accessibility**.
* AWS Inspector Agent must be installed on OS in EC2 Instances.
* After the assessment, a report is generated with a list of vulnerabilities.
* Possibility to send notifications to SNS.

What does the AWS Inspector evaluate?

* **Remember that this is only for EC2 Instances**.

For Network assessments: (agentless), Network Reachability.

For Host assessments: (with agent) ...

* Common Vulnerabilities and Exposures.
* Center for Internet Security (CIS) Benchmarks.
* Security Best Practices.

## Macie

Amazon Macie is a fully managed data security and data privay service that uses **machine learning and pattern matching to discover and protect your sensitive data in AWS S3 buckets**.
* Macie helps identify and alert to **sensitive data, such as personally ideanifiable information (PII)**.

## Shared Responsibility Model

### AWS responsibility - Security Of the Cloud

* Protecting infrastructure (hardware, software, facilities, and networking) that runs all the AWS services.
* Managed services like S3, DynamoDB, RDS, etc. ...

### Customer responsibility - Security in the Cloud

* For EC2 Instance, the customer is responsible for management of the guest OS (including security patches and updates), firewall and network configuration, IAM.
* Encrypting application data.

### Shared controls

* Patch Management, Configuration Management, Awareness and Training.

![Shared Responsibility Model Chart](https://d1.awsstatic.com/security-center/Shared_Responsibility_Model_V2.59d1eccec334b366627e9295b304202faf7b899b.jpg)

[Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)
