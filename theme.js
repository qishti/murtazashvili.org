(function(){
  var root = document.documentElement;

  /* ---- theme toggle ---- */
  var btn = document.getElementById('themeToggle');
  if(btn){
    btn.addEventListener('click', function(){
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try{ localStorage.setItem('jbm-theme', next); }catch(e){}
    });
  }

  /* ---- mobile menu (built from the existing nav links) ---- */
  var nav = document.querySelector('.site-head .nav');
  if(!nav) return;
  var links = nav.querySelectorAll('.nav-core a, .nav-extra a, a.nav-cv');
  if(!links.length) return;

  var burger = document.createElement('button');
  burger.className = 'nav-burger';
  burger.type = 'button';
  burger.setAttribute('aria-label', 'Open menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'mnav');
  burger.innerHTML = '<span></span><span></span>';
  nav.appendChild(burger);

  var panel = document.createElement('div');
  panel.className = 'mnav';
  panel.id = 'mnav';
  var list = document.createElement('nav');
  list.className = 'mnav-links';
  list.setAttribute('aria-label', 'Site menu');
  Array.prototype.forEach.call(links, function(a){
    var c = document.createElement('a');
    c.href = a.getAttribute('href');
    c.textContent = a.classList.contains('nav-cv') ? 'Curriculum Vitae' : a.textContent;
    if(a.classList.contains('nav-cv')){
      c.className = 'mnav-cv';
      c.target = '_blank'; c.rel = 'noopener';
    }
    if(a.getAttribute('aria-current')) c.setAttribute('aria-current', 'page');
    list.appendChild(c);
  });
  panel.appendChild(list);
  document.body.appendChild(panel);

  function setOpen(open){
    panel.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    root.classList.toggle('mnav-lock', open);
  }
  burger.addEventListener('click', function(){ setOpen(!panel.classList.contains('open')); });
  panel.addEventListener('click', function(e){ if(e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setOpen(false); });
  var mq = window.matchMedia('(min-width: 861px)');
  var onMq = function(e){ if(e.matches) setOpen(false); };
  if(mq.addEventListener) mq.addEventListener('change', onMq); else if(mq.addListener) mq.addListener(onMq);
})();
