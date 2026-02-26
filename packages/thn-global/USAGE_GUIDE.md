# THN Global MCP Server - Usage Guide

Complete guide to using the THN Global Pharma AI IP Engine MCP Server with practical examples and use cases.

## Quick Start

### 1. Installation and Setup

```bash
# Clone the repository
cd mcp-servers/thn-global

# Install dependencies
npm install

# Build the server
npm run build

# Start the server
npm start
```

The server will connect via stdio and be ready to receive MCP protocol requests.

### 2. Basic Usage

Each tool accepts a JSON-formatted request with specific parameters. Here are examples for each tool:

## Tool Examples

### 1. Patent Landscape Analysis

Analyze patent landscape in oncology for small molecule checkpoint inhibitors.

**Request**:
```json
{
  "tool": "thn_patent_landscape",
  "arguments": {
    "therapeutic_area": "oncology",
    "molecule_type": "small_molecule",
    "target_pathway": "PD-L1 checkpoint pathway",
    "date_range": {
      "start_year": 2018,
      "end_year": 2024
    }
  }
}
```

**Expected Output**:
```json
{
  "therapeutic_area": "oncology",
  "search_date": "2024-10-15",
  "patent_density_map": {
    "therapeutic_area": "oncology",
    "total_patents": 5000,
    "patent_trend": "increasing",
    "density_by_region": [
      {
        "region": "United States",
        "count": 2500,
        "percentage": 50
      },
      {
        "region": "Europe",
        "count": 1800,
        "percentage": 36
      },
      {
        "region": "Asia Pacific",
        "count": 1200,
        "percentage": 24
      },
      {
        "region": "Rest of World",
        "count": 500,
        "percentage": 10
      }
    ]
  },
  "key_patent_holders": [
    {
      "organization": "Pfizer",
      "patent_count": 450,
      "recent_filings": 35,
      "market_share": 12,
      "focus_areas": ["checkpoint inhibitors", "CAR-T cells", "targeted therapies"]
    },
    {
      "organization": "Roche",
      "patent_count": 420,
      "recent_filings": 32,
      "market_share": 11,
      "focus_areas": ["checkpoint inhibitors", "CAR-T cells", "targeted therapies"]
    }
  ],
  "white_space_opportunities": [
    "Novel mechanism in PD-L1 checkpoint pathway with minimal patent coverage",
    "Combination therapy approaches not yet patented for oncology",
    "Geographic opportunities in emerging markets with lower patent density"
  ],
  "freedom_to_operate": {
    "risk_level": "moderate",
    "blocking_patents": 750,
    "design_around_possible": true,
    "estimated_licensing_cost": "$2.5M - $8.5M",
    "recommendation": "Recommended to proceed with design-around strategy and selective licensing negotiations"
  },
  "competitive_landscape": {
    "major_competitors": ["Pfizer", "Roche", "Merck", "Novartis", "Johnson & Johnson"],
    "emerging_players": ["Adaptive Biotech", "Caribou Biosciences", "Sangamo Therapeutics"],
    "technology_trends": ["AI-driven target discovery", "mRNA technologies", "PROTAC approaches", "Cell therapy"]
  }
}
```

**Use Cases**:
- Evaluate landscape before starting drug discovery program
- Identify white space and patentability opportunities
- Assess freedom-to-operate for existing molecules
- Benchmark competitive position

---

### 2. Drug Discovery AI Assessment

Assess feasibility of developing a triple-negative breast cancer therapeutic.

**Request**:
```json
{
  "tool": "thn_drug_discovery_ai",
  "arguments": {
    "target_disease": "triple-negative breast cancer",
    "approach": "small_molecule",
    "development_stage": "preclinical",
    "budget_range": {
      "min_usd_millions": 50,
      "max_usd_millions": 150
    }
  }
}
```

**Expected Output**:
```json
{
  "target_disease": "triple-negative breast cancer",
  "approach": "small_molecule",
  "feasibility_score": 72,
  "competitive_programs": [
    {
      "organization": "Roche",
      "program_name": "RG-7156",
      "stage": "Phase 3",
      "mechanism": "small_molecule",
      "estimated_completion": "2025-Q4"
    },
    {
      "organization": "Merck",
      "program_name": "MK-8889",
      "stage": "Phase 2",
      "mechanism": "small_molecule",
      "estimated_completion": "2026-Q2"
    },
    {
      "organization": "Novartis",
      "program_name": "NVS-5888",
      "stage": "Phase 1",
      "mechanism": "small_molecule",
      "estimated_completion": "2027-Q1"
    }
  ],
  "estimated_timeline_months": 36,
  "regulatory_pathway": "NDA (505(b)(1))",
  "key_risks": [
    "Clinical efficacy not meeting primary endpoints",
    "Safety and tolerability concerns emerging in later stage trials",
    "Manufacturing scale-up challenges and cost constraints",
    "Competitive pressure from advanced programs in space",
    "Regulatory pathway complexity and potential delays"
  ],
  "cost_projection": {
    "phase_1_to_submission": "$60M - $78M",
    "total_to_approval": "$150M - $210M",
    "risk_adjusted_npv": "$97.5M (45-55% probability of success)"
  },
  "technical_readiness": 52
}
```

