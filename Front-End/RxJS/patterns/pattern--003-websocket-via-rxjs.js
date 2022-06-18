
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import WebSocket from 'ws';

export class SocketService {

  messages = new Subject();

  socket = webSocket({
    url: 'ws://localhost:8081',
    WebSocketCtor: WebSocket
  });
  
  observer = {
    next: (message) => this.messages.next(message),
    error: (error) => console.log(error),
    complete: () => console.log('complete')
  };

  constructor() {
    this.messages.subscribe(this.handleMessages.bind(this));
    this.socket.subscribe(this.observer);
  }

  handleMessages = (data) => console.log(`received: ${ data }`);
  send = (data) => this.socket.next(data);

}

const service = new SocketService();
service.send('first message');
service.send('second message');
