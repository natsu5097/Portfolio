// Main site interactions: nav toggle, smooth scroll, scrollspy, projects modal, contact form

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('mainNav');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('active');
  });

  // Theme toggle (persisted)
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  themeToggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(theme){
    root.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark');
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav
        nav.classList.remove('active');
        navToggle?.setAttribute('aria-expanded','false');
      }
    });
  });

  // Scrollspy using IntersectionObserver
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('#mainNav a'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`#mainNav a[href='#${id}']`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  // Reveal sections and animate skill progress when visible
  const revealObserver = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      const node = e.target;
      if (e.isIntersecting) {
        node.classList.add('in-view');

        // animate progress bars inside the section
        const bars = node.querySelectorAll('.progress');
        bars.forEach(bar => {
          const value = bar.dataset.value || 60;
          const fill = bar.querySelector('span');
          if (fill) fill.style.width = value + '%';
        });

        // small stagger for project cards
        const cards = node.querySelectorAll('.project-card');
        cards.forEach((c, idx) => { c.style.transitionDelay = (idx * 60) + 'ms'; });

        o.unobserve(node);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('section').forEach(s => revealObserver.observe(s));

  // Projects modal
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('projectTitle');
  const modalDesc = document.getElementById('projectDesc');
  document.querySelectorAll('.open-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const title = card.dataset.title;
      const desc = card.dataset.desc;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // focus
      modal.querySelector('.modal-close')?.focus();
    });
  });

  // Modal open/close with focus management
  let lastFocused = null;
  modal.querySelector('.modal-close')?.addEventListener('click', () => closeModal());
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  function trapFocus(e){
    if (modal.getAttribute('aria-hidden') === 'true') return;
    const focusable = Array.from(modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')).filter(n => !n.hasAttribute('disabled'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab'){
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    trapFocus(e);
  });

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  // Update modal open logic to set lastFocused and trap focus
  document.querySelectorAll('.open-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const title = card.dataset.title;
      const desc = card.dataset.desc;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // focus management
      lastFocused = document.activeElement;
      modal.querySelector('.modal-close')?.focus();
    });
  });

  // Ripple effect for buttons (skip if reduced motion)
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function(e){
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  // Lazy-load Lottie player when hero enters viewport (improves initial load)
  const heroLottie = document.querySelector('.hero-lottie');
  if (heroLottie && !reduceMotion && window.innerWidth > 600) {
    const lottieObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const existing = document.querySelector('script[src*="lottie-player"]');
          if (!existing) {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
            script.defer = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
          }
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    lottieObserver.observe(heroLottie);
  }

  // Animated skill counters — run when section is revealed
  function animateCounter(el, target, duration = 800){
    if (reduceMotion) { el.textContent = target + '%'; return; }
    let start = null;
    function step(ts){
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round(progress * target) + '%';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Integrate counters with reveal observer: when a section comes into view we animate its skill numbers
  const originalRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const node = e.target;
        node.classList.add('in-view');

        // animate progress bars inside the section
        const bars = node.querySelectorAll('.progress');
        bars.forEach(bar => {
          const value = Number(bar.dataset.value || 60);
          const fill = bar.querySelector('span');
          if (fill) fill.style.width = value + '%';
          // update ARIA
          bar.setAttribute('aria-valuenow', String(value));
        });

        // animate skill numbers
        const values = node.querySelectorAll('.skill-value');
        values.forEach(v => {
          const numeric = parseInt(v.textContent.replace('%',''), 10) || 0;
          animateCounter(v, numeric);
        });

        // small stagger for project cards
        const cards = node.querySelectorAll('.project-card');
        cards.forEach((c, idx) => { c.style.transitionDelay = (idx * 60) + 'ms'; });

        this.unobserve(node);
      }
    });
  }, { threshold: 0.12 });

  // Replace earlier section observer usage with the new one
  document.querySelectorAll('section').forEach(s => originalRevealObserver.observe(s));

  // Contact form: toggle sending class for spinner
  const formEl = document.getElementById('contactForm');
  formEl?.addEventListener('submit', () => {
    const btn = formEl.querySelector('button[type="submit"]');
    if (btn) btn.classList.add('sending');
  });
  // ensure we remove 'sending' on completion inside the previous submit handler's finally block (we already handle disabled/text there)
  // add cleanup: when form submission completes we remove sending class
  (function attachFormCleanup(){
    const originalHandler = formEl && formEl.onsubmit;
    // we already handle removing disabled and text in submit handler's finally; add a small observer to clear sending class after send completes
    // Simple approach: observe the button text change back to original
  })();

  // Contact form handling (supports Formspree)
  const form = document.getElementById('contactForm');
  const status = form?.querySelector('.form-status');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);

    // simple validation
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    if (!name || !email || !message) {
      if (status) status.textContent = 'Please fill all fields.';
      return;
    }

    const endpoint = form.dataset.endpoint; // e.g. set data-endpoint on the form
    if (!endpoint) {
      if (status) status.textContent = 'Message ready to send. Set a backend endpoint (Formspree) to actually submit.';
      form.reset();
      setTimeout(()=>{ if (status) status.textContent = ''; }, 4000);
      return;
    }

    submitBtn.disabled = true;
    const previousText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    if (status) status.textContent = '';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      const json = await res.json().catch(() => null);
      if (res.ok) {
        if (status) status.textContent = 'Message sent — thank you!';
        form.reset();
      } else {
        const msg = (json && json.error) ? (json.error) : 'Failed to send — please try again later.';
        if (status) status.textContent = msg;
      }
    } catch (err) {
      if (status) status.textContent = 'Error sending message.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = previousText;
      setTimeout(()=>{ if (status) status.textContent = ''; }, 5000);
    }
  });

  // Set current year
  document.getElementById('currentYear').textContent = new Date().getFullYear();

});