**Use Cases**:
- Go/no-go decision on development programs
- Internal investment committee presentations
- Valuation and deal structure assessments
- Risk mitigation planning

---

### 3. IP Strategy Development

Develop IP strategy for a novel formulation technology.

**Request**:
```json
{
  "tool": "thn_ip_strategy",
  "arguments": {
    "innovation_type": "formulation",
    "jurisdiction": ["US", "EU", "JP"],
    "existing_patents": ["US10123456B2"],
    "competitive_landscape": "High patent density with 5-6 competitors"
  }
}
```

**Expected Output**:
```json
{
  "innovation_type": "formulation",
  "jurisdiction": "US, EU, JP",
  "ip_strategy_recommendations": [
    "File composition of matter patent with broad and narrow claim sets",
    "Develop method of use patents for multiple indications",
    "Consider process patents for novel manufacturing approaches",
    "Build trade secret protection for manufacturing know-how",
    "Establish patent thicket strategy to maximize exclusivity",
    "Plan freedom-to-operate analysis before market entry"
  ],
  "patent_filing_priorities": [
    {
      "patent_type": "Composition of Matter",
      "priority_level": "high",
      "jurisdiction": "US",
      "estimated_cost": "$15,000 - $25,000",
      "timeline_months": 36
    },
    {
      "patent_type": "Method of Use",
      "priority_level": "high",
      "jurisdiction": "US",
      "estimated_cost": "$12,000 - $20,000",
      "timeline_months": 36
    },
    {
      "patent_type": "Composition of Matter",
      "priority_level": "high",
      "jurisdiction": "EU",
      "estimated_cost": "$15,000 - $25,000",
      "timeline_months": 36
    },
    {
      "patent_type": "Method of Use",
      "priority_level": "high",
      "jurisdiction": "EU",
      "estimated_cost": "$12,000 - $20,000",
      "timeline_months": 36
    },
    {
      "patent_type": "Composition of Matter",
      "priority_level": "high",
      "jurisdiction": "JP",
      "estimated_cost": "$15,000 - $25,000",
      "timeline_months": 36
    },
    {
      "patent_type": "Method of Use",
      "priority_level": "high",
      "jurisdiction": "JP",
      "estimated_cost": "$12,000 - $20,000",
      "timeline_months": 36
    }
  ],
  "defensive_strategies": [
    "Monitor competitor patent filings and file oppositions if needed",
    "Build robust technical documentation for trade secret claims",
    "Establish clear patent prosecution history for claim interpretation",
    "Consider design-around patents for core competitor IP",
    "Develop contingency licensing agreements with key players",
    "Maintain patent portfolio maintenance and renewal strategy"
  ],
  "licensing_opportunities": [
    {
      "territory": "Asia Pacific",
      "estimated_revenue": "$50M - $150M",
      "potential_partners": ["Takeda", "Astellas", "Daiichi Sankyo"]
    },
    {
      "territory": "Europe",
      "estimated_revenue": "$75M - $200M",
      "potential_partners": ["Roche", "Novartis", "Sanofi"]
    },
    {
      "territory": "US",
      "estimated_revenue": "$100M - $250M",
      "potential_partners": ["Pfizer", "Merck", "Johnson & Johnson"]
    }
  ],
  "estimated_total_costs": "$200,000 - $400,000 (5-year prosecution + maintenance)",
  "estimated_roi_timeline_years": 7
}
```

**Use Cases**:
- Filing strategy and budget planning
- Freedom-to-operate assessments
- Licensing and partnership negotiations
- Patent portfolio optimization

---

### 4. Regulatory Pathway Mapping

Map regulatory pathway for an oncology biologic.

**Request**:
```json
{
  "tool": "thn_regulatory_pathway",
  "arguments": {
    "drug_type": "biologic",
    "therapeutic_area": "oncology",
    "target_market": ["US", "EU"],
    "development_phase": "phase_2"
  }
}
```

