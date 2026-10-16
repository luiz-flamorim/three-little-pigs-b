# Role specifications

> Generated from `app/src/data/roles.js` by `npm run docs:roles`. Edit the data file, not this page.
> This is a fictional teaching model. Real agentic systems may use different roles, technologies, controls and approval structures.

| Role | Category |
|------|----------|
| The Three Little Pigs | Customer group (not an AI agent) |
| AI Construction Company | Service provider |
| Orchestrator | Coordinator (AI) |
| Research Agent | Specialist AI agent |
| Architecture Agent | Specialist AI agent |
| Finance Agent | Specialist AI agent |
| Risk Agent | Specialist AI agent |
| Builder Agent | Specialist AI agent |
| Writer Agent | Specialist AI agent |
| Validation Agent | Quality control (AI, separate from the specialists) |
| Human Reviewer | Human oversight (a person, not an agent) |
| Guardrails | Control boundary (not an agent) |
| The Wolf | Threat actor (outside the legitimate workflow) |

## The Three Little Pigs
**Category:** Customer group (not an AI agent)  
**In one line:** Define WHAT they need

**Responsibility:** Describe the problem and the outcome they need. The pigs are customers: they never perform specialist construction work.

### Inputs
- Their problem: the Wolf threatens their home
- Their budget: £90,000 (fictional)
- Their timeframe: 12 weeks (fictional)

### Tasks
- Describe the problem
- Provide the requirements
- Set the budget
- Set delivery expectations
- Define the safety objective
- Receive progress updates
- Review the proposed outcome
- Receive the approved house

### Outputs
- Customer request
- Eight customer requirements
- Feedback on the proposed outcome

### Restrictions
- Customers are not AI agents and never do specialist tasks
- Share project details only through the controlled process
- Receive the house only after human approval and the final check

### Next recipient
- AI Construction Company, received by the Orchestrator

### Escalation conditions
- Requirements conflict: the Human Reviewer helps the customers decide
- A customer account behaves unusually: handled as a security event and reviewed

---

## AI Construction Company
**Category:** Service provider  
**In one line:** Determines HOW the work is done

**Responsibility:** Accept the customer request and deliver it through a coordinated, governed multi-agent workflow, not one giant chatbot.

### Inputs
- Customer request
- Customer requirements
- Budget and timeframe

### Tasks
- Accept the work
- Assign an Orchestrator
- Provide specialist agents, a Validation Agent and a Human Reviewer
- Apply guardrails and security controls
- Deliver only an approved outcome

### Outputs
- A safe, approved house
- The final project report

### Restrictions
- Works as a coordinated system of roles
- Cannot deliver without validation, human approval and the final check

### Next recipient
- Orchestrator (internally)
- Customers (on delivery)

### Escalation conditions
- High-risk or unresolved issues go to the Human Reviewer

---

## Orchestrator — The invisible project manager
**Category:** Coordinator (AI)  
**In one line:** Coordinates. Does not build.

**Responsibility:** Coordinate the workflow: understand, plan, delegate, pass context, monitor, validate, rework and combine. It does not research, design, price or build the house itself.

### Inputs
- Customer goal and requirements
- Status of every task
- Validation results
- Human Reviewer decisions

### Tasks
- Understand the customer goal
- Interpret the requirements
- Break the goal into smaller tasks
- Select the right specialist agent for each task
- Decide the correct order of work
- Pass relevant context between agents
- Track dependencies
- Monitor progress
- Make sure required validation happens
- Stop unapproved work from going ahead
- Return failed outputs to the right agent
- Combine approved outputs
- Escalate high-risk decisions to the Human Reviewer
- Perform a final completeness check
- Present the approved outcome to the customers

### Outputs
- Task plan and order of work
- Context package for each agent
- Combined approved outcome
- Final completeness check

### Restrictions
- Does not do specialist work itself
- Cannot pass on an output that failed validation
- Cannot authorise high-risk decisions on its own

### Next recipient
- Specialist agents (tasks and context)
- Validation Agent (outputs to check)
- Human Reviewer (escalations)
- Customers (approved outcome only)

### Escalation conditions
- A high-risk threat remains unresolved
- An agent or account may have been compromised
- Validation cannot determine a safe answer

---

## Research Agent
**Category:** Specialist AI agent  
**In one line:** Finds evidence

**Responsibility:** Investigate the customers' problem and provide evidence.

### Inputs
- Customer requirements
- Known information about the Wolf
- Approved information sources
- Budget and safety context

### Tasks
- Research suitable building materials
- Gather supporting evidence
- Investigate the Wolf-related threat
- Compare material properties
- Identify available options
- Flag missing or unreliable information

### Outputs
- RESEARCH FINDINGS

