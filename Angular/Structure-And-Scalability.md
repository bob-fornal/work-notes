# Structure and Scalability

The base folder structure should be something like this.

```script
|- Core
|   |- Constants
|   |- Interfaces
|   |- Services
|   |- Structures
|- Features
|- Pages
|- Shared
```

## Core

The `core` directory is the place to put services, injection tokens, constants, app configurations, pipes, interceptors, guards, auth service, and utilities that will be used application-wide.

## Features

**Keep the component tree inside the directories flat.** That means, if `ParentListComponent` is the parent and `ChildListItemComponent` is child, do not create `child-list-item` component inside the `parent-list` directory. The prefixed naming should be clear to indicate such a relation. The idea is to be able to see what components reside in the module at a glance.

## Pages

Pages directory is the most interesting part of this structure. Think of it like a *sink*, where feature modules fall into but nothing comes out. Dou do not declare any component other than the page.

Page controllers should have no (or minimal) business logic. They are merely the presenter and orchestrates components from business feature components. For the home page, it will contain a header, a hero section, articles, comments, contact, etc. sections — all coming from respective features.

## Notes

Since route declarations are parsed top-to-bottom, be sure to declare child paths before the parent path. This will ensure lazy-loading chunks fetched correctly. Otherwise, if you define the parent route first, then visiting any child route will also load the parent route’s module chunk unnecessarily.

Add the directory paths to the `tsconfig.json` file so that import paths in the application are shorter and nicer ...

```
// tsconfig.json
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@core/*": [ "src/app/core/*" ],
            "@features/*": [ "src/app/features/*" ],
            "@shared/*": [ "src/app/shared/*" ],
            "@environment/*": [ "src/environments/*" ]
        },
        "outDir": "./dist/out-tsc",
    ...
}
```

Now the imports will be aliased ... `import { Nice } from '@features/nice` instead of `import { Ugly } from './../../path/to/ugly`.
