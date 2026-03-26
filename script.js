// ===== Cherry Blossom Petals =====
function createPetals() {
    const container = document.getElementById('petals');
    const petalCount = 25;
    const colors = ['#ffb7c5', '#ff8fa3', '#ffc2d1', '#ffacc7', '#f9a8c9'];

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 12 + 10) + 's';
        petal.style.animationDelay = (Math.random() * 20) + 's';
        const size = Math.random() * 10 + 6;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        const color = colors[Math.floor(Math.random() * colors.length)];
        petal.style.background = `radial-gradient(circle at 30% 30%, ${color}, ${color}66)`;
        petal.style.borderRadius = Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%';
        container.appendChild(petal);
    }
}

// ===== Mouse Glow Follower =====
const mouseGlow = document.getElementById('mouseGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (mouseGlow) {
        mouseGlow.style.left = glowX + 'px';
        mouseGlow.style.top = glowY + 'px';
    }
    requestAnimationFrame(animateGlow);
}
animateGlow();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Footer Date =====
function updateDate() {
    const now = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const el = document.getElementById('footer-date');
    if (el) el.textContent = dateStr + ' ' + timeStr;
}

// ===== Smooth Scroll Navigation =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 250;
    sections.forEach(section => {
        if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
            const id = section.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Scroll Reveal Animations =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger effect
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

// Observe elements with stagger delays
document.querySelectorAll('.card, .info-item, .gallery-item, .stat, .quote-bg, .section-header, .about-content, .section-divider').forEach((el, index) => {
    el.classList.add('reveal');
    el.dataset.delay = (index % 4) * 100;
    revealObserver.observe(el);
});

// ===== Stat Bar Animation =====
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.stat-fill');
            fills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 300);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.about-stats').forEach(el => statObserver.observe(el));

// ===== Card Tilt Effect =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Parallax on Hero Image =====
window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-image-frame');
    if (heroImg && window.innerWidth > 900) {
        const scrolled = window.scrollY;
        heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
});

// ===== Init =====
createPetals();
updateDate();
setInterval(updateDate, 60000);
