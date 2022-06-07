
export class FileClass {

  storedValue = null;

  constructor() {}

  add = (a, b) => a + b;

  setValue = (value) => {
    this.storedValue = value;
  };

  getValue = () => this.storedValue;

}

// const fc = new FileClass();
// console.log(fc.add(3,4));
