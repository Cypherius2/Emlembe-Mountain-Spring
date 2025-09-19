// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('card-animate')) {
                    const cards = entry.target.parentElement.querySelectorAll('.card-animate');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animationDelay = `${index * 0.2}s`;
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.card-animate, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-image');
        if (parallax) {
            const speed = scrolled * 0.1;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Form submission handling
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#27ae60';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // Add floating animation to cards on hover
    document.querySelectorAll('.product-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = target === Infinity ? '∞' : Math.floor(current) + (target === 100 ? '%' : '');
        }, 20);
    }

    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const text = stat.textContent;
                    if (text === '100%') {
                        animateCounter(stat, 100);
                    } else if (text === '∞') {
                        stat.textContent = '∞';
                    } else if (text === '1') {
                        animateCounter(stat, 1);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const missionStats = document.querySelector('.mission-stats');
    if (missionStats) {
        statsObserver.observe(missionStats);
    }

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Start typing effect after page load
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    }, 500);

    // Add mouse follow effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
            }
        });
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #3498db, #2980b9);
        z-index: 9999;
        transition: width 0.25s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .floating-animation {
            animation: float-gentle 6s ease-in-out infinite;
        }
        
        @keyframes float-gentle {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);

    // Add floating animation to product cards
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 1}s`;
        card.classList.add('floating-animation');
    });

    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3498db, #2980b9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        
        loader.innerHTML = `
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        `;
        
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });

    // Add water drop animation effect
    function createWaterDrop() {
        const drop = document.createElement('div');
        drop.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: #3498db;
            border-radius: 50%;
            opacity: 0.6;
            animation: water-drop 3s linear infinite;
            left: ${Math.random() * 100}%;
            top: -10px;
        `;
        
        document.querySelector('.hero').appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, 3000);
    }

    // Create water drops periodically
    setInterval(createWaterDrop, 2000);

    // Add water drop animation keyframes
    const waterDropStyle = document.createElement('style');
    waterDropStyle.textContent = `
        @keyframes water-drop {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.6;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(waterDropStyle);

    // Add text reveal animation on scroll
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    textElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        textObserver.observe(el);
    });

    // Add hover effect for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add pulse animation to important elements
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        btn.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Add shake animation to form inputs on validation
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('invalid', function() {
            this.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Add shake animation keyframes
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // Add smooth transitions to all elements
    document.querySelectorAll('*').forEach(el => {
        if (!el.style.transition) {
            el.style.transition = 'all 0.3s ease';
        }
    });

    // FAQ Functionality
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Enhanced form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['firstName', 'lastName', 'email', 'service', 'message'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = '#e74c3c';
                    input.style.animation = 'shake 0.5s ease-in-out';
                    isValid = false;
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                        input.style.animation = '';
                    }, 500);
                }
            });
            
            // Validate terms checkbox
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                termsCheckbox.parentElement.style.animation = 'shake 0.5s ease-in-out';
                isValid = false;
                
                setTimeout(() => {
                    termsCheckbox.parentElement.style.animation = '';
                }, 500);
            }
            
            if (!isValid) {
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#27ae60';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #27ae60;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 10000;
                    animation: slideInRight 0.5s ease;
                `;
                successMessage.innerHTML = '<i class="fas fa-check"></i> Thank you! We\'ll get back to you within 24 hours.';
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = '#27ae60';
                } else {
                    this.style.borderColor = '';
                }
            });
        });
    }

    // Service link smooth scrolling on services page
    document.querySelectorAll('.service-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add notification animation keyframes
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .plan-card.featured {
            position: relative;
        }
        
        .plan-card.featured::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(52, 152, 219, 0.1), transparent);
            animation: shimmer 2s ease-in-out infinite;
            pointer-events: none;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(notificationStyle);

    // Add hover effects for plan cards
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05) translateY(-15px)' 
                : 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05)' 
                : '';
        });
    });

    // Add number counting animation for prices
    function animateNumber(element, target, suffix = '') {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 30);
    }

    // Observe pricing elements
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target.querySelector('.price-amount');
                if (priceElement) {
                    const value = parseInt(priceElement.textContent.replace(/[^0-9]/g, ''));
                    animateNumber(priceElement, value, '');
                    priceObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.plan-card').forEach(card => {
        priceObserver.observe(card);
    });

    // Add interactive service card effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add click tracking for analytics (placeholder)
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Contact action:', this.href);
            // Here you would typically send this to your analytics service
        });
    });
});
