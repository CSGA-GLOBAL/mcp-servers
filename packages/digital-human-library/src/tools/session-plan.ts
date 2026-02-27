/**
 * session-plan.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T05:59:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */


import {
  SessionPlanInput,
  SessionPlanOutput,
  SessionActivity
} from '../types';

// Activity templates by expertise area
const ACTIVITY_TEMPLATES: Record<string, SessionActivity[]> = {
  'Technology': [
    {
      time_minutes: 5,
      activity: 'Icebreaker & Tech Setup',
      description: 'Introduction, technology check, set expectations',
      materials_needed: ['Computer', 'Video conferencing software', 'Screen share capability']
    },
    {
      time_minutes: 15,
      activity: 'Industry Landscape Overview',
      description: 'Mentor shares trends, career paths, day-in-the-life insights',
      materials_needed: ['Presentation slides', 'Industry reports', 'Career resources']
    },
    {
      time_minutes: 20,
      activity: 'Hands-On Coding/Tech Project',
      description: 'Students work on problem with mentor guidance',
      materials_needed: ['Code editor', 'Sample project files', 'IDE setup']
    },
    {
      time_minutes: 15,
      activity: 'Troubleshooting & Real-World Scenarios',
      description: 'Mentor guides through common problems and solutions',
      materials_needed: ['Sample code with bugs', 'Debugging tools', 'Documentation']
    },
    {
      time_minutes: 5,
      activity: 'Reflection & Next Steps',
      description: 'Summarize learning, set follow-up tasks',
      materials_needed: ['Reflection worksheet', 'Assignment outline']
    }
  ],
  'Science': [
    {
      time_minutes: 5,
      activity: 'Welcome & Learning Objectives Review',
      description: 'Mentor explains session goals and scientific question',
      materials_needed: ['Whiteboard', 'Learning objective sheet']
    },
    {
      time_minutes: 10,
      activity: 'Scientific Context & Career Connection',
      description: 'Explain how topic connects to real science careers',
      materials_needed: ['Career profiles', 'Research articles', 'Photos/videos']
    },
    {
      time_minutes: 20,
      activity: 'Hands-On Experiment or Investigation',
      description: 'Students conduct experiment with mentor supervision',
      materials_needed: ['Lab equipment', 'Safety materials', 'Data collection sheets']
    },
    {
      time_minutes: 15,
      activity: 'Data Analysis & Discussion',
      description: 'Analyze results and discuss implications',
      materials_needed: ['Graphing tools', 'Analysis templates', 'Discussion prompts']
    },
    {
      time_minutes: 10,
      activity: 'Synthesis & Future Exploration',
      description: 'Connect findings to bigger questions and next steps',
      materials_needed: ['Extension activities', 'Resource list']
    }
  ],
  'Engineering': [
    {
      time_minutes: 5,
      activity: 'Design Challenge Introduction',
      description: 'Present problem, constraints, and design brief',
      materials_needed: ['Design brief document', 'Constraint list', 'Example solutions']
    },
    {
      time_minutes: 15,
      activity: 'Design Thinking Process Overview',
      description: 'Walk through empathize, define, ideate, prototype, test',
      materials_needed: ['Process diagram', 'Case study examples']
    },
    {
      time_minutes: 20,
      activity: 'Brainstorm & Sketch Solutions',
      description: 'Students develop design concepts with mentor feedback',
      materials_needed: ['Sketch paper', 'Markers', 'Measurement tools', 'Reference materials']
    },
    {
      time_minutes: 15,
      activity: 'Build & Test Prototype',
      description: 'Construct working prototype and test against criteria',
      materials_needed: ['Building materials', 'Testing equipment', 'Documentation sheets']
    },
    {
      time_minutes: 5,
      activity: 'Iteration Planning',
      description: 'Identify improvements and plan next iteration',
      materials_needed: ['Feedback form', 'Improvement worksheet']
    }
  ],
  'Business': [
    {
      time_minutes: 5,
      activity: 'Business Challenge Setup',
      description: 'Present business scenario, market, and objectives',
      materials_needed: ['Business case', 'Market data', 'Financial scenarios']
    },
    {
      time_minutes: 15,
      activity: 'Industry & Market Analysis',
      description: 'Examine market trends, competition, opportunities',
      materials_needed: ['Market reports', 'Competitive analysis template', 'Data sheets']
    },
    {
      time_minutes: 20,
      activity: 'Strategic Planning Session',
      description: 'Develop business strategy with mentor guidance',
      materials_needed: ['Strategy template', 'Financial models', 'Planning tools']
    },
    {
      time_minutes: 15,
      activity: 'Pitch Development & Feedback',
      description: 'Create elevator pitch and receive mentor feedback',
      materials_needed: ['Pitch template', 'Presentation tools', 'Feedback rubric']
    },
    {
      time_minutes: 5,
      activity: 'Action Items & Resources',
      description: 'Finalize next steps and provide resources',
      materials_needed: ['Resource list', 'Next steps checklist']
    }
  ],
  'Environmental': [
    {
      time_minutes: 5,
      activity: 'Environmental Issue Introduction',
      description: 'Present sustainability challenge and context',
      materials_needed: ['Issue overview', 'Documentary clip', 'Case study']
    },
    {
      time_minutes: 10,
      activity: 'Real-World Impact Stories',
      description: 'Share mentor experiences in environmental careers',
      materials_needed: ['Career stories', 'Project portfolio', 'Impact metrics']
    },
    {
      time_minutes: 20,
      activity: 'Data Collection & Analysis',
      description: 'Gather environmental data and analyze trends',
      materials_needed: ['Monitoring equipment', 'Data sheets', 'Analysis software']
    },
    {
      time_minutes: 15,
      activity: 'Solution Development',
      description: 'Develop sustainable solutions with mentor coaching',
      materials_needed: ['Solution template', 'Resource guides', 'Implementation plans']
    },
    {
      time_minutes: 10,
      activity: 'Presentation & Advocacy',
      description: 'Present findings and develop advocacy strategy',
      materials_needed: ['Presentation template', 'Advocacy toolkit']
    }
  ]
};

