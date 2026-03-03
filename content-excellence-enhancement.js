// 🏆 BMCC-Level Content Excellence Enhancement
// Professional content optimization and user experience enhancement

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏆 BMCC-Level Content Excellence System activated');
    
    // Professional content enhancements
    enhanceProfessionalContent();
    
    // Advanced user experience optimization
    optimizeUserExperience();
    
    // Professional interaction enhancements
    enhanceProfessionalInteractions();
});

function enhanceProfessionalContent() {
    // Enhance headings with professional styling
    document.querySelectorAll('h1, h2, h3').forEach(heading => {
        if (!heading.classList.contains('hero-title')) {
            heading.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
            heading.style.backgroundClip = 'text';
            heading.style.webkitBackgroundClip = 'text';
            heading.style.color = 'transparent';
            heading.style.fontWeight = '800';
        }
    });
    
    // Professional button enhancements
    document.querySelectorAll('button, .btn, a[href*="contact"], a[href*="certification"]').forEach(btn => {
        if (!btn.classList.contains('cta-primary') && !btn.classList.contains('cta-secondary')) {
            btn.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            btn.style.borderRadius = '8px';
            btn.style.fontWeight = '600';
        }
    });
}

function optimizeUserExperience() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Professional loading states
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
                submitBtn.innerHTML = 'Processing...';
                submitBtn.disabled = true;
            }
        });
    });
}

function enhanceProfessionalInteractions() {
    // Professional hover effects for cards
    document.querySelectorAll('.card, .service-item, .feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'initial';
        });
    });
    
    // Professional focus management
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3b82f6';
            this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
}

// Professional performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`🚀 Page loaded in ${loadTime}ms - BMCC-level performance achieved`);
    });
}
