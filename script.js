// RS Accessories - Enhanced Interactions
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // Navigation
    // ============================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll behavior for navbar
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

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ============================================
    // Smooth Scroll
    // ============================================
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // ============================================
    // Product Filtering
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            productCards.forEach((card, index) => {
                const categories = card.dataset.category;
                const shouldShow = filter === 'all' || categories.includes(filter);

                // Animate out
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    if (shouldShow) {
                        card.style.display = 'block';
                        // Stagger animation in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });

    // ============================================
    // Scroll-triggered Animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.about-card, .product-card, .contact-item, .footer-column'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${(index % 6) * 0.1}s`;
        fadeInObserver.observe(el);
    });

    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-eyebrow, .section-title, .section-description, .products-intro');

    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        fadeInObserver.observe(header);
    });

    // ============================================
    // Form Handling
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                submitBtn.style.background = '#8B9A7D';

                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });

        // Input focus animations
        const formInputs = contactForm.querySelectorAll('input, select, textarea');

        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // ============================================
    // Product Card Interactions
    // ============================================
    productCards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

        card.addEventListener('mouseenter', function() {
            // Add subtle tilt effect
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // Parallax Effects (subtle)
    // ============================================
    const heroImage = document.querySelector('.hero-image-frame');
    const floatingCards = document.querySelectorAll('.floating-card');

    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.15;

            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Mouse move parallax for floating cards
    if (floatingCards.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            floatingCards.forEach((card, index) => {
                const speed = (index + 1) * 15;
                const x = mouseX * speed;
                const y = mouseY * speed;

                card.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ============================================
    // About Card Number Animation
    // ============================================
    const aboutNumbers = document.querySelectorAll('.about-number');

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0.2';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    aboutNumbers.forEach(num => {
        num.style.opacity = '0';
        num.style.transform = 'translateY(20px)';
        num.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        numberObserver.observe(num);
    });

    // ============================================
    // Cursor Effects (Desktop only)
    // ============================================
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
        document.body.appendChild(cursor);

        const cursorDot = cursor.querySelector('.cursor-dot');
        const cursorRing = cursor.querySelector('.cursor-ring');

        // Add cursor styles
        const cursorStyles = document.createElement('style');
        cursorStyles.textContent = `
            .custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
            }
            .cursor-dot {
                width: 8px;
                height: 8px;
                background: #FAF7F2;
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                transition: transform 0.1s ease;
            }
            .cursor-ring {
                width: 40px;
                height: 40px;
                border: 1px solid rgba(250, 247, 242, 0.5);
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                transition: all 0.15s ease-out;
            }
            .cursor-hover .cursor-ring {
                width: 60px;
                height: 60px;
                border-color: rgba(196, 120, 90, 0.8);
            }
            .cursor-hover .cursor-dot {
                transform: translate(-50%, -50%) scale(1.5);
                background: #C4785A;
            }
        `;
        document.head.appendChild(cursorStyles);

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth ring follow
        function animateCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover states
        const hoverElements = document.querySelectorAll('a, button, .product-card, .about-card, .filter-btn');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // ============================================
    // Preloader (optional enhancement)
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    console.log('RS Accessories - Tactile Luxe Design Loaded');
});
