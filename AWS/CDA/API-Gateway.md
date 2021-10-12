# API Gateway

## API Gateway -- Integrations High Level

Lambda Function

* Invoke Lambda function
* Easy way to expose REST API backed by AWS Lambda

HTTP

* Expose HTTP endpoints in the backend
* Example: internal HTTP API on premise, Application Load Balancer...
* Why? Add rate limiting, caching, user authentications, API keys, etc...

AWS Service

* Expose any AWS API through the API Gateway?
* Example: start an AWS Step Function workflow, post a message to SQS
* Why? Add authentication, deploy publicly, rate control...

## API Gateway - Endpoint Types

* Edge-Optimized (default): For global clients - Requests are routed through the CloudFront Edge locations (improves latency) - The API Gateway still lives in only one region
* Regional: - For clients within the same region - Could manually combine with CloudFront (more control over the caching strategies and the distribution)
* Private: - Can only be accessed from your VPC using an interface VPC endpoint (ENI) - Use a resource policy to define access

## API Gateway -- Deployment Stages

* Making changes in the API Gateway does not mean they're effective
* You need to make a "deployment" for them to be in effect
* It's a common source of confusion
* Changes are deployed to "Stages" (as many as you want)
* Use the naming you like for stages (dev, test, prod)
* Each stage has its own configuration parameters
* Stages can be rolled back as a history of deployments is kept

## API Gateway -- Stage Variables

Stage variables are like environment variables for API Gateway

Use them to change often changing configuration values

They can be used in:

* Lambda function ARN
* HTTP Endpoint
* Parameter mapping templates

Use cases:

* Configure HTTP endpoints your stages talk to (dev, test, prod...)
* Pass configuration parameters to AWS Lambda through mapping templates

Stage variables are passed to the "context" object in AWS Lambda

## API Gateway - Integration Types

Integration Type MOCK

* API Gateway returns a response without sending the request to the backend

Integration Type HTTP / AWS (Lambda & AWS Services)

* You must configure both the integration request and integration response
* Setup data mapping using mapping templates for the request & response

Integration Type AWS_PROXY (Lambda Proxy):

* Incoming request from the client is the input to Lambda
* The function is responsible for the logic of request / response
* No mapping template, headers, query string parameters... are passed as arguments

Integration Type HTTP_PROXY

* No mapping template
* The HTTP request is passed to the backend
* The HTTP response from the backend is forwarded by API Gateway

