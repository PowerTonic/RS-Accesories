/**
 * RS Accessories - Main JavaScript
 * Handles navigation, product filtering, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation functionality
    initNavigation();
    
    // Initialize product filtering
    initProductFilters();
    
    // Initialize pagination (for future implementation)
    initPagination();
    
    // Add smooth scrolling to all anchor links
    initSmoothScroll();
    
    // Add form submission handlers
    initFormHandlers();
    
    // Add scroll animations
    initScrollEffects();
});

/**
 * Navigation Functionality
 * Handles mobile menu toggle and active link highlighting
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    const header = document.querySelector('header');
    
    // Toggle mobile navigation
    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });
    
    // Close menu when clicking a navigation link (mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        // Add scrolled class to header for styling on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Product Filtering
 * Handles the product category filtering functionality
 */
function initProductFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            const category = button.dataset.category;
            
            productItems.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Pagination
 * Handles product pagination (placeholder for future implementation)
 */
function initPagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // In a real implementation, this would load different product sets
            // For now, just show a message
            console.log(`Page ${button.textContent} clicked - additional products would load here`);
        });
    });
}

/**
 * Smooth Scrolling
 * Add smooth scrolling behavior to all anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form Handlers
 * Handle form submissions for newsletter and contact forms
 */
function initFormHandlers() {
    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real implementation, this would send the data to a server
                showFormMessage(this, 'Thanks for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showFormMessage(this, 'Please enter a valid email', 'error');
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');
        
        if (!nameInput.value.trim()) {
            showFormMessage(this, 'Please enter your name', 'error');
            return;
        }
        
        if (!validateEmail(emailInput.value.trim())) {
            showFormMessage(this, 'Please enter a valid email', 'error');
            return;
        }
        
        if (!messageInput.value.trim()) {
            showFormMessage(this, 'Please enter a message', 'error');
            return;
        }
        
        // In a real implementation, this would send the data to a server
        showFormMessage(this, 'Thanks for your message! We\'ll respond shortly.', 'success');
        this.reset();
    });
}

/**
 * Scroll Effects
 * Add animation effects when scrolling
 */
function initScrollEffects() {
    // Add fade-in animation to elements when they come into view
    const elementsToAnimate = document.querySelectorAll('.feature-card, .testimonial-card, .product-item, .contact-item');
    
    // Check if element is in viewport
    const isInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    };
    
    // Add animation class when element comes into view
    const animateOnScroll = () => {
        elementsToAnimate.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Header parallax effect
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

/**
 * Helper Functions
 */

// Email validation with regex
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Show form submission messages
function showFormMessage(formElement, message, type) {
    // Remove any existing message
    const existingMessage = formElement.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Add to form
    formElement.appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 3000);
}

// Add CSS animations for newly added elements
const style = document.createElement('style');
style.textContent = `
    .form-message {
        margin-top: 15px;
        padding: 10px 15px;
        border-radius: 5px;
        animation: fadeIn 0.3s ease;
    }
    
    .form-message.success {
        background-color: rgba(40, 167, 69, 0.1);
        border-left: 3px solid #28a745;
        color: #28a745;
    }
    
    .form-message.error {
        background-color: rgba(220, 53, 69, 0.1);
        border-left: 3px solid #dc3545;
        color: #dc3545;
    }
    
    .form-message.fade-out {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    .feature-card, .testimonial-card, .product-item, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate, .testimonial-card.animate, .product-item.animate, .contact-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

document.head.appendChild(style);