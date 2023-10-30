var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var typing = document.getElementById('typing');
var messagesHolder = document.getElementById('messagesHolder');
var hero2 = document.getElementById('hero2');
var login = document.getElementById('login');
var loginForm = document.getElementById('loginForm');
var username = document.getElementById('username');
var password = document.getElementById('password');
var email = document.getElementById('email');
var loginR = document.getElementById('loginR');
var loginFormR = document.getElementById('loginFormR');
var usernameR = document.getElementById('usernameR');
var passwordR = document.getElementById('passwordR');
var emailR = document.getElementById('emailR');
let other;

// EXECUTE ON EVERY REFRESH OF BROWSER

socket.once("allCome",(users)=>{  

  for(let user of users){
    const person=document.createElement('div');
    person.innerText=user.username;
    person.style.width="100%";
    person.style.height="80px"; 
    person.style.color="white";
    person.style.fontSize="28px";
    person.style.display="flex";
    person.style.alignItems="center";
    person.style.justifyContent="center";
    person.style.border="2px solid white";
    hero2.appendChild(person); 
  }

})

//LOGIN THE APP

loginForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  const details={
    username:username.value,
    password:password.value,
    email:email.value
  }
  socket.emit('login',details);
  username.value=''; 
  password.value=''; 
  email.value=''; 

})

//REGISTER YOUR DETAILS 

loginFormR.addEventListener("submit",(e)=>{

  e.preventDefault();

  const person=document.createElement('div');
  person.innerText=usernameR.value;
  person.style.width="100%";
  person.style.height="80px"; 
  person.style.color="white";
  person.style.fontSize="28px";
  person.style.display="flex";
  person.style.alignItems="center";
  person.style.justifyContent="center";
  person.style.border="2px solid white";
  hero2.appendChild(person);

  const details={
    username:usernameR.value,
    password:passwordR.value,
    email:emailR.value
  }

  socket.emit('loginR',details);
  usernameR.value=''; 
  passwordR.value=''; 
  emailR.value=''; 

})

// SENDING MESSAGE

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  } 
});

// SELECTING TWO PRIVATE CHATS

hero2.addEventListener("click",(e)=>{

  other=e.target.innerText;

  socket.emit("abc",{currentPerson : e.target.innerText, otherPerson: other});
  
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
