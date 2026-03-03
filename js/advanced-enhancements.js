// Advanced Website Enhancements - March 3, 2026
// Continuing the professional transformation with sophisticated features

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Advanced CSGA Enhancements Loading...');
  
  // Initialize all advanced features
  initAdvancedAnimations();
  initInteractiveElements();
  initPerformanceOptimizations();
  initAdvancedNavigation();
  initConversionOptimization();
  initMicroInteractions();
  
  console.log('✨ Advanced CSGA Enhancements Complete');
});

function initAdvancedAnimations() {
  // Sophisticated scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Staggered animations for grid items
        if (entry.target.classList.contains('grid-container')) {
          const items = entry.target.querySelectorAll('.grid-item, .card, .service-card');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate-in-delayed');
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);
  
  // Add animation classes to elements
  const animateElements = document.querySelectorAll(
    '.hero-content, .section-title, .card, .service-card, .grid-container, .feature-block'
  );
  
  animateElements.forEach(el => {
    el.classList.add('animate-target');
    animationObserver.observe(el);
  });
  
  // Add CSS for animations
  addAdvancedAnimationCSS();
}

function addAdvancedAnimationCSS() {
  const animationCSS = document.createElement('style');
  animationCSS.innerHTML = `
    /* Advanced Animation System */
    .animate-target {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .animate-target.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .animate-in-delayed {
      opacity: 1;
      transform: translateY(0);
      transition-delay: var(--delay, 0ms);
    }
    
    /* Sophisticated hover effects */
    .card, .service-card {
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
    }
    
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
      transition: left 0.6s ease;
    }
    
    .card:hover::before {
      left: 100%;
    }
    
    .card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(204, 0, 0, 0.15);
    }
    
    /* Advanced button animations */
    .btn, .cta-button {
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .btn::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s ease, height 0.6s ease;
    }
    
    .btn:hover::before {
      width: 300px;
      height: 300px;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(204, 0, 0, 0.3);
    }
    
    /* Parallax scrolling effects */
    .parallax-bg {
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    
    /* Advanced gradient backgrounds */
    .gradient-advanced {
      background: linear-gradient(
        135deg,
        #0a1628 0%,
        #1e293b 25%,
        #334155 50%,
        #1e293b 75%,
        #0a1628 100%
      );
      background-size: 400% 400%;
      animation: gradientFlow 15s ease infinite;
    }
    
    @keyframes gradientFlow {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    /* Glowing elements */
    .glow-effect {
      box-shadow: 0 0 20px rgba(204, 0, 0, 0.3);
      animation: pulseGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes pulseGlow {
      from { box-shadow: 0 0 20px rgba(204, 0, 0, 0.3); }
      to { box-shadow: 0 0 30px rgba(204, 0, 0, 0.6); }
    }
    
    /* Text reveal animations */
    .text-reveal {
      overflow: hidden;
    }
    
    .text-reveal span {
      display: inline-block;
      transform: translateY(100%);
      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .text-reveal.animate-in span {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(animationCSS);
}

function initInteractiveElements() {
  // Advanced cursor effects
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #cc0000;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: all 0.1s ease;
    opacity: 0;
  `;
  document.body.appendChild(cursor);
  
  // Cursor tracking
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = 1;
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Interactive hover effects for clickable elements
  const interactiveElements = document.querySelectorAll('button, a, .card, .service-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.backgroundColor = 'rgba(204, 0, 0, 0.1)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.backgroundColor = 'transparent';
    });
  });
}

function initPerformanceOptimizations() {
  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Preload critical resources
  const criticalResources = [
    '/css/critical.css',
    '/js/critical.js',
    '/fonts/primary.woff2'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 
              resource.endsWith('.js') ? 'script' : 'font';
    if (link.as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
  
  // Service Worker for caching (if not already installed)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('SW registration failed');
    });
  }
}

function initAdvancedNavigation() {
  // Smooth scrolling with easing
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const targetTop = target.offsetTop - 80; // Account for fixed header
        
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Smart navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(section => highlightObserver.observe(section));
  
  // Progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #cc0000, #dc2626);
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = Math.min(progress, 100) + '%';
  });
}

