
  const promise1 = Promise.all([ 1, 2, 3 ]);
  const promise2 = Promise.all([ 1, 2, 3, Promise.resolve(4) ]);
  const promise3 = Promise.all([ 1, 2, 3, Promise.reject(5) ]);

  handle = () => {
    setTimeout(() => {
      try {
        console.log(this.promise1);
        console.log(this.promise2);
        console.log(this.promise3);
      } catch (error) {
        console.log(error);
      }
    });
  };

}

const initializer = () => {
  const handler = new PromiseAllHandler003();
  handler.handle();
};
initializer();


// const promise1 = Promise.all([ 1, 2, 3 ]);
// const promise2 = Promise.all([ 1, 2, 3, Promise.resolve(4) ]);
// const promise3 = Promise.all([ 1, 2, 3, Promise.reject(5) ]);

// setTimeout(() => {
//   try {
//     console.log(this.promise1);
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(this.promise2);
//   console.log(this.promise3);
// });

