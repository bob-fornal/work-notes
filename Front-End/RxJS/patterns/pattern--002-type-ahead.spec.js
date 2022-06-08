
import { TypeAhead } from "./pattern--002-type-ahead.js";

describe('TypeAhead', () => {
  let component;

  beforeEach(() => {
    component = new TypeAhead();
  });

  it('expects TypeAhead to exist', () => {
    expect(component).toBeTruthy();
  });

  it('expects "getContinents" to return empty array with no keys', () => {
    const keys = '';

    const result = component.getContinents(keys);
    expect(result).toEqual([]);
  });

  it('expects "getContinents" to return a correct array', () => {
    const keys = 'america';
    const expected = [ 'north america', 'south america' ];

    const result = component.getContinents(keys);
    expect(result).toEqual(expected);
  });

  it('expects "handleInputResults" to take data and simple console.log it out', () => {
    const data = 'DATA';

    component.handleInputResults(data);
    expect(console.log).toHaveBeenCalledWith('--- result', data);
  });

});
