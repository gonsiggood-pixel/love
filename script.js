/* counter (shown on the finale card) */

const startDate = new Date("2025-12-30T00:00:00");

function updateCounter(){

const now = new Date();
const diff = now - startDate;

const seconds = Math.floor(diff/1000)%60;
const minutes = Math.floor(diff/1000/60)%60;
const hours = Math.floor(diff/1000/60/60)%24;
const days = Math.floor(diff/1000/60/60/24);

const el=document.getElementById("counter");
if(!el) return;

el.innerHTML =
days+" days "+
hours+" hours "+
minutes+" minutes "+
seconds+" seconds ❤️";

}

setInterval(updateCounter,1000);
updateCounter();

/* ambient floating hearts */

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

/* click sparkle hearts */

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
heart.style.zIndex="80";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),1000);

}

/* ---- maze generation (deterministic recursive backtracker — no Math.random, always solvable) ---- */

const MAZE_ROWS=9, MAZE_COLS=9;
const CELL_PX=30, WALL_PX=8;

function generateMaze(rows,cols){

const cells=[];
for(let r=0;r<rows;r++){
const row=[];
for(let c=0;c<cols;c++){
row.push({r,c,visited:false,N:true,E:true,S:true,W:true});
}
cells.push(row);
}

const dirs=[
{dr:-1,dc:0,me:"N",opp:"S"},
{dr:0,dc:1,me:"E",opp:"W"},
{dr:1,dc:0,me:"S",opp:"N"},
{dr:0,dc:-1,me:"W",opp:"E"}
];

function neighborOrder(r,c){
const shift=(r*3+c*5)%4;
return dirs.slice(shift).concat(dirs.slice(0,shift));
}

const stack=[cells[0][0]];
cells[0][0].visited=true;

while(stack.length){
const cur=stack[stack.length-1];
const order=neighborOrder(cur.r,cur.c);
let moved=false;

for(const d of order){
const nr=cur.r+d.dr, nc=cur.c+d.dc;
if(nr<0||nr>=rows||nc<0||nc>=cols) continue;
const next=cells[nr][nc];
if(next.visited) continue;

cur[d.me]=false;
next[d.opp]=false;
next.visited=true;
stack.push(next);
moved=true;
break;
}

if(!moved) stack.pop();
}

return cells;

}

function findPath(cells,fromR,fromC,toR,toC){

const key=(r,c)=>r+","+c;
const visited=new Set([key(fromR,fromC)]);
const parent={};
const queue=[[fromR,fromC]];

while(queue.length){
const [r,c]=queue.shift();
if(r===toR&&c===toC) break;
const cell=cells[r][c];
const moves=[];
if(!cell.N) moves.push([r-1,c]);
if(!cell.E) moves.push([r,c+1]);
if(!cell.S) moves.push([r+1,c]);
if(!cell.W) moves.push([r,c-1]);

for(const [nr,nc] of moves){
const k=key(nr,nc);
if(visited.has(k)) continue;
visited.add(k);
parent[k]=key(r,c);
queue.push([nr,nc]);
}
}

const path=[];
let cur=key(toR,toC);
while(cur){
const [r,c]=cur.split(",").map(Number);
path.unshift({r,c});
cur=parent[cur];
}
return path;

}

function farthestCell(cells,fromR,fromC){

const key=(r,c)=>r+","+c;
const dist={};
dist[key(fromR,fromC)]=0;
const queue=[[fromR,fromC]];
let best={r:fromR,c:fromC,d:0};

while(queue.length){
const [r,c]=queue.shift();
const cell=cells[r][c];
const moves=[];
if(!cell.N) moves.push([r-1,c]);
if(!cell.E) moves.push([r,c+1]);
if(!cell.S) moves.push([r+1,c]);
if(!cell.W) moves.push([r,c-1]);

for(const [nr,nc] of moves){
const k=key(nr,nc);
if(k in dist) continue;
dist[k]=dist[key(r,c)]+1;
if(dist[k]>best.d) best={r:nr,c:nc,d:dist[k]};
queue.push([nr,nc]);
}
}

return best;

}