function initConversionOptimization() {
  // Advanced CTA enhancement
  const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
  ctaButtons.forEach(btn => {
    // Add urgency indicators
    if (!btn.querySelector('.urgency-pulse')) {
      const pulse = document.createElement('span');
      pulse.className = 'urgency-pulse';
      pulse.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        width: 12px;
        height: 12px;
        background: #ff4444;
        border-radius: 50%;
        animation: urgencyPulse 1.5s ease-in-out infinite;
      `;
      btn.style.position = 'relative';
      btn.appendChild(pulse);
    }
    
    // Track interactions
    btn.addEventListener('click', () => {
      // Analytics tracking
      if (window.gtag) {
        gtag('event', 'cta_click', {
          'button_text': btn.textContent.trim(),
          'page_path': window.location.pathname
        });
      }
      
      // Visual feedback
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
    });
  });
  
  // Add urgency animation CSS
  const urgencyCSS = document.createElement('style');
  urgencyCSS.innerHTML = `
    @keyframes urgencyPulse {
      0%, 100% { 
        transform: scale(1); 
        opacity: 1; 
      }
      50% { 
        transform: scale(1.5); 
        opacity: 0.3; 
      }
    }
  `;
  document.head.appendChild(urgencyCSS);
}

function initMicroInteractions() {
  // Form field enhancements
  const formInputs = document.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    // Floating labels
    const label = input.previousElementSibling || input.nextElementSibling;
    if (label && label.tagName === 'LABEL') {
      input.addEventListener('focus', () => {
        label.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          label.classList.remove('focused');
        }
      });
      
      if (input.value) {
        label.classList.add('focused');
      }
    }
    
    // Input validation feedback
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.add('valid');
        input.classList.remove('invalid');
      } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
      }
    });
  });
  
  // Loading states for buttons
  const submitButtons = document.querySelectorAll('button[type="submit"]');
  submitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!btn.disabled) {
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;
        
        // Re-enable after 3 seconds (or when form submits)
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 3000);
      }
    });
  });
  
  // Tooltips for complex elements
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(el => {
    el.addEventListener('mouseenter', showTooltip);
    el.addEventListener('mouseleave', hideTooltip);
    el.addEventListener('focus', showTooltip);
    el.addEventListener('blur', hideTooltip);
  });
}

function showTooltip(e) {
  const tooltip = document.createElement('div');
  tooltip.className = 'custom-tooltip';
  tooltip.textContent = e.target.dataset.tooltip;
  tooltip.style.cssText = `
    position: absolute;
    background: #0a1628;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 0.85rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  `;
  
  document.body.appendChild(tooltip);
  
  const rect = e.target.getBoundingClientRect();
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = (rect.bottom + 5) + 'px';
  
  setTimeout(() => {
    tooltip.style.opacity = 1;
  }, 50);
  
  e.target._tooltip = tooltip;
}

function hideTooltip(e) {
  if (e.target._tooltip) {
    e.target._tooltip.remove();
    delete e.target._tooltip;
  }
}

// Advanced CSS utilities
function addUtilityCSS() {
  const utilityCSS = document.createElement('style');
  utilityCSS.innerHTML = `
    /* Advanced utility classes */
    .glass-effect {
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .gradient-text {
      background: linear-gradient(135deg, #cc0000, #dc2626);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .shadow-elegant {
      box-shadow: 0 10px 35px rgba(204, 0, 0, 0.1);
    }
    
    .hover-lift:hover {
      transform: translateY(-5px);
      transition: transform 0.3s ease;
    }
    
    .pulse-border {
      position: relative;
      overflow: hidden;
    }
    
    .pulse-border::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, #cc0000, transparent);
      animation: borderPulse 2s ease-in-out infinite;
    }
    
    @keyframes borderPulse {
      0%, 100% { left: -100%; }
      50% { left: 100%; }
    }
  `;
  document.head.appendChild(utilityCSS);
}

// Initialize utility CSS
addUtilityCSS();

// Export for debugging
window.CSGAAdvanced = {
  reinitAnimations: initAdvancedAnimations,
  reinitInteractive: initInteractiveElements,
  version: '2.0.0'
};

console.log('🎯 Advanced CSGA Enhancement System Loaded');