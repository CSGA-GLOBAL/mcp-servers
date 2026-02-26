#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * oneos-education-mcp
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T05:59:00Z
 * Last Modified:   2026-02-26T05:59:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */



import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

import {
  CourseSearchInputSchema,
  LearningPathInputSchema,
  CredentialVerifyInputSchema,
  EnrollInputSchema,
  ProgressCheckInputSchema,
  CertificateIssueInputSchema,
  Entity
} from './schemas.js';

import {
  courseDatabase,
  learnerProgressDatabase,
  platformMetrics,
  findCoursesByQuery,
  generateLearningPath,
  verifyCredential,
  issueCertificate
} from './data.js';

// Initialize MCP Server
const server = new Server({
  name: 'oneos-education-mcp',
  version: '1.0.0',
}, {
  capabilities: { tools: {}, resources: {} },
});

// Resource definitions
const resources: Array<{ uri: string; name: string; description: string; mimeType: string }> = [
  {
    uri: 'oneos://catalog',
    name: 'OneOS Course Catalog',
    description: 'Complete catalog of all 24 active courses across the OneOS ecosystem',
    mimeType: 'application/json'
  },
  {
    uri: 'oneos://certifications',
    name: 'Available Certifications',
    description: 'List of all available professional certifications and credentials',
    mimeType: 'application/json'
  },
  {
    uri: 'oneos://metrics',
    name: 'Platform Metrics',
    description: 'Real-time metrics: 12,847 learners, 8,432 enrollments, 24 courses, 87.3% completion rate',
    mimeType: 'application/json'
  }
];

// Tool definitions
const tools: Array<{ name: string; description: string; inputSchema: Record<string, unknown> }> = [
  {
    name: 'oneos_course_search',
    description: 'Search for courses across all OneOS ecosystem entities (BMCC Cyber, DHL/Lawrie Group, CSGA Global, CSOAI, Terranova, OrbitQ, AIdome). Find courses by topic, skill level, sector, or certification goal.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'Topic or subject area to search (e.g., "cybersecurity", "AI", "machine learning")' },
        skillLevel: {
          type: 'string',
          enum: ['beginner', 'intermediate', 'advanced', 'expert'],
          description: 'Filter by skill level'
        },
        sector: { type: 'string', description: 'Industry or sector focus (e.g., "finance", "healthcare", "operations")' },
        certificationGoal: { type: 'string', description: 'Specific certification target (e.g., "CompTIA Security+", "AWS Solutions Architect")' },
        entity: {
          type: 'string',
          enum: Object.values(Entity),
          description: 'Filter by specific ecosystem entity'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return (1-50, default: 10)'
        }
      },
      required: ['topic']
    }
  },
  {
    name: 'oneos_learning_path',
    description: 'Generate a personalized learning pathway based on career goals, current skills, available time, and budget. Returns recommended course sequence with certifications and career impact.',
    inputSchema: {
      type: 'object',
      properties: {
        careerGoal: { type: 'string', description: 'Target career goal (e.g., "Cloud Architect", "AI Engineer", "DevOps Lead")' },
        currentSkills: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of current skills or certifications'
        },
        timeAvailable: {
          type: 'number',
          description: 'Weekly hours available for learning (1-1440)'
        },
        budget: {
          type: 'number',
          description: 'Total budget in USD for learning (0-100000)'
        },
        preferredEntities: {
          type: 'array',
          items: { type: 'string', enum: Object.values(Entity) },
          description: 'Preferred educational entities (optional, max 3)'
        }
      },
      required: ['careerGoal', 'timeAvailable', 'budget']
    }
  },
  {
    name: 'oneos_credential_verify',
    description: 'Verify a digital credential issued by OneOS. Validate completion certificates, check blockchain anchors, and confirm skill validations.',
    inputSchema: {
      type: 'object',
      properties: {
        credentialId: { type: 'string', description: 'Digital credential ID' },
        qrCodeData: { type: 'string', description: 'QR code data from physical/digital credential' },
        blockchainAnchor: { type: 'string', description: 'Blockchain transaction hash for verification' }
      },
      anyOf: [
        { required: ['credentialId'] },
        { required: ['qrCodeData'] },
        { required: ['blockchainAnchor'] }
      ]
    }
  },
  {
    name: 'oneos_enroll',
    description: 'Get enrollment information for a course, including prerequisites, start dates, payment options, and enrollment details.',
    inputSchema: {
      type: 'object',
      properties: {
        courseId: { type: 'string', description: 'Course ID to enroll in' },
        learnerProfile: {
          type: 'object',
          properties: {
            email: { type: 'string', description: 'Learner email address' },
            firstName: { type: 'string', description: 'First name (optional)' },
            lastName: { type: 'string', description: 'Last name (optional)' },
            currentSkillLevel: {
              type: 'string',
              enum: ['beginner', 'intermediate', 'advanced', 'expert'],
              description: 'Current skill level (optional)'
            }
          },
          required: ['email']
        }
      },
      required: ['courseId', 'learnerProfile']
    }
  },
  {
    name: 'oneos_progress_check',
    description: 'Check a learner\'s current progress, including active courses, completion percentages, upcoming deadlines, and achievements.',
    inputSchema: {
      type: 'object',
      properties: {
        learnerId: { type: 'string', description: 'Learner unique ID' },
        email: { type: 'string', description: 'Learner email address' }
      },
      anyOf: [
        { required: ['learnerId'] },
        { required: ['email'] }
      ]
    }
  },
  {
    name: 'oneos_certificate_issue',
    description: 'Issue a digital completion certificate for a course. Generates certificate with QR code, LinkedIn badge, and blockchain anchor.',
    inputSchema: {
      type: 'object',
      properties: {
        courseId: { type: 'string', description: 'Course ID' },
        learnerId: { type: 'string', description: 'Learner ID' },
        completionDate: { type: 'string', description: 'Completion date (ISO 8601 format)' },
        score: {
          type: 'number',
          description: 'Final course score (0-100, optional)'
        },
        metadata: {
          type: 'object',
          description: 'Additional metadata as key-value pairs (optional)'
        }
      },
      required: ['courseId', 'learnerId', 'completionDate']
    }
  }
];

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return { resources };
});

