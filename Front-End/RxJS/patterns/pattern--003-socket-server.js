
import WebSocket, { WebSocketServer } from 'ws';

export class SocketServer {

  webSocket = null;
  webSocketServer = null;

  wss = null;

  constructor(_WebSocketServer, _WebSocket) {
    this.webSocket = _WebSocket;
    this.webSocketServer = _WebSocketServer;
    
    this.wss = new this.webSocketServer({ port: 8080 });
    this.init();
  }

  init = () => {
    this.wss.on('connection', (ws) => this.handleConnection(ws));
    console.log('WebSocket server is running on port 8081');
  };

  handleConnection = (ws) => {
    console.log('New client connected');
    ws.on('message', this.handleMessage.bind(this));
    ws.on('close', this.handleClose.bind(this));
    ws.onerror = this.handleError.bind(this);
  };

  handleMessage = (data, isBinary) => {
    console.log(`Client has sent: ${ data }`);
    this.wss.clients.forEach((client) => this.handleIndividualMessages(client, data, isBinary));
  };

  handleIndividualMessages = (client, data, isBinary) => {
    if (client.readyState === this.webSocket.OPEN) {
      client.send(data, { binary: isBinary });
    }
  };

  handleClose = () => {
    console.log('Client has closed');
  };

  handleError = () => {
    console.log('Error has occurred');
  };

}

const initializer = () => {
  const server = new SocketServer(WebSocketServer, WebSocket);
};
