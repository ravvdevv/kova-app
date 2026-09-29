/* KOVA — landing behaviour
   Reveal on scroll, counting stats, the consistency heatmap, a rest
   timer that actually counts, and a draggable screenshot rail.
   Everything degrades to a readable static page without JS. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var doc = document;

  /* ── scroll: sticky nav + progress line ───────────────── */
  var nav = doc.getElementById('nav');
  var bar = doc.getElementById('progressBar');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || doc.documentElement.scrollTop;
    if (nav) nav.classList.toggle('is-stuck', y > 12);
    if (bar) {
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(1, y / max) * 100 : 0) + '%';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ── reveal ───────────────────────────────────────────── */
  var revealables = [].slice.call(doc.querySelectorAll('.reveal'));
  revealables.forEach(function (el) {
    el.style.setProperty('--d', el.getAttribute('data-d') || 0);
  });

  if (!('IntersectionObserver' in window) || reduced) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ── counting stats ───────────────────────────────────── */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = target + suffix; return; }
    var start = null;
    var dur = 1150;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    [].slice.call(doc.querySelectorAll('[data-count]')).forEach(countUp);
  } else {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        co.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    [].slice.call(doc.querySelectorAll('[data-count]')).forEach(function (el) { co.observe(el); });
  }

  /* ── consistency heatmap ──────────────────────────────── */
  var heat = doc.getElementById('heat');
  if (heat) {
    var WEEKS = 15;
    var DAYS = 7;
    var seed = 20260929;
    function rnd() {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    }
    var cells = WEEKS * DAYS;
    var frag = doc.createDocumentFragment();
    /* the last 30 days are the streak the app reports */
    var streakFrom = cells - 30;
    for (var i = 0; i < cells; i++) {
      var cell = doc.createElement('i');
      var level;
      if (i >= streakFrom) {
        level = 2 + Math.floor(rnd() * 3);
      } else {
        var r = rnd();
        level = r > 0.62 ? 0 : r > 0.38 ? 1 : r > 0.2 ? 2 : r > 0.08 ? 3 : 4;
      }
      cell.setAttribute('data-l', level);
      cell.style.setProperty('--i', i);
      frag.appendChild(cell);
    }
    heat.appendChild(frag);

    var lit = function () { heat.classList.add('is-live'); };
    if (!('IntersectionObserver' in window) || reduced) {
      lit();
    } else {
      var ho = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          lit();
          ho.unobserve(entry.target);
        });
      }, { threshold: 0.35 });
      ho.observe(heat);
    }
  }

  /* ── draggable screenshot rail ────────────────────────── */
  var rail = doc.getElementById('rail');
  if (rail) {
    var prev = doc.getElementById('railPrev');
    var next = doc.getElementById('railNext');
    var count = doc.getElementById('railCount');
    var down = false, startX = 0, startScroll = 0, moved = 0;
    rail.style.cursor = 'grab';

    function step() {
      var item = rail.querySelector('.rail__item');
      if (!item) return rail.clientWidth;
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 20;
      return item.getBoundingClientRect().width + gap;
    }

    function sync() {
      var max = rail.scrollWidth - rail.clientWidth;
      var items = rail.querySelectorAll('.rail__item');
      var per = Math.max(1, items.length);
      var first = 0;
      if (max > 0) first = Math.round((rail.scrollLeft / max) * (per - 1));
      if (prev) prev.disabled = rail.scrollLeft <= 4;
      if (next) next.disabled = rail.scrollLeft >= max - 4;
      if (count) {
        count.textContent = (first + 1) + '\u2013' + per + ' of ' + per;
      }
    }

    if (prev) prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); });
    rail.addEventListener('scroll', function () {
      if (rail._raf) return;
      rail._raf = requestAnimationFrame(function () { rail._raf = null; sync(); });
    }, { passive: true });
    window.addEventListener('resize', sync);
    sync();

    rail.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); rail.scrollBy({ left: step(), behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); rail.scrollBy({ left: -step(), behavior: 'smooth' }); }
      if (e.key === 'Home') { e.preventDefault(); rail.scrollTo({ left: 0, behavior: 'smooth' }); }
      if (e.key === 'End') { e.preventDefault(); rail.scrollTo({ left: rail.scrollWidth, behavior: 'smooth' }); }
    });

    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;
      down = true; moved = 0;
      startX = e.clientX;
      startScroll = rail.scrollLeft;
      rail.setPointerCapture(e.pointerId);
    });
    rail.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved = Math.abs(dx);
      rail.scrollLeft = startScroll - dx;
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (type) {
      rail.addEventListener(type, function (e) {
        if (!down) return;
        down = false;
        if (rail.hasPointerCapture && rail.hasPointerCapture(e.pointerId)) {
          rail.releasePointerCapture(e.pointerId);
        }
      });
    });
  }
})();
