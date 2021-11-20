# Amazon Cognito

To give users an identity so that they can interact with an application.

## Cognito User Pools

* Sign in functionality for application users.
* Integrate with API Gateway and Application Load Balancer.

## Cognito Identity Pools (Federated Identity)

* Provide AWS credentials to users so they can access AWS resources directly.
* Integrate with Cognito User Pools as an identity provider.

## Cognito Sync

* Synchronize data from device to Cognito.
* Is deprecated and replaced by AppSync.

Cognito vs IAM: "hundreds of users", "mobile users", "authenticate with SAML"

## Cognito User Pools - User Features

* Create a serverless database of user for web and mobile applications.
* Simple login: Username (or email) / password combination.
* Password reset.
* Email and Phone Number Verification.
* Multi-factor authentication (MFA).
* Federated Identities: users from Facebook, Google, SAML.
* Feature: block users if their credentials are compromised elsewhere.
* Login sends back a JSON Web Token (JWT).

## Cognito User Pools - Hosted Authentication UI

* Cognito has a hosted authentication UI that can be added to an application to handle signup and sign-in workflows.
* Using the hosted UI, have a foundation for integration with social logins, OIDC or SAML.
* Can customize with a custom logo and custom CSS.

## Cognito Identity Pools (Federated Identities)

Get identities for "users" so they obtain temporary AWS credentials.

Identity pool (e.g identity source) can include:

* Public Providers (Login with Amazon, Facebook, Google, Apple).
* Users in an Amazon Cognito user pool - OpenID Connect Providers & SAML Identity Providers.
* Developer Authenticated Identities (custom login server).
* Cognito Identity Pools allow for unauthenticated (guest) access.

Users can then access AWS services directly or through API Gateway.

* The IAM policies applied to the credentials are defined in Cognito.
* They can be customized based on the user_id for fine grained control.

## Cognito Identity Pools - IAM Roles

* Default IAM roles for authenticated and guest users.
* Define rules to choose the role for each user based on the user ID.
* Partition user access using policy variables.
* IAM credentials are obtained by Cognito Identity Pools through STS.
* The roles must have a "trust" policy of Cognito Identity Pools.

## Cognito User Pools vs Identity Pools

### Cognito User Pools

* Database of users for web and mobile application.
* Allows to federate logins through Public Social, OIDC, SAML.
* Can customize the hosted UI for authentication (including the logo).
* Has triggers with AWS Lambda during the authentication flow.

### Cognito Identity Pools

* Obtain AWS credentials for users.
* Users can login through Public Social, OIDC, SAML & Cognito User Pools.
* Users can be unauthenticated (guests).
* Users are mapped to IAM roles & policies, can leverage policy variables.
* CUP + CIP = manage user / password + access AWS services.

