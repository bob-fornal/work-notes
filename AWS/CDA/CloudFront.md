# CloudFront

CDN: Content Delivery Network

* Improves read performance, content is cached at the edge.
* DDoS protection, integration with shield, AWS Web Application Firewall.
* Can expose external HTTPs and can talk to internal HTTPS backends.

## Origins

S3 Bucket

* Distributing files and caching them at the edge.
* Enhanced security with CloudFront Origin Access Identity (OAI).
* Can be used as an ingress (to upload files to S3).

Custom Origin (HTTP)

* Application Load Balancer, EC2 Instance, S3 Website, or any HTTP backend.

## CloudFront Caching

* Cached based on Headers, Session Cookies, Query String Parameters.
* Cache lives at each CloudFront edge location.
* **Minimize** requests to origin by **maximizing** cache hit rate.
* Controle the TTL (0-seconds to 1-year).
* Invalidate part of the cache using the CreateInvalidation API.

## CloudFront and HTTPS

Viewer Protocol Policy

* Redirect HTTP to HTTPS.
* Use HTTPS only.

Origin Control Policy (HTTP or S3)

* HTTPS only

**NOTE**: S3-Bucket Websites do not support HTTPS.

## CloudFront Signed URL / Cookie

* Signed URL = access to individual files.
* Signed Cookie = access to multiple files.

## CloudFront Advanced Concepts

* Cost of data varies per edge location.
* Reduce the number of edge locations for cost reduction: ALL, 200, 100.

## Multiple Origins

* Route to different origins based on the content type.

## Origin Groups

* Increase availability and failover.
* One primary and one secondary origin.

