import {
  IncidentResponseInput,
  IncidentResponseProcedure,
} from "./types.js";

// Incident Response Procedures Database
interface IncidentProcedure {
  classification: string;
  description: string;
  immediate_actions: string[];
  containment_steps: string[];
  investigation_procedures: string[];
  notification_requirements: string[];
  recovery_timeline_hours: number;
  regulatory_reporting: string;
  post_incident_actions: string[];
}

const INCIDENT_DATABASE: Record<string, IncidentProcedure> = {
  ransomware: {
    classification: "Ransomware Attack",
    description:
      "Malicious software that encrypts data and demands payment for decryption key",
    immediate_actions: [
      "Activate incident response team immediately",
      "Isolate infected systems from network (power off if necessary)",
      "Disable backups to prevent encryption spread",
      "Preserve evidence - do not reboot or shut down cleanly",
      "Document timeline and affected systems",
      "Notify CISO and executive leadership",
    ],
    containment_steps: [
      "Disconnect all affected systems from network",
      "Isolate backup systems and air-gap critical data",
      "Block attacker C2 domains at firewall level",
      "Change credentials for all admin accounts",
      "Scan all systems with updated threat definitions",
      "Monitor for lateral movement attempts",
      "Preserve forensic images of affected systems",
    ],
    investigation_procedures: [
      "Collect forensic artifacts from affected systems",
      "Analyze malware for IOCs and C2 communication",
      "Trace infection path and initial access vector",
      "Review logs for lateral movement patterns",
      "Identify all affected systems and data",
      "Determine ransomware family and variant",
      "Search for attacker communications/notes",
    ],
    notification_requirements: [
      "Notify FBI/CISA immediately for critical infrastructure",
      "Contact law enforcement (FBI, local cybercrime unit)",
      "Prepare breach notification for affected parties",
      "Notify cyber insurance carrier within 24 hours",
      "Consult legal counsel before ransom negotiation",
      "Document all notifications and communications",
    ],
    recovery_timeline_hours: 72,
    regulatory_reporting:
      "HIPAA: 60 days. State breach laws: 30 days. SOC 2: Customer notification required.",
    post_incident_actions: [
      "Restore systems from clean backups",
      "Verify all systems clean before reconnection",
      "Change all compromised credentials",
      "Update security controls based on findings",
      "Implement additional detection capabilities",
      "Conduct full security assessment",
      "Document lessons learned and update IR plan",
      "Improve backup and recovery procedures",
    ],
  },
  data_breach: {
    classification: "Data Breach / Unauthorized Access",
    description:
      "Unauthorized access to, disclosure, or theft of sensitive data",
    immediate_actions: [
      "Activate incident response team",
      "Identify affected systems and data scope",
      "Determine what data was accessed/exfiltrated",
      "Preserve logs and evidence",
      "Notify security team and management",
      "Check for ongoing unauthorized access",
      "Document initial findings and timeline",
    ],
    containment_steps: [
      "Revoke compromised credentials and access",
      "Block attacker-controlled accounts/systems",
      "Disable affected user accounts if necessary",
      "Review access logs for suspicious activities",
      "Monitor for further data exfiltration",
      "Implement additional monitoring on affected systems",
      "Block suspicious IP addresses at firewall",
    ],
    investigation_procedures: [
      "Conduct forensic analysis of affected systems",
      "Review access logs for unauthorized activity timeline",
      "Determine attack vector and persistence mechanisms",
      "Identify all accessed/exfiltrated data",
      "Check for lateral movement or privilege escalation",
      "Analyze data transfer patterns and volumes",
      "Identify attacker infrastructure and tactics",
    ],
    notification_requirements: [
      "Notify affected individuals/customers within 30 days",
      "Notify regulatory bodies per applicable laws",
      "Prepare public disclosure statement",
      "Notify credit reporting agencies if PII involved",
      "Document notification evidence and responses",
      "Monitor for secondary incidents or misuse",
    ],
    recovery_timeline_hours: 168,
    regulatory_reporting:
      "GDPR: 72 hours. CCPA: Consumer notification. HIPAA: 60 days.",
    post_incident_actions: [
      "Implement credit monitoring for affected individuals",
      "Enhance access controls and monitoring",
      "Conduct security awareness training",
      "Update data protection policies",
      "Implement DLP (Data Loss Prevention)",
      "Review and improve authentication controls",
      "Conduct post-incident review and lessons learned",
    ],
  },
  system_compromise: {
    classification: "System Compromise / Intrusion",
    description:
      "Unauthorized access to systems with persistent or ongoing presence",
    immediate_actions: [
      "Isolate compromised systems from network",
      "Preserve system state and logs",
      "Notify incident response and IT security teams",
      "Begin continuous monitoring of system activity",
      "Document all observed suspicious activities",
      "Check for persistence mechanisms",
      "Review recent changes and installations",
    ],
    containment_steps: [
      "Disconnect compromised system from network",
      "Block malicious processes and services",
      "Revoke compromised credentials",
      "Remove persistence mechanisms (backdoors, rootkits)",
      "Monitor lateral movement attempts",
      "Patch identified vulnerabilities",
      "Review network segmentation",
    ],
    investigation_procedures: [
      "Perform forensic memory analysis",
      "Analyze system logs and event traces",
      "Identify persistence mechanisms",
      "Check for privilege escalation paths",
      "Analyze process execution history",
      "Check for lateral movement evidence",
      "Identify command and control communications",
    ],
    notification_requirements: [
      "Notify IT leadership and security teams",
      "Assess need for customer notification",
      "Determine if data accessed or exfiltrated",
      "Contact law enforcement if criminal activity suspected",
      "Document incident timeline for audit trail",
    ],
    recovery_timeline_hours: 48,
    regulatory_reporting:
      "If PII accessed, follow breach notification laws. Internal incident reporting required.",
    post_incident_actions: [
      "Rebuild affected systems from clean backup",
      "Implement hardening standards",
      "Deploy additional monitoring capabilities",
      "Conduct vulnerability assessment",
      "Update incident response procedures",
      "Implement endpoint detection and response (EDR)",
      "Review and strengthen access controls",
    ],
  },
  ddos_attack: {
    classification: "Distributed Denial of Service (DDoS)",
    description:
      "Flooding of network resources to cause unavailability of services",
    immediate_actions: [
      "Activate incident response and network operations teams",
      "Verify attack is occurring (rule out false positives)",
      "Document attack timeline and characteristics",
      "Contact DDoS mitigation service provider",
      "Increase monitoring and logging",
      "Prepare communication plan for stakeholders",
      "Assess business impact and continuity",
    ],
    containment_steps: [
      "Activate DDoS mitigation/protection service",
      "Implement traffic filtering at ISP level",
      "Redirect traffic through WAF/DDoS protection",
      "Rate-limit or block suspicious traffic sources",
      "Verify critical services remain accessible",
      "Monitor for secondary attacks",
      "Coordinate with upstream providers",
    ],
    investigation_procedures: [
      "Collect traffic analysis and flow data",
      "Analyze attack patterns and sources",
      "Identify attack type (volumetric, protocol, application)",
      "Determine if attack is targeted or opportunistic",
      "Check for demands or extortion communications",
      "Analyze for botnet command patterns",
    ],
    notification_requirements: [
      "Notify customers of service degradation if applicable",
      "Provide regular status updates during attack",
      "Contact law enforcement if extortion demands received",
      "Preserve all communications and evidence",
      "Document impact on business and customers",
    ],
    recovery_timeline_hours: 24,
    regulatory_reporting: "Not typically required unless services unavailable >X hours per policy",
    post_incident_actions: [
      "Review DDoS response procedures and effectiveness",
      "Implement permanent DDoS mitigation solution",
      "Enhance network capacity and redundancy",
      "Improve incident communication procedures",
      "Update network architecture for resilience",
      "Conduct threat intelligence analysis",
      "Review post-incident communications",
    ],
  },
};

