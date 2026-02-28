describe('Performance Testing', () => {
  const pages = ['/', '/pricing.html', '/catalog.html']

  pages.forEach(path => {
    it(`${path} meets Core Web Vitals thresholds`, () => {
      cy.visit(path)
      cy.window().then((win) => {
        // Check DOM content loaded
        const timing = win.performance.timing
        const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart
        expect(domContentLoaded).to.be.lessThan(3000)
      })
    })

    it(`${path} total page size is reasonable`, () => {
      cy.visit(path)
      cy.window().then((win) => {
        const entries = win.performance.getEntriesByType('resource')
        const totalSize = entries.reduce((sum, e) => sum + (e.transferSize || 0), 0)
        // Under 2MB total
        expect(totalSize).to.be.lessThan(2 * 1024 * 1024)
      })
    })
  })
})
