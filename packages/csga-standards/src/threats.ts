import { ThreatIntelInput, ThreatAssessment } from "./types.js";

// Threat Intelligence Database
interface ThreatProfile {
  name: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  affected_sectors: string[];
  mitre_tactics: string[];
  mitre_techniques: string[];
  indicators_of_compromise: string[];
  mitigation_recommendations: string[];
  detection_methods: string[];
  recent_activity: string;
}

const THREATS_DATABASE: Record<string, ThreatProfile> = {
  ransomware_lockbit3: {
    name: "LockBit 3.0 Ransomware",
    severity: "Critical",
    affected_sectors: [
      "Finance",
      "Healthcare",
      "Manufacturing",
      "Technology",
      "Energy",
    ],
    mitre_tactics: [
      "T1566 - Phishing",
      "T1078 - Valid Accounts",
      "T1486 - Data Encrypted",
      "T1531 - Account Access Removal",
    ],
    mitre_techniques: [
      "Initial Access: Email Phishing with malicious attachments",
      "Lateral Movement: Credential theft and pass-the-hash",
      "Execution: PowerShell scripts for lateral movement",
      "Impact: File encryption and data exfiltration",
    ],
    indicators_of_compromise: [
      "Suspicious RDP login attempts from unfamiliar IPs",
      "Elevated PowerShell activity",
      "Large data transfer to unknown external IPs",
      ".lockbit file extensions on encrypted files",
      "Ransom note files: 'lockbit_note.txt'",
    ],
    mitigation_recommendations: [
      "Implement EDR solution with ransomware-specific detection",
      "Enforce MFA on all remote access points",
      "Segment network to limit lateral movement",
      "Maintain offline backups with 3-2-1 rule",
      "Disable unnecessary RDP access",
      "Implement application whitelisting",
    ],
    detection_methods: [
      "Monitor for suspicious file encryption activity",
      "Alert on bulk file modifications",
      "Track data exfiltration patterns",
      "Monitor RDP login anomalies",
      "Alert on PowerShell suspicious command execution",
    ],
    recent_activity:
      "LockBit 3.0 actively targeting organizations globally, with highest impact in Q4 2024. Averaging 3-5 major victims per week with ransom demands in millions.",
  },
  apt_lazarus: {
    name: "Lazarus Group (APT38)",
    severity: "Critical",
    affected_sectors: [
      "Finance",
      "Energy",
      "Government",
      "Technology",
      "Healthcare",
    ],
    mitre_tactics: [
      "T1091 - Replication Through Removable Media",
      "T1071 - Application Layer Protocol",
      "T1059 - Command and Scripting Interpreter",
      "T1190 - Exploit Public-Facing Application",
    ],
    mitre_techniques: [
      "Initial Access: Watering hole attacks, spear phishing",
      "Execution: Custom malware and wiper tools",
      "Command & Control: Multiple C2 infrastructure",
      "Impact: Data destruction and financial theft",
    ],
    indicators_of_compromise: [
      "Malware variants: MATA, AppleSeed, LightlessCan",
      "C2 domains: Custom command and control infrastructure",
      "File hashes: Known Lazarus malware families",
      "Network patterns: Unusual outbound connections to known C2s",
    ],
    mitigation_recommendations: [
      "Implement air-gapped systems for critical infrastructure",
      "Deploy advanced endpoint detection and response (EDR)",
      "Implement network segmentation and monitoring",
      "Conduct regular security awareness training",
      "Maintain patch management discipline",
      "Implement strict access controls and MFA",
    ],
    detection_methods: [
      "Threat intelligence feeds for known Lazarus TTPs",
      "Memory forensics for malware detection",
      "Network analysis for C2 communication",
      "Behavioral analysis for anomalous activities",
    ],
    recent_activity:
      "Lazarus Group remains highly active with focus on financial theft and disruptive attacks. Recent campaigns include targeting cryptocurrency exchanges and financial institutions.",
  },
  zero_day_cve: {
    name: "Zero-Day Vulnerability Exploitation",
    severity: "Critical",
    affected_sectors: ["All"],
    mitre_tactics: [
      "T1190 - Exploit Public-Facing Application",
      "T1203 - Exploitation for Client Execution",
    ],
    mitre_techniques: [
      "Initial Access: Exploitation of previously unknown vulnerabilities",
      "Execution: Arbitrary code execution via unpatched systems",
    ],
    indicators_of_compromise: [
      "Unexpected system crashes or errors",
      "Unusual network traffic patterns",
      "Creation of suspicious system processes",
      "Unexpected privilege escalation attempts",
    ],
    mitigation_recommendations: [
      "Implement application whitelisting",
      "Deploy intrusion prevention system (IPS)",
      "Maintain aggressive patch management",
      "Monitor application behavior for anomalies",
      "Implement runtime application self-protection (RASP)",
      "Subscribe to zero-day threat intelligence services",
    ],
    detection_methods: [
      "Behavioral analysis for suspicious exploitation patterns",
      "Memory monitoring for shellcode injection",
      "Network analysis for post-exploitation traffic",
      "Process monitoring for suspicious spawning",
    ],
    recent_activity:
      "Multiple zero-day vulnerabilities disclosed monthly. Critical severity flaws in widely-used software continuously exploited in the wild.",
  },
  supply_chain_attack: {
    name: "Supply Chain Attack",
    severity: "Critical",
    affected_sectors: ["All"],
    mitre_tactics: [
      "T1195 - Supply Chain Compromise",
      "T1195.002 - Supply Chain Software Compromise",
    ],
    mitre_techniques: [
      "Initial Access: Compromise of software vendor or supplier",
      "Persistence: Malicious code in legitimate software updates",
      "Lateral Movement: Exploitation of trusted supplier access",
    ],
    indicators_of_compromise: [
      "Unexpected changes in software vendor updates",
      "Hash mismatches for legitimate software",
      "Unusual network connections after software update",
      "Suspicious processes running from vendor directories",
    ],
    mitigation_recommendations: [
      "Implement software bill of materials (SBOM) requirements",
      "Verify code signatures and hashes",
      "Implement software composition analysis (SCA)",
      "Conduct vendor security assessments",
      "Limit supplier access to production systems",
      "Implement network segmentation for vendor access",
    ],
    detection_methods: [
      "Binary analysis of software packages",
      "Network behavior analysis post-update",
      "File integrity monitoring",
      "Vendor behavior monitoring",
    ],
    recent_activity:
      "Supply chain attacks increasing in frequency and sophistication. SolarWinds, 3CX, and multiple other major incidents in 2024.",
  },
};

