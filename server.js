const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path"); 
const app = express();
const server = http.createServer(app); 

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
const PORT = process.env.PORT || 3001;

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the React application for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('A user connected to Socket.IO');

  // socket.on('buttonClick', (buttonNumber) => {
  //   const buttonNames = {
  //     1: 'Button 1',
  //     2: 'Button 2',
  //     3: 'Button 3',
  //     4: 'Button 4',
  //     5: 'Button 5',
  //     6: 'Button 6',
  //     7: 'Button 7',
  //     8: 'Button 8'
  //   };
  //   const buttonName = buttonNames[buttonNumber];
  //   console.log("12234");
    
  //   io.emit('buttonClicked', buttonName); // Emit the button name to all clients
  // });

  socket.on('disconnect', () => {
    console.log('User disconnected from Socket.IO');
  });
});
