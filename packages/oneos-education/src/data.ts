import { Course, Entity, Progress, Credential, Certificate } from './schemas.js';

// Mock database of courses across all ecosystem entities
export const courseDatabase: Course[] = [
  {
    id: 'course-001',
    title: 'Cybersecurity Fundamentals',
    description: 'Master core cybersecurity concepts, threat landscape, and defensive strategies',
    entity: Entity.BMCC_CYBER,
    level: 'beginner',
    duration: 24,
    price: 299,
    certification: 'CompTIA Security+',
    enrollmentCount: 1247,
    completionRate: 89.2,
    status: 'active',
    tags: ['cybersecurity', 'security', 'compliance', 'threat-analysis']
  },
  {
    id: 'course-002',
    title: 'Advanced Threat Detection & Response',
    description: 'Learn incident response procedures, forensics, and threat hunting techniques',
    entity: Entity.BMCC_CYBER,
    level: 'advanced',
    duration: 32,
    price: 599,
    certification: 'GIAC Certified Incident Handler',
    enrollmentCount: 423,
    completionRate: 85.1,
    status: 'active',
    tags: ['incident-response', 'forensics', 'threat-hunting', 'advanced']
  },
  {
    id: 'course-003',
    title: 'Supply Chain Management Excellence',
    description: 'Optimize logistics, inventory, and supplier relationships in global operations',
    entity: Entity.DHL_LAWRIE,
    level: 'intermediate',
    duration: 20,
    price: 399,
    certification: 'DHL Supply Chain Professional',
    enrollmentCount: 856,
    completionRate: 87.5,
    status: 'active',
    tags: ['supply-chain', 'logistics', 'optimization', 'operations']
  },
  {
    id: 'course-004',
    title: 'Global Trade & Import/Export',
    description: 'Navigate international trade regulations, tariffs, and customs compliance',
    entity: Entity.DHL_LAWRIE,
    level: 'intermediate',
    duration: 16,
    price: 349,
    certification: 'International Trade Specialist',
    enrollmentCount: 634,
    completionRate: 84.3,
    status: 'active',
    tags: ['international-trade', 'customs', 'compliance', 'logistics']
  },
  {
    id: 'course-005',
    title: 'AI & Machine Learning for Business',
    description: 'Understand AI applications, implementation strategies, and business impact',
    entity: Entity.CSGA_GLOBAL,
    level: 'intermediate',
    duration: 28,
    price: 499,
    certification: 'CSGA AI Strategy Professional',
    enrollmentCount: 1092,
    completionRate: 86.7,
    status: 'active',
    tags: ['ai', 'machine-learning', 'business-strategy', 'digital-transformation']
  },
  {
    id: 'course-006',
    title: 'Data Science & Analytics Masterclass',
    description: 'Master statistical analysis, data visualization, and predictive modeling',
    entity: Entity.CSGA_GLOBAL,
    level: 'advanced',
    duration: 36,
    price: 649,
    certification: 'Data Science Professional',
    enrollmentCount: 743,
    completionRate: 82.1,
    status: 'active',
    tags: ['data-science', 'analytics', 'python', 'visualization']
  },
  {
    id: 'course-007',
    title: 'Blockchain & Cryptocurrency Essentials',
    description: 'Explore blockchain technology, smart contracts, and decentralized applications',
    entity: Entity.CSOAI,
    level: 'intermediate',
    duration: 20,
    price: 449,
    certification: 'Blockchain Developer',
    enrollmentCount: 567,
    completionRate: 79.8,
    status: 'active',
    tags: ['blockchain', 'cryptocurrency', 'web3', 'smart-contracts']
  },
  {
    id: 'course-008',
    title: 'Digital Leadership & Transformation',
    description: 'Lead organizations through digital transformation and change management',
    entity: Entity.CSOAI,
    level: 'advanced',
    duration: 24,
    price: 549,
    certification: 'Digital Leadership Executive',
    enrollmentCount: 389,
    completionRate: 88.4,
    status: 'active',
    tags: ['leadership', 'digital-transformation', 'change-management', 'strategy']
  },
  {
    id: 'course-009',
    title: 'Enterprise Cloud Architecture',
    description: 'Design, deploy, and manage scalable cloud solutions for enterprises',
    entity: Entity.TERRANOVA,
    level: 'advanced',
    duration: 30,
    price: 699,
    certification: 'Cloud Solutions Architect',
    enrollmentCount: 612,
    completionRate: 85.6,
    status: 'active',
    tags: ['cloud', 'aws', 'azure', 'architecture', 'devops']
  },
  {
    id: 'course-010',
    title: 'DevOps & Continuous Integration/Deployment',
    description: 'Implement CI/CD pipelines, containerization, and infrastructure automation',
    entity: Entity.TERRANOVA,
    level: 'intermediate',
    duration: 22,
    price: 449,
    certification: 'DevOps Professional',
    enrollmentCount: 734,
    completionRate: 86.9,
    status: 'active',
    tags: ['devops', 'docker', 'kubernetes', 'cicd', 'automation']
  },
  {
    id: 'course-011',
    title: 'Quantum Computing Fundamentals',
    description: 'Introduction to quantum mechanics, quantum gates, and quantum algorithms',
    entity: Entity.ORBITQ,
    level: 'advanced',
    duration: 28,
    price: 799,
    certification: 'Quantum Computing Specialist',
    enrollmentCount: 189,
    completionRate: 76.2,
    status: 'active',
    tags: ['quantum-computing', 'physics', 'algorithms', 'research']
  },
  {
    id: 'course-012',
    title: 'Quantum-Classical Hybrid Systems',
    description: 'Build hybrid quantum-classical applications and optimize performance',
    entity: Entity.ORBITQ,
    level: 'expert',
    duration: 40,
    price: 1299,
    certification: 'Quantum Systems Expert',
    enrollmentCount: 78,
    completionRate: 71.8,
    status: 'active',
    tags: ['quantum-computing', 'hybrid-systems', 'optimization', 'expert']
  },
  {
    id: 'course-013',
    title: 'Prompt Engineering & LLM Optimization',
    description: 'Master prompt design, fine-tuning, and optimization of large language models',
    entity: Entity.AIDOME,
    level: 'intermediate',
    duration: 16,
    price: 299,
    certification: 'Prompt Engineering Professional',
    enrollmentCount: 2341,
    completionRate: 91.3,
    status: 'active',
    tags: ['ai', 'llm', 'prompt-engineering', 'gpt', 'generative-ai']
  },
  {
    id: 'course-014',
    title: 'Building Production AI Systems',
    description: 'Deploy, scale, and maintain AI systems in production environments',
    entity: Entity.AIDOME,
    level: 'advanced',
    duration: 26,
    price: 649,
    certification: 'AI Systems Engineer',
    enrollmentCount: 456,
    completionRate: 83.7,
    status: 'active',
    tags: ['ai', 'production', 'mlops', 'engineering', 'deployment']
  },
  {
    id: 'course-015',
    title: 'Ethical AI & Responsible Innovation',
    description: 'Understand AI ethics, bias mitigation, and responsible AI deployment',
    entity: Entity.AIDOME,
    level: 'intermediate',
    duration: 12,
    price: 199,
    certification: 'Ethical AI Practitioner',
    enrollmentCount: 1834,
    completionRate: 89.9,
    status: 'active',
    tags: ['ai-ethics', 'responsibility', 'bias-mitigation', 'governance']
  },
  {
    id: 'course-016',
    title: 'Network Security & Penetration Testing',
    description: 'Advanced network defense, vulnerability assessment, and ethical hacking',
    entity: Entity.BMCC_CYBER,
    level: 'advanced',
    duration: 28,
    price: 649,
    certification: 'Certified Ethical Hacker (CEH)',
    enrollmentCount: 567,
    completionRate: 80.2,
    status: 'active',
    tags: ['penetration-testing', 'network-security', 'ethical-hacking', 'security']
  },
  {
    id: 'course-017',
    title: 'API Design & Microservices Architecture',
    description: 'Design robust APIs, implement microservices, and manage distributed systems',
    entity: Entity.TERRANOVA,
    level: 'intermediate',
    duration: 18,
    price: 399,
    certification: 'API & Microservices Architect',
    enrollmentCount: 789,
    completionRate: 87.1,
    status: 'active',
    tags: ['api', 'microservices', 'backend', 'architecture', 'rest']
  },
  {
    id: 'course-018',
    title: 'Advanced Data Engineering',
    description: 'Build data pipelines, data warehousing, and real-time analytics systems',
    entity: Entity.CSGA_GLOBAL,
    level: 'advanced',
    duration: 34,
    price: 699,
    certification: 'Data Engineering Expert',
    enrollmentCount: 412,
    completionRate: 81.5,
    status: 'active',
    tags: ['data-engineering', 'big-data', 'data-pipelines', 'analytics']
  },
  {
    id: 'course-019',
    title: 'Financial Technology & Blockchain',
    description: 'FinTech innovation, DeFi protocols, and decentralized finance',
    entity: Entity.CSOAI,
    level: 'advanced',
    duration: 24,
    price: 599,
    certification: 'FinTech Specialist',
    enrollmentCount: 324,
    completionRate: 78.9,
    status: 'active',
    tags: ['fintech', 'blockchain', 'defi', 'cryptocurrency', 'finance']
  },
  {
    id: 'course-020',
    title: 'Digital Marketing & Growth Hacking',
    description: 'Master SEO, content marketing, social media, and data-driven growth strategies',
    entity: Entity.DHL_LAWRIE,
    level: 'intermediate',
    duration: 14,
    price: 249,
    certification: 'Digital Marketing Professional',
    enrollmentCount: 1456,
    completionRate: 90.2,
    status: 'active',
    tags: ['digital-marketing', 'seo', 'growth-hacking', 'analytics', 'business']
  },
  {
    id: 'course-021',
    title: 'Product Management Essentials',
    description: 'Product strategy, roadmapping, and go-to-market execution',
    entity: Entity.CSGA_GLOBAL,
    level: 'intermediate',
    duration: 18,
    price: 379,
    certification: 'Product Management Professional',
    enrollmentCount: 523,
    completionRate: 86.3,
    status: 'active',
    tags: ['product-management', 'strategy', 'business', 'innovation']
  },
  {
    id: 'course-022',
    title: 'Customer Experience & Service Design',
    description: 'Design customer journeys and build exceptional service experiences',
    entity: Entity.DHL_LAWRIE,
    level: 'beginner',
    duration: 10,
    price: 179,
    certification: 'CX Professional',
    enrollmentCount: 892,
    completionRate: 92.1,
    status: 'active',
    tags: ['customer-experience', 'service-design', 'ux', 'business']
  },
  {
    id: 'course-023',
    title: 'Sustainable Business & ESG Leadership',
    description: 'Environmental, social, and governance leadership in modern enterprises',
    entity: Entity.TERRANOVA,
    level: 'intermediate',
    duration: 16,
    price: 299,
    certification: 'ESG Leadership Professional',
    enrollmentCount: 401,
    completionRate: 88.7,
    status: 'active',
    tags: ['sustainability', 'esg', 'leadership', 'business', 'governance']
  },
  {
    id: 'course-024',
    title: 'Advanced Quantum Algorithms',
    description: 'Deep dive into Shor, Grover, and variational quantum algorithms',
    entity: Entity.ORBITQ,
    level: 'expert',
    duration: 32,
    price: 1499,
    certification: 'Quantum Algorithms Specialist',
    enrollmentCount: 45,
    completionRate: 68.9,
    status: 'active',
    tags: ['quantum-computing', 'algorithms', 'research', 'mathematics']
  }
];

