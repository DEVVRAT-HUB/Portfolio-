// Particles.js Background Animation Initialization
function initParticlesBackground() {
    // Check if the particles-js container exists on this page
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80, // Number of particles
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00ff9d" // Particle color (your primary accent color)
                },
                "shape": {
                    "type": "circle", // Shape of particles (circle, edge, triangle, polygon, star, image)
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg", // Placeholder, not used for a subtle effect
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5, // Opacity of particles
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3, // Size of particles
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150, // Distance for lines to connect
                    "color": "#a0aec0", // Line color (your text secondary color)
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6, // Speed of particle movement
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // "grab" for lines, "repulse" for push effect
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" // "push" for new particles, "remove" for removing
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 180, // Grab distance
                        "line_linked": {
                            "opacity": 1 // Opacity of lines when grabbed
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Typing Animation for Tagline
function typeTagline(elementId, tagline, delay = 70, wordDelay = 300) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let currentText = '';
    let wordIndex = 0;
    const words = tagline.split(' ');

    function typeWord() {
        if (wordIndex < words.length) {
            const word = words[wordIndex];
            let charIndex = 0;
            element.textContent = currentText; // Ensure previous words are visible

            function typeChar() {
                if (charIndex < word.length) {
                    element.textContent += word[charIndex];
                    charIndex++;
                    setTimeout(typeChar, delay);
                } else {
                    currentText = element.textContent + ' '; // Add space after word
                    wordIndex++;
                    // Add a slight delay before typing the next word
                    setTimeout(typeWord, wordDelay);
                }
            }
            typeChar();
        }
    }
    typeWord(); // Start the animation
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
        tipElement.style.backgroundColor = '#1a202c'; /* bg-secondary */
        tipElement.style.padding = '1rem';
        tipElement.style.borderRadius = '4px';
        tipElement.style.maxWidth = '300px';
        tipElement.style.zIndex = '1000';
        tipElement.textContent = `🔒 Security Tip: ${randomTip}`;

        document.body.appendChild(tipElement);
        setTimeout(() => tipElement.remove(), 3000);
    });
}

// Mobile Menu (updated for A11y)
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav__links'); // This is the UL element

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // For visual hamburger animation
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false'); // Reset aria-expanded
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Particles.js background
    initParticlesBackground();
    initEasterEgg();
    initMobileMenu();

    // Tagline for typing animation
    const taglineText = "Engineering seamless systems with DevOps, development, and deep network understanding.";
    typeTagline('animated-tagline', taglineText, 70, 300); // Adjust delay and wordDelay as needed
});

// Smooth scroll for navigation links (ensure these links actually exist on the page)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // For skip-link, ensure focus is moved to the target
            if (this.classList.contains('skip-link')) {
                target.focus();
            }
        }
    });
});

// Loading Animation (if you have a .loading element in your HTML)
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
});
