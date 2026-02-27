/**
 * labExercise.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import { z } from "zod";

const LabExerciseInputSchema = z.object({
  topic: z.string(),
  difficulty_level: z.enum(["beginner", "intermediate", "advanced"]),
  time_available: z.number().min(15),
  learning_objective: z.string(),
});

export type LabExerciseInput = z.infer<typeof LabExerciseInputSchema>;

export interface LabExerciseResult {
  lab_metadata: {
    lab_id: string;
    title: string;
    topic: string;
    difficulty: string;
    estimated_duration_minutes: number;
    learning_objectives: string[];
    prerequisites: string[];
    kata_belt_alignment: string[];
  };
  scenario_description: {
    context: string;
    business_problem: string;
    your_role: string;
    target_outcomes: string[];
  };
  setup_requirements: {
    hardware_requirements: {
      cpu_cores: number;
      ram_gb: number;
      storage_gb: number;
    };
    software_requirements: {
      operating_system: string[];
      tools: Array<{ name: string; version: string; free: boolean }>;
      platform: string[];
    };
    estimated_setup_time_minutes: number;
  };
  step_by_step_instructions: Array<{
    step_number: number;
    title: string;
    instructions: string;
    commands: string[];
    expected_output: string;
    tips: string[];
    troubleshooting: Array<{ issue: string; solution: string }>;
  }>;
  assessment_criteria: {
    objective: string;
    success_indicators: string[];
    evaluation_method: string;
    passing_requirements: string;
  }[];
  learning_resources: {
    resource_type: string;
    title: string;
    url: string;
    time_required_minutes: number;
    difficulty: string;
  }[];
  extension_challenges: {
    challenge: string;
    difficulty: string;
    estimated_time_minutes: number;
    objective: string;
  }[];
  key_takeaways: string[];
  lab_report_template: {
    section: string;
    questions: string[];
    expected_length: string;
  }[];
}

const LAB_TEMPLATES: {
  [key: string]: (
    difficulty: string,
    timeAvailable: number
  ) => Omit<LabExerciseResult, "lab_metadata" | "learning_resources">;
} = {
  network_scanning: (_difficulty, _timeAvailable) => ({
    scenario_description: {
      context:
        "You are a junior security analyst tasked with discovering devices on the corporate network.",
      business_problem:
        "The organization needs to maintain an accurate inventory of network devices for security compliance.",
      your_role:
        "Conduct a network scan to identify active hosts and running services.",
      target_outcomes: [
        "Discover all active hosts on target subnet",
        "Identify open ports and services",
        "Create network topology diagram",
        "Document findings",
      ],
    },
    setup_requirements: {
      hardware_requirements: {
        cpu_cores: 2,
        ram_gb: 4,
        storage_gb: 10,
      },
      software_requirements: {
        operating_system: ["Linux", "macOS", "Windows"],
        tools: [
          { name: "Nmap", version: "7.91+", free: true },
          { name: "Zenmap (GUI)", version: "latest", free: true },
          { name: "Wireshark", version: "3.0+", free: true },
        ],
        platform: ["Kali Linux", "Ubuntu", "Windows with WSL"],
      },
      estimated_setup_time_minutes: 15,
    },
    step_by_step_instructions: [
      {
        step_number: 1,
        title: "Prepare the Lab Environment",
        instructions:
          "Set up a virtual network or use a lab network. Ensure you have network access and appropriate permissions.",
        commands: ["ifconfig", "ipconfig"],
        expected_output: "Your IP address and subnet mask",
        tips: [
          "Note your IP address and subnet",
          "Ensure you have proper authorization",
          "Document the scope clearly",
        ],
        troubleshooting: [
          {
            issue: "Cannot access network",
            solution:
              "Check network adapter settings and VPN connection if applicable",
          },
        ],
      },
      {
        step_number: 2,
        title: "Perform Network Scan",
        instructions:
          "Use Nmap to scan the target subnet and identify active hosts.",
        commands: [
          "nmap -sn 192.168.1.0/24",
          "nmap -Pn -sV 192.168.1.0/24",
        ],
        expected_output:
          "List of active hosts with IP addresses and open ports",
        tips: [
          'Use "-sn" for ping scan to find active hosts quickly',
          'Use "-sV" to identify service versions',
          'Use "-p-" to scan all ports (takes longer)',
        ],
        troubleshooting: [
          { issue: "No hosts found", solution: "Verify correct subnet range" },
          {
            issue: "Permission denied",
            solution: "Run with sudo/admin privileges",
          },
        ],
      },
      {
        step_number: 3,
        title: "Port Enumeration",
        instructions:
          "Scan specific hosts for detailed port and service information.",
        commands: ["nmap -sV -p 1-65535 [target_ip]"],
        expected_output: "Detailed list of open ports and services",
        tips: [
          "Focus on common ports first (top 1000)",
          "Use version detection (-sV)",
          "Document service banners",
        ],
        troubleshooting: [
          { issue: "Scan taking too long", solution: "Use --top-ports flag" },
        ],
      },
      {
        step_number: 4,
        title: "Analyze Results",
        instructions:
          "Document all findings and identify potential security issues.",
        commands: ["nmap -sV -p 1-65535 [target_ip] -oA scan_results"],
        expected_output: "Network inventory with services and versions",
        tips: [
          "Export results to multiple formats",
          "Create topology diagram",
          "Flag unexpected services",
        ],
        troubleshooting: [
          {
            issue: "Cannot interpret results",
            solution: "Reference Nmap documentation and service port numbers",
          },
        ],
      },
    ],
    assessment_criteria: [
      {
        objective: "Successful Network Discovery",
        success_indicators: [
          "Identified all active hosts on subnet",
          "Correctly enumerated open ports",
          "Identified service versions",
        ],
        evaluation_method: "Verification of scan results accuracy",
        passing_requirements: "95%+ accuracy on discovered hosts and ports",
      },
      {
        objective: "Security Analysis",
        success_indicators: [
          "Identified unusual or risky services",
          "Noted outdated software versions",
          "Documented findings clearly",
        ],
        evaluation_method: "Review of analysis and recommendations",
        passing_requirements:
          "At least 3 security observations with justification",
      },
    ],
    extension_challenges: [
      {
        challenge:
          "Perform OS fingerprinting on identified services using Nmap",
        difficulty: "intermediate",
        estimated_time_minutes: 30,
        objective: "Identify operating systems running on discovered hosts",
      },
      {
        challenge:
          "Create a detailed network diagram using the scan results with topology visualization",
        difficulty: "intermediate",
        estimated_time_minutes: 45,
        objective: "Visualize network structure and device relationships",
      },
      {
        challenge: "Perform service enumeration and identify potential CVEs",
        difficulty: "advanced",
        estimated_time_minutes: 60,
        objective: "Find vulnerabilities in discovered services",
      },
    ],
    key_takeaways: [
      "Network scanning is essential for security assessment",
      "Active reconnaissance helps identify attack surface",
      "Service version detection is critical for vulnerability assessment",
      "Always obtain proper authorization before scanning",
      "Document findings comprehensively for stakeholders",
    ],
    lab_report_template: [
      {
        section: "Executive Summary",
        questions: [
          "What was the scope of the scan?",
          "How many hosts were discovered?",
          "What were the key findings?",
        ],
        expected_length: "1-2 paragraphs",
      },
      {
        section: "Methodology",
        questions: [
          "What tools were used?",
          "What scanning techniques were applied?",
          "What was the rationale for the approach?",
        ],
        expected_length: "1 page",
      },
      {
        section: "Results",
        questions: [
          "Complete inventory of discovered devices",
          "Detailed port enumeration results",
          "Service version information",
        ],
        expected_length: "2-3 pages with tables/diagrams",
      },
      {
        section: "Security Findings",
        questions: [
          "What security issues were identified?",
          "Risk rating for each finding",
          "Recommendations for remediation",
        ],
        expected_length: "2 pages",
      },
    ],
  }),
  firewall_configuration: (_difficulty, _timeAvailable) => ({
    scenario_description: {
      context:
        "Your organization needs to secure network access with a firewall between internal network and internet.",
      business_problem:
        "Implement firewall rules to block unauthorized access while allowing legitimate business traffic.",
      your_role: "Configure firewall rules and test the configuration.",
      target_outcomes: [
        "Create firewall rule set",
        "Block unauthorized protocols",
        "Allow business-critical services",
        "Test and validate rules",
      ],
    },
    setup_requirements: {
      hardware_requirements: {
        cpu_cores: 2,
        ram_gb: 4,
        storage_gb: 20,
      },
      software_requirements: {
        operating_system: ["Linux", "Windows Server"],
        tools: [
          { name: "iptables/nftables", version: "latest", free: true },
          { name: "UFW (Ubuntu)", version: "latest", free: true },
          { name: "VirtualBox", version: "6.0+", free: true },
        ],
        platform: ["Linux VM", "Windows VM"],
      },
      estimated_setup_time_minutes: 30,
    },
    step_by_step_instructions: [
      {
        step_number: 1,
        title: "Understand Firewall Rules",
        instructions:
          "Review firewall concepts and rule structure before implementation.",
        commands: ["man iptables", "ufw help"],
        expected_output: "Understanding of firewall rule syntax",
        tips: [
          "Review OSI model layers",
          "Understand stateful vs stateless rules",
          "Learn about rule order and precedence",
        ],
        troubleshooting: [
          {
            issue: "Confusion about rule order",
            solution: "Remember: rules are processed top-to-bottom",
          },
        ],
      },
      {
        step_number: 2,
        title: "Set Up Lab Environment",
        instructions: "Create virtual machines for firewall testing.",
        commands: [
          "VBoxManage createvm --name fw-lab",
          "VBoxManage startvm fw-lab --type headless",
        ],
        expected_output: "Running VMs ready for firewall configuration",
        tips: [
          "Create at least 3 VMs: firewall, inside client, outside client",
          "Set up internal and external networks",
          "Configure network adapters appropriately",
        ],
        troubleshooting: [
          {
            issue: "VMs not communicating",
            solution: "Verify network adapter settings and routing",
          },
        ],
      },
      {
        step_number: 3,
        title: "Configure Firewall Rules",
        instructions: "Implement required firewall rules step by step.",
        commands: [
          "ufw default deny incoming",
          "ufw default allow outgoing",
          "ufw allow 22/tcp",
          "ufw allow 80/tcp",
          "ufw allow 443/tcp",
          "ufw enable",
        ],
        expected_output: "Active firewall with configured rules",
        tips: [
          "Start with default deny policy",
          "Explicitly allow required services",
          "Document each rule and its purpose",
        ],
        troubleshooting: [
          {
            issue: "Locked out of system",
            solution: "Allow SSH before enabling firewall",
          },
        ],
      },
      {
        step_number: 4,
        title: "Test Firewall Rules",
        instructions:
          "Verify firewall is working by testing allowed and blocked traffic.",
        commands: [
          "nc -zv target_ip 22",
          "nmap -Pn target_ip",
          "telnet target_ip 80",
        ],
        expected_output: "Confirmed blocked/allowed connections",
        tips: [
          "Test from inside and outside",
          "Test both allowed and denied ports",
          "Monitor firewall logs",
        ],
        troubleshooting: [
          {
            issue: "Unexpected port open/closed",
            solution: "Check rule syntax and order",
          },
        ],
      },
    ],
    assessment_criteria: [
      {
        objective: "Rule Implementation",
        success_indicators: [
          "All required rules created",
          "Correct protocols specified",
          "Proper action taken (allow/deny)",
        ],
        evaluation_method: "Review firewall configuration",
        passing_requirements: "100% of required rules implemented correctly",
      },
      {
        objective: "Functional Testing",
        success_indicators: [
          "Allowed traffic passes through",
          "Blocked traffic is denied",
          "Rules work from multiple sources",
        ],
        evaluation_method: "Test connectivity from different sources",
        passing_requirements: "All traffic rules work as specified",
      },
    ],
    extension_challenges: [
      {
        challenge: "Implement stateful firewall rules with connection tracking",
        difficulty: "intermediate",
        estimated_time_minutes: 45,
        objective: "Understand stateful firewall functionality",
      },
      {
        challenge: "Create rules to prevent common attacks (port scanning, DoS)",
        difficulty: "advanced",
        estimated_time_minutes: 60,
        objective: "Implement advanced firewall protection",
      },
    ],
    key_takeaways: [
      "Firewall rules follow top-to-bottom processing",
      "Default deny is more secure than default allow",
      "Document all firewall rules and their purposes",
      "Regular testing ensures rules work as intended",
      "Monitor firewall logs for suspicious activity",
    ],
    lab_report_template: [
      {
        section: "Rule Documentation",
        questions: [
          "What rules were created?",
          "Why was each rule necessary?",
          "What traffic does each rule allow/block?",
        ],
        expected_length: "Table format, 2+ pages",
      },
      {
        section: "Testing Results",
        questions: [
          "How was each rule tested?",
          "What were the results?",
          "Were any issues discovered?",
        ],
        expected_length: "2-3 pages with screenshots",
      },
    ],
  }),
  encryption_basics: (_difficulty, _timeAvailable) => ({
    scenario_description: {
      context:
        "You need to secure sensitive data using encryption for a business system.",
      business_problem:
        "Implement encryption to protect data at rest and in transit.",
      your_role:
        "Generate keys, encrypt/decrypt data, and verify encryption implementation.",
      target_outcomes: [
        "Understand symmetric encryption",
        "Create and manage encryption keys",
        "Encrypt and decrypt files",
        "Verify encryption integrity",
      ],
    },
    setup_requirements: {
      hardware_requirements: {
        cpu_cores: 1,
        ram_gb: 2,
        storage_gb: 5,
      },
      software_requirements: {
        operating_system: ["Linux", "macOS", "Windows"],
        tools: [
          { name: "OpenSSL", version: "1.1.1+", free: true },
          { name: "GPG", version: "2.0+", free: true },
        ],
        platform: ["Command line"],
      },
      estimated_setup_time_minutes: 10,
    },
    step_by_step_instructions: [
      {
        step_number: 1,
        title: "Create Test Data",
        instructions: "Create a file with sensitive data for encryption.",
        commands: [
          'echo "Sensitive confidential data" > sensitive_data.txt',
          "cat sensitive_data.txt",
        ],
        expected_output: "File containing test data",
        tips: [
          "Use meaningful test data",
          "Document the original content",
        ],
        troubleshooting: [
          {
            issue: "File not created",
            solution: "Check write permissions in directory",
          },
        ],
      },
      {
        step_number: 2,
        title: "Generate Encryption Keys",
        instructions: "Create a strong encryption key.",
        commands: [
          "openssl rand -base64 32 > encryption.key",
          "cat encryption.key",
        ],
        expected_output: "Base64-encoded encryption key",
        tips: [
          "Use 256-bit keys for AES encryption",
          "Store keys securely",
          "Never share encryption keys",
        ],
        troubleshooting: [
          {
            issue: "Key generation fails",
            solution: "Ensure /dev/urandom is available",
          },
        ],
      },
      {
        step_number: 3,
        title: "Encrypt Data",
        instructions: "Encrypt the sensitive data using AES-256.",
        commands: [
          "openssl enc -aes-256-cbc -salt -in sensitive_data.txt -out sensitive_data.enc -pass file:encryption.key",
        ],
        expected_output: "Encrypted file (binary/unreadable)",
        tips: [
          "Use -salt for added security",
          "Save encrypted files with .enc extension",
          "Keep original key secure",
        ],
        troubleshooting: [
          {
            issue: "Encryption fails",
            solution: "Verify key file exists and is readable",
          },
        ],
      },
      {
        step_number: 4,
        title: "Decrypt Data",
        instructions: "Decrypt the file to verify encryption worked.",
        commands: [
          "openssl enc -aes-256-cbc -d -in sensitive_data.enc -out sensitive_data_decrypted.txt -pass file:encryption.key",
          "cat sensitive_data_decrypted.txt",
        ],
        expected_output: "Decrypted file matching original content",
        tips: [
          "Use -d flag for decryption",
          "Verify decrypted content matches original",
          "Compare file hashes for verification",
        ],
        troubleshooting: [
          {
            issue: "Decryption fails",
            solution: "Ensure correct key and encrypted file",
          },
        ],
      },
      {
        step_number: 5,
        title: "Verify Encryption Integrity",
        instructions: "Confirm that encryption and decryption work correctly.",
        commands: [
          "md5sum sensitive_data.txt sensitive_data_decrypted.txt",
          "diff sensitive_data.txt sensitive_data_decrypted.txt",
        ],
        expected_output: "Identical hashes and no differences",
        tips: [
          "Compare MD5/SHA hashes",
          "Use diff to find any differences",
          "Test with wrong keys (should fail)",
        ],
        troubleshooting: [
          {
            issue: "Files don't match",
            solution: "Verify encryption/decryption process",
          },
        ],
      },
    ],
    assessment_criteria: [
      {
        objective: "Encryption Implementation",
        success_indicators: [
          "Successfully encrypted file",
          "Encrypted file is unreadable",
          "Correct encryption algorithm used",
        ],
        evaluation_method: "Verify encrypted file properties",
        passing_requirements: "File encrypted with AES-256",
      },
      {
        objective: "Decryption Verification",
        success_indicators: [
          "Successfully decrypted file",
          "Decrypted content matches original",
          "Hashes match",
        ],
        evaluation_method: "Compare original and decrypted files",
        passing_requirements: "Perfect match between original and decrypted",
      },
    ],
    extension_challenges: [
      {
        challenge: "Implement RSA asymmetric encryption",
        difficulty: "intermediate",
        estimated_time_minutes: 45,
        objective: "Understand public key cryptography",
      },
      {
        challenge: "Create digital signatures and verify authenticity",
        difficulty: "advanced",
        estimated_time_minutes: 60,
        objective: "Implement authentication and non-repudiation",
      },
    ],
    key_takeaways: [
      "Encryption protects data confidentiality",
      "Key management is critical for security",
      "Always use strong encryption algorithms",
      "Verify encryption implementation through testing",
      "Document encryption procedures",
    ],
    lab_report_template: [
      {
        section: "Encryption Methods",
        questions: [
          "What encryption algorithm was used?",
          "What key length was used?",
          "Why was this method chosen?",
        ],
        expected_length: "1 page",
      },
      {
        section: "Results",
        questions: [
          "Was encryption successful?",
          "What is the encrypted file size?",
          "Can the file be decrypted successfully?",
        ],
        expected_length: "1 page with evidence",
      },
    ],
  }),
};

export async function handleLabExercise(input: LabExerciseInput): Promise<LabExerciseResult> {
  const topicKey = input.topic
    .toLowerCase()
    .replace(/\s+/g, "_");

  const baseTemplate = LAB_TEMPLATES[topicKey]
    ? LAB_TEMPLATES[topicKey](input.difficulty_level, input.time_available)
    : generateGenericLabExercise(input);

  const lab_id = `lab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const title = generateLabTitle(input.topic, input.difficulty_level);

  return {
    lab_metadata: {
      lab_id,
      title,
      topic: input.topic,
      difficulty: input.difficulty_level,
      estimated_duration_minutes: input.time_available,
      learning_objectives: [input.learning_objective],
      prerequisites: getPrerequisites(input.topic, input.difficulty_level),
      kata_belt_alignment: getKataBeltAlignment(
        input.topic,
        input.difficulty_level
      ),
    },
    scenario_description: baseTemplate.scenario_description,
    setup_requirements: baseTemplate.setup_requirements,
    step_by_step_instructions: baseTemplate.step_by_step_instructions,
    assessment_criteria: baseTemplate.assessment_criteria,
    learning_resources: generateLearningResources(
      input.topic,
      input.difficulty_level
    ),
    extension_challenges: baseTemplate.extension_challenges,
    key_takeaways: baseTemplate.key_takeaways,
    lab_report_template: baseTemplate.lab_report_template,
  };
}

function generateLabTitle(topic: string, difficulty: string): string {
  return `${topic} Lab - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`;
}

function getPrerequisites(topic: string, difficulty: string): string[] {
  const topicLower = topic.toLowerCase();
  const prerequisites: string[] = [];

  if (!topicLower.includes("fundamental")) {
    prerequisites.push("Cybersecurity Fundamentals");
  }

  if (
    topicLower.includes("firewall") ||
    topicLower.includes("network") ||
    topicLower.includes("ips") ||
    topicLower.includes("ids")
  ) {
    prerequisites.push("Network basics");
    prerequisites.push("TCP/IP knowledge");
  }

  if (difficulty === "intermediate" || difficulty === "advanced") {
    prerequisites.push("Beginner-level hands-on experience");
  }

  if (difficulty === "advanced") {
    prerequisites.push("Intermediate-level security knowledge");
  }

  return prerequisites.length > 0 ? prerequisites : ["Basic IT knowledge"];
}

function getKataBeltAlignment(topic: string, difficulty: string): string[] {
  if (difficulty === "beginner") {
    return ["K.A.T.A. White Belt"];
  } else if (difficulty === "intermediate") {
    return ["K.A.T.A. Yellow Belt"];
  } else {
    return ["K.A.T.A. Orange Belt", "K.A.T.A. Red Belt"];
  }
}

function generateLearningResources(
  topic: string,
  difficulty: string
): Array<{
  resource_type: string;
  title: string;
  url: string;
  time_required_minutes: number;
  difficulty: string;
}> {
  return [
    {
      resource_type: "Tutorial",
      title: `${topic} Tutorial`,
      url: "https://example.com/tutorials",
      time_required_minutes: 30,
      difficulty: "beginner",
    },
    {
      resource_type: "Documentation",
      title: `Official ${topic} Documentation`,
      url: "https://example.com/docs",
      time_required_minutes: 45,
      difficulty: "intermediate",
    },
    {
      resource_type: "Video Course",
      title: `${topic} Video Course`,
      url: "https://example.com/videos",
      time_required_minutes: 120,
      difficulty,
    },
  ];
}

function generateGenericLabExercise(
  input: LabExerciseInput
): Omit<LabExerciseResult, "lab_metadata" | "learning_resources"> {
  const _topic = input.topic; // Suppress unused if needed
  return {
    scenario_description: {
      context: `You are tasked with learning and practicing ${input.topic}.`,
      business_problem: `Develop practical skills in ${input.topic} to improve security effectiveness.`,
      your_role: `Practice and demonstrate ${input.topic} skills.`,
      target_outcomes: [
        `Understand ${input.topic} concepts`,
        `Apply ${input.topic} techniques`,
        `Solve ${input.topic} challenges`,
        input.learning_objective,
      ],
    },
    setup_requirements: {
      hardware_requirements: {
        cpu_cores: 2,
        ram_gb: 4,
        storage_gb: 20,
      },
      software_requirements: {
        operating_system: ["Linux", "macOS", "Windows"],
        tools: [
          { name: "Virtual Machine", version: "latest", free: true },
          { name: "Lab Platform", version: "latest", free: true },
        ],
        platform: ["Cloud-based", "Local VM"],
      },
      estimated_setup_time_minutes: 30,
    },
    step_by_step_instructions: [
      {
        step_number: 1,
        title: "Setup Lab Environment",
        instructions: `Set up your ${input.topic} lab environment.`,
        commands: ["Prepare lab environment"],
        expected_output: "Ready for practice",
        tips: ["Document your setup process"],
        troubleshooting: [
          {
            issue: "Setup fails",
            solution: "Check documentation and requirements",
          },
        ],
      },
      {
        step_number: 2,
        title: "Learn Concepts",
        instructions: `Study ${input.topic} concepts and theory.`,
        commands: ["Review materials"],
        expected_output: "Understanding of concepts",
        tips: ["Take notes on key concepts"],
        troubleshooting: [
          {
            issue: "Concepts unclear",
            solution: "Review learning resources",
          },
        ],
      },
      {
        step_number: 3,
        title: "Practice Skills",
        instructions: `Apply ${input.topic} techniques in lab.`,
        commands: ["Execute practice exercises"],
        expected_output: "Demonstrated skill proficiency",
        tips: ["Practice repeatedly for mastery"],
        troubleshooting: [
          {
            issue: "Practice fails",
            solution: "Review theory and retry",
          },
        ],
      },
      {
        step_number: 4,
        title: "Verify Learning",
        instructions: input.learning_objective,
        commands: ["Test and validate"],
        expected_output: "Achievement of learning objective",
        tips: ["Verify all requirements met"],
        troubleshooting: [
          {
            issue: "Objective not met",
            solution: "Review steps and repeat",
          },
        ],
      },
    ],
    assessment_criteria: [
      {
        objective: input.learning_objective,
        success_indicators: [
          "Completed all steps",
          "Demonstrated understanding",
          "Achieved learning goal",
        ],
        evaluation_method: "Practical demonstration",
        passing_requirements: "100% task completion",
      },
    ],
    extension_challenges: [
      {
        challenge: `Advanced ${input.topic} challenge`,
        difficulty: "advanced",
        estimated_time_minutes: 60,
        objective: "Deepen expertise",
      },
    ],
    key_takeaways: [
      `Key concepts of ${input.topic}`,
      "Hands-on application techniques",
      "Best practices in the field",
    ],
    lab_report_template: [
      {
        section: "Summary",
        questions: ["What was accomplished?"],
        expected_length: "1 paragraph",
      },
    ],
  };
}
