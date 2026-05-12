(function() {
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
    toggle.addEventListener('click', function() {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });

    nav.querySelectorAll('.nav-links a, .nav-wa, .nav-logo').forEach(function(el) {
      el.addEventListener('click', closeNav);
    });

    nav.addEventListener('click', function(e) {
      if (nav.classList.contains('nav-open') && !e.target.closest('.nav-inner')) {
        closeNav();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
  }

  /* ============================= */
  /*         FAQ Accordion         */
  /* ============================= */
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = this.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      // Close all FAQ items
      document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
        openItem.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ============================= */
  /*      Kalkulator Qurban        */
  /* ============================= */
  var calcTabs = document.querySelectorAll('.calc-tab');
  var kambingPanel = document.getElementById('calcKambing');
  var sapiPanel = document.getElementById('calcSapi');

  // Kambing inputs
  var kambingPrice = document.getElementById('kambingPrice');
  var kambingMeat = document.getElementById('kambingMeat');
  var kambingCostResult = document.getElementById('kambingCostResult');
  var kambingMeatResult = document.getElementById('kambingMeatResult');

  // Sapi inputs
  var sapiPrice = document.getElementById('sapiPrice');
  var sapiPeople = document.getElementById('sapiPeople');
  var sapiMinus = document.getElementById('sapiMinus');
  var sapiPlus = document.getElementById('sapiPlus');
  var sapiMeat = document.getElementById('sapiMeat');
  var sapiCostResult = document.getElementById('sapiCostResult');
  var sapiMeatResult = document.getElementById('sapiMeatResult');

  function formatRupiah(num) {
    return 'Rp' + Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  function updateKambing() {
    var price = parseInt(kambingPrice.value) || 2900000;
    var meat = parseFloat(kambingMeat.value) || 14;
    kambingCostResult.textContent = formatRupiah(price);
    kambingMeatResult.textContent = meat + ' kg';
  }

  function updateSapi() {
    var price = parseInt(sapiPrice.value) || 21000000;
    var people = parseInt(sapiPeople.value) || 5;
    var meat = parseFloat(sapiMeat.value) || 140;

    if (people < 1) { people = 1; sapiPeople.value = 1; }
    if (people > 7) { people = 7; sapiPeople.value = 7; }

    var costPerPerson = price / people;
    var meatPerPerson = meat / people;

    sapiCostResult.textContent = formatRupiah(costPerPerson);
    sapiMeatResult.textContent = meatPerPerson.toFixed(1) + ' kg';
  }

  // Tab switching
  calcTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      calcTabs.forEach(function(t) { t.classList.remove('active'); });
      this.classList.add('active');

      if (this.dataset.animal === 'kambing') {
        kambingPanel.classList.add('calc-panel-active');
        sapiPanel.classList.remove('calc-panel-active');
      } else {
        sapiPanel.classList.add('calc-panel-active');
        kambingPanel.classList.remove('calc-panel-active');
      }
    });
  });

  // Kambing input events
  if (kambingPrice) kambingPrice.addEventListener('input', updateKambing);
  if (kambingMeat) kambingMeat.addEventListener('input', updateKambing);

  // Sapi input events
  if (sapiPrice) sapiPrice.addEventListener('input', updateSapi);
  if (sapiMeat) sapiMeat.addEventListener('input', updateSapi);

  // Sapi stepper
  if (sapiMinus) {
    sapiMinus.addEventListener('click', function() {
      var val = parseInt(sapiPeople.value) || 5;
      if (val > 1) {
        sapiPeople.value = val - 1;
        updateSapi();
      }
    });
  }

  if (sapiPlus) {
    sapiPlus.addEventListener('click', function() {
      var val = parseInt(sapiPeople.value) || 5;
      if (val < 7) {
        sapiPeople.value = val + 1;
        updateSapi();
      }
    });
  }

  if (sapiPeople) sapiPeople.addEventListener('change', updateSapi);

  // Initial calculation
  updateKambing();
  updateSapi();

  /* ============================= */
  /*        Scroll Reveal          */
  /* ============================= */
  var revealElements = document.querySelectorAll('.about-card, .pricing-card, .step-card, .faq-item');

  function revealElement(el) {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    revealElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function(el) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        // Already visible on load
        revealElement(el);
      } else {
        observer.observe(el);
      }
    });
  }

})();
