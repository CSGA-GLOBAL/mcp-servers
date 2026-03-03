// Kimi Agent Design Implementation - CSGA Global Enhancement
// Based on comprehensive brand identity guide and 37 visual assets

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎨 Implementing Kimi Agent Design Enhancements...');
  
  // Initialize all design improvements
  implementBrandIdentity();
  implementHeroEnhancements();
  implementSectionImages();
  implementVisualAssets();
  implementInteractiveElements();
  
  console.log('✨ Kimi Agent Design Implementation Complete');
});

function implementBrandIdentity() {
  console.log('🎨 Implementing CSGA Brand Identity...');
  
  // Update CSS Custom Properties with proper brand colors
  const root = document.documentElement;
  
  // Primary Brand Colors
  root.style.setProperty('--csga-navy', '#0A1628');
  root.style.setProperty('--cyber-blue', '#1E5AF5');
  root.style.setProperty('--security-teal', '#00D4AA');
  root.style.setProperty('--alliance-white', '#FFFFFF');
  
  // Secondary Colors
  root.style.setProperty('--warning-amber', '#F59E0B');
  root.style.setProperty('--alert-red', '#EF4444');
  root.style.setProperty('--neural-purple', '#8B5CF6');
  root.style.setProperty('--infrastructure-grey', '#64748B');
  
  // Dark Mode Surface Colors
  root.style.setProperty('--surface-1', '#0F1D32');
  root.style.setProperty('--surface-2', '#152238');
  root.style.setProperty('--surface-3', '#1B2A42');
  
  // Text Hierarchy
  root.style.setProperty('--text-primary', 'rgba(255, 255, 255, 1.0)');
  root.style.setProperty('--text-secondary', 'rgba(148, 163, 184, 1.0)');
  root.style.setProperty('--text-tertiary', 'rgba(100, 116, 139, 1.0)');
  root.style.setProperty('--text-disabled', 'rgba(71, 85, 105, 1.0)');
  
  // Brand Gradients
  root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, #1E5AF5 0%, #00D4AA 100%)');
  root.style.setProperty('--gradient-cyber-defence', 'linear-gradient(135deg, #0A1628 0%, #1E5AF5 50%, #0A1628 100%)');
  root.style.setProperty('--gradient-ai-governance', 'linear-gradient(135deg, #8B5CF6 0%, #1E5AF5 100%)');
  root.style.setProperty('--gradient-success', 'linear-gradient(135deg, #00D4AA 0%, #10B981 100%)');
  root.style.setProperty('--gradient-subtle', 'linear-gradient(180deg, #0A1628 0%, #0F1D32 100%)');
  
  addBrandIdentityCSS();
}

