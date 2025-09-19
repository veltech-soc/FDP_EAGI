// Faculty Development Program Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.event-card, .coordinator-card, .section-title');
    animatedElements.forEach(el => observer.observe(el));

    // Enhanced hover effects for coordinator cards
    const coordinatorCards = document.querySelectorAll('.coordinator-card');
    coordinatorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Logo rotation effect
    const circularLogo = document.querySelector('.circular-logo');
    if (circularLogo) {
        let rotationDegree = 0;
        
        circularLogo.addEventListener('mouseenter', function() {
            rotationDegree += 360;
            this.style.transform = `rotate(${rotationDegree}deg) scale(1.1)`;
        });
        
        circularLogo.addEventListener('mouseleave', function() {
            this.style.transform = `rotate(${rotationDegree}deg) scale(1)`;
        });
    }

    // Smooth reveal animation for content
    function revealContent() {
        const reveals = document.querySelectorAll('.fade-in, .fade-up');
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealContent);
    revealContent(); // Initial check

    // Event card interactive effects
    const eventCard = document.querySelector('.event-card');
    if (eventCard) {
        eventCard.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #2563EB, #0891B2, #7C3AED, #059669)';
        });
        
        eventCard.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #2563EB, #0891B2, #059669)';
        });
    }

    // Dynamic typing effect for the status message
    const statusElement = document.querySelector('.event-status');
    if (statusElement) {
        const originalText = statusElement.textContent;
        const typingSpeed = 50;
        let currentIndex = 0;
        
        function typeText() {
            if (currentIndex < originalText.length) {
                statusElement.textContent = originalText.substring(0, currentIndex + 1) + '|';
                currentIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                statusElement.textContent = originalText;
                // Add blinking cursor effect
                setTimeout(() => {
                    statusElement.textContent = originalText + ' ●';
                    setTimeout(() => {
                        statusElement.textContent = originalText;
                    }, 500);
                }, 1000);
            }
        }

        // Start typing effect after page load
        setTimeout(() => {
            statusElement.textContent = '';
            currentIndex = 0;
            typeText();
        }, 2000);
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add sparkle effect to logos on hover
    function createSparkle(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleAnimation 0.8s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = Math.random() * rect.width + 'px';
        sparkle.style.top = Math.random() * rect.height + 'px';
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }

    // Add sparkle animation CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleAnimation {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(180deg);
                opacity: 0;
            }
        }
        .sparkle {
            z-index: 1000;
        }
    `;
    document.head.appendChild(sparkleStyle);

    // Add sparkle effect to logo containers
    const logoContainers = document.querySelectorAll('.logo-container');
    logoContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            const logoPlaceholder = this.querySelector('.logo-placeholder');
            logoPlaceholder.style.position = 'relative';
            
            // Create multiple sparkles
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createSparkle(logoPlaceholder), i * 200);
            }
        });
    });

    console.log('Faculty Development Program webpage loaded successfully!');
});

// Add CSS animations for better visual effects
const additionalStyles = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .coordinator-card {
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.6s ease-out;
    }
    
    .coordinator-card.animate-in {
        transform: translateY(0);
        opacity: 1;
    }
    
    .event-card {
        transform: scale(0.9);
        opacity: 0;
        transition: all 0.6s ease-out;
    }
    
    .event-card.animate-in {
        transform: scale(1);
        opacity: 1;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
