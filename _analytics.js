// Google Analytics 4 Configuration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Replace with actual GA4 measurement ID
gtag('config', 'G-MEASUREMENT_ID');

// Track MCP page views
gtag('event', 'page_view', {
  page_title: document.title,
  page_location: window.location.href,
  content_group1: 'MCP Catalog'
});

// Track Stripe checkout events
document.addEventListener('DOMContentLoaded', function() {
    const checkoutButtons = document.querySelectorAll('.stripe-checkout');
    checkoutButtons.forEach(button => {
        button.addEventListener('click', function() {
            gtag('event', 'begin_checkout', {
                currency: 'USD',
                value: parseFloat(this.dataset.price) || 0,
                content_type: 'product',
                content_id: this.dataset.priceId
            });
        });
    });
});
