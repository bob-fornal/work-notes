# Google Tag Manager (GTM) Training Course - From Zero To Hero

> Anil Batra

* A **Tag Manager** manages a collection of tags (or pixels).
* The **Tag Manager** code is ready to listen to actions on page, browser, and/or screen (e.g. click, scroll, etc.).
* Variables are used to store information about the page, actions, etc.
* Triggers allow for different events to fire (i.e. Page View). Trigger condition being met fires the tag.

## Account Setup

1. [https://www.google.com/analytics/tag-manager](https://www.google.com/analytics/tag-manager) ![link](../../../foreign.png)
2. Sign up for free.
3. Select Google Account.
4. Select Account name.
5. Setup Container name and where to use (Web).
6. Create.
7. Terms of Service.
8. Google Tag Manager Code (Head and Body)

### Publishing

1. Submit
2. Add Description
3. Publish

### Installation

* `<head>` code.
* `<body>` code.

#### WordPress

* Appearance > Editor (warning; make a [Child Theme](https://codex.wordpress.org/Child_Themes) ![link](../../../foreign.png)).
* Files (right side) > Theme Header (paste both) and update the file.
* OR - plugins

## Workspace

* Container ID: GTM-xxxxxxxx (links to tag code).

### Overview

* Current Workspace (can have 3); workspace creates a copy of the "live" version.
* New Tag (callout)
* Now Editing (status)
* Container (status)

### Tags

* List of All Tags

### Triggers

* List of Triggers, conditions, and rules.

### Variables

* All Tag Manager Variables (built-in and user-defined)

### Folders

* Grouping Tags, Triggers, and Variables

### Templates

* Tag Templates (via Gallery or user-created)
* Variable Templates (via Gallery or user-created)

## Admin

* Account Management & Container Management

### Account

* (+) Create Account
* Account Settings (information about current account)
* Account Activity
* User Management

### Container

* (+) Create Container (name and type)
* Container Name and ID
* Container Settings (name and target, delete)
* Container Activity
* User Management
* Install Google Tag Manager (scripts)
* Import Container (move from one container to another)
* Export Container (move from one container to another)
* External Account Links
* Approval Queue
* Environments
* Container Notifications
* Tag Coverage

## Triggers

The conditions to fire the tags.

### Page View

* Consent Initialization (user consent)
* Initialization
* Page View
* DOM ready
* Window Loaded

### Click

* All Elements
* Just Links

### User Engagement

* Element Visibility
* Form Submission
* Scroll Depth
* YouTube Video

### Other

* Custom Event
* History Change (SPA page changes)
* JavaScript Error
* Timer
* Trigger Group

## Built-In Variables

### Pages

* Page URL
* Page Hostname
* Page Path
* Referrer

### Utilities

* Event
* Environment Name
* Container ID
* Container Version
* Random Number
* HTML ID

### Errors

* Error Message
* Error URL
* Error Line
* Debug Mode

### Clicks

* Click Element
* Click Classes
* Click ID
* Click Target
* Click URL
* Click Text

### Forms

* Form Element
* Form Classes
* Form ID
* Form Target
* Form URL
* Form Text

### History

* New History Fragment
* Old History Fragment
* New History State
* Old History State
* History Source

### Videos

* Video Provider
* Video Status
* Video URL
* Video Title
* Video Duration
* Video Current Time
* Video Percent
* Video Visible

### Scrolling

* Scroll Depth Threshold
* Scroll Depth Units
* Scroll Direction

### Visibility

* Percent Visible
* On-Screen Duration
