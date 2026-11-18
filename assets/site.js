(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=$('header'),burger=$('#burger');
const onScroll=()=>header&&header.classList.toggle('scrolled',scrollY>20);addEventListener('scroll',onScroll,{passive:true});onScroll();
if(burger){burger.addEventListener('click',()=>{const o=document.body.classList.toggle('nav-open');burger.setAttribute('aria-expanded',o)});
$$('.menu a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('nav-open');burger.setAttribute('aria-expanded',false)}));}
$$('.year').forEach(e=>e.textContent=new Date().getFullYear());
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
$$('.reveal').forEach(el=>io.observe(el));
function countUp(el){if(!el)return;const t=+el.dataset.count,s=el.dataset.suffix||'';if(reduce){el.textContent=t+s;return}
  const d=1400,st=performance.now();const step=n=>{const p=Math.min((n-st)/d,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(t*e)+s;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!e.target.closest('.slide')){countUp(e.target);cio.unobserve(e.target)}}),{threshold:.5});
$$('[data-count]').forEach(el=>cio.observe(el));
// Karten-Slider
const slider=$('#slider');
if(slider){const cards=$$('.card'),prog=$('#prog'),count=$('#count');
  const go=dir=>slider.scrollBy({left:dir*(cards[0].offsetWidth+10),behavior:'smooth'});
  $('#prev').onclick=()=>go(-1);$('#next').onclick=()=>go(1);
  const upd=()=>{const max=slider.scrollWidth-slider.clientWidth,p=max?slider.scrollLeft/max:0;
    const w=slider.clientWidth/slider.scrollWidth*100;prog.style.width=w+'%';prog.style.left=(p*(100-w))+'%';
    const i=Math.round(slider.scrollLeft/(cards[0].offsetWidth+10));count.textContent=String(Math.min(i+1,cards.length)).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0')};
  slider.addEventListener('scroll',upd,{passive:true});upd();}
// Bild folgt dem Mauszeiger
const fi=$('#floatImg');
if(fi&&matchMedia('(hover:hover)').matches){const fimg=fi.querySelector('img');let fx=0,fy=0,tx=0,ty=0,raf;
  $$('#list .row').forEach(r=>{r.addEventListener('mouseenter',()=>{fimg.src=r.dataset.img;fi.classList.add('on')});r.addEventListener('mouseleave',()=>fi.classList.remove('on'))});
  const loop=()=>{fx+=(tx-fx)*.15;fy+=(ty-fy)*.15;fi.style.left=fx+'px';fi.style.top=fy+'px';raf=Math.abs(tx-fx)+Math.abs(ty-fy)>.5?requestAnimationFrame(loop):null};
  addEventListener('mousemove',e=>{tx=e.clientX+140;ty=e.clientY;if(!raf)raf=requestAnimationFrame(loop)});}
// Folien
const show=$('#show');
if(show){const slides=$$('.slide'),dots=$('#dots');let cur=0,timer;
  slides.forEach((s,i)=>{const b=document.createElement('button');b.setAttribute('aria-label','Folie '+(i+1));b.onclick=()=>go(i);dots.appendChild(b)});
  function go(i){slides[cur].classList.remove('active');dots.children[cur].classList.remove('active');cur=i;slides[i].classList.add('active');
    const d=dots.children[i];d.classList.remove('active');void d.offsetWidth;d.classList.add('active');
    countUp(slides[i].querySelector('[data-count]'));clearTimeout(timer);if(!reduce)timer=setTimeout(()=>go((cur+1)%slides.length),6000)}
  const sio=new IntersectionObserver(es=>{if(es[0].isIntersecting){go(cur);sio.disconnect()}},{threshold:.4});sio.observe(show);}
// Inhaltsverzeichnis hervorheben
const toc=$$('.toc a');
if(toc.length){const map=new Map(toc.map(a=>[a.getAttribute('href').slice(1),a]));
  const tio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){toc.forEach(a=>a.classList.remove('on'));const a=map.get(e.target.id);a&&a.classList.add('on')}}),{rootMargin:'-20% 0px -70% 0px'});
  map.forEach((a,id)=>{const el=document.getElementById(id);el&&tio.observe(el)});}
})();
