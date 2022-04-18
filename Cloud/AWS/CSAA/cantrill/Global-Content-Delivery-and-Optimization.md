# Global Content Delivery and Optimization

## CloudFront Architecture

Terminology ...

* **Origin** - The source location of the content.
* **S3 Origin** or **Custom Origin**.
* **Distribution** - the 'configuration' unit of CloudFront.
* **Edge Location** - Local cache of the data.
* **Regional Edge Cache** - Larger version of an edge location. Provides another layer of caching.

Notes ...

* Integrates with ACM for HTTPS.
* Upload direct to origins, **No Caching**.


## CloudFront Behaviors

* Contained within Distributions.
* Origins are used by behaviors as content sources.
* A distribution can have many behaviors which are configured with a path pattern. If requests match the pattern, that behavior is used; otherwise the default behavior is used.

Can be configured at the Distribution Level ...

* Distributions are the unit of configuration within CloudFront.
* Price Class, options for varying performance.
* Layer 7, Web Application Firewall.
* Alternate Domain Names.
* Type of SSL Certificate that can be used.
* Security Policy to be used.

Behaviors ...

* Default, Path Pattern (*).
* Field Level Encryption
* **Caching**.
* Minimum, Maximum, and Default TTL.
* **Restrict access to a Behavior with Trusted Signers**.
* Compress objects
* Lambda at Edge Functions.

## CloudFront TTL and Invalidations

1. 1st Request (image not stored on Edge Location).
2. Origin Fetch, stored on Edge Location.
3. Response, image sent.
4. Original Photo is replaced on Origin.
5. 2nd Request, original image returned.
6. Object Expires.
7. 3rd Request.
8. Edge Location forwards Request.
9. IF CURRENT, `304 Not Modified` is returned. DIFFERENCE, `200 OK` is returned along with new image.
10. Edge Location is updated if `200 OK`.

Object Validity ...

* Edge Location sees an object as not expired when it's within the TTL.
* More frequent cache HITS means lower origin load.
* Default TTL (behavior) is 24-hours (validity period).
* Can set Minimum TTL and Maximum TTL.

Headers ...

* Origin Header: `Cache-Control max-age` (seconds).
* Origin Header: `Cache-control s-maxage` (seconds).
* Origin Header: `Expires` (date and time).
* Custom Origin or S3 (via object metadata).

Cache Invalidations ...

* Performed on a distribution and applied to all Edge Locations, takes time.
* `/images/whiskers1/jpg`
* `/images/whiskers*`
* `/images/*`
* `/*`
* Versioned file names ... `whiskers1_v1.jpg` ...

## AWS Certificate Manager (ACM)

* HTTP - Simple and Insecure.
* HTTPS - SSL/TLS Layer of Encryption added to HTTP.
* Data is encrypted **in-transit**.
* Certificates **prove identity**.
* Signed by a **trusted authority**.
* Create, renew, and deploy certificates with ACM.
* Supported AWS Services **ONLY** (example, CloudFront and ALBs, not **EC2**).

## CloudFront and SSL/TLS

* CloudFront Default Domain Name (CNAME).
* SSL supported by default, `*.cloudfront.net` certificate.
* Alternate Domain Names (CNAMES).
* Verify Ownership (optionally HTTPS) using a matching certificate.
* Generate or import and ACM in the same region (CloudFront always in `us-east-1`).
* HTTP or HTTPS, HTTP redirected to HTTPS, HTTPS Only.
* Two SSL Connections: Viewer redirects to CloudFront and CloudFront redirects to Origin.
* Both need valid public certificates (and intermediate certificates).

CloudFront and SNI ...

* Pre-2003, every SSL-enabled site needed its **own IP**.
* Encryption starts at the TCP connection.
* Host header happens after the connection has been established, Layer 7 - Application.
* 2003, SNI is aadded as a TLS extension, allowing a **host to be included**.
* Resulting in **many SSL Certificates/Hosts** using a shared IP.
* **Old browsers do not support SNI**, CloudFront charges extra for dedicated IP.

## Origin Types and Architecture

Origin Types ...

* Amazon S3 Buckets
* AWS Media Package Channel Endpoints
* AWS Media Store Container Endpoints
* (Everything Else) Web Servers

Origin Architecture ...


