// Particle network
var c=document.getElementById("particleCanvas");
if(c){var ctx=c.getContext("2d"),p=[],mx=-1e3,my=-1e3,count=50,dist=150;
function resize(){c.width=window.innerWidth;c.height=window.innerHeight}
resize();window.addEventListener("resize",resize);
for(var i=0;i<count;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5,r:Math.random()*2+1});
document.addEventListener("mousemove",function(e){var rect=c.getBoundingClientRect();mx=e.clientX-rect.left;my=e.clientY-rect.top});
document.addEventListener("mouseleave",function(){mx=-1e3;my=-1e3});
function animate(){ctx.clearRect(0,0,c.width,c.height);
for(var i=0;i<p.length;i++){p[i].x+=p[i].vx;p[i].y+=p[i].vy;
if(p[i].x<0||p[i].x>c.width)p[i].vx*=-1;if(p[i].y<0||p[i].y>c.height)p[i].vy*=-1;
var dx=p[i].x-mx,dy=p[i].y-my,d=Math.sqrt(dx*dx+dy*dy);
if(d<100){p[i].vx+=dx/d*0.02;p[i].vy+=dy/d*0.02}
ctx.beginPath();ctx.arc(p[i].x,p[i].y,p[i].r,0,Math.PI*2);ctx.fillStyle="rgba(129,140,248,0.4)";ctx.fill()}
for(var i=0;i<p.length;i++){for(var j=i+1;j<p.length;j++){var dx=p[i].x-p[j].x,dy=p[i].y-p[j].y,d=Math.sqrt(dx*dx+dy*dy);
if(d<dist){ctx.beginPath();ctx.moveTo(p[i].x,p[i].y);ctx.lineTo(p[j].x,p[j].y);
ctx.strokeStyle="rgba(129,140,248,"+(1-d/dist)*0.3+")";ctx.lineWidth=1;ctx.stroke()}}}
requestAnimationFrame(animate)}
animate()}

// Typewriter
var tw=document.getElementById("typewriterEl");
if(tw){var txt="AI ???? ? ?????",i=0;tw.innerHTML="<span class=\"cursor\">|</span>";
function type(){if(i<txt.length){tw.innerHTML=txt.substring(0,i+1)+"<span class=\"cursor\">|</span>";i++;setTimeout(type,60+Math.random()*40)}
else{tw.innerHTML=txt+"<span class=\"cursor\" style=\"opacity:.4\">|</span>"}}
setTimeout(type,800)}

// Cursor glow
var cg=document.getElementById("cursorGlow");
if(cg){var cx=-150,cy=-150;
document.addEventListener("mousemove",function(e){cx=e.clientX;cy=e.clientY});
function upd(){cg.style.left=cx+"px";cg.style.top=cy+"px";requestAnimationFrame(upd)}
upd()}

// Nav scroll
var nav=document.getElementById("nav");
window.addEventListener("scroll",function(){nav.classList.toggle("scrolled",window.scrollY>50)});

// Mobile nav
var nt=document.getElementById("navToggle");
var nl=document.querySelector(".nav-links");
nt.addEventListener("click",function(){nl.classList.toggle("open")});
document.querySelectorAll(".nav-link").forEach(function(l){l.addEventListener("click",function(){nl.classList.remove("open")})});

// Smooth scroll
document.querySelectorAll("a[href^=\"#\"]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();
var t=document.querySelector(this.getAttribute("href"));if(t){window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-60,behavior:"smooth"})}})});

// Fade in on scroll
var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("show");observer.unobserve(entry.target)}})},{threshold:.15});
document.querySelectorAll(".fade-in").forEach(function(el){observer.observe(el)});

// Counters
var counters=document.querySelectorAll(".stat-counter");
var co=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){var el=entry.target,target=parseInt(el.dataset.target),step=Math.max(1,Math.floor(target/30)),cur=0;
var iv=setInterval(function(){cur+=step;if(cur>=target){el.textContent=target;clearInterval(iv)}else{el.textContent=cur}},40);
co.unobserve(el)}})},{threshold:.5});
counters.forEach(function(c){co.observe(c)});
