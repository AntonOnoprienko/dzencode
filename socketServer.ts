import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

let activeSessions = 0;

io.on('connection', (socket) => {
  activeSessions++;
  console.log(`New connection! Active sessions: ${activeSessions}`);
  io.emit('updateSessions', activeSessions);

  socket.on('disconnect', () => {
    activeSessions--;
    console.log(`Disconnected! Active sessions: ${activeSessions}`);
    io.emit('updateSessions', activeSessions);
  });
});

server.listen(4000, () => {
  console.log('Socket.io server running on http://localhost:4000');
});
