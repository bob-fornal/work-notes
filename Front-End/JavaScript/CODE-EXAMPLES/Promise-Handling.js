// These have to be standard functions, not fat-arrow
// for this to work properly.
let user = {
  username: 'Bob',
  sayHello1() {
    console.log(`1: ${ this.username }`);
  },
  sayHello2() {
    console.log(`2: ${ this.username }`);
  },
  sayHello3() {
    console.log(`3: ${ this.username }`);
  }
};

// Initial run to see if it is working.
user.sayHello1();

// Promise-Chain Version
setTimeout(user.sayHello1, 1000); // Hello, undefined.

// Solution 1: Wrapper
setTimeout(function() {
  user.sayHello2();
}, 1000);

// Vulnerable to change in function
user.sayHello2 = function() {
  console.log('Another Answer');
}

// Solution 2: Binding
setTimeout(user.sayHello3.bind(user), 1000);

// Fixed Vulnerability
user.sayHello3 = function() {
  console.log('And Another Answer');
}

let user2 = {
  username: 'Bob',
  sayHello1() {
    console.log(`1: ${ this.username }`);
  },
  sayHello2() {
    console.log(`2: ${ this.username }`);
  },
  sayHello3() {
    console.log(`3: ${ this.username }`);
  }
};

