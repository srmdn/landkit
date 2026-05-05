// saas-launchfast — Mobile nav toggle + monetization CTA dismiss
(function() {
  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('nav-open');
    });
    nav.querySelectorAll('.nav-links a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('nav-open');
      });
    });
  }

  // Monetization CTA dismiss
  var saCta = document.getElementById('saCta');
  var saCtaClose = document.getElementById('saCtaClose');
  if (saCta && saCtaClose) {
    saCtaClose.addEventListener('click', function() {
      saCta.style.display = 'none';
    });
  }
})();