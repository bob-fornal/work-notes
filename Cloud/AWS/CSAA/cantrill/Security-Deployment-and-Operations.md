# Security, Deployment, and Operations

## AWS Secrets Manager

* It has the same functionality as Parameter Store.
* Designed for secrets (passwords, API Keys, etc.).
* Usable via console, CLI, API, or SDKs (integration).
* Supports automatic rotation, using Lambda.
* Directly integrates with some AWS products.

## AWS Web Application Firewall (WAF) and Shield

### AWS Shield

* Provides AWS resources with DDoS protection.

Shield Standard - free with Route53 and CloudFront ...

* Protection against Layer 3 and Layer 4 DDoS Attacks.

Shield Advanced - $3,000 per month ...

* EC2, ELB, CloudFront, Global Accelerator, and Route53.
* DDoS Response Team and Financial Insurance.

### Web Application Firewall (WAF)

* Layer 7 (HTTP/s) Firewall.
* Protects against complex Layer 7 attacks and exploits.
* SQL Injection, Cross-Site Scripting, Geo Blocks, or Rate Awareness.
* Web Access Control List (WEBACL) integrates with ALB, API Gateway, and CloudFront.
* Rules are added to a WEBACL and evaluated when traffic arrives.

## CloudHSM

HSM = Hardware Security Module.

* With KMS, AWS manages, shared but separate.
* True "Single Tenant" Hardware Security Module (HSM).
* AWS provisioned, but **fully customer managed**.
* Fully **FIPS 140-2 Level 3** (KMS is L2 Overall, some L3).
* Industry Standard APIs = **PKCS#11**, Java Cryptography Extensions (**JCE**), Mucrosoft **CryptoNG** (CNG) libraries.
* KMS can use CloudHSM as a custom key store, CloudHSM integration with KMS.

Use Cases ...

* No Native AWS Integration: example, no S3 SSE.
* Offload the SSL/TLS Processing for Web Servers.
* Enable Transparent Data Encryption (TDE) for Oracle Databases.
* Protect the Private Keys for an Issuing Certificate Authority (CA).

## AWS Config

* Record configuration changes over time on resources.
* Auditing of changes, compliance with standards.
* **Does not prevent changes from happening**, not protection.
* Regional service. Supports cross-region and account aggregation.
* Changes can generate SNS Notifications and near-realtime events via EventBridge and Lambda.

## Amazon Macie

* Data Security and Data Privacy Service.
* Discover, Monitor, and Protect Data. Stored in S3 Buckets.
* Automated discovery of data (example, PII, PHI, Finance).
* Managed Data Identifiers - Built-in - ML/Patterns.
* Custom Data Identifiers - Proprietary - Regular Expression Based.
* Integrates - with Security Hub and "finding events" to EventBridge.
* Centrally manage, either via AWS ORG or one Macie Account Inviting.

### Identifiers

Managed Data Identifiers - maintained by AWS ...

* Growing list of common sensitive data types.
* Credentials, finance, Health, personal identifiers.

Custom Data Identifiers ...

* Regular Expressions - defined a "pattern" to match in data.
* Keywords - optional sequences that need to be in proximity to regex match.
* Maximum Distance Match - how close keywords are to the regex pattern.
* Ignore Words - if regex patch contains ignore words, it is ignored.

### Findings

* Policy Findings or Sensitive Data Findings.
* Policy Findings Examples

  - `Policy:IAMUser/S3BlockPublicAccessDisabled`
  - `Policy:IAMUser/S3BucketEncryptionDisabled`
  - `Policy:IAMUser/S3BucketPublic`
  - `Policy:IAMUser/S3BucketSharedExternally`

* Sensitive Data Findings Examples

  - `SensitiveData:S3Object/Credentials`
  - `SensitiveData:S3Object/CustomIdentifier`
  - `SensitiveData:S3Object/Financial`
  - `SensitiveData:S3Object/Multiple`
  - `SensitiveData:S3Object/Personal`

## Amazon Inspector

* Scans EC2 Instances and the Instance OS for vulnerabilities and deviations against best practices.
* Length: 15-minutes, 1-hour, 8/12-hours, or 1-day.
* Provides a report of findings ordered by priority.
* Network Assessment (*Agentless*).
* Network and/or Host Assessment (*Agent*).
* Rules package determines what is checked.
* Network Reachability (*no agent required*). Agents can provide additional OS visibility.
* Check reachability end-to-end.
* Returns `RecognizedPortWithListener`, `RecognizedPortNoListener`, or `RecongizedPortNoAgent`.
* `UnrecognizedPortWithListener`.
* Packages (Host Assessments, *Agent required*).
* Common vulnerabilities and exposures (CVE).
* Center for Internet Security (CIS) Benchmarks.
* **Security best practices** for Amazon Inspector.

## Amazon GuardDuty

* Continuous security monitoring service.
* Analyses of supported Data Sources plus AI/ML and threat intelligence feeds.
* It identifies unexpected and unauthorized activity.
* Notify or event-driven protection and/or remediation.
* Supports multiple accounts (MASTER and MEMBER).

Utilized to generate Findings ...

* DNS Logs
* VPC Flow Logs
* CloudTrail Event Logs
* CloudTrail Management Events
* CloudTrail S3 Data Events
* Threat Intelligence Feeds
