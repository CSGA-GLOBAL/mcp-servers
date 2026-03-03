// Automatically add dashboard navigation to all dashboard pages
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a dashboard page
  const isDashboard = window.location.pathname.includes('/dashboard') ||
                     document.querySelector('[data-dashboard]') ||
                     document.querySelector('.dashboard-page') ||
                     document.body.classList.contains('dashboard');
  
  if (isDashboard) {
    // Load dashboard navigation
    const script = document.createElement('script');
    script.src = '/js/dashboard-nav.js';
    document.head.appendChild(script);
    
    // Add dashboard class to body
    document.body.classList.add('dashboard-page');
  }
});
