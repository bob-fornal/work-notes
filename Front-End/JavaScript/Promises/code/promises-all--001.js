
export class PromiseAllHandler001 {
  
  userIds = [ 'bob001', 'jen001', 'tim002', 'beth003', 'patrick001' ];

  asyncGetData = async (id) => {
    return new Promise((resolve, _) => {
      const randomTime = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
      setTimeout(() => {
        resolve(`retrieved id: ${ id } in ${ randomTime }ms`);
      }, randomTime);
    });
  };

  slowMethod = async (userIds, name) => {
    console.time(name);
    const results = [];
    for (let i = 0, len = userIds.length; i < len; i++) {
      const response = await this.asyncGetData(userIds[i]);
      results.push({ id: userIds[i], response });
    }
    return results;
  };

  fastMethod = async (userIds, name) => {
    console.time(name);
    const allPromises = userIds.map(async (userId) => {
      const response = await this.asyncGetData(userId);
      return { id: userId, response };
    });
    return Promise.all(allPromises);
  };

}

const initializer = async () => {
  const handler = new PromiseAllHandler001();
  const dataSlow = await handler.slowMethod(handler.userIds, 'slow');
  console.timeEnd('slow');
  const dataFast = await handler.fastMethod(handler.userIds, 'fast');
  console.timeEnd('fast');
  console.log(dataSlow, dataFast);  
};
initializer();
