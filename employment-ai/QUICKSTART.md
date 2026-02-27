# Employment AI MCP Server — Quick Start Guide

## 30-Second Setup

```bash
cd /sessions/brave-adoring-cerf/mcp-servers/employment-ai
npm install
npm run build
npm start
```

## Two Tools, Two Seconds Each

### Tool 1: Hiring AI Compliance Assessment

```bash
Tool Name: hiring_ai_compliance

Input:
  system_name: "Your hiring AI name"
  ai_function: "resume screening | video interview | ranking | skills assessment"
  data_inputs: "resumes, video, assessments, social media"
  jurisdiction: "US/NYC | EU | UK | Global"

Output:
  • Risk level
  • EU AI Act classification
  • Applicable regulations (20+ laws)
  • Bias assessment requirements
  • Transparency requirements
  • Candidate rights (7+)
  • Audit requirements
  • 10-step remediation roadmap
```

### Tool 2: Workplace Surveillance Compliance

```bash
Tool Name: workplace_surveillance_compliance

Input:
  system_name: "Your monitoring system name"
  monitoring_type: "keystroke | email | video | location | emotion"
  data_collected: "what data is monitored"
  jurisdiction: "US | EU | UK | Global"

Output:
  • Risk classification
  • Applicable regulations
  • Employee rights (7+)
  • 6-point proportionality test
  • Prohibited practices
  • 8-step remediation roadmap
```

## Key Regulations at a Glance

### US
- **NYC Local Law 144** — Annual bias audit required
- **EEOC Guidance** — Four-Fifths Rule (80% selection rate)
- **Title VII** — Disparate impact liability
- **ADA** — Accommodation for disabilities
- **ECPA** — Electronic surveillance limits

### EU
- **EU AI Act** — Hiring/surveillance AI = HIGH RISK
- **EU AI Act** — Emotion recognition = PROHIBITED
- **GDPR Article 22** — Right not to be subject to automated decisions
- **Platform Workers Directive** — Algorithmic management rights

### UK
- **Equality Act 2010** — AI discrimination liability

## Most Critical Requirements

### For Hiring AI
1. ✓ Bias audit for disparate impact
2. ✓ Notify candidates 10 days before (NYC LL144)
3. ✓ Human review option for all candidates
4. ✓ Post bias audit summary on website
5. ✓ Candidate rights portal (access, explanation, deletion)

### For Workplace Surveillance
1. ✓ REMOVE emotion recognition (EU AI Act prohibition)
2. ✓ Notify employees about monitoring
3. ✓ Conduct proportionality assessment
4. ✓ Minimize data collection
5. ✓ Provide employee data access

## 5-Step Compliance Roadmap

### Hiring AI

**Week 1:** Assess
- Run hiring_ai_compliance tool with your system details
- Identify applicable regulations
- Plan bias audit requirements

**Week 2:** Audit
- Hire third-party bias auditor
- Conduct selection rate analysis
- Test for disparate impact (Four-Fifths Rule)

**Week 3:** Implement
- Create candidate notification system
- Build human review process
- Develop data rights portal

**Week 4-12:** Deploy & Monitor
- Deploy with notifications and human review
- Monthly disparate impact monitoring
- Quarterly HR training

**Year 1+:** Maintain Compliance
- Annual third-party audit
- Publish bias audit summary
- Track hiring outcomes
- Update policies as needed

### Workplace Surveillance

**Week 1:** Audit
- Run workplace_surveillance_compliance tool
- Review current monitoring practices
- Check for emotion recognition (PROHIBITED in EU)

**Week 2:** Redesign
- Remove prohibited surveillance types
- Implement employee notification
- Develop proportionality assessment

**Week 3:** Implement
- Create employee data access portal
- Establish contestation process
- Negotiate with employee reps/union

**Week 4:** Deploy
- Roll out with transparency
- Monitor employee feedback
- Track compliance issues

**Year 1+:** Annual Review
- Conduct surveillance impact assessment
- Update policies with employee input
- Renew proportionality assessment

## Red Flags — Stop Immediately

### Hiring AI Red Flags
- No bias audit conducted
- Selection rates not tracked by demographic
- No candidate notification system
- No human review fallback
- Training data never audited for bias
- Emotion/sentiment analysis from video (PROHIBITED in EU)

### Workplace Surveillance Red Flags
- Emotion/sentiment recognition active (PROHIBITED)
- No employee notification
- Continuous keystroke logging without justification
- After-hours monitoring
- Personal device monitoring
- Union activity monitoring
- No employee data access

## Resource Links

- **API Reference:** See API_REFERENCE.md
- **Deployment Guide:** See DEPLOYMENT.md
- **Examples:** See EXAMPLES.md
- **Full Structure:** See STRUCTURE.md

## Common Questions

### Q: Do I need to audit my hiring AI?
**A:** YES. Even if not in NYC, bias auditing is best practice and required by EEOC and EU AI Act.

### Q: What's the Four-Fifths Rule?
**A:** Selection rate for any group cannot fall below 80% of the highest group's rate. If white candidates have 25% selection rate, other groups must have at least 20%.

### Q: Can I use emotion recognition in interviews?
**A:** NO in EU (prohibited by AI Act Article 5(1)(f)). In US, proceed with extreme caution due to accuracy issues per NIST FRVT.

### Q: Must I tell candidates about hiring AI?
**A:** YES. NYC LL144 requires 10-day notification. GDPR requires meaningful information. Illinois requires written consent.

### Q: Can I monitor keystrokes?
**A:** Only if justified by legitimate business need AND proportionate. EU requires strict proportionality. Continuous keystroke logging rarely meets this standard.

### Q: What if my AI has disparate impact?
**A:** Document findings, identify root cause, develop alternative selection procedure with lower impact, implement bias corrections, conduct follow-up audit.

### Q: How long must I keep audit records?
**A:** NYC: 4 years minimum. EU: 5 years minimum. EEOC: 1 year minimum (some claims longer).

## Next Steps

1. **Install & Build**
   ```bash
   npm install && npm run build
   ```

2. **Run the Server**
   ```bash
   npm start
   ```

3. **Assess Your System**
   - Use `hiring_ai_compliance` for hiring AI
   - Use `workplace_surveillance_compliance` for monitoring

4. **Review Outputs**
   - Note applicable regulations
   - Review remediation roadmap
   - Plan implementation

5. **Consult Experts**
   - Employment law attorney
   - AI governance specialist
   - Data protection officer
   - I-O psychologist (for bias assessment)

## Legal Notice

This tool provides technical compliance assessment. It is NOT legal advice. Consult qualified employment law and privacy attorneys before implementing any AI system affecting employees or candidates. Liability for non-compliance is the responsibility of the organization using the system.

## Support

For technical issues with the MCP server: See API_REFERENCE.md and DEPLOYMENT.md
For regulatory interpretation: Consult qualified legal counsel
For bias testing execution: Engage third-party auditor
For implementation strategy: Consult AI governance expert

---

**Ready?** Run `npm start` and integrate this MCP server with Claude or your AI platform.

**Questions?** Review the full documentation:
- README.md — Overview
- DEPLOYMENT.md — Setup & integration
- API_REFERENCE.md — Tool specifications
- EXAMPLES.md — Real-world use cases
- STRUCTURE.md — Project architecture
