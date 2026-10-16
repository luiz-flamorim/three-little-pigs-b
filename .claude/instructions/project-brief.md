# Project Brief — THE THREE LITTLE AGENTS

> Original brief supplied by the user on 2026-10-16. This is the authoritative specification. Do not edit; record clarifications in `journal.md` or in a separate file.

Act as a senior AI solution architect, multi-agent systems designer, interaction designer, motion designer, technical storyteller and front-end developer.

Your task is to design and build a polished, working interactive visual demonstration titled:

THE THREE LITTLE AGENTS

Subtitle:

How an AI construction company turns customer requirements into a safe, governed outcome

IMPORTANT WORKING INSTRUCTION

Do not only describe the proposed application.

Create the complete working visual prototype.

Before producing the prototype:

1. Interpret the scenario.
2. Define the workflow.
3. Identify all inputs, outputs, dependencies and decision points.
4. Check that the Three Little Pigs remain customers and are never represented as AI agents.
5. Build the final interactive output.
6. Test all controls, animations and workflow paths.
7. Fix any errors before presenting the result.

Do not ask me to reconfirm the concept unless an essential technical detail is genuinely missing.

## 1. PROJECT PURPOSE

The project uses a familiar version of The Three Little Pigs to explain complex AI concepts to a non-technical audience.

The demonstration must explain:

- What an AI agent is
- What an Orchestrator does
- How several specialist agents collaborate
- Why agents need the correct context
- Why task sequence and dependencies matter
- What guardrails do
- How validation and rework loops operate
- Why human oversight remains necessary
- How a threat actor may disrupt an agentic workflow
- How an insider threat can compromise information
- Why lots of AI activity does not automatically produce a safe outcome

The story is an analogy for a business commissioning a solution from an AI-enabled company.

The application should help people understand the system by watching its behaviour, rather than reading a long technical definition.

## 2. AUDIENCE PROBLEM

People regularly hear terms such as:

- AI agents
- Agentic AI
- Multi-agent systems
- Orchestration
- Guardrails
- Validation
- Human in the loop

However, many people cannot clearly explain:

- How these components connect
- Why one specialist agent may not be enough
- Why several agents do not automatically collaborate effectively
- Why outputs must be checked
- Why sensitive information must be protected
- Why an Orchestrator and human checkpoints are necessary

The demonstration should make those relationships visible and understandable.

## 3. CORE STORY MODEL

The Three Little Pigs are customers.

They are not AI agents.

They do not perform specialist construction tasks.

They approach an AI-powered construction company with a customer problem and a set of requirements.

Their customer request is:

“We need a safe house that protects us from the Wolf, remains within our agreed budget and is delivered within the agreed timeframe.”

The AI construction company accepts the request.

The company uses:

- One Orchestrator
- Several specialist AI agents
- Guardrails
- A Validation Agent
- A Human Reviewer
- Rework loops
- A final approval process

The Wolf is a threat or disruption actor.

The Wolf is not a legitimate construction agent.

## 4. CUSTOMER ROLE

Represent the Three Little Pigs as one customer group.

Customer responsibilities:

- Describe the problem
- Provide the requirements
- Set the budget
- Set delivery expectations
- Define the safety objective
- Receive progress updates
- Review the proposed outcome
- Receive the approved house

Customer requirements:

1. The house must protect the pigs from the Wolf.
2. The house must remain within the agreed budget.
3. The selected materials must satisfy the required safety standard.
4. The design must address known weaknesses.
5. The work must follow a controlled process.
6. The completed house must pass validation.
7. High-risk decisions must receive human approval.
8. The final house must be declared safe to occupy.

Include this simple teaching message:

“The customers define WHAT they need. The AI construction company determines HOW the work is completed.”

## 5. AI CONSTRUCTION COMPANY

The AI construction company is the service provider.

It receives the customer request and delivers the solution through an agentic workflow.

The AI construction company contains:

- Orchestrator
- Research Agent
- Architecture Agent
- Finance Agent
- Risk Agent
- Builder Agent
- Writer Agent
- Validation Agent
- Human Reviewer
- Guardrails and security controls

The company should be represented as a coordinated system, not as one giant chatbot.

## 6. ORCHESTRATOR

The Orchestrator is also called:

THE INVISIBLE PROJECT MANAGER

The Orchestrator is not one of the Three Little Pigs.

The Orchestrator does not personally research, design, price or build the house.