function pickHeartCells(path,count){
const inner=path.slice(1,-1);
if(inner.length<=count) return inner;

const step=inner.length/(count+1);
const picks=[];
for(let i=1;i<=count;i++){
picks.push(inner[Math.floor(i*step)]);
}
return picks;
}

function buildRevealPool(){
const pool=[];
timelineData.forEach(t=>pool.push({type:"text",icon:"📅",title:t.title,body:t.text}));
lettersData.forEach(l=>pool.push({type:"text",icon:"💌",title:l.title,body:l.body}));
galleryData.slice(0,2).forEach(g=>pool.push({type:"photo",icon:"📷",title:g.caption||"A memory",src:g.src}));
return pool;
}

/* ---- game state ---- */

let cellsRef=null;
let player={r:0,c:0};
let heartCells=[];
let collectedCount=0;
let controlsReady=false;
let exitR=0, exitC=0;

function startGame(){

document.getElementById("intro").hidden=true;
document.getElementById("game").hidden=false;

cellsRef=generateMaze(MAZE_ROWS,MAZE_COLS);
const exit=farthestCell(cellsRef,0,0);
exitR=exit.r;
exitC=exit.c;
const path=findPath(cellsRef,0,0,exitR,exitC);
const pool=buildRevealPool();
const heartCount=Math.min(6,pool.length,path.length-2);
const picks=pickHeartCells(path,heartCount);

heartCells=picks.map((p,i)=>({r:p.r,c:p.c,collected:false,reveal:pool[i]}));
collectedCount=0;
player={r:0,c:0};

renderMaze();
renderHearts();
placePlayer(true);
updateHud();
attachControls();

}

function renderMaze(){

const maze=document.getElementById("maze");
maze.innerHTML="";

const colTemplate=[];
const rowTemplate=[];
for(let c=0;c<MAZE_COLS;c++){
colTemplate.push(CELL_PX+"px");
if(c<MAZE_COLS-1) colTemplate.push(WALL_PX+"px");
}
for(let r=0;r<MAZE_ROWS;r++){
rowTemplate.push(CELL_PX+"px");
if(r<MAZE_ROWS-1) rowTemplate.push(WALL_PX+"px");
}
maze.style.gridTemplateColumns=colTemplate.join(" ");
maze.style.gridTemplateRows=rowTemplate.join(" ");

for(let r=0;r<MAZE_ROWS;r++){
for(let c=0;c<MAZE_COLS;c++){

const block=document.createElement("div");
block.className="cell-block";
block.id="cell-"+r+"-"+c;
block.style.gridColumn=(c*2+1);
block.style.gridRow=(r*2+1);
maze.appendChild(block);

if(c<MAZE_COLS-1){
const conn=document.createElement("div");
conn.className="wall-block "+(cellsRef[r][c].E?"closed":"open");
conn.style.gridColumn=(c*2+2);
conn.style.gridRow=(r*2+1);
maze.appendChild(conn);
}

if(r<MAZE_ROWS-1){
const conn=document.createElement("div");
conn.className="wall-block "+(cellsRef[r][c].S?"closed":"open");
conn.style.gridColumn=(c*2+1);
conn.style.gridRow=(r*2+2);
maze.appendChild(conn);
}

if(c<MAZE_COLS-1&&r<MAZE_ROWS-1){
const pillar=document.createElement("div");
pillar.className="pillar-block";
pillar.style.gridColumn=(c*2+2);
pillar.style.gridRow=(r*2+2);
maze.appendChild(pillar);
}

}
}

const exit=document.getElementById("cell-"+exitR+"-"+exitC);
const exitIcon=document.createElement("div");
exitIcon.className="exit-icon";
exitIcon.textContent="💝";
exit.appendChild(exitIcon);

}

function renderHearts(){
heartCells.forEach(h=>{
const block=document.getElementById("cell-"+h.r+"-"+h.c);
if(!block) return;
const icon=document.createElement("div");
icon.className="heart-icon";
icon.textContent="💖";
block.appendChild(icon);
});
}

