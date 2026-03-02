// CSGA Global Comprehensive Polish & Quality Assurance Script
// Ensures 100% professional, clean, seamless experience across all platforms

document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize comprehensive polish
  initializeQualityAssurance();
  fixMobileExperience();
  polishDesktopExperience();
  enhanceSignupFlows();
  optimizeDashboardUI();
  ensureCrossPlatformCompatibility();
  addPerformanceOptimizations();
  
});

function initializeQualityAssurance() {
  console.log('🎯 CSGA Global Quality Assurance - Initializing...');
  
  // Add global quality CSS
  const qualityCSS = `
    /* ============================================================================
       CSGA Global - Professional Polish & Quality Assurance Styles
       ============================================================================ */
    
    /* Fix common layout issues */
    * {
      box-sizing: border-box;
    }
    
    /* Ensure consistent font rendering */
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    
    /* Fix button states */
    button, .btn, .cta-btn, input[type="submit"] {
      cursor: pointer;
      transition: all 0.25s ease;
      border: none;
      outline: none;
    }
    
    button:focus-visible, .btn:focus-visible {
      outline: 2px solid #CC0000;
      outline-offset: 2px;
    }
    
    /* Ensure images are responsive */
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* Fix form elements */
    input, textarea, select {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      font-size: 1rem;
      transition: all 0.25s ease;
    }
    
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: #0058A4;
      box-shadow: 0 0 0 3px rgba(0, 88, 164, 0.1);
    }
    
    /* Professional loading states */
    .loading {
      opacity: 0.7;
      pointer-events: none;
      position: relative;
    }
    
    .loading::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin: -10px 0 0 -10px;
      border: 2px solid #CC0000;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Fix navigation issues */
    .nav-link {
      position: relative;
      display: block;
      padding: 12px 16px;
      text-decoration: none;
      transition: all 0.25s ease;
    }
    
    .nav-link:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    /* Ensure sections have proper spacing */
    section {
      position: relative;
      overflow: hidden;
    }
    
    section + section {
      margin-top: 0;
    }
    
    /* Fix hero sections */
    .hero, .home-hero, .cnt-hero, .edu-hero, .evt-hero, .mem-hero {
      position: relative;
      overflow: hidden;
      min-height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    /* Professional card styles */
    .card, .pricing-card, .feature-card {
      background: #ffffff;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: all 0.25s ease;
    }
    
    .card:hover, .pricing-card:hover, .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    /* Fix footer */
    footer {
      margin-top: auto;
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = qualityCSS;
  document.head.appendChild(style);
}

function fixMobileExperience() {
  console.log('📱 Optimizing mobile experience...');
  
  // Mobile-specific fixes
  const mobileCSS = `
    @media (max-width: 768px) {
      /* Fix mobile navigation */
      .nav-bar {
        position: fixed;
        top: 66px;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--blue-dark);
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        z-index: 999;
        padding: 20px;
        overflow-y: auto;
      }
      
      .nav-bar.active {
        transform: translateX(0);
      }
      
      /* Fix mobile hero sections */
      .hero h1, .home-hero h1, .cnt-hero h1, .edu-hero h1 {
        font-size: 2.2rem !important;
        line-height: 1.2 !important;
      }
      
      /* Mobile button improvements */
      .btn, .cta-btn, .hero-cta-btn {
        width: 100% !important;
        max-width: 320px !important;
        margin: 8px auto !important;
        display: block !important;
        text-align: center !important;
      }
      
      /* Fix mobile forms */
      .form-row {
        flex-direction: column !important;
      }
      
      .form-group {
        margin-bottom: 16px !important;
      }
      
      /* Mobile pricing tables */
      .pricing-grid {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
      }
      
      /* Mobile feature grids */
      .feature-grid, .mcp-grid {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
      }
      
      /* Fix mobile spacing */
      section {
        padding: 40px 16px !important;
      }
      
      .container {
        padding: 0 16px !important;
      }
      
      /* Mobile-friendly text sizes */
      h2 {
        font-size: 1.8rem !important;
      }
      
      h3 {
        font-size: 1.5rem !important;
      }
      
      p {
        font-size: 1rem !important;
        line-height: 1.6 !important;
      }
      
      /* Fix mobile footer */
      .footer-grid {
        grid-template-columns: 1fr !important;
        text-align: center !important;
      }
      
      /* Mobile table fix */
      .table-responsive {
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
      }
      
      table {
        min-width: 600px !important;
      }
    }
  `;
  
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = mobileCSS;
  document.head.appendChild(mobileStyle);
  
  // Fix mobile scroll behavior
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.overscrollBehavior = 'contain';
  }
  
  // Fix mobile viewport issues
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    const newViewport = document.createElement('meta');
    newViewport.name = 'viewport';
    newViewport.content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
    document.head.appendChild(newViewport);
  }
  
  // Mobile touch improvements
  const style = document.createElement('style');
  style.textContent = `
    /* Better touch targets */
    button, .btn, .nav-link, .cta-btn {
      min-height: 44px;
      min-width: 44px;
    }
    
    /* Prevent zoom on input focus */
    input, textarea, select {
      font-size: 16px;
    }
    
    /* Smooth scroll for mobile */
    html {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
  `;
  document.head.appendChild(style);
}

function polishDesktopExperience() {
  console.log('🖥️ Polishing desktop experience...');
  
  // Desktop enhancements
  const desktopCSS = `
    @media (min-width: 1024px) {
      /* Enhance desktop hero sections */
      .hero, .home-hero, .cnt-hero, .edu-hero {
        min-height: 600px;
      }
      
      /* Better desktop spacing */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 32px;
      }
      
      /* Desktop navigation enhancements */
      .nav-bar {
        position: sticky;
        top: 66px;
        background: var(--blue-dark);
        z-index: 999;
      }
      
      .nav-link:hover {
        background: var(--white-12);
        color: #fff;
      }
      
      /* Desktop button hover effects */
      .btn:hover, .cta-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }
      
      /* Desktop grid improvements */
      .pricing-grid {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 32px;
      }
      
      .feature-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
      }
      
      /* Desktop parallax effects */
      .hero::before {
        transform: translateY(var(--scroll-offset, 0));
      }
      
      /* Better desktop footer */
      .footer-grid {
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: 48px;
      }
    }
  `;
  
  const desktopStyle = document.createElement('style');
  desktopStyle.textContent = desktopCSS;
  document.head.appendChild(desktopStyle);
  
  // Add smooth scroll offset for desktop
  let scrollOffset = 0;
  window.addEventListener('scroll', () => {
    scrollOffset = window.pageYOffset * 0.1;
    document.documentElement.style.setProperty('--scroll-offset', `${scrollOffset}px`);
  });
}

function enhanceSignupFlows() {
  console.log('📝 Enhancing signup flows...');
  
  // Find all signup forms
  const signupForms = document.querySelectorAll('form, .signup-form, .contact-form');
  
  signupForms.forEach(form => {
    // Add loading states
    form.addEventListener('submit', function(e) {
      const submitBtn = form.querySelector('input[type="submit"], button[type="submit"], .submit-btn');
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Re-enable after 3 seconds if no redirect
        setTimeout(() => {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }, 3000);
      }
    });
    
    // Add field validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearErrors);
    });
  });
  
  // Enhanced form validation
  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }
    
    // Required field validation
    if (field.required && !value) {
      showFieldError(field, 'This field is required');
      return false;
    }
    
    // Password strength validation
    if (field.type === 'password' && value) {
      if (value.length < 8) {
        showFieldError(field, 'Password must be at least 8 characters');
        return false;
      }
    }
    
    clearFieldError(field);
    return true;
  }
  
  function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      errorElement.style.cssText = `
        color: #DC2626;
        font-size: 0.875rem;
        margin-top: 4px;
        display: block;
      `;
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    
    // Add error styling to field
    field.style.borderColor = '#DC2626';
    field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
  }
  
  function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '#E2E8F0';
    field.style.boxShadow = 'none';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  function clearErrors(e) {
    if (e.target.classList.contains('error')) {
      clearFieldError(e.target);
    }
  }
  
  // Add CSS for form improvements
  const formCSS = `
    .error {
      border-color: #DC2626 !important;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }
    
    .field-success {
      border-color: #059669 !important;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
    }
    
    .submit-btn.loading {
      opacity: 0.7;
      pointer-events: none;
      position: relative;
    }
    
    .submit-btn.loading::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  `;
  
  const formStyle = document.createElement('style');
  formStyle.textContent = formCSS;
  document.head.appendChild(formStyle);
}

function optimizeDashboardUI() {
  console.log('📊 Optimizing dashboard UI...');
  
  // Check if we're on a dashboard page
  if (window.location.pathname.includes('dashboard') || document.querySelector('.dashboard')) {
    
    // Dashboard-specific enhancements
    const dashboardCSS = `
      /* Dashboard layout improvements */
      .dashboard {
        display: grid;
        grid-template-columns: 250px 1fr;
        min-height: 100vh;
        gap: 0;
      }
      
      .dashboard-sidebar {
        background: #F8FAFC;
        border-right: 1px solid #E2E8F0;
        padding: 24px;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
      }
      
      .dashboard-main {
        padding: 32px;
        background: #ffffff;
        min-height: 100vh;
      }
      
      /* Dashboard cards */
      .dashboard-card {
        background: #ffffff;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
      }
      
      .dashboard-card h3 {
        margin: 0 0 16px 0;
        color: #1F2937;
        font-size: 1.25rem;
        font-weight: 600;
      }
      
      /* Stats cards */
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
      }
      
      .stat-card {
        background: linear-gradient(135deg, #0058A4, #0077CC);
        color: white;
        padding: 24px;
        border-radius: 12px;
        text-align: center;
      }
      
      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        display: block;
        margin-bottom: 8px;
      }
      
      .stat-label {
        font-size: 0.875rem;
        opacity: 0.9;
      }
      
      /* Dashboard navigation */
      .dashboard-nav {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .dashboard-nav li {
        margin-bottom: 8px;
      }
      
      .dashboard-nav a {
        display: block;
        padding: 12px 16px;
        color: #6B7280;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.2s ease;
      }
      
      .dashboard-nav a:hover,
      .dashboard-nav a.active {
        background: #0058A4;
        color: white;
      }
      
      /* Mobile dashboard */
      @media (max-width: 768px) {
        .dashboard {
          grid-template-columns: 1fr;
        }
        
        .dashboard-sidebar {
          position: static;
          height: auto;
          border-right: none;
          border-bottom: 1px solid #E2E8F0;
        }
        
        .dashboard-main {
          padding: 16px;
        }
        
        .stats-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
    
    const dashboardStyle = document.createElement('style');
    dashboardStyle.textContent = dashboardCSS;
    document.head.appendChild(dashboardStyle);
    
    // Add interactive features to dashboard
    addDashboardInteractivity();
  }
}

