import { getSession, logout } from "./auth.js";
const LOGIN_URL="https://brett2025brett.github.io/BrettWebsite/BRETT_ACCOUNTSYSTEM%20(1)/brett_accunts%20-%20Kopie/logonUI.html";
const userEl=document.getElementById("user");

/* Session + Role Simulation */
(async()=>{
  const session=await getSession();
  if(!session){ window.location.href=LOGIN_URL; return;}
  // Example roles: Admin/User/Guest
  let role="Admin"; // can simulate other roles
  userEl.textContent=`Eingeloggt als: ${session.user.email} (${role})`;
})();

/* Logout */
document.getElementById("logoutBtn").onclick=async()=>{await logout();window.location.href=LOGIN_URL;};

/* Charts */
const ctxD=document.getElementById("chartDownloads").getContext("2d");
const chartDownloads=new Chart(ctxD,{
  type:"bar",
  data:{labels:["Jan","Feb","Mär","Apr","Mai","Jun"],datasets:[{label:"Downloads",data:[12,25,18,30,22,40],backgroundColor:"#00f2ff"}]},
  options:{plugins:{legend:{labels:{color:"white"}}},scales:{x:{ticks:{color:"white"}},y:{ticks:{color:"white"}}}}
});

const ctxA=document.getElementById("chartAnalytics").getContext("2d");
const chartAnalytics=new Chart(ctxA,{
  type:"line",
  data:{labels:["Mo","Di","Mi","Do","Fr","Sa"],datasets:[{label:"Aktive Nutzer",data:[30,45,50,40,60,55],borderColor:"#00f2ff",backgroundColor:"rgba(0,242,255,0.2)",fill:true,tension:0.4}]},
  options:{plugins:{legend:{labels:{color:"white"}}},scales:{x:{ticks:{color:"white"}},y:{ticks:{color:"white"}}}}
});

/* Simulate live updates */
setInterval(()=>{
  chartDownloads.data.datasets[0].data=chartDownloads.data.datasets[0].data.map(d=>d+Math.floor(Math.random()*5));
  chartDownloads.update();
  chartAnalytics.data.datasets[0].data=chartAnalytics.data.datasets[0].data.map(d=>d+Math.floor(Math.random()*3)-1);
  chartAnalytics.update();
},3000);

/* Particles */
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth; canvas.height=window.innerHeight;
let particles=[];
for(let i=0;i<150;i++){particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,dx:(Math.random()-0.5),dy:(Math.random()-0.5)});}
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#00f2ff";
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    p.x+=p.dx; p.y+=p.dy;
    if(p.x>canvas.width)p.x=0;if(p.x<0)p.x=canvas.width;
    if(p.y>canvas.height)p.y=0;if(p.y<0)p.y=canvas.height;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* Drag & Drop + Persistence */
const grid=document.getElementById("grid");
let dragged=null;
const savedOrder=JSON.parse(localStorage.getItem("widgetOrder")||"[]");
if(savedOrder.length){ // reorder saved
  savedOrder.forEach(id=>{
    const card=document.querySelector(`.card[data-id="${id}"]`);
    if(card)grid.appendChild(card);
  });
}
const cards=document.querySelectorAll(".card");
cards.forEach(card=>{
  card.addEventListener("dragstart",()=>{dragged=card;});
  card.addEventListener("dragover",(e)=>{e.preventDefault();});
  card.addEventListener("drop",()=>{
    if(dragged!=card){grid.insertBefore(dragged,card);saveOrder();}
  });
});
function saveOrder(){
  const order=[...grid.children].map(c=>c.dataset.id);
  localStorage.setItem("widgetOrder",JSON.stringify(order));
}

/* Notifications */
setInterval(()=>{
  const notif=document.getElementById("notification");
  let num=Math.floor(Math.random()*5)+1;
  notif.textContent=`🔔 ${num} Neue Aktivitäten`;
},5000);

/* Hamburger */
window.toggleMenu=function(){document.getElementById("sidebar").classList.toggle("active");};
