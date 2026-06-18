// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.9;
  cursorY += (mouseY - cursorY) * 0.9;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';

  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';

  requestAnimationFrame(animateCursor);
}

if (window.innerWidth > 1024) {
  animateCursor();
}

document.querySelectorAll('a, button, .service-item, .team-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const sidebar   = document.querySelector('.sidebar');

if (hamburger && sidebar) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('sidebar--mobile-open');
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const offsetTop = target.offsetTop - (window.innerWidth > 1024 ? 0 : 70);
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });

    if (window.innerWidth <= 1024 && sidebar) {
      sidebar.classList.remove('sidebar--mobile-open');
      hamburger.classList.remove('active');
    }
  });
});

// ========== ACTIVE MENU ON SCROLL ==========
const sections  = document.querySelectorAll('section[id]');
const menuItems = document.querySelectorAll('.menu-item');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const top    = section.offsetTop - 200;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY > top && scrollY <= bottom) {
      menuItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    }
  });
});

// ========== COUNTER ANIMATION ==========
class CounterAnimation {
  constructor() {
    this.counters    = document.querySelectorAll('.metric-value');
    this.hasAnimated = false;
    if (this.counters.length > 0) this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateCounters();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    const metricsSection = document.querySelector('.hero-metrics');
    if (metricsSection) observer.observe(metricsSection);
  }

  animateCounters() {
    this.counters.forEach(counter => {
      const text    = counter.textContent;
      const hasStar = text.includes('★');
      const hasPlus = text.includes('+');
      const target  = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (isNaN(target)) return;

      let current = 0;
      const increment = target / 60;
      const stepTime  = 2000 / 60;

      const update = () => {
        if (current < target) {
          current += increment;
          let display = target < 10 ? current.toFixed(1) : Math.ceil(current);
          counter.textContent = display + (hasPlus ? '+' : hasStar ? '★' : '');
          setTimeout(update, stepTime);
        } else {
          counter.textContent = target + (hasPlus ? '+' : hasStar ? '★' : '');
        }
      };
      update();
    });
  }
}

// ========== TESTIMONIALS SLIDER ==========
const testimonials = [
  {
    text: "Experiência incrível do início ao fim. A equipe é extremamente profissional e o resultado superou todas as minhas expectativas. Meu sorriso nunca esteve tão bonito!",
    author: "Carolina Alexandra"
  },
  {
    text: "Muito bom doutor. Me deu uma excelente explicação dos procedimentos e me senti bastante confortável. Um excelente profissional.",
    author: "Marcela Pinto"
  },
  {
    text: "A clínica odontológica é fantástica. Agradeço a qualidade do serviço e flexibilidade. Recomendo muito esta clínica!",
    author: "Victor Valladares"
  }
];

class TestimonialSlider {
  constructor() {
    this.currentIndex  = 0;
    this.content       = document.getElementById('testimonialContent');
    this.dotsContainer = document.getElementById('testDots');
    this.prevBtn       = document.getElementById('prevTest');
    this.nextBtn       = document.getElementById('nextTest');
    if (this.content) this.init();
  }

  init() {
    this.createDots();
    this.bindEvents();
    this.startAutoplay();
  }

  createDots() {
    testimonials.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    });
    this.dots = this.dotsContainer.querySelectorAll('.dot');
  }

  bindEvents() {
    this.prevBtn?.addEventListener('click', () => { this.prevSlide(); this.resetAutoplay(); });
    this.nextBtn?.addEventListener('click', () => { this.nextSlide(); this.resetAutoplay(); });
  }

  updateContent() {
    const t = testimonials[this.currentIndex];
    this.content.querySelector('.testimonial-text').textContent = t.text;
    this.content.querySelector('.author-info h4').textContent   = t.author;
    this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.currentIndex));

    this.content.style.opacity   = '0';
    this.content.style.transform = 'translateY(20px)';
    setTimeout(() => {
      this.content.style.opacity   = '1';
      this.content.style.transform = 'translateY(0)';
    }, 100);
  }

  goToSlide(i)  { this.currentIndex = i; this.updateContent(); }
  nextSlide()   { this.currentIndex = (this.currentIndex + 1) % testimonials.length; this.updateContent(); }
  prevSlide()   { this.currentIndex = (this.currentIndex - 1 + testimonials.length) % testimonials.length; this.updateContent(); }
  startAutoplay() { this.autoplayInterval = setInterval(() => this.nextSlide(), 6000); }
  resetAutoplay() { clearInterval(this.autoplayInterval); this.startAutoplay(); }
}

// ========== SCROLL ANIMATIONS ==========
function observeElements() {
  const elements = document.querySelectorAll(
    '.feature-box, .service-item, .team-card, .gallery-item, .contact-info-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });
}

// ========== PARALLAX ==========
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const heroVisual = document.querySelector('.hero-visual-main');
      if (heroVisual) heroVisual.style.transform = `translateY(${window.pageYOffset * 0.1}px)`;
      ticking = false;
    });
    ticking = true;
  }
});

// ========== SECTION REVEAL ==========
function revealSections() {
  const secs = document.querySelectorAll('.about, .services, .team, .gallery, .contact');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  secs.forEach(s => {
    s.style.opacity    = '0';
    s.style.transform  = 'translateY(50px)';
    s.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(s);
  });
}

// ========== KEYBOARD NAV ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') document.getElementById('prevTest')?.click();
  if (e.key === 'ArrowRight') document.getElementById('nextTest')?.click();
});

// ========== LOADING ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity    = '1';
  }, 100);
});

// ========== RESIZE ==========
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth > 1024 && sidebar) {
      sidebar.classList.remove('sidebar--mobile-open');
    }
  }, 250);
});

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
  new CounterAnimation();
  new TestimonialSlider();
  observeElements();
  revealSections();

  const testimonialContent = document.getElementById('testimonialContent');
  if (testimonialContent) {
    testimonialContent.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  console.log('✨ OFFICEDENTE - Initialized');
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => console.error('Error:', e.error));
window.addEventListener('unhandledrejection', (e) => console.error('Unhandled rejection:', e.reason));