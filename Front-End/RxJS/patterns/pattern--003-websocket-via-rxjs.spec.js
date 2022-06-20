
import { SocketService } from "./pattern--003-websocket-via-rxjs.js";
import { MockWebSocketRxJS } from './_spec/mock-websocket-rxjs.spec.js'
import WebSocket from 'ws';

describe('SocketService', () => {
  let service;

  const config = {
    url: 'ws://localhost:8080',
    WebSocketCtor: WebSocket
  };
  
  beforeEach(() => {
    service = new SocketService(MockWebSocketRxJS, config);
  });

  it('expects SocketService to exist', () => {
    expect(service).toBeTruthy()
  });

  it('expects "handleMessages" to take data and console', () => {
    const data = 'data';

    service.handleMessages(data);
    expect(console.log).toHaveBeenCalledWith('received: data');
  });

  it('exects "send" to take data and pass it to the socket', () => {
    const data = 'data';
    spyOn(service.socket, 'next').and.stub();

    service.send(data);
    expect(service.socket.next).toHaveBeenCalledWith(data);
  });

});
