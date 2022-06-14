
import WebSocket, { WebSocketServer } from 'ws';

export class SocketServer {

  wss = null;

  constructor() {
    this.wss = new WebSocketServer({ port: 8080 });
    this.init();
  }

  init = () => {
    this.wss.on('connection', (ws) => this.handleConnection(ws));
    console.log('WebSocket server is running on port 8080');
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
    if (client.readyState === WebSocket.OPEN) {
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

const server = new SocketServer();
