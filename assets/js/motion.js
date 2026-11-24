(()=>{const q=(s,r=document)=>r.querySelector(s),each=(s,fn,r=document)=>r.querySelectorAll(s).forEach(fn),motion=!matchMedia('(prefers-reduced-motion: reduce)').matches;
const view=q('[data-studio-name="View Toggle"]'),list=q('[data-studio-name="List All"]');
if(view&&list){const group=view.firstElementChild;group.onclick=null;group.onkeydown=null;group.removeAttribute('role');group.removeAttribute('tabindex');
for(const child of group.children){const mode=child.dataset.studioName;if(!['Grid','List'].includes(mode))continue;
child.onclick=e=>{e.stopPropagation();const rows=mode==='List';list.classList.toggle('rows',rows);view.classList.toggle('in-list',rows);if(motion)list.animate([{opacity:.45,translate:'0 8px'},{opacity:1,translate:'0 0'}],{duration:280});};}}
if(window.self!==window.top)return;
function canvas(){const d=document.createElement('dialog');d.className='portfolio-canvas';const bar=document.createElement('header');bar.textContent='Portfolio canvas';const close=document.createElement('button');close.textContent='Close ×';close.onclick=()=>d.close();bar.append(close);d.append(bar);const boards=document.createElement('div');boards.className='boards';d.append(boards);
for(const [slug,label] of [['index','Home'],['work','Work'],['ananya','Ananya'],['about','About'],['contact','Contact']]){const a=document.createElement('a');a.href=portfolioURL(slug);a.textContent=label+' ↗';const frame=document.createElement('iframe');frame.title=label+' preview';frame.tabIndex=-1;frame.loading='lazy';frame.setAttribute('inert','');frame.src=a.href;const thumb=document.createElement('span');thumb.append(frame);a.append(thumb);boards.append(a)}
document.body.append(d);d.onclose=()=>d.remove();d.showModal();if(motion)d.animate([{opacity:0,transform:'scale(1.08)'},{opacity:1,transform:'scale(1)'}],{duration:380,easing:'cubic-bezier(.16,1,.3,1)'});}
each('[data-studio-name="Zoom"],[data-canvas]',e=>e.onclick=canvas);
const box=q('.snp-sel');if(box){let selected;function position(){if(!selected)return;const r=selected.getBoundingClientRect();Object.assign(box.style,{opacity:'1',transform:'translate('+r.left+'px,'+r.top+'px)',width:r.width+'px',height:r.height+'px',top:'0',left:'0'});const name=q('.snp-sel-name',box),size=q('.snp-sel-size',box);if(name)name.textContent=selected.dataset.studioName;if(size)size.textContent=Math.round(r.width)+' × '+Math.round(r.height)}
each('[data-studio-name^="#"]',el=>{el.onpointerenter=()=>{selected=el;position()};el.onpointerleave=()=>{selected=null;box.style.opacity='0'}});addEventListener('scroll',position,{passive:true})}
if(motion){each('[data-snp-fill]',b=>{const fill=document.createElement('i');fill.className='pointer-fill';b.prepend(fill);b.onpointerenter=e=>{const r=b.getBoundingClientRect();fill.style.left=e.clientX-r.left+'px';fill.style.top=e.clientY-r.top+'px';fill.animate([{transform:'scale(0)'},{transform:'scale(1)'}],{duration:360,fill:'forwards'})};b.onpointerleave=()=>fill.animate([{transform:'scale(1)'},{transform:'scale(0)'}],{duration:220,fill:'forwards'})});
const lines=document.querySelectorAll('.snp-pf-line');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const path=e.target,l=path.getTotalLength();path.animate([{strokeDasharray:l,strokeDashoffset:l},{strokeDasharray:l,strokeDashoffset:0}],{duration:950,fill:'both'});io.unobserve(path)}));lines.forEach(p=>{if(typeof p.getTotalLength==='function')io.observe(p)});
}
})();

