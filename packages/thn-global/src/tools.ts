/**
 * THN Global MCP Server Tools Implementation
 * Core business logic for pharma AI IP engine
 */

import {
  PatentLandscapeInput,
  DrugDiscoveryAIInput,
  IPStrategyInput,
  RegulatoryPathwayInput,
  MarketIntelligenceInput,
  CollaborationMatchInput,
} from "./schemas";
import {
  PatentLandscapeResult,
  DrugDiscoveryResult,
  IPStrategyResult,
  RegulatoryPathwayResult,
  MarketIntelligenceResult,
  CollaborationMatchResult,
} from "./types";

/**
 * Patent Landscape Analysis Tool
 * Analyzes patent landscape for drug discovery
 */
export async function patentLandscapeAnalysis(
  input: PatentLandscapeInput
): Promise<PatentLandscapeResult> {
  const { therapeutic_area, molecule_type, target_pathway, date_range } =
    input;

  // Simulated patent landscape data based on therapeutic area
  const patentDensityByRegion = generatePatentDensityByRegion(
    therapeutic_area
  );
  const totalPatents = patentDensityByRegion.reduce(
    (sum, region) => sum + region.count,
    0
  );

  const keyHolders = generateKeyPatentHolders(therapeutic_area, molecule_type);

  const whiteSpaceOpportunities = generateWhiteSpaceOpportunities(
    therapeutic_area,
    target_pathway
  );

  const ftoAssessment = generateFTOAssessment(
    therapeutic_area,
    molecule_type,
    totalPatents
  );

  return {
    therapeutic_area,
    search_date: new Date().toISOString().split("T")[0],
    patent_density_map: {
      therapeutic_area,
      total_patents: totalPatents,
      patent_trend:
        date_range.end_year - date_range.start_year > 10
          ? "increasing"
          : "stable",
      density_by_region: patentDensityByRegion,
    },
    key_patent_holders: keyHolders,
    white_space_opportunities: whiteSpaceOpportunities,
    freedom_to_operate: ftoAssessment,
    competitive_landscape: {
      major_competitors: generateMajorCompetitors(therapeutic_area),
      emerging_players: generateEmergingPlayers(therapeutic_area),
      technology_trends: generateTechnologyTrends(therapeutic_area),
    },
  };
}

/**
 * Drug Discovery AI Tool
 * Assesses pipeline feasibility and provides development guidance
 */
export async function drugDiscoveryAI(
  input: DrugDiscoveryAIInput
): Promise<DrugDiscoveryResult> {
  const {
    target_disease,
    approach,
    development_stage,
    budget_range,
  } = input;

  const feasibilityScore = calculateFeasibilityScore(
    approach,
    development_stage,
    budget_range
  );
  const competitivePrograms = generateCompetitivePrograms(
    target_disease,
    approach
  );
  const timelineMonths = estimateTimelineMonths(development_stage, approach);
  const regulatoryPath = determineRegulatoryPath(approach, target_disease);
  const technicalReadiness = calculateTechnicalReadiness(
    development_stage,
    approach
  );

  return {
    target_disease,
    approach,
    feasibility_score: feasibilityScore,
    competitive_programs: competitivePrograms,
    estimated_timeline_months: timelineMonths,
    regulatory_pathway: regulatoryPath,
    key_risks: generateKeyRisks(approach, target_disease, development_stage),
    cost_projection: generateCostProjection(
      approach,
      development_stage,
      timelineMonths
    ),
    technical_readiness: technicalReadiness,
  };
}

/**
 * IP Strategy Tool
 * Develops comprehensive IP strategy for innovations
 */
