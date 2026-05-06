(function() {
  'use strict';

  // ============================
  // Theme Toggle
  // ============================
  var themeToggle = document.getElementById('themeToggle');
  var html = document.documentElement;

  function setTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('barakah-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('barakah-theme', 'dark');
    }
  }

  var savedTheme = localStorage.getItem('barakah-theme');
  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    setTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      var isLight = html.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  // Detect touch device
  var isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // ============================
  // Custom Cursor
  // ============================
  var cursor = document.getElementById('cursor');
  var follower = document.getElementById('cursorFollower');
  var cursorX = 0, cursorY = 0;
  var followerX = 0, followerY = 0;
  var mouseX = 0, mouseY = 0;
  var isActive = false;
  var rafId = null;

  if (!isTouch && cursor && follower) {
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isActive) {
        isActive = true;
        animateCursor();
      }
    });

    document.addEventListener('mouseleave', function() {
      document.body.classList.add('cursor-hidden');
    });

    document.addEventListener('mouseenter', function() {
      document.body.classList.remove('cursor-hidden');
    });

    // Hover states
    var hoverTargets = document.querySelectorAll('a, button, .work-card, .service-card, .testimonial-card');
    hoverTargets.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        if (follower) follower.classList.add('hover');
      });
      el.addEventListener('mouseleave', function() {
        if (follower) follower.classList.remove('hover');
      });
    });

    function animateCursor() {
      if (!isActive) return;

      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;

      cursor.style.transform = 'translate(' + (cursorX - 4) + 'px, ' + (cursorY - 4) + 'px)';
      follower.style.transform = 'translate(' + (followerX - 16) + 'px, ' + (followerY - 16) + 'px)';

      rafId = requestAnimationFrame(animateCursor);
    }
  }

  // ============================
  // Magnetic Buttons
  // ============================
  if (!isTouch) {
    var magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
      });

      btn.addEventListener('mouseleave', function() {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ============================
  // Scroll Reveal (IntersectionObserver)
  // ============================
  var revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealElements.length) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately
    revealElements.forEach(function(el) {
      el.classList.add('revealed');
    });
  }

  // ============================
  // Mobile Navigation
  // ============================
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

  // Cleanup on page hide
  document.addEventListener('visibilitychange', function() {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      isActive = false;
    }
  });
})();
