# Using Google Analytics 4 (GA4)

> by Doru Catana

## Evolution of Google Analytics

Web Analytics History

* Downgrade, making tracking harder.
* Due to abuse, specific tracking is more challenging (User Privacy, Platform Changes, Legislative Regulation).

## Benefits of GA4

* Move from session to event-based model.
* Cross-device tracking.
* Improved attribution modeling.
* Better and more accurate reporting.
* Actual machine learning, not just advertised (?)

(?) Is this actually a good thing?

## Setting Up Google Analytics

### Identity Spaces

* Google Signals: Google account usage and activated personal ads.
* Device ID: First party cookies.
* User ID: User logins on a site.

User ID Best Practices

* Does not track PII (personal identifiable information).

### Setting up GA4 Tracking

1. Create / own a Google Account (personal or business)
2. Website / application access.
3. Google Tag Manager account.

* For new projects, make sure the DNS changes have propagated.

1. Account Setup (Name, Account Data Sharing) > Next.
2. Property Setup ([first] Property name): GA4 Demo
3. About Your Business > Create.
4. Terms of Service, Check and Accept.
5. Admin > Data collection and modification > Data streams
6. Add stream > Web
7. Configure > Create stream
8. Installation Instructions (snippet) [View Tag Instructions (manually)]
9. [Test from here]

* Small Site: Install snippet below head (works for React, Angular, and Vue Frameworks).
* CMS: Use Header Footer Code Manager (99 robots); add, activate, Add New Snippet.

### Benefits of GTM

* Future proof solution,
* Easily add custom events.

And

* GTM Code replaces several Google Tag code segments; centralized management.
* Provides ability to test before merging to production.

## Understanding Reports

> ... and start torturing data until it tells us what we want.

## Templates, Techniques, and Use-Cases

## Advertising: Channels, Attributions, and Monetization

## Configure: Events, Conversions, and Audiences

## Admin and Product Integrations
