const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path=require("path");
const colors=require("colors");
const PORT=8000;


app.use("/", express.static(path.join(__dirname, "public")));

const users={};
const chatWith={};
const chatWith2={};
let chatWith3;


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/app.html');
        
});

io.on('connection', (socket) => {


   
    socket.on('chat message', (msg) => {
      
      socket.emit('chat message', {msg: msg,   username : users[socket.id]});
      socket.to(chatWith3).emit('chat message', {msg: msg,   username : users[socket.id]});

    });
    socket.on("abc",(data)=>{
      chatWith3=chatWith2[data];
      // socket.join("room");


        // const socket1Id = socket.id;
        // const socket2Id = chatWith2[data];
        // const roomName = 'room';

        // socket.joinToRoom = function(socketId, roomName) {
        // const socket2 = io.sockets.connected[socketId];

        // if (socket2) {
        //   socket2.join(roomName);
        //   console.log(`Socket with ID ${socketId} joined room ${roomName}`);
        // } else {
        //   console.log(`Socket with ID ${socketId} not found`);
        // }
        // };
        // socket.joinToRoom(socket2Id, roomName);


    })
    socket.on('login', (username) => {
      users[socket.id]=username;
      chatWith[socket.id]=username;
      chatWith2[username]=socket.id;
      io.emit('login2',chatWith);
    });
    socket.on('someoneTyping', (info) => {
      if(!users[socket.id]){
        users[socket.id]="Anonymous";
      }
      // socket.broadcast.emit('someoneTyping',users[socket.id]+" "+info);
      socket.to(chatWith3).emit('someoneTyping',users[socket.id]+" "+info);
    });
    socket.on('someoneNotTyping', (info) => {
      if(!users[socket.id]){
        users[socket.id]="Anonymous";
      }
      // socket.broadcast.emit('someoneNotTyping',users[socket.id]+" "+info);
      socket.to(chatWith3).emit('someoneNotTyping',users[socket.id]+" "+info);
    });
});

server.listen(PORT, () => {
  console.log("Server is listening at PORT ".blue , `http://localhost:${PORT}`.red); 
});
