
import { Subject } from 'rxjs';
import WebSocket from 'ws';

export class SocketService {

  messages = new Subject();
  socket = null;

  constructor(_webSocket, _config) {
    this.socket = new _webSocket(_config);

    this.messages.subscribe(this.handleMessages.bind(this));
    this.socket.on('message', this.receiveMessage.bind(this));
  }

  receiveMessage = (data) => this.messages.next(data);
  handleMessages = (data) => console.log(`received: ${ data }`);
  handleSendMessage = (data) => this.socket.send(data);

  send = (data) => {
    this.socket.on('open', this.handleSendMessage.bind(this, data));
  };

}

const initializer = () => {
  const config = {
    host: 'ws://localhost:8080'
  };
  const service = new SocketService(WebSocket, config);
  service.send('first message');
  service.send('second message');  
};
