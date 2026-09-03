/* THREE.JS PARTÍCULAS */
(function(){
  const canvas=document.getElementById('bg-canvas');
  const R=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false});
  R.setPixelRatio(Math.min(devicePixelRatio,1.5));
  R.setSize(innerWidth,innerHeight);
  const scene=new THREE.Scene();
  const cam=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000);
  cam.position.z=80;
  const N=innerWidth<768?1000:2200;
  const geo=new THREE.BufferGeometry();
  const pos=new Float32Array(N*3),col=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    pos[i*3]=(Math.random()-.5)*200;
    pos[i*3+1]=(Math.random()-.5)*200;
    pos[i*3+2]=(Math.random()-.5)*200;
    if(Math.random()>.5){col[i*3]=0;col[i*3+1]=.96;col[i*3+2]=1}
    else{col[i*3]=1;col[i*3+1]=0;col[i*3+2]=.43}
  }
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('color',new THREE.BufferAttribute(col,3));
  const mat=new THREE.PointsMaterial({size:.32,vertexColors:true,transparent:true,opacity:.55,sizeAttenuation:true});
  const pts=new THREE.Points(geo,mat);
  scene.add(pts);
  let mx=0,my=0;
  addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5)*2;my=(e.clientY/innerHeight-.5)*2});
  addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();R.setSize(innerWidth,innerHeight)});
  let t=0;
  (function a(){requestAnimationFrame(a);t+=.0004;pts.rotation.y=t+mx*.07;pts.rotation.x=my*.04;R.render(scene,cam)})();
})();

/* LOADER */
(function(){
  const el=document.getElementById('lNum');let v=0;
  const iv=setInterval(()=>{
    v+=Math.floor(Math.random()*7)+2;
    if(v>=100){v=100;clearInterval(iv)}
    el.textContent=v;
    if(v===100)setTimeout(()=>{
      document.getElementById('loader').classList.add('hide');
      AOS.init({duration:680,once:true,easing:'ease-out-cubic',offset:50});
      // Animar barras de idiomas
      document.querySelectorAll('.lang-bar-fill').forEach(b=>{
        b.style.width=b.dataset.level+'%';
      });
    },450);
  },55);
})();

/* CURSOR */
const cur=document.getElementById('cur'),ring=document.getElementById('curRing');
let rx=0,ry=0;
addEventListener('mousemove',e=>{
  cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px';
  rx+=(e.clientX-rx)*.1;ry+=(e.clientY-ry)*.1;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
});
(function ra(){requestAnimationFrame(ra);ring.style.left=rx+'px';ring.style.top=ry+'px'})();
document.querySelectorAll('a,button,.btn,.fab,.proj-demo-btn,.proj-gh-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.classList.add('hov');ring.classList.add('hov')});
  el.addEventListener('mouseleave',()=>{cur.classList.remove('hov');ring.classList.remove('hov')});
});

/* NAVBAR */
const nav=document.getElementById('navbar');
const secs=document.querySelectorAll('section[id]');
const nas=document.querySelectorAll('.nav-links a');
addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>60);
  document.getElementById('fabt').classList.toggle('vis',scrollY>400);
  let c='';secs.forEach(s=>{if(scrollY>=s.offsetTop-150)c=s.id});
  nas.forEach(a=>a.classList.toggle('active',a.getAttribute('href')=='#'+c));
});

/* HAMBURGER */
const hamb=document.getElementById('hamb'),nl=document.getElementById('navLinks');
hamb.addEventListener('click',()=>nl.classList.toggle('open'));
nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nl.classList.remove('open')));

/* TYPEWRITER */
const roles=['Desarrollador Web','Python Developer','Java & Spring Boot','Automatización n8n','MySQL · Bases de datos','Estudiante Apasionado'];
let ri=0,ci=0,del=false;
const tw=document.getElementById('tw');
function type(){
  const w=roles[ri];
  tw.textContent=del?w.slice(0,--ci):w.slice(0,++ci);
  if(!del&&ci===w.length){del=true;setTimeout(type,1700);return}
  if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
  setTimeout(type,del?42:82);
}
setTimeout(type,2400);

/* SKILL BARS */
const fills=document.querySelectorAll('.s-fill');
const obs=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.level+'%';obs.unobserve(e.target)}});
},{threshold:.3});
fills.forEach(f=>obs.observe(f));

/* LANG BARS — activar al hacer scroll */
const langObs=new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.width=e.target.dataset.level+'%';
      langObs.unobserve(e.target);
    }
  });
},{threshold:.3});
document.querySelectorAll('.lang-bar-fill').forEach(b=>langObs.observe(b));

/* FORMULARIO */
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();
  const n=document.getElementById('fname').value.trim();
  const m=document.getElementById('fmail').value.trim();
  const s=document.getElementById('fsubject').value.trim();
  const msg=document.getElementById('fmsg').value.trim();
  if(!n||!m||!msg){alert('Por favor completa los campos obligatorios.');return}
  window.location.href=`mailto:santiago.suarezh26@gmail.com?subject=${encodeURIComponent(s||'Contacto desde portafolio')}&body=${encodeURIComponent('Nombre: '+n+'\nEmail: '+m+'\n\n'+msg)}`;
  document.getElementById('fOk').classList.add('show');
  this.reset();
  setTimeout(()=>document.getElementById('fOk').classList.remove('show'),5000);
});
