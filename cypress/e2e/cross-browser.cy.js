describe('Cross-Browser Compatibility', () => {
  const pages = ['/', '/pricing.html', '/catalog.html', '/mcp/index.html']

  pages.forEach(path => {
    it(`${path} renders without JS errors`, () => {
      cy.visit(path)
      cy.window().then((win) => {
        cy.spy(win.console, 'error').as('consoleError')
      })
      cy.get('@consoleError').should('not.have.been.called')
    })

    it(`${path} has responsive viewport support`, () => {
      // Mobile
      cy.viewport(375, 812)
      cy.visit(path)
      cy.get('body').should('be.visible')

      // Tablet
      cy.viewport(768, 1024)
      cy.get('body').should('be.visible')

      // Desktop
      cy.viewport(1440, 900)
      cy.get('body').should('be.visible')
    })

    it(`${path} loads within performance budget`, () => {
      cy.visit(path)
      cy.window().then((win) => {
        const perf = win.performance.timing
        const loadTime = perf.loadEventEnd - perf.navigationStart
        expect(loadTime).to.be.lessThan(5000)
      })
    })
  })
})