export async function ipStrategy(
  input: IPStrategyInput
): Promise<IPStrategyResult> {
  const {
    innovation_type,
    jurisdiction,
    competitive_landscape,
  } = input;

  const recommendations = generateIPRecommendations(
    innovation_type,
    competitive_landscape
  );
  const filingPriorities = generatePatentFilingPriorities(
    innovation_type,
    jurisdiction
  );
  const defensiveStrategies = generateDefensiveStrategies(innovation_type);
  const licensingOpportunities = generateLicensingOpportunities(
    innovation_type,
    jurisdiction
  );

  const totalCosts = calculateTotalIPCosts(filingPriorities);
  const roiTimeline = estimateROITimeline(innovation_type);

  return {
    innovation_type,
    jurisdiction: jurisdiction.join(", "),
    ip_strategy_recommendations: recommendations,
    patent_filing_priorities: filingPriorities,
    defensive_strategies: defensiveStrategies,
    licensing_opportunities: licensingOpportunities,
    estimated_total_costs: totalCosts,
    estimated_roi_timeline_years: roiTimeline,
  };
}

/**
 * Regulatory Pathway Tool
 * Maps regulatory pathway for drug approval
 */
export async function regulatoryPathway(
  input: RegulatoryPathwayInput
): Promise<RegulatoryPathwayResult> {
  const {
    drug_type,
    therapeutic_area,
    target_market,
    development_phase,
  } = input;

  const fdaPathway = determineFDAPathway(drug_type, therapeutic_area);
  const emaPathway = determineEMAPathway(drug_type, therapeutic_area);
  const requiredStudies = generateRequiredStudies(drug_type, therapeutic_area);
  const timelineMonths = calculateRegulatoryTimeline(
    fdaPathway,
    emaPathway,
    target_market
  );
  const milestones = generateRegulatoryMilestones(development_phase);

  const isPriorityReview = checkPriorityReviewEligibility(therapeutic_area);
  const hasAcceleratedPath = checkAcceleratedPathway(therapeutic_area);

  return {
    drug_type,
    therapeutic_area,
    target_market: target_market.join(", "),
    fda_pathway: fdaPathway,
    ema_pathway: emaPathway,
    total_timeline_months: timelineMonths,
    required_studies: requiredStudies,
    fda_fee_schedule: generateFDAFeeSchedule(drug_type),
    key_milestones: milestones,
    priority_review_eligible: isPriorityReview,
    accelerated_pathway_available: hasAcceleratedPath,
  };
}

/**
 * Market Intelligence Tool
 * Provides pharma market analysis and competitive insights
 */
export async function marketIntelligence(
  input: MarketIntelligenceInput
): Promise<MarketIntelligenceResult> {
  const { therapeutic_area, geography, time_horizon } = input;

  const marketSize = generateMarketSize(therapeutic_area, time_horizon);
  const keyPlayers = generateKeyPlayers(therapeutic_area);
  const pipelineAnalysis = generatePipelineAnalysis(therapeutic_area);
  const pricingTrends = generatePricingTrends(therapeutic_area);
  const reimbursement = generateReimbursementLandscape(therapeutic_area);
  const barriers = generateMarketAccessBarriers(therapeutic_area);
  const drivers = generateGrowthDrivers(therapeutic_area);

  return {
    therapeutic_area,
    geography: geography.join(", "),
    analysis_date: new Date().toISOString().split("T")[0],
    market_size: marketSize,
    key_players: keyPlayers,
    pipeline_analysis: pipelineAnalysis,
    pricing_trends: pricingTrends,
    reimbursement_landscape: reimbursement,
    market_access_barriers: barriers,
    growth_drivers: drivers,
  };
}

/**
 * Collaboration Match Tool
 * Identifies and matches potential research collaborators
 */
