const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path=require("path");


app.use("/", express.static(path.join(__dirname, "public")));

const users={};


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/app.html');
        
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', {msg: msg,   username : users[socket.id]});
    });
    socket.on('login', (username) => {
      users[socket.id]=username;
    });
    socket.on('someoneTyping', (info) => {
      if(!users[socket.id]){
        users[socket.id]="Anonymous";
      }
      socket.broadcast.emit('someoneTyping',users[socket.id]+" "+info)
    });
    socket.on('someoneNotTyping', (info) => {
      if(!users[socket.id]){
        users[socket.id]="Anonymous";
      }
      socket.broadcast.emit('someoneNotTyping',users[socket.id]+" "+info)
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000'); 
});