// 🛡️ CSGA Hero Slider & Mobile Navigation Fixes
// Fix hero text visibility, branding, and mobile menu navigation

class CSGAHeroMobileFixes {
  constructor() {
    this.init();
  }

  init() {
    this.fixHeroSliders();
    this.enhanceMobileNavigation();
    this.addCSGABranding();
    this.improveTextVisibility();
    this.addAccessibilityFeatures();
  }

  // 🎯 Fix Hero Sliders
  fixHeroSliders() {
    // Find all hero/slider elements
    const sliders = document.querySelectorAll(`
      .hero-slider, .slider, [class*="slider"], 
      .carousel, [class*="carousel"], 
      .hero, [class*="hero"], 
      .banner, [class*="banner"]
    `);

    sliders.forEach(slider => this.enhanceSlider(slider));
  }

  enhanceSlider(slider) {
    // Add CSGA styling classes
    slider.classList.add('csga-hero-enhanced');

    // Find slides within the slider
    const slides = slider.querySelectorAll(`
      .slide, [class*="slide"], 
      .carousel-item, [class*="carousel-item"],
      .hero-content, [class*="hero-content"]
    `);

    slides.forEach((slide, index) => {
      this.enhanceSlide(slide, index);
    });

    // Add navigation if not present
    this.addSliderNavigation(slider);

    // Add CSGA badges
    this.addCSGABadges(slider);
  }