// Discussion prompts by grade level
const DISCUSSION_PROMPTS: Record<string, string[]> = {
  'K': [
    'What does your mentor do at work?',
    'What tools and machines do you see in this industry?',
    'How does this job help people?'
  ],
  '6': [
    'Why is this career important to society?',
    'What skills are most important in this field?',
    'How has this industry changed with technology?',
    'What challenges do professionals face in this field?'
  ],
  '9': [
    'What educational pathway leads to this career?',
    'How does this field address global challenges?',
    'What soft skills are critical for success?',
    'What emerging trends are shaping this industry?',
    'How do different roles contribute to organizational success?'
  ],
  '12': [
    'What ethical considerations impact decision-making in this field?',
    'How can I develop a personal brand in this industry?',
    'What entrepreneurial opportunities exist?',
    'How is this career field evolving with AI and automation?',
    'What continuous learning is required in this profession?',
    'How can I balance career ambitions with personal values?'
  ]
};

export async function sessionPlan(input: SessionPlanInput): Promise<SessionPlanOutput> {
  // Get base activities for this expertise area
  const baseActivities = ACTIVITY_TEMPLATES[input.mentor_expertise] ||
    ACTIVITY_TEMPLATES['Technology'];

  // Scale activities to fit session duration
  const scaledActivities = scaleActivitiesToDuration(baseActivities, input.duration);

  // Get discussion prompts appropriate to grade level
  const prompts = getDiscussionPrompts(input.student_grade);

  // Extract hands-on activities
  const handson = scaledActivities
    .filter(a => a.activity.toLowerCase().includes('hands-on') ||
                  a.activity.toLowerCase().includes('experiment') ||
                  a.activity.toLowerCase().includes('project') ||
                  a.activity.toLowerCase().includes('build') ||
                  a.activity.toLowerCase().includes('brainstorm'))
    .map(a => a.activity);

  // Generate reflection questions
  const reflectionQs = generateReflectionQuestions(input.student_grade, input.topic);

  // Generate follow-up assignments
  const followups = generateFollowUpAssignments(input);

  // Determine tech requirements
  const techReqs = determineTechRequirements(input);

  return {
    session_outline: scaledActivities,
    discussion_prompts: prompts,
    hands_on_activities: handson.length > 0 ? handson : ['Primary hands-on activity aligned with learning objectives'],
    reflection_questions: reflectionQs,
    follow_up_assignments: followups,
    tech_requirements: techReqs,
    estimated_time: input.duration
  };
}

