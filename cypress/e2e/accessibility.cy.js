import 'cypress-axe'

describe('WCAG 2.1 AA Accessibility Compliance', () => {
  const criticalPages = [
    { path: '/', name: 'Homepage' },
    { path: '/pricing.html', name: 'Pricing' },
    { path: '/catalog.html', name: 'Catalog' },
    { path: '/about.html', name: 'About' },
    { path: '/contact.html', name: 'Contact' },
    { path: '/dashboard.html', name: 'Dashboard' },
    { path: '/solutions.html', name: 'Solutions' },
    { path: '/mcp/index.html', name: 'MCP Directory' }
  ]

  criticalPages.forEach(({ path, name }) => {
    it(`${name} (${path}) meets WCAG 2.1 AA standards`, () => {
      cy.visit(path)
      cy.injectAxe()
      cy.checkA11y(null, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa']
        }
      }, (violations) => {
        if (violations.length) {
          const violationData = violations.map(({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            nodes: nodes.length
          }))
          cy.task('log', `${name}: ${violations.length} violations found`)
          cy.task('log', JSON.stringify(violationData, null, 2))
        }
      })
    })

    it(`${name} has proper heading hierarchy`, () => {
      cy.visit(path)
      cy.get('h1').should('have.length.gte', 1)
    })

    it(`${name} images have alt text`, () => {
      cy.visit(path)
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt')
      })
    })
  })

  describe('Keyboard Navigation', () => {
    it('Homepage skip links and focus management', () => {
      cy.visit('/')
      cy.get('body').tab()
      cy.focused().should('exist')
    })

    it('All interactive elements are keyboard accessible', () => {
      cy.visit('/')
      cy.get('a, button, input, select, textarea').each(($el) => {
        expect($el).to.have.css('outline-style').not.equal('none')
      })
    })
  })

  describe('Color Contrast', () => {
    criticalPages.slice(0, 3).forEach(({ path, name }) => {
      it(`${name} meets color contrast requirements`, () => {
        cy.visit(path)
        cy.injectAxe()
        cy.checkA11y(null, {
          runOnly: {
            type: 'rule',
            values: ['color-contrast']
          }
        })
      })
    })
  })
})
