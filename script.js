// ============ THEME ============
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else {
  root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}
themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ============ NAV: scroll state + mobile menu + scrollspy ============
const navbar = document.getElementById('navbar');
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
const progressBar = document.getElementById('progressBar');

navBurger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  navBurger.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const sections = document.querySelectorAll('main .section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(s => { if (s.id) spy.observe(s); });

// ============ CURSOR GLOW ============
const cursorGlow = document.getElementById('cursorGlow');
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }, { passive: true });
}

// ============ TYPED ROLE ============
const roles = [
  'AI Product Manager / Owner',
  'GenAI & LLM Product Builder',
  'Fintech & Enterprise Product Leader',
  'RAG & AI Agent Practitioner'
];
const typedEl = document.getElementById('typedRole');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (!deleting) {
    charIdx++;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1700);
      return;
    }
  } else {
    charIdx--;
    typedEl.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ============ ANIMATED COUNTERS ============
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ============ SKILLS FILTER ============
const filterBtns = document.querySelectorAll('.filter-btn');
const skillPills = document.querySelectorAll('.skill-pill');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    skillPills.forEach(pill => {
      const show = filter === 'all' || pill.dataset.cat === filter;
      pill.classList.toggle('hidden', !show);
    });
  });
});

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
