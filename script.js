// ===== Preloader =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      startTypingEffect();
    }, 900);
  }
});

// ===== Typing Effect =====
const typedName = document.getElementById('typed-name');
const typedRole = document.getElementById('typed-role');

const nameText = 'Sachu';
const roleText = 'Full-Stack Developer & B.E. CSE Student';

let typeTimeout;

function typeText(element, text, speed = 80, callback) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      typeTimeout = setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

function startTypingEffect() {
  if (!typedName || !typedRole) return;
  typeText(typedName, nameText, 120, () => {
    setTimeout(() => {
      typeText(typedRole, roleText, 40);
    }, 300);
  });
}

// Also start typing immediately if preloader was removed (e.g., prefers-reduced-motion)
if (!document.getElementById('preloader') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  startTypingEffect();
}

// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ===== Navbar Scrolled State =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// ===== Scroll Progress Bar =====
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (scrollProgress) {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
  }
});

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== Animated Counters =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = target;
        } else {
          animateCounter(el, target);
        }
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((el) => counterObserver.observe(el));

function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// ===== Skill Bars Animation =====
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '0%';
        requestAnimationFrame(() => {
          bar.style.width = width;
        });
        skillObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      const currentId = section.getAttribute('id');
      navLinkItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
      });
    }
  });
});

// ===== Theme Toggle (Dark Mode) =====
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
  }
}

initTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ===== Scroll to Top Button =====
const topBtn = document.createElement('button');
topBtn.className = 'scroll-top';
topBtn.textContent = '↑';
topBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(topBtn);

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }
});