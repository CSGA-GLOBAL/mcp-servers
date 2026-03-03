// 🛡️ CSGA Inner Pages Professional Enhancement
// Consistent functionality and branding for all inner pages

class CSGAInnerPagesEnhancer {
  constructor() {
    this.pageType = this.detectPageType();
    this.init();
  }

  init() {
    this.addPageStructure();
    this.enhanceBreadcrumbs();
    this.addPageHeader();
    this.enhanceContent();
    this.addSidebar();
    this.addCTA();
    this.addComplianceBadges();
    this.enhanceNavigation();
    this.addInteractivity();
    this.optimizeForMobile();
  }

  // 🔍 Detect Page Type
  detectPageType() {
    const path = window.location.pathname;
    const body = document.body;
    
    if (path.includes('/mcp/')) return 'mcp';
    if (path.includes('/about') || path.includes('/team')) return 'about';
    if (path.includes('/pricing') || path.includes('/plans')) return 'pricing';
    if (path.includes('/contact')) return 'contact';
    if (path.includes('/programs') || path.includes('/education')) return 'programs';
    if (path.includes('/research') || path.includes('/case-studies')) return 'research';
    if (path.includes('/certification') || path.includes('/casa')) return 'certification';
    if (path.includes('/cybersecurity') || path.includes('/security')) return 'security';
    if (path.includes('/compliance') || path.includes('/governance')) return 'governance';
    
    return 'general';
  }

  // 🏗️ Add Page Structure
  addPageStructure() {
    // Add inner-page class to body
    document.body.classList.add('inner-page');
    
    // Ensure proper page structure
    if (!document.querySelector('.page-content')) {
      this.createPageStructure();
    }
  }

  createPageStructure() {
    // Find main content
    const main = document.querySelector('main') || document.querySelector('.main-content') || document.body;
    
    // Create page structure
    const pageContent = document.createElement('div');
    pageContent.className = 'page-content';
    
    const contentMain = document.createElement('div');
    contentMain.className = 'content-main';
    
    const contentSidebar = document.createElement('div');
    contentSidebar.className = 'content-sidebar';
    
    // Move existing content to main content area
    while (main.firstChild && !main.firstChild.classList?.contains('page-content')) {
      const child = main.firstChild;
      if (child.tagName === 'NAV' || child.tagName === 'HEADER' || child.tagName === 'FOOTER') {
        main.removeChild(child);
        main.appendChild(child);
      } else {
        contentMain.appendChild(child);
      }
    }
    
    pageContent.appendChild(contentMain);
    pageContent.appendChild(contentSidebar);
    
    main.insertBefore(pageContent, main.firstChild);
  }

  // 🧭 Enhance Breadcrumbs
  enhanceBreadcrumbs() {
    let breadcrumbNav = document.querySelector('.breadcrumb-nav');
    
    if (!breadcrumbNav) {
      breadcrumbNav = this.createBreadcrumbs();
    }
    
    this.styleBreadcrumbs(breadcrumbNav);
  }

  createBreadcrumbs() {
    const breadcrumbNav = document.createElement('nav');
    breadcrumbNav.className = 'breadcrumb-nav';
    breadcrumbNav.setAttribute('aria-label', 'Breadcrumb navigation');
    
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb';
    
    // Generate breadcrumb items based on URL
    const pathSegments = window.location.pathname.split('/').filter(segment => segment);
    const breadcrumbItems = [
      { text: '🛡️ CSGA Home', href: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += '/' + segment;
      const title = this.formatBreadcrumbTitle(segment);
      breadcrumbItems.push({
        text: title,
        href: currentPath
      });
    });

    // Build breadcrumb HTML
    breadcrumbItems.forEach((item, index) => {
      if (index > 0) {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = '>';
        breadcrumb.appendChild(separator);
      }

      if (index === breadcrumbItems.length - 1) {
        const current = document.createElement('span');
        current.className = 'breadcrumb-current';
        current.textContent = item.text;
        breadcrumb.appendChild(current);
      } else {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        breadcrumb.appendChild(link);
      }
    });

    breadcrumbNav.appendChild(breadcrumb);
    
    // Insert after header/nav
    const header = document.querySelector('header, nav');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(breadcrumbNav, header.nextSibling);
    } else {
      document.body.insertBefore(breadcrumbNav, document.body.firstChild);
    }