function addDashboardInteractivity() {
  // Add loading states for dashboard actions
  const dashboardButtons = document.querySelectorAll('.dashboard .btn, .dashboard button');
  
  dashboardButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.classList.contains('loading')) {
        this.classList.add('loading');
        setTimeout(() => {
          this.classList.remove('loading');
        }, 2000);
      }
    });
  });
  
  // Auto-refresh dashboard data (if applicable)
  if (typeof window.refreshDashboard === 'function') {
    setInterval(window.refreshDashboard, 30000); // Refresh every 30 seconds
  }
  
  // Add keyboard shortcuts for dashboard
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'h':
          e.preventDefault();
          window.location.href = '/dashboard.html';
          break;
        case 'p':
          e.preventDefault();
          window.location.href = '/pricing.html';
          break;
        case 'm':
          e.preventDefault();
          window.location.href = '/members.html';
          break;
      }
    }
  });
}

function ensureCrossPlatformCompatibility() {
  console.log('🌐 Ensuring cross-platform compatibility...');
  
  // Fix Safari-specific issues
  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    const safariCSS = `
      /* Safari-specific fixes */
      .hero, .home-hero {
        transform: translateZ(0);
      }
      
      input, textarea {
        border-radius: 6px;
        -webkit-appearance: none;
      }
      
      button, .btn {
        -webkit-appearance: none;
        border-radius: 8px;
      }
    `;
    
    const safariStyle = document.createElement('style');
    safariStyle.textContent = safariCSS;
    document.head.appendChild(safariStyle);
  }
  
  // Fix Firefox-specific issues
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    const firefoxCSS = `
      /* Firefox-specific fixes */
      .hero::before {
        will-change: auto;
      }
      
      input[type="number"] {
        -moz-appearance: textfield;
      }
      
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `;
    
    const firefoxStyle = document.createElement('style');
    firefoxStyle.textContent = firefoxCSS;
    document.head.appendChild(firefoxStyle);
  }
  
  // Add general browser compatibility fixes
  const compatCSS = `
    /* Cross-browser fixes */
    * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    
    /* Fix flexbox issues */
    .flex {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }
    
    /* Fix grid issues */
    .grid {
      display: -ms-grid;
      display: grid;
    }
    
    /* Ensure consistent button styling */
    button, .btn {
      background: none;
      border: none;
      font-family: inherit;
    }
    
    /* Fix input placeholder styling */
    ::placeholder {
      color: #9CA3AF;
      opacity: 1;
    }
    
    :-ms-input-placeholder {
      color: #9CA3AF;
    }
    
    ::-ms-input-placeholder {
      color: #9CA3AF;
    }
  `;
  
  const compatStyle = document.createElement('style');
  compatStyle.textContent = compatCSS;
  document.head.appendChild(compatStyle);
}

function addPerformanceOptimizations() {
  console.log('⚡ Adding performance optimizations...');
  
  // Lazy load images
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    img.loading = 'lazy';
  });
  
  // Preload critical resources
  const criticalResources = [
    '/components/shared.css',
    '/favicon.svg'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'font';
    document.head.appendChild(link);
  });
  
  // Optimize font loading
  const fontCSS = `
    @font-face {
      font-family: 'Inter';
      font-display: swap;
    }
    
    @font-face {
      font-family: 'Space Grotesk';
      font-display: swap;
    }
  `;
  
  const fontStyle = document.createElement('style');
  fontStyle.textContent = fontCSS;
  document.head.appendChild(fontStyle);
  
  // Add performance monitoring
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      if (loadTime > 3000) {
        console.warn(`⚠️ Page load time: ${loadTime}ms - Consider optimizing`);
      }
    });
  }
}

// Initialize error tracking
window.addEventListener('error', function(e) {
  console.error('🚨 JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('🚨 Unhandled Promise Rejection:', e.reason);
});

console.log('✅ CSGA Global Quality Assurance - Complete!');