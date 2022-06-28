
/*
First example (return bar();) returns ...
  Error: BEEP BEEP
    at bar

Second example (return await bar();) returns ...
  Error: BEEP BEEP
    at bar
    at async foo
*/

(function () {
  async function foo() {
    // return bar();
    return await bar();
  }

  async function bar() {
    await Promise.resolve();
    throw new Error('BEEP BEEP');
  }

  foo().catch(error => console.log(error.stack));
})()
