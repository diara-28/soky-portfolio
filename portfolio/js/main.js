/* ============================================================
   PORTFOLIO — main.js
   Vanilla JS: Nav, Theme, Typed, Scroll Anim, Filter, Form
   ============================================================ */

/* ─── Utility ─── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ============================================================
   1. NAVBAR — sticky + active link highlighting
   ============================================================ */
(function initNav() {
  const navbar  = $('#navbar');
  const links   = $$('.nav-links a');
  const sections = $$('section[id]');

  window.addEventListener('scroll', () => {
    /* Sticky glass */
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    /* Active link */
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
})();

/* ============================================================
   2. MOBILE NAV
   ============================================================ */
(function initMobileNav() {
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobileNav');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* Close on link click */
  $$('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ============================================================
   3. DARK / LIGHT MODE TOGGLE
   ============================================================ */
(function initTheme() {
  const btn  = $('#themeBtn');
  const icon = $('#themeIcon');

  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') document.body.classList.add('light');
  updateIcon(saved === 'light');

  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcon(isLight);
  });

  function updateIcon(isLight) {
    icon.className = isLight ? 'ph ph-moon' : 'ph ph-sun';
  }
})();

/* ============================================================
   4. TYPED TEXT EFFECT  (hero role rotator)
   ============================================================ */
(function initTyped() {
  const el    = $('#typedText');
  if (!el) return;
  const words = ['Frontend Developer', 'Problem Solver', 'Creative Coder'];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; return setTimeout(tick, 1800); }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 60 : 100);
  }
  tick();
})();

/* ============================================================
   5. SCROLL REVEAL  (Intersection Observer)
   ============================================================ */
(function initReveal() {
  const targets = $$('.reveal, .reveal-left, .reveal-right');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => io.observe(t));
})();

/* ============================================================
   6. PROJECT FILTER
   ============================================================ */
(function initFilter() {
  const buttons = $$('.filter-btn');
  const cards   = $$('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const tags = card.dataset.tags || '';
        const show = filter === 'all' || tags.includes(filter);
        if (show) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ============================================================
   7. CONTACT FORM  (simulated submission)
   ============================================================ */
(function initForm() {
  const form   = $('#contactForm');
  const status = $('#formStatus');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');

    /* Loading state */
    btn.disabled = true;
    btn.textContent = 'Sending...';

    /* Simulate async send */
    await new Promise(r => setTimeout(r, 1500));

    /* Swap to success */
    status.className = 'form-status success';
    status.textContent = 'Message received. I will get back to you soon.';
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;

    setTimeout(() => { status.className = 'form-status'; }, 6000);
  });
})();

/* ============================================================
   8. SMOOTH SCROLL for anchor links
   ============================================================ */
document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const target = document.querySelector(anchor.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

/* ============================================================
   9. BACK TO TOP
   ============================================================ */
(function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   10. SKILL CARD — click to flip (touch support)
   ============================================================ */
(function initSkillFlip() {
  $$('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
})();

/*11. CURSOR GLOW on hero (desktop only)*/
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const hero = $('#hero');
  const glow = hero?.querySelector('.hero-glow');
  if (!glow) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 60;
    glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
})();
