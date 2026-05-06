(function() {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  function openNav() {
    nav.classList.add('nav-open');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    nav.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
  }

  toggle.addEventListener('click', function() {
    nav.classList.contains('nav-open') ? closeNav() : openNav();
  });

  nav.querySelectorAll('.nav-links a').forEach(function(l) {
    l.addEventListener('click', closeNav);
  });

  nav.querySelectorAll('.nav-actions a').forEach(function(l) {
    l.addEventListener('click', closeNav);
  });

  var logo = nav.querySelector('.nav-logo');
  if (logo) logo.addEventListener('click', closeNav);

  nav.addEventListener('click', function(e) {
    if (nav.classList.contains('nav-open') && !e.target.closest('.nav-inner')) {
      closeNav();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
  });
})();
