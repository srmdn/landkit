/**
 * Orbit Launch - Coming Soon Template
 * Vanilla JS. Zero dependencies.
 * Features: Countdown timer, canvas starfield, scroll reveal, email form handler
 */

(function () {
  'use strict';

  /* ==========================================
     1. COUNTDOWN TIMER
     ========================================== */
  function initCountdown() {
    var els = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      minutes: document.getElementById('cd-minutes'),
      seconds: document.getElementById('cd-seconds')
    };

    // Set target date: 30 days from page load
    var target = new Date();
    target.setDate(target.getDate() + 30);
    target.setHours(0, 0, 0, 0);

    function pad(n) {
      return n < 10 ? '0' + n : '' + n;
    }

    function update() {
      var now = new Date();
      var diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        els.days.textContent = '00';
        els.hours.textContent = '00';
        els.minutes.textContent = '00';
        els.seconds.textContent = '00';
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      els.days.textContent = pad(days);
      els.hours.textContent = pad(hours);
      els.minutes.textContent = pad(minutes);
      els.seconds.textContent = pad(seconds);
    }

    update();
    setInterval(update, 1000);
  }

  /* ==========================================
     2. CANVAS STARFIELD
     ========================================== */
  function initStarfield() {
    var canvas = document.getElementById('starfield');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var stars = [];
    var STAR_COUNT = 300;
    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Generate stars
    for (var i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 3,       // depth layer (1-3)
        size: Math.random() * 1.8 + 0.5,
        speed: Math.random() * 0.2 + 0.02,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    var time = 0;

    function draw() {
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parallax offset (subtle - 2% of mouse position from center)
      var px = (mouseX - canvas.width / 2) * 0.02;
      var py = (mouseY - canvas.height / 2) * 0.02;

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var parallaxFactor = s.z * px;
        var parallaxFactorY = s.z * py;

        var x = s.x + parallaxFactor;
        var y = s.y + parallaxFactorY;

        // Wrap around edges for infinite feel
        if (x < -10) x = canvas.width + 10;
        if (x > canvas.width + 10) x = -10;
        if (y < -10) y = canvas.height + 10;
        if (y > canvas.height + 10) y = -10;
        s.x = x - parallaxFactor;
        s.y = y - parallaxFactorY;

        var twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase) * 0.3 + 0.7;
        var alpha = s.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(x, y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 240, 250, ' + alpha + ')';
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Start animation
    draw();
  }

  /* ==========================================
     3. SCROLL REVEAL
     ========================================== */
  function initScrollReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (els.length === 0) return;

    // Fallback: if IntersectionObserver not available, reveal all immediately
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
     4. EMAIL FORM HANDLERS
     ========================================== */
  function initForms() {
    var forms = document.querySelectorAll('form[id$="Form"]');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (!input || !input.value.trim()) return;

        var email = input.value.trim();
        var btn = form.querySelector('button');
        var originalText = btn.textContent;

        // Disable and show feedback
        btn.disabled = true;
        btn.textContent = "YOU'RE ON THE LIST";

        // Reset after 3 seconds
        setTimeout(function () {
          btn.disabled = false;
          btn.textContent = originalText;
          input.value = '';
        }, 3000);

        // Here you would normally send to your API
        // console.log('Email captured:', email);
      });
    });
  }

  /* ==========================================
     INIT
     ========================================== */
  document.addEventListener('DOMContentLoaded', function () {
    initCountdown();
    initStarfield();
    initScrollReveal();
    initForms();
  });

})();