const SECTOR_THREAT_MAPPING: Record<string, string[]> = {
  Finance: [
    "ransomware_lockbit3",
    "apt_lazarus",
    "zero_day_cve",
    "supply_chain_attack",
  ],
  Healthcare: [
    "ransomware_lockbit3",
    "zero_day_cve",
    "supply_chain_attack",
  ],
  Energy: ["apt_lazarus", "zero_day_cve", "supply_chain_attack"],
  Manufacturing: [
    "ransomware_lockbit3",
    "zero_day_cve",
    "supply_chain_attack",
  ],
  Technology: [
    "apt_lazarus",
    "zero_day_cve",
    "supply_chain_attack",
  ],
  Government: ["apt_lazarus", "zero_day_cve", "supply_chain_attack"],
};

export function getThreatIntelligence(
  input: ThreatIntelInput
): ThreatAssessment {
  let threatKey: string | null = null;

  // Direct CVE lookup
  if (input.cve_id) {
    threatKey = `cve_${input.cve_id.toLowerCase()}`;
  }

  // Threat type mapping
  if (!threatKey && input.threat_type) {
    const threatTypeMap: Record<string, string> = {
      Ransomware: "ransomware_lockbit3",
      APT: "apt_lazarus",
      Zero_Day: "zero_day_cve",
      Supply_Chain: "supply_chain_attack",
      DDoS: "ddos_attack",
      Phishing: "phishing_campaign",
      Insider_Threat: "insider_threat",
      Cloud_Threat: "cloud_misconfig",
    };
    threatKey = threatTypeMap[input.threat_type];
  }

  // Sector-specific threat lookup
  if (!threatKey && input.sector) {
    const sectorThreats = SECTOR_THREAT_MAPPING[input.sector] || [];
    threatKey = sectorThreats[0] || "ransomware_lockbit3";
  }

  // Default to most prevalent threat
  threatKey = threatKey || "ransomware_lockbit3";

  const threat = THREATS_DATABASE[threatKey] || THREATS_DATABASE["ransomware_lockbit3"];

  return {
    threat_name: threat.name,
    severity: threat.severity,
    affected_sectors: threat.affected_sectors,
    mitre_tactics: threat.mitre_tactics,
    mitre_techniques: threat.mitre_techniques,
    indicators_of_compromise: threat.indicators_of_compromise,
    mitigation_recommendations: threat.mitigation_recommendations,
    detection_methods: threat.detection_methods,
    recent_activity: threat.recent_activity,
  };
}

export function searchThreats(query: string): ThreatAssessment[] {
  const normalizedQuery = query.toLowerCase();
  const results: ThreatAssessment[] = [];

  for (const [, threat] of Object.entries(THREATS_DATABASE)) {
    if (
      threat.name.toLowerCase().includes(normalizedQuery) ||
      threat.mitre_tactics.some((tactic) =>
        tactic.toLowerCase().includes(normalizedQuery)
      ) ||
      threat.affected_sectors.some((sector) =>
        sector.toLowerCase().includes(normalizedQuery)
      )
    ) {
      results.push({
        threat_name: threat.name,
        severity: threat.severity,
        affected_sectors: threat.affected_sectors,
        mitre_tactics: threat.mitre_tactics,
        mitre_techniques: threat.mitre_techniques,
        indicators_of_compromise: threat.indicators_of_compromise,
        mitigation_recommendations: threat.mitigation_recommendations,
        detection_methods: threat.detection_methods,
        recent_activity: threat.recent_activity,
      });
    }
  }

  return results;
}

export function getThreatsBySector(sector: string): ThreatAssessment[] {
  const threatKeys = SECTOR_THREAT_MAPPING[sector] || [];
  return threatKeys
    .map((key) => THREATS_DATABASE[key])
    .filter((threat): threat is ThreatProfile => threat !== undefined)
    .map((threat) => ({
      threat_name: threat.name,
      severity: threat.severity,
      affected_sectors: threat.affected_sectors,
      mitre_tactics: threat.mitre_tactics,
      mitre_techniques: threat.mitre_techniques,
      indicators_of_compromise: threat.indicators_of_compromise,
      mitigation_recommendations: threat.mitigation_recommendations,
      detection_methods: threat.detection_methods,
      recent_activity: threat.recent_activity,
    }));
}