function scaleActivitiesToDuration(activities: SessionActivity[], duration: number): SessionActivity[] {
  const totalBaseTime = activities.reduce((sum, a) => sum + a.time_minutes, 0);
  const scaleFactor = duration / totalBaseTime;

  return activities.map(activity => ({
    ...activity,
    time_minutes: Math.round(activity.time_minutes * scaleFactor)
  }));
}

function getDiscussionPrompts(gradeLevel: string): string[] {
  const gradeNum = parseInt(gradeLevel);

  if (gradeNum <= 2) {
    return DISCUSSION_PROMPTS['K'];
  } else if (gradeNum <= 5) {
    return [
      'What does this person do at their job?',
      'What tools do they use?',
      'Why is this job important?',
      'How did you become interested in this field?',
      'What is the most fun part of your work?'
    ];
  } else if (gradeNum <= 8) {
    return DISCUSSION_PROMPTS['6'];
  } else {
    return DISCUSSION_PROMPTS['12'];
  }
}

function generateReflectionQuestions(gradeLevel: string, topic: string): string[] {
  const gradeNum = parseInt(gradeLevel);
  const baseQuestions = [
    `What surprised you most about ${topic}?`,
    'How does this connect to what you learned in class?',
    'What do you want to learn more about?'
  ];

  if (gradeNum >= 6) {
    baseQuestions.push(`How does your understanding of ${topic} affect your career thinking?`);
  }

  if (gradeNum >= 9) {
    baseQuestions.push(`What skills did you use or learn during this mentoring session?`);
    baseQuestions.push(`How might you apply these insights in your future education or career?`);
  }

  return baseQuestions;
}

function generateFollowUpAssignments(input: SessionPlanInput): string[] {
  const gradeNum = parseInt(input.student_grade);
  const assignments: string[] = [];

  if (gradeNum <= 5) {
    assignments.push(`Create a poster or drawing about what you learned from ${input.topic}`);
    assignments.push('Write 3-5 sentences about your favorite part of the session');
  } else if (gradeNum <= 8) {
    assignments.push(`Write a 1-2 page reflection on career insights from mentoring`);
    assignments.push(`Research one company working in ${input.topic} and share findings`);
    assignments.push('Develop 3 questions you would ask the mentor in next session');
  } else {
    assignments.push(`Complete a skills inventory based on mentor feedback`);
    assignments.push(`Research educational pathway for careers in ${input.topic}`);
    assignments.push(`Develop personal action plan for continued learning`);
    assignments.push(`Create portfolio piece showcasing learning from mentoring`);
  }

  return assignments;
}

function determineTechRequirements(input: SessionPlanInput): string[] {
  const baseReqs = ['Reliable internet connection', 'Video conferencing platform (Zoom/Teams)'];

  if (input.mentor_expertise === 'Technology' || input.mentor_expertise === 'Computer Science') {
    baseReqs.push('Code editor or IDE');
    baseReqs.push('GitHub or version control access');
    baseReqs.push('Sample project repository');
  } else if (input.mentor_expertise === 'Engineering') {
    baseReqs.push('CAD software or design tool (Tinkercad, Fusion 360)');
    baseReqs.push('Project files for design challenge');
  } else if (input.mentor_expertise === 'Business') {
    baseReqs.push('Spreadsheet software (Excel/Google Sheets)');
    baseReqs.push('Business simulation or financial modeling tool');
  } else if (input.mentor_expertise === 'Science') {
    baseReqs.push('Virtual lab simulation software');
    baseReqs.push('Data visualization tools');
  }

  if (input.group_size > 20) {
    baseReqs.push('Breakout room capability');
    baseReqs.push('Interactive whiteboard or collaborative tool');
  }

  return baseReqs;
}
