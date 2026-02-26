/**
 * program-design.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  ProgramDesignInput,
  ProgramDesignOutput,
  ProgramPhase
} from '../types';

export async function programDesign(input: ProgramDesignInput): Promise<ProgramDesignOutput> {
  // Determine program structure based on inputs
  const phases = generateProgramPhases(input);
  const mentorPlan = generateMentorRecruitmentPlan(input);
  const schedule = generateSchedule(input);
  const assessmentFramework = generateAssessmentFramework(input);
  const budgetBreakdown = generateBudgetBreakdown(input);
  const successMetrics = generateSuccessMetrics(input);

  return {
    program_structure: {
      total_sessions: calculateTotalSessions(input),
      frequency: determineSessionFrequency(input),
      phases: phases
    },
    mentor_recruitment_plan: {
      target_count: calculateMentorCount(input),
      recruitment_channels: getRecruitmentChannels(input),
      training_requirements: getMentorTrainingRequirements()
    },
    schedule: schedule,
    assessment_framework: assessmentFramework,
    budget_breakdown: budgetBreakdown,
    success_metrics: successMetrics
  };
}

function generateProgramPhases(input: ProgramDesignInput): ProgramPhase[] {
  const phases: ProgramPhase[] = [];
  const durationMonths = input.duration === 'semester' ? 4 : input.duration === 'year' ? 9 : 18;

  // Phase 1: Foundation
  phases.push({
    phase_number: 1,
    name: 'Foundation & Relationship Building',
    duration: `${Math.ceil(durationMonths * 0.2)} months`,
    objectives: [
      'Establish mentor-student relationships',
      'Assess baseline knowledge and interests',
      'Align expectations and communication style'
    ],
    activities: [
      'Mentor-student matching process',
      'Welcome orientation for all participants',
      'Goal-setting conversations',
      'Classroom introduction of mentors'
    ]
  });

  // Phase 2: Active Engagement
  phases.push({
    phase_number: 2,
    name: 'Active Mentoring Engagement',
    duration: `${Math.ceil(durationMonths * 0.6)} months`,
    objectives: [
      'Deliver substantive mentoring aligned with curriculum',
      'Build professional skills and knowledge',
      'Deepen career exploration and awareness'
    ],
    activities: input.focus_areas.map(area => `${area} mentoring sessions`),
    // Add generic activities
    // activities: [
    //   'Regular mentoring sessions (bi-weekly or monthly)',
    //   'Real-world project work aligned with curriculum',
    //   'Career exploration activities',
    //   'Professional development workshops'
    // ]
  });

  // Phase 3: Synthesis & Application
  phases.push({
    phase_number: 3,
    name: 'Synthesis, Application & Reflection',
    duration: `${Math.ceil(durationMonths * 0.2)} months`,
    objectives: [
      'Apply learning to independent projects',
      'Document and reflect on growth',
      'Plan next steps and continued learning'
    ],
    activities: [
      'Capstone projects or presentations',
      'Student reflection portfolios',
      'Career action planning',
      'Program celebration and stakeholder presentations'
    ]
  });

  return phases;
}

function generateMentorRecruitmentPlan(input: ProgramDesignInput): {
  target_count: number;
  recruitment_channels: string[];
  training_requirements: string[];
} {
  return {
    target_count: calculateMentorCount(input),
    recruitment_channels: getRecruitmentChannels(input),
    training_requirements: getMentorTrainingRequirements()
  };
}

function calculateMentorCount(input: ProgramDesignInput): number {
  // Ratio: 1 mentor per 8-12 students for elementary, 1 per 12-15 for secondary
  const studentRatio = input.school_type.includes('Elementary') ? 10 : 12;
  return Math.ceil(input.student_population * 0.3 / studentRatio); // 30% participation
}

function getRecruitmentChannels(input: ProgramDesignInput): string[] {
  const channels = [
    'Digital Human Library mentor network',
    'Local chamber of commerce and business associations',
    'Professional organizations in target industries',
    'Alumni network and parent community',
    'University partnerships and graduate programs',
    'Corporate partnerships and employee volunteer programs',
    'Online mentor platforms and databases',
    'Industry-specific conferences and events'
  ];

  // Remove channels not appropriate for school type
  if (input.school_type.includes('Virtual')) {
    // Virtual schools benefit from all channels equally
  }

  return channels;
}

function getMentorTrainingRequirements(): string[] {
  return [
    'Overview of K-12 education system and standards',
    'Effective mentoring practices and communication',
    'Youth development and appropriate expectations',
    'Diversity, equity, and cultural competence',
    'Technology tools for virtual mentoring (if applicable)',
    'Session planning and curriculum alignment',
    'Assessment and feedback techniques',
    'Mandatory reporting and child safety protocols'
  ];
}

function calculateTotalSessions(input: ProgramDesignInput): number {
  const monthCount = input.duration === 'semester' ? 4 : input.duration === 'year' ? 9 : 18;
  const sessionsPerMonth = 2; // Default: bi-monthly
  return Math.ceil(monthCount * sessionsPerMonth);
}

function determineSessionFrequency(input: ProgramDesignInput): string {
  if (input.duration === 'semester') {
    return 'Bi-weekly (once every 2 weeks)';
  } else if (input.duration === 'year') {
    return 'Bi-weekly or monthly depending on focus area';
  } else {
    return 'Monthly with intensive quarterly sessions';
  }
}

function generateSchedule(input: ProgramDesignInput): string {
  const startPhrase = input.duration === 'semester'
    ? 'Fall or Spring semester'
    : input.duration === 'year'
      ? 'Academic school year (September - June)'
      : 'Multi-year rolling program (can start any semester)';

  const meetingFormat = input.school_type.includes('Virtual')
    ? 'Virtual mentoring sessions via video conferencing'
    : 'Mix of virtual check-ins and in-person quarterly meetings';

  return `
Program Timeline: ${startPhrase}
Meeting Format: ${meetingFormat}
Session Duration: 45-60 minutes per session
Participant Meeting Times: Scheduled around school day (before/after school or during enrichment blocks)
Mentor Availability: Flexible scheduling to accommodate working professionals
Key Milestones:
  - Month 1: Mentor recruitment and matching
  - Month 2-3: Relationship building and orientation
  - Month 4-8: Active mentoring and project work
  - Month 9: Synthesis, reflection, and celebration
  `;
}

function generateAssessmentFramework(input: ProgramDesignInput): Record<string, string> {
  return {
    'Student Engagement': 'Track attendance, participation quality, and interaction depth using mentor feedback forms',
    'Learning Outcomes': 'Pre/post assessments aligned with curriculum standards for focus areas',
    'Career Awareness': 'Career exploration surveys measuring knowledge and interest in target industries',
    'Professional Skills': 'Self-assessment and mentor evaluation of communication, collaboration, and problem-solving',
    'Academic Impact': 'Monitor related course grades, test scores, and academic engagement',
    'Mentor Effectiveness': 'Student and teacher feedback surveys on mentor quality and program delivery',
    'Student Satisfaction': 'Post-program surveys on perceived value, relationship quality, and future engagement',
    'Program Fidelity': 'Monitor adherence to planned curriculum and session structure'
  };
}

function generateBudgetBreakdown(input: ProgramDesignInput): Record<string, number> {
  const basePerStudent = 300; // $300 per student per year
  const estimatedParticipants = Math.floor(input.student_population * 0.3);
  const totalBudget = estimatedParticipants * basePerStudent;

  // Scale based on provided budget
  const scaleFactor = input.budget / totalBudget;

  return {
    'Mentor Stipends/Honoraria': Math.round(totalBudget * 0.35 * scaleFactor),
    'Mentor Training & Support': Math.round(totalBudget * 0.15 * scaleFactor),
    'Program Coordination Staff': Math.round(totalBudget * 0.25 * scaleFactor),
    'Technology & Tools': Math.round(totalBudget * 0.10 * scaleFactor),
    'Student Materials & Resources': Math.round(totalBudget * 0.08 * scaleFactor),
    'Evaluation & Assessment': Math.round(totalBudget * 0.04 * scaleFactor),
    'Professional Development': Math.round(totalBudget * 0.03 * scaleFactor)
  };
}

function generateSuccessMetrics(input: ProgramDesignInput): string[] {
  const metrics: string[] = [
    '90%+ mentor-student session attendance rate',
    '80%+ student report increased career awareness',
    '75%+ student report increased confidence in subject area',
    '85%+ teacher report positive student engagement changes',
    '4.0+/5.0 average satisfaction scores from students',
    '4.3+/5.0 average satisfaction scores from teachers',
    '4.5+/5.0 average satisfaction scores from mentors',
    'Measurable improvement in subject-specific assessment scores',
    '100% mentor retention rate or planned recruitment',
    'Successful student presentation or portfolio completion'
  ];

  // Add grade-specific metrics
  if (input.school_type.includes('High')) {
    metrics.push('Increased enrollment in advanced courses in focus areas');
    metrics.push('Improved college/career readiness indicators');
  }

  return metrics;
}
