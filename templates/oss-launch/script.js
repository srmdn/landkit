(function () {
  'use strict';

  /* ============================= */
  /*        Mobile Nav Toggle       */
  /* ============================= */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function openNav() {
    nav.classList.add('nav-open');
    document.body.classList.add('nav-open');
  }

  function closeNav() {
    nav.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });

    nav.querySelectorAll('.nav-links a, .nav-actions a, .nav-logo').forEach(function (el) {
      el.addEventListener('click', closeNav);
    });

    nav.addEventListener('click', function (e) {
      if (nav.classList.contains('nav-open') && !e.target.closest('.nav-inner')) {
        closeNav();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
  }

  /* ============================= */
  /*      Copy Install Command      */
  /* ============================= */
  var copyBtn = document.getElementById('copyBtn');
  var installCmd = document.getElementById('installCmd');

  if (copyBtn && installCmd) {
    copyBtn.addEventListener('click', function () {
      var text = installCmd.textContent.trim();
      var btn = this;

      function showCopied() {
        btn.classList.add('copied');
        setTimeout(function () {
          btn.classList.remove('copied');
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(function () {
          fallbackCopy(text, showCopied);
        });
      } else {
        fallbackCopy(text, showCopied);
      }
    });
  }

  function fallbackCopy(text, callback) {
    var el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.focus();
    el.select();
    try {
      document.execCommand('copy');
      callback();
    } catch (e) {}
    document.body.removeChild(el);
  }

  /* ============================= */
  /*         Scroll Reveal          */
  /* ============================= */
  var revealEls = document.querySelectorAll('.feature-card, .step, .stat-item');

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window && revealEls.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

})();
