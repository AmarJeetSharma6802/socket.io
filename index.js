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

// Handle the root route to serve the 'index.html' file
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

// Start the server
server.listen(9000, () => {
  console.log("Server is started at port: 9000");
});


// process.cwd() ka matlab hai Current Working Directory. Jab aap Node.js ka code run karte hain, toh ye function aapko us folder ka path deta hai jahan se aapka Node.js process start hua tha. Yeh bahut zaroori hota hai, kyunki kabhi kabhi humare project ka root directory alag hota hai, aur hum chahte hain ki file paths ko relative tarike se handle karein.

// fronted se connect hoga to client ki information hogi ar har socket ki id hoti hain