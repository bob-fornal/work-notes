
import { ajax } from 'rxjs/ajax';

// Solves CORS issue in Node
// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const XHR2 = require('xhr2');

console.log(`--- ajax "Cat Facts" ---`);
ajax({
	url: 'https://catfact.ninja/fact',
	method: 'GET',
	crossDomain: true,
  withCredentials: true,
	createXHR: () => {
		return new XHR2();
	}
}).subscribe({
  next: (res) => console.log(res.response),
  error: (error) => console.log(error),
  complete: () => console.log('--- complete ---')
});
