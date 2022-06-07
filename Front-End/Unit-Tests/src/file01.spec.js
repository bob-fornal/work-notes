
import { FileClass } from "./file01.js";

describe('File Class', () => {
  let service;

  beforeEach(() => {
    service = new FileClass();
  });

  it('expects "add" to add two number', () => {
    const a = 3;
    const b = 4;
    
    const result = service.add(a, b);
    expect(result).toEqual(7);
  });

  it('expects "setValue" to change stored value', () => {
    const value = 'Bob';

    service.setValue(value);
    expect(service.storedValue).toEqual(value);
  });

  it('expects "getValue" to return the stored value', () => {
    const value = 'Bob';
    service.storedValue = value;
    
    const result = service.getValue();
    expect(result).toEqual(value);
  });

});