    return breadcrumbNav;
  }

  formatBreadcrumbTitle(segment) {
    const titleMap = {
      'mcp': 'MCP Services',
      'about': 'About Us',
      'team': 'Our Team',
      'pricing': 'Pricing',
      'contact': 'Contact',
      'programs': 'Programs',
      'education': 'Education',
      'research': 'Research',
      'certification': 'Certification',
      'casa': 'CASA',
      'cybersecurity': 'Cybersecurity',
      'governance': 'AI Governance',
      'compliance': 'Compliance'
    };

    return titleMap[segment] || segment.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  styleBreadcrumbs(breadcrumbNav) {
    // Already styled via CSS
  }

  // 📄 Add Page Header
  addPageHeader() {
    let pageHeader = document.querySelector('.page-header');
    
    if (!pageHeader) {
      pageHeader = this.createPageHeader();
    }
    
    this.enhancePageHeader(pageHeader);
  }

  createPageHeader() {
    const pageHeader = document.createElement('section');
    pageHeader.className = 'page-header';
    
    const content = document.createElement('div');
    content.className = 'page-header-content';
    
    // Get page title from document title or h1
    const pageTitle = this.getPageTitle();
    const pageSubtitle = this.getPageSubtitle();
    const pageCategory = this.getPageCategory();
    
    content.innerHTML = `
      <h1 class="page-title">${pageTitle}</h1>
      <p class="page-subtitle">${pageSubtitle}</p>
      <div class="page-meta">
        <span class="page-category">${pageCategory}</span>
        ${this.getPageBadges()}
      </div>
    `;
    
    pageHeader.appendChild(content);
    
    // Insert after breadcrumbs
    const breadcrumbs = document.querySelector('.breadcrumb-nav');
    if (breadcrumbs && breadcrumbs.parentNode) {
      breadcrumbs.parentNode.insertBefore(pageHeader, breadcrumbs.nextSibling);
    } else {
      const main = document.querySelector('main') || document.body;
      main.insertBefore(pageHeader, main.firstChild);
    }

    return pageHeader;
  }

  getPageTitle() {
    const h1 = document.querySelector('h1');
    const title = document.title;
    
    if (h1) {
      return h1.textContent.trim();
    }
    
    if (title && title !== 'CSGA') {
      return title.split(' | ')[0];
    }
    
    return this.formatBreadcrumbTitle(window.location.pathname.split('/').pop());
  }

  getPageSubtitle() {
    const subtitleMap = {
      'mcp': 'Professional Model Context Protocol services for enterprise AI governance',
      'about': 'Global leadership in cybersecurity resilience and trusted AI governance',
      'pricing': 'Flexible plans for organizations of all sizes',
      'contact': 'Connect with our cybersecurity and AI governance experts',
      'programs': 'Workforce-ready cybersecurity and AI education programs',
      'research': 'Cutting-edge research in cybersecurity and AI safety',
      'certification': 'Professional certifications for the AI-driven economy',
      'security': 'Enterprise-grade cybersecurity solutions and services',
      'governance': 'Comprehensive AI governance frameworks and standards'
    };

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      return description.getAttribute('content');
    }

    return subtitleMap[this.pageType] || 'Professional cybersecurity and AI governance solutions';
  }

  getPageCategory() {
    const categoryMap = {
      'mcp': '🔧 MCP Services',
      'about': '🏢 Company',
      'pricing': '💰 Pricing',
      'contact': '📞 Contact',
      'programs': '🎓 Education',
      'research': '🔬 Research',
      'certification': '📜 Certification',
      'security': '🛡️ Security',
      'governance': '⚖️ Governance'
    };

    return categoryMap[this.pageType] || '📄 Information';
  }

  getPageBadges() {
    const badgeMap = {
      'mcp': '<span class="page-badge">Enterprise Ready</span>',
      'certification': '<span class="page-badge">BMCC Accredited</span>',
      'security': '<span class="page-badge">ISO 27001</span>',
      'governance': '<span class="page-badge">ISO 42001</span>'
    };

    return badgeMap[this.pageType] || '<span class="page-badge">Professional</span>';
  }

  enhancePageHeader(pageHeader) {
    // Add CSGA background pattern if not present
    if (!pageHeader.querySelector('::before')) {
      // Already styled via CSS
    }
  }

  // 📝 Enhance Content
  enhanceContent() {
    const contentMain = document.querySelector('.content-main');
    if (!contentMain) return;

    this.addContentSections();
    this.enhanceTypography();
    this.addInteractiveElements();
  }

  addContentSections() {
    const contentMain = document.querySelector('.content-main');
    
    // Group content into sections
    const headings = contentMain.querySelectorAll('h2, h3');
    headings.forEach(heading => {
      if (!heading.closest('.content-section')) {
        this.wrapInContentSection(heading);
      }
    });
  }

  wrapInContentSection(heading) {
    const section = document.createElement('div');
    section.className = 'content-section';
    
    const elements = [heading];
    let nextElement = heading.nextElementSibling;
    
    while (nextElement && !['H1', 'H2', 'H3'].includes(nextElement.tagName)) {
      elements.push(nextElement);
      nextElement = nextElement.nextElementSibling;
    }
    
    heading.parentNode.insertBefore(section, heading);
    elements.forEach(el => section.appendChild(el));
  }

  enhanceTypography() {
    const contentMain = document.querySelector('.content-main');
    
    // Enhance code blocks
    const codeBlocks = contentMain.querySelectorAll('code, pre');
    codeBlocks.forEach(block => {
      block.style.background = '#f7fafc';
      block.style.border = '1px solid #e2e8f0';
      block.style.borderRadius = '0.375rem';
      block.style.padding = block.tagName === 'PRE' ? '1rem' : '0.25rem 0.5rem';
      block.style.fontFamily = 'Monaco, Consolas, monospace';
      block.style.fontSize = '0.875rem';
    });

    // Enhance tables
    const tables = contentMain.querySelectorAll('table');
    tables.forEach(table => {
      const wrapper = document.createElement('div');
      wrapper.style.overflowX = 'auto';
      wrapper.style.border = '1px solid #e2e8f0';
      wrapper.style.borderRadius = '0.75rem';
      wrapper.style.margin = '1.5rem 0';
      
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      
      const cells = table.querySelectorAll('th, td');
      cells.forEach(cell => {
        cell.style.padding = '0.75rem 1rem';
        cell.style.borderBottom = '1px solid #f1f5f9';
        cell.style.textAlign = 'left';
      });
      
      const headers = table.querySelectorAll('th');
      headers.forEach(header => {
        header.style.background = '#f8fafc';
        header.style.fontWeight = '600';
        header.style.color = '#1a202c';
      });
      
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  addInteractiveElements() {
    // Add copy buttons to code blocks
    const preBlocks = document.querySelectorAll('pre');
    preBlocks.forEach(pre => {
      this.addCopyButton(pre);
    });

    // Add expand/collapse for long content sections
    this.addContentToggles();
  }

  addCopyButton(pre) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    
    const copyBtn = document.createElement('button');
    copyBtn.innerHTML = '📋 Copy';
    copyBtn.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: #3182ce;
      color: white;
      border: none;
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    `;
    
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(pre.textContent);
      copyBtn.innerHTML = '✅ Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = '📋 Copy';
      }, 2000);
    });

    copyBtn.addEventListener('mouseenter', () => {
      copyBtn.style.background = '#2c5282';
    });

    copyBtn.addEventListener('mouseleave', () => {
      copyBtn.style.background = '#3182ce';
    });
    
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    wrapper.appendChild(copyBtn);
  }

  addContentToggles() {
    const longSections = document.querySelectorAll('.content-section');
    longSections.forEach(section => {
      if (section.scrollHeight > 400) {
        this.addToggleButton(section);
      }
    });
  }

  addToggleButton(section) {
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = 'Show More ↓';
    toggleBtn.style.cssText = `
      background: transparent;
      color: #3182ce;
      border: 1px solid #3182ce;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      margin-top: 1rem;
      font-weight: 500;
      transition: all 0.2s ease;
    `;

    let isExpanded = false;
    section.style.maxHeight = '400px';
    section.style.overflow = 'hidden';
    section.style.position = 'relative';

    toggleBtn.addEventListener('click', () => {
      if (isExpanded) {
        section.style.maxHeight = '400px';
        toggleBtn.innerHTML = 'Show More ↓';
        isExpanded = false;
      } else {
        section.style.maxHeight = 'none';
        toggleBtn.innerHTML = 'Show Less ↑';
        isExpanded = true;
      }
    });

    section.appendChild(toggleBtn);
  }

  // 📋 Add Sidebar
  addSidebar() {
    const sidebar = document.querySelector('.content-sidebar');
    if (!sidebar) return;

    this.addQuickNav();
    this.addRelatedContent();
    this.addContactCard();
    this.addResourcesCard();
  }

  addQuickNav() {
    const sidebar = document.querySelector('.content-sidebar');
    const headings = document.querySelectorAll('.content-main h2, .content-main h3');
    
    if (headings.length < 3) return;

    const quickNav = document.createElement('div');
    quickNav.className = 'sidebar-card';
    
    const navList = document.createElement('ul');
    navList.style.listStyle = 'none';
    navList.style.padding = '0';
    navList.style.margin = '0';
    
    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.textContent = heading.textContent;
      link.style.display = 'block';
      link.style.padding = '0.5rem 0';
      link.style.borderBottom = '1px solid #f1f5f9';
      link.style.fontSize = heading.tagName === 'H2' ? '0.875rem' : '0.75rem';
      link.style.paddingLeft = heading.tagName === 'H3' ? '1rem' : '0';
      
      link.addEventListener('click', (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth' });
      });
      
      listItem.appendChild(link);
      navList.appendChild(listItem);
    });
    
    quickNav.innerHTML = '<h3>📋 Quick Navigation</h3>';
    quickNav.appendChild(navList);
    sidebar.appendChild(quickNav);
  }

  addRelatedContent() {
    const sidebar = document.querySelector('.content-sidebar');
    
    const relatedCard = document.createElement('div');
    relatedCard.className = 'sidebar-card';
    
    const relatedContent = this.getRelatedContent();
    
    relatedCard.innerHTML = `
      <h3>🔗 Related Content</h3>
      <ul>
        ${relatedContent.map(item => `
          <li><a href="${item.href}">${item.title}</a></li>
        `).join('')}
      </ul>
    `;
    
    sidebar.appendChild(relatedCard);
  }

  getRelatedContent() {
    const relatedMap = {
      'mcp': [
        { title: 'MCP Catalog', href: '/catalog.html' },
        { title: 'Pricing Plans', href: '/pricing.html' },
        { title: 'AI Governance', href: '/mcp/ai-governance.html' }
      ],
      'about': [
        { title: 'Our Team', href: '/team.html' },
        { title: 'Contact Us', href: '/contact.html' },
        { title: 'Programs', href: '/programs.html' }
      ],
      'certification': [
        { title: 'CASA Sectors', href: '/casa-sectors.html' },
        { title: 'Training Programs', href: '/training.html' },
        { title: 'Pricing', href: '/pricing.html' }
      ]
    };

    return relatedMap[this.pageType] || [
      { title: 'Home', href: '/' },
      { title: 'About CSGA', href: '/about.html' },
      { title: 'Contact', href: '/contact.html' }
    ];
  }

  addContactCard() {
    const sidebar = document.querySelector('.content-sidebar');
    
    const contactCard = document.createElement('div');
    contactCard.className = 'sidebar-card';
    
    contactCard.innerHTML = `
      <h3>💬 Need Help?</h3>
      <p>Contact our cybersecurity and AI governance experts for personalized assistance.</p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
        <a href="/contact.html" class="cta-button" style="text-align: center; padding: 0.75rem; background: #3182ce; color: white; border-radius: 0.5rem; text-decoration: none;">
          📞 Contact Us
        </a>
        <a href="/programs.html" class="cta-button" style="text-align: center; padding: 0.75rem; border: 1px solid #3182ce; color: #3182ce; border-radius: 0.5rem; text-decoration: none;">
          🎓 View Programs
        </a>
      </div>
    `;
    
    sidebar.appendChild(contactCard);
  }

  addResourcesCard() {
    const sidebar = document.querySelector('.content-sidebar');
    
    const resourcesCard = document.createElement('div');
    resourcesCard.className = 'sidebar-card';
    
    resourcesCard.innerHTML = `
      <h3>📚 Resources</h3>
      <ul>
        <li><a href="/research.html">🔬 Research Papers</a></li>
        <li><a href="/case-studies.html">📊 Case Studies</a></li>
        <li><a href="/cybersecurity.html">🛡️ Security Guide</a></li>
        <li><a href="/faq.html">❓ FAQ</a></li>
      </ul>
    `;
    
    sidebar.appendChild(resourcesCard);
  }

  // 🎯 Add CTA
  addCTA() {
    const contentMain = document.querySelector('.content-main');
    if (!contentMain) return;

    const cta = this.createCTASection();
    contentMain.appendChild(cta);
  }

  createCTASection() {
    const cta = document.createElement('div');
    cta.className = 'cta-section';
    
    const ctaContent = this.getCTAContent();
    
    cta.innerHTML = `
      <h2 class="cta-title">${ctaContent.title}</h2>
      <p class="cta-subtitle">${ctaContent.subtitle}</p>
      <div class="cta-buttons">
        <a href="${ctaContent.primaryAction.href}" class="cta-button primary">
          ${ctaContent.primaryAction.text}
        </a>
        <a href="${ctaContent.secondaryAction.href}" class="cta-button">
          ${ctaContent.secondaryAction.text}
        </a>
      </div>
    `;
    
    return cta;
  }

  getCTAContent() {
    const ctaMap = {
      'mcp': {
        title: 'Ready to Transform Your AI Governance?',
        subtitle: 'Join leading organizations using CSGA MCP services for enterprise AI compliance and security.',
        primaryAction: { text: '🚀 Get Started', href: '/pricing.html' },
        secondaryAction: { text: '📞 Contact Sales', href: '/contact.html' }
      },
      'certification': {
        title: 'Start Your CASA Certification Journey',
        subtitle: 'Become a certified Chief AI Safety Officer with our BMCC-accredited program.',
        primaryAction: { text: '🎓 Enroll Now', href: '/certification.html' },
        secondaryAction: { text: '📚 Learn More', href: '/programs.html' }
      },
      'about': {
        title: 'Join the CSGA Alliance',
        subtitle: 'Connect with cybersecurity professionals and AI governance experts worldwide.',
        primaryAction: { text: '🤝 Become a Member', href: '/members.html' },
        secondaryAction: { text: '💬 Contact Us', href: '/contact.html' }
      }
    };

    return ctaMap[this.pageType] || {
      title: 'Ready to Enhance Your Cybersecurity?',
      subtitle: 'Discover how CSGA can help protect your organization in the AI-driven economy.',
      primaryAction: { text: '🛡️ Get Protected', href: '/programs.html' },
      secondaryAction: { text: '📞 Contact Us', href: '/contact.html' }
    };
  }

  // 🏅 Add Compliance Badges
  addComplianceBadges() {
    const contentMain = document.querySelector('.content-main');
    if (!contentMain) return;

    const compliance = document.createElement('div');
    compliance.className = 'compliance-section';
    
    compliance.innerHTML = `
      <h3 style="color: #1a202c !important; margin-bottom: 1rem !important;">🔒 Security & Compliance</h3>
      <p style="color: #4a5568 !important;">CSGA maintains the highest standards of security and compliance for enterprise cybersecurity.</p>
      <div class="compliance-badges">
        <span class="compliance-badge">ISO 27001:2022</span>
        <span class="compliance-badge">SOC 2 Type II</span>
        <span class="compliance-badge">GDPR Compliant</span>
        <span class="compliance-badge">WCAG 2.1 AA</span>
      </div>
    `;
    
    contentMain.appendChild(compliance);
  }

  // 🔗 Enhance Navigation
  enhanceNavigation() {
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Add back to top button
    this.addBackToTopButton();
  }

  addBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑ Top';
    backToTop.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #3182ce;
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 1000;
      font-weight: 600;
      min-width: 60px;
      height: 60px;
    `;

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    });

    document.body.appendChild(backToTop);
  }

  // ⚡ Add Interactivity
  addInteractivity() {
    // Add loading states
    this.addLoadingStates();
    
    // Add form enhancements
    this.enhanceForms();
    
    // Add image lazy loading
    this.addLazyLoading();
    
    // Add progress indicator
    this.addProgressIndicator();
  }

  addLoadingStates() {
    // Add loading state to buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        if (this.textContent.includes('Contact') || this.textContent.includes('Submit')) {
          const originalText = this.textContent;
          this.style.opacity = '0.7';
          this.style.pointerEvents = 'none';
          this.textContent = 'Loading...';
          
          setTimeout(() => {
            this.style.opacity = '1';
            this.style.pointerEvents = 'auto';
            this.textContent = originalText;
          }, 2000);
        }
      });
    });
  }

  enhanceForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      // Add validation styles
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.style.border = '1px solid #e2e8f0';
        input.style.borderRadius = '0.5rem';
        input.style.padding = '0.75rem';
        input.style.fontSize = '1rem';
        input.style.transition = 'border-color 0.2s ease';

        input.addEventListener('focus', () => {
          input.style.borderColor = '#3182ce';
          input.style.outline = 'none';
          input.style.boxShadow = '0 0 0 3px rgba(49, 130, 206, 0.1)';
        });

        input.addEventListener('blur', () => {
          input.style.borderColor = '#e2e8f0';
          input.style.boxShadow = 'none';
        });
      });
    });
  }

  addLazyLoading() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '0';
            
            img.onload = () => {
              img.style.opacity = '1';
            };
            
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  addProgressIndicator() {
    const progress = document.createElement('div');
    progress.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #3182ce, #4299e1);
      z-index: 9999;
      transition: width 0.1s ease;
    `;

    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progress.style.width = scrollPercent + '%';
    });
  }

  // 📱 Optimize for Mobile
  optimizeForMobile() {
    // Add touch-friendly improvements
    this.addTouchImprovements();
    
    // Optimize images for mobile
    this.optimizeMobileImages();
    
    // Add mobile-specific navigation
    this.addMobileNavigation();
  }

  addTouchImprovements() {
    // Make buttons more touch-friendly
    const buttons = document.querySelectorAll('button, .btn, a');
    buttons.forEach(button => {
      button.style.minHeight = '44px';
      button.style.minWidth = '44px';
    });

    // Add touch feedback
    document.addEventListener('touchstart', (e) => {
      if (e.target.closest('button, .btn, a')) {
        e.target.style.opacity = '0.8';
      }
    });

    document.addEventListener('touchend', (e) => {
      if (e.target.closest('button, .btn, a')) {
        setTimeout(() => {
          e.target.style.opacity = '1';
        }, 100);
      }
    });
  }

  optimizeMobileImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    });
  }

  addMobileNavigation() {
    // Mobile navigation is handled by the hero-mobile-fixes.js
  }
}

// 🚀 Initialize Inner Pages Enhancement
document.addEventListener('DOMContentLoaded', () => {
  new CSGAInnerPagesEnhancer();
});

// Handle dynamic content
const observer = new MutationObserver(() => {
  setTimeout(() => {
    new CSGAInnerPagesEnhancer();
  }, 100);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('✅ CSGA Inner Pages Professional Enhancement Applied');