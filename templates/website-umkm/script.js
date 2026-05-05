// website-umkm — Mobile nav toggle + scroll animations + monetization CTA dismiss
(function() {
  // Mobile nav toggle
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
    // Fallback: show all immediately
    els.forEach(function(el) { el.classList.add('visible'); });
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