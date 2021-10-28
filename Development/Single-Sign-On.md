# Single Sign-On

## Definition

**Single sign-on (SSO)** is an authentication scheme that allows a user to log in with a single ID and password to any of several related, yet independent, software systems.

True single sign-on allows the user to log in once and access services without re-entering authentication factors.

Other shared authentication schemes, such as **OpenID** and **OpenID Connect**, offer other services that may require users to make choices during a sign-on to a resource, but can be configured for single sign-on if those other services (such as user consent) are disabled. An increasing number of federated social logons, like **Facebook Connect**, do require the user to enter consent choices upon first registration with a new resource, and so are not always single sign-on in the strictest sense.

* Federated Identity Management (FIM)
* OAuth (specifically OAuth 2.0 nowadays)
* OpenID Connect (OIDC)
* Security Access Markup Language (SAML)
* Same Sign On (SSO)

SSO is actually a part of a larger concept called Federated Identity Management, thus sometimes SSO is referred to as federated SSO. FIM just refers to a trust relationship that is created between two or more domains or identity management systems. Single Sign-on is often a feature that is available within a FIM architecture.

OAuth 2.0 is a specific framework that could also be considered part of a FIM architecture. OAuth focuses on that trusted relationship allowing user identity information to be shared across the domains.

**OpenID Connect (OIDC)** is an authentication layer that was built on top of OAuth 2.0 to provide Single Sign-on functionality.

**Security Access Markup Language (SAML)** is an open standard that is also designed to provide Single Sign-on functionality.

## Identity Providers as a Service

* AWS Cognite
* Auth0 (purchased by Okta)
* Azure AD
* Ping Identity
* Okta

## Implementation

* Use a Library to Validate Tokens
* Use a Library to Manage the OAuth Flow


