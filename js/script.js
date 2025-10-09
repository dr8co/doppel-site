// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth', block: 'start'
            });
        }
    });
});

// Carousel functionality
const cards = document.querySelectorAll('.carousel-card');
const indicators = document.querySelectorAll('.indicator');
let currentIndex = 0;
let autoPlayInterval;

function updateCarousel(newIndex) {
    cards.forEach((card, idx) => {
        card.classList.remove('active', 'prev', 'next');
        
        if (idx === newIndex) {
            card.classList.add('active');
        } else if (idx === (newIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (idx === (newIndex + 1) % cards.length) {
            card.classList.add('next');
        }
    });
    
    indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === newIndex);
    });
    
    currentIndex = newIndex;
}

function nextSlide() {
    updateCarousel((currentIndex + 1) % cards.length);
}

function prevSlide() {
    updateCarousel((currentIndex - 1 + cards.length) % cards.length);
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

indicators.forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
        updateCarousel(idx);
        stopAutoPlay();
        startAutoPlay();
    });
});

// Pause autoplay on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoPlay);
carouselContainer.addEventListener('mouseleave', startAutoPlay);

// Initialize carousel
updateCarousel(0);
startAutoPlay();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1, rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe preset cards
document.querySelectorAll('.preset-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe stat cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';

        // Add ripple styles dynamically
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                        .ripple {
                            position: absolute;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.5);
                            transform: scale(0);
                            animation: ripple-animation 0.6s ease-out;
                            pointer-events: none;
                        }
                        @keyframes ripple-animation {
                            to {
                                transform: scale(4);
                                opacity: 0;
                            }
                        }
                        .btn {
                            position: relative;
                            overflow: hidden;
                        }
                    `;
            document.head.appendChild(style);
        }

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Counter animation for stats
function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    };

    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && statNumber.textContent.includes('8000')) {
                animateCounter(statNumber, 8000);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, {threshold: 0.5});

document.querySelectorAll('.stat-card').forEach(card => {
    if (card.querySelector('.stat-number').textContent.includes('8000')) {
        statsObserver.observe(card);
    }
});

// Add glow effect on hover for preset cards
document.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        this.style.boxShadow = '0 0 30px rgba(78, 205, 196, 0.5)';
    });

    card.addEventListener('mouseleave', function (e) {
        this.style.boxShadow = '';
    });
});

// Performance optimization - debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Handle scroll-based animations
    });
});

// Add particle effect on hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(78, 205, 196, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';

    const duration = 3000 + Math.random() * 2000;
    const size = 2 + Math.random() * 4;

    particle.animate([{
        transform: 'translateY(0) scale(1)',
        opacity: 1
    }, {transform: `translateY(-${window.innerHeight}px) scale(${size})`, opacity: 0}], {
        duration: duration, easing: 'linear'
    }).onfinish = () => particle.remove();

    document.querySelector('.hero').appendChild(particle);
}

// Create particles periodically
setInterval(createParticle, 300);

// Easter egg: Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            const style = document.createElement('style');
            style.textContent = `
                        @keyframes rainbow {
                            0% { filter: hue-rotate(0deg); }
                            100% { filter: hue-rotate(360deg); }
                        }
                    `;
            document.head.appendChild(style);
            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});
