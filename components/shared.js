/* CSGA Global — Shared Component Loader
   Dynamically loads header + footer, initialises interactions */
(function () {
  'use strict';

  /* ── Path detection ── */
  var path = window.location.pathname;
  var BASE = (path.indexOf('/blog/') !== -1) ? '..' : '.';
  var COMP = BASE + '/components';

  /* ── Helpers ── */
  function resolvePlaceholders(html) {
    return html.replace(/\{\{BASE\}\}/g, BASE);
  }

  function fetchHTML(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('Failed to load ' + url);
      return r.text();
    });
  }

  /* ── Inject CTA gradient keyframes ── */
  function injectCTAKeyframes() {
    if (document.getElementById('cta-kf')) return;
    var style = document.createElement('style');
    style.id = 'cta-kf';
    style.textContent =
      '@keyframes ctaGrad1{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}' +
      '@keyframes ctaGrad2{0%,100%{background-position:100% 50%}50%{background-position:0% 50%}}' +
      '@keyframes ctaGrad3{0%,100%{background-position:50% 0%}50%{background-position:50% 100%}}' +
      '@keyframes ctaGrad4{0%,100%{background-position:0% 0%}50%{background-position:100% 100%}}';
    document.head.appendChild(style);
  }

  /* ── Menu toggle ── */
  function initMenu() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('navBar');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      nav.classList.toggle('active');
      toggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
    /* Close mobile menu on link click */
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 900) {
          nav.classList.remove('active');
          toggle.textContent = '☰';
        }
      });
    });

    /* Mobile dropdown toggles */
    nav.querySelectorAll('.nav-dropdown > .nav-link').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          var parent = this.parentElement;
          var isOpen = parent.classList.contains('open');
          nav.querySelectorAll('.nav-dropdown.open').forEach(function (d) { d.classList.remove('open'); });
          if (!isOpen) parent.classList.add('open');
        }
      });
    });
  }

  /* ── Scroll reveal ── */
  function initReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  /* ── CTA Slideshow ── */
  function initCTASlideshow() {
    var slides = document.querySelectorAll('.cta-bg-slide');
    var dots = document.querySelectorAll('.cta-dot');
    if (!slides.length) return;
    var current = 0;
    var total = slides.length;

    function goTo(idx) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = idx % total;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    setInterval(function () { goTo(current + 1); }, 6000);
  }

  /* ── Social proof counter animation ── */
  function initCounters() {
    var badges = document.querySelectorAll('.trust-number');
    if (!badges.length) return;
    var animated = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          badges.forEach(function (el) {
            var target = el.textContent;
            var num = parseFloat(target);
            if (isNaN(num)) return;
            var isDecimal = target.indexOf('.') !== -1;
            var suffix = target.replace(/[\d.]/g, '');
            var steps = 40;
            var step = 0;
            var timer = setInterval(function () {
              step++;
              var val = (num / steps) * step;
              if (step >= steps) {
                el.textContent = target;
                clearInterval(timer);
              } else {
                el.textContent = (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
              }
            }, 30);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    var trustRow = document.querySelector('.trust-badges');
    if (trustRow) observer.observe(trustRow);
  }

  /* ── Active nav link highlighting ── */
  function highlightActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-bar a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      var linkPage = href.split('/').pop();
      if (linkPage === page) {
        a.classList.add('active');
      }
    });
  }

  /* ── Header scroll behaviour ── */
  function initHeaderScroll() {
    var header = document.querySelector('.header-bar');
    if (!header) return;
    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      if (y > 120) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastY = y;
    }, { passive: true });
  }

  /* ── Boot ── */
  function boot() {
    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');

    var jobs = [];

    if (headerEl) {
      jobs.push(
        fetchHTML(COMP + '/header.html').then(function (html) {
          headerEl.innerHTML = resolvePlaceholders(html);
        })
      );
    }

    if (footerEl) {
      jobs.push(
        fetchHTML(COMP + '/footer.html').then(function (html) {
          footerEl.innerHTML = resolvePlaceholders(html);
        })
      );
    }

    Promise.all(jobs).then(function () {
      initMenu();
      initCTASlideshow();
      injectCTAKeyframes();
      initCounters();
      highlightActiveNav();
      initHeaderScroll();
      /* Delay reveal init slightly so injected elements are in DOM */
      requestAnimationFrame(function () {
        initReveal();
      });
    }).catch(function (err) {
      console.error('[CSGA Shared]', err);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
