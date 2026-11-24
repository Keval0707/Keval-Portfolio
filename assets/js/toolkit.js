(() => {
  const section = document.querySelector('.toolkit');
  if (!section) return;
  const tabs = [...section.querySelectorAll('[role="tab"]')];
  function select(index) {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !active;
      if (active && !matchMedia('(prefers-reduced-motion: reduce)').matches)
        panel.animate([{opacity:.4,translate:'0 4px'},{opacity:1,translate:'0 0'}],{duration:180,easing:'ease-out'});
    });
  }
  tabs.forEach((tab,i) => {
    tab.onclick = () => select(i);
    tab.onkeydown = event => {
      const targets = {ArrowRight:(i+1)%tabs.length,ArrowLeft:(i+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1};
      if (!(event.key in targets)) return;
      event.preventDefault();
      const next = targets[event.key];
      select(next);
      tabs[next].focus();
    };
  });
})();