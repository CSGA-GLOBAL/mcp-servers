/**
 * THN Global MCP Server Types
 * Core type definitions for pharma AI IP engine
 */

// Patent Landscape Analysis Types
export interface PatentDensityMap {
  therapeutic_area: string;
  total_patents: number;
  patent_trend: "increasing" | "stable" | "declining";
  density_by_region: {
    region: string;
    count: number;
    percentage: number;
  }[];
}

export interface KeyPatentHolder {
  organization: string;
  patent_count: number;
  recent_filings: number;
  market_share: number;
  focus_areas: string[];
}

export interface FreedomToOperateAssessment {
  risk_level: "low" | "moderate" | "high" | "critical";
  blocking_patents: number;
  design_around_possible: boolean;
  estimated_licensing_cost: string;
  recommendation: string;
}

export interface PatentLandscapeResult {
  therapeutic_area: string;
  search_date: string;
  patent_density_map: PatentDensityMap;
  key_patent_holders: KeyPatentHolder[];
  white_space_opportunities: string[];
  freedom_to_operate: FreedomToOperateAssessment;
  competitive_landscape: {
    major_competitors: string[];
    emerging_players: string[];
    technology_trends: string[];
  };
}

// Drug Discovery AI Types
export type ApproachType =
  | "small_molecule"
  | "biologics"
  | "gene_therapy"
  | "cell_therapy";
export type DevelopmentStage =
  | "discovery"
  | "preclinical"
  | "phase_1"
  | "phase_2"
  | "phase_3"
  | "nda_stage";

export interface CompetitiveProgram {
  organization: string;
  program_name: string;
  stage: string;
  mechanism: string;
  estimated_completion: string;
}

export interface DrugDiscoveryResult {
  target_disease: string;
  approach: ApproachType;
  feasibility_score: number; // 0-100
  competitive_programs: CompetitiveProgram[];
  estimated_timeline_months: number;
  regulatory_pathway: string;
  key_risks: string[];
  cost_projection: {
    phase_1_to_submission: string;
    total_to_approval: string;
    risk_adjusted_npv: string;
  };
  technical_readiness: number; // 0-100
}

// IP Strategy Types
export type InnovationType =
  | "composition_of_matter"
  | "method_of_use"
  | "device"
  | "formulation"
  | "manufacturing_process"
  | "combination_therapy";

export interface PatentFilingPriority {
  patent_type: string;
  priority_level: "high" | "medium" | "low";
  jurisdiction: string;
  estimated_cost: string;
  timeline_months: number;
}

export interface IPStrategyResult {
  innovation_type: InnovationType;
  jurisdiction: string;
  ip_strategy_recommendations: string[];
  patent_filing_priorities: PatentFilingPriority[];
  defensive_strategies: string[];
  licensing_opportunities: {
    territory: string;
    estimated_revenue: string;
    potential_partners: string[];
  }[];
  estimated_total_costs: string;
  estimated_roi_timeline_years: number;
}

// Regulatory Pathway Types
export type FDAPathway =
  | "505(b)(1)"
  | "505(b)(2)"
  | "351(a)"
  | "351(k)"
  | "505(j)";
export type EMAPathway =
  | "centralized"
  | "decentralized"
  | "mutual_recognition";
export type TherapeuticArea =
  | "oncology"
  | "cardiovascular"
  | "immunology"
  | "neurology"
  | "infectious_disease"
  | "rare_disease"
  | "metabolic";

export interface RequiredStudy {
  study_type: string;
  estimated_duration_months: number;
  patient_population_size: number;
  estimated_cost: string;
}

export interface RegulatoryPathwayResult {
  drug_type: string;
  therapeutic_area: TherapeuticArea;
  target_market: string;
  fda_pathway: FDAPathway | null;
  ema_pathway: EMAPathway | null;
  total_timeline_months: number;
  required_studies: RequiredStudy[];
  fda_fee_schedule: string;
  key_milestones: {
    milestone: string;
    expected_month: number;
  }[];
  priority_review_eligible: boolean;
  accelerated_pathway_available: boolean;
}

// Market Intelligence Types
export interface MarketSize {
  current_usd_billions: number;
  projected_5yr_usd_billions: number;
  cagr_percent: number;
}

export interface KeyPlayer {
  organization: string;
  market_share_percent: number;
  key_products: string[];
  pipeline_stage_count: {
    early: number;
    clinical: number;
    late_stage: number;
  };
}

export interface PricingTrend {
  therapeutic_area: string;
  average_launch_price_per_year: number;
  erosion_rate_percent: number;
  generic_entry_timeline_years: number;
}

export interface MarketIntelligenceResult {
  therapeutic_area: string;
  geography: string;
  analysis_date: string;
  market_size: MarketSize;
  key_players: KeyPlayer[];
  pipeline_analysis: {
    total_programs: number;
    by_stage: Record<string, number>;
    therapy_type_distribution: Record<string, number>;
  };
  pricing_trends: PricingTrend[];
  reimbursement_landscape: string[];
  market_access_barriers: string[];
  growth_drivers: string[];
}

// Collaboration Match Types
export type PartnershipType =
  | "licensing"
  | "co-development"
  | "acquisition"
  | "joint_venture"
  | "research_collaboration";

export interface PartnerMatch {
  organization: string;
  technology_fit_score: number; // 0-100
  strategic_fit_score: number; // 0-100
  financial_capacity: "strong" | "moderate" | "limited";
  previous_similar_deals: number;
  estimated_deal_size_usd_millions: number;
}

export interface DealStructureRecommendation {
  structure_type: string;
  upfront_payment_range_usd_millions: string;
  milestone_payments_range_usd_millions: string;
  royalty_range_percent: string;
  typical_term_years: number;
}

export interface CollaborationMatchResult {
  technology_area: string;
  partnership_type: PartnershipType;
  development_stage: string;
  potential_partners: PartnerMatch[];
  deal_structure_recommendations: DealStructureRecommendation[];
  comparable_transactions: {
    transaction_description: string;
    announced_date: string;
    deal_value: string;
    key_terms: string;
  }[];
  success_probability_percent: number;
}
