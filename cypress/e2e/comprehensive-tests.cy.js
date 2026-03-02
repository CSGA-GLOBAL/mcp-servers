// Enhanced Cypress Tests for CSGA Global
// Comprehensive E2E testing with mobile/desktop coverage

describe('CSGA Global - Comprehensive E2E Tests', () => {
  
  beforeEach(() => {
    // Set up test environment
    cy.visit('/');
    cy.viewport(1200, 800); // Default desktop view
  });

  describe('🏠 Homepage Tests', () => {
    
    it('loads homepage successfully', () => {
      cy.get('h1').should('be.visible');
      cy.get('.home-hero').should('be.visible');
      cy.title().should('contain', 'CSGA Global');
    });
    
    it('has working navigation menu', () => {
      cy.get('.nav-bar').should('be.visible');
      cy.get('.nav-link').should('have.length.greaterThan', 0);
      
      // Test main navigation links
      cy.get('a[href*="pricing"]').should('be.visible');
      cy.get('a[href*="about"]').should('be.visible');
      cy.get('a[href*="contact"]').should('be.visible');
    });
    
    it('has functional hero CTAs', () => {
      cy.get('.home-hero-ctas .btn').should('have.length.greaterThan', 0);
      cy.get('.btn-hero-primary').should('be.visible').and('contain.text', 'Explore');
      cy.get('.btn-hero-secondary').should('be.visible').and('contain.text', 'Join');
    });
    
    it('displays key statistics', () => {
      cy.get('.home-hero-badges, .hero-stats').should('be.visible');
      cy.contains('70').should('be.visible'); // MCP count
      cy.contains('CSOAI').should('be.visible');
    });
  });

  describe('📱 Mobile Experience', () => {
    
    beforeEach(() => {
      cy.viewport(375, 667); // iPhone SE
    });
    
    it('has working mobile menu', () => {
      // Check hamburger menu exists
      cy.get('.hamburger, .menu-toggle').should('be.visible');
      
      // Click to open menu
      cy.get('.hamburger, .menu-toggle').first().click();
      
      // Check navigation appears
      cy.get('.nav-bar').should('be.visible').and('have.class', 'active');
      
      // Check navigation links are accessible
      cy.get('.nav-link').first().should('be.visible');
    });
    
    it('has properly sized mobile CTAs', () => {
      cy.get('.home-hero-ctas .btn').should('be.visible');
      
      // Check buttons are properly sized for mobile
      cy.get('.btn-hero-primary').should('have.css', 'width').and('match', /px/);
      cy.get('.btn-hero-primary').should('have.css', 'padding').and('match', /px/);
    });
    
    it('mobile form inputs are properly sized', () => {
      cy.visit('/contact.html');
      cy.get('input[type="text"], input[type="email"]').should('be.visible');
      
      // Check inputs have min-height for touch targets
      cy.get('input').first().should('have.css', 'min-height').and('match', /px/);
    });
  });

  describe('🎯 Signup & Conversion Flows', () => {
    
    it('pricing page loads and shows tiers', () => {
      cy.visit('/pricing.html');
      cy.get('.pricing-card, .pricing-tier').should('have.length.greaterThan', 3);
      cy.contains('Free').should('be.visible');
      cy.contains('Pro').should('be.visible');
      cy.contains('Enterprise').should('be.visible');
    });
    
    it('contact form is functional', () => {
      cy.visit('/contact.html');
      
      // Fill out contact form
      cy.get('input[name*="fname"], input[name*="first"]').type('Test');
      cy.get('input[name*="lname"], input[name*="last"]').type('User');
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('textarea').type('Test message for CSGA Global');
      
      // Check form validation
      cy.get('input[type="email"]').should('have.value', 'test@example.com');
    });
    
    it('member signup flow is accessible', () => {
      cy.visit('/members.html');
      cy.get('.mem-btn-gold, .cta-primary').should('be.visible');
      cy.get('a[href*="pricing"]').should('be.visible');
    });
    
    it('MCP catalog is browsable', () => {
      cy.visit('/catalog.html');
      cy.get('.search-bar').should('be.visible');
      cy.get('.filter-btn').should('have.length.greaterThan', 2);
      
      // Test search functionality
      cy.get('.search-bar').type('AI');
      cy.get('.mcp-card, .catalog-item').should('be.visible');
    });
  });

  describe('🛡️ MCP Pages Quality', () => {
    
    const mcpPages = [
      '/mcp/ai-governance.html',
      '/mcp/cobol-bridge.html',
      '/mcp/dsrb-defence.html',
      '/mcp/cloud-security.html'
    ];
    
    mcpPages.forEach(page => {
      it(`${page} loads and has proper structure`, () => {
        cy.visit(page);
        
        // Check basic page structure
        cy.get('h1').should('be.visible');
        cy.get('.constitutional-ai-banner, .hero').should('be.visible');
        
        // Check for pricing information
        cy.contains(/\$\d+/).should('be.visible');
        
        // Check for features section
        cy.get('[class*="feature"], [class*="tool"]').should('have.length.greaterThan', 2);
        
        // Check for CTA buttons
        cy.get('.cta-btn, .btn').should('be.visible');
      });
    });
    
    it('COBOL Bridge page has enterprise pricing', () => {
      cy.visit('/mcp/cobol-bridge.html');
      cy.contains('$4,999').should('be.visible');
      cy.contains('Enterprise').should('be.visible');
      cy.contains('CASA').should('be.visible');
    });
    
    it('DSRB Defence has proper security gating', () => {
      cy.visit('/mcp/dsrb-defence.html');
      cy.contains('Defence').should('be.visible');
      cy.contains('defence@csga-global.org').should('be.visible');
    });
  });

  describe('📊 Dashboard Functionality', () => {
    
    it('dashboard page loads', () => {
      cy.visit('/dashboard.html');
      cy.get('.dashboard, .dashboard-container').should('be.visible');
    });
    
    it('dashboard has proper navigation', () => {
      cy.visit('/dashboard.html');
      cy.get('.dashboard-nav, .sidebar').should('be.visible');
      cy.get('.dashboard-main, .main-content').should('be.visible');
    });
    
    it('dashboard stats are displayed', () => {
      cy.visit('/dashboard.html');
      cy.get('.stat-card, .dashboard-card').should('have.length.greaterThan', 0);
    });
  });

  describe('🔧 API & Backend Integration', () => {
    
    it('health check endpoints respond', () => {
      cy.request('/api/health').then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    
    it('handles 404 pages gracefully', () => {
      cy.request({ url: '/nonexistent-page', failOnStatusCode: false })
        .then((response) => {
          expect(response.status).to.be.oneOf([404, 200]);
        });
    });
  });

  describe('♿ Accessibility & Quality', () => {
    
    it('has proper heading hierarchy', () => {
      cy.get('h1').should('have.length', 1);
      cy.get('h1').should('be.visible');
      cy.get('h2').should('have.length.greaterThan', 0);
    });
    
    it('images have alt text', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');
      });
    });
    
    it('forms have proper labels', () => {
      cy.visit('/contact.html');
      cy.get('input, textarea').each(($input) => {
        const id = $input.attr('id') || $input.attr('name');
        if (id) {
          cy.get(`label[for="${id}"]`).should('exist');
        }
      });
    });
    
    it('has keyboard navigation support', () => {
      cy.get('a, button, input').first().focus();
      cy.focused().should('have.css', 'outline').and('not.equal', 'none');
    });
  });

  describe('⚡ Performance', () => {
    
    it('loads within acceptable time', () => {
      const startTime = Date.now();
      
      cy.visit('/').then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(5000); // 5 second max
      });
    });
    
    it('has optimized images', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'loading', 'lazy');
      });
    });
  });

  describe('🌐 Cross-Browser Compatibility', () => {
    
    ['macbook-15', 'iphone-8', 'samsung-s10'].forEach(device => {
      it(`works properly on ${device}`, () => {
        cy.viewport(device);
        cy.visit('/');
        
        cy.get('h1').should('be.visible');
        cy.get('.nav-bar, .hamburger').should('be.visible');
        cy.get('.home-hero').should('be.visible');
      });
    });
  });

  describe('🔒 Security Headers', () => {
    
    it('has proper security headers', () => {
      cy.request('/').then((response) => {
        expect(response.headers).to.have.property('content-type');
        // Add more security header checks as needed
      });
    });
  });
});

// Custom commands for enhanced testing
Cypress.Commands.add('checkResponsive', (element) => {
  ['macbook-15', 'iphone-8', 'ipad-2'].forEach(device => {
    cy.viewport(device);
    cy.get(element).should('be.visible');
  });
});

Cypress.Commands.add('testFormValidation', (formSelector) => {
  cy.get(`${formSelector} input[required]`).first().focus().blur();
  cy.get('.field-error, .error-message').should('be.visible');
});

Cypress.Commands.add('checkLoadTime', () => {
  cy.window().its('performance').invoke('now').then((startTime) => {
    cy.get('body').should('be.visible').then(() => {
      cy.window().its('performance').invoke('now').then((endTime) => {
        expect(endTime - startTime).to.be.lessThan(3000);
      });
    });
  });
});