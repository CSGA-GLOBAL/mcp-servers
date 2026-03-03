
// Dashboard navigation integration
document.addEventListener('DOMContentLoaded', function() {
  // Auto-load dashboard navigation on relevant pages
  const dashboardPages = ['/dashboard', '/account', '/billing', '/settings', '/api-keys', '/usage', '/casa'];
  const currentPath = window.location.pathname;
  const isDashboardPage = dashboardPages.some(page => currentPath.includes(page)) ||
                          document.querySelector('[data-dashboard]') ||
                          document.querySelector('.dashboard-page');
  
  if (isDashboardPage) {
    // Load dashboard navigation script
    const dashNavScript = document.createElement('script');
    dashNavScript.src = '/js/dashboard-nav.js';
    dashNavScript.onload = function() {
      console.log('🎯 Dashboard navigation loaded');
    };
    document.head.appendChild(dashNavScript);
  }
});
