# AWS Security

## Encryption 101

* SSL/TLS, Encryption-in-flight (HTTPS).

## Server-Side

* Encryption-at-rest.
* Stored in encrypted form (data-key).
* Keys generally managed by KMS.

## Client-Side

* Encrypted / Decrypted by client.
* Never decrypted by the server.
* (SEE Envelope Encryption)

## KMS: Key Management Service

### Customer Managed Keys (CMK)

* Symmetric (AES-256 Keys, single key to encrypt / decrypt, necessary for Envelope Encryption).
* Asymmetric (RSA + ECC Key Pairs, Public (encrypt), Private (decrypt) key pair, encryption outide of AWS).

## Envelope Encryption

To encrypt something greater than 4K, use `GenerateDataKey` API.

* Plaintext Data Key (DEK).
* File includes Encypted DEK and Encrypted File.
* Decrypt encrypted key to decrypt larger file.

## KMS Limits

* Throttling Exception when request quota exceeded, use exponential backoff.
* All cryptographic operation share quota.
* Consider DEK caching.
* Request quota increase, API or AWS Support.

## S3 Encryption for Objects

1. SSE-S3
2. SSE-KMS
3. SSE-C (client-managed keys)
4. Client-Side Encryption

## S3 Bucket Policy - Force SSL

* DENY: `aws:SecureTransport=false`
* `true` would allow anonymous `GetObject` when using SSL.

## Force Encryption of SSE-KMS

1. DENY: header includes `aws:kms`
2. DENY: no encryption header.

## S3 Bucket Key

* Setting to decrease API cal;s to KMS.
* Leverages data keys.

## SSM Parameter Store

* Secure store for configuration and secrets.
* Optional seamless encryption with KMS.
* Version tracking

## Secrets Manager

Lifecycle

* Capable of forcing rotation fo secret keys every n-days.
* Automate generation of secrets on rotation (uses Lambda).

Notes

* Mostly meant for RDS.
* KMS encryption is mandatory.

## CloudWatch Logs Encryption

* Encrypt CloudWatch logs with KMS Keys (`associate-kms-key` existing, `create-log-group` create new).
* Keys via Log Groups, not via UI.

## CodeBuild Security

* To access resources in VPC, specify a VPC configuration in CodeBuild.
* Secrets in CodeBuild (Parameter Store Parameters or Secrets Manager Secrets).


