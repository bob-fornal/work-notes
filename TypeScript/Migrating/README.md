# Migrating from JavaScript to TypeScript

## Convert a JavaScript File to TypeScript

Before migrating, make sure to have certain configurations set up very early in the project. This includes setting up the `tsconfig.json` file and integrating TypeScript with all the tools.

## TypeScript Configuration File

Here is a good explanation of the role of the TypeScript configuration file from the official documentation:

> The presence of a tsconfig.json file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project.

Generate the file in the project with this simple command ...

```script
$ tsc --init
```

Here is a simple boilerplate configuration file that be used to start off a project ...

```json
{
  "include": [
    "./src/**"
    ],
  "compilerOptions": {
    "target": "es2020",
    "module": "es2020",
    "moduleResolution": "node",
    "allowJs": true,
    "strict": true,
    "noEmit": true
  }
}
```

In this configuration file, the TypeScript compiler is told to take into account all the files in the `src` folder and to compile them in the ES2020 syntax.

## Start Migrating JavaScript Files to TypeScript

First, all JavaScript files do not necessarily have to be migrated. Some can be kept in JavaScript format.

The first step in migrating to TypeScript is to rename the JavaScript files from `.js` to `.ts`. If using JSX, the files are renamed to `.tsx`. Open a newly created file in some code editor supporting TypeScript, there may be some errors. The objective here will be to get rid of those errors while still staying as close as possible to the TypeScript features.

## Cannot find a module

The first error might be that some modules are not be found in the import statements.

This just means that the modules are not defined in the declaration file in the project. Install those missing modules prefixed by `@types`. A package name prefixed by `@types` is, simply put, a customized version of that package for TypeScript. As an example, if TypeScript does complain that React is missing, install `@types/react`.

```script
$ npm install --save-dev @types/react
```

## Dealing with Types

As previously mentioned, one big advantage of using TypeScript is assigning types to variables. Doing so increases the readability of the program and makes it less prone to having bugs. Below are some remarks to keep in mind when assigning types to variables.

Dealing with the `any` type: The any type is the supertype of all types in TypeScript. It refers to a dynamic type. Using the `any` type is equivalent to removing type checking for a variable. This should be used only as a last resort because there is no type checking benefit when it is used.

Dealing with `null` or `undefined`: When some variable in the code can be `null` or `undefined`, explicitly tell TypeScript that it is not with the exclamation mark.

```typescript
function computeGlobalGrade(studentName: string | undefined | null) {
    const nameOne: string = studentName;
    // Typescript will complain that the student name might be null and cannot be assigned to a string

    const nameTwo: string = studentName!;
    // compiles fine because you tell compiler that null | undefined are excluded 
}
```

Typing a list of properties: If there is a list of properties like in a JavaScript Object, type them using either the `type` keyword or by creating an interface. Both are correct usages, but using interfaces provides the additional benefit usually used in Object-Oriented programming languages that they can be extended.

As an example, if converting a React component from JSX to TSX, and there is a PropTypes list defined like in the following ...

```typescript
const propTypes = {
  i18nCertText: PropTypes.string,
  isProjectsCompleted: PropTypes.bool,
  steps: PropTypes.string,
  superBlock: PropTypes.string
};
```

Convert it using either an interface in the TypeScript file as shown ...

```typescript
interface ClaimCertStepsProps {
  i18nCertText: string;
  isProjectsCompleted: boolean;
  steps: string;
  superBlock: string;
}
```

... or using the type keyword ...

```typescript
type ClaimCertStepsProps = {
  i18nCertText: string;
  isProjectsCompleted: boolean;
  steps: string;
  superBlock: string;
}
```

... and then use it in the component ...

```typescript
const ClaimCertSteps = ({
  isProjectsCompleted,
  i18nCertText,
  steps,
  superBlock
}: ClaimCertStepsProps): JSX.Element => {
  // code of the component
}
```

## Adding a List of Properties To an Object

One typical block of code found in JavaScript programs is dynamically adding properties to an object ...

```javascript
let students = {};
students.name = "ismail";
students.age = 15;
```

If the same code is used in TypeScript, the compiler will complain that the name and age properties does not exist on the students variable which has the type `{}`.

To get rid of this issue, define the properties inside the object ...

```typescript
let student = {
  name: "ismail",
  age: 15,
}
```

Or define the types of the properties in a separate interface ...

```typescript
interface SudentProperties {
  name?: string,
  age?: number
}

let student: SudentProperties = {};

student.name = "ismail";
student.age = 15;
```