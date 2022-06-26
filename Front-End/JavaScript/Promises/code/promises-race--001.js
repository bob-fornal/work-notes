
export class PromiseRaceHandler {

  promise1 = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('quick');
    }, 100);
  });
  promise2 = new Promise((resolve, _) => {
    setTimeout(() => {
      resolve('slow');
    }, 500);
  });
  promises = [ this.promise1, this.promise2 ];

  handle = (promises) => Promise.race(promises);

  handleRace = async () => {
    try {
      const results = await this.handle(this.promises);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

}

const initializer = () => {
  const handler = new PromiseRaceHandler();
  handler.handleRace();
};
initializer();
