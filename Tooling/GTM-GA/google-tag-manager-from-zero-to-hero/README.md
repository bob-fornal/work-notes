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

(generally used to track SPA)

* New History Fragment
* Old History Fragment
* New History State
* Old History State
* History Source

### Videos

* Video Provider (name, always YouTube)
* Video Status (state: play, pause, stop, etc.)
* Video URL
* Video Title
* Video Duration (length in seconds)
* Video Current Time
* Video Percent
* Video Visible

### Scrolling

* Scroll Depth Threshold (percent or pixels scrolled)
* Scroll Depth Units (percent or pixels)
* Scroll Direction (horizontal or vertical)

### Visibility

* Percent Visible (of element)
* On-Screen Duration

## User-Defined Variables

1. Click New
2. Click in middle for options.

* See Community Templates Gallery.

## Implementing GA4 Tags

The Configuration Tag tracks ...

* Initialize Google Analytics
* Cookies
* Common Settings
* Enhanced Measurement Events (page views, scrolls, outbound clicks, site search, video engagement, and file downloads)

## Preview Mode in GTM

1. Preview
2. Google Tag Assistant (Include debug signal in the URL before "Connect"); can be used with Google Tag Assistant Plugin installed.
3. (new window opens on site) click Continue on original window.
4. Values at various states are provided.

### Google Tag Assistant (Plugin)

1. Add to Chrome (link to plugin is top, right).

## Event Tracking in GA4

### Obtain the Measurement ID in GA.

1. Select Admin > Data Collection and Modification > Data Streams.
2. Select the Stream and copy the Measurement ID.

### Storing Measurement ID in User-Defined Variables

1. In GTM, select Variables.
2. Select New User-Defined Variable.
3. Select Constant.
4. Paste value in and Save.

### Tracking Clicks

1. Triggers > New
2. All Elements (all clicks, all elements)
3. Name: Click - All Events
4. Save
5. Tags > New
6. Tag Configuration > GA > GA4 Event
7. Select Measurement ID
8. Event Name: all_clicks
9. Name for Event: GA4 All Clicks Event
10. Triggering > Click - All Events
11. Save
12. Preview
13. Submit

### Sending Click Details to GA4

1. Variables > Configure > Click Section
2. Enable All Click Variables
3. Preview
4. Submit

#### Built in Click Variables

1. Tags > GA4 All Click Event (tag)
2. Tag Configuration > Event Parameters
3. Add Click Variables to Values
4. Event Parameter (name, lowercase with underscore)
5. Save
6. Preview (select Display Variables as Values)
7. Submit

### Tracking Button clicks

1. Triggers > New
2. All Elements (sometimes Just Links can work)
3. Determine Conditions (Click Classes contains [find button class in All Click Event data])
4. Name: Button Clicks
5. Save
6. Tags > GA4 All Click Event (tag) > (menu) copy
7. Change Both Names
8. Edit Trigger > Delete
9. Select Button Clicks
10. Save
11. Preview
12. Submit

## Tracking Link Trigger

* Internal or externally connected links.

1. Triggers > New
2. Just links
3. Name: Click - Link
4. Save
5. Tags > Ga4 All Click Event (tag) > (menu) copy
6. Change Both Names
7. Edit Trigger > Delete
8. Select Click - Link
9. Save
10. Preview
11. Submit

### Internal Link Clicks

1. Triggers > Click - Link
2. Choose Some Link Clicks
3. Click URL contains [current domain]
4. Save
5. Preview
6. Submit

## Capturing JavaScript Errors with GTM

1. Variables > Built In Variables > Configure
2. Errors: Enable Error Message, URL, and Line.
3. Triggers > New > Other > JavaScript Error
4. All JavaScript Errors
5. Name: JavaScript Error
6. Save
7. Tags > New > Tag Configuration
8. Select GA4 Event
9. Select Measurement ID
10. Name: javascript_error, 
11. Add Error Parameters
12. Add Trigger (JavaScript Error)
13. Save
14. Submit

## Tracking Scroll Depth on Page

* GA4 automatically tracks whether the user scrolls down to the 90% mark via Enhanced Measurement.

1. Variables > Built In Variables > Configure
2. Scrolling: Depth Threshold, Depth Units, Scroll Direction
3. Triggers > New > User Engagement > Scroll Depth (Vertical and/or Horizontal)
4. Name: 
