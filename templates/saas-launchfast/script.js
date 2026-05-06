// saas-launchfast — Mobile nav toggle
(function() {
  var toggle = document.getElementById('navToggle');
  var nav = document.querySelector('.nav');

  function openNav() {
    nav.classList.add('nav-open');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    nav.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      if (nav.classList.contains('nav-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on nav link click
    nav.querySelectorAll('.nav-links a').forEach(function(link) {
      link.addEventListener('click', function() {
        closeNav();
      });
    });

    // Close on action buttons click (Sign in, Start free)
    nav.querySelectorAll('.nav-actions a').forEach(function(link) {
      link.addEventListener('click', function() {
        closeNav();
      });
    });

    // Close on click outside nav
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('nav-open') && !nav.contains(e.target)) {
        closeNav();
      }
    });

    // Close on scroll past threshold (if menu is open and user scrolls on body somehow)
    var scrollY = 0;
    window.addEventListener('scroll', function() {
      if (nav.classList.contains('nav-open') && Math.abs(window.scrollY - scrollY) > 50) {
        closeNav();
      }
    }, { passive: true });
  }
})();