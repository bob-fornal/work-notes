
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import XHR2 from 'xhr2';

export class ApiService {

  data$ = new BehaviorSubject({});
  rxjs = { ajax, lastValueFrom };

  ajaxURLObject = {
    url: 'https://catfact.ninja/fact',
    method: 'GET',
    crossDomain: true,
    withCredentials: true,
    createXHR: () => {
      return new XHR2();
    }
  };

  getCatFactData = async () => {
    const apiCall$ = this.rxjs.ajax(this.ajaxURLObject);
    const res = await this.rxjs.lastValueFrom(apiCall$);
    this.data$.next(res.response);
  };

}