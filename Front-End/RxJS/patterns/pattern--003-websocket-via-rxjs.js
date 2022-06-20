
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import WebSocket from 'ws';

export class SocketService {

  messages = new Subject();
  socket = null;

  constructor(_webSocket, _config) {
    this.socket = _webSocket(_config);
  
    this.messages.subscribe(this.handleMessages.bind(this));
    this.socket.subscribe(this.observer);
  }

  observer = {
    next: (message) => this.messages.next(message),
    error: (error) => console.log(error),
    complete: () => console.log('complete')
  };


  handleMessages = (data) => console.log(`received: ${ data }`);
  send = (data) => this.socket.next(data);

}

const initializer = () => {
  const config = {
    url: 'ws://localhost:8080',
    WebSocketCtor: WebSocket
  };
  const service = new SocketService(webSocket, config);
  service.send('first message');
  service.send('second message');  
};