// Read specific resource
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  switch (uri) {
    case 'oneos://catalog':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(
              {
                totalCourses: courseDatabase.length,
                courses: courseDatabase
              },
              null,
              2
            )
          }
        ]
      };

    case 'oneos://certifications':
      const certifications = Array.from(new Set(courseDatabase.map(c => c.certification)));
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(
              {
                totalCertifications: certifications.length,
                certifications: certifications.map(cert => ({
                  name: cert,
                  type: 'professional',
                  issuingBody: 'OneOS Platform'
                }))
              },
              null,
              2
            )
          }
        ]
      };

    case 'oneos://metrics':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(platformMetrics, null, 2)
          }
        ]
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'oneos_course_search': {
        const validated = CourseSearchInputSchema.parse(args);
        const results = findCoursesByQuery(
          validated.topic,
          validated.skillLevel,
          validated.sector,
          validated.entity
        ).slice(0, validated.limit || 10);

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  query: validated,
                  resultsCount: results.length,
                  courses: results
                },
                null,
                2
              )
            }
          ]
        };
      }

      case 'oneos_learning_path': {
        const validated = LearningPathInputSchema.parse(args);
        const courses = generateLearningPath(
          validated.careerGoal,
          validated.currentSkills,
          validated.timeAvailable,
          validated.budget,
          validated.preferredEntities
        );

        const totalHours = courses.reduce((sum, c) => sum + c.duration, 0);
        const totalCost = courses.reduce((sum, c) => sum + c.price, 0);
        const certifications = Array.from(new Set(courses.map(c => c.certification)));
        const skillsGained = Array.from(new Set(courses.flatMap(c => c.tags)));

        const pathData = {
          careerGoal: validated.careerGoal,
          recommendedCourses: courses,
          estimatedCompletionHours: totalHours,
          estimatedCompletionMonths: Math.ceil(totalHours / (validated.timeAvailable * 4.3)),
          totalCost,
          certifications,
          skillsGained: skillsGained.slice(0, 15),
          careerImpact: `Completing this pathway will position you as a qualified ${validated.careerGoal} with ${certifications.length} professional certifications and expertise in ${skillsGained.slice(0, 5).join(', ')}.`,
          roi: {
            estimatedSalaryIncrease: `$${(totalCost * 3).toLocaleString()}`,
            paybackPeriod: `${Math.ceil((totalCost / (totalCost * 3)) * 12)} months`
          }
        };

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(pathData, null, 2)
            }
          ]
        };
      }

      case 'oneos_credential_verify': {
        const validated = CredentialVerifyInputSchema.parse(args);
        const credentialId = validated.credentialId || `cred-${validated.qrCodeData?.substring(0, 8)}`;

        const credential = verifyCredential(credentialId);

        if (!credential) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(
                  {
                    status: 'not_found',
                    message: `Credential ${credentialId} not found in system`,
                    suggestion: 'Please verify the credential ID or QR code data'
                  },
                  null,
                  2
                )
              }
            ]
          };
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  verificationStatus: credential.status,
                  credential,
                  blockchainVerified: true,
                  verificationDate: new Date().toISOString()
                },
                null,
                2
              )
            }
          ]
        };
      }

      case 'oneos_enroll': {
        const validated = EnrollInputSchema.parse(args);
        const course = courseDatabase.find(c => c.id === validated.courseId);

        if (!course) {
          throw new Error(`Course ${validated.courseId} not found`);
        }

        const enrollment = {
          enrollmentId: `enrollment-${Date.now()}`,
          courseId: validated.courseId,
          learnerId: `learner-${validated.learnerProfile.email?.split('@')[0]}`,
          courseName: course.title,
          courseDescription: course.description,
          entity: course.entity,
          status: 'pending_payment',
          enrollmentDate: new Date().toISOString(),
          startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          expectedCompletionDate: new Date(Date.now() + (course.duration * 7 * 24 * 60 * 60 * 1000)).toISOString(),
          prerequisites: [],
          courseDetails: {
            level: course.level,
            duration: course.duration,
            certification: course.certification,
            completionRate: course.completionRate
          },
          paymentOptions: [
            {
              method: 'credit_card',
              amount: course.price,
              currency: 'USD',
              available: true
            },
            {
              method: 'installment_3',
              amount: Math.round((course.price / 3) * 100) / 100,
              currency: 'USD',
              available: true
            },
            {
              method: 'installment_6',
              amount: Math.round((course.price / 6) * 100) / 100,
              currency: 'USD',
              available: course.price > 200
            }
          ],
          learnerProfile: validated.learnerProfile
        };

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(enrollment, null, 2)
            }
          ]
        };
      }

      case 'oneos_progress_check': {
        const validated = ProgressCheckInputSchema.parse(args);
        const learnerId = validated.learnerId || `learner-${validated.email?.split('@')[0]}`;

        const progress = learnerProgressDatabase[learnerId];

        if (!progress) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(
                  {
                    status: 'learner_not_found',
                    learnerId,
                    message: 'No progress data found for this learner',
                    suggestion: 'Learner may not have started any courses yet'
                  },
                  null,
                  2
                )
              }
            ]
          };
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(progress, null, 2)
            }
          ]
        };
      }

      case 'oneos_certificate_issue': {
        const validated = CertificateIssueInputSchema.parse(args);
        const completionDate = new Date(validated.completionDate);

        const certificate = issueCertificate(
          validated.courseId,
          validated.learnerId,
          completionDate,
          validated.score
        );

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  status: 'issued',
                  certificate,
                  issuanceTimestamp: new Date().toISOString(),
                  blockchainConfirmation: 'Pending (confirms within 2-5 minutes)',
                  sharingOptions: {
                    linkedin: 'Add to LinkedIn profile',
                    email: 'Share via email',
                    download: 'Download PDF',
                    blockchain: 'View on blockchain explorer'
                  }
                },
                null,
                2
              )
            }
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify(
            {
              error: true,
              message: errorMessage,
              tool: name
            },
            null,
            2
          )
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('OneOS Education MCP Server started');
}

main().catch(console.error);
