/**
 * CSGA Global — Complete Product Catalog & Pricing Configuration
 * ══════════════════════════════════════════════════════════════
 * Single source of truth for all Stripe products, prices, memberships,
 * individual MCP pricing (LVP/MVP/HVP), ecosystem bundles, COBOL Bridge,
 * CASA certifications, credit packs, and usage-based overage billing.
 *
 * SETUP: Replace all 'price_*' / 'prod_*' placeholders with real Stripe IDs
 *        from your Stripe Dashboard → Products → Prices
 */

const CSGA_PRICING = {

  // ═══════════════════════════════════════════════════════════
  //  STRIPE CONFIGURATION
  // ═══════════════════════════════════════════════════════════
  stripe: {
    publishableKey: 'pk_live_REPLACE_WITH_YOUR_KEY',
    testKey: 'pk_test_REPLACE_WITH_YOUR_KEY',
    apiBase: '/api',
    endpoints: {
      checkout: '/api/create-checkout-session',
      portal: '/api/customer-portal',
      webhook: '/api/stripe-webhook',
      usage: '/api/usage',
    },
    successUrl: (typeof window !== 'undefined' ? window.location.origin : '') + '/dashboard?session_id={CHECKOUT_SESSION_ID}',
    cancelUrl: (typeof window !== 'undefined' ? window.location.origin : '') + '/pricing',
    mode: 'live', // 'test' | 'live'
  },

  // ═══════════════════════════════════════════════════════════
  //  MEMBERSHIP TIERS (Profitability-Optimised)
  // ═══════════════════════════════════════════════════════════
  memberships: {
    community: {
      name: 'Community',
      icon: '🌐',
      tier: 'community',
      mcpCount: 3,
      monthlyPrice: 0,
      annualPrice: 0,
      credits: 100,
      teamMembers: 1,
      support: 'Community Discord',
      trialDays: 0,
      overageRate: null, // No overages on free
      stripeProd: 'prod_membership_community',
      stripePriceMonthly: null,
      stripePriceAnnual: null,
      features: [
        '3 Core MCPs (Governance, Standards, OneOS)',
        '100 API credits/month',
        'Community Discord access',
        'Basic documentation',
        'No credit card required',
      ],
      includedMcps: ['csoai-governance', 'csga-standards', 'oneos-education'],
    },

    starter: {
      name: 'Starter',
      icon: '🚀',
      tier: 'starter',
      mcpCount: 5,
      monthlyPrice: 79,
      annualPrice: 759,
      credits: 2500,
      teamMembers: 3,
      support: 'Email (48h SLA)',
      trialDays: 14,
      overageRate: 0.20, // $0.20 per 1,000 calls
      stripeProd: 'prod_membership_starter',
      stripePriceMonthly: 'price_starter_monthly',
      stripePriceAnnual: 'price_starter_annual',
      features: [
        '5 MCPs (any LVP/MVP combination)',
        '2,500 API credits/month',
        'Email support (48h SLA)',
        'Standard documentation',
        'Monthly webinars',
        '14-day free trial',
        'Up to 3 team members',
        'Overage: $0.20/1,000 calls',
      ],
    },

    professional: {
      name: 'Professional',
      icon: '⚡',
      tier: 'professional',
      mcpCount: 12,
      monthlyPrice: 199,
      annualPrice: 1910,
      credits: 10000,
      teamMembers: 10,
      support: 'Priority Email (24h SLA)',
      trialDays: 14,
      overageRate: 0.15,
      stripeProd: 'prod_membership_professional',
      stripePriceMonthly: 'price_professional_monthly',
      stripePriceAnnual: 'price_professional_annual',
      featured: true, // Show as "Most Popular"
      features: [
        '12 MCPs (any sector, LVP/MVP/HVP mix)',
        '10,000 API credits/month',
        'Priority email (24h SLA)',
        'Full documentation + code samples',
        'Weekly webinars + 1:1 onboarding',
        '14-day free trial',
        'Up to 10 team members',
        'Custom workflows & API access',
        'Overage: $0.15/1,000 calls',
      ],
    },

    enterpriseSector: {
      name: 'Enterprise Sector',
      icon: '🏢',
      tier: 'enterprise_sector',
      mcpCount: -1, // All in one sector
      monthlyPrice: 499,
      annualPrice: 4790,
      credits: 50000,
      teamMembers: 25,
      support: 'Dedicated Slack (8h SLA)',
      trialDays: 30,
      overageRate: 0.12,
      stripeProd: 'prod_membership_enterprise_sector',
      stripePriceMonthly: 'price_enterprise_sector_monthly',
      stripePriceAnnual: 'price_enterprise_sector_annual',
      features: [
        'All MCPs in 1 sector',
        '50,000 API credits/month',
        'Dedicated Slack channel',
        '8h SLA support',
        'Custom integrations',
        'Quarterly business reviews',
        '30-day free trial',
        'Up to 25 team members',
        'Overage: $0.12/1,000 calls',
      ],
    },

    enterpriseFull: {
      name: 'Enterprise Full',
      icon: '🛡️',
      tier: 'enterprise_full',
      mcpCount: 34,
      monthlyPrice: 1499,
      annualPrice: 14390,
      credits: 250000,
      teamMembers: -1, // Unlimited
      support: 'Dedicated CSM (4h SLA)',
      trialDays: 30,
      overageRate: 0.10,
      stripeProd: 'prod_membership_enterprise_full',
      stripePriceMonthly: 'price_enterprise_full_monthly',
      stripePriceAnnual: 'price_enterprise_full_annual',
      features: [
        'All 34 MCPs + AI Economy Infra',
        '250,000 API credits/month',
        'Dedicated CSM',
        '4h SLA support',
        'Custom development (10 hrs/quarter)',
        'On-site training (1 day/quarter)',
        '30-day free trial',
        'Unlimited team members',
        'SSO/SAML, audit logs',
        'Overage: $0.10/1,000 calls',
      ],
    },

    enterpriseCustom: {
      name: 'Enterprise Custom',
      icon: '🔷',
      tier: 'enterprise_custom',
      mcpCount: -1,
      monthlyPrice: null, // Custom ($2,499+ starting)
      annualPrice: null,
      startingPrice: 2499,
      credits: -1, // Unlimited
      teamMembers: -1,
      support: '24/7 Phone + On-site',
      trialDays: 30,
      overageRate: null,
      stripeProd: null, // Custom quotes
      stripePriceMonthly: null,
      stripePriceAnnual: null,
      features: [
        'Everything in Enterprise Full',
        'COBOL Bridge integration',
        'Unlimited API calls',
        'Custom MCP development',
        '24/7 phone support',
        'On-site support available',
        'SLA guarantees',
        'Air-gapped / sovereign deployment',
        'Security clearance teams',
        'FedRAMP-aligned infrastructure',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  MCP CLASSIFICATION (LVP / MVP / HVP)
  // ═══════════════════════════════════════════════════════════
  mcpClassification: {
    // LVP — Low Value Products ($9/mo, 1,000 calls)
    lvp: {
      monthlyPrice: 9,
      annualPrice: 87,
      credits: 1000,
      label: 'LVP',
      description: 'Individual dev / learning',
      stripePriceMonthly: 'price_mcp_lvp_monthly',
      stripePriceAnnual: 'price_mcp_lvp_annual',
      color: '#22C55E',
    },
    // MVP — Medium Value Products ($29/mo, 5,000 calls)
    mvp: {
      monthlyPrice: 29,
      annualPrice: 279,
      credits: 5000,
      label: 'MVP',
      description: 'Small teams / startups',
      stripePriceMonthly: 'price_mcp_mvp_monthly',
      stripePriceAnnual: 'price_mcp_mvp_annual',
      color: '#3B82F6',
    },
    // HVP — High Value Products ($79/mo, 15,000 calls)
    hvp: {
      monthlyPrice: 79,
      annualPrice: 759,
      credits: 15000,
      label: 'HVP',
      description: 'Enterprise / regulated',
      stripePriceMonthly: 'price_mcp_hvp_monthly',
      stripePriceAnnual: 'price_mcp_hvp_annual',
      color: '#A855F7',
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  COMPLETE MCP CATALOG (34 Governance + 13 DevTools = 47)
  // ═══════════════════════════════════════════════════════════
  mcpCatalog: {
    // ── CORE TIER (All memberships) ──────────────────────
    'csoai-governance':      { name: 'CSOAI Governance',      class: 'mvp', sector: 'core', stripeProd: 'prod_governance' },
    'casa-certification':    { name: 'CASA Certification',     class: 'hvp', sector: 'core', stripeProd: 'prod_casa' },
    'csga-standards':        { name: 'CSGA Standards',         class: 'mvp', sector: 'core', stripeProd: 'prod_standards' },
    'proofof-ai':            { name: 'PROOFOF.ai',             class: 'mvp', sector: 'core', stripeProd: 'prod_proofof' },
    'oneos-education':       { name: 'OneOS Education',        class: 'lvp', sector: 'core', stripeProd: 'prod_oneos_edu' },
    'quantranet-pqc':        { name: 'QuantraNet PQC',         class: 'hvp', sector: 'core', stripeProd: 'prod_quantum' },
    'terranova-defence':     { name: 'Terranova Defence',      class: 'hvp', sector: 'core', stripeProd: 'prod_defence' },
    'bmcc-cyber':            { name: 'BMCC Cyber',             class: 'lvp', sector: 'core', stripeProd: 'prod_bmcc' },
    'thn-global':            { name: 'THN Global Pharma',      class: 'hvp', sector: 'core', stripeProd: 'prod_pharma' },
    'digital-human-library': { name: 'Digital Human Library',  class: 'lvp', sector: 'core', stripeProd: 'prod_dhl' },
    'ai-economy-infra':      { name: 'AI Economy Infra',       class: 'hvp', sector: 'core', stripeProd: 'prod_metaserver' },

    // ── T1 SECTOR (Professional+) ───────────────────────
    'healthcare-ai':         { name: 'Healthcare AI',          class: 'hvp', sector: 't1', stripeProd: 'prod_healthcare' },
    'financial-ai':          { name: 'Financial AI',           class: 'hvp', sector: 't1', stripeProd: 'prod_finance' },
    'biometrics-ai':         { name: 'Biometrics AI',          class: 'hvp', sector: 't1', stripeProd: 'prod_biometrics' },
    'employment-ai':         { name: 'Employment AI',          class: 'mvp', sector: 't1', stripeProd: 'prod_employment' },
    'law-enforcement-ai':    { name: 'Law Enforcement AI',     class: 'hvp', sector: 't1', stripeProd: 'prod_law' },

    // ── T2 SECTOR (Starter+) ────────────────────────────
    'gaming-ai':             { name: 'Gaming AI',              class: 'mvp', sector: 't2', stripeProd: 'prod_gaming' },
    'autonomous-vehicles':   { name: 'Autonomous Vehicles',    class: 'hvp', sector: 't2', stripeProd: 'prod_auto' },
    'insurance-ai':          { name: 'Insurance AI',           class: 'mvp', sector: 't2', stripeProd: 'prod_insurance' },
    'telecom-ai':            { name: 'Telecom AI',             class: 'mvp', sector: 't2', stripeProd: 'prod_telecom' },
    'energy-ai':             { name: 'Energy AI',              class: 'mvp', sector: 't2', stripeProd: 'prod_energy' },
    'real-estate-ai':        { name: 'Real Estate AI',         class: 'lvp', sector: 't2', stripeProd: 'prod_realestate' },
    'retail-ai':             { name: 'Retail AI',              class: 'lvp', sector: 't2', stripeProd: 'prod_retail' },

    // ── T3 SECTOR (Individual purchase) ─────────────────
    'media-ads-ai':          { name: 'Media & Ads AI',         class: 'lvp', sector: 't3', stripeProd: 'prod_media' },
    'agriculture-ai':        { name: 'Agriculture AI',         class: 'lvp', sector: 't3', stripeProd: 'prod_agri' },
    'construction-ai':       { name: 'Construction AI',        class: 'lvp', sector: 't3', stripeProd: 'prod_construction' },
    'supply-chain-ai':       { name: 'Supply Chain AI',        class: 'mvp', sector: 't3', stripeProd: 'prod_supplychain' },
    'legal-tech-ai':         { name: 'Legal Tech AI',          class: 'mvp', sector: 't3', stripeProd: 'prod_legal' },
    'sports-analytics-ai':   { name: 'Sports Analytics',       class: 'lvp', sector: 't3', stripeProd: 'prod_sports' },
    'travel-hospitality-ai': { name: 'Travel AI',              class: 'lvp', sector: 't3', stripeProd: 'prod_travel' },

    // ── T4 SECTOR (Enterprise only) ─────────────────────
    'space-ai':              { name: 'Space AI',               class: 'hvp', sector: 't4', stripeProd: 'prod_space' },
    'mining-ai':             { name: 'Mining AI',              class: 'mvp', sector: 't4', stripeProd: 'prod_mining' },
    'maritime-ai':           { name: 'Maritime AI',            class: 'mvp', sector: 't4', stripeProd: 'prod_maritime' },
    'smart-cities-ai':       { name: 'Smart Cities AI',        class: 'mvp', sector: 't4', stripeProd: 'prod_smartcities' },

    // ── DEV TOOLS (Included based on membership tier) ───
    'context7-docs':         { name: 'Context7 Docs',          class: 'lvp', sector: 'devtools', stripeProd: null },
    'sqlite-db':             { name: 'SQLite DB',              class: 'lvp', sector: 'devtools', stripeProd: null },
    'time-zones':            { name: 'Time Zones',             class: 'lvp', sector: 'devtools', stripeProd: null },
    'fetch-http':            { name: 'Fetch HTTP',             class: 'lvp', sector: 'devtools', stripeProd: null },
    'playwright-browser':    { name: 'Playwright Browser',     class: 'lvp', sector: 'devtools', stripeProd: null },
    'sequential-thinking':   { name: 'Sequential Thinking',    class: 'lvp', sector: 'devtools', stripeProd: null },
    'memory-graph':          { name: 'Memory Graph',           class: 'lvp', sector: 'devtools', stripeProd: null },
    'git-operations':        { name: 'Git Operations',         class: 'lvp', sector: 'devtools', stripeProd: null },
    'json-transformer':      { name: 'JSON Transformer',       class: 'lvp', sector: 'devtools', stripeProd: null },
    'puppeteer-headless':    { name: 'Puppeteer Headless',     class: 'lvp', sector: 'devtools', stripeProd: null },
    'filesystem-ops':        { name: 'Filesystem Ops',         class: 'lvp', sector: 'devtools', stripeProd: null },
    'csv-analytics':         { name: 'CSV Analytics',          class: 'lvp', sector: 'devtools', stripeProd: null },
    'google-drive':          { name: 'Google Drive',           class: 'lvp', sector: 'devtools', stripeProd: null },
    'brave-search':          { name: 'Brave Search',           class: 'lvp', sector: 'devtools', stripeProd: null },
    'sentry-monitoring':     { name: 'Sentry Monitoring',      class: 'lvp', sector: 'devtools', stripeProd: null },
    'vercel-deploy':         { name: 'Vercel Deploy',          class: 'lvp', sector: 'devtools', stripeProd: null },
    'aws-cloud':             { name: 'AWS Cloud',              class: 'mvp', sector: 'devtools', stripeProd: null },
    'gitlab-api':            { name: 'GitLab API',             class: 'lvp', sector: 'devtools', stripeProd: null },
    'postgres-db':           { name: 'Postgres DB',            class: 'lvp', sector: 'devtools', stripeProd: null },
    'docker-compose':        { name: 'Docker Compose',         class: 'lvp', sector: 'devtools', stripeProd: null },
    'notion-workspace':      { name: 'Notion Workspace',       class: 'lvp', sector: 'devtools', stripeProd: null },
    'slack-messaging':       { name: 'Slack Messaging',        class: 'lvp', sector: 'devtools', stripeProd: null },
    'linear-issues':         { name: 'Linear Issues',          class: 'lvp', sector: 'devtools', stripeProd: null },
    'github-api':            { name: 'GitHub API',             class: 'lvp', sector: 'devtools', stripeProd: null },
    'pmcp-gateway':          { name: 'PMCP Gateway',           class: 'hvp', sector: 'devtools', stripeProd: null },
  },

  // ═══════════════════════════════════════════════════════════
  //  LEGACY TIER MAPPING (for existing MCP page widgets)
  //  Maps MCP slug → old tier name (free/pro/enterprise)
  // ═══════════════════════════════════════════════════════════
  mcpTiers: {
    // Free Tier (12 devtools)
    'context7-docs': 'free', 'sqlite-db': 'free', 'time-zones': 'free',
    'fetch-http': 'free', 'playwright-browser': 'free', 'sequential-thinking': 'free',
    'memory-graph': 'free', 'git-operations': 'free', 'json-transformer': 'free',
    'puppeteer-headless': 'free', 'filesystem-ops': 'free', 'csv-analytics': 'free',
    // Pro Tier (12 devtools + T2)
    'google-drive': 'pro', 'brave-search': 'pro', 'sentry-monitoring': 'pro',
    'vercel-deploy': 'pro', 'aws-cloud': 'pro', 'gitlab-api': 'pro',
    'postgres-db': 'pro', 'docker-compose': 'pro', 'notion-workspace': 'pro',
    'slack-messaging': 'pro', 'linear-issues': 'pro', 'github-api': 'pro',
    // Enterprise Tier (23 governance MCPs)
    'travel-hospitality-ai': 'enterprise', 'real-estate-ai': 'enterprise',
    'retail-ai': 'enterprise', 'data-classification': 'enterprise',
    'dsrb-defence': 'enterprise', 'supply-chain-ai': 'enterprise',
    'terranova-defence': 'enterprise', 'compliance-audit': 'enterprise',
    'secure-comms': 'enterprise', 'threat-intelligence': 'enterprise',
    'space-ai': 'enterprise', 'smart-cities-ai': 'enterprise',
    'red-team-ops': 'enterprise', 'telecom-ai': 'enterprise',
    'sports-analytics-ai': 'enterprise', 'quantranet-pqc': 'enterprise',
    'pmcp-gateway': 'enterprise', 'cloud-security': 'enterprise',
    'ai-governance': 'enterprise', 'thn-global': 'enterprise',
    'incident-response': 'enterprise', 'policy-engine': 'enterprise',
    'vulnerability-scanner': 'enterprise',
  },

  // ═══════════════════════════════════════════════════════════
  //  ECOSYSTEM BUNDLES (Sector-based packages)
  // ═══════════════════════════════════════════════════════════
  ecosystems: {
    security: {
      name: 'Security & Compliance Suite',
      icon: '🔒',
      monthlyPrice: 149,
      annualPrice: 1499,
      credits: 25000,
      stripeProd: 'prod_eco_security',
      stripePriceMonthly: 'price_eco_security_monthly',
      stripePriceAnnual: 'price_eco_security_annual',
      mcps: [
        'threat-intelligence', 'vulnerability-scanner', 'compliance-audit',
        'incident-response', 'cloud-security', 'data-classification',
        'red-team-ops', 'secure-comms', 'policy-engine',
      ],
      description: '9 security MCPs with 25,000 API credits/month',
    },
    governance: {
      name: 'AI Governance Suite',
      icon: '⚖️',
      monthlyPrice: 99,
      annualPrice: 999,
      credits: 15000,
      stripeProd: 'prod_eco_governance',
      stripePriceMonthly: 'price_eco_governance_monthly',
      stripePriceAnnual: 'price_eco_governance_annual',
      mcps: [
        'ai-governance', 'policy-engine', 'compliance-audit',
        'data-classification', 'dsrb-defence',
      ],
      description: '5 governance MCPs with 15,000 API credits/month',
    },
    devops: {
      name: 'Cloud & DevOps Suite',
      icon: '☁️',
      monthlyPrice: 79,
      annualPrice: 799,
      credits: 15000,
      stripeProd: 'prod_eco_devops',
      stripePriceMonthly: 'price_eco_devops_monthly',
      stripePriceAnnual: 'price_eco_devops_annual',
      mcps: [
        'aws-cloud', 'docker-compose', 'vercel-deploy', 'github-api',
        'gitlab-api', 'sentry-monitoring',
      ],
      description: '6 DevOps MCPs with 15,000 API credits/month',
    },
    defence: {
      name: 'Defence & Sovereign Suite',
      icon: '🎖️',
      monthlyPrice: 199,
      annualPrice: 1999,
      credits: 30000,
      stripeProd: 'prod_eco_defence',
      stripePriceMonthly: 'price_eco_defence_monthly',
      stripePriceAnnual: 'price_eco_defence_annual',
      mcps: [
        'terranova-defence', 'dsrb-defence', 'quantranet-pqc',
        'thn-global', 'secure-comms', 'red-team-ops',
      ],
      description: '6 defence MCPs with 30,000 API credits/month + CASA-CA30',
    },
    industry: {
      name: 'Industry Verticals Suite',
      icon: '🏭',
      monthlyPrice: 129,
      annualPrice: 1299,
      credits: 20000,
      stripeProd: 'prod_eco_industry',
      stripePriceMonthly: 'price_eco_industry_monthly',
      stripePriceAnnual: 'price_eco_industry_annual',
      mcps: [
        'real-estate-ai', 'retail-ai', 'telecom-ai', 'supply-chain-ai',
        'space-ai', 'smart-cities-ai', 'sports-analytics-ai',
        'travel-hospitality-ai',
      ],
      description: '8 industry MCPs with 20,000 API credits/month',
    },
    data: {
      name: 'Data & Analytics Suite',
      icon: '📊',
      monthlyPrice: 39,
      annualPrice: 389,
      credits: 10000,
      stripeProd: 'prod_eco_data',
      stripePriceMonthly: 'price_eco_data_monthly',
      stripePriceAnnual: 'price_eco_data_annual',
      mcps: [
        'csv-analytics', 'postgres-db', 'sqlite-db', 'json-transformer',
        'notion-workspace', 'google-drive',
      ],
      description: '6 data MCPs with 10,000 API credits/month',
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  COBOL BRIDGE (Enterprise Add-on)
  // ═══════════════════════════════════════════════════════════
  cobolBridge: {
    basic: {
      name: 'COBOL Bridge Basic',
      monthlyPrice: 999,
      annualPrice: 9590,
      stripeProd: 'prod_cobol_basic',
      stripePriceMonthly: 'price_cobol_basic_monthly',
      stripePriceAnnual: 'price_cobol_basic_annual',
      features: ['REST API wrapper', 'Copybook parser', 'Basic transformations'],
    },
    pro: {
      name: 'COBOL Bridge Pro',
      monthlyPrice: 2499,
      annualPrice: 23990,
      stripeProd: 'prod_cobol_pro',
      stripePriceMonthly: 'price_cobol_pro_monthly',
      stripePriceAnnual: 'price_cobol_pro_annual',
      features: ['Everything in Basic', 'JCL scanner', 'VSAM mapper', 'Batch processing'],
    },
    enterprise: {
      name: 'COBOL Bridge Enterprise',
      monthlyPrice: 4999,
      annualPrice: 47990,
      stripeProd: 'prod_cobol_enterprise',
      stripePriceMonthly: 'price_cobol_enterprise_monthly',
      stripePriceAnnual: 'price_cobol_enterprise_annual',
      features: ['Everything in Pro', 'EBCDIC translator', 'Batch reports', '24/7 support', 'Custom integrations'],
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  CASA CERTIFICATION (One-time assessments)
  // ═══════════════════════════════════════════════════════════
  casaCertification: {
    ca10: {
      name: 'CASA-CA10 (Level 1)',
      price: 2500,
      stripeProd: 'prod_casa_ca10',
      stripePrice: 'price_casa_ca10',
      type: 'one_time',
      description: 'Self-assessment, automated report',
    },
    ca20: {
      name: 'CASA-CA20 (Level 2)',
      price: 7500,
      stripeProd: 'prod_casa_ca20',
      stripePrice: 'price_casa_ca20',
      type: 'one_time',
      description: 'Expert review, 4-hr consultation',
    },
    ca30: {
      name: 'CASA-CA30 (Level 3)',
      price: 15000,
      stripeProd: 'prod_casa_ca30',
      stripePrice: 'price_casa_ca30',
      type: 'one_time',
      description: 'Full audit, 8-hr consultation, certification',
    },
    ca40: {
      name: 'CASA-CA40 (Level 4)',
      price: 25000,
      stripeProd: 'prod_casa_ca40',
      stripePrice: 'price_casa_ca40',
      type: 'one_time',
      description: 'On-site assessment, ongoing monitoring',
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  CREDIT PACKS (One-time, never expire)
  // ═══════════════════════════════════════════════════════════
  creditPacks: {
    starter: {
      name: 'Starter Pack',
      credits: 1000,
      price: 9,
      stripeProd: 'prod_credit_starter',
      stripePrice: 'price_credit_starter',
      type: 'one_time',
    },
    pro: {
      name: 'Pro Pack',
      credits: 5000,
      price: 29,
      stripeProd: 'prod_credit_pro',
      stripePrice: 'price_credit_pro',
      type: 'one_time',
    },
    enterprise: {
      name: 'Enterprise Pack',
      credits: 25000,
      price: 99,
      stripeProd: 'prod_credit_enterprise',
      stripePrice: 'price_credit_enterprise',
      type: 'one_time',
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  PROMOTIONS & COUPONS
  // ═══════════════════════════════════════════════════════════
  promotions: {
    legacy20: {
      code: 'LEGACY20',
      percentOff: 20,
      duration: 'forever',
      description: 'Legacy member migration discount',
    },
    annual20: {
      code: 'ANNUAL20',
      percentOff: 20,
      duration: 'once',
      description: 'Annual plan discount (built into annual pricing)',
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  MCP → ECOSYSTEM MAPPING
  // ═══════════════════════════════════════════════════════════
  mcpEcosystems: {
    'threat-intelligence': ['security'], 'vulnerability-scanner': ['security'],
    'compliance-audit': ['security', 'governance'], 'incident-response': ['security'],
    'cloud-security': ['security'], 'data-classification': ['security', 'governance'],
    'red-team-ops': ['security', 'defence'], 'secure-comms': ['security', 'defence'],
    'policy-engine': ['security', 'governance'], 'ai-governance': ['governance'],
    'dsrb-defence': ['governance', 'defence'], 'terranova-defence': ['defence'],
    'quantranet-pqc': ['defence'], 'thn-global': ['defence'],
    'aws-cloud': ['devops'], 'docker-compose': ['devops'], 'vercel-deploy': ['devops'],
    'github-api': ['devops'], 'gitlab-api': ['devops'], 'sentry-monitoring': ['devops'],
    'real-estate-ai': ['industry'], 'retail-ai': ['industry'],
    'telecom-ai': ['industry'], 'supply-chain-ai': ['industry'],
    'space-ai': ['industry'], 'smart-cities-ai': ['industry'],
    'sports-analytics-ai': ['industry'], 'travel-hospitality-ai': ['industry'],
    'csv-analytics': ['data'], 'postgres-db': ['data'], 'sqlite-db': ['data'],
    'json-transformer': ['data'], 'notion-workspace': ['data'], 'google-drive': ['data'],
    'pmcp-gateway': [], 'linear-issues': [], 'slack-messaging': [],
    'brave-search': [], 'context7-docs': [], 'time-zones': [],
    'fetch-http': [], 'playwright-browser': [], 'sequential-thinking': [],
    'memory-graph': [], 'git-operations': [], 'puppeteer-headless': [],
    'filesystem-ops': [],
  },

  // ═══════════════════════════════════════════════════════════
  //  FREE TIER MCPs (forever free with limitations)
  // ═══════════════════════════════════════════════════════════
  freeTierMcps: {
    'oneos-education':       { freeCredits: 50, limitation: 'Basic courses only' },
    'bmcc-cyber':            { freeCredits: 50, limitation: 'Basic belts only' },
    'csga-standards':        { freeCredits: 20, limitation: 'Read-only, no API' },
    'digital-human-library': { freeCredits: 30, limitation: 'K-12 only' },
  },

  // ═══════════════════════════════════════════════════════════
  //  HELPER METHODS
  // ═══════════════════════════════════════════════════════════

  /** Get LVP/MVP/HVP classification for an MCP */
  getClassification(mcpSlug) {
    const mcp = this.mcpCatalog[mcpSlug];
    return mcp ? mcp.class : 'lvp';
  },

  /** Get per-MCP pricing based on LVP/MVP/HVP classification */
  getMcpPricing(mcpSlug) {
    const cls = this.getClassification(mcpSlug);
    return this.mcpClassification[cls];
  },

  /** Get legacy tier for backward compat with existing MCP pages */
  getTier(mcpSlug) {
    return this.mcpTiers[mcpSlug] || 'enterprise';
  },

  /** Legacy: get per-MCP price (old 3-tier system) */
  getPerMcpPrice(mcpSlug) {
    const tier = this.getTier(mcpSlug);
    // Map old tiers to new classification
    if (tier === 'free') return { monthlyPrice: 0, annualPrice: 0, credits: 500, label: 'Free' };
    if (tier === 'pro') return { monthlyPrice: 9, annualPrice: 89, credits: 2000, label: '$9/mo' };
    return { monthlyPrice: 29, annualPrice: 289, credits: 5000, label: '$29/mo' };
  },

  /** Get membership by tier key */
  getMembership(tierKey) {
    return this.memberships[tierKey];
  },

  /** Get ecosystems an MCP belongs to */
  getEcosystemsForMcp(mcpSlug) {
    const ecoKeys = this.mcpEcosystems[mcpSlug] || [];
    return ecoKeys.map(k => this.ecosystems[k]);
  },

  /** Get all MCPs in a sector */
  getMcpsBySector(sector) {
    return Object.entries(this.mcpCatalog)
      .filter(([, v]) => v.sector === sector)
      .map(([slug, v]) => ({ slug, ...v }));
  },

  /** Get all MCPs by classification */
  getMcpsByClass(cls) {
    return Object.entries(this.mcpCatalog)
      .filter(([, v]) => v.class === cls)
      .map(([slug, v]) => ({ slug, ...v }));
  },

  /** Format price for display */
  formatPrice(amount) {
    if (amount === null || amount === undefined) return 'Custom';
    if (amount === 0) return 'Free';
    if (amount >= 1000) return '$' + amount.toLocaleString();
    return '$' + amount;
  },

  /** Get total product count */
  getProductCounts() {
    const catalog = Object.values(this.mcpCatalog);
    return {
      total: catalog.length,
      lvp: catalog.filter(m => m.class === 'lvp').length,
      mvp: catalog.filter(m => m.class === 'mvp').length,
      hvp: catalog.filter(m => m.class === 'hvp').length,
      governance: catalog.filter(m => m.sector !== 'devtools').length,
      devtools: catalog.filter(m => m.sector === 'devtools').length,
    };
  },
};

// ═══════════════════════════════════════════════════════════
//  STRIPE CHECKOUT HANDLER (supports subscriptions + one-time)
// ═══════════════════════════════════════════════════════════
async function csga_checkout(priceId, options = {}) {
  if (!priceId) {
    if (options.type === 'enterprise') {
      window.location.href = '/contact?inquiry=enterprise';
      return;
    }
    alert('This plan requires contacting our sales team.');
    return;
  }

  try {
    const res = await fetch(CSGA_PRICING.stripe.endpoints.checkout, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        mode: options.mode || 'subscription',
        successUrl: options.successUrl || CSGA_PRICING.stripe.successUrl,
        cancelUrl: options.cancelUrl || CSGA_PRICING.stripe.cancelUrl,
        trialDays: options.trial || null,
        customerEmail: options.email || null,
        metadata: options.metadata || {},
        coupon: options.coupon || null,
      }),
    });

    const data = await res.json();

    if (data.url) {
      // Stripe Checkout redirect URL
      window.location.href = data.url;
    } else if (data.sessionId) {
      // Legacy: redirect via Stripe.js
      const key = CSGA_PRICING.stripe.mode === 'test'
        ? CSGA_PRICING.stripe.testKey
        : CSGA_PRICING.stripe.publishableKey;
      const stripe = Stripe(key);
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert('Checkout error: ' + (data.error || 'Please try again.'));
    }
  } catch (err) {
    alert('Unable to start checkout. Please try again or contact support.');
    console.error('Checkout error:', err);
  }
}

/** Open Stripe Customer Portal for subscription management */
async function csga_openPortal() {
  try {
    const res = await fetch(CSGA_PRICING.stripe.endpoints.portal, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    alert('Unable to open billing portal. Please try again.');
    console.error('Portal error:', err);
  }
}

if (typeof module !== 'undefined') module.exports = CSGA_PRICING;