### Dependencies
- Confirmed customer requirements
- Task brief from the Orchestrator

### Guardrail
> Must not present unsupported claims as verified facts.

### Restrictions
- Must not present unsupported claims as verified facts
- Uses approved information sources only

### Next recipient
- Validation Agent (check)
- then Architecture Agent
- Risk Agent
- Orchestrator

### Escalation conditions
- Evidence is missing or conflicting on a safety question

---

## Architecture Agent
**Category:** Specialist AI agent  
**In one line:** Designs the house

**Responsibility:** Design a house that meets the validated customer requirements.

### Inputs
- Validated research
- Customer requirements
- Safety criteria
- Initial risk information

### Tasks
- Design the house
- Select suitable materials
- Consider structural strength
- Address customer needs
- Include relevant safety controls
- Document assumptions and dependencies

### Outputs
- PROPOSED HOUSE DESIGN

### Dependencies
- Research findings that passed validation

### Guardrail
> Must not use research that has failed validation.

### Restrictions
- Must not use research that has failed validation
- Must address every known weakness raised by the Risk Agent

### Next recipient
- Validation Agent (check)
- then Finance Agent
- Risk Agent
- Orchestrator

### Escalation conditions
- Customer requirements conflict with each other
- Material safety is uncertain

---

## Finance Agent
**Category:** Specialist AI agent  
**In one line:** Checks the budget

**Responsibility:** Work out whether the proposed design is financially viable.

### Inputs
- Proposed house design
- Material options
- Customer budget
- Current approved version of the design

### Tasks
- Estimate costs
- Compare total cost against the budget
- Identify major cost drivers
- Explain relevant trade-offs
- Flag a budget breach

### Outputs
- COST ASSESSMENT

### Dependencies
- The current approved design

### Guardrail
> Must use the current approved design, not an outdated version.

### Restrictions
- Must use the current approved design, not an outdated version
- Cannot approve a budget breach

### Next recipient
- Orchestrator
- Validation Agent

### Escalation conditions
- The proposal exceeds the agreed budget
- A significant budget or safety trade-off is needed

---

## Risk Agent
**Category:** Specialist AI agent  
**In one line:** Finds weaknesses

**Responsibility:** Identify weaknesses, threats and the controls that address them.

### Inputs
- Customer requirements
- Research findings
- Proposed architecture
- Known Wolf-related threat information

### Tasks
- Identify design weaknesses
- Assess known threats
- Assess project risks
- Recommend controls
- Flag unresolved high-risk issues
- Identify when human review is required

### Outputs
- RISK ASSESSMENT

### Dependencies
- Validated research
- The current approved design

### Guardrail
> Mandatory high-risk issues may not be ignored by another agent.

### Restrictions
- Mandatory high-risk issues may not be ignored by any other agent

### Next recipient
- Architecture Agent (when redesign is needed)
- Orchestrator
- Validation Agent
- Human Reviewer (high-risk exceptions)

### Escalation conditions
- A high-risk threat remains unresolved

---

## Builder Agent
**Category:** Specialist AI agent  
**In one line:** Builds only what is approved

**Responsibility:** Turn the approved design into a construction plan and carry out the approved build.

### Inputs
- Approved architecture
- Approved materials
- Approved cost assessment
- Approved risk controls
- Build authorisation

### Tasks
- Create the build plan
- Set the construction sequence
- Confirm required materials
- Carry out the approved construction
- Record completion status
- Flag deviations from the approved design

### Outputs
- CONSTRUCTED HOUSE AND BUILD RECORD

### Dependencies
- Design approval
- Cost and risk approval
- Human decision on high risks
- Build authorisation

### Guardrail
> Must not begin construction before design approval.

### Restrictions
- Must not begin construction before design approval
- Must not substitute materials

### Next recipient
- Validation Agent (final validation)
- Orchestrator

### Escalation conditions
- Delivered materials do not match the approved list
- The build cannot follow the approved design

---

## Writer Agent
**Category:** Specialist AI agent  
**In one line:** Documents. Cannot approve.

**Responsibility:** Create clear documentation for the customers and reviewers.

### Inputs
- Approved research findings
- Approved design
- Cost assessment
- Risk assessment
- Build record
- Validation result

### Tasks
- Consolidate approved outputs
- Document key decisions
- Explain the design and controls
- Create the final customer proposal
- Record assumptions and approvals
- Produce a clear recommendation

### Outputs
- FINAL PROJECT REPORT

### Dependencies
- All approved outputs
- The final validation result

### Guardrail
> Must not make an incomplete or unsafe solution appear approved.

### Restrictions
- Must not make an incomplete or unsafe solution appear approved
- Cannot approve the solution