function addBrandIdentityCSS() {
  const brandCSS = document.createElement('style');
  brandCSS.innerHTML = `
    /* CSGA Brand Identity Implementation */
    
    /* Typography System - Inter Font Family */
    body {
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--csga-navy);
      color: var(--text-secondary);
      line-height: 1.6;
    }
    
    /* Display/Hero Typography */
    .display-text {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--alliance-white);
      background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Heading Hierarchy */
    h1, .h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: var(--alliance-white);
      margin-bottom: 1.5rem;
    }
    
    h2, .h2 {
      font-size: clamp(1.75rem, 4vw, 2.25rem);
      font-weight: 700;
      line-height: 1.25;
      letter-spacing: -0.01em;
      color: var(--alliance-white);
      margin-bottom: 1.25rem;
    }
    
    h3, .h3 {
      font-size: clamp(1.375rem, 3vw, 1.75rem);
      font-weight: 600;
      line-height: 1.3;
      color: var(--alliance-white);
      margin-bottom: 1rem;
    }
    
    h4, .h4 {
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.4;
      color: var(--alliance-white);
      margin-bottom: 0.75rem;
    }
    
    h5, .h5 {
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.5;
      letter-spacing: 0.02em;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }
    
    h6, .h6, .eyebrow-text {
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--cyber-blue);
      margin-bottom: 0.5rem;
    }
    
    /* Body Typography */
    .body-large {
      font-size: 1.125rem;
      line-height: 1.6;
      color: var(--text-secondary);
    }
    
    .body-regular, p {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }
    
    .body-small {
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--text-tertiary);
    }
    
    .caption {
      font-size: 0.75rem;
      line-height: 1.4;
      color: var(--text-tertiary);
    }
    
    /* Technical Typography - JetBrains Mono */
    .mono, code, .stat-number, .data-point {
      font-family: 'JetBrains Mono', 'SF Mono', Monaco, Inconsolata, monospace;
      font-weight: 700;
      color: var(--alliance-white);
    }
    
    .stat-number {
      font-size: clamp(2rem, 5vw, 3rem);
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Component Styling - Brand Guidelines */
    
    /* Primary Button */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      background: var(--gradient-primary);
      color: var(--alliance-white);
      font-weight: 600;
      font-size: 1rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      position: relative;
      overflow: hidden;
    }
    
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(30, 90, 245, 0.4);
    }
    
    .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.6s ease;
    }
    
    .btn-primary:hover::before {
      left: 100%;
    }
    
    /* Secondary Button */
    .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      background: transparent;
      color: var(--alliance-white);
      font-weight: 600;
      font-size: 1rem;
      border-radius: 8px;
      border: 1px solid var(--surface-2);
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--surface-3);
    }
    
    /* Cards with Brand Styling */
    .card-enhanced {
      background: var(--surface-1);
      border: 1px solid var(--surface-2);
      border-radius: 12px;
      padding: 24px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .card-enhanced:hover {
      border-color: var(--cyber-blue);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(30, 90, 245, 0.15);
    }
    
    .card-enhanced::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(30, 90, 245, 0.05), transparent);
      transition: left 0.6s ease;
    }
    
    .card-enhanced:hover::before {
      left: 100%;
    }
    
    /* Badge Components */
    .badge-success {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: rgba(0, 212, 170, 0.1);
      color: var(--security-teal);
      border: 1px solid var(--security-teal);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .badge-info {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: rgba(30, 90, 245, 0.1);
      color: var(--cyber-blue);
      border: 1px solid var(--cyber-blue);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .badge-warning {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: rgba(245, 158, 11, 0.1);
      color: var(--warning-amber);
      border: 1px solid var(--warning-amber);
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    /* Input Styling */
    .input-enhanced {
      width: 100%;
      padding: 12px 16px;
      background: var(--surface-1);
      border: 1px solid var(--surface-2);
      border-radius: 8px;
      color: var(--alliance-white);
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.2s ease;
    }
    
    .input-enhanced:focus {
      outline: none;
      border-color: var(--cyber-blue);
      box-shadow: 0 0 0 3px rgba(30, 90, 245, 0.2);
    }
    
    .input-enhanced::placeholder {
      color: var(--text-tertiary);
    }
    
    /* Section Styling */
    .section-enhanced {
      padding: 80px 0;
      background: var(--gradient-subtle);
      position: relative;
    }
    
    .section-enhanced::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at 20% 50%, rgba(30, 90, 245, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 212, 170, 0.1) 0%, transparent 50%);
      pointer-events: none;
    }
    
    /* Animation Classes */
    .animate-glow {
      animation: pulseGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes pulseGlow {
      from { box-shadow: 0 0 20px rgba(30, 90, 245, 0.3); }
      to { box-shadow: 0 0 30px rgba(30, 90, 245, 0.6); }
    }
    
    .animate-gradient {
      background-size: 400% 400%;
      animation: gradientAnimation 15s ease infinite;
    }
    
    @keyframes gradientAnimation {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .section-enhanced {
        padding: 60px 0;
      }
      
      .card-enhanced {
        padding: 20px;
      }
      
      .btn-primary, .btn-secondary {
        font-size: 0.9rem;
        padding: 14px 20px;
        width: 100%;
        justify-content: center;
      }
    }
  `;
  
  document.head.appendChild(brandCSS);
}