// Mock learner progress data
export const learnerProgressDatabase: Record<string, Progress> = {
  'learner-001': {
    learnerId: 'learner-001',
    currentCourses: [
      {
        courseId: 'course-001',
        title: 'Cybersecurity Fundamentals',
        completionPercentage: 65,
        lastAccessDate: '2025-02-24',
        daysRemaining: 12
      },
      {
        courseId: 'course-005',
        title: 'AI & Machine Learning for Business',
        completionPercentage: 42,
        lastAccessDate: '2025-02-23',
        daysRemaining: 18
      }
    ],
    completedCourses: [
      {
        courseId: 'course-022',
        title: 'Customer Experience & Service Design',
        completionDate: '2025-01-15',
        score: 94
      }
    ],
    upcomingDeadlines: [
      {
        courseId: 'course-001',
        title: 'Cybersecurity Fundamentals',
        deadline: '2025-03-10',
        daysUntilDeadline: 13
      }
    ],
    achievements: [
      {
        badgeId: 'badge-001',
        name: 'Quick Learner',
        earnedDate: '2025-01-20',
        description: 'Completed 1 course in under 2 weeks'
      }
    ],
    totalHoursLearned: 34,
    certificationsEarned: 1,
    averageCompletionRate: 83.5
  }
};

// Mock enrollment data
export const enrollmentDatabase: Record<string, any> = {
  'course-001': {
    enrollmentId: 'enrollment-001',
    courseId: 'course-001',
    learnerId: 'learner-001',
    status: 'active',
    enrollmentDate: '2025-02-01',
    startDate: '2025-02-03',
    expectedCompletionDate: '2025-03-10',
    prerequisites: [],
    paymentOptions: [
      {
        method: 'credit_card',
        amount: 299,
        currency: 'USD',
        available: true
      },
      {
        method: 'installment',
        amount: 99.67,
        currency: 'USD',
        available: true
      }
    ]
  }
};

