
import { Subject } from 'rxjs';
import WebSocket from 'ws';

export class SocketService {

  ws = new WebSocket('ws://localhost:8081');
  
  messages = new Subject();

  constructor() {
    this.messages.subscribe(this.handleMessages.bind(this));
    this.ws.on('message', this.receieveMessage.bind(this));
  }

  receieveMessage = (data) => this.messages.next(data);
  handleMessages = (data) => console.log(`received: ${ data }`);
  handleSendMessage = (data) => this.ws.send(data);

  send = (data) => {
    this.ws.on('open', this.handleSendMessage.bind(this, data));
  };

}

const service = new SocketService();
service.send('first message');
service.send('second message');