function implementHeroEnhancements() {
  console.log('🎯 Implementing Hero Section Enhancements...');
  
  // Find hero section
  const heroSection = document.querySelector('.hero, .hero-enhanced, section.hero');
  if (!heroSection) return;
  
  // Apply enhanced hero styling with high-quality background
  heroSection.style.cssText = `
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      rgba(10, 22, 40, 0.95) 0%,
      rgba(30, 41, 59, 0.95) 50%,
      rgba(10, 22, 40, 0.95) 100%
    ),
    url('./hero_images/main_hero_4k.jpg') center/cover no-repeat;
    background-attachment: fixed;
    overflow: hidden;
    padding: 0;
  `;
  
  // Add cinematic overlay
  const cinematicOverlay = document.createElement('div');
  cinematicOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 50% 50%, transparent 30%, rgba(10, 22, 40, 0.4) 80%),
      linear-gradient(135deg, rgba(30, 90, 245, 0.1) 0%, transparent 50%, rgba(0, 212, 170, 0.1) 100%);
    pointer-events: none;
    z-index: 1;
  `;
  heroSection.insertBefore(cinematicOverlay, heroSection.firstChild);
  
  // Enhanced hero content styling
  const heroContent = heroSection.querySelector('.hero-content, .hero-content-enhanced');
  if (heroContent) {
    heroContent.style.cssText = `
      position: relative;
      z-index: 10;
      text-align: center;
      color: white;
      max-width: 1000px;
      padding: 0 20px;
      margin: 0 auto;
    `;
    
    // Style hero title
    const heroTitle = heroContent.querySelector('h1');
    if (heroTitle) {
      heroTitle.classList.add('display-text');
      heroTitle.style.cssText = `
        font-size: clamp(2.5rem, 6vw, 4.5rem);
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 25px;
        background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 50%, #e2e8f0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      `;
    }
    
    // Style hero description
    const heroDesc = heroContent.querySelector('p');
    if (heroDesc) {
      heroDesc.classList.add('body-large');
      heroDesc.style.cssText = `
        font-size: clamp(1.1rem, 2.5vw, 1.4rem);
        color: rgba(203, 213, 225, 1);
        margin-bottom: 40px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
        text-shadow: 0 1px 2px rgba(0,0,0,0.2);
      `;
    }
    
    // Enhance CTA buttons
    const ctaButtons = heroContent.querySelectorAll('a, button');
    ctaButtons.forEach((btn, index) => {
      if (index === 0) {
        btn.classList.add('btn-primary');
      } else {
        btn.classList.add('btn-secondary');
      }
    });
  }
  
  // Add dynamic background effects
  createHeroParticles(heroSection);
}

function createHeroParticles(heroContainer) {
  const particlesContainer = document.createElement('div');
  particlesContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 2;
    pointer-events: none;
  `;
  
  // Create floating particles
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 3}px;
      height: ${Math.random() * 6 + 3}px;
      background: rgba(30, 90, 245, 0.6);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      animation: floatParticle ${15 + Math.random() * 10}s linear infinite;
      animation-delay: ${Math.random() * 10}s;
      box-shadow: 0 0 10px rgba(30, 90, 245, 0.8);
    `;
    particlesContainer.appendChild(particle);
  }
  
  // Add particle animation CSS
  const particleCSS = document.createElement('style');
  particleCSS.innerHTML = `
    @keyframes floatParticle {
      0% {
        bottom: -10px;
        opacity: 0;
        transform: translateX(0) rotate(0deg);
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 0.8;
      }
      100% {
        bottom: 100vh;
        opacity: 0;
        transform: translateX(${Math.random() * 40 - 20}px) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(particleCSS);
  
  heroContainer.appendChild(particlesContainer);
}

function implementSectionImages() {
  console.log('🏭 Implementing Section-Specific Images...');
  
  // Map sections to their corresponding images
  const sectionImageMap = {
    // Industry sectors
    cybersecurity: './section_images/sector_cybersecurity_defence.png',
    defence: './section_images/sector_cybersecurity_defence.png',
    'ai-governance': './section_images/sector_ai_governance.png',
    governance: './section_images/sector_ai_governance.png',
    infrastructure: './section_images/sector_critical_infrastructure.png',
    healthcare: './section_images/sector_healthcare.png',
    financial: './section_images/sector_financial_services.png',
    enterprise: './section_images/sector_enterprise_infrastructure.png',
    
    // Features
    mcp: './section_images/feature_model_context_protocols.png',
    standards: './section_images/feature_csoai_standards.png',
    security: './section_images/feature_defence_security.png',
    
    // Solutions
    cobol: './section_images/solution_legacy_modernization.png',
    training: './section_images/solution_cybersecurity_training.png',
    
    // Trust indicators
    credentials: './section_images/credentials_trust.png',
    trust: './section_images/credentials_trust.png'
  };
  
  // Apply images to relevant sections
  Object.entries(sectionImageMap).forEach(([keyword, imagePath]) => {
    // Find sections by class, id, or data attributes
    const sections = document.querySelectorAll(`
      .${keyword},
      #${keyword},
      [data-section="${keyword}"],
      [class*="${keyword}"],
      [id*="${keyword}"]
    `);
    
    sections.forEach(section => {
      enhanceSectionWithImage(section, imagePath, keyword);
    });
  });
  
  // Auto-detect and enhance cards
  enhanceIndustryCards();
  enhanceFeatureCards();
}

function enhanceSectionWithImage(section, imagePath, keyword) {
  // Create image overlay
  const imageOverlay = document.createElement('div');
  imageOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%),
      url('${imagePath}') center/cover no-repeat;
    opacity: 0.3;
    z-index: -1;
    transition: opacity 0.3s ease;
    border-radius: inherit;
  `;
  
  // Make section relative if it isn't
  const computedStyle = window.getComputedStyle(section);
  if (computedStyle.position === 'static') {
    section.style.position = 'relative';
  }
  
  // Add image overlay
  section.appendChild(imageOverlay);
  
  // Add hover effect
  section.addEventListener('mouseenter', () => {
    imageOverlay.style.opacity = '0.5';
  });
  
  section.addEventListener('mouseleave', () => {
    imageOverlay.style.opacity = '0.3';
  });
  
  // Add enhanced styling
  section.classList.add('section-enhanced');
}

