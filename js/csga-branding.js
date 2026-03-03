// 🎯 CSGA Global Correct Branding & Logo Integration
// Professional cybersecurity design matching csga-global.org and BMCC styles

class CSGACorrectBranding {
  constructor() {
    this.brandColors = {
      primary: '#1a202c',        // Dark navy - cybersecurity professional
      secondary: '#2d3748',      // Medium slate 
      accent: '#3182ce',         // Professional blue - cybersecurity theme
      accentLight: '#4299e1',    // Light blue
      accentDark: '#2c5282',     // Dark blue
      background: '#ffffff',     // Pure white
      surface: '#f7fafc',        // Light gray
      text: '#1a202c',           // Dark text
      textSecondary: '#4a5568',  // Secondary text
      cyberBlue: '#1e3a8a',      // Deep cyber blue
      cyberTeal: '#0891b2',      // Cyber teal
      cyberGray: '#374151',      // Professional gray
      cyberDark: '#111827'       // Dark backgrounds
    };
    
    this.init();
  }

  init() {
    this.fixSiteWideConsistency();
    this.enhanceHeroSections();
    this.improveCOBOLSection();
    this.fixReadabilityIssues();
    this.addCSGALogo();
    this.enhanceNavigation();
    this.addCybersecurityElements();
  }

  // 🎨 Fix Site-Wide Consistency with Correct CSGA Colors
  fixSiteWideConsistency() {
    const consistentStyles = `
      <style id="csga-correct-branding">
        /* 🎯 CSGA Correct Brand Colors */
        :root {
          --csga-primary: #1a202c;
          --csga-secondary: #2d3748;
          --csga-accent: #3182ce;
          --csga-accent-light: #4299e1;
          --csga-accent-dark: #2c5282;
          --csga-background: #ffffff;
          --csga-surface: #f7fafc;
          --csga-text: #1a202c;
          --csga-text-secondary: #4a5568;
          --cyber-blue: #1e3a8a;
          --cyber-teal: #0891b2;
          --cyber-dark: #111827;
        }

        /* 🚫 Remove Problematic Blue Backgrounds */
        .bg-blue-600, .bg-blue-700, .bg-blue-800, .bg-blue-900,
        [class*="bg-blue"] {
          background: var(--csga-background) !important;
          color: var(--csga-text) !important;
          border: 1px solid #e2e8f0 !important;
        }

        /* ✅ Professional Dark Sections */
        .bg-slate-900, .bg-slate-800, .bg-gray-900, .bg-gray-800,
        [class*="bg-slate-9"], [class*="bg-gray-9"] {
          background: linear-gradient(135deg, var(--cyber-dark), var(--csga-primary)) !important;
          color: #ffffff !important;
        }

        /* 🔤 Professional Typography */
        h1, h2, h3, h4, h5, h6 {
          color: var(--csga-primary) !important;
          font-weight: 700 !important;
          line-height: 1.2 !important;
        }

        p {
          color: var(--csga-text-secondary) !important;
          line-height: 1.6;
        }

        a {
          color: var(--csga-accent) !important;
          font-weight: 500;
        }

        a:hover {
          color: var(--csga-accent-light) !important;
        }

        /* 🎯 Professional Buttons */
        .btn, button:not(.unstyled), [class*="btn-"] {
          padding: 0.75rem 1.5rem !important;
          border-radius: 0.5rem !important;
          font-weight: 600 !important;
          transition: all 0.2s ease !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.5rem !important;
        }

        .btn-primary, [class*="btn-primary"] {
          background: linear-gradient(135deg, var(--csga-accent), var(--csga-accent-light)) !important;
          color: #ffffff !important;
          border: none !important;
        }

        .btn-primary:hover, [class*="btn-primary"]:hover {
          background: linear-gradient(135deg, var(--csga-accent-dark), var(--csga-accent)) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3) !important;
        }

        /* 📦 Professional Cards */
        .card, [class*="card"], .feature, [class*="feature"],
        .service, [class*="service"] {
          background: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 1rem !important;
          padding: 2rem !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.3s ease !important;
        }

        .card:hover, [class*="card"]:hover,
        .feature:hover, [class*="feature"]:hover,
        .service:hover, [class*="service"]:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
          border-color: var(--csga-accent) !important;
        }

        /* 🏢 CSGA Logo Integration */
        .csga-logo-container {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 700;
          color: var(--csga-primary);
        }

        .csga-logo {
          height: 40px;
          width: auto;
          max-width: 200px;
        }

        .csga-brand-text {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--csga-primary);
          text-decoration: none;
        }

        /* 🔒 Cybersecurity Theme Elements */
        .cyber-badge {
          background: var(--cyber-teal);
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .cyber-alert {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          color: #dc2626;
          padding: 1rem;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .cyber-section {
          background: linear-gradient(135deg, #f1f5f9, #ffffff);
          border-left: 4px solid var(--csga-accent);
          padding: 2rem;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }

        /* 📊 Professional Statistics */
        .stat-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .stat-card {
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: var(--csga-accent);
          display: block;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--csga-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        /* 📱 Mobile Optimizations */
        @media (max-width: 768px) {
          .stat-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .csga-logo {
            height: 32px;
          }
          
          .card, [class*="card"], .feature, [class*="feature"],
          .service, [class*="service"] {
            padding: 1.5rem !important;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', consistentStyles);
  }

  // 🦸 Enhance Hero Sections with CSGA Branding
  enhanceHeroSections() {
    const heroSection = document.querySelector('.hero, [class*="hero"], .banner, [class*="banner"]') || 
                       document.querySelector('section:first-of-type');
    
    if (!heroSection) return;

    // Enhanced hero with CSGA cybersecurity theme
    const enhancedHero = `
      <style>
        .csga-hero {
          position: relative;
          background: linear-gradient(135deg, #111827 0%, #1a202c 50%, #1e3a8a 100%);
          color: #ffffff;
          padding: 5rem 0;
          overflow: hidden;
          min-height: 70vh;
          display: flex;
          align-items: center;
        }

        .csga-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%233182ce" fill-opacity="0.08"><rect x="0" y="0" width="2" height="2"/><rect x="58" y="58" width="2" height="2"/></g></svg>') repeat;
          opacity: 0.3;
        }

        .csga-hero-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }

