// saas-launchfast — Mobile nav toggle
(function() {
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('nav-open');
    });

    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('.nav-links a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('nav-open');
      });
    });
  }
})();