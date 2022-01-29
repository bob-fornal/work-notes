# CloudFront and AWS Global Accelerator

## AWS CloudFront

* Content Delivery Network (CDN).
* Improved read performance, content is cached at the edge.
* 216 Points of Presence globally (edge locations).
* DDoS protection, integratino with Shield, AWS Web Application Firewall.
* Can expose external HTTPS and can talk to internal HTTPS backends.

### CloudFront - Origins

#### S3 Bucket

* For distributing files and caching them at the edge.
* Enhanced security with CloudFront **Origin Access Identity (OAI)**.
* CloudFront can be used as an ingress (to upload files to S3).

#### Custom Origin (HTTP)

* Application Load Balancer
* EC2 Instance
* S3 Website (must first enable the bucket as a static S3 Website)
* Any HTTP backend

### CloudFront Geo Restriction

Can restrict who can access a distribution

* **Whitelist**: Allow users to access content only of they are in one of the countries on a list of approved countries.
* **Blacklist**: Prevent users from accessing content if they are in one of the countries on a list of banned countries.

The "country" is determined using a third-party Geo-IP database.

* **Use-Case**: Copyright Laws to control access to content.

| CloudFront | S3 Cross-Region Replication |
|------------|-----------------------------|
| Global Edge network. | Must be setup for each region where replication will happen. |
| Files are cached for a TTL. | Files are updated in near real-time. |
| **Great for static content that must be available everywhere**. | Read only. |
| | **Great for dynamic content that needs to be available at low-latency in a few regions**.

## CloudFront Signed URL / Cookies

To distributes paid shared content to premium users all over the world.

Use CloudFront Signed URL / Cookie. Attach a policy ...

* Includes URL expiration.
* Includes IP ranges to access the data from.
* Trusted signers (which AWS accounts can create signed URLs).

How long should the URL be valid for?

* Shared content (movie, music): make it short (a few minutes).
* Private content (to the user): years.

Notes

* Signed URL: Access to individual files (one signed URL per file).
* Signed Cookies: Access to multiple files (one signed cookie for many files).

### Signed URL versus S3 Pre-Signed URL

| CloudFront Signed URL | S3 Pre-Signed URL |
|-----------------------|-------------------|
| Allow access to a path, no matter the origin. | Issue a request as the person who pre-signed the URL. |
| Account-wide key-pair, only the root can manage. | Uses the IAM key of the signing IAM principal. |
| Can filter by IP, path, date, expiration. | Limited lifetime. |
| Can leverage caching features. | |

## CloudFront Advanced Concepts

### Pricing

* CloudFront Edge locations are all around the world.
* The cost of data out per edge location varies.
* Reduce the number of edge locations for **cost reduction**.

Three price classes ...

1. Price Class All: All regions - best performance.
2. Price Class 200: Most regions, but excludes the most expensive regions.
3. Price Class 100: Only the least expensive regions.

### Multiple Origin

To route to different kinds of origins based on the content-type.

Based on path patterns ...

* `/images/*`
* `/api/*`
* `*`

### Origin Groups

* To increase high-availability and do failover.
* Origin Group: One primary and one secondary origin.
* If the primary origin fails, the second one is used.

## Field Level Encryption

* Protect user sensitive information through application stack.
* Adds an additional layer of security along with HTTPS.
* Sensitive information encrypted at the edge, close ot the user.
* Uses asymmetric encryption.

Usage ...

* Specify set of fields in POST requests that should be encrypted (up to 10 fields).
* Specify the public key to encrypt them.

## AWS Global Accelerator

* **Unicast IP**: One server holds one IP address.
* **Anycast IP**: All servers hold the same UP address and the client is routed to the nearest one.

How does it work?

* Leverages the AWS internal network to route to an application.
* **2 Anycast IP** are created for an application.
* The Anycast IP send traffic directly to Edge Locations.
* The Edge Locations send traffic to the application.

What does it work with?

* Works with **Elastic IP, EC2 Instances, ALB, NLB, public or private**.

### Consistent Performance

* Intelligent routing to low latency and fast regional failover.
* No issue with client cache (because the IP does not change).
* Internal AWS network.

### Health Checks

* Global Accelerator performs a health check of the applications.
* Helps to make the application global (failover less than one minute when not healthy).
* Great for disaster recovery (thanks to the health checks).

### Security

* Only 2 external IP need to be whitelisted.
* DDoS protection thanks to AWS Shield.

## AWS Global Accelerator versus CloudFront

* The both use the AWS global netowrk and its edge locations around the world.
* Both services integrate with AWS Shield for DDoS protection.

| CloudFront | Global Accelerator |
|------------|--------------------|
| Improves performance for cacheable content (images and video). | Improves performance for a wide range of applications over TCP or UDP. |
| Improves performance for dynamic content (such as API acceleration and dynamic site delivery). | Proxying packets at the edge to applications runnning in one or more AWS Regions. |
| Content is served at the edge. | Good fit for non-HTTP use-cases, such as gaming (UDP), IoT (MQTT), or Voice over IP. |
| | Good for HTTP use-cases that require static IP addresses. |