function enhanceIndustryCards() {
  const industryCards = document.querySelectorAll('.industry-card, .sector-card, [class*="sector"]');
  
  industryCards.forEach(card => {
    const cardText = card.textContent.toLowerCase();
    
    // Determine appropriate image based on content
    let imagePath = '';
    if (cardText.includes('cyber') || cardText.includes('security') || cardText.includes('defence')) {
      imagePath = './section_images/sector_cybersecurity_defence.png';
    } else if (cardText.includes('ai') || cardText.includes('governance')) {
      imagePath = './section_images/sector_ai_governance.png';
    } else if (cardText.includes('infrastructure') || cardText.includes('critical')) {
      imagePath = './section_images/sector_critical_infrastructure.png';
    } else if (cardText.includes('health') || cardText.includes('medical')) {
      imagePath = './section_images/sector_healthcare.png';
    } else if (cardText.includes('financial') || cardText.includes('bank')) {
      imagePath = './section_images/sector_financial_services.png';
    } else if (cardText.includes('enterprise') || cardText.includes('business')) {
      imagePath = './section_images/sector_enterprise_infrastructure.png';
    }
    
    if (imagePath) {
      // Apply enhanced card styling with background image
      card.style.cssText = `
        ${card.style.cssText}
        position: relative;
        background: 
          linear-gradient(135deg, rgba(15, 29, 50, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%),
          url('${imagePath}') center/cover no-repeat;
        border: 1px solid rgba(30, 90, 245, 0.2);
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
      `;
      
      // Add hover effect
      card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'rgba(30, 90, 245, 0.6)';
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 25px rgba(30, 90, 245, 0.2)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'rgba(30, 90, 245, 0.2)';
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
      });
    }
  });
}

function enhanceFeatureCards() {
  const featureCards = document.querySelectorAll('.feature-card, .service-card, [class*="feature"]');
  
  featureCards.forEach(card => {
    card.classList.add('card-enhanced');
    
    // Add icon enhancement
    const icon = card.querySelector('.icon, .feature-icon, i');
    if (icon) {
      icon.style.cssText = `
        ${icon.style.cssText}
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 2px 4px rgba(30, 90, 245, 0.3));
      `;
    }
  });
}

function implementVisualAssets() {
  console.log('🎨 Implementing Visual Assets...');
  
  // Add background patterns to sections
  addBackgroundPatterns();
  
  // Implement social media images
  updateSocialMediaImages();
  
  // Add visual dividers
  addSectionDividers();
  
  // Implement badge styling
  enhanceBadges();
}

