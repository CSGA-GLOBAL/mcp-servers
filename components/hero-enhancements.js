// CSGA Global Hero Enhancement Script
// Adds engagement buttons and ensures consistent styling across all hero sections

document.addEventListener('DOMContentLoaded', function() {
  
  // Hero engagement button configurations for each page
  const heroConfigs = {
    'contact.html': {
      buttons: [
        { text: 'Start Free Consultation', href: '#cnt-form-card', class: 'cta-primary', icon: '💬' },
        { text: 'View Office Locations', href: '#locations', class: 'cta-secondary', icon: '📍' }
      ]
    },
    'education.html': {
      buttons: [
        { text: 'Browse Free Courses', href: '/catalog.html#education', class: 'cta-primary', icon: '🎓' },
        { text: 'Start CASA Certification', href: '/certification.html', class: 'cta-secondary', icon: '🏆' }
      ]
    },
    'ai-governance.html': {
      buttons: [
        { text: 'Download Framework', href: '/csoai-standards.html', class: 'cta-primary', icon: '📋' },
        { text: 'Book Consultation', href: '/contact.html', class: 'cta-secondary', icon: '🤝' }
      ]
    },
    'certification.html': {
      buttons: [
        { text: 'Start CASA Certification', href: '/members.html', class: 'cta-primary', icon: '🚀' },
        { text: 'View Sample Exam', href: '#sample-exam', class: 'cta-secondary', icon: '📝' }
      ]
    },
    'cybersecurity.html': {
      buttons: [
        { text: 'View Security MCPs', href: '/catalog.html#security', class: 'cta-primary', icon: '🛡️' },
        { text: 'Get Risk Assessment', href: '/contact.html', class: 'cta-secondary', icon: '⚡' }
      ]
    },
    'research.html': {
      buttons: [
        { text: 'Access Research Portal', href: '/members.html', class: 'cta-primary', icon: '🔬' },
        { text: 'Submit Research', href: '/contact.html', class: 'cta-secondary', icon: '📊' }
      ]
    },
    'team.html': {
      buttons: [
        { text: 'Join Our Team', href: '/careers.html', class: 'cta-primary', icon: '👥' },
        { text: 'Advisory Board', href: '#advisory', class: 'cta-secondary', icon: '🎯' }
      ]
    },
    'partners.html': {
      buttons: [
        { text: 'Become a Partner', href: '/contact.html', class: 'cta-primary', icon: '🤝' },
        { text: 'View Partnership Tiers', href: '#partnership-tiers', class: 'cta-secondary', icon: '⭐' }
      ]
    }
  };

  // Get current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Add engagement buttons if configured for this page
  if (heroConfigs[currentPage]) {
    addHeroEngagementButtons(heroConfigs[currentPage].buttons);
  }
  
  // Ensure all heroes have proper white text styling
  ensureHeroTextStyling();
  
  // Add mobile menu fix (from earlier)
  addMobileMenuFunctionality();
});