The Orchestrator coordinates the workflow.

Orchestrator responsibilities:

1. Understand the customer goal.
2. Interpret the requirements.
3. Break the goal into smaller tasks.
4. Select the appropriate specialist agent for each task.
5. Determine the correct order of work.
6. Pass relevant context between agents.
7. Track dependencies.
8. Monitor progress.
9. Ensure required validation occurs.
10. Prevent unapproved work from proceeding.
11. Return failed outputs to the appropriate agent.
12. Combine approved outputs.
13. Escalate high-risk decisions to the Human Reviewer.
14. Perform a final completeness check.
15. Present the approved outcome to the customers.

Display this key explanation:

“The Orchestrator does not build the house. It coordinates the system that builds the house.”

Display the Orchestrator workflow:

UNDERSTAND → PLAN → DELEGATE → PASS CONTEXT → MONITOR → VALIDATE → REWORK → COMBINE

## 7. SPECIALIST AI AGENTS

Each specialist agent must have:

- A clear role
- Required inputs
- Defined tasks
- Expected outputs
- Dependencies
- Guardrails
- An explicit next destination for its output

Do not represent the pigs as any of these agents.

### 7.1 RESEARCH AGENT

Purpose: Investigate the customer's problem and provide evidence.

Inputs: Customer requirements; Known information about the Wolf; Approved information sources; Budget and safety context

Tasks: Research suitable building materials; Gather supporting evidence; Investigate the Wolf-related threat; Compare material properties; Identify available options; Flag missing or unreliable information

Output: RESEARCH FINDINGS

Output destinations: Architecture Agent; Risk Agent; Orchestrator

Guardrail: The Research Agent must not present unsupported claims as verified facts.

### 7.2 ARCHITECTURE AGENT

Purpose: Design a house that addresses the validated customer requirements.

Inputs: Validated research; Customer requirements; Safety criteria; Initial risk information

Tasks: Design the house; Select suitable materials; Consider structural strength; Address customer needs; Incorporate relevant safety controls; Document assumptions and dependencies

Output: PROPOSED HOUSE DESIGN

Output destinations: Finance Agent; Risk Agent; Orchestrator

Guardrail: The Architecture Agent must not use research that has failed validation.

### 7.3 FINANCE AGENT

Purpose: Determine whether the proposed design is financially viable.

Inputs: Proposed house design; Material options; Customer budget; Current approved version of the design

Tasks: Estimate costs; Compare total cost against budget; Identify major cost drivers; Explain relevant trade-offs; Flag a budget breach

Output: COST ASSESSMENT

Output destinations: Orchestrator; Validation Agent

Guardrail: The Finance Agent must use the current approved design, not an outdated version.

### 7.4 RISK AGENT

Purpose: Identify weaknesses, threats and controls.

Inputs: Customer requirements; Research findings; Proposed architecture; Known Wolf-related threat information

Tasks: Identify design weaknesses; Assess known threats; Assess project risks; Recommend controls; Flag unresolved high-risk issues; Identify when human review is required

Output: RISK ASSESSMENT

Output destinations: Architecture Agent, when redesign is needed; Orchestrator; Validation Agent; Human Reviewer, for high-risk exceptions

Guardrail: Mandatory high-risk issues may not be ignored by another agent.

### 7.5 BUILDER AGENT

Purpose: Turn the approved design into a construction plan and execute the approved build.

Inputs: Approved architecture; Approved materials; Approved cost assessment; Approved risk controls; Build authorisation

Tasks: Create the build plan; Establish the construction sequence; Confirm required materials; Execute the approved construction process; Record completion status; Flag deviations from the approved design

Output: CONSTRUCTED HOUSE AND BUILD RECORD

Output destinations: Validation Agent; Orchestrator

Guardrail: The Builder Agent must not begin construction before design approval.

### 7.6 WRITER AGENT

Purpose: Create clear documentation for the customers and reviewers.

Inputs: Approved research findings; Approved design; Cost assessment; Risk assessment; Build record; Validation result

Tasks: Consolidate approved outputs; Document key decisions; Explain the design and controls; Create the final customer proposal; Record assumptions and approvals; Produce a clear recommendation

Output: FINAL PROJECT REPORT

Output destinations: Validation Agent; Human Reviewer; Orchestrator; Customers after approval

Guardrail: The Writer Agent must not make an incomplete or unsafe solution appear approved.

## 8. VALIDATION AGENT

