// Create cherry blossom petals
function createPetals() {
    const container = document.getElementById('petals');
    const petalCount = 30;
    const colors = ['#ffb7c5', '#ff8fa3', '#ffc2d1', '#ffacc7', '#f9a8c9'];

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 10 + 8) + 's';
        petal.style.animationDelay = (Math.random() * 15) + 's';
        const size = Math.random() * 10 + 8;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        const color = colors[Math.floor(Math.random() * colors.length)];
        petal.style.background = `radial-gradient(circle at 30% 30%, ${color}, ${color}88)`;
        petal.style.borderRadius = Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%';
        container.appendChild(petal);
    }
}

// Update footer date
function updateDate() {
    const now = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    const dateStr = now.toLocaleDateString('en-US', options);
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const el = document.getElementById('footer-date');
    if (el) el.textContent = dateStr + ' ' + timeStr;
}

// Smooth scroll for nav links
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

// Update active nav on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;

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

// Parallax on hero image
window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        const scrolled = window.scrollY;
        heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// Fade-in on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .info-item, .gallery-item, .stat, .quote-bg').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.visible, .card, .info-item, .gallery-item, .stat, .quote-bg').forEach(el => {
        // delay slightly for stagger effect
    });
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// Init
createPetals();
updateDate();
setInterval(updateDate, 60000);
