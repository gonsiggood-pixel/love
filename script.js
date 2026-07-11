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

function showMessage(){

const msg=messagesData[Math.floor(Math.random()*messagesData.length)];

document.getElementById("msg").innerHTML=msg;

}

/* floating hearts */

const heartGlyphs=["❤️","💕","💖","💗","🌸"];

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";
heart.innerHTML=heartGlyphs[Math.floor(Math.random()*heartGlyphs.length)];

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
spawnClickHeart(e.clientX,e.clientY);
});

function spawnClickHeart(x,y){

const heart=document.createElement("div");
heart.innerHTML="💖";
heart.style.position="fixed";
heart.style.left=x+"px";
heart.style.top=y+"px";
heart.style.fontSize="30px";
heart.style.pointerEvents="none";
heart.style.zIndex="20";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),1000);

}

/* ---- scroll reveal (shared) ---- */

function observeReveal(elements,stagger){
const observer=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("in-view");
observer.unobserve(entry.target);
}
});
},{threshold:0.2});

elements.forEach((el,i)=>{
if(stagger) el.style.transitionDelay=(i*0.08)+"s";
observer.observe(el);
});
}

/* ---- timeline ---- */

function renderTimeline(){
const container=document.getElementById("timeline");
if(!container) return;

timelineData.forEach(item=>{
const el=document.createElement("div");
el.className="timeline-item";
el.innerHTML=
"<div class=\"timeline-date\">"+item.date+"</div>"+
"<div class=\"timeline-title\">"+item.title+"</div>"+
"<div class=\"timeline-text\">"+item.text+"</div>";
container.appendChild(el);
});

observeReveal(container.querySelectorAll(".timeline-item"),true);
}

/* ---- gallery ---- */

function renderGallery(){
const container=document.getElementById("gallery");
if(!container) return;

galleryData.forEach(item=>{
const wrap=document.createElement("div");
wrap.className="gallery-item";

const img=document.createElement("img");
img.src=item.src;
img.alt=item.caption||"";
img.onerror=()=>{ wrap.remove(); };
img.onclick=()=>openLightbox(item.src,item.caption);

wrap.appendChild(img);
container.appendChild(wrap);
});

observeReveal(container.querySelectorAll(".gallery-item"),true);
}

function openLightbox(src,caption){
const lightbox=document.getElementById("lightbox");
if(!lightbox) return;
lightbox.innerHTML=
"<img src=\""+src+"\">"+
(caption?"<p>"+caption+"</p>":"");
lightbox.hidden=false;
}

function closeLightbox(){
const lightbox=document.getElementById("lightbox");
if(!lightbox) return;
lightbox.hidden=true;
lightbox.innerHTML="";
}

/* ---- love letters ---- */

function renderLetters(){
const container=document.getElementById("letters");
if(!container) return;

lettersData.forEach(item=>{
const card=document.createElement("div");
card.className="letter-card";
card.innerHTML=
"<div class=\"letter-inner\">"+
"<div class=\"letter-front\">💌<br>"+item.title+"</div>"+
"<div class=\"letter-back\">"+item.body+"</div>"+
"</div>";
card.addEventListener("click",()=>{
card.classList.toggle("flipped");
});
container.appendChild(card);
});

observeReveal(container.querySelectorAll(".letter-card"),true);
}

/* ---- quiz ---- */

let quizIndex=0;
let quizScore=0;

function renderQuiz(){
const container=document.getElementById("quiz");
if(!container) return;
quizIndex=0;
quizScore=0;
showQuizQuestion();
}

function showQuizQuestion(){
const container=document.getElementById("quiz");
if(!container) return;

if(quizIndex>=quizData.length){
container.innerHTML=
"<div class=\"quiz-question\">You scored "+quizScore+" / "+quizData.length+" ❤️</div>"+
"<button onclick=\"renderQuiz()\">Play again</button>";
return;
}

const q=quizData[quizIndex];
container.innerHTML="";

const qEl=document.createElement("div");
qEl.className="quiz-question";
qEl.textContent=q.question;
container.appendChild(qEl);

q.options.forEach((opt,i)=>{
const btn=document.createElement("button");
btn.className="quiz-option";
btn.textContent=opt;
btn.onclick=()=>answerQuiz(i);
container.appendChild(btn);
});
}

function answerQuiz(i){
const q=quizData[quizIndex];
const container=document.getElementById("quiz");
const buttons=container.querySelectorAll(".quiz-option");

buttons.forEach((btn,idx)=>{
btn.disabled=true;
if(idx===q.correctIndex) btn.classList.add("correct");
else if(idx===i) btn.classList.add("wrong");
});

if(i===q.correctIndex){
quizScore++;
const rect=container.getBoundingClientRect();
for(let n=0;n<6;n++){
setTimeout(()=>{
spawnClickHeart(rect.left+rect.width*Math.random(),rect.top+20);
},n*80);
}
}

if(q.funFact){
const fact=document.createElement("p");
fact.className="quiz-fact";
fact.textContent=q.funFact;
container.appendChild(fact);
}

const next=document.createElement("button");
next.textContent=(quizIndex===quizData.length-1)?"See score":"Next";
next.onclick=()=>{
quizIndex++;
showQuizQuestion();
};
container.appendChild(next);
}

/* ---- hover sparkle on new interactive elements ---- */

function attachHoverSparkle(){
document.querySelectorAll(".timeline-item,.gallery-item,.letter-card").forEach(el=>{
let last=0;
el.addEventListener("mouseenter",(e)=>{
const now=Date.now();
if(now-last<1500) return;
last=now;
const rect=el.getBoundingClientRect();
spawnClickHeart(rect.left+rect.width/2,rect.top+rect.height/2);
});
});
}

/* ---- init ---- */

document.addEventListener("DOMContentLoaded",()=>{
renderTimeline();
renderGallery();
renderLetters();
renderQuiz();
attachHoverSparkle();
observeReveal(document.querySelectorAll(".section"),false);

const lightbox=document.getElementById("lightbox");
if(lightbox){
lightbox.addEventListener("click",closeLightbox);
}
});
