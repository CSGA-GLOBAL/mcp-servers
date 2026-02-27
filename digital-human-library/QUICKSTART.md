# Digital Human Library MCP Server - Quick Start Guide

## Installation

```bash
cd /sessions/brave-adoring-cerf/mcp-servers/digital-human-library
npm install
npm run build
npm start
```

## Quick Test

### Test 1: Mentor Matching
```bash
curl -X POST http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "dhl_mentor_match",
      "arguments": {
        "grade_level": "9",
        "subject_area": "Technology",
        "learning_objectives": ["Understand software engineering", "Learn web development"],
        "location": "Ontario",
        "session_type": "virtual"
      }
    }
  }'
```

## What Each Tool Does

| Tool | Purpose | Key Inputs | Key Outputs |
|------|---------|-----------|------------|
| `dhl_mentor_match` | Find mentors for students | Grade, subject, location | Mentor profiles, match scores |
| `dhl_curriculum_align` | Align with standards | Province/state, grade, subject | Standards, rubrics, activities |
| `dhl_impact_report` | Measure program impact | School ID, date range | Engagement metrics, ROI |
| `dhl_session_plan` | Plan mentoring sessions | Mentor expertise, grade, topic | Session outline, activities |
| `dhl_program_design` | Design full programs | School type, budget, duration | Program phases, budget breakdown |
| `dhl_career_explorer` | Explore careers | Student interests, industries | Career pathways, mentors, salaries |

## Configuration

### Mock Databases

Edit the mock databases in tool files to add mentors, standards, and career information:

- **Mentors:** `src/tools/mentor-match.ts` - `MENTOR_DATABASE`
- **Standards:** `src/tools/curriculum-align.ts` - `CURRICULUM_STANDARDS`
- **Careers:** `src/tools/career-explorer.ts` - `CAREER_PATHWAYS`

### Production Integration

Replace mock databases with:
- Real mentor management system API
- Education standards APIs (Common Core, provincial)
- School information system (SIS) integration
- Impact data warehouse

## Common Use Cases

### Use Case 1: Teacher Preparing for Mentoring Unit
1. Call `dhl_mentor_match` to find mentors
2. Call `dhl_curriculum_align` to align with standards
3. Call `dhl_session_plan` to prepare sessions

### Use Case 2: School Planning Annual Program
1. Call `dhl_program_design` for full plan
2. Call `dhl_mentor_match` for each focus area
3. Call `dhl_impact_report` quarterly to track progress

### Use Case 3: Student Career Counseling
1. Call `dhl_career_explorer` for options
2. Call `dhl_mentor_match` to find mentors
3. Use returned mentors for ongoing guidance

## File Structure

```
digital-human-library/
├── src/
│   ├── index.ts              # Main server
│   ├── types.ts              # All types and schemas
│   └── tools/
│       ├── mentor-match.ts
│       ├── curriculum-align.ts
│       ├── impact-report.ts
│       ├── session-plan.ts
│       ├── program-design.ts
│       └── career-explorer.ts
├── dist/                     # Compiled JS
├── package.json
├── tsconfig.json
├── README.md                 # Full documentation
├── EXAMPLES.md              # Detailed examples
└── QUICKSTART.md            # This file
```

## Troubleshooting

**Server won't start:**
- Ensure Node.js 18+ is installed: `node --version`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for port conflicts

**Tools return errors:**
- Verify all required parameters are provided
- Check parameter types and enum values
- See EXAMPLES.md for complete example payloads

**Missing mentors/standards:**
- Add mock data to database constants in tool files
- Or implement real API integration

## Next Steps

1. Read `README.md` for comprehensive documentation
2. Review `EXAMPLES.md` for detailed use cases
3. Edit mock databases to add your school/mentor data
4. Test each tool with example payloads
5. Integrate with your education system

## Support

For questions about:
- **Digital Human Library program:** https://digitalhumanlibrary.com
- **MCP Protocol:** See model context protocol documentation
- **This server:** Review source code in `src/` directory

---

**Ready to mentor? Let's go!**
