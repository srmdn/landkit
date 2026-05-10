     1|// Nur - Scroll animations, counter, mobile nav, TV clock
     2|(function() {
     3|  'use strict';
     4|
     5|  /* === MOBILE NAV === */
     6|  var toggle = document.getElementById('navToggle');
     7|  var nav = document.getElementById('nav');
     8|  var navLogo = document.getElementById('navLogo');
     9|
    10|  if (toggle && nav) {
    11|    function openNav() {
    12|      nav.classList.add('nav-open');
    13|      document.body.classList.add('nav-open');
    14|    }
    15|    function closeNav() {
    16|      nav.classList.remove('nav-open');
    17|      document.body.classList.remove('nav-open');
    18|    }
    19|
    20|    toggle.addEventListener('click', function() {
    21|      if (nav.classList.contains('nav-open')) {
    22|        closeNav();
    23|      } else {
    24|        openNav();
    25|      }
    26|    });
    27|
    28|    nav.querySelectorAll('.nav-links a').forEach(function(link) {
    29|      link.addEventListener('click', closeNav);
    30|    });
    31|    nav.querySelectorAll('.nav-actions a').forEach(function(btn) {
    32|      btn.addEventListener('click', closeNav);
    33|    });
    34|    if (navLogo) navLogo.addEventListener('click', closeNav);
    35|
    36|    nav.addEventListener('click', function(e) {
    37|      if (nav.classList.contains('nav-open') && !e.target.closest('.nav-inner')) {
    38|        closeNav();
    39|      }
    40|    });
    41|
    42|    document.addEventListener('keydown', function(e) {
    43|      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
    44|        closeNav();
    45|      }
    46|    });
    47|  }
    48|
    49|  /* === TV CLOCK === */
    50|  var tvTimeEl = document.getElementById('tvTime');
    51|  if (tvTimeEl) {
    52|    function updateTVClock() {
    53|      var now = new Date();
    54|      var h = now.getHours().toString().padStart(2, '0');
    55|      var m = now.getMinutes().toString().padStart(2, '0');
    56|      var ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    57|      var h12 = now.getHours() % 12 || 12;
    58|      tvTimeEl.textContent = h12.toString().padStart(2, '0') + ':' + m + ' ' + ampm;
    59|    }
    60|    updateTVClock();
    61|    setInterval(updateTVClock, 10000);
    62|  }
    63|
    64|  /* === SCROLL REVEAL === */
    65|  var revealEls = document.querySelectorAll('.reveal');
    66|  if ('IntersectionObserver' in window && revealEls.length > 0) {
    67|    var revealObserver = new IntersectionObserver(function(entries) {
    68|      entries.forEach(function(entry) {
    69|        if (entry.isIntersecting) {
    70|          entry.target.classList.add('visible');
    71|          revealObserver.unobserve(entry.target);
    72|        }
    73|      });
    74|    }, {
    75|      threshold: 0.1,
    76|      rootMargin: '0px 0px -40px 0px'
    77|    });
    78|    revealEls.forEach(function(el) {
    79|      revealObserver.observe(el);
    80|    });
    81|  } else {
    82|    // Fallback
    83|    revealEls.forEach(function(el) {
    84|      el.classList.add('visible');
    85|    });
    86|  }
    87|
    88|  /* === ANIMATED COUNTERS === */
    89|  var counterEls = document.querySelectorAll('.counter');
    90|  if (counterEls.length > 0 && 'IntersectionObserver' in window) {
    91|    var counted = {};
    92|
    93|    function animateCounter(el) {
    94|      var target = parseFloat(el.getAttribute('data-target'));
    95|      if (isNaN(target)) return;
    96|      var isDecimal = target % 1 !== 0;
    97|      var duration = 1500;
    98|      var startTime = performance.now();
    99|
   100|      function step(currentTime) {
   101|        var elapsed = currentTime - startTime;
   102|        var progress = Math.min(elapsed / duration, 1);
   103|        // easeOutQuart
   104|        var eased = 1 - Math.pow(1 - progress, 4);
   105|        var current = target * eased;
   106|        if (isDecimal) {
   107|          el.textContent = current.toFixed(1);
   108|        } else {
   109|          el.textContent = Math.floor(current);
   110|        }
   111|        if (progress < 1) {
   112|          requestAnimationFrame(step);
   113|        } else {
   114|          el.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
   115|        }
   116|      }
   117|      requestAnimationFrame(step);
   118|    }
   119|
   120|    var counterObserver = new IntersectionObserver(function(entries) {
   121|      entries.forEach(function(entry) {
   122|        if (entry.isIntersecting && !counted[entry.target.dataset.target]) {
   123|          counted[entry.target.dataset.target] = true;
   124|          animateCounter(entry.target);
   125|          counterObserver.unobserve(entry.target);
   126|        }
   127|      });
   128|    }, { threshold: 0.5 });
   129|
   130|    counterEls.forEach(function(el) {
   131|      counterObserver.observe(el);
   132|    });
   133|  } else {
   134|    // Fallback: show target value immediately
   135|    counterEls.forEach(function(el) {
   136|      var target = el.getAttribute('data-target');
   137|      if (target) el.textContent = target;
   138|    });
   139|  }
   140|
   141|})();
   142|