# Angular versus React

## Standards

> If you’ve seen one Angular project, you’ve seen every Angular project.

The complete opposite can be said of React. If you’ve seen one React project, you’ve seen one React project. Angular has a set of standards that will carry over to every project you do. To know where API calls are, they are probably going to be in a service file. To know where the main pages are, look at the routing file. There is a right and a wrong way to do things in Angular, which keeps projects from going off the rails.

## Extensibility

With a bunch of very similar web applications, it takes little effort to be able to share similar components across applications. Angular even makes it easy to be able to create component libraries or be able to manage a bunch of projects from a single repo using one codebase.

## Command Line Interface (CLI)

What comes with Angular out of the box?

* Build config
* Testing config
* Routing
* Lazy-loading

## Angular Schematics

Schematics installs for third-party libraries you may want to add and scaffolds them.

## Upgrading

Difficulty upgrading is one of the biggest challenges, and it is not reflective of what Angular is now. It is effortless to upgrade to the latest version of Angular nowadays.

```script
ng update @angular/core
```

It will install the latest version of all the Angular core libraries and do any updates it can.

## Build Size and Runtime Speed

> The build is too big, and the runtime is slower.

This used to be true, but not so much anymore. In the modern world, any production-ready Angular project and React project will be roughly the same size.
