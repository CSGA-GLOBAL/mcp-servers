# Digital Human Library MCP Server - Usage Examples

This guide provides detailed examples of how to use each of the 6 tools in the Digital Human Library MCP Server.

## Table of Contents

1. [dhl_mentor_match](#dhl_mentor_match)
2. [dhl_curriculum_align](#dhl_curriculum_align)
3. [dhl_impact_report](#dhl_impact_report)
4. [dhl_session_plan](#dhl_session_plan)
5. [dhl_program_design](#dhl_program_design)
6. [dhl_career_explorer](#dhl_career_explorer)

---

## dhl_mentor_match

**Purpose:** Connect students/classes with qualified industry mentors based on specific criteria.

**Use Cases:**
- Find mentors for a specific classroom unit
- Match individual students with mentors
- Identify mentors for specialized topics or industries

### Example 1: Technology Mentor for Grade 9

**Scenario:** A grade 9 teacher wants to integrate computer science mentoring into their curriculum.

```json
{
  "grade_level": "9",
  "subject_area": "Computer Science",
  "learning_objectives": [
    "Understand software development careers",
    "Learn web development fundamentals",
    "Develop problem-solving skills"
  ],
  "location": "Ontario",
  "session_type": "virtual"
}
```

**Expected Output:**
```json
{
  "matched_mentors": [
    {
      "id": "mentor-001",
      "name": "Sarah Chen",
      "expertise": ["Computer Science", "Engineering", "Technology"],
      "industry": "Technology",
      "experience_years": 12,
      "availability": ["Monday", "Wednesday", "Saturday"],
      "certifications": ["AWS Solutions Architect", "Certified Scrum Master"],
      "session_format_preference": "Virtual",
      "rating": 4.9,
      "match_score": 0.95
    }
    // Additional mentors...
  ],
  "total_matches": 2,
  "curriculum_alignment": "This mentoring program aligns with K-12 standards for Computer Science by emphasizing: Algorithm thinking, Data structures, Programming paradigms...",
  "session_format_recommendations": [
    "Use video conferencing platform (Zoom/Teams)",
    "Share screen for code demonstrations",
    "Prepare digital resources and handouts"
  ],
  "expertise_profiles": [
    "Sarah Chen (Technology): Computer Science, Engineering, Technology"
  ],
  "next_steps": [
    "Review matched mentor profiles",
    "Schedule initial consultation with top mentor",
    "Establish session frequency and format",
    "Create session plan aligned with curriculum",
    "Set measurable learning objectives"
  ]
}
```

### Example 2: Environmental Science Mentor for Elementary

**Scenario:** Grade 5 teacher seeking field-based environmental mentoring.

```json
{
  "grade_level": "5",
  "subject_area": "Environmental",
  "learning_objectives": [
    "Understand local ecosystem",
    "Learn about conservation efforts",
    "Develop environmental stewardship"
  ],
  "location": "British Columbia",
  "session_type": "in_person"
}
```

---

## dhl_curriculum_align

**Purpose:** Align mentoring sessions with provincial/state curriculum standards and generate supporting materials.

**Use Cases:**
- Map mentoring activities to learning outcomes
- Create assessment rubrics
- Generate pre/post session activities
- Identify cross-curricular connections

### Example 1: Science Standards Alignment (Grade 6)

**Scenario:** Aligning an environmental mentoring session with Ontario Science Curriculum.

```json
{
  "province_or_state": "Ontario",
  "grade_level": "6",
  "subject": "Science",
  "learning_outcomes": [
    "Students will understand Earth systems and how they interact",
    "Students will identify human impacts on ecosystems",
    "Students will propose conservation solutions"
  ],
  "duration": 90
}
```

**Expected Output:**
```json
{
  "province_or_state": "Ontario",
  "subject": "Science",
  "aligned_standards": [
    {
      "standard_code": "OS.6.1",
      "description": "Understand Earth systems and how they interact",
      "grade_band": "6-8"
    },
    {
      "standard_code": "OS.6.2",
      "description": "Identify human impacts on ecosystems",
      "grade_band": "6-8"
    }
  ],
  "cross_curricular_connections": [
    "Mathematics (data analysis, measurement)",
    "Language Arts (scientific writing, presentations)",
    "Technology (simulations, digital tools)",
    "Social Studies (environmental policy, history of science)"
  ],
  "assessment_rubric": {
    "Scientific Inquiry": "Student develops clear hypothesis and tests with appropriate controls",
    "Data Analysis": "Student interprets data accurately and draws evidence-based conclusions",
    "Communication": "Student explains findings clearly using scientific terminology",
    "Collaboration": "Student contributes to team investigations and respects diverse perspectives"
  },
  "pre_session_activities": [
    "Complete pre-assessment to evaluate baseline understanding of Science",
    "Review key vocabulary and concepts relevant to mentoring topic",
    "Observe and record phenomena related to topic",
    "Formulate initial hypothesis about scientific question",
    "Write reflection on personal goals and learning objectives"
  ],
  "post_session_activities": [
    "Reflect on key learnings from Science mentoring session",
    "Conduct extended investigation based on mentor guidance",
    "Write lab report documenting findings and conclusions",
    "Document evidence of learning against stated objectives",
    "Share insights with peers or class"
  ]
}
```

### Example 2: Mathematics Standards (Grade 9)

**Scenario:** Aligning business/finance mentoring with math curriculum.

```json
{
  "province_or_state": "California",
  "grade_level": "9",
  "subject": "Mathematics",
  "learning_outcomes": [
    "Apply algebraic reasoning to real-world problems",
    "Understand exponential functions and growth",
    "Analyze financial data and trends"
  ],
  "duration": 60
}
```

---

## dhl_impact_report

**Purpose:** Measure and report on the effectiveness of mentoring programs using comprehensive metrics.

**Use Cases:**
- Evaluate program outcomes for stakeholders
- Demonstrate ROI to administrators and funders
- Identify areas for program improvement
- Track student progress over time

### Example 1: Semester Impact Report

**Scenario:** School administrator needs impact report for Fall semester mentoring program.

```json
{
  "school_id": "school-002",
  "date_range": {
    "start_date": "2024-09-01T00:00:00Z",
    "end_date": "2024-12-15T23:59:59Z"
  },
  "metrics_requested": "all"
}
```

**Expected Output:**
```json
{
  "school_id": "school-002",
  "report_period": "09/01/2024 - 12/15/2024",
  "student_engagement_metrics": [
    {
      "metric_name": "Session Attendance Rate",
      "baseline": 78,
      "current": 92,
      "improvement_percentage": 18,
      "status": "improving"
    },
    {
      "metric_name": "Student Participation Quality",
      "baseline": 65,
      "current": 84,
      "improvement_percentage": 29,
      "status": "improving"
    },
    {
      "metric_name": "Mentor-Student Rapport Score",
      "baseline": 72,
      "current": 89,
      "improvement_percentage": 24,
      "status": "improving"
    },
    {
      "metric_name": "Student Initiative & Questions",
      "baseline": 45,
      "current": 73,
      "improvement_percentage": 62,
      "status": "improving"
    },
    {
      "metric_name": "After-Program Engagement Index",
      "baseline": 68,
      "current": 85,
      "improvement_percentage": 25,
      "status": "improving"
    }
  ],
  "learning_outcome_improvements": [
    {
      "metric_name": "Academic Achievement (GPA)",
      "baseline": 3.2,
      "current": 3.5,
      "improvement_percentage": 9,
      "status": "improving"
    },
    {
      "metric_name": "Subject-Specific Test Scores",
      "baseline": 72,
      "current": 81,
      "improvement_percentage": 13,
      "status": "improving"
    },
    {
      "metric_name": "Career Clarity Index",
      "baseline": 34,
      "current": 71,
      "improvement_percentage": 109,
      "status": "improving"
    },
    {
      "metric_name": "STEM Interest & Enrollment",
      "baseline": 42,
      "current": 68,
      "improvement_percentage": 62,
      "status": "improving"
    },
    {
      "metric_name": "College/Career Readiness",
      "baseline": 58,
      "current": 79,
      "improvement_percentage": 36,
      "status": "improving"
    },
    {
      "metric_name": "Professional Skills Development",
      "baseline": 51,
      "current": 76,
      "improvement_percentage": 49,
      "status": "improving"
    }
  ],
  "teacher_satisfaction_score": 4.6,
  "mentor_effectiveness_score": 4.7,
  "program_roi": 280,
  "success_stories": [
    "Student M transitioned from 'undecided' to pursuing chemical engineering after mentoring...",
    "Student J struggled with mathematics until matched with finance mentor..."
  ],
  "recommendations": [
    "Continue current mentoring program with expanded capacity",
    "Increase session frequency to 2x per month for maximum impact",
    "Create specialized mentoring tracks by career interest",
    "Establish peer mentoring program with senior students",
    "Implement student feedback loop to continuously improve program"
  ]
}
```

### Example 2: Engagement-Only Report

**Scenario:** Quick check on engagement metrics mid-program.

```json
{
  "school_id": "school-001",
  "date_range": {
    "start_date": "2024-10-01T00:00:00Z",
    "end_date": "2024-10-31T23:59:59Z"
  },
  "metrics_requested": "engagement"
}
```

---

## dhl_session_plan

**Purpose:** Create structured, grade-appropriate mentoring session plans with activities and assessment.

**Use Cases:**
- Prepare mentors for upcoming sessions
- Ensure curriculum alignment in sessions
- Guide facilitators on session flow
- Provide students with clear expectations

### Example 1: Engineering Design Challenge (Grade 8)

**Scenario:** Mentor planning a 60-minute engineering design mentoring session for 25 students.

```json
{
  "mentor_expertise": "Engineering",
  "student_grade": "8",
  "topic": "Sustainable Building Design",
  "duration": 60,
  "group_size": 25
}
```

**Expected Output:**
```json
{
  "session_outline": [
    {
      "time_minutes": 3,
      "activity": "Design Challenge Introduction",
      "description": "Present problem, constraints, and design brief",
      "materials_needed": ["Design brief document", "Constraint list", "Example solutions"]
    },
    {
      "time_minutes": 9,
      "activity": "Design Thinking Process Overview",
      "description": "Walk through empathize, define, ideate, prototype, test",
      "materials_needed": ["Process diagram", "Case study examples"]
    },
    {
      "time_minutes": 12,
      "activity": "Brainstorm & Sketch Solutions",
      "description": "Students develop design concepts with mentor feedback",
      "materials_needed": ["Sketch paper", "Markers", "Measurement tools"]
    },
    {
      "time_minutes": 9,
      "activity": "Build & Test Prototype",
      "description": "Construct working prototype and test against criteria",
      "materials_needed": ["Building materials", "Testing equipment"]
    },
    {
      "time_minutes": 3,
      "activity": "Iteration Planning",
      "description": "Identify improvements and plan next iteration",
      "materials_needed": ["Feedback form", "Improvement worksheet"]
    }
  ],
  "discussion_prompts": [
    "Why is sustainable design important?",
    "What skills are most important in engineering?",
    "How has engineering changed with technology?",
    "What challenges do professionals face in this field?"
  ],
  "hands_on_activities": [
    "Brainstorm & Sketch Solutions",
    "Build & Test Prototype"
  ],
  "reflection_questions": [
    "What surprised you most about sustainable design?",
    "How does this connect to what you learned in class?",
    "What do you want to learn more about?",
    "What skills did you use or learn during this mentoring session?"
  ],
  "follow_up_assignments": [
    "Write a 1-2 page reflection on career insights from mentoring",
    "Research one company working in sustainable design and share findings",
    "Develop 3 questions you would ask the mentor in next session"
  ],
  "tech_requirements": [
    "CAD software or design tool (Tinkercad, Fusion 360)",
    "Project files for design challenge",
    "Breakout room capability",
    "Interactive whiteboard or collaborative tool"
  ],
  "estimated_time": 60
}
```

### Example 2: Career Exploration (Grade 6, Technology)

**Scenario:** Quick virtual session to explore tech careers.

```json
{
  "mentor_expertise": "Technology",
  "student_grade": "6",
  "topic": "Careers in Software Development",
  "duration": 45,
  "group_size": 15
}
```

---

## dhl_program_design

**Purpose:** Develop comprehensive mentoring programs for schools/districts from planning through implementation.

**Use Cases:**
- Design year-long programs for schools
- Plan multi-year initiatives for districts
- Develop curriculum-integrated mentoring
- Create district-wide mentoring infrastructure

### Example 1: High School Year-Long Program

**Scenario:** High school wants to design a year-long mentoring program for 1,200 students focusing on STEM.

```json
{
  "school_type": "High School",
  "student_population": 1200,
  "budget": 75000,
  "duration": "year",
  "focus_areas": ["Technology", "Engineering", "Entrepreneurship"],
  "goals": [
    "Increase STEM course enrollment by 20%",
    "Improve college/career readiness",
    "Develop professional skills",
    "Build industry connections for internships"
  ]
}
```

**Expected Output:**
```json
{
  "program_structure": {
    "total_sessions": 18,
    "frequency": "Bi-weekly or monthly depending on focus area",
    "phases": [
      {
        "phase_number": 1,
        "name": "Foundation & Relationship Building",
        "duration": "2 months",
        "objectives": [
          "Establish mentor-student relationships",
          "Assess baseline knowledge and interests",
          "Align expectations and communication style"
        ],
        "activities": [
          "Mentor-student matching process",
          "Welcome orientation for all participants",
          "Goal-setting conversations",
          "Classroom introduction of mentors"
        ]
      },
      {
        "phase_number": 2,
        "name": "Active Mentoring Engagement",
        "duration": "5 months",
        "objectives": [
          "Deliver substantive mentoring aligned with curriculum",
          "Build professional skills and knowledge",
          "Deepen career exploration and awareness"
        ],
        "activities": [
          "Technology mentoring sessions",
          "Engineering mentoring sessions",
          "Entrepreneurship mentoring sessions"
        ]
      },
      {
        "phase_number": 3,
        "name": "Synthesis, Application & Reflection",
        "duration": "2 months",
        "objectives": [
          "Apply learning to independent projects",
          "Document and reflect on growth",
          "Plan next steps and continued learning"
        ],
        "activities": [
          "Capstone projects or presentations",
          "Student reflection portfolios",
          "Career action planning",
          "Program celebration and stakeholder presentations"
        ]
      }
    ]
  },
  "mentor_recruitment_plan": {
    "target_count": 30,
    "recruitment_channels": [
      "Digital Human Library mentor network",
      "Local chamber of commerce and business associations",
      "Professional organizations in target industries",
      "Alumni network and parent community",
      "University partnerships and graduate programs",
      "Corporate partnerships and employee volunteer programs"
    ],
    "training_requirements": [
      "Overview of K-12 education system and standards",
      "Effective mentoring practices and communication",
      "Youth development and appropriate expectations",
      "Diversity, equity, and cultural competence",
      "Session planning and curriculum alignment"
    ]
  },
  "schedule": "Program Timeline: Academic school year (September - June)...",
  "assessment_framework": {
    "Student Engagement": "Track attendance, participation quality, and interaction depth using mentor feedback forms",
    "Learning Outcomes": "Pre/post assessments aligned with curriculum standards",
    "Career Awareness": "Career exploration surveys measuring knowledge and interest",
    "Professional Skills": "Self-assessment and mentor evaluation of communication and collaboration",
    "Academic Impact": "Monitor related course grades and test scores"
  },
  "budget_breakdown": {
    "Mentor Stipends/Honoraria": 26250,
    "Mentor Training & Support": 11250,
    "Program Coordination Staff": 18750,
    "Technology & Tools": 7500,
    "Student Materials & Resources": 6000,
    "Evaluation & Assessment": 3000,
    "Professional Development": 2250
  },
  "success_metrics": [
    "90%+ mentor-student session attendance rate",
    "80%+ student report increased career awareness",
    "75%+ student report increased confidence in subject area",
    "85%+ teacher report positive student engagement changes",
    "Increased enrollment in advanced STEM courses",
    "Improved college/career readiness indicators"
  ]
}
```

### Example 2: Elementary Program (Semester)

**Scenario:** Elementary school wants a 4-month pilot program.

```json
{
  "school_type": "Elementary",
  "student_population": 450,
  "budget": 12000,
  "duration": "semester",
  "focus_areas": ["Science", "Technology", "Environmental"],
  "goals": [
    "Spark student interest in STEM",
    "Expose students to diverse careers",
    "Build hands-on learning experiences"
  ]
}
```

---

## dhl_career_explorer

**Purpose:** Help students explore career pathways and connect with mentors in fields of interest.

**Use Cases:**
- Support career guidance and counseling
- Student self-discovery and exploration
- Identify career interests for mentoring matching
- Create career awareness assemblies/workshops

### Example 1: Technology Career Exploration (Grade 10)

**Scenario:** Grade 10 student interested in tech careers wants to explore options.

```json
{
  "student_interests": ["coding", "problem-solving", "innovation", "robotics"],
  "grade_level": "10",
  "preferred_industries": ["Technology", "Engineering", "Renewable Energy"],
  "skills": ["Python basics", "critical thinking", "teamwork"]
}
```

**Expected Output:**
```json
{
  "career_pathways": [
    {
      "career_title": "Software Engineer",
      "industry": "Technology",
      "education_required": [
        "Bachelor's in Computer Science or related field",
        "Coding bootcamp (alternative)",
        "Continuous professional development in new frameworks"
      ],
      "estimated_salary_range": "$80,000 - $180,000+ annually",
      "growth_outlook": "Much Faster Than Average (22% growth 2020-2030)",
      "related_skills": [
        "Programming",
        "Problem-solving",
        "Systems design",
        "Communication",
        "Collaboration",
        "Version control",
        "Databases"
      ]
    },
    {
      "career_title": "Data Scientist",
      "industry": "Technology",
      "education_required": [
        "Bachelor's in Mathematics, Statistics, or Computer Science",
        "Master's in Data Science (preferred)",
        "Certifications in machine learning"
      ],
      "estimated_salary_range": "$100,000 - $200,000+ annually",
      "growth_outlook": "Much Faster Than Average (36% growth 2021-2031)",
      "related_skills": [
        "Statistics",
        "Programming (Python, R)",
        "Machine learning",
        "Data visualization",
        "SQL"
      ]
    },
    {
      "career_title": "Mechanical Engineer",
      "industry": "Engineering",
      "education_required": [
        "Bachelor's in Mechanical Engineering",
        "Professional Engineer (PE) license",
        "Specialized certifications"
      ],
      "estimated_salary_range": "$70,000 - $160,000+ annually",
      "growth_outlook": "About Average (4% growth 2021-2031)",
      "related_skills": [
        "CAD design",
        "Physics",
        "Thermodynamics",
        "Problem-solving",
        "Project management"
      ]
    }
  ],
  "day_in_life_descriptions": {
    "Software Engineer": "9am: Team standup | 10am-12pm: Code review and pair programming | 12pm-1pm: Lunch | 1pm-3pm: Work on features | 3pm: Team meeting | 3:30pm-5pm: Learning and testing",
    "Data Scientist": "9am: Check data pipeline | 9:30am-11am: Exploratory data analysis | 11am: Meeting with stakeholders | 1pm-4pm: Build and test models | 4pm: Team meeting",
    "Mechanical Engineer": "8am: Site inspection | 10am-12pm: Lab testing | 1pm-3pm: Regulatory review | 3pm: Client meeting | 3:45pm-5pm: CAD design"
  },
  "required_education": [
    "Bachelor's in Computer Science or related field",
    "Coding bootcamp (alternative)",
    "Bachelor's in Mathematics, Statistics, or Computer Science",
    "Master's in Data Science (preferred)",
    "Bachelor's in Mechanical Engineering"
  ],
  "salary_ranges": [
    "Software Engineer: $80,000 - $180,000+ annually",
    "Data Scientist: $100,000 - $200,000+ annually",
    "Mechanical Engineer: $70,000 - $160,000+ annually"
  ],
  "available_mentors_count": 2,
  "available_mentors": [
    {
      "id": "tech-mentor-1",
      "name": "Sarah Chen",
      "expertise": ["Computer Science", "Engineering", "Technology"],
      "industry": "Technology",
      "experience_years": 12,
      "availability": ["Monday", "Wednesday", "Saturday"],
      "certifications": ["AWS Solutions Architect", "Certified Scrum Master"],
      "session_format_preference": "Virtual",
      "rating": 4.9,
      "match_score": 0.95
    }
  ],
  "industry_growth_trends": {
    "Technology": "Explosive growth driven by AI, cloud computing, and cybersecurity. 22-36% job growth expected.",
    "Engineering": "Steady growth with focus on sustainable infrastructure. 4-8% job growth.",
    "Renewable Energy": "Strong growth driven by climate change and sustainability initiatives. Emerging green energy sector."
  }
}
```

### Example 2: Healthcare Career Interest (Grade 8)

**Scenario:** Middle school student considering healthcare careers.

```json
{
  "student_interests": ["helping people", "science", "anatomy", "working in teams"],
  "grade_level": "8",
  "preferred_industries": ["Healthcare", "Environmental", "Business"],
  "skills": ["good communication", "empathy", "detail-oriented"]
}
```

---

## Integration Patterns

### Pattern 1: Full Program Design Workflow

```
1. dhl_program_design → Create overall program structure
2. dhl_mentor_match → Find mentors for each focus area
3. dhl_curriculum_align → Align mentoring with standards
4. dhl_session_plan → Plan individual sessions
5. dhl_impact_report → Measure effectiveness
```

### Pattern 2: Student-Centered Career Planning

```
1. dhl_career_explorer → Student explores options
2. dhl_mentor_match → Find mentors in areas of interest
3. dhl_session_plan → Schedule exploration sessions
4. dhl_impact_report → Track student progress/interests
```

### Pattern 3: New Teacher Integration

```
1. dhl_mentor_match → Find mentors for curriculum topics
2. dhl_curriculum_align → Connect mentoring to standards
3. dhl_session_plan → Prepare for specific sessions
4. dhl_impact_report → Assess student learning gains
```

---

## Tips for Success

1. **Start with clear learning objectives** - Use curriculum standards to define what students will learn
2. **Match mentors carefully** - Ensure personality fit, availability, and expertise alignment
3. **Provide mentor training** - Invest in mentor preparation for better outcomes
4. **Collect regular feedback** - Use impact reporting to continuously improve
5. **Celebrate successes** - Share student outcomes with all stakeholders
6. **Plan for sustainability** - Build mentoring relationships beyond single programs

---

For more information, visit: https://digitalhumanlibrary.com
