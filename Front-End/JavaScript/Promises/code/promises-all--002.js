
export class PromiseAllHandler002 {

  promise1 = Promise.resolve(3);
  promise2 = 42;
  promise3resolve = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('after');
    }, 100);
  });
  promise3reject = new Promise((_, reject) => {
    setTimeout(() => {
      reject('error here!');
    }, 100);
  });
  
  all1 = [ this.promise1, this.promise2, this.promise3resolve ];
  all2 = [ this.promise1, this.promise2, this.promise3reject ];
  
  handle = (promises) => Promise.all(promises);

  handleWithResolve = async () => {
    try {
      const result = await this.handle(this.all1);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  handleWithReject = async () => {
    try {
      const result = await this.handle(this.all2);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

}

const initializer = () => {
  const allHandler = new PromiseAllHandler002();
  allHandler.handleWithResolve();
  allHandler.handleWithReject();  
};
initializer();
