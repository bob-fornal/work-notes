# Creational Patterns

Creational Patterns focus on class instantiation and making life easier in order to create new entities. These are the Factory method, Singleton and Abstract Factory.

## Singleton Pattern

The singleton pattern is probably one of the most well-known design patterns. It is a creational pattern because it ensures that no matter how many times a developer tries to instantiate it, only have one instance is available.

This is a great pattern to handle things such as database connections, rather than having to re-connect on every user request.


```typescript
// Simulate a database connection class
class DatabaseConnection {

  protected static instance: DatabaseConnection | null = null;
  private id: number = 0;

  constructor() {
    // ... database connection logic
    this.id = Math.random(); // the ID could represent the actual connection to the db
  }
    
  public getID(): number {
    return this.id;
  }

  public static getInstance(): DatabaseConnection {
    if(!this.instance) {
      this.instance = new DatabaseConnection();
    }
    return this.instance;
  }
}

const connections = [
  DatabaseConnection.getInstance(),
  DatabaseConnection.getInstance(),
  DatabaseConnection.getInstance(),
  DatabaseConnection.getInstance(),
  DatabaseConnection.getInstance()
];

connections.forEach(connetion => {
  console.log(connection.getID());
});
```

Now, granted, the class cannot be directly instantiated, but the `getInstance` method ensures there will not be more than one instance. The id property could easily be thought of as thee actual connection, and this little test is showing how that *connection* is always going to be the same one, no matter how many times the `getInstance` method is called.

## Factory Method

The Factory Method pattern is a creational pattern, just like Singleton. However, instead of directly working on top of the object, this pattern only takes care of managing its creation.

```typescript
interface Vehicle {
  move(): void;
}

// The "move" method is where our "business logic" would live
class Car implements Vehicle {
  public move(): void {
    console.log('Moving the car!');
  }
}

class Bicycle implements Vehicle {
  public move(): void {
    console.log('Moving the bicycle!');
  }
}

class Plane implements Vehicle {
  public move(): void {
    console.log("Flying the plane!");
  }
}

// VehicleHandler is "abstract" because no one is going to instantiate it
abstract class VehicleHandler {

  //This is the method real handlers need to implement
  public abstract createVehicle(): Vehicle;

  //This is the method we care about, the rest of the business logic resides here
  public moveVehicle(): void {
    const myVehicle = this.createVehicle();
    myVehicle.move();
  }
} 

//Here is where we implement the custom object creation
class PlaneHandler extends VehicleHandler{
  public createVehicle(): Vehicle {
    return new Plane();
  }
}

class CarHandler extends VehicleHandler{
  public createVehicle(): Vehicle {
    return new Car();
  }
}

class BicycleHandler extends VehicleHandler{
  public createVehicle(): Vehicle {
    return new Bicycle();
  }
}

/// User code ...
const planes = new PlaneHandler();
const cars = new CarHandler();

planes.moveVehicle();
cars.moveVehicle();
```

Essentially in the end we care about the custom handlers.

The beauty of this pattern, is that if a developer wanted to add a new vehicle type, all they would have to do is add its vehicle class and its handler class, without adding to the lines of code of any other class.