The Validation Agent should be visually represented as: THE BUILDING INSPECTOR

The Validation Agent is separate from the specialist agents.

Inputs: Relevant agent output; Customer requirements; Acceptance criteria; Safety rules; Budget limits; Risk controls; Current approved context

Validation checks:

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

Possible validation outcomes: 1. PASS 2. FAIL 3. RETURN FOR CORRECTION 4. ESCALATE TO HUMAN REVIEW

If validation fails:

- Identify the failed criterion
- Identify the responsible agent
- Return the output to that agent
- Include clear correction instructions
- Do not allow subsequent tasks to proceed
- Revalidate the revised output

Visually show the rework loop:

VALIDATION FAILS → RETURN TO RESPONSIBLE AGENT → CORRECT OUTPUT → RESUBMIT → REVALIDATE

Include this teaching message:

“Producing an answer is not the same as producing an approved answer.”

## 9. HUMAN REVIEWER

The Human Reviewer retains accountability for important decisions.

Responsibilities: Review high-risk decisions; Review unresolved exceptions; Review significant budget or safety trade-offs; Approve or reject the final proposal; Request changes; Stop the process when necessary; Approve the house for occupation

Possible decisions: APPROVE; REJECT; REQUEST CHANGES; RETURN TO ORCHESTRATOR; STOP THE WORKFLOW

Human approval is mandatory when:

- A high-risk threat remains unresolved
- Customer requirements conflict
- An agent may have been compromised
- Material safety is uncertain
- Sensitive information may have been exposed
- A proposal exceeds an agreed boundary
- The validation process cannot determine a safe answer

## 10. GUARDRAILS

Represent guardrails as boundaries surrounding the legitimate workflow.

Guardrails are not specialist agents.

Guardrails define what agents may and may not do.

Include these guardrails:

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

Display this explanation:

“Guardrails do not perform the work. Guardrails define the boundaries within which the work must happen.”

## 11. THE WOLF

The Wolf is a threat or disruption actor. The Wolf is not a customer. The Wolf is not a legitimate construction agent. The Wolf exists outside the normal company workflow.

Wolf intentions: Obtain sensitive project information; Introduce misleading information; Manipulate an agent; Exploit missing controls; Disrupt the workflow; Compromise one of the pigs; Influence material selection; Sabotage construction; Damage the completed house

Wolf limitations:

- The Wolf cannot directly control the Orchestrator
- The Wolf cannot automatically determine the final outcome
- The Wolf cannot bypass a successful control without demonstrating how
- The Wolf's actions must be detectable through evidence or unusual behaviour
- The Human Reviewer and Orchestrator retain authority over the legitimate workflow

Use dotted red lines to show attempted interference.

Do not include the Wolf in the standard task sequence.

Display this explanation:

“The Wolf attacks the system. The Wolf is not part of the legitimate construction team.”

## 12. INSIDER-THREAT SCENARIO

Include a controlled optional scenario where the Wolf secretly compromises one pig.

Remember: The compromised pig remains a customer. The compromised pig does not become an AI construction agent.

Scenario:

1. The Wolf secretly persuades one pig to share project information.
2. The other pigs do not initially know.
3. The compromised pig may reveal sensitive information about: Requirements; House weaknesses; Project status; Access arrangements
4. The Wolf uses the information to gain leverage.
5. The compromised pig later refuses to open the completed house to the Wolf.
6. The Wolf feels betrayed and threatens to reveal the secret agreement.
7. Unusual behaviour triggers monitoring or review.
8. The Orchestrator pauses the workflow where appropriate.
9. The compromised pig's access to sensitive project information is restricted.
10. The matter is escalated to the Human Reviewer.
11. The system assesses whether any work must be repeated.
12. The customer group is informed through an appropriate controlled process.

The purpose of this scenario is to explain: Insider threats; Compromised identities; Sensitive-information exposure; Least-privilege access; Monitoring; Incident response; Human intervention; Recovery after compromise

Do not portray the insider scenario as a judgement about the pig's personal character. Treat it as a security event affecting the system.

## 13. NORMAL WORKFLOW

Animate the legitimate controlled sequence:

CUSTOMERS → CUSTOMER REQUIREMENTS → AI CONSTRUCTION COMPANY → ORCHESTRATOR → RESEARCH AGENT → VALIDATION CHECK → ARCHITECTURE AGENT → VALIDATION CHECK → FINANCE AGENT AND RISK AGENT → VALIDATION CHECK → HUMAN REVIEW IF REQUIRED → BUILDER AGENT → FINAL VALIDATION → WRITER AGENT → HUMAN APPROVAL → ORCHESTRATOR FINAL CHECK → SAFE HOUSE DELIVERED TO THE CUSTOMERS

