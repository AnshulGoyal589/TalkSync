var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var typing = document.getElementById('typing');
var login = document.getElementById('login');
var loginForm = document.getElementById('loginForm');
var username = document.getElementById('username');
var messagesHolder = document.getElementById('messagesHolder');



loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  if(username.value){
    socket.emit('login',username.value);
    username.value='';
  }else{
    socket.emit('login',"Anonymous");
  }
})
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});


socket.on('chat message', (data)=> {
  var item = document.createElement('li');
  item.className="msg";
  item.innerText = "Message from "+ data.username + " --->"  +data.msg ;
  messagesHolder.appendChild(item);
  messagesHolder.scrollTop = messagesHolder.scrollHeight;
  
});



input.addEventListener("keydown",(e)=>{ 
  socket.emit("someoneTyping","is typing...")
})


socket.on('someoneTyping',(info)=>{
  typing.innerText=info;
})


input.addEventListener("keyup",(e)=>{ 
  socket.emit("someoneNotTyping","is typing...")
  // socket.on('someoneTyping',(info)=>{
    // typing.innerText="";                      // writing this line inside will ig nly clear inner text of cuurent user, not all
  // })
})
socket.on('someoneNotTyping',(info)=>{
  setTimeout(function() {
    typing.innerText="";
  }, 1000); 
})