// Mock credential database
export const credentialDatabase: Record<string, Credential> = {
  'cred-001': {
    id: 'cred-001',
    learnerId: 'learner-001',
    courseId: 'course-022',
    certificationType: 'completion',
    issuingEntity: Entity.DHL_LAWRIE,
    completionDate: '2025-01-15',
    skillsValidated: ['customer-experience', 'service-design', 'ux-principles', 'customer-journey-mapping'],
    blockchainAnchor: '0x4a7f2e1c8b9d3e5f6a2c1d9e8f7a6b5c',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw...',
    verificationUrl: 'https://oneos.verify/credentials/cred-001',
    status: 'valid'
  }
};

// Mock certificate database
export const certificateDatabase: Record<string, Certificate> = {
  'cert-001': {
    certificateId: 'cert-001',
    learnerId: 'learner-001',
    courseId: 'course-022',
    courseName: 'Customer Experience & Service Design',
    issuingEntity: Entity.DHL_LAWRIE,
    issuanceDate: '2025-01-15',
    expirationDate: '2027-01-15',
    score: 94,
    digitalCertificateUrl: 'https://oneos.certificates/cert-001.pdf',
    qrCodeUrl: 'https://oneos.certificates/qr-codes/cert-001.png',
    linkedInBadgeUrl: 'https://www.linkedin.com/learning/certificates/oneOS-cx-prof',
    blockchainAnchor: '0x4a7f2e1c8b9d3e5f6a2c1d9e8f7a6b5c',
    blockchainVerificationUrl: 'https://blockchain.verify/transactions/0x4a7f2e1c8b9d3e5f6a2c1d9e8f7a6b5c',
    skills: ['customer-experience', 'service-design', 'ux-principles', 'customer-journey-mapping']
  }
};