        .csga-hero h1 {
          font-size: 3.5rem;
          font-weight: 800;
          color: #ffffff !important;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff, #4299e1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .csga-hero p {
          font-size: 1.25rem;
          color: #cbd5e1 !important;
          max-width: 600px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.6;
        }

        .csga-hero-logo {
          margin-bottom: 2rem;
        }

        .csga-hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .csga-hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
          padding: 2rem 0;
          border-top: 1px solid rgba(49, 130, 206, 0.2);
        }

        .csga-hero-stat {
          text-align: center;
        }

        .csga-hero-stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #3182ce;
          display: block;
        }

        .csga-hero-stat-label {
          font-size: 0.875rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .csga-hero {
            padding: 3rem 0;
            min-height: 60vh;
          }

          .csga-hero h1 {
            font-size: 2.5rem;
          }

          .csga-hero p {
            font-size: 1.125rem;
          }

          .csga-hero-actions {
            flex-direction: column;
          }

          .csga-hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      </style>

      <section class="csga-hero">
        <div class="csga-hero-content">
          <div class="csga-hero-logo">
            <div class="csga-logo-container">
              <h1>Cyber Security Global Alliance</h1>
            </div>
          </div>
          
          <p>
            Global leadership in cybersecurity resilience and trusted AI governance, 
            supporting organizations and institutions worldwide.
          </p>
          
          <div class="csga-hero-actions">
            <a href="/membership" class="btn-primary">
              🛡️ Join CSGA Alliance
            </a>
            <a href="/programs" class="btn-outline">
              📚 Explore Programs
            </a>
          </div>

          <div class="csga-hero-stats">
            <div class="csga-hero-stat">
              <span class="csga-hero-stat-number">Global</span>
              <span class="csga-hero-stat-label">Alliance Network</span>
            </div>
            <div class="csga-hero-stat">
              <span class="csga-hero-stat-number">33</span>
              <span class="csga-hero-stat-label">AI Agents</span>
            </div>
            <div class="csga-hero-stat">
              <span class="csga-hero-stat-number">100%</span>
              <span class="csga-hero-stat-label">Open Source</span>
            </div>
            <div class="csga-hero-stat">
              <span class="csga-hero-stat-number">Enterprise</span>
              <span class="csga-hero-stat-label">Security Ready</span>
            </div>
          </div>
        </div>
      </section>
    `;

    heroSection.outerHTML = enhancedHero;
  }

  // 🏗️ Improve COBOL Section with CSGA Professional Design
  improveCOBOLSection() {
    const cobolSection = document.querySelector('[id*="cobol"], [class*="cobol"], [data-section="cobol"]') ||
                        Array.from(document.querySelectorAll('section')).find(s => 
                          s.textContent.toLowerCase().includes('cobol') || 
                          s.textContent.toLowerCase().includes('legacy')
                        );

    if (!cobolSection) return;

    const enhancedCOBOL = `
      <style>
        .csga-cobol-section {
          background: linear-gradient(135deg, #f7fafc 0%, #ffffff 100%);
          padding: 5rem 0;
          position: relative;
        }

        .csga-cobol-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .csga-cobol-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .csga-cobol-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--csga-primary) !important;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #1a202c, #3182ce);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .csga-cobol-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .csga-cobol-stat {
          background: linear-gradient(135deg, #ffffff, #f1f5f9);
          border: 1px solid #cbd5e1;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .csga-cobol-stat:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border-color: var(--csga-accent);
        }

        .csga-cobol-stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: var(--csga-accent);
          display: block;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .csga-cobol-stat-label {
          font-size: 0.875rem;
          color: var(--csga-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .csga-cobol-services {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .csga-cobol-service {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .csga-cobol-service:hover {
          border-color: var(--csga-accent);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .csga-cobol-service-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--csga-accent), var(--csga-accent-light));
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .csga-cobol-industries {
          background: linear-gradient(135deg, var(--cyber-dark), var(--csga-primary));
          border-radius: 1.5rem;
          padding: 3rem;
          text-align: center;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .csga-cobol-services, .csga-cobol-stats {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <section class="csga-cobol-section">
        <div class="csga-cobol-content">
          <div class="csga-cobol-header">
            <h2>Legacy Modernisation & COBOL Bridge</h2>
            <p>
              220 billion lines of COBOL still power the world's critical infrastructure. 
              Our COBOL-to-AI Bridge provides the governance layer for safe modernisation.
            </p>
          </div>

          <div class="csga-cobol-stats">
            <div class="csga-cobol-stat">
              <span class="csga-cobol-stat-number">95%</span>
              <span class="csga-cobol-stat-label">ATM Transactions</span>
            </div>
            <div class="csga-cobol-stat">
              <span class="csga-cobol-stat-number">220B</span>
              <span class="csga-cobol-stat-label">Lines in Production</span>
            </div>
            <div class="csga-cobol-stat">
              <span class="csga-cobol-stat-number">43%</span>
              <span class="csga-cobol-stat-label">Banking Systems</span>
            </div>
            <div class="csga-cobol-stat">
              <span class="csga-cobol-stat-number">$4.9T</span>
              <span class="csga-cobol-stat-label">Daily Transactions</span>
            </div>
          </div>

          <div class="csga-cobol-services">
            <div class="csga-cobol-service">
              <div class="csga-cobol-service-icon">💼</div>
              <h3>COBOL Copybook Parser</h3>
              <p>
                Parse COBOL copybook definitions, detect PII fields, and generate JSON schema 
                mappings for AI governance APIs automatically.
              </p>
              <a href="/services/cobol-bridge" style="color: var(--csga-accent); font-weight: 600;">
                Learn More →
              </a>
            </div>

            <div class="csga-cobol-service">
              <div class="csga-cobol-service-icon">🏦</div>
              <h3>CICS Bridge Assessment</h3>
              <p>
                Architecture and compliance assessment for connecting CICS mainframe transactions 
                to governance servers via CTG or web services.
              </p>
              <a href="/services/cics-bridge" style="color: var(--csga-accent); font-weight: 600;">
                Learn More →
              </a>
            </div>

            <div class="csga-cobol-service">
              <div class="csga-cobol-service-icon">🔍</div>
              <h3>JCL Batch Scanner</h3>
              <p>
                Scan JCL batch jobs to identify data flows feeding AI governance systems. 
                Detect datasets, DB2 queries, and map scheduling to compliance.
              </p>
              <a href="/services/jcl-scanner" style="color: var(--csga-accent); font-weight: 600;">
                Learn More →
              </a>
            </div>
          </div>

          <div class="csga-cobol-industries">
            <h3 style="color: #ffffff !important;">Target Industries</h3>
            <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin-top: 2rem;">
              <span class="cyber-badge">Banking</span>
              <span class="cyber-badge">Insurance</span>
              <span class="cyber-badge">Government</span>
              <span class="cyber-badge">Healthcare</span>
              <span class="cyber-badge">Retail</span>
            </div>
          </div>
        </div>
      </section>
    `;

    cobolSection.outerHTML = enhancedCOBOL;
  }

  // 🔍 Fix All Readability Issues
  fixReadabilityIssues() {
    // Remove all problematic blue backgrounds
    const problematicElements = document.querySelectorAll(`
      .bg-blue-600, .bg-blue-700, .bg-blue-800, .bg-blue-900,
      [class*="bg-blue"]
    `);

    problematicElements.forEach(el => {
      el.style.backgroundColor = '#ffffff';
      el.style.color = '#1a202c';
      el.style.border = '1px solid #e2e8f0';
    });

    // Ensure proper contrast everywhere
    const textElements = document.querySelectorAll('p, span, div, li, td, h1, h2, h3, h4, h5, h6');
    textElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const color = style.color;
      
      if (bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const rgb = bg.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          if (brightness < 128) {
            el.style.color = '#ffffff';
          } else {
            el.style.color = '#1a202c';
          }
        }
      }
    });
  }

  // 🏢 Add CSGA Logo Integration
  addCSGALogo() {
    // Find logo containers
    const logoContainers = document.querySelectorAll(
      '.logo, .navbar-brand, [class*="logo"], [class*="brand"], .brand'
    );

    logoContainers.forEach(container => {
      // Replace with CSGA branding
      container.innerHTML = `
        <div class="csga-logo-container">
          <span class="csga-brand-text">CSGA</span>
          <span style="color: var(--csga-text-secondary); font-size: 0.875rem; font-weight: 500;">
            Cyber Security Global Alliance
          </span>
        </div>
      `;
    });

    // If no logo containers found, add to navigation
    const nav = document.querySelector('nav, .navbar, header');
    if (nav && !nav.querySelector('.csga-logo-container')) {
      const logoElement = `
        <div class="csga-logo-container" style="margin-right: auto;">
          <span class="csga-brand-text">CSGA</span>
          <span style="color: var(--csga-text-secondary); font-size: 0.875rem; font-weight: 500;">
            Cyber Security Global Alliance
          </span>
        </div>
      `;
      nav.insertAdjacentHTML('afterbegin', logoElement);
    }
  }

  // 🔧 Enhance Navigation
  enhanceNavigation() {
    const nav = document.querySelector('nav, .navbar, header');
    if (!nav) return;

    // Add professional styling
    nav.style.background = 'rgba(255, 255, 255, 0.95)';
    nav.style.backdropFilter = 'blur(10px)';
    nav.style.borderBottom = '1px solid #e2e8f0';
    nav.style.position = 'sticky';
    nav.style.top = '0';
    nav.style.zIndex = '50';

    // Style navigation links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.style.color = '#1a202c';
      link.style.fontWeight = '500';
      link.style.padding = '0.5rem 1rem';
      link.style.borderRadius = '0.5rem';
      link.style.transition = 'all 0.2s ease';

      link.addEventListener('mouseenter', function() {
        this.style.color = '#3182ce';
        this.style.backgroundColor = 'rgba(49, 130, 206, 0.1)';
        this.style.textDecoration = 'none';
      });

      link.addEventListener('mouseleave', function() {
        this.style.color = '#1a202c';
        this.style.backgroundColor = 'transparent';
      });
    });
  }

  // 🔒 Add Cybersecurity Themed Elements
  addCybersecurityElements() {
    // Add cybersecurity badges to appropriate sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (section.textContent.toLowerCase().includes('security') ||
          section.textContent.toLowerCase().includes('cyber') ||
          section.textContent.toLowerCase().includes('compliance')) {
        
        section.classList.add('cyber-section');
        
        // Add security badges if not already present
        if (!section.querySelector('.cyber-badge')) {
          const badges = ['ISO 27001:2022', 'SOC 2 TYPE II', 'GDPR COMPLIANT', 'WCAG 2.1 AA'];
          const badgeContainer = document.createElement('div');
          badgeContainer.style.display = 'flex';
          badgeContainer.style.gap = '1rem';
          badgeContainer.style.flexWrap = 'wrap';
          badgeContainer.style.justifyContent = 'center';
          badgeContainer.style.marginTop = '2rem';
          
          badges.forEach(badge => {
            const badgeEl = document.createElement('span');
            badgeEl.className = 'cyber-badge';
            badgeEl.textContent = badge;
            badgeContainer.appendChild(badgeEl);
          });
          
          section.appendChild(badgeContainer);
        }
      }
    });
  }
}

// 🚀 Initialize CSGA Correct Branding
document.addEventListener('DOMContentLoaded', () => {
  new CSGACorrectBranding();
});

// 🔄 Re-apply on dynamic content changes
const observer = new MutationObserver(() => {
  setTimeout(() => {
    new CSGACorrectBranding();
  }, 100);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 📊 Add Professional Statistics Enhancement
class CSGAStatsEnhancer {
  constructor() {
    this.enhanceStatistics();
  }

  enhanceStatistics() {
    // Find and enhance statistics
    const statElements = document.querySelectorAll(
      '[class*="stat"], .metric, [data-stat], .number, .count'
    );

    statElements.forEach(el => {
      const text = el.textContent.trim();
      
      // Check if it's a statistic (contains numbers, percentages, etc.)
      if (/\d+[%$BKMkmb]?/.test(text) || 
          /\d+\+/.test(text) ||
          text.includes('Global') ||
          text.includes('Alliance') ||
          text.includes('Enterprise')) {
        
        el.classList.add('stat-card');
        
        // Wrap numbers in stat-number class
        el.innerHTML = el.innerHTML.replace(
          /(\d+[%$BKMkmb]?|\w+(?=\s+(?:Alliance|Network|Ready)))/g,
          '<span class="stat-number">$1</span>'
        );
        
        // Add stat-label class to descriptive text
        el.innerHTML = el.innerHTML.replace(
          /(?!<span[^>]*>)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*(?:\s+[A-Z]+)*)(?![^<]*<\/span>)/g,
          '<span class="stat-label">$1</span>'
        );
      }
    });
  }
}

// Initialize stats enhancer
document.addEventListener('DOMContentLoaded', () => {
  new CSGAStatsEnhancer();
});

console.log('✅ CSGA Correct Branding Applied - Professional cybersecurity theme with proper colors and logo integration');