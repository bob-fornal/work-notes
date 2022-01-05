
(() => {
  return {
    fn: () => console.log('Hello World 1')
  }
})()
// Returns { fn: f }

(() => {
  return
    {
      fn: () => console.log('Hello World 2')
    }
})()
// Returns undefined
// SyntaxError
// TypeError (intermediate value)(...) is not a function