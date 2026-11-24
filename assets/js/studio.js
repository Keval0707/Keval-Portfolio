(() => {
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const signature = root.dataset.entrance === 'signature';
  const curtain = document.querySelector('.kd-enter');
  if (signature && !motion.matches) {
    curtain.addEventListener('animationend', event => {
      if (event.target === curtain) curtain.remove();
    });
  } else curtain.remove();
  addEventListener('pageshow', event => { if (event.persisted) curtain.remove(); });

  const index = document.querySelector('.kd-map');
  const toggle = document.querySelector('.dock-zoom');
  toggle.addEventListener('click', () => { index.showModal(); index.querySelector('details').open = true; });
  index.querySelector('button').addEventListener('click', () => index.close());
  index.addEventListener('click', event => {
    const bounds = index.getBoundingClientRect();
    if (event.target === index && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) index.close();
  });
  index.addEventListener('close', () => toggle.focus({preventScroll:true}));
  document.addEventListener('keydown', event => {
    if (document.querySelector('dialog[open]') && !['Escape','Tab','Enter',' '].includes(event.key)) event.stopImmediatePropagation();
  }, true);

  const shortcuts = document.querySelector('.portfolio-dock');
  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey ||
        event.shiftKey || event.target.closest('input,textarea,select,[contenteditable=true]') ||
        document.querySelector('dialog[open],.lightbox.open,.lightbox.is-open')) return;
    const link = [...shortcuts.querySelectorAll('[data-key]')].find(el => el.dataset.key === event.key);
    if (link) {
      event.preventDefault();
      event.stopImmediatePropagation();
      link.click();
    }
  }, true);

  if (!motion.matches && 'IntersectionObserver' in window) {
    const headers = document.querySelectorAll('.kd-case main h2,.outside h2,.toolkit h2,.kd-page h2');
    const observer = new IntersectionObserver(entries => {
      for (const {target, isIntersecting} of entries) {
        if (!isIntersecting) continue;
        observer.unobserve(target);
        if (!motion.matches) target.animate([{opacity:.35,translate:'0 12px'},{opacity:1,translate:'0 0'}],
          {duration:500,easing:'cubic-bezier(.18,.72,.2,1)'});
      }
    }, {threshold:.14});
    headers.forEach(heading => observer.observe(heading));
  }
})();
(() => {
 const dialog = document.querySelector('.kd-map');
 const previews = dialog.querySelector('details');
 if (!previews) return;
 previews.addEventListener('toggle', () => {
   const grid = previews.querySelector('.kd-thumbs');
   if (!previews.open) {grid.replaceChildren();return;}
   const home = document.querySelector('.dock-link[data-key=h]').href;
   const pages = [['Home','index.html'],['Work','work/index.html'],['About','pages/about.html'],['Contact','pages/contact.html'],['Ananya International School','work/projects/ananya.html'],['Blitz Electrical','work/projects/blitz.html'],['Cloud Water','work/projects/cloudwater.html']];
   for (const [label, route] of pages) {
     const link = document.createElement('a');
     link.className='kd-thumb'; link.href=new URL(route,home).href;
     const wrap = document.createElement('span'),frame = document.createElement('iframe'),caption = document.createElement('small');
     frame.setAttribute('inert','');frame.tabIndex=-1;frame.setAttribute('aria-hidden','true');frame.title=label+' preview';frame.loading='lazy';frame.src=link.href;wrap.append(frame);caption.textContent=label;link.append(wrap,caption);grid.append(link);
   }
 });
 dialog.addEventListener('close',()=>{ previews.open=false; });
})();
