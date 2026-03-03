// Dashboard Side Navigation - CSGA Global Style
// Based on csoai.org backend navigation pattern

document.addEventListener('DOMContentLoaded', function() {
  if (isDashboardPage()) {
    createDashboardSideNav();
    adjustMainContentForSideNav();
  }
});

function isDashboardPage() {
  const path = window.location.pathname;
  const isDash = path.includes('/dashboard') || 
                 path.includes('/account') || 
                 path.includes('/billing') ||
                 path.includes('/settings') ||
                 path.includes('/api-keys') ||
                 path.includes('/usage') ||
                 path.includes('/casa') ||
                 document.querySelector('[data-dashboard]') ||
                 document.querySelector('.dashboard-page');
  return isDash;
}

function createDashboardSideNav() {
  // Create side navigation container
  const sideNav = document.createElement('div');
  sideNav.id = 'dashboard-sidenav';
  sideNav.className = 'dashboard-sidenav';
  sideNav.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 280px;
    height: 100vh;
    background: linear-gradient(180deg, #0A1628 0%, #1E293B 100%);
    color: white;
    z-index: 1000;
    overflow-y: auto;
    padding: 0;
    box-shadow: 2px 0 20px rgba(0,0,0,0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  `;

  // Create navigation structure
  sideNav.innerHTML = `
    <!-- Header -->
    <div class="sidenav-header" style="
      padding: 24px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      background: rgba(0,0,0,0.2);
    ">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <img src="/assets/csga-logo-white.svg" alt="CSGA" style="width: 32px; height: 32px;" onerror="this.style.display='none'">
        <div>
          <div style="font-weight: 700; font-size: 1.1rem;">CSGA Dashboard</div>
          <div style="font-size: 0.8rem; opacity: 0.7;">Cyber Security Global Alliance</div>
        </div>
      </div>
      <div class="user-info" style="
        background: rgba(255,255,255,0.05);
        padding: 12px;
        border-radius: 8px;
        font-size: 0.85rem;
      ">
        <div style="font-weight: 600;" id="dashboard-username">Loading...</div>
        <div style="opacity: 0.7;" id="dashboard-plan">Professional Plan</div>
      </div>
    </div>

    <!-- Main Navigation -->
    <div class="sidenav-content" style="padding: 20px 0;">
      
      <!-- Overview Section -->
      <div class="nav-section">
        <div class="nav-section-title" style="
          padding: 0 20px 8px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          opacity: 0.5;
          letter-spacing: 0.5px;
        ">Overview</div>
        
        <a href="/dashboard" class="nav-item" data-nav="dashboard">
          <span class="nav-icon">📊</span>
          <span>Dashboard</span>
          <span class="nav-badge">NEW</span>
        </a>
        
        <a href="/dashboard/usage" class="nav-item" data-nav="usage">
          <span class="nav-icon">📈</span>
          <span>Usage & Analytics</span>
        </a>
        
        <a href="/dashboard/billing" class="nav-item" data-nav="billing">
          <span class="nav-icon">💳</span>
          <span>Billing & Plans</span>
        </a>
      </div>

      <!-- MCP Management -->
      <div class="nav-section">
        <div class="nav-section-title">MCP Management</div>
        
        <a href="/dashboard/mcps" class="nav-item" data-nav="mcps">
          <span class="nav-icon">🔌</span>
          <span>My MCPs</span>
          <span class="nav-count" id="mcp-count">12</span>
        </a>
        
        <a href="/dashboard/api-keys" class="nav-item" data-nav="api-keys">
          <span class="nav-icon">🔑</span>
          <span>API Keys</span>
        </a>
        
        <a href="/dashboard/integrations" class="nav-item" data-nav="integrations">
          <span class="nav-icon">🔗</span>
          <span>Integrations</span>
        </a>
        
        <a href="/mcp" class="nav-item external">
          <span class="nav-icon">🛍️</span>
          <span>MCP Marketplace</span>
          <span class="nav-external">↗</span>
        </a>
      </div>

      <!-- CASA Certification -->
      <div class="nav-section">
        <div class="nav-section-title">Constitutional AI CASA</div>
        
        <a href="/dashboard/casa" class="nav-item" data-nav="casa">
          <span class="nav-icon">🧠</span>
          <span>CASA Certification</span>
          <span class="nav-badge constitutional">AI Enhanced</span>
        </a>
        
        <a href="/dashboard/casa/progress" class="nav-item" data-nav="casa-progress">
          <span class="nav-icon">🏆</span>
          <span>Certification Progress</span>
        </a>
        
        <a href="/dashboard/casa/constitutional-ai" class="nav-item" data-nav="constitutional-ai">
          <span class="nav-icon">🎯</span>
          <span>Constitutional AI Training</span>
          <span class="nav-badge hot">HOT</span>
        </a>
      </div>

      <!-- Security & Compliance -->
      <div class="nav-section">
        <div class="nav-section-title">Security & Compliance</div>
        
        <a href="/dashboard/security" class="nav-item" data-nav="security">
          <span class="nav-icon">🔒</span>
          <span>Security Overview</span>
        </a>
        
        <a href="/dashboard/compliance" class="nav-item" data-nav="compliance">
          <span class="nav-icon">✅</span>
          <span>Compliance Status</span>
        </a>
        
        <a href="/dashboard/audit-logs" class="nav-item" data-nav="audit">
          <span class="nav-icon">📋</span>
          <span>Audit Logs</span>
        </a>
      </div>

      <!-- Team & Access -->
      <div class="nav-section">
        <div class="nav-section-title">Team & Access</div>
        
        <a href="/dashboard/team" class="nav-item" data-nav="team">
          <span class="nav-icon">👥</span>
          <span>Team Members</span>
          <span class="nav-count" id="team-count">3</span>
        </a>
        
        <a href="/dashboard/permissions" class="nav-item" data-nav="permissions">
          <span class="nav-icon">🛡️</span>
          <span>Permissions</span>
        </a>
        
        <a href="/dashboard/sso" class="nav-item" data-nav="sso">
          <span class="nav-icon">🔐</span>
          <span>SSO & SAML</span>
          <span class="nav-badge">Enterprise</span>
        </a>
      </div>

      <!-- Settings -->
      <div class="nav-section">
        <div class="nav-section-title">Settings</div>
        
        <a href="/dashboard/settings" class="nav-item" data-nav="settings">
          <span class="nav-icon">⚙️</span>
          <span>Account Settings</span>
        </a>
        
        <a href="/dashboard/notifications" class="nav-item" data-nav="notifications">
          <span class="nav-icon">🔔</span>
          <span>Notifications</span>
        </a>
        
        <a href="/dashboard/webhooks" class="nav-item" data-nav="webhooks">
          <span class="nav-icon">🪝</span>
          <span>Webhooks</span>
        </a>
      </div>

      <!-- Support -->
      <div class="nav-section">
        <div class="nav-section-title">Support</div>
        
        <a href="/dashboard/support" class="nav-item" data-nav="support">
          <span class="nav-icon">🎧</span>
          <span>Support Center</span>
        </a>
        
        <a href="/dashboard/docs" class="nav-item" data-nav="docs">
          <span class="nav-icon">📚</span>
          <span>Documentation</span>
        </a>
        
        <a href="/dashboard/status" class="nav-item" data-nav="status">
          <span class="nav-icon">💚</span>
          <span>System Status</span>
        </a>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="sidenav-footer" style="
      padding: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      margin-top: auto;
    ">
      <div style="margin-bottom: 16px;">
        <a href="/pricing" class="upgrade-button" style="
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #CC0000, #DC2626);
          color: white;
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.25s ease;
        ">
          <span>🚀</span>
          <span>Upgrade Plan</span>
        </a>
      </div>
      
      <div style="display: flex; gap: 8px; justify-content: space-between;">
        <a href="/logout" style="
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.85rem;
          padding: 8px;
          border-radius: 4px;
          transition: color 0.25s ease;
        ">Logout</a>
        
        <a href="/dashboard/help" style="
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 0.85rem;
          padding: 8px;
          border-radius: 4px;
          transition: color 0.25s ease;
        ">Help</a>
      </div>
    </div>

    <!-- Mobile Toggle -->
    <button id="mobile-nav-close" style="
      display: none;
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1.2rem;
    ">×</button>
  `;

  // Add CSS styles
  const styles = document.createElement('style');
  styles.innerHTML = `
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      transition: all 0.25s ease;
      position: relative;
    }
    
    .nav-item:hover {
      background: rgba(255,255,255,0.05);
      color: white;
    }
    
    .nav-item.active {
      background: rgba(204,0,0,0.15);
      color: white;
      border-right: 3px solid #CC0000;
    }
    
    .nav-icon {
      font-size: 1.1rem;
      min-width: 20px;
      text-align: center;
    }
    
    .nav-badge {
      margin-left: auto;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 0.7rem;
      font-weight: 600;
      background: rgba(255,255,255,0.1);
      color: white;
    }
    
    .nav-badge.constitutional {
      background: linear-gradient(135deg, #CC0000, #DC2626);
    }
    
    .nav-badge.hot {
      background: linear-gradient(135deg, #FF6B35, #F7931E);
      animation: pulse 2s ease-in-out infinite;
    }
    
    .nav-count {
      margin-left: auto;
      background: rgba(255,255,255,0.2);
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 0.7rem;
      font-weight: 600;
    }
    
    .nav-external {
      margin-left: auto;
      opacity: 0.5;
    }
    
    .nav-section {
      margin-bottom: 24px;
    }
    
    .upgrade-button:hover {
      background: linear-gradient(135deg, #AA0000, #CC0000);
      transform: translateY(-1px);
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
      #dashboard-sidenav {
        width: 100vw;
        max-width: 320px;
      }
      
      #mobile-nav-close {
        display: block !important;
      }
      
      .dashboard-main-content {
        margin-left: 0 !important;
      }
      
      .mobile-nav-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        z-index: 999;
        display: none;
      }
    }
  `;
  
  document.head.appendChild(styles);
  document.body.appendChild(sideNav);
  
  // Add mobile overlay
  const overlay = document.createElement('div');
  overlay.className = 'mobile-nav-overlay';
  overlay.onclick = closeMobileNav;
  document.body.appendChild(overlay);
  
  // Add mobile nav toggle button
  const mobileToggle = document.createElement('button');
  mobileToggle.id = 'mobile-nav-toggle';
  mobileToggle.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    background: #CC0000;
    border: none;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 1001;
    box-shadow: 0 4px 15px rgba(204,0,0,0.3);
    display: none;
  `;
  mobileToggle.innerHTML = '☰';
  mobileToggle.onclick = openMobileNav;
  document.body.appendChild(mobileToggle);
  
  // Show navigation
  setTimeout(() => {
    sideNav.style.transform = 'translateX(0)';
  }, 100);
  
  // Set active navigation item
  setActiveNavItem();
  
  // Load user info
  loadUserInfo();
  
  // Setup event listeners
  setupNavEventListeners();
}

function adjustMainContentForSideNav() {
  const mainContent = document.querySelector('main, .main-content, .container, body > div:first-of-type');
  if (mainContent) {
    mainContent.classList.add('dashboard-main-content');
    mainContent.style.cssText = `
      margin-left: 280px;
      min-height: 100vh;
      transition: margin-left 0.3s ease;
      padding: 20px;
    `;
  }
  
  // Show mobile toggle on small screens
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  function handleMobile(e) {
    const toggle = document.getElementById('mobile-nav-toggle');
    const sidenav = document.getElementById('dashboard-sidenav');
    const mainContent = document.querySelector('.dashboard-main-content');
    
    if (e.matches) {
      if (toggle) toggle.style.display = 'block';
      if (sidenav) sidenav.style.transform = 'translateX(-100%)';
      if (mainContent) mainContent.style.marginLeft = '0';
    } else {
      if (toggle) toggle.style.display = 'none';
      if (sidenav) sidenav.style.transform = 'translateX(0)';
      if (mainContent) mainContent.style.marginLeft = '280px';
    }
  }
  
  mediaQuery.addListener(handleMobile);
  handleMobile(mediaQuery);
}

function setActiveNavItem() {
  const path = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-item[data-nav]');
  
  navItems.forEach(item => {
    const nav = item.getAttribute('data-nav');
    if (path.includes(nav) || (nav === 'dashboard' && path === '/dashboard')) {
      item.classList.add('active');
    }
  });
}

function loadUserInfo() {
  // Simulate loading user info
  setTimeout(() => {
    document.getElementById('dashboard-username').textContent = 'John Smith';
    document.getElementById('dashboard-plan').textContent = 'Professional Plan';
    document.getElementById('mcp-count').textContent = '12';
    document.getElementById('team-count').textContent = '3';
  }, 500);
}

function setupNavEventListeners() {
  // Close mobile nav
  const closeBtn = document.getElementById('mobile-nav-close');
  if (closeBtn) closeBtn.onclick = closeMobileNav;
  
  // Nav item clicks
  document.querySelectorAll('.nav-item:not(.external)').forEach(item => {
    item.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        setTimeout(closeMobileNav, 100);
      }
    });
  });
}

function openMobileNav() {
  const sidenav = document.getElementById('dashboard-sidenav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  
  if (sidenav) sidenav.style.transform = 'translateX(0)';
  if (overlay) overlay.style.display = 'block';
}

function closeMobileNav() {
  const sidenav = document.getElementById('dashboard-sidenav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  
  if (sidenav) sidenav.style.transform = 'translateX(-100%)';
  if (overlay) overlay.style.display = 'none';
}

// Auto-apply to dashboard pages
if (isDashboardPage()) {
  console.log('🎯 Dashboard side navigation loaded');
}