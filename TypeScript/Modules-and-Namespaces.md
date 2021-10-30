# Modules and Namespaces

* Internal Modules became "namespaces."
* External Modules became "modules."
* Support for ES2015 Modules syntax.

## Modules

* Native support in Node.js
* Browser support with module loader.
* Supports ES2015 Module syntax.
* Facilitates code reuse.

### Supported Module Formats

* CommonJS (Node.js)
* Asynchronous Module Definition (AMD, Browser)
* Universal Module Definition (UMD, Node.js, and AMD)
* SystemJS (AMD and custom)
* ES2015

### Module Loaders

* Require.js (AMD)
* SystemJS (AMD, CommonJS, ES21015)

### Exporting from a Module

```typescript
// periodicals.ts
export interface Periodical {
  issueNumber: number;
}
export class Magazine implements Periodical {
  issueNumber: number;
}
export function getByIssueNumber(issue: number): Magazine {
  // retrieve and return a magazine
}

// ... OR ...
// No export at beginning of line ...
export { Periodical, Magazine, getByIssueNumber as getMagazine };
```

### Importing from a Module

```typescript
// news.ts
import { Magazine, GetMag as GetMagazine } from './periodicals.ts';
let newsMag: Magazine = GetMagazine('...');
```

### Default Exports

Single element to be exported; `import` can occur without knowing the element's name.

```typescript
// movie.ts
export default class {
  title: string;
  director: string;
}

// kids.ts
import AnimatedMovie from './movie';
let cartoon = new AnimatedMovie();
```

## Namespaces

* No special loader required.
* Prevent global namespace pollution.
* Best for smaller client applications.

## Defining Namespaces

```typescript
namespace Membership {
  export function addMember(name: string) {
    // add a member
  }

  export namespace Cards {
    export function issueCards(memberNumber: number) {
      // issue cards
    }
  }
}

Membership.addMember('...');
Membership.Cards.issueCards(...);
```

### Triple-Slash References

```typescript
/// <reference path="utilities.ts" />
import util utlitiy.fees;

let fee = util.lateFees(10);

/// <reference path="membership.ts" />
```

**NOTE**: Normal tsc command will have issues; single file compile will work with browser and Node.js

```script
> tsc --target ES5 app.ts --outFile out.js
> node out.js
```
