// ===== PRELOADER =====
let isPageLoaded = false;

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
        isPageLoaded = true;
        setTimeout(() => {
            initAnimations();
            startTypingEffect();
        }, 100);
    }, 2500);
});

function initAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-card h3, .about-card p, ' +
        '.skills-category h3, .skill-item, ' +
        '.project-info h3, .project-info p, .project-tags, ' +
        '.contact-info h3, .contact-info p'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => textObserver.observe(el));
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== SECTION SWITCHING =====
const allSections = document.querySelectorAll('section, .hero');
let currentSectionIndex = 0;
let isAnimating = false;

allSections[0].classList.add('active');

window.addEventListener('wheel', (e) => {
    if (isAnimating) return;

    if (e.deltaY > 0) {
        if (currentSectionIndex < allSections.length - 1) {
            changeSection(currentSectionIndex + 1);
        }
    } else {
        if (currentSectionIndex > 0) {
            changeSection(currentSectionIndex - 1);
        }
    }
}, { passive: true });

function changeSection(newIndex) {
    if (newIndex === currentSectionIndex || isAnimating) return;

    isAnimating = true;

    allSections[currentSectionIndex].classList.remove('active');
    allSections[newIndex].classList.add('active');

    currentSectionIndex = newIndex;

    const footer = document.querySelector('.footer');
    if (newIndex === allSections.length - 1) {
        footer.style.opacity = '1';
    } else {
        footer.style.opacity = '0';
    }

    setTimeout(() => {
        isAnimating = false;
    }, 1000);
}

// Handle anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);

        let targetIndex = -1;
        allSections.forEach((section, index) => {
            if (section.id === targetId || (targetId === 'hero' && section.classList.contains('hero'))) {
                targetIndex = index;
            }
        });

        if (targetIndex !== -1) {
            changeSection(targetIndex);
        }
    });
});

// Handle scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        if (currentSectionIndex < allSections.length - 1) {
            changeSection(currentSectionIndex + 1);
        }
    });
}

// ===== 3D TILT EFFECT FOR CARDS =====
const cards = document.querySelectorAll('.about-card, .skills-category, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===== TEXT ANIMATIONS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(
    '.section-header, .about-card h3, .about-card p, ' +
    '.skills-category h3, .skill-item, ' +
    '.project-info h3, .project-info p, .project-tags, ' +
    '.contact-info h3, .contact-info p'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    textObserver.observe(el);
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== HERO ANIMATIONS =====
document.querySelectorAll('.hero-title .word').forEach(word => {
    const delay = word.getAttribute('data-delay');
    word.style.animationDelay = `${delay}ms`;
});

document.querySelectorAll('.hero-subtitle .line').forEach(line => {
    const delay = line.getAttribute('data-delay');
    line.style.animationDelay = `${delay}ms`;
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ===== PROJECT CARDS TILT EFFECT =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== FORM INPUT ANIMATIONS =====
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateX(5px)';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateX(0)';
    });
});

// ===== TYPING EFFECT =====
function startTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';

        let charIndex = 0;
        const firstPartEnd = text.indexOf('•');

        function typeText() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;

                const delay = charIndex <= firstPartEnd ? 50 : 100;
                setTimeout(typeText, delay);
            }
        }

        setTimeout(typeText, 500);
    }
}

// ===== NUMBERS COUNTER ANIMATION =====
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.skill-percent');

    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;

        const updateNumber = () => {
            if (current < target) {
                current += increment;
                number.textContent = Math.ceil(current) + '%';
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target + '%';
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(number);
    });
};

animateNumbers();

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hey Developer!', 'font-size: 24px; font-weight: bold; color: #7434f3;');
console.log('%cLooking for a skilled full-stack developer?', 'font-size: 16px; color: #b494e6;');
console.log('%c🐦 https://x.com/dev_Doniix', 'font-size: 14px; color: #bc91f7;');
console.log('%cLet\'s build something amazing together!', 'font-size: 14px; color: #a0a0b0;');

// ===== PERFORMANCE OPTIMIZATION =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-dependent code here
    });
}, { passive: true });

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== FLYING HEARTS ANIMATION =====
const footerHeart = document.querySelector('.footer-heart');
if (footerHeart) {
    footerHeart.addEventListener('click', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < 12; i++) {
            createFlyingHeart(centerX, centerY, i);
        }
    });
}

function createFlyingHeart(x, y, index) {
    const heart = document.createElement('div');
    heart.className = 'flying-heart';
    heart.textContent = '❤️';

    const angle = (Math.random() * 360) * (Math.PI / 180);
    const distance = 100 + Math.random() * 100;

    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.animationDelay = (index * 0.05) + 's';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 2000 + (index * 50));
}

// ===== CONFETTI ANIMATION =====
function createConfetti() {
    const colors = ['#7C3AED', '#FFA04C', '#EC4899', '#10B981', '#3B82F6'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 4000);
    }
}
