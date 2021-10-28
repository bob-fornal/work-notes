# Concurrency

Concurrency is a decoupling strategy; decoupling **what** gets done from **when** it gets done.

* Can **sometimes** improve performance.
* Design is remarkably difference from single-threaded systems.
* Correct concurrency is complex, even for simple problems.

## Concurrency Defense Principles

### Single Responsibility Principle

* Limit the Scope of Data
* Use Copies of Data
* Threads Should be as Independent as Possible

Then ...

* Know the Library
* Know the Execution Models
* Beware Dependency Between Synchronized Methods
* Keep Synchronized Sections Small
* Writing Correct Shutdown Code Is Hard
* Test Threaded Code
