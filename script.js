/* counter */

const startDate = new Date("2025-12-30T00:00:00");

function updateCounter(){

const now = new Date();
const diff = now - startDate;

const seconds = Math.floor(diff/1000)%60;
const minutes = Math.floor(diff/1000/60)%60;
const hours = Math.floor(diff/1000/60/60)%24;
const days = Math.floor(diff/1000/60/60/24);

document.getElementById("counter").innerHTML =
days+" days "+
hours+" hours "+
minutes+" minutes "+
seconds+" seconds ❤️";

}

setInterval(updateCounter,1000);
updateCounter();

/* messages */

const messages=[
"You are my favorite person ❤️",
"I’m so lucky to have you 💕",
"Every moment with you is special ✨",
"I love you more every day 💖",
"You make my life beautiful 🌸"
];

function showMessage(){

const msg=messages[Math.floor(Math.random()*messages.length)];

document.getElementById("msg").innerHTML=msg;

}

/* floating hearts */

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";
heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";
heart.style.fontSize=(15+Math.random()*30)+"px";
heart.style.animationDuration=(3+Math.random()*5)+"s";

document.body.appendChild(heart);

setTimeout(()=>{
heart.remove();
},8000);

}

setInterval(createHeart,300);

/* click hearts */

document.addEventListener("click",(e)=>{

const heart=document.createElement("div");
heart.innerHTML="💖";
heart.style.position="absolute";
heart.style.left=e.clientX+"px";
heart.style.top=e.clientY+"px";
heart.style.fontSize="30px";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),1000);

});
