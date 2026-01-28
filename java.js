/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== PROGRESS BAR ====================*/
function updateProgressBar() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / scrollHeight) * 100;

  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
}

window.addEventListener("scroll", updateProgressBar);

/*==================== SCROLL TO TOP FUNCTIONALITY ====================*/
const scrollTopBtn = document.getElementById("scroll-top");

// Show/hide scroll to top button
function showHideScrollTop() {
  if (this.scrollY >= 560) {
    scrollTopBtn.classList.add("show-scroll");
  } else {
    scrollTopBtn.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", showHideScrollTop);

/*==================== SCROLL TO TOP CLICK FUNCTIONALITY ====================*/
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      const activeLink = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );
      if (activeLink) {
        document
          .querySelectorAll(".nav__link")
          .forEach((link) => link.classList.remove("active-link"));
        activeLink.classList.add("active-link");
      }
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== TESTIMONIALS SLIDER ====================*/
class TestimonialSlider {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll(".testimonial__card");
    this.dots = document.querySelectorAll(".testimonial__dot");
    this.prevBtn = document.querySelector(".testimonial__btn--prev");
    this.nextBtn = document.querySelector(".testimonial__btn--next");
    this.autoPlayInterval = null;

    if (this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    this.showSlide(0);
    this.bindEvents();
    this.autoPlay();
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    this.dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show current slide
    if (this.slides[index]) {
      this.slides[index].classList.add("active");
    }
    if (this.dots[index]) {
      this.dots[index].classList.add("active");
    }

    this.currentSlide = index;
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  autoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.autoPlay();
  }
}

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const headerHeight =
        document.querySelector(".header")?.offsetHeight || 0;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

/*==================== COUNTER ANIMATION ====================*/
function animateCounters() {
  const counters = document.querySelectorAll(".stat__number");

  counters.forEach((counter) => {
    const text = counter.textContent;
    const hasPlus = text.includes("+");
    const hasPercent = text.includes("%");
    const target = parseFloat(text.replace(/[^0-9.]/g, ""));

    if (isNaN(target)) return;

    let current = 0;
    const increment = target / 80;
    const duration = 2000;
    const stepTime = duration / 80;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        let displayValue = Math.ceil(current);

        if (target < 10) {
          displayValue = current.toFixed(1);
        }

        let suffix = "";
        if (hasPlus) suffix = "+";
        if (hasPercent) suffix = "%";

        counter.textContent = displayValue + suffix;
        setTimeout(updateCounter, stepTime);
      } else {
        let suffix = "";
        if (hasPlus) suffix = "+";
        if (hasPercent) suffix = "%";
        counter.textContent = target + suffix;
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

/*==================== SCROLL REVEAL ANIMATION ====================*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

/*==================== SERVICE CARDS ANIMATION ====================*/
class ServiceCardsAnimation {
  constructor() {
    this.cards = document.querySelectorAll(".service__card");
    this.section = document.querySelector(".services");
    if (this.cards.length > 0) {
      this.init();
    }
  }

  init() {
    this.setupIntersectionObserver();
    this.setupHoverEffects();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateCards();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (this.section) {
      observer.observe(this.section);
    }
  }

  animateCards() {
    this.cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  setupHoverEffects() {
    this.cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.5s ease";
    });
  }
}

/*==================== FLOATING ELEMENTS PARALLAX ====================*/
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-card");

  parallaxElements.forEach((element, index) => {
    const speed = 0.3 + index * 0.1;
    const yPos = Math.sin(scrolled * 0.01 + index) * 10;
    element.style.transform = `translateY(${yPos}px)`;
  });
}

/*==================== DEBOUNCE FUNCTION ====================*/
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/*==================== CONTACT CARDS HOVER EFFECT ====================*/
function initContactCards() {
  const contactCards = document.querySelectorAll(".contact__card");

  contactCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}

/*==================== ACCESSIBILITY IMPROVEMENTS ====================*/
// Keyboard navigation for testimonial slider
document.addEventListener("keydown", (e) => {
  const prevBtn = document.querySelector(".testimonial__btn--prev");
  const nextBtn = document.querySelector(".testimonial__btn--next");

  if (e.key === "ArrowLeft" && prevBtn) {
    prevBtn.click();
  } else if (e.key === "ArrowRight" && nextBtn) {
    nextBtn.click();
  }
});

// Focus management for mobile menu
const navToggleBtn = document.getElementById("nav-toggle");
const navCloseBtn = document.getElementById("nav-close");

if (navToggleBtn && navCloseBtn) {
  navToggleBtn.addEventListener("click", () => {
    setTimeout(() => {
      navCloseBtn.focus();
    }, 100);
  });
}

/*==================== LAZY LOADING FOR MAP ====================*/
function lazyLoadMap() {
  const mapContainer = document.querySelector(".contact__map");

  if (mapContainer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const iframe = mapContainer.querySelector("iframe");
            if (iframe && iframe.dataset.src) {
              iframe.src = iframe.dataset.src;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px" }
    );

    observer.observe(mapContainer);
  }
}

/*==================== WHATSAPP BUTTON ANIMATION ====================*/
function initWhatsAppButton() {
  const whatsappBtn = document.querySelector(".whatsapp-float");

  if (whatsappBtn) {
    // Pulse animation every 3 seconds
    setInterval(() => {
      whatsappBtn.style.transform = "scale(1.1)";
      setTimeout(() => {
        whatsappBtn.style.transform = "scale(1)";
      }, 200);
    }, 3000);
  }
}

/*==================== ERROR HANDLING ====================*/
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason);
});

/*==================== INITIALIZE ALL COMPONENTS ====================*/
document.addEventListener("DOMContentLoaded", () => {
  // Initialize testimonial slider
  new TestimonialSlider();

  // Initialize service cards animation
  new ServiceCardsAnimation();

  // Initialize contact cards
  initContactCards();

  // Initialize WhatsApp button
  initWhatsAppButton();

  // Lazy load map
  lazyLoadMap();

  // Observe stats section for counter animation
  const statsSection = document.querySelector(".home__stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Add reveal animation to sections
  const revealElements = document.querySelectorAll(
    ".section__header, .about__data, .about__images"
  );
  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    revealObserver.observe(el);
  });

  // Apply debounced scroll events
  const debouncedScroll = debounce(() => {
    parallaxEffect();
  }, 10);

  window.addEventListener("scroll", debouncedScroll);

  console.log("OdontoPrime - Landing Page Initialized");
});