function placePlayer(skipHop){
let marker=document.getElementById("player-marker");
if(!marker){
marker=document.createElement("div");
marker.id="player-marker";
marker.className="player-marker";
marker.textContent="🐻";
document.getElementById("maze").appendChild(marker);
}
marker.style.gridColumn=(player.c*2+1);
marker.style.gridRow=(player.r*2+1);

void marker.offsetWidth;

if(!skipHop){
marker.classList.remove("hop");
void marker.offsetWidth;
marker.classList.add("hop");
}
}

function updateHud(){
document.getElementById("heart-count").textContent=collectedCount+" / "+heartCells.length+" 💖";
}

function tryMove(dc,dr){
if(!cellsRef) return;
const cell=cellsRef[player.r][player.c];
let can=false;

if(dr===-1&&!cell.N) can=true;
if(dr===1&&!cell.S) can=true;
if(dc===1&&!cell.E) can=true;
if(dc===-1&&!cell.W) can=true;

if(!can) return;

player.r+=dr;
player.c+=dc;
placePlayer(false);
checkCell();
}

function checkCell(){

const heart=heartCells.find(h=>h.r===player.r&&h.c===player.c&&!h.collected);
if(heart){
heart.collected=true;
collectedCount++;
updateHud();

const block=document.getElementById("cell-"+heart.r+"-"+heart.c);
const icon=block&&block.querySelector(".heart-icon");
if(icon) icon.classList.add("collected");

openPickup(heart.reveal);
return;
}

if(player.r===exitR&&player.c===exitC){
showFinale();
}

}

function openPickup(reveal){
const overlay=document.getElementById("letter-overlay");
const paper=document.getElementById("letter-paper");
if(!overlay||!paper) return;

if(reveal.type==="photo"){
paper.innerHTML=
"<h3>"+reveal.icon+" "+reveal.title+"</h3>"+
"<img src=\""+reveal.src+"\" class=\"photo\">"+
"<button onclick=\"closeLetter()\">Keep going ▶</button>";
} else {
paper.innerHTML=
"<h3>"+reveal.icon+" "+reveal.title+"</h3>"+
"<p>"+reveal.body+"</p>"+
"<button onclick=\"closeLetter()\">Keep going ▶</button>";
}

overlay.classList.add("open");
}

function closeLetter(){
const overlay=document.getElementById("letter-overlay");
if(!overlay) return;
overlay.classList.remove("open");
}

function showFinale(){

document.getElementById("game").hidden=true;
document.getElementById("finale").hidden=false;
showFinaleMessage();

for(let n=0;n<16;n++){
setTimeout(()=>{
spawnClickHeart(window.innerWidth*Math.random(),window.innerHeight*0.3);
},n*90);
}

}

function showFinaleMessage(){
const msg=messagesData[Math.floor(Math.random()*messagesData.length)];
document.getElementById("finale-msg").textContent=msg;
}

/* ---- controls: keyboard + swipe + on-screen dpad (dpad buttons call tryMove() via inline onclick) ---- */

function attachControls(){
if(controlsReady) return;
controlsReady=true;

document.addEventListener("keydown",(e)=>{
if(document.getElementById("game").hidden) return;
if(e.key==="ArrowUp") tryMove(0,-1);
else if(e.key==="ArrowDown") tryMove(0,1);
else if(e.key==="ArrowLeft") tryMove(-1,0);
else if(e.key==="ArrowRight") tryMove(1,0);
});

const maze=document.getElementById("maze");
let touchStartX=0, touchStartY=0;

maze.addEventListener("touchstart",(e)=>{
touchStartX=e.touches[0].clientX;
touchStartY=e.touches[0].clientY;
},{passive:true});

maze.addEventListener("touchend",(e)=>{
const dx=e.changedTouches[0].clientX-touchStartX;
const dy=e.changedTouches[0].clientY-touchStartY;
if(Math.abs(dx)<20&&Math.abs(dy)<20) return;

if(Math.abs(dx)>Math.abs(dy)) tryMove(dx>0?1:-1,0);
else tryMove(0,dy>0?1:-1);
},{passive:true});

}

/* ---- init ---- */

document.addEventListener("DOMContentLoaded",()=>{

const letterOverlay=document.getElementById("letter-overlay");
if(letterOverlay){
letterOverlay.addEventListener("click",(e)=>{
if(e.target===letterOverlay) closeLetter();
});
}

});
