# CSGA Global — Master Alignment Document
## Site ↔ Distribution Blueprint ↔ Gap Analysis ↔ Audit v2

**Generated:** 2026-02-28
**Actual MCP Count:** 70 (not 67, not 80)
**Breakdown:** 11 Core + 5 T1 + 7 T2 + 7 T3 + 4 T4 + 11 Security + 25 DevTools = 70
**By Class:** 33 LVP ($9) · 14 MVP ($29) · 23 HVP ($79)

---

## 1. CRITICAL FIXES (Do Now)

### 1.1 Tier Counter Bug — catalog.html
- **Lines 457-466**: Free/Pro/Enterprise stat counters hardcoded to "0"
- **Fix**: Dynamic counting from pricing-config.js mcpCatalog on DOMContentLoaded
- **Impact**: Kills enterprise credibility

### 1.2 MCP Count — "67" → "70" Sitewide
Update needed in **75+ files**:

| File | Lines | Count |
|------|-------|-------|
| index.html | 1213, 1617, 1670, 1686, 1927, 2412 | 6 refs |
| catalog.html | 7, 409, 415, 417, 425, 453, 980, 984, 1130 | 9 refs |
| distribution.html | 6, 7, 10, 11, 18, 19, 827, 839, 849, 877, 879, 901, 922, 1381, 1398, 1416 | 16 refs |
| dashboard.html | 246, 273, 372, 687 | 4 refs |
| faq.html | 95, 125, 202 (JSON-LD) | 3 refs |
| global-council.html | 64 | 1 ref |
| changelog.html | 45 | 1 ref |
| 63 MCP pages (mcp/*.html) | Enterprise pricing widget | 63 × 2 = 126 refs |
| pricing-config.js | Lines 149, 161 | 2 refs |

**Total: ~168 occurrences across 75 files**

### 1.3 pricing-config.js enterpriseFull Tier
- Line 149: `mcpCount: 67` → `mcpCount: 70`
- Line 161: `'All 67 MCPs'` → `'All 70 MCPs'`

---

## 2. Distribution Page Overhaul — distribution.html

### Current State (3 channels)
Only mentions: CSGA MCP Hub, Smithery.ai, GitHub

### Required State (12 platforms per blueprint)

**Tier 1 — Primary:**
1. Official MCP Registry (registry.modelcontextprotocol.io)
2. npm (@csga-global scope)
3. PyPI (csga-* packages)
4. Docker Hub + GHCR (OCI containers)
5. Smithery.ai (smithery.ai/server/@csga-global/*)
6. Docker MCP Catalog

**Tier 2 — Secondary:**
7. .mcpb Bundles (proprietary format)
8. Cloudflare Workers (MCP-over-HTTP)
9. Apify (Actor marketplace)
10. GitHub Releases (signed tarballs)

**Tier 3 — Discovery:**
11. PulseMCP, mcp.so, Glama, OpenTools

### Distribution Page Sections Needed
- Platform comparison grid (12 platforms)
- Installation commands per platform (npm, docker, pip)
- Trust/verification badges (Cosign signatures, SBOMs)
- Enterprise deployment options (air-gapped, on-prem)

---

## 3. COBOL Bridge Page Gaps

### Current State
- 3 tools (Parser, CICS Bridge, JCL Scanner)
- $4,999/mo Enterprise pricing only
- 99.9% uptime SLA

### Missing (per audit + blueprint)
- [ ] AI Modules section (Code Analyzer, Modernization Advisor, Risk Assessor)
- [ ] Distribution channels (npm, Docker, Smithery)
- [ ] Multi-tier comparison ($999 / $2,499 / $4,999)
- [ ] Case studies (banking, insurance use cases)
- [ ] ROI calculator
- [ ] Certification requirements detail

---

## 4. Security & Protocol Gaps (from Gap Analysis)

### Already Addressed
- ✅ 11 Security MCPs created and in catalog
- ✅ Defence MCP email+password gating (8 pages)
- ✅ COBOL Bridge compiled with dist/

### Still Needed (Infrastructure)
- [ ] OAuth 2.1 implementation (replacing static API keys)
- [ ] .well-known/mcp.json discovery endpoint
- [ ] server.meta.json per package (single source of truth)
- [ ] Cosign v3 keyless signing
- [ ] CycloneDX SBOM generation
- [ ] MCP-Scan pre-publish validation
- [ ] Supply chain security (Scorecard ≥7.0)

### Still Needed (Enterprise)
- [ ] EU AI Act countdown (Aug 2, 2026 deadline)
- [ ] Compliance test suites
- [ ] A2A Protocol / Agent Cards
- [ ] Enterprise gateway / rate limiting
- [ ] Air-gapped deployment docs
- [ ] Monitoring / observability integration

---

## 5. Pricing Alignment

### Current pricing-config.js Status
- ✅ 6 membership tiers (Community → Sovereign)
- ✅ LVP/MVP/HVP individual pricing ($9/$29/$79)
- ✅ 6 ecosystem bundles ($39-$199/mo)
- ✅ COBOL Bridge 3 tiers ($999/$2,499/$4,999)
- ✅ CASA certifications (CA10-CA40)
- ✅ API credit packs
- ⚠️ 11 security MCPs have PLACEHOLDER Stripe IDs (prod_security_*)

### Recommendations (from Audit)
- [ ] Raise LVP minimum from $9 to $19 (Stripe profitability)
- [ ] Add usage-based tiers for high-volume customers
- [ ] Add outcome-based pricing ("Audit Pass Guarantee")
- [ ] Add x402 payment support (agent economy)

---

## 6. Fix Execution Order

1. **pricing-config.js** — Fix mcpCount 67→70
2. **catalog.html** — Fix tier counter bug + update 67→70
3. **index.html** — Update 67→70
4. **distribution.html** — Update 67→70 + add 12 platforms
5. **dashboard.html** — Update 67→70
6. **faq.html** — Update 67→70
7. **global-council.html** — Update 67→70
8. **changelog.html** — Update 67→70
9. **63 MCP pages** — Bulk sed 67→70 in Enterprise pricing widget
10. **COBOL Bridge page** — Add missing sections
11. **Git push** — Commit all changes
12. **Verify** — Spot-check 5 pages

---

## 7. Quick Reference — File Locations

```
/CSOAI-CORP/vercel-sites/csga-global/
├── js/pricing-config.js      ← Master catalog (70 MCPs)
├── index.html                 ← Homepage
├── catalog.html               ← Tier counter bug + catalog
├── distribution.html          ← Needs 12-platform overhaul
├── dashboard.html             ← User dashboard
├── pricing.html               ← Pricing page
├── faq.html                   ← FAQ with 67 refs
├── global-council.html        ← Council page
├── changelog.html             ← Changelog
├── mcp/
│   ├── cobol-bridge.html      ← COBOL Bridge detail
│   ├── index.html             ← MCP hub index
│   └── [62 more MCP pages]   ← Individual MCP pages
└── packages/
    ├── cobol-bridge/          ← Compiled dist/
    └── [46 security+other]/   ← MCP source packages
```
