// --=====================================================
// 8. "this"
// The “this” keyword refers to the object that the function is a property
// of. The value of “this” keyword will always depend on the object that is
// invoking the function.

const testThisOne = () => {
  console.log(this);
};
// testThisOne();

class TestThis {
  keepValue = 0;

  constructor(value) {
    this.keepValue = value;
  }

  trigger = () => {
    console.log(this);
  };
}
const testThisTwo = new TestThis(2);
const testThisThree = new TestThis(3);
// testThisTwo.trigger();
// testThisThree.trigger();
// testThisTwo.trigger();
// testThisThree.trigger();

const testThisFour = {
  name: 'Bob',
  getName: function() {
    return this.name;
  }
};
// console.log(testThisFour.getName());
