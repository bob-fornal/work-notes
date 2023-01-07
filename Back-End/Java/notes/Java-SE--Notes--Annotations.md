# Java Notes - Annotations

Incorporate developer's assumptions.

* About the type system.
* About the toolset.
* AAbout the execution environment.

Need a structured way to express context and intent.

* Allow tools and other code to act on that context and intent.

Annotations are special types that act as metadata.

* Applied to a specific target.
* No direct effect on target behavior.
* Must be interpreted.

Applying Annotations

* Always preceded by `@`.
* Placed directly before the target.
* Allowable targets vary with annotation.

### Common Annnotations

Common Java core platform annotations.

* `Override`
* `Deprecated`
* `SuppressWarnings`

```java
// Doer.java
public class Doer {

  @Deprecated
  public void doTheThing() { ... }

  public void doTheThingNew() { ... }
}

// MyWorker.java
// @SuppressWarnings("deprecation")
public class MyWorker {

  @SuppressWarnings("deprecation") // No longer see warnings
  void doSomeWork() {
    Doer d1 = new Doer();
    d1.doTheThing(); // Produces warning when compiled
  }

  @SuppressWarnings("deprecation") // No longer see warnings
  void doDoubleWork() {
    Doer d2 = new Doer();
    d2.doTheThing(); // Produces warning when compiled
    d2.doTheThing(); // Produces warning when compiled
  }
}
```

## Applying Metadata with Annotations

##  Commonly Used Annotations