function addHeroEngagementButtons(buttons) {
  // Find hero sections (multiple selectors to catch all variations)
  const heroSelectors = [
    '.cnt-hero', '.edu-hero', '.hero-about', '.catalog-hero', '.hero-pricing',
    '.evt-hero', '.mem-hero', '.page-hero', '.home-hero', '.ai-hero',
    '.cert-hero', '.cyber-hero', '.research-hero', '.team-hero', '.partners-hero'
  ];
  
  let hero = null;
  for (const selector of heroSelectors) {
    hero = document.querySelector(selector);
    if (hero) break;
  }
  
  if (!hero || buttons.length === 0) return;
  
  // Check if buttons already exist
  if (hero.querySelector('.hero-cta-buttons')) return;
  
  // Create button container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'hero-cta-buttons';
  buttonContainer.style.cssText = `
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 32px;
    animation: fadeInUp 0.8s ease-out 0.4s both;
  `;
  
  // Create buttons
  buttons.forEach((buttonConfig, index) => {
    const button = document.createElement('a');
    button.href = buttonConfig.href;
    button.className = `hero-cta-btn ${buttonConfig.class}`;
    button.innerHTML = `${buttonConfig.icon} ${buttonConfig.text}`;
    
    // Style buttons
    if (buttonConfig.class === 'cta-primary') {
      button.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #CC0000;
        color: white;
        padding: 14px 28px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        transition: all 0.25s ease;
        box-shadow: 0 4px 20px rgba(204, 0, 0, 0.3);
      `;
    } else {
      button.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: 12px 28px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.25s ease;
        backdrop-filter: blur(10px);
      `;
    }
    
    // Add hover effects
    button.addEventListener('mouseenter', function() {
      if (buttonConfig.class === 'cta-primary') {
        this.style.background = '#AA0000';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 30px rgba(204, 0, 0, 0.4)';
      } else {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        this.style.transform = 'translateY(-2px)';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      if (buttonConfig.class === 'cta-primary') {
        this.style.background = '#CC0000';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 20px rgba(204, 0, 0, 0.3)';
      } else {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        this.style.transform = 'translateY(0)';
      }
    });
    
    buttonContainer.appendChild(button);
  });
  
  // Insert buttons after hero text content
  const heroText = hero.querySelector('p, .subtitle, .tagline, .hero-stats, .hero-badges');
  if (heroText) {
    heroText.insertAdjacentElement('afterend', buttonContainer);
  } else {
    hero.appendChild(buttonContainer);
  }
}

function ensureHeroTextStyling() {
  // Find all hero sections
  const heroes = document.querySelectorAll([
    '.cnt-hero', '.edu-hero', '.hero-about', '.catalog-hero', '.hero-pricing',
    '.evt-hero', '.mem-hero', '.page-hero', '.home-hero', '.ai-hero',
    '.cert-hero', '.cyber-hero', '.research-hero', '.team-hero', '.partners-hero'
  ].join(','));
  
  heroes.forEach(hero => {
    // Ensure hero has white text
    if (!hero.style.color && !getComputedStyle(hero).color.includes('255')) {
      hero.style.color = '#ffffff';
    }
    
    // Ensure hero titles are white
    const title = hero.querySelector('h1');
    if (title && !title.style.color) {
      title.style.color = '#ffffff';
      title.style.textShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    }
    
    // Ensure hero text is readable
    const text = hero.querySelector('p, .subtitle, .tagline');
    if (text && !text.style.color) {
      text.style.color = 'rgba(255, 255, 255, 0.9)';
    }
    
    // Add red highlights to spans if they exist
    const highlights = hero.querySelectorAll('span');
    highlights.forEach(span => {
      if (!span.style.color && !span.className.includes('badge')) {
        span.style.color = '#CC0000';
      }
    });
  });
}

function addMobileMenuFunctionality() {
  // Create hamburger if missing
  const headerRight = document.querySelector('.header-right');
  if (headerRight && !document.querySelector('.hamburger, .menu-toggle')) {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger menu-toggle';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // Hamburger styles
    hamburger.style.cssText = `
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      background: none;
      border: none;
      cursor: pointer;
      gap: 4px;
    `;
    
    // Hamburger line styles
    hamburger.querySelectorAll('span').forEach(span => {
      span.style.cssText = `
        width: 20px;
        height: 2px;
        background: white;
        transition: all 0.25s ease;
        display: block;
      `;
    });
    
    headerRight.appendChild(hamburger);
    
    // Show on mobile
    const mediaQuery = window.matchMedia('(max-width: 900px)');
    function handleMobile(e) {
      hamburger.style.display = e.matches ? 'flex' : 'none';
    }
    mediaQuery.addListener(handleMobile);
    handleMobile(mediaQuery);
  }
  
  // Toggle functionality
  document.querySelectorAll('.hamburger, .menu-toggle').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
      
      const navBar = document.querySelector('.nav-bar');
      if (navBar) {
        navBar.classList.toggle('active');
      }
      
      // Animate hamburger
      const spans = this.querySelectorAll('span');
      if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });
  
  // Close menu on link click (mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 900) {
        document.querySelectorAll('.hamburger, .menu-toggle').forEach(h => {
          h.classList.remove('active');
          h.querySelectorAll('span').forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
          });
        });
        
        const navBar = document.querySelector('.nav-bar');
        if (navBar) navBar.classList.remove('active');
      }
    });
  });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .hero-cta-buttons {
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }
  
  @media (max-width: 768px) {
    .hero-cta-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .hero-cta-btn {
      width: 100%;
      max-width: 280px;
      justify-content: center;
    }
  }
`;
document.head.appendChild(style);