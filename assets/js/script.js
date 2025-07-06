// Universal script.js for all pages

// Particles.js Background Animation Initialization
function initParticlesBackground() {
    // Check if the particles-js container exists on the current page
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

// Typing Animation for Tagline (only for index.html)
function typeTagline(elementId, tagline, delay = 70, wordDelay = 300) {
    const element = document.getElementById(elementId);
    if (!element) return; // Exit if element not found (e.g., on other pages)

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

// Helper function to show error messages (updated for A11y)
function showError(inputElement, message) {
    const errorDivId = inputElement.id + '-error';
    const errorDiv = document.getElementById(errorDivId);

    if (errorDiv) {
        errorDiv.textContent = message;
        inputElement.setAttribute('aria-invalid', 'true'); // Indicate invalid state for screen readers
        inputElement.classList.add('input-error'); // Add class for visual styling
    } else {
        // Fallback if errorDiv is not found (shouldn't happen with updated HTML)
        const newErrorDiv = document.createElement('div');
        newErrorDiv.className = 'error-message';
        newErrorDiv.style.color = '#ff6b6b';
        newErrorDiv.style.fontSize = '0.875rem';
        newErrorDiv.style.marginTop = '0.5rem';
        newErrorDiv.textContent = message;
        inputElement.parentNode.appendChild(newErrorDiv);
        inputElement.classList.add('input-error');
        inputElement.setAttribute('aria-invalid', 'true');
    }
}

// Helper function to remove error messages (updated for A11y)
function clearError(inputElement) {
    const errorDivId = inputElement.id + '-error';
    const errorDiv = document.getElementById(errorDivId);

    if (errorDiv) {
        errorDiv.textContent = ''; // Clear the text content
        inputElement.setAttribute('aria-invalid', 'false'); // Reset invalid state
        inputElement.classList.remove('input-error'); // Remove error styling
    }
}

// Helper function to validate a single field
function validateField(inputElement) {
    let fieldIsValid = true;
    const value = inputElement.value.trim();
    const fieldId = inputElement.id;

    clearError(inputElement); // Always clear previous error before re-validating

    if (fieldId === 'name') {
        if (!value) {
            showError(inputElement, 'Name is required.');
            fieldIsValid = false;
        }
    } else if (fieldId === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            showError(inputElement, 'Email is required.');
            fieldIsValid = false;
        } else if (!emailRegex.test(value)) {
            showError(inputElement, 'Please enter a valid email address.');
            fieldIsValid = false;
        }
    } else if (fieldId === 'message') {
        const minLength = 10; // Define minimum message length
        if (!value) {
            showError(inputElement, 'Message is required.');
            fieldIsValid = false;
        } else if (value.length < minLength) {
            showError(inputElement, `Message must be at least ${minLength} characters.`);
            fieldIsValid = false;
        }
    }
    return fieldIsValid;
}


// Form Validation and Submission
async function validateForm(event) {
    event.preventDefault(); // Always prevent default form submission

    const form = event.target;
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    const submitButton = form.querySelector('button[type="submit"]');

    // Clear any existing success/error messages from previous submissions
    document.querySelectorAll('.success-message').forEach(el => el.remove());
    // Clear all field-specific errors before full validation
    document.querySelectorAll('.error-message').forEach(el => el.textContent = ''); // Clear text content
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('[aria-invalid="true"]').forEach(el => el.setAttribute('aria-invalid', 'false'));


    // Perform full validation on all fields
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    const isValidForm = isNameValid && isEmailValid && isMessageValid;

    if (isValidForm) {
        // Disable button and show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7'; // Visual cue for disabled state

        try {
            const formData = new FormData(form);

            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Formspree recommends this header
                }
            });

            if (response.ok) {
                showSuccessMessage('Message sent successfully!');
                form.reset(); // Clear the form fields on success
            } else {
                // Handle non-OK responses from Formspree (e.g., validation errors on their end)
                const data = await response.json();
                if (data.errors) {
                    let errorMessage = 'Failed to send message: ';
                    data.errors.forEach(err => errorMessage += `${err.field} ${err.message}. `);
                    // For general form errors, display near the submit button or at the top of the form
                    const generalErrorDiv = document.createElement('div');
                    generalErrorDiv.className = 'error-message';
                    generalErrorDiv.style.color = '#ff6b6b';
                    generalErrorDiv.style.marginTop = '1rem';
                    generalErrorDiv.textContent = errorMessage;
                    form.insertBefore(generalErrorDiv, submitButton.parentNode); // Insert before button's parent
                } else {
                    const generalErrorDiv = document.createElement('div');
                    generalErrorDiv.className = 'error-message';
                    generalErrorDiv.style.color = '#ff6b6b';
                    generalErrorDiv.style.marginTop = '1rem';
                    generalErrorDiv.textContent = 'Failed to send message. Please try again.';
                    form.insertBefore(generalErrorDiv, submitButton.parentNode);
                }
            }
        } catch (error) {
            console.error('Submission error:', error);
            const generalErrorDiv = document.createElement('div');
            generalErrorDiv.className = 'error-message';
            generalErrorDiv.style.color = '#ff6b6b';
            generalErrorDiv.style.marginTop = '1rem';
            generalErrorDiv.textContent = 'Network error. Please try again later.';
            form.insertBefore(generalErrorDiv, submitButton.parentNode);
        } finally {
            // Re-enable button and reset text
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
        }
    }
}

