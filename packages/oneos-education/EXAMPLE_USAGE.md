# OneOS Education MCP Server - Usage Examples

This document provides practical examples of using the OneOS Education MCP server with detailed requests and expected responses.

## Table of Contents

1. [Course Search Examples](#course-search-examples)
2. [Learning Path Generation](#learning-path-generation)
3. [Credential Verification](#credential-verification)
4. [Course Enrollment](#course-enrollment)
5. [Progress Tracking](#progress-tracking)
6. [Certificate Issuance](#certificate-issuance)

---

## Course Search Examples

### Example 1: Search for Cybersecurity Courses

**Request:**
```json
{
  "tool": "oneos_course_search",
  "arguments": {
    "topic": "cybersecurity",
    "skillLevel": "beginner",
    "limit": 3
  }
}
```

**Response:**
```json
{
  "query": {
    "topic": "cybersecurity",
    "skillLevel": "beginner"
  },
  "resultsCount": 3,
  "courses": [
    {
      "id": "course-001",
      "title": "Cybersecurity Fundamentals",
      "description": "Master core cybersecurity concepts, threat landscape, and defensive strategies",
      "entity": "BMCC Cyber",
      "level": "beginner",
      "duration": 24,
      "price": 299,
      "certification": "CompTIA Security+",
      "enrollmentCount": 1247,
      "completionRate": 89.2,
      "status": "active",
      "tags": ["cybersecurity", "security", "compliance", "threat-analysis"]
    },
    {
      "id": "course-022",
      "title": "Customer Experience & Service Design",
      "description": "Design customer journeys and build exceptional service experiences",
      "entity": "DHL/Lawrie Group",
      "level": "beginner",
      "duration": 10,
      "price": 179,
      "certification": "CX Professional",
      "enrollmentCount": 892,
      "completionRate": 92.1,
      "status": "active",
      "tags": ["customer-experience", "service-design", "ux", "business"]
    }
  ]
}
```

### Example 2: Search for Advanced AI Courses

**Request:**
```json
{
  "tool": "oneos_course_search",
  "arguments": {
    "topic": "artificial intelligence",
    "skillLevel": "advanced",
    "entity": "AIdome",
    "limit": 5
  }
}
```

**Response:**
```json
{
  "query": {
    "topic": "artificial intelligence",
    "skillLevel": "advanced",
    "entity": "AIdome"
  },
  "resultsCount": 2,
  "courses": [
    {
      "id": "course-014",
      "title": "Building Production AI Systems",
      "description": "Deploy, scale, and maintain AI systems in production environments",
      "entity": "AIdome",
      "level": "advanced",
      "duration": 26,
      "price": 649,
      "certification": "AI Systems Engineer",
      "enrollmentCount": 456,
      "completionRate": 83.7,
      "status": "active",
      "tags": ["ai", "production", "mlops", "engineering", "deployment"]
    },
    {
      "id": "course-013",
      "title": "Prompt Engineering & LLM Optimization",
      "description": "Master prompt design, fine-tuning, and optimization of large language models",
      "entity": "AIdome",
      "level": "intermediate",
      "duration": 16,
      "price": 299,
      "certification": "Prompt Engineering Professional",
      "enrollmentCount": 2341,
      "completionRate": 91.3,
      "status": "active",
      "tags": ["ai", "llm", "prompt-engineering", "gpt", "generative-ai"]
    }
  ]
}
```

### Example 3: Search by Sector

**Request:**
```json
{
  "tool": "oneos_course_search",
  "arguments": {
    "topic": "supply chain",
    "sector": "logistics",
    "limit": 2
  }
}
```

**Response:**
```json
{
  "resultsCount": 2,
  "courses": [
    {
      "id": "course-003",
      "title": "Supply Chain Management Excellence",
      "description": "Optimize logistics, inventory, and supplier relationships in global operations",
      "entity": "DHL/Lawrie Group",
      "level": "intermediate",
      "duration": 20,
      "price": 399,
      "certification": "DHL Supply Chain Professional",
      "tags": ["supply-chain", "logistics", "optimization", "operations"]
    },
    {
      "id": "course-004",
      "title": "Global Trade & Import/Export",
      "description": "Navigate international trade regulations, tariffs, and customs compliance",
      "entity": "DHL/Lawrie Group",
      "level": "intermediate",
      "duration": 16,
      "price": 349,
      "certification": "International Trade Specialist",
      "tags": ["international-trade", "customs", "compliance", "logistics"]
    }
  ]
}
```

---

## Learning Path Generation

### Example 1: Cloud Architecture Career Path

**Request:**
```json
{
  "tool": "oneos_learning_path",
  "arguments": {
    "careerGoal": "Cloud Solutions Architect",
    "currentSkills": ["Linux", "Networking", "Python"],
    "timeAvailable": 15,
    "budget": 3500,
    "preferredEntities": ["Terranova Group", "CSGA Global"]
  }
}
```

**Response:**
```json
{
  "careerGoal": "Cloud Solutions Architect",
  "recommendedCourses": [
    {
      "id": "course-009",
      "title": "Enterprise Cloud Architecture",
      "entity": "Terranova Group",
      "level": "advanced",
      "duration": 30,
      "price": 699,
      "certification": "Cloud Solutions Architect",
      "completionRate": 85.6
    },
    {
      "id": "course-010",
      "title": "DevOps & Continuous Integration/Deployment",
      "entity": "Terranova Group",
      "level": "intermediate",
      "duration": 22,
      "price": 449,
      "certification": "DevOps Professional",
      "completionRate": 86.9
    },
    {
      "id": "course-017",
      "title": "API Design & Microservices Architecture",
      "entity": "Terranova Group",
      "level": "intermediate",
      "duration": 18,
      "price": 399,
      "certification": "API & Microservices Architect",
      "completionRate": 87.1
    }
  ],
  "estimatedCompletionHours": 70,
  "estimatedCompletionMonths": 1.3,
  "totalCost": 1547,
  "certifications": [
    "Cloud Solutions Architect",
    "DevOps Professional",
    "API & Microservices Architect"
  ],
  "skillsGained": [
    "cloud", "aws", "azure", "architecture", "devops", "docker", "kubernetes",
    "cicd", "automation", "api", "microservices", "backend", "rest"
  ],
  "careerImpact": "Completing this pathway will position you as a qualified Cloud Solutions Architect with 3 professional certifications and expertise in cloud, aws, azure, architecture, devops.",
  "roi": {
    "estimatedSalaryIncrease": "$4,641",
    "paybackPeriod": "1 month"
  }
}
```

### Example 2: AI Engineer Career Path

**Request:**
```json
{
  "tool": "oneos_learning_path",
  "arguments": {
    "careerGoal": "AI Engineer",
    "currentSkills": ["Python", "Machine Learning", "Data Analysis"],
    "timeAvailable": 20,
    "budget": 2500,
    "preferredEntities": ["AIdome", "CSGA Global"]
  }
}
```

**Response:**
```json
{
  "careerGoal": "AI Engineer",
  "recommendedCourses": [
    {
      "id": "course-006",
      "title": "Data Science & Analytics Masterclass",
      "entity": "CSGA Global",
      "level": "advanced",
      "duration": 36,
      "price": 649,
      "certification": "Data Science Professional"
    },
    {
      "id": "course-014",
      "title": "Building Production AI Systems",
      "entity": "AIdome",
      "level": "advanced",
      "duration": 26,
      "price": 649,
      "certification": "AI Systems Engineer"
    },
    {
      "id": "course-013",
      "title": "Prompt Engineering & LLM Optimization",
      "entity": "AIdome",
      "level": "intermediate",
      "duration": 16,
      "price": 299,
      "certification": "Prompt Engineering Professional"
    }
  ],
  "estimatedCompletionHours": 78,
  "estimatedCompletionMonths": 1.5,
  "totalCost": 1597,
  "certifications": [
    "Data Science Professional",
    "AI Systems Engineer",
    "Prompt Engineering Professional"
  ],
  "skillsGained": [
    "ai", "machine-learning", "data-science", "python", "production",
    "mlops", "engineering", "deployment", "llm", "prompt-engineering"
  ],
  "careerImpact": "Completing this pathway will position you as a qualified AI Engineer with 3 professional certifications and expertise in ai, machine-learning, data-science, python, production.",
  "roi": {
    "estimatedSalaryIncrease": "$4,791",
    "paybackPeriod": "1 month"
  }
}
```

---

## Credential Verification

### Example 1: Verify by Credential ID

**Request:**
```json
{
  "tool": "oneos_credential_verify",
  "arguments": {
    "credentialId": "cred-001"
  }
}
```

**Response:**
```json
{
  "verificationStatus": "valid",
  "credential": {
    "id": "cred-001",
    "learnerId": "learner-001",
    "courseId": "course-022",
    "certificationType": "completion",
    "issuingEntity": "DHL/Lawrie Group",
    "completionDate": "2025-01-15",
    "skillsValidated": [
      "customer-experience",
      "service-design",
      "ux-principles",
      "customer-journey-mapping"
    ],
    "blockchainAnchor": "0x4a7f2e1c8b9d3e5f6a2c1d9e8f7a6b5c",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw...",
    "verificationUrl": "https://oneos.verify/credentials/cred-001",
    "status": "valid"
  },
  "blockchainVerified": true,
  "verificationDate": "2025-02-25T10:30:00Z"
}
```

### Example 2: Invalid Credential

**Request:**
```json
{
  "tool": "oneos_credential_verify",
  "arguments": {
    "credentialId": "cred-999"
  }
}
```

**Response:**
```json
{
  "status": "not_found",
  "message": "Credential cred-999 not found in system",
  "suggestion": "Please verify the credential ID or QR code data"
}
```

---

## Course Enrollment

### Example 1: Enroll in Cloud Architecture Course

**Request:**
```json
{
  "tool": "oneos_enroll",
  "arguments": {
    "courseId": "course-009",
    "learnerProfile": {
      "email": "sarah.chen@company.com",
      "firstName": "Sarah",
      "lastName": "Chen",
      "currentSkillLevel": "intermediate"
    }
  }
}
```

**Response:**
```json
{
  "enrollmentId": "enrollment-1708425600000",
  "courseId": "course-009",
  "learnerId": "learner-sarah",
  "courseName": "Enterprise Cloud Architecture",
  "courseDescription": "Design, deploy, and manage scalable cloud solutions for enterprises",
  "entity": "Terranova Group",
  "status": "pending_payment",
  "enrollmentDate": "2025-02-25T10:30:00Z",
  "startDate": "2025-02-27T00:00:00Z",
  "expectedCompletionDate": "2025-04-28T00:00:00Z",
  "prerequisites": [],
  "courseDetails": {
    "level": "advanced",
    "duration": 30,
    "certification": "Cloud Solutions Architect",
    "completionRate": 85.6
  },
  "paymentOptions": [
    {
      "method": "credit_card",
      "amount": 699,
      "currency": "USD",
      "available": true
    },
    {
      "method": "installment_3",
      "amount": 233,
      "currency": "USD",
      "available": true
    },
    {
      "method": "installment_6",
      "amount": 116.5,
      "currency": "USD",
      "available": true
    }
  ],
  "learnerProfile": {
    "email": "sarah.chen@company.com",
    "firstName": "Sarah",
    "lastName": "Chen",
    "currentSkillLevel": "intermediate"
  }
}
```

### Example 2: Enroll in Beginner Course

**Request:**
```json
{
  "tool": "oneos_enroll",
  "arguments": {
    "courseId": "course-013",
    "learnerProfile": {
      "email": "alex.patel@startup.io",
      "firstName": "Alex",
      "lastName": "Patel"
    }
  }
}
```

**Response:**
```json
{
  "enrollmentId": "enrollment-1708425650000",
  "courseId": "course-013",
  "learnerId": "learner-alex",
  "courseName": "Prompt Engineering & LLM Optimization",
  "entity": "AIdome",
  "status": "pending_payment",
  "enrollmentDate": "2025-02-25T10:30:00Z",
  "startDate": "2025-02-27T00:00:00Z",
  "expectedCompletionDate": "2025-03-20T00:00:00Z",
  "courseDetails": {
    "level": "intermediate",
    "duration": 16,
    "certification": "Prompt Engineering Professional",
    "completionRate": 91.3
  },
  "paymentOptions": [
    {
      "method": "credit_card",
      "amount": 299,
      "currency": "USD",
      "available": true
    },
    {
      "method": "installment_3",
      "amount": 99.67,
      "currency": "USD",
      "available": true
    }
  ]
}
```

---

## Progress Tracking

### Example 1: Check Active Learner Progress

**Request:**
```json
{
  "tool": "oneos_progress_check",
  "arguments": {
    "learnerId": "learner-001"
  }
}
```

**Response:**
```json
{
  "learnerId": "learner-001",
  "currentCourses": [
    {
      "courseId": "course-001",
      "title": "Cybersecurity Fundamentals",
      "completionPercentage": 65,
      "lastAccessDate": "2025-02-24",
      "daysRemaining": 12
    },
    {
      "courseId": "course-005",
      "title": "AI & Machine Learning for Business",
      "completionPercentage": 42,
      "lastAccessDate": "2025-02-23",
      "daysRemaining": 18
    }
  ],
  "completedCourses": [
    {
      "courseId": "course-022",
      "title": "Customer Experience & Service Design",
      "completionDate": "2025-01-15",
      "score": 94
    }
  ],
  "upcomingDeadlines": [
    {
      "courseId": "course-001",
      "title": "Cybersecurity Fundamentals",
      "deadline": "2025-03-10",
      "daysUntilDeadline": 13
    }
  ],
  "achievements": [
    {
      "badgeId": "badge-001",
      "name": "Quick Learner",
      "earnedDate": "2025-01-20",
      "description": "Completed 1 course in under 2 weeks"
    }
  ],
  "totalHoursLearned": 34,
  "certificationsEarned": 1,
  "averageCompletionRate": 83.5
}
```

### Example 2: New Learner with No Progress

**Request:**
```json
{
  "tool": "oneos_progress_check",
  "arguments": {
    "email": "newuser@example.com"
  }
}
```

**Response:**
```json
{
  "status": "learner_not_found",
  "learnerId": "learner-newuser",
  "message": "No progress data found for this learner",
  "suggestion": "Learner may not have started any courses yet"
}
```

---

## Certificate Issuance

### Example 1: Issue Completion Certificate

**Request:**
```json
{
  "tool": "oneos_certificate_issue",
  "arguments": {
    "courseId": "course-001",
    "learnerId": "learner-001",
    "completionDate": "2025-02-25T10:00:00Z",
    "score": 87
  }
}
```

**Response:**
```json
{
  "status": "issued",
  "certificate": {
    "certificateId": "cert-1708938000000",
    "learnerId": "learner-001",
    "courseId": "course-001",
    "courseName": "Cybersecurity Fundamentals",
    "issuingEntity": "BMCC Cyber",
    "issuanceDate": "2025-02-25T10:00:00Z",
    "expirationDate": "2027-02-25T10:00:00Z",
    "score": 87,
    "digitalCertificateUrl": "https://oneos.certificates/cert-1708938000000.pdf",
    "qrCodeUrl": "https://oneos.certificates/qr-codes/cert-1708938000000.png",
    "linkedInBadgeUrl": "https://www.linkedin.com/learning/certificates/oneOS-course-001",
    "blockchainAnchor": "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    "blockchainVerificationUrl": "https://blockchain.verify/transactions/0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    "skills": ["cybersecurity", "security", "compliance", "threat-analysis"]
  },
  "issuanceTimestamp": "2025-02-25T10:30:15Z",
  "blockchainConfirmation": "Pending (confirms within 2-5 minutes)",
  "sharingOptions": {
    "linkedin": "Add to LinkedIn profile",
    "email": "Share via email",
    "download": "Download PDF",
    "blockchain": "View on blockchain explorer"
  }
}
```

### Example 2: Issue Certificate with Metadata

**Request:**
```json
{
  "tool": "oneos_certificate_issue",
  "arguments": {
    "courseId": "course-009",
    "learnerId": "learner-sarah",
    "completionDate": "2025-02-25T15:00:00Z",
    "score": 92,
    "metadata": {
      "projectGrade": "A",
      "practicalExamScore": 95,
      "recommendedByInstructor": true,
      "peerReviewScore": 4.8
    }
  }
}
```

**Response:**
```json
{
  "status": "issued",
  "certificate": {
    "certificateId": "cert-1708952400000",
    "learnerId": "learner-sarah",
    "courseId": "course-009",
    "courseName": "Enterprise Cloud Architecture",
    "issuingEntity": "Terranova Group",
    "issuanceDate": "2025-02-25T15:00:00Z",
    "expirationDate": "2027-02-25T15:00:00Z",
    "score": 92,
    "digitalCertificateUrl": "https://oneos.certificates/cert-1708952400000.pdf",
    "qrCodeUrl": "https://oneos.certificates/qr-codes/cert-1708952400000.png",
    "linkedInBadgeUrl": "https://www.linkedin.com/learning/certificates/oneOS-course-009",
    "blockchainAnchor": "0xf6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1",
    "blockchainVerificationUrl": "https://blockchain.verify/transactions/0xf6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1",
    "skills": ["cloud", "aws", "azure", "architecture", "devops"]
  },
  "issuanceTimestamp": "2025-02-25T15:30:45Z",
  "blockchainConfirmation": "Pending (confirms within 2-5 minutes)",
  "sharingOptions": {
    "linkedin": "Add to LinkedIn profile",
    "email": "Share via email",
    "download": "Download PDF",
    "blockchain": "View on blockchain explorer"
  }
}
```

---

## Accessing Resources

### Get Course Catalog

**Using MCP Resource API:**
```json
{
  "resource": "oneos://catalog"
}
```

**Response Sample:**
```json
{
  "totalCourses": 24,
  "courses": [
    {
      "id": "course-001",
      "title": "Cybersecurity Fundamentals",
      "entity": "BMCC Cyber",
      "level": "beginner",
      "duration": 24,
      "price": 299,
      "certification": "CompTIA Security+",
      "enrollmentCount": 1247,
      "completionRate": 89.2
    },
    // ... 23 more courses
  ]
}
```

### Get Available Certifications

**Using MCP Resource API:**
```json
{
  "resource": "oneos://certifications"
}
```

**Response Sample:**
```json
{
  "totalCertifications": 24,
  "certifications": [
    {
      "name": "CompTIA Security+",
      "type": "professional",
      "issuingBody": "OneOS Platform"
    },
    {
      "name": "GIAC Certified Incident Handler",
      "type": "professional",
      "issuingBody": "OneOS Platform"
    },
    // ... 22 more certifications
  ]
}
```

### Get Platform Metrics

**Using MCP Resource API:**
```json
{
  "resource": "oneos://metrics"
}
```

**Response:**
```json
{
  "totalLearners": 12847,
  "activeEnrollments": 8432,
  "activeCourses": 24,
  "completionRate": 87.3,
  "monthlyRevenue": 54820,
  "averageCourseDuration": 22.5,
  "averageCoursePrice": 449,
  "topEntities": [
    "AIdome",
    "CSGA Global",
    "Terranova Group",
    "BMCC Cyber"
  ],
  "topSkills": [
    "ai",
    "machine-learning",
    "cloud",
    "cybersecurity",
    "data-science",
    "blockchain",
    "devops"
  ],
  "lastUpdated": "2025-02-25T10:30:00Z"
}
```

---

## Best Practices

1. **Course Search**: Always include relevant filters to narrow results
2. **Learning Paths**: Set realistic time and budget constraints
3. **Enrollment**: Validate learner email before enrolling
4. **Credential Verification**: Use blockchain anchor for highest security
5. **Certificate Storage**: Store blockchain anchors for permanent verification

---

## Common Patterns

### Search → Enroll → Track Progress → Issue Certificate

```
1. Search for relevant courses
   → oneos_course_search(topic: "ai", skillLevel: "intermediate")

2. Enroll in selected course
   → oneos_enroll(courseId, learnerProfile)

3. Periodically check progress
   → oneos_progress_check(learnerId)

4. Upon completion, issue certificate
   → oneos_certificate_issue(courseId, learnerId, completionDate, score)

5. Verify credential
   → oneos_credential_verify(credentialId)
```

### Career Path Planning

```
1. Define career goal and constraints
   → oneos_learning_path(careerGoal, currentSkills, timeAvailable, budget)

2. Enroll in recommended courses
   → oneos_enroll() for each course in path

3. Track overall progress
   → oneos_progress_check() to monitor completion

4. Complete courses and receive certificates
   → oneos_certificate_issue() upon completion

5. Build portfolio of verified credentials
   → oneos_credential_verify() to demonstrate achievements
```

---

For more information, see [README.md](./README.md)
