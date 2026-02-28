// Portfolio JavaScript - Separated from HTML

// ===== CURSOR =====
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }

  animCursor();

  document.querySelectorAll('a, button, .project-card, .service-card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ring.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.opacity = '0.5';
    });
  });
}

// ===== INTRO CANVAS PARTICLES =====
function initIntroCanvas() {
  const canvas = document.getElementById('introCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const codeChars = ['<', '>', '/', '{', '}', '(', ')', ';', '=', '=>', 'const', 'let', 'fn', '&&', '||', '0', '1'];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.3 + 0.05;
      this.size = Math.random() * 10 + 8;
      this.char = codeChars[Math.floor(Math.random() * codeChars.length)];
      this.color = Math.random() > 0.5 ? '#00f5c8' : '#5b8fff';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.font = `${this.size}px 'Space Mono', monospace`;
      ctx.fillStyle = this.color;
      ctx.fillText(this.char, this.x, this.y);
      ctx.restore();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animCanvas() {
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.save();
    ctx.strokeStyle = 'rgba(0,245,200,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();

    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animCanvas);
  }

  animCanvas();
}

// ===== INTRO DISMISS =====
function initIntro() {
  const intro = document.getElementById('intro');
  const app = document.getElementById('app');

  function hideIntro() {
    intro.classList.add('gone');
    app.classList.add('visible');
    setTimeout(() => {
      intro.style.display = 'none';
    }, 1000);
    setTimeout(animateSkills, 1200);
  }

  setTimeout(hideIntro, 4500);

  // Skip intro on click
  intro.addEventListener('click', () => {
    intro.classList.add('gone');
    app.classList.add('visible');
    setTimeout(() => {
      intro.style.display = 'none';
    }, 900);
    setTimeout(animateSkills, 1200);
  });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const roles = ['Aspiring Engineer', 'Web Developer', 'React Developer', 'Problem Solver', 'Open Source Fan'];
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typedEl = document.getElementById('typedText');

  function typeRole() {
    const role = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = role.slice(0, ++charIdx);
      if (charIdx === role.length) {
        deleting = true;
        setTimeout(typeRole, 2200);
        return;
      }
    } else {
      typedEl.textContent = role.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 55 : 85);
  }

  typeRole();
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach((el) => revealObs.observe(el));
}

// ===== SKILLS ANIMATION =====
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach((fill) => {
    fill.style.width = fill.dataset.width + '%';
  });
}

function initSkillsObserver() {
  const skillsObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateSkills();
        skillsObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) skillsObs.observe(skillsGrid);
}

// ===== NAV ACTIVE STATE =====
function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a:not(.nav-cta)');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
        );
      }
    });
  }, { threshold: 0.4 });
  sections.forEach((s) => navObs.observe(s));
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  hamburger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  mainNav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    })
  );
}

// ===== PROJECT MODAL =====
function initProjectModal() {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');

  document.querySelectorAll('.open-project').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modal.classList.add('open');
    });
  });

  document.getElementById('modalClose').addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = 'Sending...';
    await new Promise((r) => setTimeout(r, 1200));
    status.textContent = '✓ Message sent! I\'ll get back to you soon.';
    e.target.reset();
    setTimeout(() => {
      status.textContent = '';
    }, 4000);
  });
}

// ===== RESPONSIVE EDU-EXP GRID =====
function initEduExpGrid() {
  const grid = document.querySelector('.edu-exp-grid');
  if (!grid) return;

  function handleResize() {
    grid.style.gridTemplateColumns = window.innerWidth < 700 ? '1fr' : '1fr 1fr';
  }

  handleResize();
  window.addEventListener('resize', handleResize);
}

// ===== YEAR FOOTER =====
function setFooterYear() {
  const yearEl = document.getElementById('yr');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initIntroCanvas();
  initIntro();
  initTypingEffect();
  initScrollReveal();
  initSkillsObserver();
  initNavActive();
  initHamburger();
  initProjectModal();
  initContactForm();
  initEduExpGrid();
  setFooterYear();
});
