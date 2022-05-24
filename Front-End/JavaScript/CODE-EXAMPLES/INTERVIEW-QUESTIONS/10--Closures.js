
// --=====================================================
// 10. Closures - Closures is an ability of a function to
// remember the variables and functions that are declared
// in its outer scope.

function objectFunction () {
  var obj1 = { name: 'Bob', age: 54 };

  return function () {
    console.log(obj1.name, obj1.age);
  }
}

const initialClosure = objectFunction();
initialClosure();
