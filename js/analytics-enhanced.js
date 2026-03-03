// Enhanced Analytics - CSGA Global

(function() {
  'use strict';
  
  // Enhanced Google Analytics 4 configuration
  if (typeof gtag !== 'undefined') {
    // Custom events for CSGA tracking
    const trackCustomEvents = () => {
      // Track CTA interactions
      document.querySelectorAll('.cta-button, .btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
          gtag('event', 'cta_interaction', {
            'cta_text': btn.textContent.trim(),
            'page_location': window.location.href,
            'event_category': 'engagement'
          });
        });
      });
      
      // Track CASA certification interest
      document.querySelectorAll('a[href*="casa"]').forEach(link => {
        link.addEventListener('click', () => {
          gtag('event', 'casa_interest', {
            'link_text': link.textContent.trim(),
            'event_category': 'conversion'
          });
        });
      });
      
      // Track MCP marketplace visits
      document.querySelectorAll('a[href*="mcp"]').forEach(link => {
        link.addEventListener('click', () => {
          gtag('event', 'mcp_interest', {
            'link_text': link.textContent.trim(),
            'event_category': 'engagement'
          });
        });
      });
      
      // Track scroll depth
      let maxScroll = 0;
      window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
          maxScroll = scrollPercent;
          gtag('event', 'scroll_depth', {
            'scroll_percentage': scrollPercent,
            'event_category': 'engagement'
          });
        }
      }, 100));
      
      // Track time on page
      let startTime = Date.now();
      window.addEventListener('beforeunload', () => {
        const timeOnPage = Date.now() - startTime;
        gtag('event', 'time_on_page', {
          'time_seconds': Math.round(timeOnPage / 1000),
          'event_category': 'engagement'
        });
      });
    };
    
    // Initialize custom tracking
    document.addEventListener('DOMContentLoaded', trackCustomEvents);
  }
  
  // Performance tracking
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.timing;
        const metrics = {
          pageLoadTime: perfData.loadEventEnd - perfData.navigationStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
        };
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'page_performance', {
            'load_time': Math.round(metrics.pageLoadTime),
            'dom_load_time': Math.round(metrics.domContentLoaded),
            'first_paint': Math.round(metrics.firstPaint),
            'event_category': 'performance'
          });
        }
      }, 0);
    });
  }
  
  // Error tracking
  window.addEventListener('error', (error) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'javascript_error', {
        'error_message': error.message,
        'error_filename': error.filename,
        'error_lineno': error.lineno,
        'event_category': 'error'
      });
    }
  });
  
  // Utility function for throttling
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
})();
