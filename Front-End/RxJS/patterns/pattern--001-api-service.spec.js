
import * as rxjs from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { ApiService } from './pattern--001-api-service.js';

describe('Api Calls Test Coverage', () => {

  let service;
  let testable = { ajax };

  beforeEach(() => {
    service = new ApiService();
    service.rxjs.ajax = testable.ajax;
    service.rxjs.lastValueFrom = rxjs.lastValueFrom;
  });

  it('expects ApiService "getCatFacts" to trigger an api call', async () => {
    const data = { data: 'DATA' };
    const res = { response: 'RESPONSE' };
    spyOn(service.rxjs, 'ajax').and.returnValue(rxjs.of(data));
    spyOn(service.rxjs, 'lastValueFrom').and.returnValue(Promise.resolve(res));
    spyOn(service.data, 'next').and.stub();
    
    await service.getCatFactData();
  
    expect(service.rxjs.ajax).toHaveBeenCalled();
    expect(service.rxjs.lastValueFrom).toHaveBeenCalled();
    expect(service.data.next).toHaveBeenCalledWith('RESPONSE');
  });

});
