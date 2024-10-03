# Structural Patterns

Structural Patterns deal with structuring the relationship between different components (or classes) and forming new structures in order to provide new functionalities. Examples of structural patterns are Composite, Adapter and Decorator.

## Decorator Pattern

The decorator pattern attemps to add behavior to an already existing object during run-time. Think of this as dynamic inheritance because even though a new class is not created in order to add the behavior, a new object is created with the extended functionality.

Composition allows encapsulation of custom behavior inside different classes and then use the pattern to create new instances of those classes by passinng the originaal object to their constructor.

```typescript
abstract class Animal {
  abstract move(): void;
}

abstract class SuperDecorator extends Animal {
  protected comp: Animal;
  
  constructor(decoratedAnimal: Animal) {
    super();
    this.comp = decoratedAnimal;
  }
  
  abstract move(): void;
}

class Dog extends Animal {
  public move(): void {
    console.log('Moving the dog...');
  }
}

class SuperAnimal extends SuperDecorator {
  public move(): void {
    console.log('Starts flying...');
    this.comp.move();
    console.log('Landing...');
  }
}

class SwimmingAnimal extends SuperDecorator {
  public move(): void {
    console.log('Jumps into the water...');
    this.comp.move()
  }
}

const dog = new Dog();

console.log('--- Non-decorated attempt: ');
dog.move();

console.log('--- Flying decorator --- ');
const superDog = new SuperAnimal(dog);
superDog.move();

console.log('--- Now let's go swimming --- ');
const swimmingDog = new SwimmingAnimal(dog);
swimmingDog.move();
```

The SuperDecorator class is indeed, extending the `Animal` class, the same class that the `Dog` class extends. This is because the decorator needs to provide the same public interface that the class its trying to decorate.

The `SuperDecorator` class is abstract which means a developer does not really work with it, they just use it to define the constructor which will keep the copy of the original object in a protected property. The overwrite of the public interface is done inside the custom decorators.

`SuperAnimal` and `SwimmingAnimal` are the actual decorators, and they are the ones that add the extra behavior.

The benefit of having this setup is that a developer can mix both behaviors into one, thanks to the fact that all decorators are indirectly extending the `Animal` class, as well.

## Composite Pattern

This pattern allows the handling of a set of similar components as a group, being able to execute a particular operation on them and aggregating the result from them all.

The interesting part about this pattern though, is that it is not a simple group of object, it can contain entities or groups of entities, and each group can at the same time, contain more groups.

```typescript
interface IProduct {
  getName(): string;
  getPrice(): number; 
}

// The 'Component' entity
class Product implements IProduct {
  private price: number;
  private name: string;
  
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
  
  public getPrice(): number {
    return this.price;
  }
  
  public getName(): string {
    return this.name;
  }
}

// The 'Composite' entity 
class Box implements IProduct {
  private products: IProduct[] = [];
    
  contructor() {
    this.products = [];
  }
    
  public getName(): string {
    return 'A box with ' + this.products.length + ' products';
  } 
    
  add(p: IProduct):void {
    console.log('Adding a ', p.getName(), 'to the box');
    this.products.push(p);
  }

  getPrice(): number {
    return this.products.reduce((curr: number, b: IProduct) => (curr + b.getPrice()), 0);
  }
}

// Using the code ...
const box1 = new Box();
box1.add(new Product('Bubble gum', 0.5));
box1.add(new Product('Samsung Note 20', 1005));

const box2 = new Box();
box2.add( new Product('Samsung TV 20in', 300));
box2.add( new Product('Samsung TV 50in', 800));

box1.add(box2);

console.log('Total price: ', box1.getPrice());
```

Thus, the normally called “component” element, is the Product class, otherwise known as the “leaf” element inside the tree. This is because this entity has no children. While the `Box` class is the composite itself, having a list of children, all of them implementing the same interface. That last part is because we want to be able to iterate over all children and execute the same method (remember that here a child can be another, smaller composite).