### Next recipient
- Validation Agent
- Human Reviewer
- Orchestrator
- Customers (after approval)

### Escalation conditions
- Approvals or records are missing

---

## Validation Agent — The Building Inspector
**Category:** Quality control (AI, separate from the specialists)  
**In one line:** Checks every major output

**Responsibility:** Check each major output against the requirements and acceptance criteria. It checks work; it does not fix it, and it does not replace human accountability.

### Inputs
- The agent output being checked
- Customer requirements
- Acceptance criteria
- Safety rules
- Budget limits
- Risk controls
- Current approved context

### Validation checks
- Does the output satisfy customer requirements?
- Is it supported by approved information?
- Is the design safe?
- Is the cost within budget?
- Are material requirements satisfied?
- Are known risks addressed?
- Is required information complete?
- Are outputs internally consistent?
- Has the correct workflow sequence been followed?
- Are mandatory approvals present?
- Is there evidence of manipulation or hallucination?

### Possible outcomes
- PASS
- FAIL
- RETURN FOR CORRECTION
- ESCALATE TO HUMAN REVIEW

### Restrictions
- Cannot replace human accountability
- Checks work but does not fix it
- When a check fails, downstream tasks stay stopped

### Next recipient
- Orchestrator (every result)
- The responsible agent (on failure, with correction instructions)
- Human Reviewer (on escalation)

### Escalation conditions
- Cannot determine a safe answer
- Evidence of manipulation or hallucination
- A mandatory approval is missing

---

## Human Reviewer
**Category:** Human oversight (a person, not an agent)  
**In one line:** Stays accountable

**Responsibility:** Keep accountability for important decisions. Review escalations and approve the house for occupation.

### Inputs
- Escalated exceptions
- Validation results
- Risk and cost assessments
- Final project report

### Tasks
- Review high-risk decisions
- Review unresolved exceptions
- Review significant budget or safety trade-offs
- Approve or reject the final proposal
- Request changes
- Stop the process when necessary
- Approve the house for occupation

### Possible decisions
- APPROVE
- REJECT
- REQUEST CHANGES
- RETURN TO ORCHESTRATOR
- STOP THE WORKFLOW

### Restrictions
- Every decision is recorded
- Approval is required before anyone moves in

### Next recipient
- Orchestrator (decision)
- Customers (approval for occupation)

### Human approval is mandatory when
- A high-risk threat remains unresolved
- Customer requirements conflict
- An agent may have been compromised
- Material safety is uncertain
- Sensitive information may have been exposed
- A proposal exceeds an agreed boundary
- The validation process cannot determine a safe answer

---

## Guardrails
**Category:** Control boundary (not an agent)  
**In one line:** Define the boundaries

**Responsibility:** Define what agents may and may not do. Guardrails do not perform the work; they set the boundaries within which the work must happen.

### Inputs
- Company policies
- Customer requirements
- Security rules

### Boundaries enforced
- Use approved information sources
- Protect customer information
- Apply least-necessary access
- Do not expose confidential information
- Enforce material safety requirements
- Enforce the customer budget
- Require mandatory risk review
- Require validation checkpoints
- Require human approval for high-risk decisions
- Prevent unapproved construction
- Record key actions and decisions
- Detect unusual behaviour
- Reject unsupported claims
- Stop downstream tasks when validation fails

### Outputs
- Allowed or blocked actions
- Alerts and audit records

### Restrictions
- Never performs specialist work
- Applies to every agent equally

### Next recipient
- Orchestrator (alerts)
- Human Reviewer (serious breaches)

### Escalation conditions
- Attempted breach: block, record and alert
- Unusual behaviour: trigger a monitoring review

---

## The Wolf
**Category:** Threat actor (outside the legitimate workflow)  
**In one line:** Attacks the system

**Responsibility:** None in the workflow. The Wolf is not a customer and not a construction agent. It tries to disrupt the system from outside.

### Inputs
- Whatever it can steal, fake or trick out of the system

### Intentions
- Obtain sensitive project information
- Introduce misleading information
- Manipulate an agent
- Exploit missing controls
- Disrupt the workflow
- Compromise one of the pigs
- Influence material selection
- Sabotage construction
- Damage the completed house

### What it produces
- Interference attempts (shown as dotted red lines)

### Limitations
- Cannot directly control the Orchestrator
- Cannot automatically decide the final outcome
- Cannot bypass a working control without showing how
- Leaves evidence or unusual behaviour that can be detected
- The Human Reviewer and Orchestrator keep authority over the workflow

### Next recipient
- Nobody: the Wolf is never part of the task sequence

### Escalation conditions
- Any detected Wolf activity: alert, pause affected work, Human Reviewer decides
