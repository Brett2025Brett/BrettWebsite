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
