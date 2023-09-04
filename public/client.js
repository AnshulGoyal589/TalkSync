var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var typing = document.getElementById('typing');
var messagesHolder = document.getElementById('messagesHolder');
var login = document.getElementById('login');
var loginForm = document.getElementById('loginForm');
var username = document.getElementById('username');
var hero2 = document.getElementById('hero2');
// var spaces = document.querySelectorAll('.space');








loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  socket.on('login2',(chatWith)=>{
    // console.log(chatWith);  
    while (hero2.firstChild) {
      hero2.removeChild(hero2.firstChild);
    }
    for(const chatter in chatWith){
      const person=document.createElement('div');
      person.innerText=chatWith[chatter];
      person.style.width="100%";
      person.style.className="space";
      person.style.height="80px"; 
      person.style.color="white";
      person.style.border="2px solid white";
      hero2.appendChild(person); 

    }
  })

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

hero2.addEventListener("click",(e)=>{
  // console.log(e.target);
  socket.emit("abc",e.target.innerText);
})




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
  socket.emit("someoneNotTyping","is typing...");
})
socket.on('someoneNotTyping',(info)=>{
  setTimeout(function() {
    typing.innerText="";
  }, 1000); 
})
