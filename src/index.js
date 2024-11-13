import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Socket.io connection
io.on('connection', (socket) => {
    // console.log('A new client connected', socket.id);

    // Handle incoming messages from clients
    socket.on('user-message', (message) => {
        // console.log('A new message from client:', message);
        // Broadcast the message to all connected clients
        io.emit('new-message', message);
    });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), "public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});


server.listen(9000, () => {
  console.log("Server is started at port: 9000");
});


