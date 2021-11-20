# API Gateway

## API Gateway -- Integrations High Level

Lambda Function

* Invoke Lambda function.
* Easy way to expose REST API backed by AWS Lambda.

### HTTP

* Expose HTTP endpoints in the backend.
* Example: internal HTTP API on premise, Application Load Balancer.
* Why? Add rate limiting, caching, user authentications, API keys, etc.

### AWS Service

* Expose any AWS API through the API Gateway?
* Example: start an AWS Step Function workflow, post a message to SQS
* Why? Add authentication, deploy publicly, rate control.

## Endpoint Types

* Edge-Optimized (default): For global clients - Requests are routed through the CloudFront Edge locations (improves latency) - The API Gateway still lives in only one region.
* Regional: - For clients within the same region - Could manually combine with CloudFront (more control over the caching strategies and the distribution).
* Private: - Can only be accessed from a VPC using an interface VPC endpoint (ENI) - Use a resource policy to define access.

## Deployment Stages

* Making changes in the API Gateway does not mean they are effective.
* Need to make a "deployment" for them to be in effect.
* It is a common source of confusion.
* Changes are deployed to "Stages" (as many as needed).
* Use appropriate naming for stages (dev, test, prod).
* Each stage has its own configuration parameters.
* Stages can be rolled back as a history of deployments is kept.

## Stage Variables

Stage variables are like environment variables for API Gateway

Use them to change often changing configuration values

They can be used in

* Lambda function ARN
* HTTP Endpoint
* Parameter mapping templates

Use cases

* Configure HTTP endpoint stages talk to (dev, test, prod).
* Pass configuration parameters to AWS Lambda through mapping templates.

Stage variables are passed to the "context" object in AWS Lambda.

## Integration Types

### Integration Type MOCK

* API Gateway returns a response without sending the request to the backend.

### Integration Type HTTP / AWS (Lambda & AWS Services)

* Must configure both the integration request and integration response.
* Setup data mapping using mapping templates for the request & response.

### Integration Type AWS_PROXY (Lambda Proxy):

* Incoming request from the client is the input to Lambda.
* The function is responsible for the logic of request / response.
* No mapping template, headers, query string parameters ... are passed as arguments.

### Integration Type HTTP_PROXY

* No mapping template.
* The HTTP request is passed to the backend.
* The HTTP response from the backend is forwarded by API Gateway.

## Canary Deployments

* Choose percent of traffic the canary channel receives.

## Swagger and Open API 3.0

* Common way of defining a REST API using an API definition as code.
* Import existing
* Export current (YML or JSON)
* SDK generation

## API Gateway Caching

(EXPENSIVE)

* Default TTL is 300-seconds (0-seconds to 3,600-seconds).
* Defined per stage.
* Possible to override per method.
* Can be encrypted.
* Capacity: 0.5GB to 237GB.

## Cache Invalidation

* Able to flush immediately.
* Client - `Cache-Control: max-age=0` (with proper IAM authorization).

## Usage Plans and API Keys

### Usage Plan

* Who can access?
* How much and how fast?
* Uses API keys to identify API clients and meter access.
* Configure throttling limits and quota limits that are enforced on individual clients.

### API Keys

* Alphanumeric string values to distribute to clients.

To configure a Usage Plan

1. Create API(s), configure to require and API key, and deploy to stage(s).
2. Generate and import API keys to distribute to application developers.
3. Create the usage plan with the desired throttle and quota limits.
4. Associate API stages and API Keys with the usage plan.

* Callers must supply API Key in the `x-api-key` header in the request.

## Monitoring, Logging, and Tracing

### CloudWatch Logs

* Enabled at Stage level.
* Override on per API-basis.

### X-Ray

* Enable tracing to get extra information about requests in API Gateway.
* Full picture.

## CloudWatch Metrics

* `CacheHitCount` / `CacheMissCount` (efficiency of the cache).
* `Count`: number of API requests.
* `IntegrationLatency`: API Gateway to backend and back again.
* `Latency`: Client to Client.

### Errors

#### 4xxError (Client-side)

* 400 Bad Request
* 403 Access Denied, WAF filtered
* 429 Quota Exceeded, Throttle (can be retried)

#### 5xxError (Server-side)

* 502 Bad Gateway Exception
* 503 Service Unavailable Exception
* 504 Integration Failure

## API Gateway - CORS

Options PreFlight Request

* Access-Control-Allow-Methods
* Access-Control-Allow-Headers
* Access-Control-Allow-Origin

## Authentication and Authorization

IAM Security (permissions)

* Create an IAM Policy authorization and attach to the User / Role.
* Leverages "Sig-v4" capabilities where IAM credentials are in the header.

### Cognito User Pools

* Fully manages user lifecycle, token expires automatically.

### Lambda Authorizer

(3rd-Party)

* Token-based authorizer (bearer token), e.g. JWT or oAuth.
* Request parameter based.

## REST API versus HTTP API

HTTP APIs

* Low latency, cost effective AWS Lambda proxt, HTTP Proxy APIs and private integration (no data mapping).
* Supports OIDC and oAuth 2.0 authorization, built in support for CORS.
* No usage plans or API Keys.

## API Gateway WebSocket API

* Persistent Connection: onConnect, sendMessage, onDisconnect
* wss://--
* `connectionId` (store in DynamoDB).
* Connection URL callback is HTTP POST (IAM Sig-v4) `/@connections/connectionId`
* WebSocket API - Routing


