/**
 * incident-response.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

export const IncidentResponseSchema = z.object({
  incident_name: z.string().describe("Brief name/title of the AI incident"),
  incident_description: z
    .string()
    .describe("Detailed description of what happened, when, and who was affected"),
  severity_assessment: z
    .enum(["Critical", "High", "Medium", "Low"])
    .describe("Initial severity assessment of the incident")
});

export type SeverityLevel = "Critical" | "High" | "Medium" | "Low";

export interface NotificationRequirement {
  stakeholder: string;
  timeframe: string;
  urgency: "Immediate" | "Within 24 hours" | "Within 72 hours";
  required: boolean;
}

export interface IncidentResponseResult {
  success: boolean;
  error?: string;
  data?: {
    incidentName: string;
    assessedSeverity: SeverityLevel;
    severetyRationale: string;
    immediateActions: string[];
    investigationSteps: string[];
    notificationRequirements: NotificationRequirement[];
    documenting: string[];
    remediationSteps: string[];
    preventiveMeasures: string[];
    estimatedTimelineHours: number;
  };
}

export async function handleIncidentResponse(
  incidentName: string,
  incidentDescription: string,
  severityAssessment: SeverityLevel
): Promise<IncidentResponseResult> {
  try {
    const refinedSeverity = assessSeverity(incidentDescription, severityAssessment);
    const rationale = generateSeverityRationale(incidentDescription, refinedSeverity);
    const immediateActions = generateImmediateActions(refinedSeverity);
    const investigationSteps = generateInvestigationSteps(incidentDescription, refinedSeverity);
    const notifications = generateNotificationRequirements(refinedSeverity);
    const documenting = generateDocumentationRequirements(refinedSeverity);
    const remediationSteps = generateRemediationSteps(incidentDescription, refinedSeverity);
    const preventiveMeasures = generatePreventiveMeasures(incidentDescription);
    const timeline = estimateTimeline(refinedSeverity);

    return {
      success: true,
      data: {
        incidentName,
        assessedSeverity: refinedSeverity,
        severetyRationale: rationale,
        immediateActions,
        investigationSteps,
        notificationRequirements: notifications,
        documenting,
        remediationSteps,
        preventiveMeasures,
        estimatedTimelineHours: timeline
      }
    };
  } catch (error) {
    return {
      success: false,
      error: `Incident response planning failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function assessSeverity(
  description: string,
  initialAssessment: SeverityLevel
): SeverityLevel {
  const lowerDesc = description.toLowerCase();

  // Critical severity indicators
  const criticalIndicators = [
    "death",
    "fatal",
    "serious injury",
    "mass harm",
    "national security",
    "critical infrastructure",
    "data breach",
    "all users",
    "system down",
    "widespread"
  ];

  // High severity indicators
  const highIndicators = [
    "injury",
    "financial loss",
    "unauthorized access",
    "significant impact",
    "multiple users",
    "service degradation",
    "malfunction"
  ];

  // Count indicators
  const criticalCount = criticalIndicators.filter(ind => lowerDesc.includes(ind)).length;
  const highCount = highIndicators.filter(ind => lowerDesc.includes(ind)).length;

  if (criticalCount > 0) {
    return "Critical";
  } else if (highCount >= 2 || initialAssessment === "High") {
    return "High";
  } else if (highCount === 1 || initialAssessment === "Medium") {
    return "Medium";
  } else {
    return "Low";
  }
}

function generateSeverityRationale(description: string, severity: SeverityLevel): string {
  const explanations: Record<SeverityLevel, string> = {
    Critical:
      "This incident has potential for immediate, widespread harm or involves critical systems. Requires urgent escalation and immediate response.",
    High: "This incident affects multiple users or systems with significant impact. Requires prompt investigation and remediation within 24 hours.",
    Medium:
      "This incident has limited scope or impact. Requires investigation and remediation within 72 hours. Standard incident response procedures apply.",
    Low: "This incident has minimal impact. Can be addressed through normal processes with documentation and prevention measures."
  };

  return explanations[severity];
}

function generateImmediateActions(severity: SeverityLevel): string[] {
  const actions: string[] = [];

  // Common immediate actions
  actions.push("Assemble incident response team immediately");
  actions.push("Document incident details and timeline");
  actions.push("Assess scope of impact and affected users");

  if (severity === "Critical") {
    actions.push("IMMEDIATELY isolate affected system if necessary");
    actions.push("Establish crisis communications center");
    actions.push("Begin executive and external notification");
    actions.push("Preserve all logs and evidence");
    actions.push("Deploy emergency patches if available");
    actions.push("Establish 24/7 incident command center");
    actions.push("Prepare public statement if needed");
  } else if (severity === "High") {
    actions.push("Isolate system for investigation if safe to do so");
    actions.push("Begin root cause analysis");
    actions.push("Prepare internal notifications");
    actions.push("Start user communication draft");
  } else if (severity === "Medium") {
    actions.push("Begin investigation and analysis");
    actions.push("Prepare incident documentation");
  } else {
    actions.push("Log incident in tracking system");
    actions.push("Schedule investigation for next business day");
  }

  actions.push("Activate incident response procedures");
  actions.push("Notify relevant stakeholders per notification matrix");

  return actions;
}

function generateInvestigationSteps(description: string, severity: SeverityLevel): string[] {
  const steps: string[] = [];

  // Phase 1: Initial Investigation
  steps.push("1. INITIAL INVESTIGATION");
  steps.push("- Establish timeline of incident");
  steps.push("- Identify all affected systems and users");
  steps.push("- Collect and preserve logs and evidence");
  steps.push("- Determine initial root cause");
  steps.push("- Assess ongoing impact");

  // Phase 2: Detailed Analysis
  steps.push("2. DETAILED ANALYSIS");
  steps.push("- Review system behavior before, during, and after incident");
  steps.push("- Analyze model decisions and outputs");
  steps.push("- Check for adversarial inputs or attacks");
  steps.push("- Review data quality and integrity");
  steps.push("- Examine access logs and user activity");

  if (severity === "Critical" || severity === "High") {
    steps.push("3. IMPACT ASSESSMENT");
    steps.push("- Quantify users and systems affected");
    steps.push("- Assess financial and operational impact");
    steps.push("- Identify vulnerable populations");
    steps.push("- Evaluate reputational impact");
    steps.push("- Determine if regulatory notification required");
  }

  // Phase 3: Root Cause Determination
  steps.push("4. ROOT CAUSE DETERMINATION");
  steps.push("- Identify primary failure mode");
  steps.push("- Trace cause to underlying factors");
  steps.push("- Document failure chain");
  steps.push("- Determine if systemic or isolated");

  // Phase 4: Forensics
  steps.push("5. FORENSIC ANALYSIS");
  steps.push("- Preserve evidence chain");
  steps.push("- Document all findings");
  steps.push("- Prepare for potential legal proceedings");
  steps.push("- Maintain confidentiality of sensitive findings");

  return steps;
}

function generateNotificationRequirements(severity: SeverityLevel): NotificationRequirement[] {
  const notifications: NotificationRequirement[] = [];

  if (severity === "Critical") {
    notifications.push({
      stakeholder: "Executive Leadership",
      timeframe: "Immediate (within 1 hour)",
      urgency: "Immediate",
      required: true
    });
    notifications.push({
      stakeholder: "Legal Department",
      timeframe: "Immediate (within 1 hour)",
      urgency: "Immediate",
      required: true
    });
    notifications.push({
      stakeholder: "Regulators (if applicable)",
      timeframe: "Within 24-72 hours per regulation",
      urgency: "Immediate",
      required: true
    });
    notifications.push({
      stakeholder: "Affected Users",
      timeframe: "Within 24-48 hours",
      urgency: "Immediate",
      required: true
    });
    notifications.push({
      stakeholder: "Media (if public disclosure likely)",
      timeframe: "Within 24 hours (coordinated)",
      urgency: "Immediate",
      required: true
    });
  } else if (severity === "High") {
    notifications.push({
      stakeholder: "Executive Leadership",
      timeframe: "Within 2 hours",
      urgency: "Immediate",
      required: true
    });
    notifications.push({
      stakeholder: "Legal Department",
      timeframe: "Within 2 hours",
      urgency: "Immediate",
      required: true
    });
    notifications.push({
      stakeholder: "Regulators (if applicable)",
      timeframe: "Within 24-48 hours per regulation",
      urgency: "Within 24 hours",
      required: true
    });
    notifications.push({
      stakeholder: "Affected Users",
      timeframe: "Within 48-72 hours",
      urgency: "Within 24 hours",
      required: true
    });
  } else if (severity === "Medium") {
    notifications.push({
      stakeholder: "Management",
      timeframe: "Within 24 hours",
      urgency: "Within 24 hours",
      required: true
    });
    notifications.push({
      stakeholder: "Legal (if needed)",
      timeframe: "Within 24 hours",
      urgency: "Within 24 hours",
      required: false
    });
    notifications.push({
      stakeholder: "Affected users (if any)",
      timeframe: "Within 72 hours",
      urgency: "Within 72 hours",
      required: false
    });
  } else {
    notifications.push({
      stakeholder: "Incident tracking system",
      timeframe: "Within 5 business days",
      urgency: "Within 72 hours",
      required: true
    });
  }

  return notifications;
}

function generateDocumentationRequirements(severity: SeverityLevel): string[] {
  const docs: string[] = [];

  docs.push("Incident report with timeline and key events");
  docs.push("Root cause analysis and findings");
  docs.push("Impact assessment (affected users, systems, data)");
  docs.push("All logs and evidence collected");
  docs.push("Forensic analysis report");

  if (severity === "Critical") {
    docs.push("Executive summary for board/regulators");
    docs.push("Public communication/press release");
    docs.push("Legal assessment of liability");
    docs.push("Regulatory compliance assessment");
    docs.push("Post-incident review and lessons learned");
  } else if (severity === "High") {
    docs.push("Management summary");
    docs.push("User communication sent");
    docs.push("Regulatory notification (if required)");
    docs.push("Lessons learned memo");
  } else {
    docs.push("Incident summary");
  }

  docs.push("Remediation plan with owners and deadlines");
  docs.push("Follow-up verification plan");

  return docs;
}

function generateRemediationSteps(description: string, severity: SeverityLevel): string[] {
  const steps: string[] = [];

  steps.push("1. Implement immediate fix or workaround");
  steps.push("2. Test fix in isolated environment");
  steps.push("3. Develop deployment plan with rollback procedure");
  steps.push("4. Deploy fix in phases if possible");
  steps.push("5. Verify fix effectiveness");
  steps.push("6. Monitor system after deployment");
  steps.push("7. Communicate fix to users");

  if (severity === "Critical" || severity === "High") {
    steps.push("8. Conduct post-incident review");
    steps.push("9. Identify systemic causes");
    steps.push("10. Develop long-term prevention measures");
    steps.push("11. Update documentation and procedures");
  }

  steps.push("12. Close incident after verification");

  return steps;
}

function generatePreventiveMeasures(description: string): string[] {
  const measures: string[] = [];
  const lowerDesc = description.toLowerCase();

  // Generic preventive measures
  measures.push("Implement automated monitoring and alerting for similar issues");
  measures.push("Enhance testing procedures to catch similar failures");
  measures.push("Improve system logging and observability");
  measures.push("Update incident response procedures based on lessons learned");

  // Specific to incident type
  if (lowerDesc.includes("bias") || lowerDesc.includes("discrimination")) {
    measures.push("Implement continuous bias monitoring");
    measures.push("Increase fairness testing frequency");
  }

  if (lowerDesc.includes("data") || lowerDesc.includes("breach")) {
    measures.push("Enhance data access controls and encryption");
    measures.push("Implement data loss prevention tools");
  }

  if (lowerDesc.includes("autonomous") || lowerDesc.includes("decision")) {
    measures.push("Add additional human oversight checkpoints");
    measures.push("Implement decision validation procedures");
  }

  if (lowerDesc.includes("performance") || lowerDesc.includes("degradation")) {
    measures.push("Implement continuous performance monitoring");
    measures.push("Create automated alerts for performance degradation");
  }

  measures.push("Conduct security/safety assessment of related systems");
  measures.push("Update risk assessment and governance practices");
  measures.push("Document lessons learned in knowledge base");
  measures.push("Train staff on incident response procedures");

  return measures;
}

function estimateTimeline(severity: SeverityLevel): number {
  const timelines: Record<SeverityLevel, number> = {
    Critical: 72, // 3 days for full resolution
    High: 168, // 1 week
    Medium: 240, // 10 days
    Low: 480 // 20 days
  };

  return timelines[severity];
}
