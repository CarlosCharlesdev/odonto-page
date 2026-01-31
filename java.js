// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== TESTIMONIALS SLIDER ==========
class TestimonialSlider {
    constructor() {
        this.cards = document.querySelectorAll('.testimonial-card');
        this.dotsContainer = document.getElementById('testDots');
        this.prevBtn = document.getElementById('prevTest');
        this.nextBtn = document.getElementById('nextTest');
        this.currentIndex = 0;
        this.autoplayInterval = null;

        if (this.cards.length > 0) {
            this.init();
        }
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.startAutoplay();
    }

    createDots() {
        this.cards.forEach((_, index) => {
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

    updateSlide() {
        this.cards.forEach((card, index) => {
            card.classList.remove('active');
            if (this.dots) {
                this.dots[index].classList.remove('active');
            }
        });

        this.cards[this.currentIndex].classList.add('active');
        if (this.dots) {
            this.dots[this.currentIndex].classList.add('active');
        }
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlide();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateSlide();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateSlide();
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

// Initialize testimonial slider
new TestimonialSlider();

// ========== SCROLL ANIMATIONS ==========
const observeElements = () => {
    const elements = document.querySelectorAll(
        '.about-card, .service-card, .team-card, .contact-item'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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

observeElements();

// ========== BUTTON HOVER EFFECTS ==========
const buttons = document.querySelectorAll('.btn, .service-link, .carousel-btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========== CARD HOVER EFFECTS ==========
const cards = document.querySelectorAll('.about-card, .service-card, .team-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(212, 165, 116, 0.2)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    });
});

// ========== PARALLAX EFFECT ==========
let ticking = false;

function parallaxScroll() {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        const visualCard = hero.querySelector('.hero-visual');
        if (visualCard) {
            visualCard.style.transform = `translateY(${scrolled * 0.1}px)`;
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

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar-float');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
});

// ========== CTA BUTTONS ==========
const ctaButtons = document.querySelectorAll('.cta-btn, .btn-primary, .btn-large');

ctaButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Open WhatsApp
        window.open('https://wa.me/556993282228', '_blank');
    });
});

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('OFFICEDENTE Landing Page loaded successfully');
});
