const portfolioURL = (() => {
  const root = new URL("../../", document.currentScript.src);
  const pages = {
  "index": "index.html",
  "work": "work/index.html",
  "about": "pages/about.html",
  
  "contact": "pages/contact.html",
  "ananya": "work/projects/ananya.html"
};
  return name => new URL(pages[name], root).href;
})();
