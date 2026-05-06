// saas-launchfast — Mobile nav toggle
(function() {
  var toggle = document.getElementById('navToggle');
  var nav = document.querySelector('.nav');

  if (!toggle || !nav) return;

  function openNav() {
    nav.classList.add('nav-open');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    nav.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
  }

  // Toggle button (hamburger / X)
  toggle.addEventListener('click', function() {
    if (nav.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', closeNav);
  });

  // Close on action button click (Sign in, Start free)
  nav.querySelectorAll('.nav-actions a').forEach(function(link) {
    link.addEventListener('click', closeNav);
  });

  // Close on logo click (scrolls to top, close menu)
  nav.querySelector('.nav-logo').addEventListener('click', closeNav);

  // Tap the empty overlay area (outside nav-inner) to close
  nav.addEventListener('click', function(e) {
    if (nav.classList.contains('nav-open') && !e.target.closest('.nav-inner')) {
      closeNav();
    }
  });

  // Escape key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
      closeNav();
    }
  });
})();