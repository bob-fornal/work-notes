
import { DemoComponent } from './pattern--001-api-call.js';

describe('DemoComponent', () => {
  let component;

  beforeEach(() => {
    component = new DemoComponent();
    spyOn(component.apiService, 'getCatFactData').and.stub();
  });

  it('expects DemoComponent to exist', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handleData" to assign data', () => {
    const data = { key: 'ITEM' };

    component.handleData(data);
    expect(component.data).toEqual(data);
  });

  it('expects "triggerGetData" to call the api service', () => {
    component.triggerGetData();
    expect(component.apiService.getCatFactData).toHaveBeenCalled();
  });

});