# Compiler Options and Project Configuration

* Command Line (tsc)
* Options inside IDE
* Build Tasks
* Inside `tsconfig.json` file

```script
--m --module (format)
--moduleResolution (node or classic)
--t --target (JavaScript outout)
--w --watch (watch mode)
--ourDir (compiled output)
--noImplicitAny
```

## Role of `tsconfig.json`

* Marks the root of a TypeScript project.
* Specifies TypeScript Compiler options.
* Specifies files to include and exclude from the project.

Structure of `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "outDir": "js"
  },
  "exclude": [
    "node_modules",
    "lib"
  ],
  "files": [
    "app.ts",
    "classes.ts"
  ]
}
```