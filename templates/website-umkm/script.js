// website-umkm — Mobile nav toggle + scroll animations
(function() {
  var toggle = document.getElementById('navToggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    function openNav() {
      nav.classList.add('nav-open');
    }

    function closeNav() {
      nav.classList.remove('nav-open');
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

    // Close on WA button click
    nav.querySelectorAll('.nav-wa a').forEach(function(link) {
      link.addEventListener('click', closeNav);
    });

    // Close on logo click
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
  }

  // Scroll fade-in animations
  var observerTargets = '.keunggulan-item, .produk-card, .langkah-item, .testimoni-card, .faq-item, .cta-section';
  var els = document.querySelectorAll(observerTargets);
  if (els.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function(el) { obs.observe(el); });
  } else {
    els.forEach(function(el) { el.classList.add('visible'); });
  }
})();