The application must also show context moving between agents.

Each hand-off must visibly identify: What information is moving; Who produced it; Who receives it; Whether it has been validated; What happens if it fails

## 14. FAILURE VERSION

Create a scenario titled: WITHOUT EFFECTIVE ORCHESTRATION

Show: Agents starting independently; Duplicate work; Tasks occurring in the wrong order; Missing context; Conflicting assumptions; Finance using an outdated design; Builder starting before approval; Risk findings being ignored; Writer presenting incomplete work as final; No validation checkpoints; No human review; The Wolf exploiting a weakness; The house failing

Display: “Many agents are active. No coordinated outcome exists.”

Final failure outcome: UNSAFE HOUSE / CUSTOMER REQUIREMENTS NOT MET / WORK MUST BE REDONE

Do not portray this as the agents being unintelligent or malicious. The system design and missing controls are the problem.

## 15. CONTROLLED VERSION

Create a scenario titled: WITH ORCHESTRATION, GUARDRAILS AND HUMAN OVERSIGHT

Show: Customer requirements captured clearly; Orchestrator decomposing the goal; Correct task sequence; Context passed between agents; One approved source of truth; Guardrails applied; Validation after major outputs; Rejected work returned for correction; Threat indicators raising alerts; High-risk decisions escalated to a human; Final approval before occupation; Safe house delivered to the pigs

Final controlled outcome: SAFE HOUSE / WITHIN BUDGET / KNOWN RISKS ADDRESSED / VALIDATION PASSED / HUMAN APPROVED / SAFE TO OCCUPY

## 16. FINAL ORCHESTRATOR CHECK

After validation and human approval, the Orchestrator performs one final completeness check. It verifies: All mandatory tasks are complete; All failed work has been corrected; All required outputs are present; Customer requirements are satisfied; Budget status is approved; Risk status is acceptable; Validation has passed; Human approval is recorded; The house is safe to occupy; The final customer report is complete. Only then may the outcome be delivered to the pigs.

## 17. KEY TEACHING MESSAGE

End the experience with:

“The pigs define the outcome.
Agents perform specialist work.
The Orchestrator coordinates the workflow.
Guardrails define the boundaries.
Validation checks the outputs.
Humans oversee important decisions.
The Wolf demonstrates how a system can be threatened or compromised.”

Then show: SAME STORY. A NEW WAY TO UNDERSTAND AI.

## 18. VISUAL EXPERIENCE

Animated interactive web experience, not a static report. Dark navy or charcoal background; modern technology aesthetic; clean Miro-inspired information architecture; colour-coded cards and sticky-note elements; clear connecting lines and arrows; animated information packets; soft glows; clear typography; large readable headings; minimal wording on cards; detail via tooltips or expandable panels; accessible contrast; responsive; presentation-friendly 16:9 desktop; mobile-friendly vertical adaptation.

Colours: Customers blue; Company purple; Orchestrator amber; Research cyan; Architecture pink; Finance yellow; Risk violet; Builder green; Writer light blue; Validation teal; Human Review orange; Guardrails gold; Wolf/Threat red; Failure path red; Controlled path green; Final outcome emerald. Do not use colours so heavily that it becomes childish or cluttered.

## 19. REQUIRED SCENES

1. THE CUSTOMERS — pigs as customers + requirements
2. THE AI CONSTRUCTION COMPANY — company accepting the work
3. THE ORCHESTRATOR — goal divided into tasks
4. THE SPECIALIST AGENTS — each specialist and responsibility
5. WITHOUT ORCHESTRATION — duplication, missing context, conflict, failure
6. WITH ORCHESTRATION — coordinated sequencing and context transfer
7. GUARDRAILS AND VALIDATION — boundaries, acceptance criteria, rework loop
8. THE WOLF — external disruption and attempted interference
9. OPTIONAL INSIDER THREAT — one customer identity compromised and the response
10. HUMAN OVERSIGHT — escalation and approval
11. FINAL CHECK — Orchestrator confirming completion
12. THE OUTCOME — safe house delivered + key learning message

## 20. INTERACTIVITY

