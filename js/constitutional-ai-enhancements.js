// Constitutional AI Website Enhancement Script - March 3, 2026
// Updates all CSGA website pages with Constitutional AI positioning

document.addEventListener('DOMContentLoaded', function() {
  addConstitutionalAIGlobalPositioning();
  updateCASAPricing();
  addConstitutionalAIBadges();
  updateHeroMessaging();
  addAnthropicIndependenceMessaging();
});

function addConstitutionalAIGlobalPositioning() {
  // Add Constitutional AI header banner to all pages
  const banner = document.createElement('div');
  banner.id = 'constitutional-ai-banner';
  banner.style.cssText = `
    background: linear-gradient(135deg, #CC0000, #DC2626);
    color: white;
    padding: 12px 24px;
    text-align: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    font-weight: 600;
    font-size: 0.9rem;
    box-shadow: 0 2px 10px rgba(204,0,0,0.3);
  `;
  
  banner.innerHTML = `
    🧠 Constitutional AI-Enhanced CASA Launch: Independent Constitutional AI implementation without vendor dependency 
    <a href="/casa-constitutional-ai" style="color: #FEF3C7; text-decoration: underline; margin-left: 16px;">
      Learn More →
    </a>
  `;
  
  document.body.insertBefore(banner, document.body.firstChild);
}

function updateCASAPricing() {
  // Update CASA certification pricing for Constitutional AI enhancements
  const casaPricing = {
    'ca30': { 
      price: 18000, 
      oldPrice: 15000,
      name: 'CASA-CA30 Constitutional AI Enhanced',
      description: 'Full audit + Constitutional AI implementation assessment, 12-hr consultation covering constitutional training methods'
    },
    'ca40': { 
      price: 35000, 
      oldPrice: 25000,
      name: 'CASA-CA40 Constitutional AI Mastery',
      description: 'On-site Constitutional AI implementation assessment, ongoing constitutional alignment monitoring'
    }
  };
  
  // Update pricing displays
  Object.keys(casaPricing).forEach(level => {
    const priceElements = document.querySelectorAll(`[data-casa-level="${level}"] .price, .casa-${level}-price`);
    priceElements.forEach(el => {
      const config = casaPricing[level];
      el.innerHTML = `
        <span style="text-decoration: line-through; color: #64748B; font-size: 0.8em;">$${config.oldPrice.toLocaleString()}</span>
        <span style="color: #CC0000; font-weight: 700; margin-left: 8px;">$${config.price.toLocaleString()}</span>
        <span style="background: #CC0000; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.7em; margin-left: 8px;">
          Constitutional AI Enhanced
        </span>
      `;
    });
    
    // Update descriptions
    const descElements = document.querySelectorAll(`[data-casa-level="${level}"] .description, .casa-${level}-desc`);
    descElements.forEach(el => {
      el.textContent = casaPricing[level].description;
    });
  });
}

function addConstitutionalAIBadges() {
  // Add Constitutional AI badges to all governance MCPs
  const governanceMcps = [
    'ai-governance', 'casa-certification', 'csga-standards', 'proofof-ai',
    'compliance-audit', 'data-classification', 'policy-engine', 'dsrb-defence',
    'terranova-defence', 'quantranet-pqc', 'thn-global'
  ];
  
  governanceMcps.forEach(mcpSlug => {
    const mcpElements = document.querySelectorAll(`[data-mcp="${mcpSlug}"], .mcp-${mcpSlug}`);
    mcpElements.forEach(el => {
      if (!el.querySelector('.constitutional-ai-badge')) {
        const badge = document.createElement('div');
        badge.className = 'constitutional-ai-badge';
        badge.style.cssText = `
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(204,0,0,0.1), rgba(204,0,0,0.05));
          border: 1px solid rgba(204,0,0,0.3);
          color: #CC0000;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 600;
          margin: 4px 0;
          cursor: help;
        `;
        badge.innerHTML = '🧠 Constitutional AI Enhanced';
        badge.title = 'Includes constitutional training methodologies and value alignment protocols';
        
        const title = el.querySelector('h1, h2, h3, h4, .title');
        if (title) {
          title.insertAdjacentElement('afterend', badge);
        } else {
          el.insertBefore(badge, el.firstChild);
        }
      }
    });
  });
}

