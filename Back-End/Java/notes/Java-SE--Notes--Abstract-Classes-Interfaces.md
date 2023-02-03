# Java - Abstract Classes and Interfaces

## Abstract Classes

A class that exists as a super-class only, can be abstracted.

* Cannot directly implement an abstraction.

## Interfaces

Interface is like a contract that says this object responds to these methods.

* Interfaces make up for the lack of multiple inheritance.
* Interfaces cannot inherit from a class.
* Interfaces have no constructor.

An interface can have ...

* Fields that are `public static final` (global constant).
* Methods that are `public abstract` (assumed by default).
* `static` methods.
* `default` method (supposed to be `abstract` with a `default` implementation) - this is a "loosened" constraint.

```java
public interface Widget {
  String getHelpText();
}
public interface PersistentObject {
  void save();
}

public glass Gizmo extends Gizmo implements Widget, PersistentObject {

}
```
