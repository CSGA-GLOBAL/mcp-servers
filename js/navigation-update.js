// Update navigation menus to include partners properly
document.addEventListener('DOMContentLoaded', function() {
  // Find navigation menus
  const navMenus = document.querySelectorAll('nav ul, .nav-menu, .main-nav');
  
  navMenus.forEach(nav => {
    // Check if partners link exists
    const partnersLink = nav.querySelector('a[href*="partners"]');
    
    if (!partnersLink) {
      // Add partners link
      const partnersItem = document.createElement('li');
      partnersItem.innerHTML = `
        <a href="/partners" style="
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          color: #0a1628;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.25s ease;
        ">
          🤝 Partners
        </a>
      `;
      
      // Insert before last item (usually contact)
      const lastItem = nav.lastElementChild;
      if (lastItem) {
        nav.insertBefore(partnersItem, lastItem);
      } else {
        nav.appendChild(partnersItem);
      }
    }
    
    // Remove any "accreditations" text from partners links
    const allLinks = nav.querySelectorAll('a');
    allLinks.forEach(link => {
      if (link.textContent.toLowerCase().includes('accreditation')) {
        link.textContent = link.textContent.replace(/accreditation[s]?/gi, '').trim();
        if (!link.textContent) {
          link.textContent = 'Partners';
        }
      }
    });
  });
});