// Animate retained cards from their previous grid positions when a filter changes.
(() => {
  const grid = document.querySelector('[data-studio-name="List All"]');
  if (!grid) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Map();
  document.addEventListener('click', event => {
    if (!event.target.closest('[data-studio-name^="Chip "]') || reduced.matches) return;
    const cards = Array.from(grid.children);
    const previous = new Map(cards.filter(card => card.offsetWidth).map(card => [card, card.getBoundingClientRect()]));
    for (const animation of animations.values()) animation.cancel();
    animations.clear();
    queueMicrotask(() => {
      for (const card of cards) {
        if (!card.offsetWidth) continue;
        const start = previous.get(card);
        const end = card.getBoundingClientRect();
        const x = start ? start.left - end.left : 0;
        const y = start ? start.top - end.top : 6;
        if (start && Math.abs(x) + Math.abs(y) < 1) continue;
        const animation = card.animate([
          {translate: x + 'px ' + y + 'px', opacity: start ? 1 : 0.35},
          {translate: '0px 0px', opacity: 1}
        ], {duration: 240, easing: 'cubic-bezier(.2,.75,.25,1)'});
        animations.set(card, animation);
        animation.onfinish = () => animations.delete(card);
      }
    });
  }, true);
})();


(() => {
  if (self !== top) return;
  const hero = document.querySelector('[data-studio-name="Hero"]');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const players = [];
  const wordmarks = document.querySelectorAll('[data-studio-name="Wordmark"] [aria-label]');
  wordmarks.forEach(word => {
    word.classList.add('ink-wordmark');
    word.tabIndex = 0;
    Array.from(word.children).forEach((letter, index) => letter.style.setProperty('--delay', index * 24 + 'ms'));
  });
  if (!hero) return;
  let first = true;
  try {
    first = !sessionStorage.getItem('snapline-entrance');
    sessionStorage.setItem('snapline-entrance', '1');
  } catch {}
  const reload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
  if (!preference.matches) {
    const entrance = [
      ['[data-studio-name="Status Pill"]', 0],
      ['[data-studio-name="Headline"]', 80],
      ['[data-studio-name="Intro"]', 160],
      ['[data-studio-name="Actions"]', 210],
      ['[data-studio-name="Trust"]', 260],
      ['[data-studio-name="Portrait"]', 85]
    ];
    entrance.forEach(([selector, delay]) => {
      const el = hero.querySelector(selector);
      if (!el) return;
      const portrait = selector.includes('Portrait');
      players.push(el.animate([
        { opacity: 0, translate: portrait ? '0 10px' : '0 16px', clipPath: portrait ? 'inset(7% 4% 7% 4%)' : 'inset(-30%)' },
        { opacity: 1, translate: '0 0', clipPath: 'inset(-30%)' }
      ], { id:'homepage-entrance', duration: 660, delay: delay + (document.documentElement.dataset.entrance === 'signature' ? 430 : 0), fill:'backwards', easing:'cubic-bezier(.16,1,.3,1)' }));
    });
  }
  const cursors = [];
  for (const [selector, parent, duration, stops] of [
    ['.snp-re-cur','.snp-re',5500,[[.14,.92],[.64,.65],[.46,1.08],[.14,.92]]],
    ['.snp-pl-cur','.snp-pl-layer',7300,[[.08,.84],[.34,.69],[.71,.82],[.08,.84]]]
  ]) {
    const node = hero.querySelector(selector), host = hero.querySelector(parent);
    if (!node || !host) continue;
    host.append(node);
    node.style.cssText='position:absolute;inset:0 auto auto 0;animation:none;pointer-events:none;z-index:5;';
    function track() {
      const w=host.clientWidth,h=host.clientHeight;
      return stops.map(([x,y])=>({transform:'translate('+Math.round(Math.min(w*x,Math.max(0,w-92)))+'px,'+Math.round(h*y)+'px)'}));
    }
    const player=node.animate(track(),{id:'collaborator-cursor',duration,iterations:Infinity,easing:'ease-in-out'});
    const observer=new ResizeObserver(()=>player.effect.setKeyframes(track()));observer.observe(host);
    cursors.push(player);
  }
  let visible=true;
  function sync() {
    for(const player of cursors) {
      if(preference.matches || document.hidden || !visible) player.pause();
      else player.play();
    }
    if(preference.matches) players.forEach(p=>p.cancel());
  }
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()}).observe(hero);
  document.addEventListener('visibilitychange',sync);
  preference.addEventListener('change',sync);sync();
})();

