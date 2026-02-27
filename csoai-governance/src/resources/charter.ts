export interface CharterArticle {
  number: number;
  title: string;
  content: string;
  keyPrinciples: string[];
}

export const CHARTER_ARTICLES: Record<number, CharterArticle> = {
  1: {
    number: 1,
    title: "Purpose and Scope",
    content: "This Charter establishes principles and commitments for the safe development and deployment of advanced artificial intelligence systems. It applies to all organizations developing, deploying, or operating AI systems of concern.",
    keyPrinciples: ["Safety", "Responsibility", "Transparency"]
  },
  2: {
    number: 2,
    title: "Definition of AI Systems of Concern",
    content: "AI systems of concern are those that could potentially cause significant harm, influence critical decision-making, or affect fundamental rights. This includes large language models, autonomous systems, and decision-support systems with substantial societal impact.",
    keyPrinciples: ["Harm Prevention", "Risk Classification", "Scope Definition"]
  },
  3: {
    number: 3,
    title: "Governance and Accountability",
    content: "Organizations must establish clear governance structures with assigned responsibility for AI safety, security, and ethics. Leadership must demonstrate commitment to safe AI practices through policies, resources, and oversight mechanisms.",
    keyPrinciples: ["Accountability", "Governance", "Leadership Commitment"]
  },
  4: {
    number: 4,
    title: "Risk Assessment and Management",
    content: "Before deployment, AI systems must undergo comprehensive risk assessment identifying potential harms, failure modes, and mitigation strategies. Risk management must be ongoing throughout the system lifecycle.",
    keyPrinciples: ["Risk Assessment", "Proactive Management", "Continuous Monitoring"]
  },
  5: {
    number: 5,
    title: "Safety Testing and Evaluation",
    content: "AI systems must be rigorously tested for safety, security, fairness, and performance. Testing must include adversarial evaluation, stress testing, and real-world scenario simulation. Results must be documented and reviewed.",
    keyPrinciples: ["Rigor", "Comprehensive Testing", "Adversarial Evaluation"]
  },
  6: {
    number: 6,
    title: "Human Oversight and Control",
    content: "Meaningful human oversight must be maintained for all AI systems of concern. Humans must retain the ability to understand, monitor, and intervene in AI decision-making. Critical decisions must never be fully automated.",
    keyPrinciples: ["Human Agency", "Meaningful Control", "Interpretability"]
  },
  7: {
    number: 7,
    title: "Transparency and Explainability",
    content: "Organizations must provide clear, accurate information about AI system capabilities, limitations, and decision-making processes. Explainability mechanisms must be proportionate to the system's impact and users' needs.",
    keyPrinciples: ["Transparency", "Explainability", "Honest Communication"]
  },
  8: {
    number: 8,
    title: "Data Governance and Quality",
    content: "Data used to develop and operate AI systems must be carefully governed. Data collection, curation, and quality must meet high standards. Data sources must be documented and evaluated for bias and representativeness.",
    keyPrinciples: ["Data Quality", "Governance", "Bias Mitigation"]
  },
  9: {
    number: 9,
    title: "Fairness and Non-Discrimination",
    content: "AI systems must be designed and tested to prevent discrimination and promote fairness. Organizations must identify potential sources of bias in data, algorithms, and deployment contexts. Ongoing fairness monitoring is required.",
    keyPrinciples: ["Fairness", "Non-Discrimination", "Bias Monitoring"]
  },
  10: {
    number: 10,
    title: "Security and Robustness",
    content: "AI systems must be resilient against adversarial attacks, model extraction, poisoning, and other security threats. Security must be designed throughout development and maintained through updates and monitoring.",
    keyPrinciples: ["Security", "Robustness", "Adversarial Resilience"]
  },
  11: {
    number: 11,
    title: "Privacy Protection",
    content: "AI systems must respect individual privacy rights and comply with applicable privacy regulations. Privacy-preserving techniques must be employed when handling personal data. Data minimization and retention policies must be established.",
    keyPrinciples: ["Privacy", "Data Protection", "Privacy by Design"]
  },
  12: {
    number: 12,
    title: "Environmental and Energy Efficiency",
    content: "AI development and deployment must consider environmental impact and energy consumption. Organizations must pursue energy-efficient approaches and measure environmental footprints of AI systems.",
    keyPrinciples: ["Sustainability", "Energy Efficiency", "Environmental Responsibility"]
  },
  13: {
    number: 13,
    title: "Stakeholder Engagement",
    content: "Organizations must meaningfully engage with diverse stakeholders including affected communities, civil society, experts, and users. Engagement must inform development and deployment decisions.",
    keyPrinciples: ["Participation", "Dialogue", "Community Involvement"]
  },
  14: {
    number: 14,
    title: "Incident Reporting and Response",
    content: "Organizations must establish clear procedures for identifying, reporting, and responding to AI-related incidents. Serious incidents must be reported to relevant authorities. Public disclosure may be required in certain circumstances.",
    keyPrinciples: ["Transparency", "Rapid Response", "Accountability"]
  },
  15: {
    number: 15,
    title: "Documentation and Auditability",
    content: "All AI systems must be thoroughly documented including design decisions, training data, evaluation results, and deployment contexts. Documentation must enable both internal and external audit.",
    keyPrinciples: ["Documentation", "Auditability", "Traceability"]
  },
  16: {
    number: 16,
    title: "Continuous Monitoring and Evaluation",
    content: "After deployment, AI systems must be continuously monitored for performance degradation, drift, and unintended consequences. Regular evaluation must assess whether systems remain aligned with their intended purpose.",
    keyPrinciples: ["Monitoring", "Evaluation", "Adaptive Management"]
  },
  17: {
    number: 17,
    title: "Model Updates and Deprovisioning",
    content: "Procedures must be established for updating models safely and for deprovisioning systems that no longer meet safety standards. Updates must be tested before deployment. Deprovisioning must be conducted responsibly.",
    keyPrinciples: ["Safe Updates", "Version Control", "Responsible Sunset"]
  },
  18: {
    number: 18,
    title: "Supply Chain Security",
    content: "Organizations must ensure security throughout the AI supply chain including models, datasets, tools, and infrastructure. Third-party providers must be evaluated for security and safety practices.",
    keyPrinciples: ["Supply Chain", "Third-party Evaluation", "Dependency Management"]
  },
  19: {
    number: 19,
    title: "Dual-Use and Misuse Prevention",
    content: "Organizations must assess and mitigate risks that AI systems could be misused or employed for harmful purposes. Controls must be implemented to prevent or detect misuse.",
    keyPrinciples: ["Misuse Prevention", "Dual-use Assessment", "Access Controls"]
  },
  20: {
    number: 20,
    title: "Beneficial Outcome Alignment",
    content: "AI systems must be designed and evaluated to support beneficial outcomes aligned with human values. The broader societal impact of systems must be considered throughout development and deployment.",
    keyPrinciples: ["Value Alignment", "Beneficial Impact", "Societal Benefit"]
  },
  21: {
    number: 21,
    title: "Access Control and Authentication",
    content: "Access to AI systems, particularly powerful models, must be restricted through appropriate controls. Authentication and authorization mechanisms must prevent unauthorized use and access.",
    keyPrinciples: ["Access Control", "Authentication", "Authorization"]
  },
  22: {
    number: 22,
    title: "Intellectual Property and Attribution",
    content: "Organizations must respect intellectual property rights and provide appropriate attribution for datasets, models, and techniques used. Licensing and compliance must be maintained.",
    keyPrinciples: ["IP Rights", "Attribution", "Legal Compliance"]
  },
  23: {
    number: 23,
    title: "Capacity Building and Education",
    content: "Organizations must invest in building capacity for safe AI development. Training and education must be provided to developers, users, and decision-makers about AI risks and responsible practices.",
    keyPrinciples: ["Education", "Training", "Capability Development"]
  },
  24: {
    number: 24,
    title: "International Cooperation",
    content: "Organizations are encouraged to participate in international cooperation on AI safety standards, information sharing, and coordinated governance. Collaboration strengthens global AI safety.",
    keyPrinciples: ["Cooperation", "Information Sharing", "Coordination"]
  },
  25: {
    number: 25,
    title: "Research and Innovation in Safety",
    content: "Organizations should support research into AI safety techniques, interpretability, and risk mitigation methods. Innovation in safety practices benefits the broader AI community.",
    keyPrinciples: ["Research", "Innovation", "Safety Advancement"]
  },
  26: {
    number: 26,
    title: "Algorithmic Transparency",
    content: "Organizations must make information about algorithmic decision-making accessible to users and regulators. Black-box systems require stronger interpretability and oversight measures.",
    keyPrinciples: ["Algorithmic Transparency", "Interpretability", "User Information"]
  },
  27: {
    number: 27,
    title: "Vulnerability Disclosure",
    content: "Organizations should establish responsible vulnerability disclosure programs. Security researchers should be able to report vulnerabilities confidentially before public disclosure.",
    keyPrinciples: ["Responsible Disclosure", "Security Research", "Coordination"]
  },
  28: {
    number: 28,
    title: "Performance Benchmarking",
    content: "AI system performance should be benchmarked and reported transparently using standardized methodologies. Benchmarking helps identify limitations and support proper system selection.",
    keyPrinciples: ["Benchmarking", "Standardization", "Comparative Analysis"]
  },
  29: {
    number: 29,
    title: "Model Card and Documentation Standards",
    content: "Organizations should produce model cards, data cards, and system documentation following established standards. Documentation should cover capabilities, limitations, biases, and appropriate use cases.",
    keyPrinciples: ["Documentation Standards", "Transparency", "Use Case Guidance"]
  },
  30: {
    number: 30,
    title: "Regulatory Compliance",
    content: "AI systems must comply with all applicable laws, regulations, and standards. Organizations must stay informed about evolving regulatory requirements and adapt their practices accordingly.",
    keyPrinciples: ["Compliance", "Legal Adherence", "Regulatory Engagement"]
  },
  31: {
    number: 31,
    title: "User Rights and Remedies",
    content: "Users and individuals affected by AI systems must have meaningful rights including the right to explanation, challenge, and remedy. Organizations must provide accessible mechanisms for addressing concerns.",
    keyPrinciples: ["User Rights", "Remedy", "Due Process"]
  },
  32: {
    number: 32,
    title: "Demographic Parity and Representation",
    content: "Organizations must ensure that AI systems do not perpetuate or amplify demographic disparities. Testing for disparate impact across demographic groups is required.",
    keyPrinciples: ["Demographic Equity", "Representation", "Disparity Testing"]
  },
  33: {
    number: 33,
    title: "Autonomous Decision-Making Limits",
    content: "High-stakes decisions particularly those affecting individual rights must not be made purely by AI systems. Human review and approval is required before consequential decisions are finalized.",
    keyPrinciples: ["Human Final Authority", "Consequential Decisions", "Human Review"]
  },
  34: {
    number: 34,
    title: "Adversarial Robustness",
    content: "AI systems must be tested for robustness against adversarial inputs and prompt injection attacks. Systems must maintain performance under attack and gracefully degrade rather than fail catastrophically.",
    keyPrinciples: ["Adversarial Testing", "Robustness", "Graceful Degradation"]
  },
  35: {
    number: 35,
    title: "Interpretability Research",
    content: "Organizations are encouraged to support research into interpretability and explainability. Better understanding of AI decision-making benefits the entire field and improves safety.",
    keyPrinciples: ["Interpretability", "Research", "Transparency Advancement"]
  },
  36: {
    number: 36,
    title: "Model Governance and Versioning",
    content: "Clear procedures must be established for model governance including versioning, documentation of changes, and control over which versions are deployed. Lineage and provenance must be tracked.",
    keyPrinciples: ["Governance", "Versioning", "Lineage Tracking"]
  },
  37: {
    number: 37,
    title: "Third-Party Auditing",
    content: "Independent third-party audits should be conducted for AI systems of significant concern. Audits should assess compliance with this Charter and applicable standards.",
    keyPrinciples: ["Third-party Oversight", "Audit", "Independence"]
  },
  38: {
    number: 38,
    title: "Transparency in Training Processes",
    content: "Organizations should disclose information about training methodologies including hyperparameters, data sources, and evaluation metrics. Transparency in training enables better assessment of system limitations.",
    keyPrinciples: ["Training Transparency", "Methodology Disclosure", "Reproducibility"]
  },
  39: {
    number: 39,
    title: "Bias Mitigation Techniques",
    content: "Organizations must employ and document bias mitigation techniques appropriate to their systems. Techniques may include data augmentation, fairness constraints, or post-processing adjustments.",
    keyPrinciples: ["Bias Mitigation", "Technical Safeguards", "Documentation"]
  },
  40: {
    number: 40,
    title: "Anomaly Detection and Monitoring",
    content: "Monitoring systems must be implemented to detect anomalous behavior indicating malfunction, drift, or potential misuse. Alerts must trigger human review and investigation.",
    keyPrinciples: ["Monitoring", "Anomaly Detection", "Alert Systems"]
  },
  41: {
    number: 41,
    title: "Red Teaming and Adversarial Testing",
    content: "Organizations should conduct red teaming and adversarial testing to identify vulnerabilities before systems are deployed. Dedicated teams should attempt to break the system and find failure modes.",
    keyPrinciples: ["Red Teaming", "Adversarial Testing", "Vulnerability Identification"]
  },
  42: {
    number: 42,
    title: "Harm Mitigation Strategies",
    content: "Organizations must develop and implement specific strategies to mitigate identified harms. Mitigation strategies must be documented and their effectiveness must be evaluated.",
    keyPrinciples: ["Harm Mitigation", "Strategy Development", "Effectiveness Evaluation"]
  },
  43: {
    number: 43,
    title: "Explainability by Default",
    content: "AI systems should be designed to be explainable by default. When full explainability is not feasible, enhanced monitoring and human oversight are required.",
    keyPrinciples: ["Explainability", "Interpretability", "Default Design"]
  },
  44: {
    number: 44,
    title: "Downstream Impact Assessment",
    content: "Organizations must assess potential downstream impacts and unintended consequences of their AI systems. Assessment must consider broader societal effects and feedback loops.",
    keyPrinciples: ["Impact Assessment", "Unintended Consequences", "Systems Thinking"]
  },
  45: {
    number: 45,
    title: "Long-term Safety Research",
    content: "Organizations are encouraged to support long-term safety research addressing existential and systemic risks from advanced AI. Funding and participation in safety research advances the field.",
    keyPrinciples: ["Long-term Safety", "Research Support", "Risk Mitigation"]
  },
  46: {
    number: 46,
    title: "Capability Assessment and Disclosure",
    content: "AI system capabilities and limitations must be honestly assessed and disclosed. Capability assessments must be conducted by qualified evaluators and documented for future reference.",
    keyPrinciples: ["Honest Assessment", "Capability Disclosure", "Limitations"]
  },
  47: {
    number: 47,
    title: "Change Management and Rollback Procedures",
    content: "Procedures must exist for managing changes to deployed AI systems and for rolling back problematic updates. Changes must be tested and monitored before full deployment.",
    keyPrinciples: ["Change Management", "Testing", "Rollback Capability"]
  },
  48: {
    number: 48,
    title: "Stakeholder Feedback Integration",
    content: "Feedback from users, affected communities, and other stakeholders should be systematically collected and integrated into system improvements. Feedback loops strengthen safety and effectiveness.",
    keyPrinciples: ["Feedback Integration", "Community Input", "Iterative Improvement"]
  },
  49: {
    number: 49,
    title: "Certification and Compliance Verification",
    content: "Organizations should seek certification from recognized bodies where available. Certification provides independent verification of compliance with established safety standards.",
    keyPrinciples: ["Certification", "Verification", "Standards Compliance"]
  },
  50: {
    number: 50,
    title: "Continuous Improvement and Adaptation",
    content: "AI governance practices must continuously evolve as the field advances. Organizations should regularly review and update their practices based on new knowledge and emerging risks.",
    keyPrinciples: ["Continuous Improvement", "Adaptation", "Evolution"]
  },
  51: {
    number: 51,
    title: "Knowledge Sharing and Community Learning",
    content: "Organizations are encouraged to share insights about AI safety challenges and solutions. Community learning accelerates progress on critical safety issues benefiting all.",
    keyPrinciples: ["Knowledge Sharing", "Community Learning", "Collaboration"]
  },
  52: {
    number: 52,
    title: "Commitment to this Charter",
    content: "Organizations that adopt this Charter commit to implementing these principles in good faith and to continuously striving to improve AI safety. This Charter represents a living commitment to responsible AI development.",
    keyPrinciples: ["Commitment", "Good Faith", "Continuous Effort"]
  }
};

export function getCharterArticle(number: number): CharterArticle | null {
  return CHARTER_ARTICLES[number] || null;
}

export function listCharterArticles(): number[] {
  return Object.keys(CHARTER_ARTICLES).map(Number).sort((a, b) => a - b);
}
