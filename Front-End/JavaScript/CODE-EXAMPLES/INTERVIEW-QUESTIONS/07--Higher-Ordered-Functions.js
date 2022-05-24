
// --=====================================================
// 7. Higher-Order Functions (first-class citizens)

const callback = () => {
  console.log('Firing Callback');
};
const higherOrderTest = (fn) => {
  console.log('Function does something');
  fn();
};
higherOrderTest(callback);

class ApiService {

  data = [];
  hasTriggeredGet = false;

  constructor() {}

  getNames1 = () => {
    fetch('http://api-address.com/apis/names')
      .then(function (response) {
        this.data = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        this.hasTriggeredGet = true;
      });
  };

  getNames2 = async () => {
    try {
      const data = await fetch('http://api-address.com/apis/names');
      const adjusted = await this.getAddressesForNames(data);
      this.data = adjusted;
    } catch (error) {
      console.log('getNames2', error);
    } finally {
      this.hasTriggeredGet = true;
    }
  };

  getAddressesForNames = async (data) => {
    try {
      const addresses = await fetch('http://api-address.com/apis/names', { names: data });
      const result = data.map((datum, index) => {
        datum.address = addresses[index];
      });
      return result;
    } catch (error) {
      console.log('getAddressesForNames', error);
    }
  };

}