function showSuccessMessage(message) {
    // Remove any existing success messages before adding a new one
    document.querySelectorAll('.success-message').forEach(el => el.remove());

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message fade-in';
    successDiv.style.color = '#00ff9d';
    successDiv.style.padding = '1rem';
    successDiv.style.marginTop = '1rem';
    successDiv.style.textAlign = 'center';
    successDiv.textContent = message;
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
        tipElement.style.backgroundColor = 'var(--bg-secondary)'; /* Using var() here - consider replacing with Tailwind custom color if possible */
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
        // Function to close menu
        const closeMenu = () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            // Re-enable body scroll if it was disabled
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // For visual hamburger animation

            // Disable/enable body scroll when menu is open/closed
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a navigation link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside (only on mobile/small screens)
        document.addEventListener('click', (e) => {
            // Check if click is outside hamburger and navLinks AND if navLinks is currently active
            if (window.innerWidth < 768 && !hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close menu on resize if it's open and screen becomes desktop size
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && navLinks.classList.contains('active')) {
                closeMenu();
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

    // Only run tagline animation if on the index page and element exists
    const animatedTaglineElement = document.getElementById('animated-tagline');
    if (animatedTaglineElement) {
        const taglineText = "Engineering seamless systems with DevOps, development, and deep network understanding.";
        typeTagline('animated-tagline', taglineText, 70, 300); // Adjust delay and wordDelay as needed
    }

    // Enhanced Button Interaction (only for index.html)
    const learnMoreButton = document.querySelector('.hero__content .btn');
    if (learnMoreButton) {
        learnMoreButton.style.transition = 'transform 0.2s ease-out'; // Add transition for smooth effect

        learnMoreButton.addEventListener('mouseover', () => {
            learnMoreButton.style.transform = 'scale(1.05)'; // Scale up slightly on hover
        });

        learnMoreButton.addEventListener('mouseout', () => {
            learnMoreButton.style.transform = 'scale(1)'; // Scale back down on mouse out
        });
    }

    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        // Attach real-time validation listeners
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');

        nameInput.addEventListener('blur', () => validateField(nameInput));
        emailInput.addEventListener('blur', () => validateField(emailInput));
        messageInput.addEventListener('blur', () => validateField(messageInput));

        // Clear error as user types
        nameInput.addEventListener('input', () => clearError(nameInput));
        emailInput.addEventListener('input', () => clearError(emailInput));
        messageInput.addEventListener('input', () => clearError(messageInput));

        contactForm.addEventListener('submit', validateForm);
    }
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
