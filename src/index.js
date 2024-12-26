import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static(path.join(process.cwd(), 'public')));

// Handle socket.io connection
io.on('connection', (socket) => {
  console.log('A new client connected:', socket.id);

  // Handle incoming messages
  socket.on('user-message', (message) => {
    console.log('Message from client:', message);
    // Emit the message to all connected clients
    io.emit('new-message', message);
  });
});

// Serve your index.html at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Start the server
server.listen(8000, () => {
  console.log('Server started on port 8000');
});
