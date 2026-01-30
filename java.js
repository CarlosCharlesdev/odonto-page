// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Cursor principal
  cursorX += (mouseX - cursorX) * 0.9;
  cursorY += (mouseY - cursorY) * 0.9;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  // Cursor follower
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateCursor);
}

if (window.innerWidth > 1024) {
  animateCursor();
}

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-item, .team-card');
hoverElements.forEach(el => {
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
const sidebar = document.querySelector('.sidebar');
const sidebarMenu = document.querySelector('.sidebar-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    
    if (window.innerWidth <= 1024) {
      if (sidebar) {
        sidebar.style.display = sidebar.style.display === 'flex' ? 'none' : 'flex';
      }
    }
  });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    
    if (target) {
      const offsetTop = target.offsetTop - (window.innerWidth > 1024 ? 0 : 70);
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (window.innerWidth <= 1024 && sidebar) {
        sidebar.style.display = 'none';
        hamburger.classList.remove('active');
      }
    }
  });
});

// ========== ACTIVE MENU ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');
const menuItems = document.querySelectorAll('.menu-item');

function activateMenu() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
          item.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', activateMenu);

// ========== COUNTER ANIMATION ==========
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.metric-value');
    this.hasAnimated = false;
    
    if (this.counters.length > 0) {
      this.init();
    }
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
    if (metricsSection) {
      observer.observe(metricsSection);
    }
  }
  
  animateCounters() {
    this.counters.forEach(counter => {
      const text = counter.textContent;
      const hasStar = text.includes('★');
      const hasPlus = text.includes('+');
      const target = parseFloat(text.replace(/[^0-9.]/g, ''));
      
      if (isNaN(target)) return;
      
      let current = 0;
      const increment = target / 60;
      const duration = 2000;
      const stepTime = duration / 60;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          let displayValue = Math.ceil(current);
          
          if (target < 10) {
            displayValue = current.toFixed(1);
          }
          
          let suffix = '';
          if (hasPlus) suffix = '+';
          if (hasStar) suffix = '★';
          
          counter.textContent = displayValue + suffix;
          setTimeout(updateCounter, stepTime);
        } else {
          let suffix = '';
          if (hasPlus) suffix = '+';
          if (hasStar) suffix = '★';
          counter.textContent = target + suffix;
        }
      };
      
      updateCounter();
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
    this.currentIndex = 0;
    this.content = document.getElementById('testimonialContent');
    this.dotsContainer = document.getElementById('testDots');
    this.prevBtn = document.getElementById('prevTest');
    this.nextBtn = document.getElementById('nextTest');
    
    if (this.content) {
      this.init();
    }
  }
  
  init() {
    this.createDots();
    this.bindEvents();
    this.startAutoplay();
  }
  
  createDots() {
    testimonials.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
    this.dots = this.dotsContainer.querySelectorAll('.dot');
  }
  
  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoplay();
      });
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoplay();
      });
    }
  }
  
  updateContent() {
    const testimonial = testimonials[this.currentIndex];
    
    this.content.querySelector('.testimonial-text').textContent = testimonial.text;
    this.content.querySelector('.author-info h4').textContent = testimonial.author;
    
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
    
    // Animação de fade
    this.content.style.opacity = '0';
    this.content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      this.content.style.opacity = '1';
      this.content.style.transform = 'translateY(0)';
    }, 100);
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateContent();
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % testimonials.length;
    this.updateContent();
  }
  
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + testimonials.length) % testimonials.length;
    this.updateContent();
  }
  
  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }
  
  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

// ========== SCROLL ANIMATIONS ==========
const observeElements = () => {
  const elements = document.querySelectorAll(
    '.feature-box, .service-item, .team-card, .gallery-item, .contact-info-item'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(element);
  });
};

// ========== PARALLAX EFFECT ==========
let ticking = false;

function parallaxScroll() {
  const scrolled = window.pageYOffset;
  
  // Hero parallax
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroVisual = hero.querySelector('.hero-visual-main');
    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(parallaxScroll);
    ticking = true;
  }
});

// ========== SECTION REVEAL ON SCROLL ==========
const revealSections = () => {
  const sections = document.querySelectorAll('.about, .services, .team, .gallery, .contact');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(section);
  });
};

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');
  
  if (e.key === 'ArrowLeft' && prevBtn) {
    prevBtn.click();
  } else if (e.key === 'ArrowRight' && nextBtn) {
    nextBtn.click();
  }
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ========== INITIALIZE ALL ==========
document.addEventListener('DOMContentLoaded', () => {
  // Initialize counter animation
  new CounterAnimation();
  
  // Initialize testimonial slider
  new TestimonialSlider();
  
  // Initialize scroll animations
  observeElements();
  revealSections();
  
  // Add transition to testimonial content
  const testimonialContent = document.getElementById('testimonialContent');
  if (testimonialContent) {
    testimonialContent.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  }
  
  console.log('✨ OFFICEDENTE - Modern Landing Page Initialized');
});

// ========== RESIZE HANDLER ==========
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Recalculate layouts on resize
    if (window.innerWidth > 1024) {
      if (sidebar) {
        sidebar.style.display = 'flex';
      }
    } else {
      if (sidebar && !hamburger.classList.contains('active')) {
        sidebar.style.display = 'none';
      }
    }
  }, 250);
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
  console.error('Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
});