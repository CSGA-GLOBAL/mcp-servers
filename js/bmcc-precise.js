// BMCC Cyber Precise Pattern Implementation
// Based on direct analysis of https://bmcc-cyber.vercel.app/

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎯 Implementing BMCC Cyber Precise Patterns...');
  
  // Apply exact BMCC patterns
  implementBMCCSpecificPatterns();
  implementHALTStyleCertification();
  implementSpecificThreatFocus();
  implementTimeBasedPromises();
  implementTargetAudienceClarity();
  implementActionFocusedCTAs();
  
  console.log('✅ BMCC Precise Patterns Applied');
});

function implementBMCCSpecificPatterns() {
  console.log('🔍 Implementing BMCC-Specific Patterns...');
  
  // Update hero with BMCC's exact approach
  const heroTitle = document.querySelector('.hero-title, .hero-title-bmcc, .display-text');
  if (heroTitle) {
    heroTitle.innerHTML = `
      <span style="color: var(--alert-red); font-size: 1.2em;">⚠️</span> 
      <span style="color: var(--cyber-blue);">Essential AI Governance</span><br>
      <span style="color: white; font-size: 0.85em;">Training & Certification Platform</span>
    `;
  }
  
  // Create BMCC-style certification section
  const certificationName = document.createElement('div');
  certificationName.style.cssText = `
    background: rgba(239, 68, 68, 0.1);
    border: 2px solid var(--alert-red);
    border-radius: 12px;
    padding: 25px;
    margin: 30px auto;
    max-width: 600px;
    text-align: center;
  `;
  
  certificationName.innerHTML = `
    <h2 style="
      color: white;
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 15px;
      letter-spacing: -0.5px;
    ">
      CASA AI Governance Certification
    </h2>
    <p style="
      color: rgba(255,255,255,0.9);
      font-size: 1.1rem;
      line-height: 1.5;
      margin-bottom: 0;
    ">
      In under <strong>200 hours</strong>, learn to implement and defend comprehensive AI governance frameworks. 
      Designed for <strong>professionals, executives, and CISOs</strong> responsible for organizational AI safety.
    </p>
  `;
  
  // Insert after hero content
  const heroContent = document.querySelector('.hero-content, .hero-content-bmcc');
  if (heroContent) {
    heroContent.appendChild(certificationName);
  }
}

