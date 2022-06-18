
export class MockWebSocketServer {
  settings = {};
  clients = [];

  onerror = null;

  constructor (settings) {
    this.settings = settings;
  }

  on = (type, fn) => console.log(type, fn);
}

export const MockWebSocket = {
  OPEN: 'OPEN'
}
