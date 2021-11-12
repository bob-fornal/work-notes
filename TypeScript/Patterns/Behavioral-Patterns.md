# Behavioral Patterns

Behavioral Patterns help abstract common behavior between components into a separate entity. The Observer pattern is an example of the Behavioral Pattern.

## Observer Pattern

Essentially the pattern states that a developer has a set of observer objects, which will react to changes in the state of the observed entity. In order for this to happen, once a change is received at the observed end, it is responsible for notifying its observers by calling one of its methods.

In practice, the implementation of this pattern is relatively easy.

```typescript
type InternalState = {
  event: String;
};

abstract class Observer { 
  abstract update(state:InternalState): void;
}

abstract class Observable {
  protected observers: Observer[] = [];
  protected state: InternalState = { event: "" };

  public addObserver(observer: Observer):void {
    this.observers.push(observer);
  }
  
  protected notify() {
    this.observers.forEach(observer => observer.update(this.state));
  }
}

// Actual implementation
class ConsoleLogger extends Observer  {
  public update(newState: InternalState) {
    console.log("New internal state update: ", newState);
  }
}

class InputElement extends Observable {
  public click():void {
    this.state = { event: "click" };
    this.notify();
  }
}

const input = new InputElement();
input.addObserver(new ConsoleLogger());
input.click();
```

With two abstract classes a developer can define the Observer which is going to represent the objects that react to changes on the Observable entity.

The beauty of this pattern is that it allows developers to know and react to the internal state of the Observable without having to mess with its internal code.
