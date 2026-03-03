// Constitutional AI MCP Enhancement Script
// Adds Constitutional AI positioning, hero CTAs, and market context to MCP pages

document.addEventListener('DOMContentLoaded', function() {
  
  // Configuration for different MCP pages
  const mcpConfigs = {
    'ai-governance': {
      title: "The World's First Constitutional AI Governance MCP",
      subtitle: "Enterprise Constitutional AI implementation with complete governance control - no vendor dependency",
      badges: ["🧠 Constitutional AI Enhanced", "🏛️ ISO 42001 Aligned", "⚡ Enterprise Ready"],
      primaryCTA: { text: "🚀 Start 14-Day Trial", href: "/pricing.html" },
      secondaryCTA: { text: "📞 Schedule Demo", href: "/contact.html" },
      tertiaryCTA: { text: "📋 Technical Specs", href: "#features" }
    },
    
    'cobol-bridge': {
      title: "Constitutional AI-Powered Legacy Integration",
      subtitle: "Bridge 40-year-old COBOL systems to modern Constitutional AI governance - the enterprise solution for mainframe compliance",
      badges: ["🧠 Constitutional AI Enhanced", "🏗️ Enterprise Integration", "🛡️ CASA Certified"],
      primaryCTA: { text: "💰 Start $4,999 Trial", href: "/pricing.html" },
      secondaryCTA: { text: "📊 COBOL Assessment", href: "/contact.html" },
      tertiaryCTA: { text: "📁 Integration Guide", href: "#installation" }
    },
    
    'dsrb-defence': {
      title: "Constitutional AI for Defense Applications",
      subtitle: "Ethical defense AI deployment with Constitutional AI guardrails - security effectiveness without compromise",
      badges: ["🧠 Constitutional AI Enhanced", "🛡️ Defense Grade", "🔒 CASA-ISS Certified"],
      primaryCTA: { text: "🔐 Request Access", href: "mailto:defence@csga-global.org" },
      secondaryCTA: { text: "📋 Defense Briefing", href: "/contact.html" },
      tertiaryCTA: { text: "🎯 Use Cases", href: "#use-cases" }
    },
    
    'cloud-security': {
      title: "Constitutional AI Cloud Security",
      subtitle: "AI-powered cloud security with Constitutional AI ethical framework integration",
      badges: ["🧠 Constitutional AI Enhanced", "☁️ Multi-Cloud", "🔒 Zero Trust"],
      primaryCTA: { text: "🚀 Start Free Trial", href: "/pricing.html" },
      secondaryCTA: { text: "🔍 Security Audit", href: "/contact.html" },
      tertiaryCTA: { text: "📊 Benchmarks", href: "#performance" }
    }
  };

  // Detect current MCP page
  const currentPath = window.location.pathname;
  const mcpPage = currentPath.split('/').pop().replace('.html', '');
  const config = mcpConfigs[mcpPage];
  
  if (config) {
    addConstitutionalAIPositioning(config);
    addMarketContextSection();
    addCASACrossSelling();
    addMCPBundleSuggestions(mcpPage);
  }
  
  // Add Constitutional AI positioning to any MCP page
  addUniversalConstitutionalAIBadges();
});

