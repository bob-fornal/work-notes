
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
  port: 8080
});
 
wss.on('connection', (ws) => {
  console.log('new client connected');
  ws.on('message', (data, isBinary) => {
    console.log(`Client has sent: ${ data }`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    })
  });
  ws.on('close', () => {
    console.log('Client has connected');
  });
  ws.onerror = function () {
    console.log('Error has occurred');
  }
});
console.log('WebSocket server is running on port 8080');
