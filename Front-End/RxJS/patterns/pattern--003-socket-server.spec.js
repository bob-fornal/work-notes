
import { SocketServer } from "./pattern--003-socket-server.js";

import { MockWebSocket, MockWebSocketServer } from './_spec/mock-websocket-server.spec.js';

describe('SocketServer', () => {
  let server;

  beforeEach(() => {
    server = new SocketServer(MockWebSocketServer, MockWebSocket);
  });

  it('expects SocketServer to exist', () => {
    expect(server).toBeTruthy()
  });

  it('exects "init" to new up WebSocketServer and handle connection', () => {
    spyOn(server.wss, 'on').and.stub();

    server.init();
    expect(server.wss).not.toBeNull();
    expect(server.wss.on).toHaveBeenCalledWith('connection', jasmine.any(Function));
  });

  it('expects "handleConnection" to take a web socket and set it up', () => {
    const ws = {
      on: () => ({}),
      onerror: null
    };
    spyOn(ws, 'on').and.stub();

    server.handleConnection(ws);
    expect(ws.on).toHaveBeenCalledWith('message', jasmine.any(Function));
    expect(ws.on).toHaveBeenCalledWith('close', jasmine.any(Function));
    expect(ws.onerror).toEqual(jasmine.any(Function));
  });

  it('expects "handleMessage" to take data and trigger a client call', () => {
    const client = { key: 'CLIENT' };
    server.wss.clients = [client];
    spyOn(server, 'handleIndividualMessages').and.stub();
    const data = 'DATA';
    const isBinary = false;

    server.handleMessage(data, isBinary);
    expect(server.handleIndividualMessages).toHaveBeenCalledWith(client, data, isBinary);
  });

  it('expects "handleIndividualMessages" to send if the state is open', () => {
    const client = {
      readyState: 'OPEN',
      send: () => ({})
    };
    spyOn(client, 'send').and.stub();
    const data = 'DATA';
    const isBinary = false;

    server.handleIndividualMessages(client, data, isBinary);
    expect(client.send).toHaveBeenCalledWith(data, { binary: isBinary });
  });

  it('expects "handleIndividualMessages" to not send if the state is not open', () => {
    const client = {
      readyState: 'NOT-OPEN',
      send: () => ({})
    };
    spyOn(client, 'send').and.stub();
    const data = 'DATA';
    const isBinary = false;

    server.handleIndividualMessages(client, data, isBinary);
    expect(client.send).not.toHaveBeenCalled();
  });

  it('expects "handleClose" to console the state', () => {
    server.handleClose();
    expect(console.log).toHaveBeenCalled();
  });

  it('expects "handleError" to console the state', () => {
    server.handleError();
    expect(console.log).toHaveBeenCalled();
  });

});