function addConstitutionalAIPositioning(config) {
  // Find the main header section
  const mainHeader = document.querySelector('h1');
  if (!mainHeader) return;
  
  // Create Constitutional AI hero banner
  const banner = document.createElement('div');
  banner.className = 'constitutional-ai-banner';
  banner.style.cssText = `
    background: linear-gradient(135deg, rgba(204,0,0,0.08), rgba(0,88,164,0.08));
    border: 1px solid rgba(204,0,0,0.2);
    border-left: 4px solid #CC0000;
    padding: 24px;
    margin-bottom: 32px;
    border-radius: 8px;
    text-align: center;
  `;
  
  banner.innerHTML = `
    <div class="constitutional-badges" style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px; flex-wrap: wrap;">
      ${config.badges.map(badge => `
        <span class="constitutional-badge" style="
          background: linear-gradient(135deg, #CC0000, #E63946);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        ">${badge}</span>
      `).join('')}
    </div>
    <h2 style="
      color: #0A1628;
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 12px;
      line-height: 1.3;
    ">${config.title}</h2>
    <p style="
      color: #475569;
      font-size: 1.1rem;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto 24px;
    ">${config.subtitle}</p>
    <div class="mcp-hero-ctas" style="
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    ">
      <a href="${config.primaryCTA.href}" class="mcp-cta-primary" style="
        background: #CC0000;
        color: white;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.25s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      ">${config.primaryCTA.text}</a>
      <a href="${config.secondaryCTA.href}" class="mcp-cta-secondary" style="
        background: rgba(0,88,164,0.1);
        color: #0058A4;
        border: 2px solid rgba(0,88,164,0.2);
        padding: 12px 28px;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.25s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      ">${config.secondaryCTA.text}</a>
      <a href="${config.tertiaryCTA.href}" class="mcp-cta-tertiary" style="
        color: #64748B;
        text-decoration: underline;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
      ">${config.tertiaryCTA.text}</a>
    </div>
  `;
  
  // Insert before the main content
  const mainContent = document.querySelector('section, .container, main') || document.body;
  mainContent.insertBefore(banner, mainContent.firstChild);
  
  // Add hover effects
  addHoverEffects();
}

function addMarketContextSection() {
  // Create market context section
  const contextSection = document.createElement('div');
  contextSection.className = 'market-context-section';
  contextSection.style.cssText = `
    background: linear-gradient(135deg, #0A1628, #0D2847);
    color: white;
    padding: 48px 24px;
    margin: 40px 0;
    border-radius: 12px;
    text-align: center;
  `;
  
  contextSection.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto;">
      <h3 style="color: #CC0000; font-size: 1.5rem; margin-bottom: 16px;">
        🧠 Why Constitutional AI Integration Matters Now
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 32px;">
        <div style="background: rgba(255,255,255,0.08); padding: 20px; border-radius: 8px;">
          <h4 style="color: #93C5FD; margin-bottom: 8px;">February 2026 Crisis</h4>
          <p style="font-size: 0.9rem; opacity: 0.9;">Anthropic-Pentagon impasse highlights need for independent Constitutional AI implementation</p>
        </div>
        <div style="background: rgba(255,255,255,0.08); padding: 20px; border-radius: 8px;">
          <h4 style="color: #93C5FD; margin-bottom: 8px;">Enterprise Advantage</h4>
          <p style="font-size: 0.9rem; opacity: 0.9;">Get Constitutional AI benefits without vendor dependency or political constraints</p>
        </div>
        <div style="background: rgba(255,255,255,0.08); padding: 20px; border-radius: 8px;">
          <h4 style="color: #93C5FD; margin-bottom: 8px;">Compliance Ready</h4>
          <p style="font-size: 0.9rem; opacity: 0.9;">EU AI Act, NIST AI RMF aligned with Constitutional AI principles</p>
        </div>
      </div>
    </div>
  `;
  
  // Insert after the first main section
  const sections = document.querySelectorAll('section');
  if (sections.length > 1) {
    sections[1].insertAdjacentElement('afterend', contextSection);
  }
}

function addCASACrossSelling() {
  // Create CASA certification upsell
  const casaSection = document.createElement('div');
  casaSection.className = 'casa-upsell-section';
  casaSection.style.cssText = `
    background: linear-gradient(135deg, #93C5FD, #0058A4);
    color: white;
    padding: 32px;
    border-radius: 12px;
    margin: 40px 0;
    text-align: center;
  `;
  
  casaSection.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto;">
      <h3 style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px; font-size: 1.4rem;">
        🏆 CASA Certification Required
      </h3>
      <p style="font-size: 1.1rem; opacity: 0.95; margin-bottom: 24px;">
        All enterprise MCP deployments require CASA-CA30 certification. Get certified in Constitutional AI governance to unlock full platform capabilities.
      </p>
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="/certification.html" style="
          background: white;
          color: #0058A4;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
        ">🎯 Start CASA Certification</a>
        <a href="/education.html" style="
          background: rgba(255,255,255,0.15);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
        ">📚 Free Courses</a>
      </div>
    </div>
  `;
  
  // Insert before the last section
  const sections = document.querySelectorAll('section');
  if (sections.length > 0) {
    sections[sections.length - 1].insertAdjacentElement('beforebegin', casaSection);
  }
}

function addMCPBundleSuggestions(currentMcp) {
  const bundles = {
    'ai-governance': ['cobol-bridge', 'compliance-audit', 'threat-intelligence'],
    'cobol-bridge': ['ai-governance', 'data-classification', 'vulnerability-scanner'],
    'dsrb-defence': ['threat-intelligence', 'red-team-ops', 'secure-comms'],
    'cloud-security': ['aws-cloud', 'vulnerability-scanner', 'incident-response']
  };
  
  const suggestions = bundles[currentMcp];
  if (!suggestions) return;
  
  const bundleSection = document.createElement('div');
  bundleSection.className = 'mcp-bundle-section';
  bundleSection.style.cssText = `
    background: #F8FAFC;
    padding: 40px 24px;
    border-radius: 12px;
    margin: 40px 0;
  `;
  
  bundleSection.innerHTML = `
    <div style="max-width: 1000px; margin: 0 auto; text-align: center;">
      <h3 style="color: #0A1628; margin-bottom: 8px;">🔗 Recommended MCP Combinations</h3>
      <p style="color: #64748B; margin-bottom: 32px;">Maximize value with these popular MCP bundles</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        ${suggestions.map((mcp, index) => `
          <div style="
            background: white;
            border: 2px solid #E2E8F0;
            border-radius: 8px;
            padding: 20px;
            position: relative;
            transition: all 0.25s ease;
          " class="bundle-card">
            ${index === 0 ? '<span style="position: absolute; top: -8px; right: 16px; background: #CC0000; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.7rem; font-weight: 600;">POPULAR</span>' : ''}
            <h4 style="color: #0A1628; margin-bottom: 8px; text-transform: capitalize;">${mcp.replace('-', ' ')}</h4>
            <p style="color: #64748B; font-size: 0.9rem; margin-bottom: 16px;">Complete integration solution</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="color: #CC0000; font-weight: 600;">Bundle: Save 25%</span>
              <a href="/mcp/${mcp}.html" style="color: #0058A4; text-decoration: none; font-weight: 500;">View Details →</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  // Insert near the end
  const lastSection = document.querySelector('section:last-of-type');
  if (lastSection) {
    lastSection.insertAdjacentElement('afterend', bundleSection);
  }
}

function addUniversalConstitutionalAIBadges() {
  // Add Constitutional AI badge to any pricing or feature sections
  const pricingSections = document.querySelectorAll('[class*="pricing"], [class*="tier"], [class*="feature"]');
  
  pricingSections.forEach(section => {
    if (!section.querySelector('.constitutional-ai-universal-badge')) {
      const badge = document.createElement('div');
      badge.className = 'constitutional-ai-universal-badge';
      badge.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, rgba(204,0,0,0.1), rgba(204,0,0,0.05));
        border: 1px solid rgba(204,0,0,0.2);
        color: #CC0000;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 0.75rem;
        font-weight: 600;
        margin: 8px 0;
      `;
      badge.innerHTML = '🧠 Constitutional AI Enhanced';
      
      const title = section.querySelector('h1, h2, h3, h4');
      if (title) {
        title.insertAdjacentElement('afterend', badge);
      }
    }
  });
}

function addHoverEffects() {
  // Add hover effects to CTA buttons
  document.querySelectorAll('.mcp-cta-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.background = '#AA0000';
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 8px 25px rgba(204, 0, 0, 0.3)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.background = '#CC0000';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
  
  document.querySelectorAll('.mcp-cta-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(0,88,164,0.15)';
      this.style.borderColor = 'rgba(0,88,164,0.4)';
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.background = 'rgba(0,88,164,0.1)';
      this.style.borderColor = 'rgba(0,88,164,0.2)';
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Bundle card hover effects
  document.querySelectorAll('.bundle-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.borderColor = '#0058A4';
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 8px 25px rgba(0, 88, 164, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.borderColor = '#E2E8F0';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
}

// Responsive design adjustments
const mediaQuery = window.matchMedia('(max-width: 768px)');
function handleMobile(e) {
  const ctaSections = document.querySelectorAll('.mcp-hero-ctas');
  ctaSections.forEach(section => {
    if (e.matches) {
      section.style.flexDirection = 'column';
      section.style.alignItems = 'center';
      const buttons = section.querySelectorAll('a');
      buttons.forEach(btn => {
        btn.style.width = '100%';
        btn.style.maxWidth = '280px';
        btn.style.justifyContent = 'center';
      });
    } else {
      section.style.flexDirection = 'row';
      section.style.alignItems = 'flex-start';
      const buttons = section.querySelectorAll('a');
      buttons.forEach(btn => {
        btn.style.width = 'auto';
        btn.style.maxWidth = 'none';
        btn.style.justifyContent = 'flex-start';
      });
    }
  });
}

mediaQuery.addListener(handleMobile);
handleMobile(mediaQuery);