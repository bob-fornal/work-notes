
import { SocketService } from "./pattern--003-websocket-via-ws.js";
import { MockWebSocketWS } from './_spec/mock-websocket-ws.spec.js';

describe('SocketService', () => {
  let service;

  const config = {
    host: 'ws://localhost:8080'
  };
  
  beforeEach(() => {
    service = new SocketService(MockWebSocketWS, config);
  });

  it('expects SocketService to exist', () => {
    expect(service).toBeTruthy()
  });

  it('expects "receiveMessage" to pass data to message observable', () => {
    const data = 'data';
    let result = null;
    service.messages.subscribe((_data) => {
      result = _data;
    });

    service.receiveMessage(data);
    expect(result).toEqual(data);
  });

  it('expects "handleMessages" to take data and console', () => {
    const data = 'data';

    service.handleMessages(data);
    expect(console.log).toHaveBeenCalledWith('received: data');
  });

  it('expects "handleSendMessage" to take data and pass it to the socket', () => {
    const data = 'data';
    spyOn(service.socket, 'send').and.stub();

    service.handleSendMessage(data);
    expect(service.socket.send).toHaveBeenCalledWith(data);
  });

  it('expects "send" to pass data to socket via on', () => {
    const data = 'data';
    spyOn(service.socket, 'on').and.stub();

    service.send(data);
    expect(service.socket.on).toHaveBeenCalledWith('open', jasmine.any(Function));
  });

});
