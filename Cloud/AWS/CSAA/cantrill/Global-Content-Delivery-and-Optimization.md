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

Behaviors ...

* Contained within Distributions.
* Origins are used by behaviors as content sources.
* A distribution can have many behaviors which are configured with a path pattern. If requests match the pattern, that behavior is used; otherwise the default behavior is used.
