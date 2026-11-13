(() => {
  'use strict';
  const key='zdj-theme',system=matchMedia('(prefers-color-scheme: dark)');
  const saved=()=>{try{const value=localStorage.getItem(key);return value==='light'||value==='dark'?value:null;}catch{return null;}};
  const icon=dark=>dark?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>':'<path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z"/>';
  function apply(value){
    const dark=value==='dark';document.documentElement.dataset.theme=dark?'dark':'light';document.documentElement.style.colorScheme=dark?'dark':'light';
    document.querySelectorAll('#theme,[data-theme-toggle]').forEach(button=>{const label=dark?'切换到浅色模式':'切换到深色模式';button.setAttribute('aria-label',label);button.title=label;button.setAttribute('aria-pressed',String(dark));button.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'+icon(dark)+'</svg>';});
  }
  const refresh=()=>apply(saved()||(system.matches?'dark':'light'));
  refresh();
  document.addEventListener('DOMContentLoaded',()=>{refresh();document.querySelectorAll('#theme,[data-theme-toggle]').forEach(button=>button.addEventListener('click',()=>{const value=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem(key,value);}catch{}apply(value);}));});
  addEventListener('pageshow',refresh);
  addEventListener('storage',event=>{if(event.key===key||event.key===null)refresh();});
  system.addEventListener('change',()=>{if(!saved())refresh();});
})();