// Platform metrics
export const platformMetrics = {
  totalLearners: 12847,
  activeEnrollments: 8432,
  activeCourses: 24,
  completionRate: 87.3,
  monthlyRevenue: 54820,
  averageCourseDuration: 22.5,
  averageCoursePrice: 449,
  topEntities: [Entity.AIDOME, Entity.CSGA_GLOBAL, Entity.TERRANOVA, Entity.BMCC_CYBER],
  topSkills: ['ai', 'machine-learning', 'cloud', 'cybersecurity', 'data-science', 'blockchain', 'devops'],
  lastUpdated: new Date().toISOString()
};

// Helper function to generate a course with specific criteria
export function findCoursesByQuery(
  topic: string,
  skillLevel?: string,
  sector?: string,
  entity?: string
): Course[] {
  return courseDatabase.filter(course => {
    const topicMatch = course.title.toLowerCase().includes(topic.toLowerCase()) ||
                      course.description.toLowerCase().includes(topic.toLowerCase()) ||
                      course.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()));

    const levelMatch = !skillLevel || course.level === skillLevel;
    const sectorMatch = !sector || course.tags.some(tag => tag.toLowerCase().includes(sector.toLowerCase()));
    const entityMatch = !entity || course.entity === entity;

    return topicMatch && levelMatch && sectorMatch && entityMatch;
  });
}

// Helper function to generate learning path
export function generateLearningPath(
  careerGoal: string,
  _currentSkills: string[],
  timeAvailable: number,
  budget: number,
  preferredEntities?: string[]
): Course[] {
  let recommendedCourses = courseDatabase.filter(course => {
    const entityMatch = !preferredEntities || preferredEntities.length === 0 || preferredEntities.includes(course.entity);
    const budgetMatch = course.price <= budget;
    const timeMatch = course.duration <= (timeAvailable * 4); // 4 weeks average
    const skillMatch = course.tags.some(tag => careerGoal.toLowerCase().includes(tag) || tag.includes(careerGoal.toLowerCase()));

    return entityMatch && budgetMatch && timeMatch && skillMatch;
  });

  // Sort by relevance and price
  recommendedCourses.sort((a, b) => {
    const scoreA = a.completionRate + (1000 - a.price) / 10;
    const scoreB = b.completionRate + (1000 - b.price) / 10;
    return scoreB - scoreA;
  });

  return recommendedCourses.slice(0, 8);
}

// Helper function to verify credential
export function verifyCredential(credentialId: string): Credential | null {
  return credentialDatabase[credentialId] || null;
}

// Helper function to issue certificate
export function issueCertificate(
  courseId: string,
  learnerId: string,
  completionDate: Date,
  score?: number
): Certificate {
  const course = courseDatabase.find(c => c.id === courseId);
  if (!course) throw new Error(`Course ${courseId} not found`);

  const certificateId = `cert-${Date.now()}`;
  const blockchainAnchor = `0x${Math.random().toString(16).substring(2)}`;

  const certificate: Certificate = {
    certificateId,
    learnerId,
    courseId,
    courseName: course.title,
    issuingEntity: course.entity,
    issuanceDate: completionDate.toISOString(),
    expirationDate: new Date(completionDate.getTime() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString(),
    score,
    digitalCertificateUrl: `https://oneos.certificates/${certificateId}.pdf`,
    qrCodeUrl: `https://oneos.certificates/qr-codes/${certificateId}.png`,
    linkedInBadgeUrl: `https://www.linkedin.com/learning/certificates/oneOS-${courseId}`,
    blockchainAnchor,
    blockchainVerificationUrl: `https://blockchain.verify/transactions/${blockchainAnchor}`,
    skills: course.tags
  };

  certificateDatabase[certificateId] = certificate;
  return certificate;
}
