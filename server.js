const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const io = new Server(server);
const path=require("path");
const colors=require("colors");
const PORT=8000;
const User=require('./models/User');
const Chat=require('./models/Chat');




mongoose.connect("mongodb://127.0.0.1:27017/talk-careerbootcamp")
.then(()=> console.log("db connected sucessfully".yellow))
.catch((err)=> console.log(err));


app.use("/", express.static(path.join(__dirname, "public")));

const chatWith={};
const chatWith2={};
let chatWith3;


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/app.html');
        
});

// async function abc(){
  
//   const Users = await User.find({});

//   return Users;
// }
// const users=abc();

io.on('connection', async (socket) => {

    const users=await User.find({});

    io.emit("allCome", users )
   
    socket.on('chat message', (msg) => {
      
      socket.emit('chat message', {msg: msg,   username : users[socket.id]});
      socket.to(chatWith3).emit('chat message', {msg: msg,   username : users[socket.id]});

    });
    socket.on("abc",(data)=>{
      chatWith3=chatWith2[data];


    })
    socket.on('loginR', async (details) => {
      const user= await User.insertMany(details);
      io.emit('login2',user);
  
    });
    socket.on('login', async (details) => {
      const user = await User.find({username:details.username});
      // console.log(user);
      // chatWith2[username]=socket.id;
    });
    socket.on('someoneTyping', (info) => {
      if(!users[socket.id]){
        users[socket.id]="Anonymous";
      }
      socket.to(chatWith3).emit('someoneTyping',users[socket.id]+" "+info);
    });
    socket.on('someoneNotTyping', (info) => {
      if(!users[socket.id]){
        users[socket.id]="Anonymous";
      }
      socket.to(chatWith3).emit('someoneNotTyping',users[socket.id]+" "+info);
    });
});

server.listen(PORT, () => {
  console.log("Server is listening at PORT ".blue , `http://localhost:${PORT}`.red); 
});