**Expected Output**:
```json
{
  "drug_type": "biologic",
  "therapeutic_area": "oncology",
  "target_market": "US, EU",
  "fda_pathway": "351(a)",
  "ema_pathway": "centralized",
  "total_timeline_months": 84,
  "required_studies": [
    {
      "study_type": "Phase 1 (Safety and Tolerability)",
      "estimated_duration_months": 18,
      "patient_population_size": 40,
      "estimated_cost": "$5M - $10M"
    },
    {
      "study_type": "Phase 2 (Efficacy and Safety)",
      "estimated_duration_months": 24,
      "patient_population_size": 150,
      "estimated_cost": "$15M - $30M"
    },
    {
      "study_type": "Phase 3 (Confirmatory)",
      "estimated_duration_months": 36,
      "patient_population_size": 500,
      "estimated_cost": "$50M - $100M"
    }
  ],
  "fda_fee_schedule": "BPci Fee: $124,500 (FY2024)",
  "key_milestones": [
    {
      "milestone": "IND Application Submitted",
      "expected_month": 12
    },
    {
      "milestone": "Phase 1 Enrollment Complete",
      "expected_month": 24
    },
    {
      "milestone": "Phase 2 Enrollment Complete",
      "expected_month": 48
    },
    {
      "milestone": "Phase 3 Enrollment Complete",
      "expected_month": 84
    },
    {
      "milestone": "NDA/BLA Submission",
      "expected_month": 96
    },
    {
      "milestone": "FDA Approval",
      "expected_month": 108
    }
  ],
  "priority_review_eligible": true,
  "accelerated_pathway_available": true
}
```

**Use Cases**:
- Clinical development planning
- Budget and timeline estimation
- Regulatory strategy development
- Investor presentations

---

### 5. Market Intelligence

Analyze immunology market.

**Request**:
```json
{
  "tool": "thn_market_intelligence",
  "arguments": {
    "therapeutic_area": "immunology",
    "geography": ["North_America", "Europe"],
    "time_horizon": "5yr"
  }
}
```

**Expected Output**:
```json
{
  "therapeutic_area": "immunology",
  "geography": "North_America, Europe",
  "analysis_date": "2024-10-15",
  "market_size": {
    "current_usd_billions": 95,
    "projected_5yr_usd_billions": 138,
    "cagr_percent": 12
  },
  "key_players": [
    {
      "organization": "Pfizer",
      "market_share_percent": 12,
      "key_products": ["Eliquat", "Prevnar", "Xtandi"],
      "pipeline_stage_count": {
        "early": 8,
        "clinical": 5,
        "late_stage": 2
      }
    },
    {
      "organization": "Roche",
      "market_share_percent": 11,
      "key_products": ["Avastin", "Herceptin", "Perjeta"],
      "pipeline_stage_count": {
        "early": 7,
        "clinical": 6,
        "late_stage": 3
      }
    },
    {
      "organization": "Merck",
      "market_share_percent": 10,
      "key_products": ["Keytruda", "Gardasil", "Pneumovax"],
      "pipeline_stage_count": {
        "early": 9,
        "clinical": 4,
        "late_stage": 2
      }
    }
  ],
  "pipeline_analysis": {
    "total_programs": 145,
    "by_stage": {
      "discovery": 35,
      "preclinical": 28,
      "phase_1": 22,
      "phase_2": 35,
      "phase_3": 18,
      "nda_stage": 7
    },
    "therapy_type_distribution": {
      "small_molecule": 58,
      "biologic": 52,
      "gene_therapy": 18,
      "cell_therapy": 12,
      "other": 5
    }
  },
  "pricing_trends": [
    {
      "therapeutic_area": "immunology",
      "average_launch_price_per_year": 150000,
      "erosion_rate_percent": 8,
      "generic_entry_timeline_years": 12
    }
  ],
  "reimbursement_landscape": [
    "Value-based pricing models increasingly adopted by payers",
    "Risk-sharing agreements required for unproven efficacy",
    "Managed entry agreements with Phase 3 data sufficiency",
    "Real-world evidence generation mandatory for premium pricing",
    "ICER and EMA review driving price negotiations"
  ],
  "market_access_barriers": [
    "Stringent regulatory requirements and extended review timelines",
    "Limited reimbursement for combination therapies",
    "Manufacturing and supply chain constraints",
    "Intellectual property challenges in emerging markets",
    "Healthcare budget constraints and cost containment pressures"
  ],
  "growth_drivers": [
    "Aging population and increasing disease prevalence",
    "Advances in biomarker discovery and companion diagnostics",
    "Personalized medicine and precision therapeutics adoption",
    "Emerging market expansion and improved healthcare access",
    "AI/ML-driven drug discovery acceleration"
  ]
}
```

**Use Cases**:
- Market entry strategy development
- Competitive positioning analysis
- Commercial forecasting
- Acquisition due diligence

---

### 6. Collaboration Matching

Find partners for CAR-T cell therapy co-development.

