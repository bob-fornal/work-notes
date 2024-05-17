# Documentation

> Documentation of knowledge.

## Architectual Decision Record

An **Architectural Decision (AD)** is a justified technical choice that addresses a functional or non-functional requirement that is architecturally significant. An Architecturally Significant Requirement (**ASR**) is a requirement that has a measurable effect on the architecture and quality of a software and/or hardware system. An Architectural Decision Record (ADR) captures a single AD and its rationale; the collection of ADRs created and maintained in a project constitute its decision log. All these are within the topic of Architectural Knowledge Management (AKM), but ADR usage can be extended to design and other decisions (“any decision record”).

A “lightweight” ADR consists of title, status, context, decision, and consequences.

### Template

#### [asr-####] Title

##### Status

What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.?

##### Context

What is the issue that we're seeing that is motivating this decision or change?

##### Decision

What is the change that we're proposing and/or doing?

##### Consequences

What becomes easier or more difficult to do because of this change?

## Best Practices

The purpose of a style guide is to provide guidance on building an applications by showing the conventions used and, more importantly, why they were chosen.

### Template

Group these together into **topics**.

#### [style-####] Title

* Bulleted list of what the style or pattern is.

***Why?***: Reasons why we are using this style/pattern

**Example**

```javascript
/* avoid */
...

/* recommended */
...
```

* **Note**: Additional notes here.