
import { filter, Subject } from 'rxjs';
import { BroadcastChannel } from 'node:worker_threads';

export class BroadcastService {

  bc = null;
  messages = new Subject();

  constructor(channelName) {
    this.bc = new BroadcastChannel(channelName, { 
      type: 'node', 
      webWorkerSupport: true
    });
    this.bc.onmessage = this.handleMessages.bind(this);
  }

  handleMessages = (message) => this.messages.next(message.data);

  publish = (message) => this.bc.postMessage(message);

  messageOfType = (type) => {
    return this.messages.pipe(
      filter((message) => message.type === type)
    );
  };

}

const service1 = new BroadcastService('channel-one');
const service2 = new BroadcastService('channel-one');

const messages = service1.messageOfType('sending');
messages.subscribe({
  next: (data) => console.log('service 1 receiving', data),
  error: (error) => console.log(error),
  complete: () => console.log('done')
});

service2.publish({ type: 'sending', data: 'DATA HERE' });
service2.publish({ type: 'sending', data: 'AND HERE' });
service2.publish({ type: 'not-sending', data: 'AND HERE' });
