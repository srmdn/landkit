/**
 * Pocket - Mobile App Landing Template
 * Vanilla JS. Zero dependencies.
 * Features: Mobile nav toggle, scroll reveal
 */

(function () {
  'use strict';

  /* ==========================================
     1. MOBILE NAV TOGGLE
     ========================================== */
  function initNav() {
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

    toggle.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });

    // Close on nav link click
    nav.querySelectorAll('.nav-links a').forEach(function (l) {
      l.addEventListener('click', closeNav);
    });

    // Close on logo click
    var logo = nav.querySelector('.nav-logo');
    if (logo) logo.addEventListener('click', closeNav);

    // Tap overlay area to close
    nav.addEventListener('click', function (e) {
      if (nav.classList.contains('nav-open') && !e.target.closest('.nav-inner')) {
        closeNav();
      }
    });

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
  }

  /* ==========================================
     2. SCROLL REVEAL
     ========================================== */
  function initScrollReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (els.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.classList.add('revealed');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================
     INIT
     ========================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initNav();
      initScrollReveal();
    });
  } else {
    initNav();
    initScrollReveal();
  }

})();
