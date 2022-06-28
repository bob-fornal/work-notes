
class ApiService {

	url = 'https://divercity-test.herokuapp.com/jobs';

  /*
    The async/await pattern wraps the returned value in an implicit
    promise (await). Given this, all of these functions are equivalent.
    
    Remember that .json() returns a promise that must be resolved.
  */
	getData1 = async () => {
  	return (await fetch(this.url)).json();
  };

  getData2 = async () => {
  	return await (await fetch(this.url)).json();
  };

  getData3 = async () => {
  	const data = await (await fetch(this.url)).json();
    return data;
  };

}

const initializer = async () => {
  const apiService = new ApiService();
  console.log(await apiService.getData1());
};
initializer();