function addBackgroundPatterns() {
  const sections = document.querySelectorAll('section, .section');
  
  sections.forEach((section, index) => {
    // Alternate between different background patterns
    const patterns = [
      'url("./visual_assets/tech_grid_pattern.jpg")',
      'url("./visual_assets/network_nodes_bg.jpg")',
      'url("./visual_assets/dot_matrix_pattern.jpg")',
      'url("./visual_assets/hexagon_pattern.jpg")'
    ];
    
    const pattern = patterns[index % patterns.length];
    
    // Add subtle background pattern
    const patternOverlay = document.createElement('div');
    patternOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${pattern};
      opacity: 0.03;
      z-index: -2;
      pointer-events: none;
      background-size: 100px 100px;
    `;
    
    if (window.getComputedStyle(section).position === 'static') {
      section.style.position = 'relative';
    }
    
    section.appendChild(patternOverlay);
  });
}

function updateSocialMediaImages() {
  // Update Open Graph images
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    ogImage.setAttribute('content', window.location.origin + '/visual_assets/og_image_main.jpg');
  }
  
  // Update Twitter card image
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) {
    twitterImage.setAttribute('content', window.location.origin + '/visual_assets/twitter_card.jpg');
  }
  
  // Add LinkedIn banner if needed
  if (!document.querySelector('meta[property="og:image:width"]')) {
    const ogWidth = document.createElement('meta');
    ogWidth.setAttribute('property', 'og:image:width');
    ogWidth.setAttribute('content', '1200');
    document.head.appendChild(ogWidth);
    
    const ogHeight = document.createElement('meta');
    ogHeight.setAttribute('property', 'og:image:height');
    ogHeight.setAttribute('content', '630');
    document.head.appendChild(ogHeight);
  }
}

function addSectionDividers() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    if (index === sections.length - 1) return; // Don't add after last section
    
    const divider = document.createElement('div');
    divider.style.cssText = `
      height: 200px;
      background: 
        linear-gradient(180deg, transparent 0%, rgba(30, 90, 245, 0.1) 50%, transparent 100%),
        url('./visual_assets/wave_divider.jpg') center/cover no-repeat;
      position: relative;
      overflow: hidden;
    `;
    
    section.insertAdjacentElement('afterend', divider);
  });
}

function enhanceBadges() {
  const badges = document.querySelectorAll('.badge, [class*="badge"]');
  
  badges.forEach(badge => {
    const badgeText = badge.textContent.toLowerCase();
    
    if (badgeText.includes('certified') || badgeText.includes('iso') || badgeText.includes('approved')) {
      badge.classList.add('badge-success');
    } else if (badgeText.includes('new') || badgeText.includes('beta') || badgeText.includes('coming')) {
      badge.classList.add('badge-info');
    } else if (badgeText.includes('warning') || badgeText.includes('alert') || badgeText.includes('beta')) {
      badge.classList.add('badge-warning');
    }
  });
}

function implementInteractiveElements() {
  console.log('⚡ Implementing Interactive Elements...');
  
  // Enhanced hover effects for cards
  const cards = document.querySelectorAll('.card, .card-enhanced');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // Enhanced button interactions
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      
      button.style.position = 'relative';
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple animation CSS
  const rippleCSS = document.createElement('style');
  rippleCSS.innerHTML = `
    @keyframes rippleEffect {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleCSS);
  
  // Parallax scrolling for hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero, .hero-enhanced');
    
    if (heroSection) {
      const speed = 0.5;
      heroSection.style.transform = `translateY(${scrolled * speed}px)`;
    }
  });
}

// Initialize image preloading for performance
function preloadCriticalImages() {
  const criticalImages = [
    './hero_images/main_hero_4k.jpg',
    './section_images/sector_cybersecurity_defence.png',
    './section_images/sector_ai_governance.png',
    './visual_assets/og_image_main.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Export for debugging
window.KimiDesign = {
  implementBrandIdentity,
  implementHeroEnhancements,
  implementSectionImages,
  implementVisualAssets,
  version: '1.0.0'
};

// Preload critical images
preloadCriticalImages();

console.log('🎨 Kimi Agent Design Implementation System Loaded');