**Request**:
```json
{
  "tool": "thn_collaboration_match",
  "arguments": {
    "technology_area": "CAR-T cell therapy",
    "partnership_type": "co-development",
    "stage": "phase_2",
    "geographic_preference": ["North_America", "Europe"]
  }
}
```

**Expected Output**:
```json
{
  "technology_area": "CAR-T cell therapy",
  "partnership_type": "co-development",
  "development_stage": "phase_2",
  "potential_partners": [
    {
      "organization": "Roche",
      "technology_fit_score": 88,
      "strategic_fit_score": 85,
      "financial_capacity": "strong",
      "previous_similar_deals": 12,
      "estimated_deal_size_usd_millions": 350
    },
    {
      "organization": "Novartis",
      "technology_fit_score": 82,
      "strategic_fit_score": 80,
      "financial_capacity": "strong",
      "previous_similar_deals": 10,
      "estimated_deal_size_usd_millions": 300
    },
    {
      "organization": "Adaptive Biotech",
      "technology_fit_score": 90,
      "strategic_fit_score": 75,
      "financial_capacity": "moderate",
      "previous_similar_deals": 5,
      "estimated_deal_size_usd_millions": 150
    }
  ],
  "deal_structure_recommendations": [
    {
      "structure_type": "Traditional Licensing (Exclusive)",
      "upfront_payment_range_usd_millions": "$25 - $75",
      "milestone_payments_range_usd_millions": "$100 - $300",
      "royalty_range_percent": "5 - 15%",
      "typical_term_years": 12
    },
    {
      "structure_type": "Co-Development Agreement",
      "upfront_payment_range_usd_millions": "$10 - $50",
      "milestone_payments_range_usd_millions": "$150 - $400",
      "royalty_range_percent": "3 - 10%",
      "typical_term_years": 10
    }
  ],
  "comparable_transactions": [
    {
      "transaction_description": "Roche in-licenses gene therapy platform from Spark Therapeutics",
      "announced_date": "2019-12-23",
      "deal_value": "$4.3B upfront + milestones",
      "key_terms": "Exclusive license for hemophilia and retinal disease programs"
    },
    {
      "transaction_description": "Adaptive Biotech co-development with Roche for oncology immunotherapies",
      "announced_date": "2018-05-15",
      "deal_value": "$65M upfront + $435M milestones",
      "key_terms": "Joint development, co-commercialization for TCR therapies"
    }
  ],
  "success_probability_percent": 68
}
```

**Use Cases**:
- Partnership search and identification
- Deal structure negotiations
- Valuation benchmarking
- Strategic alliance planning

## Integration Examples

### With Claude AI

When using with Claude or similar AI assistants:

```typescript
// Pseudo-code for AI integration
const result = await callTHNGlobalTool({
  tool: "thn_patent_landscape",
  arguments: {
    therapeutic_area: "oncology",
    molecule_type: "small_molecule",
    target_pathway: "PD-1 checkpoint",
    date_range: { start_year: 2020, end_year: 2024 }
  }
});

// Process results
analyzePatentLandscape(result);
generateStrategicRecommendations(result);
createExecutiveSummary(result);
```

### In Business Intelligence Workflows

1. **Weekly Competitive Intelligence**
   - Run market_intelligence monthly
   - Track competitor pipelines
   - Monitor patent filings

2. **Due Diligence Package**
   - Run all 6 tools for comprehensive analysis
   - Generate detailed reports
   - Create investment memorandum

3. **Strategic Planning**
   - Patent landscape + IP strategy
   - Market intelligence + regulatory pathway
   - Collaboration matching

## Best Practices

### Input Data Quality
- Use precise therapeutic area names
- Provide realistic budget ranges
- Specify actual target markets
- Include relevant existing patents

### Output Interpretation
- Compare results against known data points
- Validate assumptions with domain experts
- Use as starting point for deeper analysis
- Update analyses quarterly

### Integration Patterns
- Cache results for similar queries
- Track analysis evolution over time
- Share outputs with cross-functional teams
- Document key assumptions

## Troubleshooting

### Common Issues

**Issue**: Invalid therapeutic area
- **Solution**: Use standard therapeutic categories (oncology, cardiovascular, immunology, etc.)

**Issue**: Inconsistent results
- **Solution**: Ensure date ranges and parameters are realistic

**Issue**: Unexpected cost projections
- **Solution**: Verify budget ranges are in millions USD and reasonable for approach

## Performance Tips

- Pre-validate all inputs against schemas
- Cache frequently used queries
- Batch multiple analyses
- Use appropriate time horizons (5yr for forward-looking)

## Next Steps

1. Install and run the server
2. Test with provided examples
3. Integrate into your workflow
4. Connect to real data sources
5. Build custom analysis pipelines

For more information, visit [THN Global](https://thn-global.com)