export async function collaborationMatch(
  input: CollaborationMatchInput
): Promise<CollaborationMatchResult> {
  const {
    technology_area,
    partnership_type,
    stage,
    geographic_preference,
  } = input;

  const potentialPartners = generatePotentialPartners(
    technology_area,
    partnership_type,
    geographic_preference
  );
  const dealStructures = generateDealStructures(partnership_type, stage);
  const comparableTransactions = generateComparableTransactions(
    partnership_type,
    technology_area
  );
  const successProbability = calculateSuccessProbability(
    partnership_type,
    technology_area
  );

  return {
    technology_area,
    partnership_type,
    development_stage: stage,
    potential_partners: potentialPartners,
    deal_structure_recommendations: dealStructures,
    comparable_transactions: comparableTransactions,
    success_probability_percent: successProbability,
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

function generatePatentDensityByRegion(
  _therapeuticArea: string
): { region: string; count: number; percentage: number }[] {
  const basePatents: Record<string, number> = {
    "United States": 2500,
    Europe: 1800,
    "Asia Pacific": 1200,
    "Rest of World": 500,
  };

  const adjusted = Object.entries(basePatents).map(([region, count]) => ({
    region,
    count: count + Math.floor(Math.random() * 500),
    percentage: 0,
  }));

  const total = adjusted.reduce((sum, r) => sum + r.count, 0);
  adjusted.forEach((r) => {
    r.percentage = Math.round((r.count / total) * 100);
  });

  return adjusted;
}

function generateKeyPatentHolders(
  therapeuticArea: string,
  _moleculeType: string
): { organization: string; patent_count: number; recent_filings: number; market_share: number; focus_areas: string[] }[] {
  const holders = [
    { name: "Pfizer", count: 450, recent: 35, share: 12 },
    { name: "Roche", count: 420, recent: 32, share: 11 },
    { name: "Merck", count: 380, recent: 28, share: 10 },
    { name: "Novartis", count: 350, recent: 25, share: 9 },
    { name: "Johnson & Johnson", count: 320, recent: 22, share: 8 },
  ];

  return holders.map((h) => ({
    organization: h.name,
    patent_count: h.count,
    recent_filings: h.recent,
    market_share: h.share,
    focus_areas: generateFocusAreas(therapeuticArea),
  }));
}

function generateFocusAreas(therapeuticArea: string): string[] {
  const areaFocus: Record<string, string[]> = {
    oncology: ["checkpoint inhibitors", "CAR-T cells", "targeted therapies"],
    immunology: ["biologics", "antibodies", "cell therapy"],
    cardiovascular: [
      "PCSK9 inhibitors",
      "heart failure",
      "anticoagulants",
    ],
    neurology: ["Alzheimer's", "Parkinson's", "neuroinflammation"],
  };
  return areaFocus[therapeuticArea] || ["general therapeutics"];
}

function generateWhiteSpaceOpportunities(
  therapeuticArea: string,
  targetPathway: string
): string[] {
  return [
    `Novel mechanism in ${targetPathway} pathway with minimal patent coverage`,
    `Combination therapy approaches not yet patented for ${therapeuticArea}`,
    `Geographic opportunities in emerging markets with lower patent density`,
    `Next-generation formulation strategies for improved bioavailability`,
    `Companion diagnostic and therapeutic co-development opportunities`,
  ];
}

function generateFTOAssessment(
  _therapeuticArea: string,
  _moleculeType: string,
  totalPatents: number
): { risk_level: "low" | "moderate" | "high" | "critical"; blocking_patents: number; design_around_possible: boolean; estimated_licensing_cost: string; recommendation: string } {
  const riskLevel: "low" | "moderate" | "high" | "critical" =
    totalPatents > 3500 ? "critical" : totalPatents > 3000 ? "high" : totalPatents > 2000 ? "moderate" : "low";

  return {
    risk_level: riskLevel,
    blocking_patents: Math.floor(totalPatents * 0.15),
    design_around_possible: riskLevel !== "critical",
    estimated_licensing_cost: "$2.5M - $8.5M",
    recommendation:
      "Recommended to proceed with design-around strategy and selective licensing negotiations",
  };
}

function generateMajorCompetitors(_therapeuticArea: string): string[] {
  return ["Pfizer", "Roche", "Merck", "Novartis", "Johnson & Johnson"];
}

function generateEmergingPlayers(_therapeuticArea: string): string[] {
  return ["Adaptive Biotech", "Caribou Biosciences", "Sangamo Therapeutics"];
}

function generateTechnologyTrends(_therapeuticArea: string): string[] {
  return [
    "AI-driven target discovery and validation",
    "mRNA and viral vector technologies",
    "Protein degradation (PROTAC) approaches",
    "Cell and gene therapy manufacturing",
    "Real-world evidence and digital biomarkers",
  ];
}

function calculateFeasibilityScore(
  approach: string,
  developmentStage: string,
  budgetRange: { min_usd_millions: number; max_usd_millions: number }
): number {
  const stageScores: Record<string, number> = {
    discovery: 65,
    preclinical: 70,
    phase_1: 75,
    phase_2: 65,
    phase_3: 45,
    nda_stage: 35,
  };

  const approachScores: Record<string, number> = {
    small_molecule: 75,
    biologics: 70,
    gene_therapy: 55,
    cell_therapy: 50,
  };

  const baseScore = (stageScores[developmentStage] + approachScores[approach]) / 2;
  const budgetFactor = budgetRange.max_usd_millions > 500 ? 1.1 : 0.95;

  return Math.round(Math.min(100, baseScore * budgetFactor));
}

function generateCompetitivePrograms(
  _targetDisease: string,
  approach: string
): { organization: string; program_name: string; stage: string; mechanism: string; estimated_completion: string }[] {
  return [
    {
      organization: "Roche",
      program_name: "RG-7156",
      stage: "Phase 3",
      mechanism: approach,
      estimated_completion: "2025-Q4",
    },
    {
      organization: "Merck",
      program_name: "MK-8889",
      stage: "Phase 2",
      mechanism: approach,
      estimated_completion: "2026-Q2",
    },
    {
      organization: "Novartis",
      program_name: "NVS-5888",
      stage: "Phase 1",
      mechanism: approach,
      estimated_completion: "2027-Q1",
    },
  ];
}

function estimateTimelineMonths(
  developmentStage: string,
  approach: string
): number {
  const stageMonths: Record<string, number> = {
    discovery: 36,
    preclinical: 48,
    phase_1: 24,
    phase_2: 36,
    phase_3: 48,
    nda_stage: 12,
  };

  const approachAdjustment: Record<string, number> = {
    small_molecule: 1,
    biologics: 1.2,
    gene_therapy: 1.5,
    cell_therapy: 1.6,
  };

  return Math.round(
    stageMonths[developmentStage] * (approachAdjustment[approach] || 1)
  );
}

function determineRegulatoryPath(approach: string, _targetDisease: string): string {
  return approach === "biologic" ? "BLA (351(a))" : "NDA (505(b)(1))";
}

function calculateTechnicalReadiness(
  developmentStage: string,
  approach: string
): number {
  const stageReadiness: Record<string, number> = {
    discovery: 20,
    preclinical: 35,
    phase_1: 50,
    phase_2: 65,
    phase_3: 80,
    nda_stage: 95,
  };

  const approachAdjustment: Record<string, number> = {
    small_molecule: 1,
    biologics: 0.95,
    gene_therapy: 0.85,
    cell_therapy: 0.8,
  };

  return Math.round(
    stageReadiness[developmentStage] * (approachAdjustment[approach] || 1)
  );
}

function generateKeyRisks(
  approach: string,
  _targetDisease: string,
  _developmentStage: string
): string[] {
  const risks = [
    "Clinical efficacy not meeting primary endpoints",
    "Safety and tolerability concerns emerging in later stage trials",
    "Manufacturing scale-up challenges and cost constraints",
    "Competitive pressure from advanced programs in space",
    "Regulatory pathway complexity and potential delays",
  ];

  if (approach === "gene_therapy" || approach === "cell_therapy") {
    risks.push("CMC (Chemistry, Manufacturing, Controls) complexity");
    risks.push("Immunogenicity and durability concerns");
  }

  return risks.slice(0, 5);
}

function generateCostProjection(
  approach: string,
  _developmentStage: string,
  _timelineMonths: number
): { phase_1_to_submission: string; total_to_approval: string; risk_adjusted_npv: string } {
  const costFactors: Record<string, number> = {
    small_molecule: 150,
    biologics: 300,
    gene_therapy: 500,
    cell_therapy: 600,
  };

  const baseCost = costFactors[approach] || 200;
  const phase1ToSubmission = (baseCost * 0.4).toFixed(0);
  const totalToApproval = baseCost.toString();
  const npv = (baseCost * 0.65).toFixed(0);

  return {
    phase_1_to_submission: `$${phase1ToSubmission}M - $${(parseInt(phase1ToSubmission) * 1.3).toFixed(0)}M`,
    total_to_approval: `$${totalToApproval}M - $${(baseCost * 1.4).toFixed(0)}M`,
    risk_adjusted_npv: `$${npv}M (45-55% probability of success)`,
  };
}

function generateIPRecommendations(
  _innovationType: string,
  _competitiveLandscape: string | undefined
): string[] {
  return [
    `File composition of matter patent with broad and narrow claim sets`,
    `Develop method of use patents for multiple indications`,
    `Consider process patents for novel manufacturing approaches`,
    `Build trade secret protection for manufacturing know-how`,
    `Establish patent thicket strategy to maximize exclusivity`,
    `Plan freedom-to-operate analysis before market entry`,
  ];
}

function generatePatentFilingPriorities(
  _innovationType: string,
  jurisdictions: string[]
): { patent_type: string; priority_level: "high" | "medium" | "low"; jurisdiction: string; estimated_cost: string; timeline_months: number }[] {
  const priorities = [];

  for (const jurisdiction of jurisdictions) {
    priorities.push({
      patent_type: "Composition of Matter",
      priority_level: "high" as const,
      jurisdiction,
      estimated_cost: "$15,000 - $25,000",
      timeline_months: 36,
    });
    priorities.push({
      patent_type: "Method of Use",
      priority_level: "high" as const,
      jurisdiction,
      estimated_cost: "$12,000 - $20,000",
      timeline_months: 36,
    });
  }

  return priorities.slice(0, 6);
}

function generateDefensiveStrategies(_innovationType: string): string[] {
  return [
    "Monitor competitor patent filings and file oppositions if needed",
    "Build robust technical documentation for trade secret claims",
    "Establish clear patent prosecution history for claim interpretation",
    "Consider design-around patents for core competitor IP",
    "Develop contingency licensing agreements with key players",
    "Maintain patent portfolio maintenance and renewal strategy",
  ];
}

function generateLicensingOpportunities(
  _innovationType: string,
  _jurisdictions: string[]
): { territory: string; estimated_revenue: string; potential_partners: string[] }[] {
  return [
    {
      territory: "Asia Pacific",
      estimated_revenue: "$50M - $150M",
      potential_partners: [
        "Takeda",
        "Astellas",
        "Daiichi Sankyo",
      ],
    },
    {
      territory: "Europe",
      estimated_revenue: "$75M - $200M",
      potential_partners: [
        "Roche",
        "Novartis",
        "Sanofi",
      ],
    },
    {
      territory: "US",
      estimated_revenue: "$100M - $250M",
      potential_partners: [
        "Pfizer",
        "Merck",
        "Johnson & Johnson",
      ],
    },
  ];
}

function calculateTotalIPCosts(
  _filingPriorities: { estimated_cost: string }[]
): string {
  return "$200,000 - $400,000 (5-year prosecution + maintenance)";
}

function estimateROITimeline(_innovationType: string): number {
  return 7;
}

function determineFDAPathway(
  drugType: string,
  _therapeuticArea: string
): "505(b)(1)" | "505(b)(2)" | "351(a)" | "351(k)" {
  return drugType === "biologic" ? "351(a)" : "505(b)(1)";
}

function determineEMAPathway(
  _drugType: string,
  _therapeuticArea: string
): "centralized" | "decentralized" | "mutual_recognition" {
  return "centralized";
}

function generateRequiredStudies(
  _drugType: string,
  _therapeuticArea: string
): { study_type: string; estimated_duration_months: number; patient_population_size: number; estimated_cost: string }[] {
  return [
    {
      study_type: "Phase 1 (Safety and Tolerability)",
      estimated_duration_months: 18,
      patient_population_size: 40,
      estimated_cost: "$5M - $10M",
    },
    {
      study_type: "Phase 2 (Efficacy and Safety)",
      estimated_duration_months: 24,
      patient_population_size: 150,
      estimated_cost: "$15M - $30M",
    },
    {
      study_type: "Phase 3 (Confirmatory)",
      estimated_duration_months: 36,
      patient_population_size: 500,
      estimated_cost: "$50M - $100M",
    },
  ];
}

function calculateRegulatoryTimeline(
  _fdaPathway: string | null,
  _emaPathway: string | null,
  targetMarkets: string[]
): number {
  return targetMarkets.includes("US") ? 84 : 72;
}

function generateRegulatoryMilestones(
  _developmentPhase: string
): { milestone: string; expected_month: number }[] {
  return [
    { milestone: "IND Application Submitted", expected_month: 12 },
    { milestone: "Phase 1 Enrollment Complete", expected_month: 24 },
    { milestone: "Phase 2 Enrollment Complete", expected_month: 48 },
    { milestone: "Phase 3 Enrollment Complete", expected_month: 84 },
    { milestone: "NDA/BLA Submission", expected_month: 96 },
    { milestone: "FDA Approval", expected_month: 108 },
  ];
}

function checkPriorityReviewEligibility(_therapeuticArea: string): boolean {
  return ["oncology", "rare_disease", "infectious_disease"].includes(
    _therapeuticArea
  );
}

function checkAcceleratedPathway(_therapeuticArea: string): boolean {
  return ["oncology", "rare_disease"].includes(_therapeuticArea);
}

function generateFDAFeeSchedule(_drugType: string): string {
  return _drugType === "biologic"
    ? "BPci Fee: $124,500 (FY2024)"
    : "NDA Fee: $324,800 (FY2024)";
}

function generateMarketSize(
  therapeuticArea: string,
  timeHorizon: string
): { current_usd_billions: number; projected_5yr_usd_billions: number; cagr_percent: number } {
  const baseSize: Record<string, number> = {
    oncology: 180,
    immunology: 95,
    cardiovascular: 140,
    neurology: 85,
    infectious_disease: 75,
  };

  const current = baseSize[therapeuticArea] || 50;
  const projected = current * (timeHorizon === "5yr" ? 1.45 : 2.5);
  const cagr = timeHorizon === "5yr" ? 12 : 11;

  return {
    current_usd_billions: current,
    projected_5yr_usd_billions: Math.round(projected),
    cagr_percent: cagr,
  };
}

function generateKeyPlayers(
  _therapeuticArea: string
): { organization: string; market_share_percent: number; key_products: string[]; pipeline_stage_count: { early: number; clinical: number; late_stage: number } }[] {
  return [
    {
      organization: "Pfizer",
      market_share_percent: 12,
      key_products: ["Eliquat", "Prevnar", "Xtandi"],
      pipeline_stage_count: { early: 8, clinical: 5, late_stage: 2 },
    },
    {
      organization: "Roche",
      market_share_percent: 11,
      key_products: ["Avastin", "Herceptin", "Perjeta"],
      pipeline_stage_count: { early: 7, clinical: 6, late_stage: 3 },
    },
    {
      organization: "Merck",
      market_share_percent: 10,
      key_products: ["Keytruda", "Gardasil", "Pneumovax"],
      pipeline_stage_count: { early: 9, clinical: 4, late_stage: 2 },
    },
  ];
}

function generatePipelineAnalysis(_therapeuticArea: string): { total_programs: number; by_stage: Record<string, number>; therapy_type_distribution: Record<string, number> } {
  return {
    total_programs: 145,
    by_stage: {
      discovery: 35,
      preclinical: 28,
      phase_1: 22,
      phase_2: 35,
      phase_3: 18,
      nda_stage: 7,
    },
    therapy_type_distribution: {
      small_molecule: 58,
      biologic: 52,
      gene_therapy: 18,
      cell_therapy: 12,
      other: 5,
    },
  };
}

function generatePricingTrends(
  therapeuticArea: string
): { therapeutic_area: string; average_launch_price_per_year: number; erosion_rate_percent: number; generic_entry_timeline_years: number }[] {
  return [
    {
      therapeutic_area: therapeuticArea,
      average_launch_price_per_year: 150000,
      erosion_rate_percent: 8,
      generic_entry_timeline_years: 12,
    },
  ];
}

function generateReimbursementLandscape(_therapeuticArea: string): string[] {
  return [
    "Value-based pricing models increasingly adopted by payers",
    "Risk-sharing agreements required for unproven efficacy",
    "Managed entry agreements with Phase 3 data sufficiency",
    "Real-world evidence generation mandatory for premium pricing",
    "ICER and EMA review driving price negotiations",
  ];
}

function generateMarketAccessBarriers(_therapeuticArea: string): string[] {
  return [
    "Stringent regulatory requirements and extended review timelines",
    "Limited reimbursement for combination therapies",
    "Manufacturing and supply chain constraints",
    "Intellectual property challenges in emerging markets",
    "Healthcare budget constraints and cost containment pressures",
  ];
}

function generateGrowthDrivers(_therapeuticArea: string): string[] {
  return [
    "Aging population and increasing disease prevalence",
    "Advances in biomarker discovery and companion diagnostics",
    "Personalized medicine and precision therapeutics adoption",
    "Emerging market expansion and improved healthcare access",
    "AI/ML-driven drug discovery acceleration",
  ];
}

function generatePotentialPartners(
  _technologyArea: string,
  _partnershipType: string,
  _geographicPreference: string[]
): { organization: string; technology_fit_score: number; strategic_fit_score: number; financial_capacity: "strong" | "moderate" | "limited"; previous_similar_deals: number; estimated_deal_size_usd_millions: number }[] {
  return [
    {
      organization: "Roche",
      technology_fit_score: 88,
      strategic_fit_score: 85,
      financial_capacity: "strong",
      previous_similar_deals: 12,
      estimated_deal_size_usd_millions: 350,
    },
    {
      organization: "Novartis",
      technology_fit_score: 82,
      strategic_fit_score: 80,
      financial_capacity: "strong",
      previous_similar_deals: 10,
      estimated_deal_size_usd_millions: 300,
    },
    {
      organization: "Adaptive Biotech",
      technology_fit_score: 90,
      strategic_fit_score: 75,
      financial_capacity: "moderate",
      previous_similar_deals: 5,
      estimated_deal_size_usd_millions: 150,
    },
  ];
}

function generateDealStructures(
  _partnershipType: string,
  _stage: string
): { structure_type: string; upfront_payment_range_usd_millions: string; milestone_payments_range_usd_millions: string; royalty_range_percent: string; typical_term_years: number }[] {
  return [
    {
      structure_type: "Traditional Licensing (Exclusive)",
      upfront_payment_range_usd_millions: "$25 - $75",
      milestone_payments_range_usd_millions: "$100 - $300",
      royalty_range_percent: "5 - 15%",
      typical_term_years: 12,
    },
    {
      structure_type: "Co-Development Agreement",
      upfront_payment_range_usd_millions: "$10 - $50",
      milestone_payments_range_usd_millions: "$150 - $400",
      royalty_range_percent: "3 - 10%",
      typical_term_years: 10,
    },
  ];
}

function generateComparableTransactions(
  _partnershipType: string,
  _technologyArea: string
): { transaction_description: string; announced_date: string; deal_value: string; key_terms: string }[] {
  return [
    {
      transaction_description:
        "Roche in-licenses gene therapy platform from Spark Therapeutics",
      announced_date: "2019-12-23",
      deal_value: "$4.3B upfront + milestones",
      key_terms:
        "Exclusive license for hemophilia and retinal disease programs",
    },
    {
      transaction_description:
        "Adaptive Biotech co-development with Roche for oncology immunotherapies",
      announced_date: "2018-05-15",
      deal_value: "$65M upfront + $435M milestones",
      key_terms:
        "Joint development, co-commercialization for TCR therapies",
    },
  ];
}

function calculateSuccessProbability(
  _partnershipType: string,
  _technologyArea: string
): number {
  return 68;
}
