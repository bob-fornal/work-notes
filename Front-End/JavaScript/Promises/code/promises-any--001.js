
export class PromiseAnyHandler {

  promise1 = Promise.reject(0);
  promise2 = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('quick');
    }, 100);
  });
  promise3 = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('slow');
    }, 500);
  });
  promises = [ this.promise1, this.promise2, this.promise3 ];

  handle = (promises) => Promise.any(promises);

  handleAny = async () => {
    try {
      const result = await this.handle(this.promises);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

}

const initializer = () => {
  const handler = new PromiseAnyHandler();
  handler.handleAny();
};
initializer();