Play story; Pause; Restart; Previous scene; Next scene; Clickable scene indicators; Overall progress bar; Without orchestration mode; With orchestration mode; Compare modes side by side; Enable Wolf disruption; Enable insider-threat scenario; Reset threat scenario; Clickable customers, Orchestrator, specialist agents, Validation Agent, Human Reviewer, Guardrails, Wolf; Expandable role panels; Visible information hand-offs; Visible pass/fail decisions; Animated rework loop; Final outcome summary.

When a role is selected show: Role name; Role category; Responsibility; Inputs; Tasks; Outputs; Restrictions; Next recipient; Escalation conditions.

## 21. TECHNICAL IMPLEMENTATION

React; Tailwind CSS; Framer Motion; Lucide React icons. No backend; no external API; fictional teaching data only; reusable components; content in structured arrays/objects; scenario states easy to edit; purposeful Framer Motion animation; Lucide for UI icons; CSS or emoji for pigs, Wolf, house; no unavailable image assets; runs in preview environment and locally with standard npm commands.

Suggested components: App, Header, SceneNavigator, StoryStage, CustomerCard, CompanyCard, OrchestratorNode, AgentNode, ValidationNode, HumanReviewNode, GuardrailBoundary, WolfThreatNode, InsiderThreatState, WorkflowConnection, InformationPacket, DecisionGateway, ReworkLoop, OutcomePanel, CompareMode.

## 22. ANIMATION REQUIREMENTS

Animate: request entering company; Orchestrator breaking request into tasks; agents activating only on approved inputs; context packets travelling; validation status changing; failed outputs returning to responsible agent; guardrail boundaries reacting to breach; Wolf interference as dotted red activity; insider-threat communication separate from legitimate flow; human escalation; final approval; house assembly; final handover. Failure version increasingly disorganised; controlled version ordered and traceable. No decorative animation that doesn't explain the workflow.

## 23. LANGUAGE AND ACCESSIBILITY

Simple British English; explain specialist language; no assumed technical knowledge; no long paragraphs on stage. Clear headings; short labels; tooltips; expandable descriptions; captions; keyboard-accessible controls; high contrast; visible focus states; reduced-motion support; descriptive ARIA labels.

## 24. ACCURACY RULES

- Do not turn the Three Little Pigs into AI agents.
- Do not make the Wolf a legitimate construction agent.
- Do not make Guardrails a specialist worker.
- Do not make the Orchestrator perform every specialist task.
- Do not let later agents work with an output that failed validation.
- Do not allow the Builder Agent to begin before approval.
- Do not allow the Writer Agent to approve the solution.
- Do not allow the Validation Agent to replace human accountability.
- Do not claim that all real multi-agent systems use this exact architecture.
- Do not present the fictional scenario as a real building standard.
- Do not expose hidden chain-of-thought or private reasoning.
- Do not use real customer or confidential data.
- Do not imply that AI can independently authorise high-risk outcomes without review.

Include note: “This is a fictional teaching model. Real agentic systems may use different roles, technologies, controls and approval structures.”

## 25. QUALITY CHECK

1. Pigs are customers in every scene. 2. All role arrows flow correctly. 3. Wolf outside legitimate workflow. 4. Guardrails surround/govern workflow. 5. Every agent has inputs and outputs. 6. Validation failures return to correct agent. 7. Human approval required for high-risk decisions. 8. Controlled and failure versions clearly different. 9. Every interactive control works. 10. Animation stops after final scene. 11. Restart returns to Scene 1. 12. Previous/Next respect scene boundaries. 13. Comparison mode works. 14. Responsive. 15. Keyboard accessible. 16. No unused imports/variables. 17. No React errors/warnings. 18. Renders immediately.

## 26. REQUIRED OUTPUT

1. Complete working React prototype. 2. All files and contents. 3. Clear file structure. 4. Local setup/run instructions. 5. Concise architecture explanation. 6. Scene-by-scene storyboard. 7. List of implemented interactions. 8. List of assumptions. 9. 90-second narration script. 10. Markdown specification for each role. 11. Single-page Miro-style visual summary matching the app architecture.

Build the complete working prototype — not pseudocode or only a plan. Use an Artifact to build and preview it. If too large for one file, create a clean project structure. Keep scenario content in structured configuration objects (agents, requirements, guardrails, threat behaviour) editable without rewriting visual components. After generation, inspect the rendered result and correct any layout overlap, unreadable text, broken state transition, missing arrow or animation issue.
