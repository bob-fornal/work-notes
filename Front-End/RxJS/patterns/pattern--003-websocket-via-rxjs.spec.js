
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

});
