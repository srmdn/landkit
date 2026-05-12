(function () {
  'use strict';

  // Nav scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Curriculum accordion
  document.querySelectorAll('.module-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const block = btn.closest('.module-block');
      const lessons = block.querySelector('.module-lessons');
      const isOpen = block.classList.contains('open');
      block.classList.toggle('open', !isOpen);
      lessons.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
      lessons.setAttribute('aria-hidden', isOpen);
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      answer.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
      answer.setAttribute('aria-hidden', isOpen);
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { observer.observe(el); });

  // Countdown to June 15, 2026 23:59:59 WIB (UTC+7)
  const deadline = new Date('2026-06-15T23:59:59+07:00').getTime();
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMins.textContent = '00';
      cdSecs.textContent = '00';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    cdDays.textContent = pad(d);
    cdHours.textContent = pad(h);
    cdMins.textContent = pad(m);
    cdSecs.textContent = pad(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Email forms
  function handleForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = 'Reserved! Check your email.';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      setTimeout(function () {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.opacity = '';
        form.reset();
      }, 4000);
    });
  }

  handleForm('heroForm');
  handleForm('ctaForm');
})();
