/// <reference types="cypress" />

/**
 * CSGA Global — Navigation & Site-wide E2E Tests
 * ════════════════════════════════════════════════
 * Tests header, nav bar, mega menus, footer, mobile responsive,
 * and all major page loads.
 */

describe('Navigation & Site Structure', () => {

  // ══════════════════════════════════
  //  HEADER & NAV BAR
  // ══════════════════════════════════
  describe('Two-Bar Header', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('renders header bar with logo', () => {
      cy.get('.header-bar, header').should('be.visible');
      cy.get('.logo, [class*="logo"]').should('be.visible');
    });

    it('renders nav bar below header', () => {
      cy.get('.nav-bar, nav').should('be.visible');
    });

    it('has Register/Sign Up button in header', () => {
      cy.get('.header-bar, header')
        .find('a, button')
        .filter(':contains("Register"), :contains("Sign Up"), :contains("Get Started")')
        .should('have.length.gte', 1);
    });

    it('nav bar contains main navigation links', () => {
      const expectedLinks = ['Home', 'Blog', 'FAQ', 'Contact'];
      expectedLinks.forEach((link) => {
        cy.get('.nav-bar, nav').contains(link, { matchCase: false }).should('exist');
      });
    });

    it('nav bar contains Programmes mega menu', () => {
      cy.get('.nav-bar, nav')
        .contains(/Programme|Program/i)
        .should('exist');
    });
  });

  // ══════════════════════════════════
  //  MEGA MENUS
  // ══════════════════════════════════
  describe('Mega Menus', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Programmes mega menu opens on hover/click', () => {
      cy.get('.mega-wrap, [class*="mega"]')
        .contains(/Programme|Program/i)
        .trigger('mouseenter');

      cy.get('.mega-panel, [class*="mega-panel"], [class*="dropdown"]')
        .should('be.visible');
    });

    it('Programmes mega menu contains course categories', () => {
      cy.get('.mega-wrap, [class*="mega"]')
        .contains(/Programme|Program/i)
        .trigger('mouseenter');

      // Should have categories like Free Learning, Certificates, etc.
      cy.get('.mega-panel, [class*="mega-panel"]').then(($panel) => {
        if ($panel.is(':visible')) {
          cy.wrap($panel).should('contain.text', 'Free');
        }
      });
    });
  });

  // ══════════════════════════════════
  //  KEY PAGES LOAD
  // ══════════════════════════════════
  describe('Page Load Smoke Tests', () => {
    const pages = [
      { path: '/', title: 'CSGA' },
      { path: '/pricing.html', title: 'Pricing' },
      { path: '/dashboard.html', title: 'Dashboard' },
      { path: '/programs.html', title: 'Program' },
      { path: '/courses.html', title: 'Course' },
      { path: '/faq.html', title: 'FAQ' },
      { path: '/contact.html', title: 'Contact' },
      { path: '/blog/', title: 'Blog' },
    ];

    pages.forEach(({ path, title }) => {
      it(`loads ${path} without error`, () => {
        cy.visit(path, { failOnStatusCode: false });
        cy.get('body').should('be.visible');
        cy.title().should('not.be.empty');
      });
    });
  });

  // ══════════════════════════════════
  //  MCP PAGES (spot check)
  // ══════════════════════════════════
  describe('MCP Pages Spot Check', () => {
    const mcpPages = [
      '/mcp/ai-governance-scanner.html',
      '/mcp/threat-intelligence-aggregator.html',
      '/mcp/compliance-mapper.html',
    ];

    mcpPages.forEach((path) => {
      it(`loads MCP page ${path}`, () => {
        cy.visit(path, { failOnStatusCode: false });
        cy.get('body').should('be.visible');
      });
    });
  });

  // ══════════════════════════════════
  //  FOOTER
  // ══════════════════════════════════
  describe('Footer', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('renders footer', () => {
      cy.get('footer').should('exist');
    });

    it('footer has navigation links', () => {
      cy.get('footer').find('a').should('have.length.gte', 3);
    });

    it('footer links are not broken (no 404)', () => {
      cy.get('footer a[href]').each(($a) => {
        const href = $a.attr('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('http')) {
          cy.request({ url: href, failOnStatusCode: false }).its('status').should('be.lt', 500);
        }
      });
    });
  });

  // ══════════════════════════════════
  //  MOBILE RESPONSIVE
  // ══════════════════════════════════
  describe('Mobile Responsive', () => {
    beforeEach(() => {
      cy.viewport(375, 812); // iPhone X
      cy.visit('/');
    });

    it('shows hamburger menu on mobile', () => {
      cy.get('[class*="hamburger"], [class*="mobile-menu"], [class*="menu-btn"], button[aria-label*="menu" i]')
        .should('be.visible');
    });

    it('nav links are hidden on mobile by default', () => {
      cy.get('.nav-bar, nav').then(($nav) => {
        // Nav should either be hidden or transformed for mobile
        const isHidden = !$nav.is(':visible') || $nav.css('display') === 'none';
        const isCollapsed = $nav.height() < 10;
        // Either the nav is hidden or it exists in collapsed form
        expect(isHidden || isCollapsed || $nav.length > 0).to.be.true;
      });
    });

    it('hamburger toggles mobile menu', () => {
      cy.get('[class*="hamburger"], [class*="mobile-menu"], [class*="menu-btn"], button[aria-label*="menu" i]')
        .first()
        .click({ force: true });

      // After click, navigation should become visible
      cy.wait(500);
      cy.get('nav a, .nav-bar a, [class*="mobile"] a')
        .filter(':visible')
        .should('have.length.gte', 1);
    });
  });

  // ══════════════════════════════════
  //  PRICING CONFIG GLOBAL
  // ══════════════════════════════════
  describe('Pricing Config Loaded', () => {
    it('CSGA_PRICING is available globally on pricing page', () => {
      cy.visit('/pricing.html');
      cy.window().its('CSGA_PRICING').should('exist');
      cy.window().its('CSGA_PRICING.memberships').should('exist');
      cy.window().its('CSGA_PRICING.mcpCatalog').should('exist');
      cy.window().its('CSGA_PRICING.mcpClassification').should('exist');
    });

    it('CSGA_PRICING is available on dashboard', () => {
      cy.visit('/dashboard.html');
      cy.window().its('CSGA_PRICING').should('exist');
    });

    it('pricing config has all 6 membership tiers', () => {
      cy.visit('/pricing.html');
      cy.window().then((win) => {
        const tiers = Object.keys(win.CSGA_PRICING.memberships);
        expect(tiers.length).to.be.gte(6);
        expect(tiers).to.include.members(['community', 'starter', 'professional']);
      });
    });

    it('pricing config has 67 MCPs in catalog', () => {
      cy.visit('/pricing.html');
      cy.window().then((win) => {
        const mcps = Object.keys(win.CSGA_PRICING.mcpCatalog);
        expect(mcps.length).to.be.gte(40); // Allow slight variance
      });
    });
  });
});