function implementHALTStyleCertification() {
  console.log('🏆 Implementing HALT-Style Certification Focus...');
  
  // Create BMCC-style specific threats section
  const threatsSection = document.createElement('section');
  threatsSection.style.cssText = `
    padding: 60px 0;
    background: var(--csga-navy);
    text-align: center;
  `;
  
  threatsSection.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto; padding: 0 20px;">
      <h3 style="
        color: white;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 40px;
        color: var(--cyber-blue);
      ">
        Master Every Critical AI Governance Domain
      </h3>
      
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 25px;
        margin-bottom: 40px;
      ">
        <div class="threat-item">
          <div style="font-size: 2rem; margin-bottom: 10px;">🛡️</div>
          <div style="color: white; font-weight: 600; margin-bottom: 8px;">AI Risk Assessment</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Enterprise risk evaluation</div>
        </div>
        
        <div class="threat-item">
          <div style="font-size: 2rem; margin-bottom: 10px;">📊</div>
          <div style="color: white; font-weight: 600; margin-bottom: 8px;">Regulatory Compliance</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">ISO 42001 & GDPR alignment</div>
        </div>
        
        <div class="threat-item">
          <div style="font-size: 2rem; margin-bottom: 10px;">🔐</div>
          <div style="color: white; font-weight: 600; margin-bottom: 8px;">Security Framework Design</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Defense-grade protocols</div>
        </div>
        
        <div class="threat-item">
          <div style="font-size: 2rem; margin-bottom: 10px;">⚖️</div>
          <div style="color: white; font-weight: 600; margin-bottom: 8px;">Ethics & Constitutional AI</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Responsible AI deployment</div>
        </div>
        
        <div class="threat-item">
          <div style="font-size: 2rem; margin-bottom: 10px;">🎯</div>
          <div style="color: white; font-weight: 600; margin-bottom: 8px;">Incident Response</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">AI failure management</div>
        </div>
        
        <div class="threat-item">
          <div style="font-size: 2rem; margin-bottom: 10px;">📋</div>
          <div style="color: white; font-weight: 600; margin-bottom: 8px;">Governance Playbook</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.9rem;">Implementation toolkit</div>
        </div>
      </div>
    </div>
  `;
  
  // Insert threats section after hero
  const heroSection = document.querySelector('.hero, .hero-kimi, .hero-bmcc');
  if (heroSection) {
    heroSection.insertAdjacentElement('afterend', threatsSection);
  }
}

function implementSpecificThreatFocus() {
  console.log('🛡️ Implementing Specific Threat Focus...');
  
  // Update existing feature cards to be threat-specific like BMCC
  const featureCards = document.querySelectorAll('.card, .feature-card, .industry-card');
  
  featureCards.forEach((card, index) => {
    const cardTitle = card.querySelector('h3, h4, .card-title');
    const cardDesc = card.querySelector('p, .card-description');
    
    if (cardTitle && cardDesc) {
      const bmccPatterns = [
        {
          emoji: '🛑',
          title: 'AI Governance Failures',
          desc: 'Recognize and prevent the 12 most common AI governance failures that cost organizations millions in fines and reputation damage.'
        },
        {
          emoji: '🎯',
          title: 'Constitutional AI Implementation',
          desc: 'Deploy Constitutional AI frameworks that ensure ethical decision-making and regulatory compliance across all AI systems.'
        },
        {
          emoji: '📊',
          title: 'Compliance Automation',
          desc: 'Automate ISO 42001, GDPR, and CCPA compliance monitoring with real-time risk assessment and incident response protocols.'
        },
        {
          emoji: '🔐',
          title: 'Defense-Grade Security',
          desc: 'Implement military-standard AI security protocols trusted by Five Eyes alliance partners and Fortune 100 enterprises.'
        }
      ];
      
      const pattern = bmccPatterns[index % bmccPatterns.length];
      
      cardTitle.innerHTML = `
        <span style="font-size: 1.5rem; margin-right: 8px;">${pattern.emoji}</span>
        <span>${pattern.title}</span>
      `;
      
      cardDesc.innerHTML = pattern.desc;
    }
  });
}

function implementTimeBasedPromises() {
  console.log('⏰ Implementing Time-Based Promises...');
  
  // Add BMCC-style time-specific promises
  const timePromises = document.createElement('div');
  timePromises.style.cssText = `
    background: linear-gradient(135deg, var(--cyber-blue) 0%, var(--security-teal) 100%);
    color: white;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    margin: 40px auto;
    max-width: 700px;
  `;
  
  timePromises.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; align-items: center;">
      <div>
        <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 5px;">4</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">weeks to certification</div>
      </div>
      <div>
        <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 5px;">24</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">hours for implementation</div>
      </div>
      <div>
        <div style="font-size: 2.5rem; font-weight: 900; margin-bottom: 5px;">100%</div>
        <div style="font-size: 0.9rem; opacity: 0.9;">compliance guarantee</div>
      </div>
    </div>
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
      <strong>Fast-Track Option:</strong> Complete core modules in 2 weeks with intensive mentoring
    </div>
  `;
  
  // Insert into hero or certification section
  const certSection = document.querySelector('.certification-focus-section');
  if (certSection) {
    certSection.querySelector('div').appendChild(timePromises);
  }
}

function implementTargetAudienceClarity() {
  console.log('👥 Implementing Target Audience Clarity...');
  
  // Create BMCC-style audience specification
  const audienceSection = document.createElement('div');
  audienceSection.style.cssText = `
    background: var(--surface-1);
    border: 1px solid var(--surface-2);
    border-radius: 12px;
    padding: 25px;
    margin: 30px auto;
    max-width: 800px;
  `;
  
  audienceSection.innerHTML = `
    <h4 style="color: var(--cyber-blue); margin-bottom: 20px; text-align: center;">
      Designed specifically for:
    </h4>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
      <div style="text-align: center; color: white;">
        <div style="font-size: 1.5rem; margin-bottom: 8px;">👔</div>
        <div style="font-weight: 600; margin-bottom: 4px;">Executives & CISOs</div>
        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">Strategic AI governance oversight</div>
      </div>
      
      <div style="text-align: center; color: white;">
        <div style="font-size: 1.5rem; margin-bottom: 8px;">🛡️</div>
        <div style="font-weight: 600; margin-bottom: 4px;">Security Professionals</div>
        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">AI threat detection & response</div>
      </div>
      
      <div style="text-align: center; color: white;">
        <div style="font-size: 1.5rem; margin-bottom: 8px;">⚖️</div>
        <div style="font-weight: 600; margin-bottom: 4px;">Compliance Officers</div>
        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">Regulatory framework implementation</div>
      </div>
      
      <div style="text-align: center; color: white;">
        <div style="font-size: 1.5rem; margin-bottom: 8px;">🏢</div>
        <div style="font-weight: 600; margin-bottom: 4px;">Enterprise Leaders</div>
        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.8);">Organizational AI responsibility</div>
      </div>
    </div>
  `;
  
  // Insert after hero description
  const heroDesc = document.querySelector('.hero-description, .hero-desc-bmcc');
  if (heroDesc) {
    heroDesc.insertAdjacentElement('afterend', audienceSection);
  }
}

