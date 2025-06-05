// Matrix Background Animation
function createMatrixBackground() {
    const canvas = document.querySelector('.matrix-bg');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(10, 25, 47, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff9d';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Form Validation
function validateForm(event) {
    const form = event.target;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    let isValid = true;

    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Validate Name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        // Show success message
        showSuccessMessage();
    }
}

function showError(element, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message fade-in';
    successDiv.style.color = '#00ff9d';
    successDiv.style.padding = '1rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.textAlign = 'center';
    successDiv.textContent = 'Message sent successfully!';
    document.querySelector('.contact-form').appendChild(successDiv);
}

// Easter Egg
function initEasterEgg() {
    const easterEgg = document.querySelector('.easter-egg');
    if (!easterEgg) return;

    easterEgg.addEventListener('click', () => {
        const tips = [
            'Always use strong, unique passwords!',
            'Enable 2FA whenever possible.',
            'Keep your software up to date.',
            'Encrypt sensitive data.',
            'Back up your data regularly.'
        ];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        
        const tipElement = document.createElement('div');
        tipElement.className = 'cyber-tip fade-in';
        tipElement.style.position = 'fixed';
        tipElement.style.bottom = '60px';
        tipElement.style.right = '20px';
        tipElement.style.backgroundColor = 'var(--bg-secondary)';
        tipElement.style.padding = '1rem';
        tipElement.style.borderRadius = '4px';
        tipElement.style.maxWidth = '300px';
        tipElement.style.zIndex = '1000';
        tipElement.textContent = `🔒 Security Tip: ${randomTip}`;
        
        document.body.appendChild(tipElement);
        setTimeout(() => tipElement.remove(), 3000);
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav__links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMatrixBackground();
    initEasterEgg();
    initMobileMenu();
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateForm);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
}); 