# Java - Static Keyword

**`static` is the quickest way around Java OOP.**

* **Use `static` members sparingly.**
* Cannot override static methods.
* `static` methods and values belongs to the class, not the object.
* Respect the rules of encapsulation.

```java
public class Alarm {
  private static String documentation = "use turnOn() to activate.";
  protected boolean active;

  public static String getDocumentation() {
    return documentation;
  }

  public void turnOn() {
    active = true;
  }
}

// Alarm.getDocumentation();
```

* `public static` fields are global variables in disguise.
* `public static final` fields are global constants.
