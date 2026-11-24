(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let destination = 0;
  let lastTime = 0;
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
  }
  function step(time) {
    const distance = destination - window.scrollY;
    const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16;
    lastTime = time;
    if (Math.abs(distance) <= 1) {
      window.scrollTo({top: destination, behavior: 'instant'});
      stop();
      return;
    }
    const delta = Math.sign(distance) * Math.max(1, Math.abs(distance) * (1 - Math.exp(-elapsed / 72)));
    window.scrollTo({top: window.scrollY + delta, behavior: 'instant'});
    frame = requestAnimationFrame(step);
  }
  function wheel(event) {
    if (reduced.matches || !event.cancelable || event.defaultPrevented || event.ctrlKey ||
        event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        !event.deltaY || document.querySelector('dialog[open],.lightbox.open,.lightbox.is-open')) {
      stop();
      return;
    }
    if (!(event.target instanceof Element) || event.target.closest('input,select,textarea,[contenteditable=true]')) return;
    // Preserve native precision scrolling, pinch gestures and inner scroll regions.
    if (event.deltaMode === 0 && Math.abs(event.deltaY) < 48) { stop(); return; }
    for (let node = event.target; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
      if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight + 1) { stop(); return; }
    }
    const max = Math.max(0, document.scrollingElement.scrollHeight - window.innerHeight);
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
    destination = Math.max(0, Math.min(max, (frame ? destination : scrollY) + event.deltaY * unit));
    if (!frame && Math.abs(destination - scrollY) < 1) return;
    event.preventDefault();
    if (!frame) frame = requestAnimationFrame(step);
  }
  window.addEventListener('wheel', wheel, {passive:false});
  for (const name of ['keydown','pointerdown','touchstart','hashchange','resize','pagehide']) {
    window.addEventListener(name, stop, {passive:true});
  }
  document.addEventListener('visibilitychange', stop);
  reduced.addEventListener('change', stop);
})();
