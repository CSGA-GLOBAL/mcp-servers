// Advanced Performance Enhancements - CSGA Global

document.addEventListener('DOMContentLoaded', function() {
  initPerformanceOptimizations();
  initAdvancedCaching();
  initImageOptimizations();
  initCriticalResourceHints();
});

function initPerformanceOptimizations() {
  // Preload critical resources
  const criticalResources = [
    { href: '/css/csga-branding.css', as: 'style' },
    { href: '/js/constitutional-ai-enhancements.js', as: 'script' },
    { href: '/assets/csga-logo-white.svg', as: 'image' }
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
  
  // Resource prioritization
  const scriptTags = document.querySelectorAll('script[src]');
  scriptTags.forEach(script => {
    if (script.src.includes('advanced-enhancements') || 
        script.src.includes('constitutional-ai')) {
      script.fetchPriority = 'high';
    }
  });
}

function initAdvancedCaching() {
  // Service Worker registration for advanced caching
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('⚡ Service Worker registered:', registration);
        
        // Update handling
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              showUpdateNotification();
            }
          });
        });
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  }
  
  // localStorage caching for API responses
  const cachedData = {
    set: (key, data, expiry = 3600000) => { // 1 hour default
      const item = {
        data: data,
        timestamp: Date.now(),
        expiry: expiry
      };
      localStorage.setItem(`csga_${key}`, JSON.stringify(item));
    },
    
    get: (key) => {
      const item = localStorage.getItem(`csga_${key}`);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      if (Date.now() - parsed.timestamp > parsed.expiry) {
        localStorage.removeItem(`csga_${key}`);
        return null;
      }
      
      return parsed.data;
    }
  };
  
  window.CSGACache = cachedData;
}

function initImageOptimizations() {
  // Advanced lazy loading with intersection observer
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Load image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
        }
        
        // Load srcset if available
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.1
  });
  
  // Observe all lazy images
  document.querySelectorAll('img[data-src], img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
  
  // WebP support detection and replacement
  function supportsWebP() {
    return new Promise(resolve => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
  
  supportsWebP().then(supported => {
    if (supported) {
      document.documentElement.classList.add('webp-supported');
    }
  });
}

function initCriticalResourceHints() {
  // DNS prefetch for external domains
  const externalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'api.csga-global.org'
  ];
  
  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
  
  // Preconnect to critical domains
  const criticalDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];
  
  criticalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `//${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
  
  // Module preload for critical JavaScript
  const criticalModules = [
    '/js/advanced-enhancements.js',
    '/js/constitutional-ai-enhancements.js'
  ];
  
  criticalModules.forEach(module => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = module;
    document.head.appendChild(link);
  });
}

function showUpdateNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #cc0000, #dc2626);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(204, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 600;
    animation: slideInRight 0.5s ease;
    cursor: pointer;
  `;
  notification.innerHTML = `
    <div style="margin-bottom: 8px;">🔄 Update Available</div>
    <div style="font-size: 0.85rem; opacity: 0.9;">Click to refresh for the latest features</div>
  `;
  
  notification.addEventListener('click', () => {
    window.location.reload();
  });
  
  document.body.appendChild(notification);
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 10000);
}

// Performance monitoring
function monitorPerformance() {
  if (!('performance' in window)) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const metrics = {
        pageLoadTime: perfData.loadEventEnd - perfData.navigationStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
      };
      
      console.group('🚀 CSGA Performance Metrics');
      console.log('Page Load Time:', metrics.pageLoadTime + 'ms');
      console.log('DOM Content Loaded:', metrics.domContentLoaded + 'ms');
      console.log('First Paint:', metrics.firstPaint.toFixed(2) + 'ms');
      console.log('First Contentful Paint:', metrics.firstContentfulPaint.toFixed(2) + 'ms');
      console.groupEnd();
      
      // Send metrics to analytics (if configured)
      if (window.gtag) {
        gtag('event', 'timing_complete', {
          'name': 'page_load',
          'value': Math.round(metrics.pageLoadTime)
        });
      }
    }, 0);
  });
}

monitorPerformance();

// Export for debugging
window.CSGAPerformance = {
  cache: window.CSGACache,
  version: '1.0.0'
};