  enhanceSlide(slide, index) {
    // Ensure proper overlay for text visibility
    if (!slide.querySelector('.csga-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'csga-overlay';
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
          rgba(26, 32, 44, 0.8) 0%, 
          rgba(49, 130, 206, 0.6) 50%, 
          rgba(30, 58, 138, 0.8) 100%
        );
        z-index: 1;
      `;
      slide.appendChild(overlay);
    }

    // Ensure content has proper z-index
    const content = slide.querySelector('.content, [class*="content"], h1, h2, p');
    if (content) {
      let contentWrapper = slide.querySelector('.csga-content-wrapper');
      if (!contentWrapper) {
        contentWrapper = document.createElement('div');
        contentWrapper.className = 'csga-content-wrapper';
        contentWrapper.style.cssText = `
          position: relative;
          z-index: 3;
          text-align: center;
          color: #ffffff;
          max-width: 800px;
          padding: 3rem 2rem;
          margin: 0 auto;
        `;

        // Move existing content into wrapper
        const existingContent = slide.innerHTML;
        slide.innerHTML = '';
        slide.appendChild(overlay);
        contentWrapper.innerHTML = existingContent;
        slide.appendChild(contentWrapper);
      }
    }

    // Fix text styling
    this.fixSlideTextStyling(slide);

    // Add CSGA branding
    this.addSlideBranding(slide, index);
  }

  fixSlideTextStyling(slide) {
    // Fix headings
    const headings = slide.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
      heading.style.cssText = `
        color: #ffffff !important;
        font-weight: 800 !important;
        margin-bottom: 1.5rem !important;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
        background: linear-gradient(135deg, #ffffff, #4299e1) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        line-height: 1.2 !important;
      `;
    });

    // Fix paragraphs
    const paragraphs = slide.querySelectorAll('p');
    paragraphs.forEach(p => {
      p.style.cssText = `
        color: #ffffff !important;
        font-size: 1.25rem !important;
        margin-bottom: 2rem !important;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
        line-height: 1.6 !important;
        font-weight: 500 !important;
      `;
    });

    // Fix buttons
    const buttons = slide.querySelectorAll('button, .btn, a[class*="btn"]');
    buttons.forEach(btn => {
      btn.style.cssText = `
        background: linear-gradient(135deg, #3182ce, #4299e1) !important;
        color: #ffffff !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        padding: 1rem 2rem !important;
        font-size: 1.125rem !important;
        font-weight: 600 !important;
        border-radius: 0.75rem !important;
        text-transform: uppercase !important;
        letter-spacing: 0.025em !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 15px rgba(49, 130, 206, 0.4) !important;
        margin: 0.5rem !important;
        cursor: pointer !important;
      `;

      // Add hover effect
      btn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #2c5282, #3182ce) !important';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(49, 130, 206, 0.6) !important';
      });

      btn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #3182ce, #4299e1) !important';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(49, 130, 206, 0.4) !important';
      });
    });
  }

  addSlideBranding(slide, index) {
    // Add CSGA branding to first slide
    if (index === 0 && !slide.querySelector('.csga-slide-branding')) {
      const branding = document.createElement('div');
      branding.className = 'csga-slide-branding';
      branding.style.cssText = `
        position: absolute;
        top: 2rem;
        left: 2rem;
        z-index: 4;
        background: rgba(26, 32, 44, 0.9);
        backdrop-filter: blur(10px);
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      `;
      
      branding.innerHTML = `
        <div style="color: #ffffff; font-weight: 700; font-size: 1.125rem;">
          🛡️ CSGA
        </div>
        <div style="color: #4299e1; font-size: 0.875rem; font-weight: 500;">
          Cyber Security Global Alliance
        </div>
      `;
      
      slide.appendChild(branding);
    }
  }

  addSliderNavigation(slider) {
    if (!slider.querySelector('.csga-slider-nav')) {
      const slides = slider.querySelectorAll('.slide, [class*="slide"], .carousel-item');
      
      if (slides.length > 1) {
        const nav = document.createElement('div');
        nav.className = 'csga-slider-nav';
        nav.style.cssText = `
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 4;
        `;

        slides.forEach((_, index) => {
          const dot = document.createElement('button');
          dot.className = 'csga-slider-dot';
          dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            border: 2px solid #3182ce;
            cursor: pointer;
            transition: all 0.3s ease;
          `;

          if (index === 0) {
            dot.classList.add('active');
            dot.style.background = '#3182ce';
            dot.style.transform = 'scale(1.2)';
          }

          dot.addEventListener('click', () => this.goToSlide(slider, index));
          nav.appendChild(dot);
        });

        slider.appendChild(nav);
      }
    }
  }

  goToSlide(slider, index) {
    const slides = slider.querySelectorAll('.slide, [class*="slide"], .carousel-item');
    const dots = slider.querySelectorAll('.csga-slider-dot');

    // Hide all slides
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'flex' : 'none';
    });

    // Update dots
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        dot.style.background = '#3182ce';
        dot.style.transform = 'scale(1.2)';
      } else {
        dot.classList.remove('active');
        dot.style.background = 'rgba(255, 255, 255, 0.5)';
        dot.style.transform = 'scale(1)';
      }
    });
  }

  addCSGABadges(slider) {
    if (!slider.querySelector('.csga-hero-badges')) {
      const badges = document.createElement('div');
      badges.className = 'csga-hero-badges';
      badges.style.cssText = `
        position: absolute;
        bottom: 1rem;
        right: 2rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 4;
      `;

      const badgeTexts = ['ISO 27001', 'SOC 2', 'GDPR', 'WCAG 2.1'];
      badgeTexts.forEach(text => {
        const badge = document.createElement('div');
        badge.className = 'csga-hero-badge';
        badge.textContent = text;
        badge.style.cssText = `
          background: rgba(49, 130, 206, 0.9);
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        badges.appendChild(badge);
      });

      slider.appendChild(badges);
    }
  }

  // 📱 Enhance Mobile Navigation
  enhanceMobileNavigation() {
    this.setupMobileMenu();
    this.addMobileMenuToggle();
    this.improveMobileMenuStyling();
  }

  setupMobileMenu() {
    // Find existing navigation
    const nav = document.querySelector('nav, .navbar, .navigation, header');
    if (!nav) return;

    // Create mobile menu if it doesn't exist
    let mobileMenu = nav.querySelector('.mobile-menu, .navbar-collapse');
    
    if (!mobileMenu) {
      mobileMenu = this.createMobileMenu(nav);
    }

    // Enhance existing mobile menu
    this.enhanceMobileMenu(mobileMenu);

    // Create mobile menu toggle button
    this.createMobileToggle(nav);
  }

  createMobileMenu(nav) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'csga-mobile-menu';
    mobileMenu.style.cssText = `
      position: fixed;
      top: 0;
      right: -100%;
      width: 280px;
      height: 100vh;
      background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
      backdrop-filter: blur(10px);
      z-index: 9999;
      padding: 2rem 0;
      overflow-y: auto;
      transition: right 0.3s ease;
      box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
    `;

    // Add CSGA logo
    const logo = document.createElement('div');
    logo.className = 'csga-mobile-logo';
    logo.style.cssText = `
      padding: 1rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1rem;
    `;
    logo.innerHTML = `
      <div style="color: #ffffff; font-size: 1.5rem; font-weight: 700;">
        🛡️ CSGA
      </div>
      <div style="color: #4299e1; font-size: 0.875rem; font-weight: 500;">
        Cyber Security Global Alliance
      </div>
    `;

    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'csga-mobile-close';
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('click', () => this.closeMobileMenu());

    // Create navigation menu
    const menuList = this.createMobileMenuList(nav);

    mobileMenu.appendChild(closeBtn);
    mobileMenu.appendChild(logo);
    mobileMenu.appendChild(menuList);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'csga-mobile-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9998;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    `;

    overlay.addEventListener('click', () => this.closeMobileMenu());

    document.body.appendChild(overlay);
    document.body.appendChild(mobileMenu);

    return mobileMenu;
  }

  createMobileMenuList(nav) {
    const menuList = document.createElement('ul');
    menuList.style.cssText = `
      list-style: none;
      padding: 0;
      margin: 0;
    `;

    // Extract navigation links
    const navLinks = nav.querySelectorAll('a');
    const menuItems = [
      { text: '🏠 Home', href: '/' },
      { text: '🛡️ Alliance', href: '/alliance' },
      { text: '📚 Programs', href: '/programs' },
      { text: '🔒 Services', href: '/services' },
      { text: '📊 Research', href: '/research' },
      { text: '💼 Membership', href: '/membership' },
      { text: '📞 Contact', href: '/contact' }
    ];

    // Use existing links if available, otherwise use default menu
    const links = navLinks.length > 0 ? 
      Array.from(navLinks).map(link => ({ text: link.textContent, href: link.href })) :
      menuItems;

    links.forEach(link => {
      const listItem = document.createElement('li');
      listItem.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';

      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.text;
      linkElement.style.cssText = `
        display: block;
        padding: 1rem 2rem;
        color: #ffffff;
        text-decoration: none;
        font-weight: 500;
        font-size: 1.125rem;
        transition: all 0.3s ease;
        border-left: 4px solid transparent;
      `;

      linkElement.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(49, 130, 206, 0.2)';
        this.style.borderLeftColor = '#3182ce';
        this.style.paddingLeft = '2.5rem';
        this.style.color = '#4299e1';
      });

      linkElement.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.borderLeftColor = 'transparent';
        this.style.paddingLeft = '2rem';
        this.style.color = '#ffffff';
      });

      linkElement.addEventListener('click', () => this.closeMobileMenu());

      listItem.appendChild(linkElement);
      menuList.appendChild(listItem);
    });

    return menuList;
  }

  createMobileToggle(nav) {
    let toggleBtn = nav.querySelector('.csga-mobile-toggle');
    
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.className = 'csga-mobile-toggle';
      toggleBtn.innerHTML = '☰';
      toggleBtn.style.cssText = `
        display: none;
        background: linear-gradient(135deg, #1a202c, #3182ce);
        border: 2px solid rgba(255, 255, 255, 0.2);
        color: #ffffff;
        padding: 0.75rem;
        border-radius: 0.5rem;
        font-size: 1.125rem;
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        z-index: 1000;
        margin-left: auto;
      `;

      toggleBtn.addEventListener('click', () => this.openMobileMenu());
      
      toggleBtn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #2d3748, #4299e1)';
        this.style.transform = 'scale(1.05)';
      });

      toggleBtn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #1a202c, #3182ce)';
        this.style.transform = 'scale(1)';
      });

      nav.appendChild(toggleBtn);
    }

    // Show mobile toggle on mobile devices
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleMediaChange = (e) => {
      toggleBtn.style.display = e.matches ? 'block' : 'none';
      
      // Hide desktop nav on mobile
      const desktopNav = nav.querySelector('.navbar-nav, .nav-menu, ul');
      if (desktopNav && desktopNav !== toggleBtn.parentElement) {
        desktopNav.style.display = e.matches ? 'none' : 'flex';
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    handleMediaChange(mediaQuery);
  }

  openMobileMenu() {
    const mobileMenu = document.querySelector('.csga-mobile-menu');
    const overlay = document.querySelector('.csga-mobile-overlay');
    
    if (mobileMenu) {
      mobileMenu.style.right = '0';
    }
    
    if (overlay) {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('.csga-mobile-menu');
    const overlay = document.querySelector('.csga-mobile-overlay');
    
    if (mobileMenu) {
      mobileMenu.style.right = '-100%';
    }
    
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
    }

    // Restore body scroll
    document.body.style.overflow = '';
  }

  enhanceMobileMenu(mobileMenu) {
    // Enhance existing mobile menu with CSGA styling
    mobileMenu.style.background = 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)';
    mobileMenu.style.zIndex = '9999';
    
    // Style links in existing menu
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
      link.style.cssText = `
        display: block;
        padding: 1rem 2rem;
        color: #ffffff;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        border-left: 4px solid transparent;
      `;

      link.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(49, 130, 206, 0.2)';
        this.style.borderLeftColor = '#3182ce';
        this.style.color = '#4299e1';
      });

      link.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.borderLeftColor = 'transparent';
        this.style.color = '#ffffff';
      });
    });
  }

  improveMobileMenuStyling() {
    // Add responsive styles for better mobile experience
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 1024px) {
        .csga-mobile-toggle {
          display: block !important;
        }
        
        .navbar-nav, .nav-menu, .desktop-nav {
          display: none !important;
        }
      }
      
      @media (max-width: 768px) {
        .csga-mobile-menu {
          width: 100% !important;
          max-width: 320px !important;
        }
        
        .csga-hero-badges {
          display: none !important;
        }
        
        .csga-slide-branding {
          top: 1rem !important;
          left: 1rem !important;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  // 🎨 Add CSGA Branding
  addCSGABranding() {
    // Add CSGA branding to navigation if not present
    const nav = document.querySelector('nav, .navbar, header');
    if (nav && !nav.querySelector('.csga-nav-brand')) {
      const brand = document.createElement('div');
      brand.className = 'csga-nav-brand';
      brand.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 700;
        color: #1a202c;
        margin-right: auto;
      `;
      
      brand.innerHTML = `
        <span style="font-size: 1.25rem;">🛡️ CSGA</span>
        <span style="font-size: 0.875rem; color: #4a5568;">Cyber Security Global Alliance</span>
      `;
      
      nav.insertBefore(brand, nav.firstChild);
    }
  }

  // 🔍 Improve Text Visibility
  improveTextVisibility() {
    // Force text shadows on all hero/slider text
    const heroTexts = document.querySelectorAll(`
      .hero *, .banner *, [class*="hero"] *, [class*="banner"] *,
      .slider *, [class*="slider"] *, .carousel *, [class*="carousel"] *
    `);

    heroTexts.forEach(element => {
      if (element.tagName === 'H1' || element.tagName === 'H2' || 
          element.tagName === 'H3' || element.tagName === 'P') {
        element.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8)';
        element.style.color = '#ffffff';
      }
    });
  }

  // ♿ Add Accessibility Features
  addAccessibilityFeatures() {
    // Add keyboard navigation for sliders
    const sliders = document.querySelectorAll('.csga-hero-enhanced');
    sliders.forEach(slider => {
      slider.setAttribute('role', 'region');
      slider.setAttribute('aria-label', 'CSGA Hero Slider');
      
      const dots = slider.querySelectorAll('.csga-slider-dot');
      dots.forEach((dot, index) => {
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        
        dot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dot.click();
          }
        });
      });
    });

    // Add focus management for mobile menu
    const mobileToggle = document.querySelector('.csga-mobile-toggle');
    const mobileMenu = document.querySelector('.csga-mobile-menu');
    
    if (mobileToggle && mobileMenu) {
      mobileToggle.setAttribute('aria-label', 'Open mobile menu');
      mobileToggle.setAttribute('aria-expanded', 'false');
      
      const closeBtn = mobileMenu.querySelector('.csga-mobile-close');
      if (closeBtn) {
        closeBtn.setAttribute('aria-label', 'Close mobile menu');
      }

      // Focus management
      mobileToggle.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'true');
        setTimeout(() => {
          const firstLink = mobileMenu.querySelector('a');
          if (firstLink) firstLink.focus();
        }, 300);
      });

      const originalCloseMenu = this.closeMobileMenu.bind(this);
      this.closeMobileMenu = () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        originalCloseMenu();
        mobileToggle.focus();
      };
    }

    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
      }
    });
  }
}

// 🚀 Initialize CSGA Hero & Mobile Fixes
document.addEventListener('DOMContentLoaded', () => {
  new CSGAHeroMobileFixes();
});

// Handle dynamic content
const observer = new MutationObserver(() => {
  setTimeout(() => {
    new CSGAHeroMobileFixes();
  }, 100);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('✅ CSGA Hero Slider & Mobile Navigation Fixes Applied');