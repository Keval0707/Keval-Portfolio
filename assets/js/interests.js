(() => {
 const section=document.querySelector('.outside'), dialog=section.querySelector('dialog'), control=section.querySelector('.play-control'), preference=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=false, hover=false, visible=true, opener, frame=0, last=0;
 const rows=[...section.querySelectorAll('.lane')].map((lane,index)=>{
   const belt=lane.firstElementChild,batch=belt.firstElementChild;
   return {lane,belt,batch,index,offset:index?100:0,width:0};
 });
 function layout(){
   for(const row of rows){
     while(row.belt.children.length>1)row.belt.lastElementChild.remove();
     row.width=row.batch.getBoundingClientRect().width;
     if(!row.width)continue;
     if(preference.matches){row.belt.style.transform='';continue;}
     for(let i=0;i<Math.ceil(row.lane.clientWidth/row.width)+1;i++){
       const copy=row.batch.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.querySelectorAll('button').forEach(b=>b.tabIndex=-1);row.belt.append(copy);
     }
     paint(row);
   }
   control.hidden=preference.matches;
   sync();
 }
 function paint(row){row.offset=(row.offset%row.width+row.width)%row.width;row.belt.style.transform='translate3d('+(-row.offset)+'px,0,0)'}
 function tick(now){
   const seconds=last?Math.min(now-last,64)/1000:0;last=now;
   rows.forEach(row=>{if(row.width){row.offset+=(row.index?-19:24)*seconds;paint(row)}});
   frame=requestAnimationFrame(tick);
 }
 function sync(){
   cancelAnimationFrame(frame);last=0;
   if(!preference.matches&&!paused&&!hover&&visible&&!document.hidden&&!dialog.open&&!section.querySelector('.wall-card:focus-visible'))frame=requestAnimationFrame(tick);
 }
 section.querySelector('.wall').addEventListener('pointerover',e=>{if(e.pointerType==='mouse'){hover=true;sync()}});
 section.querySelector('.wall').addEventListener('pointerleave',()=>{hover=false;sync()});
 section.addEventListener('focusin',e=>{const card=e.target.closest('.wall-card');if(card?.matches(':focus-visible')&&!preference.matches){const row=rows.find(r=>r.lane.contains(card));row.offset=card.offsetLeft-row.batch.firstElementChild.offsetLeft;paint(row);row.lane.scrollLeft=0}sync()});
 section.addEventListener('focusout',()=>requestAnimationFrame(sync));
 control.onclick=()=>{paused=!paused;control.textContent=paused?'Play carousel':'Pause carousel';control.setAttribute('aria-pressed',String(paused));sync()};
 section.addEventListener('click',e=>{
   const card=e.target.closest('.wall-card');if(!card)return;
   opener=card;dialog.querySelector('.interest-content').replaceChildren(section.querySelector('#story-'+card.dataset.story).content.cloneNode(true));
   dialog.showModal();sync();
 });
 dialog.querySelector('button').onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{const b=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))dialog.close()});
 dialog.addEventListener('close',()=>{(opener?.isConnected?opener:control).focus({preventScroll:true});sync()});
 dialog.addEventListener('keydown',e=>e.stopPropagation());
 new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync()}).observe(section);
 new ResizeObserver(layout).observe(section);document.addEventListener('visibilitychange',sync);preference.addEventListener('change',layout);layout();
})();
