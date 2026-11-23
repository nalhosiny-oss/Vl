
function fitFrame(f){try{var d=f.contentDocument;if(!d||!d.body)return;var r=d.documentElement.getBoundingClientRect().height,b=d.body.getBoundingClientRect(),h=Math.ceil(Math.max(r,b.bottom+(parseFloat(getComputedStyle(d.body).marginBottom)||0)));if(h>50&&Math.abs(f.offsetHeight-h)>2)f.style.height=h+"px";}catch(e){}}
function wire(f){f.addEventListener("load",function(){fitFrame(f);try{var d=f.contentDocument;if(window.ResizeObserver)new ResizeObserver(function(){fitFrame(f)}).observe(d.body);
 d.addEventListener("click",function(){setTimeout(function(){fitFrame(f)},60)},true);}catch(e){}var n=0,t=setInterval(function(){fitFrame(f);if(++n>20)clearInterval(t)},250);});}
function load(f){if(!f.getAttribute("src")&&f.dataset.src){wire(f);f.src=f.dataset.src;}else fitFrame(f);}
document.querySelectorAll("iframe.fit").forEach(function(f){if(!f.closest(".pane"))load(f);});
var tabs=document.querySelectorAll(".tabs button");
function show(id,scroll){var ok=false;tabs.forEach(function(b){var on=b.dataset.p===id;b.setAttribute("aria-selected",on);if(on)ok=true;});
 if(!ok)return;document.querySelectorAll(".pane").forEach(function(p){var on=p.id==="p-"+id;p.classList.toggle("on",on);if(on)p.querySelectorAll("iframe.fit").forEach(load);});
 try{history.replaceState(null,"","#"+id);}catch(e){}
 if(scroll){var t=document.querySelector(".tabs");window.scrollTo({top:t.offsetTop,behavior:"smooth"});}}
tabs.forEach(function(b){b.addEventListener("click",function(){show(b.dataset.p,true)});});
document.querySelectorAll("[data-go]").forEach(function(b){b.addEventListener("click",function(){show(b.dataset.go,true)});});
if(tabs.length){var h=(location.hash||"").slice(1);show(["pre","lab","post"].indexOf(h)>=0?h:"pre",false);}
window.addEventListener("hashchange",function(){var h=location.hash.slice(1);if(["pre","lab","post"].indexOf(h)>=0)show(h,false);});
