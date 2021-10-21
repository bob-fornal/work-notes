# Getting Started with TypeScript

## Why use TypeScript rather than JavaScript?

- Javascript can feel messy, not maintainable and easy to work with.
- Javascript Code Encapsulation (Spaghetti Code to Ravioli Code).
- Javascript provides a dynamic type system.
- Migrating from Server-Side apps to Client-Side apps can be challenging.
- Compiling code down is a standard pattern in code development.

### Features

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

- Cross-Browser compatible.
- Open Source
- Tool Support

### Key Features

- Supports standard JavaScript code.
- Provides static typing.
- Encapsulation through classes and modules.
- Support for constructors, properties, and functions.
- Define interfaces.
- => function support (arrow functions, lambdas).
- Intellisense and syntax checking.

### Syntax, Keywords and Code Hierarchy

Follows the same syntax rules:

- `{}` brackets define blocks of code
- Semi-colons end code expressions

### Code Hierarchy

- Module (naming container)
- Class (container) / Interface

    - Fields
    - Constructor
    - Properties
    - Functions

### Tooling / Framework Options

- Node.js
- Visual Studio (TypeScript and Web Essentials)
- TypeScript Playground ([http://www.typescriptlang.org](http://www.typescriptlang.org/))
- tsc.exe

### Typing, Variables, and Functions

**Grammar, Declarations, and Annotations**

Grammar: Type Inference

```javascript
var num = 2; // type inference that this is now a number
```

Grammar: Type Annotations

```typescript
var num: number = 2; // this is now a number
```

Grammar: Function Definition

```typescript
init : (s: string, p: string, c: string) => void // The init is of type ... and returns void.
    = function (startButton, pauseButton, clearButton) {
    ...
    };
```

### Typing and Ambient Declarations

**Ambient declarations and Type Definition Files**

TypeScript CodePlex site: [http://typescript.codeplex.com](http://typescript.codeplex.com/)

[http://definitelytyped.org/tsd/](http://definitelytyped.org/tsd/)

TypeScript:

```javascript
/// <reference path="jquery.d.ts" />
declare var $;
var data = "Hello John";
$("div").text(data);
```

JavaScript

```javascript
var data = "Hello John";
$("div").text(data);
```

### **Any and Primitive Types**

Represents any JavaScript value:

```typescript
var data: any;
var info;
```

Primitive Types:

(Number)

```typescript
var age: number = 2;
var score: number = 98.25;
var rating = 98.25;
```

(Boolean)

```typescript
var hasData: bool = true;
var isReady = true;
```

(String)

```typescript
var firstName: string = 'John';
var lastName = 'Papa';
```

(Arrays and Indexers)

```typescript
var names: string[] = ['John', 'Dan', 'Aaron', 'Fritz'];
var firstPerson: string;
firstPerson = names[0]; // indexer
```

(Null)

Null type is a subtype of all primitives (except void and undefined)

```typescript
var num: number = null;
var str: string = null;
var isHappy: bool = null;
var customer: {} = null;
```

(Undefined)

Undefined type is a subtype of all types

```typescript
var age: number;
var customer = undefined;
```

### Object Types

Examples

- Functions, class, module, interface, and literal types

May contain

- Properties

    - Public or Private
    - Required or Optional

- Call signatures
- Construct signatures
- Index signatures

(Object Literals)

```typescript
var square = { h: 10, w: 20 };
var points: Object = { x: 10, y: 20 };
```

(Functions)

```typescript
var multiply = function (x: number) {
    return x * x;
};

var multiplyMore: Function;
multiplyMore = function (x: number) {
    return x * x;
};

var squareIt = function(
    rect: { h: number; w?: number; }) {
    if (rect.w === undefined) {
        return rect.h * rect.h;
    }
    return rect.h * rect.w;
}
```

### Functions

- Parameter Types: required and optional
- Arrow Function Expressions:

    - Compact form of function expressions
    - Omit the function keyword
    - Have scope of "this"
- Void
    - Used as the return type for functions that return no value

```typescript
var myFunc = function (h: number, w: number) {
    return h * w;
}
var myFunc = (h: number, w: number) => h * w;

var greetMe : (msg: string) => void;
greetMe = function(msg) {
    console.log(msg);
}
```

### Functions and Interfaces

```typescript
interface SquareFunction {
    (x: number): number;
}

var squareItBasic: SquareFunction =
    function(num) => num * num;

interface Rectangle {
    h: number;
    w?: number;
}

var squareIt: (rect: Rectangle) => number;
// (rect: { h: number; w?: number; }) => number;

var rectA = { h: 7 };
var rectB = { h: 7, w: 12 };

squareIt = function (rect) {
    if (rect.w !== undefined) {
        return rect.h * rect.w;
    }
    return rect.h * rect.h;
}

interface Person {
    name: string;
    age?: number;
    kids: number;
    calcPets: () => number;
    makeYounger: (years: number) => void;
    reet: (msg: string) => string;
}

var p: Person = {
    name: "Colleen',
    age: 40,
    kids: 4,
    calcPets: function () {
        return this.kids * 2;
    },
    makeYounger: function (years: number) {
        this.age -= years;
    },
    greet: function (msg: string) {
        return msg + ', ' + this.name;
    }
};

p.calcPets();
p.makeYounger(15);
p.greet('Good day to you');
```

### Classes and Interfaces

**Defining Classes**

The Role of Classes in TypeScript

- Classes act as containers for different members.
- Class members are public by default.
- Properties act as filters and can have get or set blocks.
- Types can be extended using the TypeScript "extends" keyword.

**TypeScript Class Members**

- Fields
- Constructors
- Properties
- Functions

```typescript
class Car {
    private _engine: string;

    constructor (engine: string) {
        this._engine = engine;
    }

    get engine(): string {
        return this._engine;
    }
    set engine(value: string) {
        if (value == undefined) throw "Supply an Engine!";
        this._engine = value;
    }

    start() {
        return "Started " + this._engine;
    }
    stop() {
        return "Stopped " + this._engine;
    }
}

class Car {
    constructor (public engine: string) { }
}
```

**Using Complex Types**

```typescript
class Engine {
    constructor (public horsePower: number, public engineType: string) { }
}

class Car {
    private _engine: Engine;

    constructor (engine: Engine) {
        this._engine = engine;
    }

    ...
}
```

**Property Limitations**

Targeting older Browsers

- Tools | Options | Web Essentials | TypeScript (Compile to ES3)

**Casting Types**

```typescript
// Fails
var table: HTMLTableElement = document.createElement('table');

// Pass: Cast HTMLElement to HTMLTableElement
var table: HTMLTableElement = <HTMLTableElement>document.createElement('table');
```

**Type Definition Files**

- As we work with the DOM or other libraries, we need a Type Definition file (*.d.ts file).
- lib.d.ts file is built-in out of the box for the DOM and JavaScript.
- Additional Type Definition files for 3rd party scripts can be found at: Definitely Typed.

**Extending Types**

Auto

- Truck (extends Auto)
- SUV (extends Auto)

```typescript
class Auto {
    engine: Engine;
    constructor (engine: Engine) {
        this.engine = engine;
    }
}

class Truck extends Auto {
    fourByFour: boolean;
    constructor (engine: Engine, fourByFour: boolean) {
        super(engine);
        this.fourByFour = fourByFour;
    }
}
```

**Using Interfaces**

- Ensures consistency when code is written. Not implemented in generated code.
- An interface is a code "contract" that other objects must implement.
- Interfaces ensure that proper data is passed.

```typescript
interface IEngine {
    start(callback: (startStatus: boolean, engineType: string) => void) : void;
    stop(callback: (stopStatus: boolean, engineType: string) => void) : void;
}

interface IAutoOptions {
    engine: IEngine;
    basePrice: number;
    state: string;
    make?: string // Optional
    model?: string // Optional
    year?: string // Optional
}
```

**Extending an Interface**

```typescript
interface IAutoOptions {
    engine: IEngine;
    basePrice: number;
    state: string;
    make?: string // Optional
    model?: string // Optional
    year?: string // Optional
}

interface ITruckOptions extends IAutoOptions {
    bedLength?: string;
    fourByFour: boolean;
}
```

**Implementing Modules**

- Assist with separation of code.
- Without modules, the module is applied as part of the Global Namespace.
- Testable
- Maintainable
- Reusable

```typescript
namespace dataservice {
    // code
};
```

**Extending Internal Modules**

```typescript
namespace Shapes {
    export class Rectangle {
        constructor (public height: number, public width: number) { }
    }
}

namespace Shapes {
    export class Circle {
        constructor (public radius: number) { }
    }
}
```

**Referencing Internal Modules**

- Modules separated across files.
- Must load them in the proper sequence.
    - Script tags
- Reference them `/// <reference path="shapes.ts" />`
    - Reference is only for the editor

**Importing External Modules and Managing Large Applications**

- Separately loadable modules.
- Exported entities can be imported into other modules.
    - `import viewmodels = require('./viewmodels');`
    - Sequencing scripts is difficult.
- **require.js**

```typescript
require(["bootstrapper"],
    (bootstrapper) => {
    bootstrapper.run();
});
```