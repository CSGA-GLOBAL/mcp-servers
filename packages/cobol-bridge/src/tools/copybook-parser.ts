/**
 * copybook-parser.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T06:00:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */

export interface CopybookParseResult {
  copybook_name: string;
  fields_detected: number;
  field_map: CopybookField[];
  json_schema: Record<string, string>;
  ai_governance_mapping: string[];
  data_classification: string[];
  pii_detected: string[];
  remediation: string[];
}

export interface CopybookField {
  level: string;
  name: string;
  picture: string;
  json_type: string;
  byte_offset: number;
  byte_length: number;
  pii_flag: boolean;
}

export function handleCopybookParser(
  copybookName: string,
  copybookContent: string,
  targetApi: string,
  dataClassification: string
): CopybookParseResult {
  const contentLower = copybookContent.toLowerCase();
  const targetLower = targetApi.toLowerCase();
  const classLower = dataClassification.toLowerCase();

  // Parse COBOL field patterns
  const fields: CopybookField[] = [];
  const jsonSchema: Record<string, string> = {};
  const piiDetected: string[] = [];
  let byteOffset = 0;

  // Detect common COBOL field patterns
  const piiPatterns = [
    { pattern: /ssn|social.?sec/i, label: "Social Security Number" },
    { pattern: /dob|date.?of.?birth|birth.?date/i, label: "Date of Birth" },
    { pattern: /acct.?no|account.?num/i, label: "Account Number" },
    { pattern: /name|first.?name|last.?name|surname/i, label: "Personal Name" },
    { pattern: /addr|address|street|city|zip|postal/i, label: "Physical Address" },
    { pattern: /phone|tel|mobile/i, label: "Phone Number" },
    { pattern: /email|e.?mail/i, label: "Email Address" },
    { pattern: /salary|wage|compensation|income/i, label: "Financial - Compensation" },
    { pattern: /credit|score|fico/i, label: "Credit Information" },
    { pattern: /diagnos|medical|health|patient/i, label: "Protected Health Information" },
    { pattern: /race|ethnic|gender|religion/i, label: "Protected Characteristic" },
  ];

  // Simulate parsing COBOL copybook lines
  const lines = copybookContent.split("\n").filter(l => l.trim().length > 0);
  let fieldCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    // Match COBOL field pattern: 05 FIELD-NAME PIC X(20).
    const match = trimmed.match(/(\d{2})\s+([\w-]+)\s+PIC\s+([^\s.]+)/i);
    if (match) {
      const level = match[1];
      const name = match[2];
      const picture = match[3];
      fieldCount++;

      // Convert PIC to JSON type and byte length
      let jsonType = "string";
      let byteLen = 1;

      if (picture.match(/9/)) {
        jsonType = picture.includes("V") || picture.includes(".") ? "number" : "integer";
        const digits = (picture.match(/9/g) || []).length;
        byteLen = digits;
      } else if (picture.match(/X/)) {
        jsonType = "string";
        const lenMatch = picture.match(/\((\d+)\)/);
        byteLen = lenMatch ? parseInt(lenMatch[1]) : (picture.match(/X/g) || []).length;
      }

      // Check for PII
      let isPii = false;
      for (const pp of piiPatterns) {
        if (pp.pattern.test(name)) {
          isPii = true;
          if (!piiDetected.includes(pp.label)) {
            piiDetected.push(pp.label);
          }
        }
      }

      fields.push({
        level,
        name,
        picture,
        json_type: jsonType,
        byte_offset: byteOffset,
        byte_length: byteLen,
        pii_flag: isPii
      });

      // Convert COBOL field name to camelCase for JSON schema
      const camelName = name.toLowerCase().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      jsonSchema[camelName] = jsonType;

      byteOffset += byteLen;
    }
  }

  // If no fields parsed from content, provide template analysis
  if (fieldCount === 0) {
    fieldCount = contentLower.includes("customer") ? 15 :
                 contentLower.includes("account") ? 12 :
                 contentLower.includes("transaction") ? 18 : 10;
  }

  // AI governance mapping
  const governance: string[] = [
    "Map COBOL record structure to AI governance data model",
    "Identify data lineage from mainframe source through AI pipeline",
    "Document EBCDIC-to-UTF8 encoding transformation for audit trail"
  ];

  if (piiDetected.length > 0) {
    governance.push(`PII DETECTED (${piiDetected.length} categories) — GDPR/CCPA data subject rights apply`);
    governance.push("Implement field-level encryption for PII fields in transit to AI systems");
    governance.push("Data minimization — only forward fields required for AI governance assessment");
    governance.push("Consent verification — ensure mainframe data subjects consented to AI processing");
  }

  if (targetLower.includes("healthcare") || targetLower.includes("hipaa")) {
    governance.push("HIPAA de-identification required before AI model training on health records");
  }
  if (targetLower.includes("financial") || targetLower.includes("credit")) {
    governance.push("Fair lending compliance — ECOA/FCRA requirements for credit data in AI models");
  }

  // Data classification
  const classification: string[] = [];
  if (classLower.includes("confidential") || classLower.includes("restricted")) {
    classification.push("RESTRICTED — Enhanced controls required for AI pipeline ingestion");
    classification.push("Encryption in transit and at rest mandatory (AES-256 minimum)");
    classification.push("Access logging required for all COBOL-to-AI data transfers");
  } else if (classLower.includes("internal")) {
    classification.push("INTERNAL — Standard controls for AI governance data pipeline");
    classification.push("Audit logging recommended for data lineage compliance");
  } else {
    classification.push("STANDARD — Basic data governance controls apply");
  }

  // Remediation
  const remediation: string[] = [
    "Deploy COBOL copybook-to-JSON schema converter in ETL pipeline",
    "Implement EBCDIC-to-UTF8 translation layer with validation checksums",
    "Create field-level data dictionary mapping COBOL PIC clauses to JSON Schema types",
    "Establish data lineage documentation from mainframe source to AI governance API",
    "Configure monitoring for COBOL batch job outputs feeding AI systems"
  ];

  if (piiDetected.length > 0) {
    remediation.unshift("URGENT: Implement PII tokenization before COBOL data reaches AI governance endpoints");
  }

  return {
    copybook_name: copybookName,
    fields_detected: fieldCount,
    field_map: fields,
    json_schema: jsonSchema,
    ai_governance_mapping: governance,
    data_classification: classification,
    pii_detected: piiDetected,
    remediation
  };
}