export function getIncidentResponse(
  input: IncidentResponseInput
): IncidentResponseProcedure {
  const incidentTypeMap: Record<string, string> = {
    Ransomware: "ransomware",
    Data_Breach: "data_breach",
    System_Compromise: "system_compromise",
    DDoS: "ddos_attack",
    Insider_Threat: "data_breach",
    Supply_Chain: "system_compromise",
    Malware: "system_compromise",
    Other: "data_breach",
  };

  const procedureKey = incidentTypeMap[input.incident_type] || "data_breach";
  const procedure = INCIDENT_DATABASE[procedureKey];

  // Adjust timeline based on severity
  const severityMultiplier: Record<string, number> = {
    Critical: 1.5,
    High: 1.2,
    Medium: 1.0,
    Low: 0.8,
  };

  return {
    incident_classification: procedure.classification,
    immediate_actions: prioritizeByUrgency(procedure.immediate_actions),
    containment_steps: procedure.containment_steps,
    investigation_procedures: procedure.investigation_procedures,
    notification_requirements: procedure.notification_requirements,
    recovery_timeline_hours: Math.round(
      procedure.recovery_timeline_hours *
        (severityMultiplier[input.severity] || 1.0)
    ),
    regulatory_reporting: procedure.regulatory_reporting,
    post_incident_actions: procedure.post_incident_actions,
  };
}

function prioritizeByUrgency(actions: string[]): string[] {
  const criticalKeywords = [
    "isolate",
    "disconnect",
    "shutdown",
    "activate",
    "notify",
    "block",
  ];
  const critical: string[] = [];
  const other: string[] = [];

  actions.forEach((action) => {
    if (
      criticalKeywords.some((keyword) =>
        action.toLowerCase().includes(keyword)
      )
    ) {
      critical.push(action);
    } else {
      other.push(action);
    }
  });

  return [...critical, ...other];
}

export function getIncidentEscalationPath(
  severity: string
): Record<string, string> {
  const escalationPaths: Record<string, Record<string, string>> = {
    Critical: {
      immediate: "CISO and Chief Security Officer",
      "5_minutes": "VP of Security and IT Director",
      "15_minutes": "CEO and Legal Counsel",
      "30_minutes": "Board of Directors",
      "1_hour": "Law Enforcement and Regulators",
    },
    High: {
      immediate: "Security Manager and Incident Lead",
      "10_minutes": "CISO",
      "30_minutes": "VP of Security",
      "1_hour": "Legal Counsel if regulatory impact",
    },
    Medium: {
      immediate: "Security Team",
      "30_minutes": "Security Manager",
      "2_hours": "CISO review",
    },
    Low: {
      "1_hour": "Security Team handles",
      "24_hours": "Document for review",
    },
  };

  return escalationPaths[severity] || escalationPaths["Medium"];
}
