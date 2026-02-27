/**
 * jcl-scanner.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T06:00:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */

export interface JclScanResult {
  job_name: string;
  risk_classification: string;
  risk_level: string;
  steps_analyzed: number;
  data_sets_detected: string[];
  ai_governance_touchpoints: string[];
  batch_scheduling_concerns: string[];
  data_lineage: string[];
  remediation: string[];
}

export function handleJclScanner(
  jobName: string,
  jclContent: string,
  scanScope: string,
  targetGovernance: string
): JclScanResult {
  const contentLower = jclContent.toLowerCase();
  const scopeLower = scanScope.toLowerCase();
  const govLower = targetGovernance.toLowerCase();

  let riskClassification = "Standard JCL batch job";
  let riskLevel = "LOW";

  // Detect job characteristics
  const hasDb2 = contentLower.includes("db2") || contentLower.includes("dsn") || contentLower.includes("ikjeft01");
  const hasCics = contentLower.includes("cics") || contentLower.includes("dfhcsdup");
  const hasIms = contentLower.includes("ims") || contentLower.includes("dfsrrc00");
  const hasFtp = contentLower.includes("ftp") || contentLower.includes("xmit") || contentLower.includes("transmit");
  const hasSort = contentLower.includes("sort") || contentLower.includes("dfsort") || contentLower.includes("syncsort");
  const hasSensitiveData = contentLower.includes("customer") || contentLower.includes("account") ||
    contentLower.includes("ssn") || contentLower.includes("patient") || contentLower.includes("credit");

  // Count steps
  const stepCount = (jclContent.match(/\/\/\w+\s+EXEC/gi) || []).length || 1;

  // Detect datasets
  const datasets: string[] = [];
  const dsnMatches = jclContent.match(/DSN=([^\s,)]+)/gi) || [];
  for (const m of dsnMatches) {
    const dsn = m.replace(/DSN=/i, "").trim();
    if (!datasets.includes(dsn)) datasets.push(dsn);
  }
  if (datasets.length === 0) {
    datasets.push("(Dataset names detected from JCL DD statements)");
  }

  // Risk classification
  if (hasSensitiveData && hasFtp) {
    riskClassification = "HIGH RISK — Batch job transfers sensitive data externally";
    riskLevel = "HIGH";
  } else if (hasSensitiveData && hasDb2) {
    riskClassification = "ELEVATED — Batch job processes sensitive data from DB2";
    riskLevel = "MEDIUM";
  } else if (hasCics || hasIms) {
    riskClassification = "ELEVATED — Batch job interacts with online subsystems (CICS/IMS)";
    riskLevel = "MEDIUM";
  }

  // AI governance touchpoints
  const touchpoints: string[] = [
    "Identify batch outputs that feed AI model training pipelines",
    "Map JCL job dependencies to AI governance data freshness requirements",
    "Document batch window timing vs AI system SLA expectations"
  ];
  if (hasDb2) {
    touchpoints.push("DB2 queries in batch may extract data used for AI model features — document lineage");
  }
  if (hasFtp) {
    touchpoints.push("CRITICAL: FTP transfers of data to AI systems require encryption assessment");
    touchpoints.push("Replace FTP with SFTP/FTPS for data feeding AI governance pipelines");
  }
  if (hasSort) {
    touchpoints.push("SORT steps may aggregate/transform data — document transformations for AI data lineage");
  }

  // Batch scheduling concerns
  const scheduling: string[] = [
    "Ensure batch completion before AI governance API scheduled assessments",
    "Implement job completion notification to trigger MCP API governance scans",
    "Monitor ABEND rates — failed batches leave AI governance with stale data"
  ];
  if (scopeLower.includes("critical") || scopeLower.includes("production")) {
    scheduling.push("Production batch: implement restart/recovery procedures for AI pipeline continuity");
    scheduling.push("Establish batch SLA — max acceptable delay before AI governance data becomes stale");
  }

  // Data lineage
  const lineage: string[] = [
    `JCL Job: ${jobName} → ${stepCount} steps → ${datasets.length} datasets`,
    "Map input datasets to source systems (DB2, VSAM, sequential)",
    "Map output datasets to downstream AI governance consumers",
    "Document data transformations at each JCL step for regulatory audit"
  ];
  if (govLower.includes("eu") || govLower.includes("gdpr")) {
    lineage.push("GDPR Art. 30 — Record of processing activities must include batch data flows to AI systems");
  }

  // Remediation
  const remediation: string[] = [
    "Create JCL job catalog documenting all batch jobs that feed AI governance data",
    "Implement automated JCL scanning in CI/CD pipeline for new/changed jobs",
    "Add MCP API notification step to JCL jobs that produce AI governance input data",
    "Replace IEBGENER with modern ETL for complex data transformations to AI systems",
    "Establish JCL change control process that includes AI governance impact assessment"
  ];
  if (riskLevel === "HIGH") {
    remediation.unshift("URGENT: Review and encrypt all external data transfers from batch to AI systems");
  }

  return {
    job_name: jobName,
    risk_classification: riskClassification,
    risk_level: riskLevel,
    steps_analyzed: stepCount,
    data_sets_detected: datasets,
    ai_governance_touchpoints: touchpoints,
    batch_scheduling_concerns: scheduling,
    data_lineage: lineage,
    remediation
  };
}