function updateHeroMessaging() {
  // Update homepage hero messaging
  const heroTitle = document.querySelector('.hero-title, h1');
  if (heroTitle && heroTitle.textContent.includes('AI governance')) {
    heroTitle.innerHTML = `
      The World's First <span style="color: #CC0000;">Constitutional AI</span> Governance Platform
    `;
  }
  
  const heroSubtitle = document.querySelector('.hero-subtitle, .hero-description');
  if (heroSubtitle) {
    heroSubtitle.innerHTML = `
      Get Constitutional AI benefits without vendor dependency. Enterprise-grade constitutional training 
      methods and value alignment protocols - no Anthropic constraints.
    `;
  }
  
  // Update CTAs
  const heroCTAs = document.querySelectorAll('.hero-cta, .main-cta');
  heroCTAs.forEach(cta => {
    if (cta.textContent.includes('Get Started') || cta.textContent.includes('Learn More')) {
      cta.innerHTML = '🧠 Start Constitutional AI Certification';
      cta.href = '/casa-constitutional-ai';
    }
  });
}

function addAnthropicIndependenceMessaging() {
  // Add Anthropic independence messaging
  const independenceSection = document.createElement('div');
  independenceSection.className = 'anthropic-independence-section';
  independenceSection.style.cssText = `
    background: linear-gradient(135deg, #0A1628, #1E293B);
    color: white;
    padding: 40px 24px;
    margin: 40px 0;
    border-radius: 12px;
    text-align: center;
  `;
  
  independenceSection.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto;">
      <h3 style="color: #CC0000; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; gap: 12px;">
        🎯 Independent Constitutional AI Implementation
      </h3>
      <p style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 24px;">
        While Anthropic faces government relations challenges in February 2026, CSGA provides 
        vendor-independent Constitutional AI implementation with full transparency and control.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 24px;">
        <div style="background: rgba(255,255,255,0.08); padding: 16px; border-radius: 8px;">
          <h4 style="color: #93C5FD; margin-bottom: 8px;">No Vendor Lock-in</h4>
          <p style="font-size: 0.9rem; opacity: 0.8;">Full constitutional training methodology transparency</p>
        </div>
        <div style="background: rgba(255,255,255,0.08); padding: 16px; border-radius: 8px;">
          <h4 style="color: #93C5FD; margin-bottom: 8px;">Political Independence</h4>
          <p style="font-size: 0.9rem; opacity: 0.8;">No constraints on Constitutional AI deployment</p>
        </div>
        <div style="background: rgba(255,255,255,0.08); padding: 16px; border-radius: 8px;">
          <h4 style="color: #93C5FD; margin-bottom: 8px;">Enterprise Control</h4>
          <p style="font-size: 0.9rem; opacity: 0.8;">Custom constitutional training for industry needs</p>
        </div>
      </div>
      <div style="margin-top: 24px;">
        <a href="/constitutional-ai-independence" style="
          background: #CC0000;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        ">🧠 Learn Constitutional AI Independence</a>
      </div>
    </div>
  `;
  
  // Insert after the first main section
  const mainContent = document.querySelector('main, .main-content');
  if (mainContent && mainContent.children.length > 1) {
    mainContent.insertBefore(independenceSection, mainContent.children[1]);
  }
}

// Update navigation menu
function updateNavigationMenu() {
  const navItems = document.querySelectorAll('nav a, .nav-link');
  navItems.forEach(link => {
    if (link.textContent.includes('CASA') || link.href.includes('casa')) {
      link.innerHTML = '🧠 Constitutional AI CASA';
    }
    if (link.textContent.includes('Certification') && !link.textContent.includes('Constitutional')) {
      link.innerHTML = '🏆 Constitutional AI Certification';
    }
  });
  
  // Add new Constitutional AI navigation item
  const nav = document.querySelector('nav ul, .nav-menu');
  if (nav && !nav.querySelector('[href*="constitutional-ai"]')) {
    const newNavItem = document.createElement('li');
    newNavItem.innerHTML = `
      <a href="/constitutional-ai-independence" style="
        color: #CC0000;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 6px;
        background: rgba(204,0,0,0.05);
        text-decoration: none;
      ">
        🧠 Constitutional AI
        <span style="
          background: #CC0000;
          color: white;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 0.7rem;
          margin-left: 4px;
        ">NEW</span>
      </a>
    `;
    nav.appendChild(newNavItem);
  }
}

// Add Constitutional AI FAQ section to relevant pages
function addConstitutionalAIFAQ() {
  const faqSection = document.createElement('div');
  faqSection.className = 'constitutional-ai-faq';
  faqSection.style.cssText = `
    background: #F8FAFC;
    padding: 40px 24px;
    margin: 40px 0;
    border-radius: 12px;
  `;
  
  faqSection.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto;">
      <h3 style="text-align: center; color: #0A1628; margin-bottom: 32px;">
        🧠 Constitutional AI Integration FAQ
      </h3>
      <div class="faq-grid" style="display: grid; gap: 20px;">
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #CC0000;">
          <h4 style="color: #CC0000; margin-bottom: 8px;">What is Constitutional AI?</h4>
          <p style="color: #475569;">Constitutional AI is a training methodology that teaches AI systems to be harmless, helpful, and honest through constitutional principles and value alignment protocols.</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #0058A4;">
          <h4 style="color: #0058A4; margin-bottom: 8px;">How is CSGA's implementation different from Anthropic's?</h4>
          <p style="color: #475569;">CSGA provides vendor-independent Constitutional AI implementation with full methodology transparency, custom training capabilities, and no political constraints on deployment.</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #059669;">
          <h4 style="color: #059669; margin-bottom: 8px;">Why is Constitutional AI integration critical now?</h4>
          <p style="color: #475569;">The February 2026 Anthropic-Pentagon impasse highlights the need for independent Constitutional AI capabilities, especially in regulated and sovereign environments.</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #7C3AED;">
          <h4 style="color: #7C3AED; margin-bottom: 8px;">What does Constitutional AI-enhanced CASA certification include?</h4>
          <p style="color: #475569;">Enhanced CASA certification includes constitutional training methodology assessment, value alignment verification, and practical Constitutional AI implementation guidance.</p>
        </div>
      </div>
    </div>
  `;
  
  // Insert before the footer
  const footer = document.querySelector('footer');
  if (footer) {
    footer.insertAdjacentElement('beforebegin', faqSection);
  }
}

// Initialize all updates
updateNavigationMenu();
addConstitutionalAIFAQ();

// Add custom CSS for Constitutional AI enhancements
const constitutionalAIStyles = document.createElement('style');
constitutionalAIStyles.innerHTML = `
  .constitutional-ai-badge:hover {
    background: linear-gradient(135deg, rgba(204,0,0,0.15), rgba(204,0,0,0.1));
    transform: translateY(-1px);
    transition: all 0.25s ease;
  }
  
  @media (max-width: 768px) {
    #constitutional-ai-banner {
      font-size: 0.8rem;
      padding: 10px 16px;
    }
    
    .anthropic-independence-section {
      padding: 24px 16px;
    }
    
    .constitutional-ai-faq .faq-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .constitutional-ai-enhanced {
    position: relative;
    overflow: hidden;
  }
  
  .constitutional-ai-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #CC0000, #DC2626, #CC0000);
    animation: constitutional-glow 2s ease-in-out infinite alternate;
  }
  
  @keyframes constitutional-glow {
    0% { opacity: 0.6; }
    100% { opacity: 1; }
  }
`;

document.head.appendChild(constitutionalAIStyles);

console.log('🧠 Constitutional AI website enhancements loaded - March 3, 2026');