/**
 * mentor-match.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  MentorMatchInput,
  MentorMatchOutput,
  MentorProfile
} from '../types';

// Mock database of mentors - expanded with 15+ regional/subject combinations
const MENTOR_DATABASE: Record<string, MentorProfile[]> = {
  // TECHNOLOGY MENTORS
  'Technology-Northeast': [
    {
      id: 'mentor-001',
      name: 'Sarah Chen',
      expertise: ['Computer Science', 'Full Stack Development', 'AI/Machine Learning'],
      industry: 'Technology',
      experience_years: 12,
      availability: ['Monday', 'Wednesday', 'Saturday'],
      certifications: ['AWS Solutions Architect', 'Certified Scrum Master', 'Python Professional'],
      session_format_preference: 'Virtual',
      rating: 4.9,
      match_score: 0.95
    },
    {
      id: 'mentor-002',
      name: 'Michael Torres',
      expertise: ['Computer Science', 'Entrepreneurship', 'Mobile Development'],
      industry: 'Technology',
      experience_years: 15,
      availability: ['Tuesday', 'Thursday', 'Friday'],
      certifications: ['Google Cloud Architect', 'Product Management Certified'],
      session_format_preference: 'Hybrid',
      rating: 4.8,
      match_score: 0.92
    },
    {
      id: 'mentor-061',
      name: 'Dr. Rajesh Kumar',
      expertise: ['Data Science', 'Software Engineering', 'Cloud Architecture'],
      industry: 'Technology',
      experience_years: 18,
      availability: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
      certifications: ['Azure Solutions Architect', 'Certified Data Engineer'],
      session_format_preference: 'Virtual',
      rating: 4.85,
      match_score: 0.91
    }
  ],
  'Technology-West': [
    {
      id: 'mentor-062',
      name: 'Jessica Wu',
      expertise: ['Cybersecurity', 'Network Engineering', 'Systems Administration'],
      industry: 'Technology',
      experience_years: 11,
      availability: ['Wednesday', 'Friday', 'Saturday', 'Sunday'],
      certifications: ['CISSP', 'CompTIA Security+', 'CEH'],
      session_format_preference: 'Hybrid',
      rating: 4.88,
      match_score: 0.90
    },
    {
      id: 'mentor-063',
      name: 'James Anderson',
      expertise: ['Web Development', 'User Interface Design', 'JavaScript Frameworks'],
      industry: 'Technology',
      experience_years: 9,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      certifications: ['Full Stack Web Developer', 'UX Design Certification'],
      session_format_preference: 'Virtual',
      rating: 4.82,
      match_score: 0.89
    }
  ],
  'Technology-Midwest': [
    {
      id: 'mentor-064',
      name: 'Patricia Johnson',
      expertise: ['DevOps', 'Container Technology', 'Infrastructure as Code'],
      industry: 'Technology',
      experience_years: 13,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      certifications: ['Kubernetes Certified', 'AWS DevOps Engineer'],
      session_format_preference: 'Hybrid',
      rating: 4.86,
      match_score: 0.89
    }
  ],

  // SCIENCE MENTORS
  'Science-Northeast': [
    {
      id: 'mentor-003',
      name: 'Dr. Jennifer Liu',
      expertise: ['Biology', 'Marine Science', 'Environmental Science'],
      industry: 'Healthcare',
      experience_years: 18,
      availability: ['Wednesday', 'Friday', 'Sunday'],
      certifications: ['Medical Doctor', 'Environmental Science PhD', 'Public Health'],
      session_format_preference: 'In Person',
      rating: 4.95,
      match_score: 0.94
    },
    {
      id: 'mentor-065',
      name: 'Dr. Robert Goldman',
      expertise: ['Physics', 'Astronomy', 'STEM Education'],
      industry: 'Education',
      experience_years: 20,
      availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      certifications: ['Physics PhD', 'AP Teacher Certification'],
      session_format_preference: 'Hybrid',
      rating: 4.92,
      match_score: 0.93
    },
    {
      id: 'mentor-066',
      name: 'Dr. Amanda Harris',
      expertise: ['Chemistry', 'Biochemistry', 'Lab Research Methods'],
      industry: 'Pharmaceutical',
      experience_years: 14,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      certifications: ['Chemistry PhD', 'Certified Lab Manager'],
      session_format_preference: 'In Person',
      rating: 4.89,
      match_score: 0.91
    }
  ],
  'Science-West': [
    {
      id: 'mentor-067',
      name: 'Dr. Marcus Chen',
      expertise: ['Geology', 'Environmental Science', 'Sustainability'],
      industry: 'Environmental Science',
      experience_years: 16,
      availability: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      certifications: ['Geology PhD', 'Certified Environmental Specialist'],
      session_format_preference: 'Hybrid',
      rating: 4.90,
      match_score: 0.92
    },
    {
      id: 'mentor-068',
      name: 'Dr. Lisa Patel',
      expertise: ['Ecology', 'Conservation', 'Biodiversity'],
      industry: 'Environmental Science',
      experience_years: 12,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      certifications: ['Ecology PhD', 'Conservation International Certified'],
      session_format_preference: 'In Person',
      rating: 4.87,
      match_score: 0.90
    }
  ],
  'Science-Southeast': [
    {
      id: 'mentor-069',
      name: 'Dr. William Thompson',
      expertise: ['Medical Science', 'Pathology', 'Health Sciences'],
      industry: 'Healthcare',
      experience_years: 19,
      availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      certifications: ['Medical Doctor', 'Pathology Board Certified'],
      session_format_preference: 'Hybrid',
      rating: 4.93,
      match_score: 0.92
    }
  ],

  // MATHEMATICS MENTORS
  'Mathematics-Northeast': [
    {
      id: 'mentor-070',
      name: 'Dr. Sophia Kaplan',
      expertise: ['Advanced Mathematics', 'Statistics', 'Algebra'],
      industry: 'Education',
      experience_years: 17,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      certifications: ['Mathematics PhD', 'AP Mathematics Instructor'],
      session_format_preference: 'Virtual',
      rating: 4.91,
      match_score: 0.92
    },
    {
      id: 'mentor-071',
      name: 'Kevin O\'Brien',
      expertise: ['Calculus', 'Linear Algebra', 'Problem Solving'],
      industry: 'Finance',
      experience_years: 10,
      availability: ['Tuesday', 'Thursday', 'Friday', 'Sunday'],
      certifications: ['Mathematics Education Specialist', 'Quantitative Analyst'],
      session_format_preference: 'Hybrid',
      rating: 4.84,
      match_score: 0.88
    }
  ],
  'Mathematics-Midwest': [
    {
      id: 'mentor-072',
      name: 'Elena Russo',
      expertise: ['Geometry', 'Trigonometry', 'Mathematical Reasoning'],
      industry: 'Education',
      experience_years: 11,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      certifications: ['Mathematics Teaching Certification', 'STEM Educator'],
      session_format_preference: 'Virtual',
      rating: 4.86,
      match_score: 0.89
    }
  ],

  // ENGINEERING MENTORS
  'Engineering-West': [
    {
      id: 'mentor-004',
      name: 'Alex Patel',
      expertise: ['Mechanical Engineering', 'Manufacturing', 'CAD Design'],
      industry: 'Engineering',
      experience_years: 14,
      availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      certifications: ['Professional Engineer (PE)', 'Six Sigma Black Belt', 'AutoCAD Certified'],
      session_format_preference: 'Hybrid',
      rating: 4.85,
      match_score: 0.91
    },
    {
      id: 'mentor-073',
      name: 'Dr. Kenji Yamamoto',
      expertise: ['Civil Engineering', 'Structural Design', 'Building Systems'],
      industry: 'Engineering',
      experience_years: 20,
      availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      certifications: ['PE License', 'LEED Accredited Professional'],
      session_format_preference: 'Hybrid',
      rating: 4.89,
      match_score: 0.91
    }
  ],
  'Engineering-Midwest': [
    {
      id: 'mentor-074',
      name: 'Diane Rodriguez',
      expertise: ['Electrical Engineering', 'Power Systems', 'Electronics'],
      industry: 'Engineering',
      experience_years: 13,
      availability: ['Monday', 'Wednesday', 'Friday'],
      certifications: ['PE License', 'Power Systems Specialist'],
      session_format_preference: 'In Person',
      rating: 4.82,
      match_score: 0.88
    }
  ],

  // BUSINESS MENTORS
  'Business-Northeast': [
    {
      id: 'mentor-075',
      name: 'David Goldman',
      expertise: ['Entrepreneurship', 'Startup Strategy', 'Venture Capital'],
      industry: 'Finance',
      experience_years: 18,
      availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      certifications: ['MBA', 'Venture Capital Certified'],
      session_format_preference: 'Virtual',
      rating: 4.88,
      match_score: 0.91
    }
  ],
  'Business-Ontario': [
    {
      id: 'mentor-005',
      name: 'Rebecca Williams',
      expertise: ['Business Strategy', 'Entrepreneurship', 'Financial Management'],
      industry: 'Finance',
      experience_years: 16,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      certifications: ['MBA', 'CFA Charterholder', 'Business Certification'],
      session_format_preference: 'Virtual',
      rating: 4.87,
      match_score: 0.93
    },
    {
      id: 'mentor-076',
      name: 'Marcus Thompson',
      expertise: ['Operations Management', 'Supply Chain', 'Lean Six Sigma'],
      industry: 'Operations',
      experience_years: 12,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      certifications: ['MBA', 'Six Sigma Black Belt', 'Lean Certification'],
      session_format_preference: 'Hybrid',
      rating: 4.84,
      match_score: 0.89
    }
  ],
  'Business-Southeast': [
    {
      id: 'mentor-077',
      name: 'Natalie Chen',
      expertise: ['Marketing', 'Digital Strategy', 'Brand Development'],
      industry: 'Marketing',
      experience_years: 10,
      availability: ['Tuesday', 'Thursday', 'Friday', 'Saturday'],
      certifications: ['MBA', 'Digital Marketing Certified', 'Brand Manager'],
      session_format_preference: 'Virtual',
      rating: 4.83,
      match_score: 0.88
    }
  ],

  // HEALTHCARE MENTORS
  'Healthcare-Northeast': [
    {
      id: 'mentor-078',
      name: 'Dr. Margaret Sullivan',
      expertise: ['Nursing', 'Patient Care', 'Healthcare Administration'],
      industry: 'Healthcare',
      experience_years: 19,
      availability: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
      certifications: ['RN License', 'Healthcare Administrator', 'Nurse Practitioner'],
      session_format_preference: 'In Person',
      rating: 4.92,
      match_score: 0.92
    },
    {
      id: 'mentor-079',
      name: 'Dr. James Mitchell',
      expertise: ['Dentistry', 'Oral Health', 'Dental Technology'],
      industry: 'Healthcare',
      experience_years: 15,
      availability: ['Monday', 'Wednesday', 'Friday'],
      certifications: ['DDS License', 'Dental Specialist'],
      session_format_preference: 'In Person',
      rating: 4.86,
      match_score: 0.90
    }
  ],
  'Healthcare-West': [
    {
      id: 'mentor-080',
      name: 'Dr. Victoria Lopez',
      expertise: ['Physical Therapy', 'Sports Medicine', 'Rehabilitation'],
      industry: 'Healthcare',
      experience_years: 11,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      certifications: ['DPT License', 'Sports Medicine Specialist'],
      session_format_preference: 'Hybrid',
      rating: 4.85,
      match_score: 0.89
    }
  ],

  // ARTS MENTORS
  'Arts-Northeast': [
    {
      id: 'mentor-081',
      name: 'Isabella Marconi',
      expertise: ['Visual Arts', 'Graphic Design', 'Digital Art'],
      industry: 'Creative',
      experience_years: 10,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      certifications: ['Fine Arts BFA', 'Graphic Design Specialist'],
      session_format_preference: 'Hybrid',
      rating: 4.84,
      match_score: 0.88
    },
    {
      id: 'mentor-082',
      name: 'Marcus Green',
      expertise: ['Music Performance', 'Music Theory', 'Composition'],
      industry: 'Entertainment',
      experience_years: 13,
      availability: ['Tuesday', 'Thursday', 'Friday', 'Sunday'],
      certifications: ['Music Performance Degree', 'Composer Certification'],
      session_format_preference: 'In Person',
      rating: 4.88,
      match_score: 0.89
    }
  ],
  'Arts-West': [
    {
      id: 'mentor-083',
      name: 'Dr. Alexa Rodriguez',
      expertise: ['Creative Writing', 'Literature', 'Storytelling'],
      industry: 'Entertainment',
      experience_years: 14,
      availability: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
      certifications: ['MFA Creative Writing', 'Published Author'],
      session_format_preference: 'Virtual',
      rating: 4.89,
      match_score: 0.90
    }
  ],

  // ENVIRONMENTAL SCIENCE MENTORS
  'Environmental-Science-West': [
    {
      id: 'mentor-084',
      name: 'Dr. Nathan Reeves',
      expertise: ['Climate Science', 'Environmental Policy', 'Sustainability'],
      industry: 'Environmental Science',
      experience_years: 17,
      availability: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      certifications: ['Environmental Science PhD', 'Climate Policy Expert'],
      session_format_preference: 'Virtual',
      rating: 4.90,
      match_score: 0.91
    }
  ],
  'Environmental-Science-British-Columbia': [
    {
      id: 'mentor-085',
      name: 'Dr. Elena Petrova',
      expertise: ['Water Resources', 'Environmental Engineering', 'Aquatic Science'],
      industry: 'Environmental Science',
      experience_years: 16,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      certifications: ['Environmental Engineering PhD', 'Water Resource Manager'],
      session_format_preference: 'Hybrid',
      rating: 4.87,
      match_score: 0.90
    }
  ],

  // SOCIAL STUDIES MENTORS
  'Social-Studies-Northeast': [
    {
      id: 'mentor-086',
      name: 'Dr. Charles Whitmore',
      expertise: ['History', 'American Government', 'Civic Education'],
      industry: 'Education',
      experience_years: 18,
      availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      certifications: ['History PhD', 'AP History Teacher'],
      session_format_preference: 'Virtual',
      rating: 4.89,
      match_score: 0.90
    },
    {
      id: 'mentor-087',
      name: 'Dr. Amara Okonkwo',
      expertise: ['Political Science', 'International Relations', 'Law'],
      industry: 'Law',
      experience_years: 14,
      availability: ['Tuesday', 'Thursday', 'Friday'],
      certifications: ['Political Science PhD', 'Legal Studies Certified'],
      session_format_preference: 'Virtual',
      rating: 4.86,
      match_score: 0.89
    }
  ],
  'Social-Studies-Alberta': [
    {
      id: 'mentor-088',
      name: 'Dr. Catherine Walker',
      expertise: ['Sociology', 'Anthropology', 'Social Theory'],
      industry: 'Education',
      experience_years: 12,
      availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      certifications: ['Sociology PhD', 'Anthropology Specialist'],
      session_format_preference: 'Hybrid',
      rating: 4.85,
      match_score: 0.88
    }
  ],

  // QUEBEC MENTORS
  'Technology-Quebec': [
    {
      id: 'mentor-089',
      name: 'Pierre Beaumont',
      expertise: ['Software Development', 'Game Development', 'Virtual Reality'],
      industry: 'Technology',
      experience_years: 11,
      availability: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      certifications: ['Game Development Specialist', 'VR Developer'],
      session_format_preference: 'Virtual',
      rating: 4.85,
      match_score: 0.89
    }
  ],
  'Business-Quebec': [
    {
      id: 'mentor-090',
      name: 'Sophie Laurent',
      expertise: ['International Business', 'Supply Chain Management', 'Global Trade'],
      industry: 'International Business',
      experience_years: 15,
      availability: ['Tuesday', 'Thursday', 'Saturday'],
      certifications: ['MBA International', 'Trade Specialist'],
      session_format_preference: 'Hybrid',
      rating: 4.84,
      match_score: 0.88
    }
  ]
};

export async function mentorMatch(input: MentorMatchInput): Promise<MentorMatchOutput> {
  // Build a key for database lookup
  const dbKey = `${input.subject_area}-${input.location}`;

  // Get mentors from database, with fallback
  const baseMentors: MentorProfile[] = MENTOR_DATABASE[dbKey] ||
    MENTOR_DATABASE['Technology-Northeast'] || [];

  // Filter and rank mentors based on criteria
  const rankedMentors = baseMentors
    .map(mentor => ({
      ...mentor,
      match_score: calculateMatchScore(mentor, input)
    }))
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, 5);

  // Generate curriculum alignment insights
  const alignmentText = generateCurriculumAlignment(input);

  // Determine session format recommendations
  const formatRecs = determineSessionFormats(input, rankedMentors);

  // Compile expertise profiles
  const profiles = rankedMentors.map(m =>
    `${m.name} (${m.industry}): ${m.expertise.join(', ')}`
  );

  return {
    matched_mentors: rankedMentors,
    total_matches: rankedMentors.length,
    curriculum_alignment: alignmentText,
    session_format_recommendations: formatRecs,
    expertise_profiles: profiles,
    next_steps: [
      `Review ${rankedMentors.length} matched mentor profiles`,
      'Schedule initial consultation with top mentor',
      'Establish session frequency and format',
      'Create session plan aligned with curriculum',
      'Set measurable learning objectives'
    ]
  };
}

function calculateMatchScore(mentor: MentorProfile, input: MentorMatchInput): number {
  let score = 0.0;

  // 1. SUBJECT RELEVANCE SCORING (max 0.35)
  const subjectRelevanceScore = calculateSubjectRelevance(mentor.expertise, input.subject_area);
  score += subjectRelevanceScore * 0.35;

  // 2. EXPERIENCE LEVEL & GRADE APPROPRIATENESS (max 0.25)
  const gradeNumber = parseInt(input.grade_level) || 6;
  const experienceScore = calculateExperienceGradeMatch(mentor.experience_years, gradeNumber);
  score += experienceScore * 0.25;

  // 3. SESSION FORMAT AVAILABILITY MATCH (max 0.20)
  const formatScore = calculateFormatMatch(mentor.session_format_preference, input.session_type);
  score += formatScore * 0.20;

  // 4. RATING FACTOR (max 0.10)
  const ratingNormalized = Math.min(mentor.rating / 5.0, 1.0);
  score += ratingNormalized * 0.10;

  // 5. AVAILABILITY DIVERSITY BONUS (max 0.10)
  const availabilityScore = Math.min(mentor.availability.length / 7, 1.0);
  score += availabilityScore * 0.10;

  return Math.min(score, 1.0);
}

function calculateSubjectRelevance(mentorExpertise: string[], studentSubject: string): number {
  const lowerSubject = studentSubject.toLowerCase();

  // Exact match gets highest score
  if (mentorExpertise.some(e => e.toLowerCase() === lowerSubject)) {
    return 1.0;
  }

  // Partial/contains match
  const partialMatches = mentorExpertise.filter(e =>
    e.toLowerCase().includes(lowerSubject) ||
    lowerSubject.includes(e.toLowerCase())
  );

  if (partialMatches.length > 0) {
    return 0.8;
  }

  // Related field check (broader categorization)
  const subjectCategories: Record<string, string[]> = {
    'Technology': ['Computer Science', 'Software', 'Programming', 'Coding', 'AI', 'Machine Learning', 'Web Development'],
    'Science': ['Biology', 'Chemistry', 'Physics', 'Environmental', 'Ecology', 'Marine Science'],
    'Mathematics': ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry'],
    'Engineering': ['Mechanical', 'Civil', 'Electrical', 'Software Engineering', 'CAD'],
    'Business': ['Entrepreneurship', 'Finance', 'Marketing', 'Operations', 'Supply Chain'],
    'Healthcare': ['Medicine', 'Nursing', 'Dentistry', 'Physical Therapy', 'Public Health'],
    'Arts': ['Visual Arts', 'Music', 'Creative Writing', 'Design', 'Graphic Design'],
    'Social Studies': ['History', 'Government', 'Political Science', 'Sociology', 'Law']
  };

  for (const [category, keywords] of Object.entries(subjectCategories)) {
    const categoryMatch = keywords.some(k => k.toLowerCase().includes(lowerSubject) || lowerSubject.includes(k.toLowerCase()));
    const expertiseInCategory = mentorExpertise.some(e =>
      keywords.some(k => e.toLowerCase().includes(k.toLowerCase()))
    );

    if (categoryMatch && expertiseInCategory) {
      return 0.6;
    }
  }

  // No match - but mentor expertise is broad
  if (mentorExpertise.length >= 3) {
    return 0.3;
  }

  return 0.0;
}

function calculateExperienceGradeMatch(experienceYears: number, gradeLevel: number): number {
  // High school students benefit from more experienced mentors
  if (gradeLevel >= 9) {
    return Math.min(experienceYears / 20, 1.0);
  }
  // Middle school: moderate experience is fine
  else if (gradeLevel >= 6) {
    return Math.min((experienceYears * 0.9) / 20, 1.0);
  }
  // Elementary: even newer mentors can be effective
  else {
    return Math.min((experienceYears * 0.7) / 20, 1.0);
  }
}

function calculateFormatMatch(mentorFormat: string, studentFormat: string): number {
  const mentorLower = mentorFormat.toLowerCase();
  const studentLower = studentFormat.toLowerCase();

  // Exact match
  if (mentorLower === studentLower) {
    return 1.0;
  }

  // Hybrid matches with anything
  if (mentorLower === 'hybrid') {
    return 0.95;
  }

  // No match
  return 0.3;
}

function generateCurriculumAlignment(input: MentorMatchInput): string {
  const subjectMap: Record<string, string[]> = {
    'Technology': ['Digital literacy', 'Coding fundamentals', 'Tech career pathways', 'Cybersecurity awareness'],
    'Science': ['Inquiry-based learning', 'Scientific method', 'Lab experience', 'Real-world research applications'],
    'Mathematics': ['STEM standards', 'Problem-solving skills', 'Quantitative reasoning', 'Applied mathematics'],
    'Engineering': ['Design thinking', 'Project-based learning', 'Hands-on application', 'STEM integration'],
    'Business': ['Entrepreneurship', 'Financial literacy', 'Real-world case studies', 'Leadership development'],
    'Computer Science': ['Algorithm thinking', 'Data structures', 'Programming paradigms', 'Software development lifecycle'],
    'Environmental Science': ['Sustainability', 'Systems thinking', 'Environmental stewardship', 'Climate action'],
    'Healthcare': ['Medical careers', 'Health sciences', 'Patient care ethics', 'Professional healthcare practices'],
    'Arts': ['Creative expression', 'Design principles', 'Portfolio development', 'Industry-standard tools'],
    'Social Studies': ['Civic engagement', 'Historical analysis', 'Global perspectives', 'Critical thinking']
  };

  const alignments = subjectMap[input.subject_area] || ['Real-world industry connection', 'Career exploration'];
  const gradeContext = getGradeContext(input.grade_level);

  return `This mentoring program aligns with K-12 standards for ${input.subject_area} (${gradeContext}) by emphasizing: ${alignments.join(', ')}. Mentors will provide authentic industry context to deepen student understanding of content and career applications.`;
}

function getGradeContext(gradeLevel: string): string {
  const gradeNum = parseInt(gradeLevel);
  if (gradeNum < 6) return 'Elementary School';
  if (gradeNum < 9) return 'Middle School';
  if (gradeNum < 12) return 'Early High School';
  return 'Advanced High School';
}

function determineSessionFormats(input: MentorMatchInput, mentors: MentorProfile[]): string[] {
  const recommendations: string[] = [];

  if (input.session_type === 'virtual') {
    recommendations.push('Use video conferencing platform (Zoom/Teams)');
    recommendations.push('Share screen for demonstrations and examples');
    recommendations.push('Prepare digital resources and handouts');
  } else if (input.session_type === 'in_person') {
    recommendations.push('Arrange field visit to mentor\'s workplace');
    recommendations.push('Plan hands-on activities and demonstrations');
    recommendations.push('Coordinate transportation if necessary');
  } else {
    recommendations.push('Combine virtual and in-person sessions');
    recommendations.push('Use virtual for regular check-ins and discussions');
    recommendations.push('Schedule quarterly in-person workplace visits');
  }

  // Add mentor-specific recommendations
  if (mentors.length > 0 && mentors[0].session_format_preference) {
    recommendations.push(`Top mentor prefers ${mentors[0].session_format_preference} format`);
  }

  return recommendations;
}
