/**
 * career-explorer.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  CareerExplorerInput,
  CareerExplorerOutput,
  CareerPathway,
  MentorProfile
} from '../types';

// Career pathway database
const CAREER_PATHWAYS: Record<string, CareerPathway> = {
  'Software Engineer': {
    career_title: 'Software Engineer',
    industry: 'Technology',
    education_required: ['Bachelor\'s in Computer Science or related field', 'Coding bootcamp (alternative)', 'Continuous professional development in new frameworks'],
    estimated_salary_range: '$80,000 - $180,000+ annually',
    growth_outlook: 'Much Faster Than Average (22% growth 2020-2030)',
    related_skills: ['Programming', 'Problem-solving', 'Systems design', 'Communication', 'Collaboration', 'Version control', 'Databases']
  },
  'Data Scientist': {
    career_title: 'Data Scientist',
    industry: 'Technology',
    education_required: ['Bachelor\'s in Mathematics, Statistics, or Computer Science', 'Master\'s in Data Science (preferred)', 'Certifications in machine learning'],
    estimated_salary_range: '$100,000 - $200,000+ annually',
    growth_outlook: 'Much Faster Than Average (36% growth 2021-2031)',
    related_skills: ['Statistics', 'Programming (Python, R)', 'Machine learning', 'Data visualization', 'SQL', 'Communication', 'Business acumen']
  },
  'Environmental Engineer': {
    career_title: 'Environmental Engineer',
    industry: 'Environmental',
    education_required: ['Bachelor\'s in Environmental Engineering or related field', 'Professional Engineer (PE) license', 'Continuing education in environmental regulations'],
    estimated_salary_range: '$70,000 - $150,000+ annually',
    growth_outlook: 'Faster Than Average (8% growth 2020-2030)',
    related_skills: ['Systems design', 'Environmental science', 'Project management', 'Regulatory knowledge', 'Problem-solving', 'Communication', 'CAD']
  },
  'Business Manager': {
    career_title: 'Business Manager',
    industry: 'Business',
    education_required: ['Bachelor\'s in Business, Economics, or related field', 'MBA (often preferred)', 'Leadership certifications'],
    estimated_salary_range: '$60,000 - $150,000+ annually',
    growth_outlook: 'Faster Than Average (7% growth 2021-2031)',
    related_skills: ['Leadership', 'Strategic planning', 'Financial analysis', 'Communication', 'Decision-making', 'People management', 'Negotiation']
  },
  'Healthcare Professional': {
    career_title: 'Healthcare Professional (Nurse, Doctor, Therapist)',
    industry: 'Healthcare',
    education_required: ['Bachelor\'s in Nursing or Health Sciences', 'Medical or graduate degree (for physicians, specialists)', 'State licensure', 'Continuing medical education'],
    estimated_salary_range: '$60,000 - $250,000+ annually (varies by specialty)',
    growth_outlook: 'Much Faster Than Average (16% growth 2021-2031)',
    related_skills: ['Patient care', 'Communication', 'Empathy', 'Critical thinking', 'Attention to detail', 'Teamwork', 'Clinical knowledge']
  },
  'Mechanical Engineer': {
    career_title: 'Mechanical Engineer',
    industry: 'Engineering',
    education_required: ['Bachelor\'s in Mechanical Engineering', 'Professional Engineer (PE) license', 'Specialized certifications'],
    estimated_salary_range: '$70,000 - $160,000+ annually',
    growth_outlook: 'About Average (4% growth 2021-2031)',
    related_skills: ['CAD design', 'Physics', 'Thermodynamics', 'Problem-solving', 'Project management', 'Communication', 'Materials science']
  },
  'Architect': {
    career_title: 'Architect',
    industry: 'Architecture',
    education_required: ['Bachelor\'s in Architecture (5-year program)', 'Internship and apprenticeship', 'Licensure exam and professional registration'],
    estimated_salary_range: '$80,000 - $150,000+ annually',
    growth_outlook: 'Faster Than Average (3% growth 2021-2031)',
    related_skills: ['Design', 'CAD/BIM software', 'Spatial reasoning', 'Project management', 'Building codes', 'Communication', 'Creativity']
  },
  'Entrepreneur': {
    career_title: 'Entrepreneur/Business Owner',
    industry: 'Business',
    education_required: ['Bachelor\'s degree in any field', 'Business education/MBA (optional)', 'Practical experience in target industry'],
    estimated_salary_range: '$50,000 - $500,000+ annually (highly variable)',
    growth_outlook: 'Growing sector with high variability',
    related_skills: ['Leadership', 'Sales', 'Marketing', 'Financial management', 'Risk management', 'Networking', 'Resilience', 'Innovation']
  }
};

// Day-in-the-life descriptions
const DAY_IN_LIFE_MAP: Record<string, string> = {
  'Software Engineer': '9am: Team standup meeting to discuss daily goals | 10am-12pm: Code review and pair programming | 12pm-1pm: Lunch | 1pm-3pm: Work on assigned features and debug code | 3pm: Team meeting on upcoming project | 3:30pm-5pm: Continuous learning, unit tests, and documentation | Optional: Open source contribution or technical blog writing',
  'Data Scientist': '9am: Check data pipeline and model performance | 9:30am-11am: Exploratory data analysis on new dataset | 11am: Meeting with stakeholders about project requirements | 12pm-1pm: Lunch | 1pm-4pm: Build and test machine learning models, create visualizations | 4pm: Team meeting on model deployment | 4:30pm-5pm: Document findings and prepare reports',
  'Environmental Engineer': '8am: Site inspection of water treatment facility | 10am-12pm: Lab testing of environmental samples | 12pm-1pm: Lunch | 1pm-3pm: Regulatory compliance review and documentation | 3pm: Meeting with client about environmental impact assessment | 3:45pm-5pm: Design CAD drawings for environmental systems | Evening: Continue learning about new environmental technologies',
  'Business Manager': '8am: Review reports and check emails | 8:30am-9:30am: Team meeting to discuss quarterly goals | 10am-12pm: One-on-one meetings with team members | 12pm-1pm: Lunch with colleague or business contact | 1pm-3pm: Strategic planning and budget review | 3pm: Conference call with executive leadership | 3:45pm-5pm: Performance reviews and hiring decisions',
  'Healthcare Professional': '6am: Arrive at hospital/clinic | 6:30am: Team huddle with nurses and doctors | 7am-12pm: Patient care, assessments, and treatments | 12pm-1pm: Lunch and team debrief | 1pm-5pm: Continue patient care, consultations, and documentation | 5pm: Handoff to next shift | Evening: Keep learning about latest medical practices and research',
  'Architect': '9am: Review design drawings and blueprints | 10am-12pm: Client meeting to discuss project vision | 12pm-1pm: Lunch and site visit coordination | 1pm-3pm: Work in BIM software designing building systems | 3pm: Team meeting with structural and MEP engineers | 3:45pm-5pm: Specification writing and material research | Evening: Review architecture publications and attend design conference',
  'Entrepreneur': 'Variable! 8am: Check sales and metrics from previous day | 9am-11am: Meetings with co-founders and team leads | 11am-12pm: Customer/investor meeting | 12pm-2pm: Lunch and rapid problem-solving | 2pm-4pm: Product development or marketing strategy | 4pm-6pm: Administrative tasks, investor relations, hiring | Evening: Networking event or personal professional development'
};

// Available mentors by industry
const MENTORS_BY_INDUSTRY: Record<string, MentorProfile[]> = {
  'Technology': [
    {
      id: 'tech-mentor-1',
      name: 'Sarah Chen',
      expertise: ['Computer Science', 'Engineering', 'Technology'],
      industry: 'Technology',
      experience_years: 12,
      availability: ['Monday', 'Wednesday', 'Saturday'],
      certifications: ['AWS Solutions Architect', 'Certified Scrum Master'],
      session_format_preference: 'Virtual',
      rating: 4.9,
      match_score: 0.95
    }
  ],
  'Healthcare': [
    {
      id: 'health-mentor-1',
      name: 'Dr. Jennifer Liu',
      expertise: ['Science', 'Environmental', 'Healthcare'],
      industry: 'Healthcare',
      experience_years: 18,
      availability: ['Wednesday', 'Friday', 'Sunday'],
      certifications: ['Medical Doctor', 'Public Health'],
      session_format_preference: 'In Person',
      rating: 4.95,
      match_score: 0.94
    }
  ],
  'Engineering': [
    {
      id: 'eng-mentor-1',
      name: 'Alex Patel',
      expertise: ['Engineering', 'Manufacturing', 'Technology'],
      industry: 'Engineering',
      experience_years: 14,
      availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      certifications: ['Professional Engineer (PE)', 'Six Sigma Black Belt'],
      session_format_preference: 'Hybrid',
      rating: 4.85,
      match_score: 0.91
    }
  ],
  'Business': [
    {
      id: 'bus-mentor-1',
      name: 'Rebecca Williams',
      expertise: ['Business', 'Entrepreneurship', 'Finance'],
      industry: 'Business',
      experience_years: 16,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      certifications: ['MBA', 'CFA Charterholder'],
      session_format_preference: 'Virtual',
      rating: 4.87,
      match_score: 0.93
    }
  ],
  'Environmental': [
    {
      id: 'env-mentor-1',
      name: 'Marcus Green',
      expertise: ['Environmental', 'Science', 'Engineering'],
      industry: 'Environmental',
      experience_years: 11,
      availability: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
      certifications: ['Professional Engineer (PE)', 'Environmental Management'],
      session_format_preference: 'Hybrid',
      rating: 4.82,
      match_score: 0.89
    }
  ]
};

// Industry growth trends
const INDUSTRY_GROWTH_TRENDS: Record<string, string> = {
  'Technology': 'Explosive growth driven by AI, cloud computing, and cybersecurity. 22-36% job growth expected. High demand for software engineers, data scientists, and cloud architects.',
  'Healthcare': 'Rapid expansion due to aging population and increased health awareness. 16% job growth. Critical shortage of nurses, doctors, and mental health professionals.',
  'Engineering': 'Steady growth with focus on sustainable infrastructure. 4-8% job growth. Increasing demand for environmental and renewable energy engineers.',
  'Business': 'Moderate growth with emphasis on data-driven decision making. 7% job growth. Strong demand for MBA holders and business managers.',
  'Environmental': 'Strong growth driven by climate change and sustainability initiatives. 8% job growth. Emerging green energy sector creating new opportunities.',
  'Architecture': 'Slow but stable growth. 3% job growth. Growing demand for sustainable building design (LEED, green architecture).',
  'Finance': 'Moderate growth with fintech disruption. 5% job growth. Increasing demand for financial analysts and data science roles in finance.'
};

export async function careerExplorer(input: CareerExplorerInput): Promise<CareerExplorerOutput> {
  // Find matching career pathways
  const pathways = findMatchingPathways(input);

  // Get day-in-life descriptions
  const dayInLifeMap = generateDayInLifeMap(pathways);

  // Compile education requirements
  const educationReqs = compileEducationRequirements(pathways);

  // Compile salary ranges
  const salaryRanges = compileSalaryRanges(pathways);

  // Find available mentors
  const mentors = findAvailableMentors(input, pathways);

  // Get industry trends
  const trends = getIndustryTrends(input.preferred_industries);

  return {
    career_pathways: pathways,
    day_in_life_descriptions: dayInLifeMap,
    required_education: educationReqs,
    salary_ranges: salaryRanges,
    available_mentors_count: mentors.length,
    available_mentors: mentors,
    industry_growth_trends: trends
  };
}

function findMatchingPathways(input: CareerExplorerInput): CareerPathway[] {
  const allPathways = Object.values(CAREER_PATHWAYS);

  // Filter by preferred industries
  const industryMatches = allPathways.filter(p =>
    input.preferred_industries.some(ind =>
      ind.toLowerCase() === p.industry.toLowerCase()
    )
  );

  // Score by interest overlap
  const scored = industryMatches.map(pathway => {
    let score = 0;
    const pathwayKeywords = [
      ...pathway.related_skills,
      pathway.career_title.toLowerCase(),
      pathway.industry.toLowerCase()
    ].map(s => s.toLowerCase());

    input.student_interests.forEach(interest => {
      if (pathwayKeywords.some(kw => kw.includes(interest.toLowerCase()))) {
        score++;
      }
    });

    return { pathway, score };
  });

  // Return top 3-5 matches
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.pathway);
}

function generateDayInLifeMap(pathways: CareerPathway[]): Record<string, string> {
  const map: Record<string, string> = {};

  pathways.forEach(pathway => {
    map[pathway.career_title] = DAY_IN_LIFE_MAP[pathway.career_title] ||
      'A typical day involves a mix of hands-on work, meetings, and continuous learning. Activities vary based on company size and role.';
  });

  return map;
}

function compileEducationRequirements(pathways: CareerPathway[]): string[] {
  const requirements = new Set<string>();

  pathways.forEach(pathway => {
    pathway.education_required.forEach(req => requirements.add(req));
  });

  return Array.from(requirements);
}

function compileSalaryRanges(pathways: CareerPathway[]): string[] {
  return pathways.map(p => `${p.career_title}: ${p.estimated_salary_range}`);
}

function findAvailableMentors(input: CareerExplorerInput, pathways: CareerPathway[]): MentorProfile[] {
  const mentors: MentorProfile[] = [];

  // Collect mentors from preferred industries
  input.preferred_industries.forEach(industry => {
    if (MENTORS_BY_INDUSTRY[industry]) {
      mentors.push(...MENTORS_BY_INDUSTRY[industry]);
    }
  });

  // Remove duplicates and return
  const uniqueMentors = Array.from(new Map(mentors.map(m => [m.id, m])).values());
  return uniqueMentors.slice(0, 6);
}

function getIndustryTrends(industries: string[]): Record<string, string> {
  const trends: Record<string, string> = {};

  industries.forEach(industry => {
    trends[industry] = INDUSTRY_GROWTH_TRENDS[industry] ||
      'Stable industry with consistent opportunities for growth and development.';
  });

  return trends;
}