function implementActionFocusedCTAs() {
  console.log('🎯 Implementing Action-Focused CTAs...');
  
  // Update all CTAs to BMCC's action-focused style
  const ctas = document.querySelectorAll('.btn-primary, .cta-button, .btn-primary-bmcc');
  
  ctas.forEach((cta, index) => {
    const actionTexts = [
      'Get CASA Certified →',
      'Start Training Now →',
      'Book Consultation →',
      'Download Playbook →'
    ];
    
    const actionText = actionTexts[index % actionTexts.length];
    
    // Apply BMCC-style action focus
    cta.innerHTML = `
      <span>${actionText}</span>
    `;
    
    // Add BMCC-style styling
    cta.style.cssText += `
      font-weight: 700;
      font-size: 1.1rem;
      padding: 16px 32px;
      border-radius: 8px;
      transition: all 0.2s ease;
      text-decoration: none;
    `;
    
    // Add hover effect
    cta.addEventListener('mouseenter', () => {
      cta.style.transform = 'translateY(-2px)';
      cta.style.boxShadow = '0 8px 25px rgba(30, 90, 245, 0.3)';
    });
    
    cta.addEventListener('mouseleave', () => {
      cta.style.transform = 'translateY(0)';
      cta.style.boxShadow = 'none';
    });
  });
  
  // Add team pricing option like BMCC
  const teamPricingSection = document.createElement('div');
  teamPricingSection.style.cssText = `
    text-align: center;
    margin: 30px auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    max-width: 600px;
  `;
  
  teamPricingSection.innerHTML = `
    <div style="color: white; margin-bottom: 15px;">
      <strong>Enterprise & Team Training Available</strong>
    </div>
    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
      <a href="/contact" style="
        background: var(--gradient-primary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
      ">Team Pricing Available</a>
      
      <a href="/enterprise" style="
        background: transparent;
        color: var(--cyber-blue);
        border: 1px solid var(--cyber-blue);
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
      ">Enterprise Solutions</a>
    </div>
  `;
  
  // Insert team pricing
  const ctaGroup = document.querySelector('.cta-group-bmcc, .hero-cta-group');
  if (ctaGroup) {
    ctaGroup.insertAdjacentElement('afterend', teamPricingSection);
  }
}

// Add BMCC-specific styling
const bmccCSS = document.createElement('style');
bmccCSS.innerHTML = `
  /* BMCC-Specific Enhancements */
  .threat-item {
    transition: all 0.3s ease;
    cursor: pointer;
    padding: 20px;
    border-radius: 8px;
  }
  
  .threat-item:hover {
    background: rgba(30, 90, 245, 0.1);
    transform: translateY(-3px);
  }
  
  /* BMCC-style action buttons */
  .action-btn-bmcc {
    background: var(--gradient-primary);
    color: white;
    padding: 14px 28px;
    font-weight: 700;
    border-radius: 8px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .action-btn-bmcc:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 90, 245, 0.3);
  }
  
  /* BMCC-style emphasis */
  .bmcc-emphasis {
    background: rgba(239, 68, 68, 0.1);
    border-left: 4px solid var(--alert-red);
    padding: 15px 20px;
    border-radius: 0 8px 8px 0;
    margin: 20px 0;
  }
  
  /* Time-based promise styling */
  .time-promise {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 900;
    color: var(--cyber-blue);
    font-size: 1.2rem;
  }
`;

document.head.appendChild(bmccCSS);

// Export for debugging
window.BMCCPrecise = {
  implementBMCCSpecificPatterns,
  implementHALTStyleCertification,
  implementSpecificThreatFocus,
  implementTimeBasedPromises,
  implementTargetAudienceClarity,
  implementActionFocusedCTAs,
  version: '1.0.0'
};

console.log('🎯 BMCC Cyber Precise Pattern Implementation Loaded');