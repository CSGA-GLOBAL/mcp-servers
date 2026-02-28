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
    publishableKey: 'pk_live_51PpysBR1MkVzHj7pLUCBDdcUv5CgG4MFZt84EOX5OOwRfUCkpKsSZmTS5k9MJpmWuuwYciAmRX5AlxGakX1wVAVQ00ZYe9rLMF',
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
      stripeProd: 'prod_U3n9PdLPQ3iElv',
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
      stripeProd: 'prod_U3n9YaBqyAcgSk',
      stripePriceMonthly: 'price_1T5fZbR1MkVzHj7pSb2DNjmP',
      stripePriceAnnual: 'price_1T5fZbR1MkVzHj7pVeWz5G49',
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
      stripeProd: 'prod_U3n9OJeo3GgJOl',
      stripePriceMonthly: 'price_1T5fZcR1MkVzHj7p10PUGjyc',
      stripePriceAnnual: 'price_1T5fZcR1MkVzHj7pJkNyRyo0',
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
      stripeProd: 'prod_U3n9E2eBnGkvx0',
      stripePriceMonthly: 'price_1T5fZdR1MkVzHj7p7U4mtW5Y',
      stripePriceAnnual: 'price_1T5fZdR1MkVzHj7peDFetkoJ',
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
      mcpCount: 67,
      monthlyPrice: 1499,
      annualPrice: 14390,
      credits: 250000,
      teamMembers: -1, // Unlimited
      support: 'Dedicated CSM (4h SLA)',
      trialDays: 30,
      overageRate: 0.10,
      stripeProd: 'prod_U3n9Ky1waZHaP0',
      stripePriceMonthly: 'price_1T5fZeR1MkVzHj7pDkgZU5UP',
      stripePriceAnnual: 'price_1T5fZeR1MkVzHj7pC34mtyY8',
      features: [
        'All 67 MCPs (governance + sector + devtools)',
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
      stripePriceMonthly: 'price_1T5fZfR1MkVzHj7pca1Qdcu8',
      stripePriceAnnual: 'price_1T5fZfR1MkVzHj7pm2glP1gG',
      color: '#22C55E',
    },
    // MVP — Medium Value Products ($29/mo, 5,000 calls)
    mvp: {
      monthlyPrice: 29,
      annualPrice: 279,
      credits: 5000,
      label: 'MVP',
      description: 'Small teams / startups',
      stripePriceMonthly: 'price_1T5fZfR1MkVzHj7pprmM6LeD',
      stripePriceAnnual: 'price_1T5fZgR1MkVzHj7pA6EiCm1c',
      color: '#3B82F6',
    },
    // HVP — High Value Products ($79/mo, 15,000 calls)
    hvp: {
      monthlyPrice: 79,
      annualPrice: 759,
      credits: 15000,
      label: 'HVP',
      description: 'Enterprise / regulated',
      stripePriceMonthly: 'price_1T5fZgR1MkVzHj7pzNqwbSCe',
      stripePriceAnnual: 'price_1T5fZhR1MkVzHj7pOBeboxsT',
      color: '#A855F7',
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  COMPLETE MCP CATALOG (44 Governance/Sector + 25 DevTools = 69)
  // ═══════════════════════════════════════════════════════════
  mcpCatalog: {
    // ── CORE TIER (All memberships) ──────────────────────
    'csoai-governance':      { name: 'CSOAI Governance',      class: 'mvp', sector: 'core', stripeProd: 'prod_U3nJEsLO32KyWP' },
    'casa-certification':    { name: 'CASA Certification',     class: 'hvp', sector: 'core', stripeProd: 'prod_U3nJjim69JW2wK' },
    'csga-standards':        { name: 'CSGA Standards',         class: 'mvp', sector: 'core', stripeProd: 'prod_U3nJTLMmnhLT6q' },
    'proofof-ai':            { name: 'PROOFOF.ai',             class: 'mvp', sector: 'core', stripeProd: 'prod_U3nJLTK54410Q8' },
    'oneos-education':       { name: 'OneOS Education',        class: 'lvp', sector: 'core', stripeProd: 'prod_U3nJTXjKcfPYmO' },
    'quantranet-pqc':        { name: 'QuantraNet PQC',         class: 'hvp', sector: 'core', stripeProd: 'prod_U3nJsIK5jKXWhE' },
    'terranova-defence':     { name: 'Terranova Defence',      class: 'hvp', sector: 'core', stripeProd: 'prod_U3nJ6XUg8Bxdxm' },
    'bmcc-cyber':            { name: 'BMCC Cyber',             class: 'lvp', sector: 'core', stripeProd: 'prod_U3nJqS3WpM9Mzp' },
    'thn-global':            { name: 'THN Global Pharma',      class: 'hvp', sector: 'core', stripeProd: 'prod_U3nJhF9DenptM4' },
    'digital-human-library': { name: 'Digital Human Library',  class: 'lvp', sector: 'core', stripeProd: 'prod_U3nJWpAGlAachQ' },
    'ai-economy-infra':      { name: 'AI Economy Infra',       class: 'hvp', sector: 'core', stripeProd: 'prod_U3nJXpfurZoSbN' },

    // ── T1 SECTOR (Professional+) ───────────────────────
    'healthcare-ai':         { name: 'Healthcare AI',          class: 'hvp', sector: 't1', stripeProd: 'prod_U3nJqkwfCMmTiS' },
    'financial-ai':          { name: 'Financial AI',           class: 'hvp', sector: 't1', stripeProd: 'prod_U3nJ3yLRObz8I9' },
    'biometrics-ai':         { name: 'Biometrics AI',          class: 'hvp', sector: 't1', stripeProd: 'prod_U3nJMfY5QDPnY1' },
    'employment-ai':         { name: 'Employment AI',          class: 'mvp', sector: 't1', stripeProd: 'prod_U3nJZkzE3texC3' },
    'law-enforcement-ai':    { name: 'Law Enforcement AI',     class: 'hvp', sector: 't1', stripeProd: 'prod_U3nJB2wC1Zpsab' },

    // ── T2 SECTOR (Starter+) ────────────────────────────
    'gaming-ai':             { name: 'Gaming AI',              class: 'mvp', sector: 't2', stripeProd: 'prod_U3nJPKQNBj1wyz' },
    'autonomous-vehicles':   { name: 'Autonomous Vehicles',    class: 'hvp', sector: 't2', stripeProd: 'prod_U3nJf79eeBg12T' },
    'insurance-ai':          { name: 'Insurance AI',           class: 'mvp', sector: 't2', stripeProd: 'prod_U3nJmSwqVpD0Q3' },
    'telecom-ai':            { name: 'Telecom AI',             class: 'mvp', sector: 't2', stripeProd: 'prod_U3nJee7lVlkPTr' },
    'energy-ai':             { name: 'Energy AI',              class: 'mvp', sector: 't2', stripeProd: 'prod_U3nJD1Klja9Est' },
    'real-estate-ai':        { name: 'Real Estate AI',         class: 'lvp', sector: 't2', stripeProd: 'prod_U3nJxafB2kS5u7' },
    'retail-ai':             { name: 'Retail AI',              class: 'lvp', sector: 't2', stripeProd: 'prod_U3nJw6YDyBDFUh' },

    // ── T3 SECTOR (Individual purchase) ─────────────────
    'media-ads-ai':          { name: 'Media & Ads AI',         class: 'lvp', sector: 't3', stripeProd: 'prod_U3nJsnZnRxUXpc' },
    'agriculture-ai':        { name: 'Agriculture AI',         class: 'lvp', sector: 't3', stripeProd: 'prod_U3nJUHqnh1e0av' },
    'construction-ai':       { name: 'Construction AI',        class: 'lvp', sector: 't3', stripeProd: 'prod_U3nJeJYVmSsy51' },
    'supply-chain-ai':       { name: 'Supply Chain AI',        class: 'mvp', sector: 't3', stripeProd: 'prod_U3nJSKk8xnYl3f' },
    'legal-tech-ai':         { name: 'Legal Tech AI',          class: 'mvp', sector: 't3', stripeProd: 'prod_U3nJ59rDTGHGTf' },
    'sports-analytics-ai':   { name: 'Sports Analytics',       class: 'lvp', sector: 't3', stripeProd: 'prod_U3nJwbXhnclAfv' },
    'travel-hospitality-ai': { name: 'Travel AI',              class: 'lvp', sector: 't3', stripeProd: 'prod_U3nJHSgCOOZNsj' },

    // ── T4 SECTOR (Enterprise only) ─────────────────────
    'space-ai':              { name: 'Space AI',               class: 'hvp', sector: 't4', stripeProd: 'prod_U3nJY3rZy8v3tb' },
    'mining-ai':             { name: 'Mining AI',              class: 'mvp', sector: 't4', stripeProd: 'prod_U3nJ5gvT6ZiNR1' },
    'maritime-ai':           { name: 'Maritime AI',            class: 'mvp', sector: 't4', stripeProd: 'prod_U3nJBDVR7tXDQR' },
    'smart-cities-ai':       { name: 'Smart Cities AI',        class: 'mvp', sector: 't4', stripeProd: 'prod_U3nJAfSRx3KG0G' },

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
    // Enterprise Tier — Core governance MCPs
    'data-classification': 'enterprise', 'dsrb-defence': 'enterprise',
    'terranova-defence': 'enterprise', 'compliance-audit': 'enterprise',
    'secure-comms': 'enterprise', 'threat-intelligence': 'enterprise',
    'red-team-ops': 'enterprise', 'quantranet-pqc': 'enterprise',
    'pmcp-gateway': 'enterprise', 'cloud-security': 'enterprise',
    'ai-governance': 'enterprise', 'thn-global': 'enterprise',
    'incident-response': 'enterprise', 'policy-engine': 'enterprise',
    'vulnerability-scanner': 'enterprise', 'casa-certification': 'enterprise',
    'csga-standards': 'enterprise', 'proofof-ai': 'enterprise',
    'oneos-education': 'enterprise', 'digital-human-library': 'enterprise',
    'ai-economy-infra': 'enterprise',
    // Enterprise Tier — T1 Sector (Professional+)
    'healthcare-ai': 'enterprise', 'financial-ai': 'enterprise',
    'biometrics-ai': 'enterprise', 'employment-ai': 'enterprise',
    'law-enforcement-ai': 'enterprise',
    // Enterprise Tier — T2 Sector (Starter+)
    'gaming-ai': 'enterprise', 'autonomous-vehicles': 'enterprise',
    'insurance-ai': 'enterprise', 'telecom-ai': 'enterprise',
    'energy-ai': 'enterprise', 'real-estate-ai': 'enterprise',
    'retail-ai': 'enterprise',
    // Enterprise Tier — T3 Sector (Individual purchase)
    'media-ads-ai': 'enterprise', 'agriculture-ai': 'enterprise',
    'construction-ai': 'enterprise', 'supply-chain-ai': 'enterprise',
    'legal-tech-ai': 'enterprise', 'sports-analytics-ai': 'enterprise',
    'travel-hospitality-ai': 'enterprise',
    // Enterprise Tier — T4 Sector (Enterprise only)
    'space-ai': 'enterprise', 'mining-ai': 'enterprise',
    'maritime-ai': 'enterprise', 'smart-cities-ai': 'enterprise',
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
      stripeProd: 'prod_U3nAH29zJmO3U7',
      stripePriceMonthly: 'price_1T5fZqR1MkVzHj7phEWztIzK',
      stripePriceAnnual: 'price_1T5fZqR1MkVzHj7pcMpDoWL5',
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
      stripeProd: 'prod_U3nAhYx5F90nsU',
      stripePriceMonthly: 'price_1T5fZrR1MkVzHj7p7jnWxPO7',
      stripePriceAnnual: 'price_1T5fZrR1MkVzHj7p2nIZYe8m',
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
      stripeProd: 'prod_U3nAODEokh4lDd',
      stripePriceMonthly: 'price_1T5fZsR1MkVzHj7peCcPzeKh',
      stripePriceAnnual: 'price_1T5fZsR1MkVzHj7pnsDLAgKK',
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
      stripeProd: 'prod_U3nANbWuv5UBgX',
      stripePriceMonthly: 'price_1T5fZtR1MkVzHj7p9rQhHve1',
      stripePriceAnnual: 'price_1T5fZtR1MkVzHj7pafyxaHB6',
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
      stripeProd: 'prod_U3nAUZHN10T3Qq',
      stripePriceMonthly: 'price_1T5fZtR1MkVzHj7pBMEXWPoo',
      stripePriceAnnual: 'price_1T5fZuR1MkVzHj7pWxJvf8Go',
      mcps: [
        'real-estate-ai', 'retail-ai', 'telecom-ai', 'supply-chain-ai',
        'space-ai', 'smart-cities-ai', 'sports-analytics-ai',
        'travel-hospitality-ai', 'healthcare-ai', 'financial-ai',
        'insurance-ai', 'energy-ai', 'agriculture-ai', 'construction-ai',
        'maritime-ai', 'mining-ai', 'gaming-ai', 'media-ads-ai',
        'legal-tech-ai', 'autonomous-vehicles',
      ],
      description: '20 industry MCPs with 20,000 API credits/month',
    },
    data: {
      name: 'Data & Analytics Suite',
      icon: '📊',
      monthlyPrice: 39,
      annualPrice: 389,
      credits: 10000,
      stripeProd: 'prod_U3nAA6pFME8Yny',
      stripePriceMonthly: 'price_1T5fZuR1MkVzHj7pwPi2PWxg',
      stripePriceAnnual: 'price_1T5fZuR1MkVzHj7pvmLDiydP',
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
      stripeProd: 'prod_U3nALmyPwlfzMd',
      stripePriceMonthly: 'price_1T5fZvR1MkVzHj7puJKUd3q8',
      stripePriceAnnual: 'price_1T5fZvR1MkVzHj7pEqnOMrKW',
      features: ['REST API wrapper', 'Copybook parser', 'Basic transformations'],
    },
    pro: {
      name: 'COBOL Bridge Pro',
      monthlyPrice: 2499,
      annualPrice: 23990,
      stripeProd: 'prod_U3nA0mVsIQ9SeB',
      stripePriceMonthly: 'price_1T5fZwR1MkVzHj7pnQbKiIEm',
      stripePriceAnnual: 'price_1T5fZwR1MkVzHj7pzCnPRSET',
      features: ['Everything in Basic', 'JCL scanner', 'VSAM mapper', 'Batch processing'],
    },
    enterprise: {
      name: 'COBOL Bridge Enterprise',
      monthlyPrice: 4999,
      annualPrice: 47990,
      stripeProd: 'prod_U3nAPdLL4A7V7Y',
      stripePriceMonthly: 'price_1T5fZxR1MkVzHj7pMrfbEhYA',
      stripePriceAnnual: 'price_1T5fZxR1MkVzHj7pQFtvgled',
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
      stripeProd: 'prod_U3nASVNRIRm6fx',
      stripePrice: 'price_1T5fZyR1MkVzHj7pp7t4ZD4t',
      type: 'one_time',
      description: 'Self-assessment, automated report',
    },
    ca20: {
      name: 'CASA-CA20 (Level 2)',
      price: 7500,
      stripeProd: 'prod_U3nAeWMggAFH6X',
      stripePrice: 'price_1T5fZyR1MkVzHj7pEKpSLjua',
      type: 'one_time',
      description: 'Expert review, 4-hr consultation',
    },
    ca30: {
      name: 'CASA-CA30 (Level 3)',
      price: 15000,
      stripeProd: 'prod_U3nAfomPRvFuia',
      stripePrice: 'price_1T5fZzR1MkVzHj7poqte2C5v',
      type: 'one_time',
      description: 'Full audit, 8-hr consultation, certification',
    },
    ca40: {
      name: 'CASA-CA40 (Level 4)',
      price: 25000,
      stripeProd: 'prod_U3nAVdzjFN7Ous',
      stripePrice: 'price_1T5fZzR1MkVzHj7pgk6osgZC',
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
      stripeProd: 'prod_U3nAoBVz5FR1qd',
      stripePrice: 'price_1T5fa0R1MkVzHj7pMM0KgFdH',
      type: 'one_time',
    },
    pro: {
      name: 'Pro Pack',
      credits: 5000,
      price: 29,
      stripeProd: 'prod_U3nAqSntV1bdJ0',
      stripePrice: 'price_1T5fa0R1MkVzHj7pMyRuZdR3',
      type: 'one_time',
    },
    enterprise: {
      name: 'Enterprise Pack',
      credits: 25000,
      price: 99,
      stripeProd: 'prod_U3nAgIDOxSl8S1',
      stripePrice: 'price_1T5fa1R1MkVzHj7pwUijs1d3',
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
