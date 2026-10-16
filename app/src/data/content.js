// Story content: the customer request, requirements, guardrails, plans, checks, decisions and messages.
// All figures are fictional teaching data.

export const PROJECT = {
  title: 'THE THREE LITTLE AGENTS',
  subtitle: 'How an AI construction company turns customer requirements into a safe, governed outcome',
  budget: '£90,000',
  timeframe: '12 weeks',
  standard: 'Wolf-Resistance Level 3',
  disclaimer:
    'This is a fictional teaching model. Real agentic systems may use different roles, technologies, controls and approval structures.',
};

export const CUSTOMER_REQUEST =
  'We need a safe house that protects us from the Wolf, remains within our agreed budget and is delivered within the agreed timeframe.';

export const REQUIREMENTS = [
  { id: 'R1', short: 'Protects us from the Wolf', text: 'The house must protect the pigs from the Wolf.' },
  { id: 'R2', short: 'Stays within budget', text: 'The house must remain within the agreed budget.' },
  { id: 'R3', short: 'Materials meet the safety standard', text: 'The selected materials must satisfy the required safety standard.' },
  { id: 'R4', short: 'Known weaknesses addressed', text: 'The design must address known weaknesses.' },
  { id: 'R5', short: 'Controlled process', text: 'The work must follow a controlled process.' },
  { id: 'R6', short: 'Passes validation', text: 'The completed house must pass validation.' },
  { id: 'R7', short: 'Humans approve high risks', text: 'High-risk decisions must receive human approval.' },
  { id: 'R8', short: 'Declared safe to occupy', text: 'The final house must be declared safe to occupy.' },
];

export const ORCHESTRATOR_STEPS = ['UNDERSTAND', 'PLAN', 'DELEGATE', 'PASS CONTEXT', 'MONITOR', 'VALIDATE', 'REWORK', 'COMBINE'];

// The Orchestrator's task plan (Scene 3). `needs` lists task numbers that must be approved first.
export const TASK_PLAN = [
  { n: 1, title: 'Research materials and the Wolf threat', role: 'research', needs: [] },
  { n: 2, title: 'Design the house', role: 'architecture', needs: [1] },
  { n: 3, title: 'Check the cost against the budget', role: 'finance', needs: [2] },
  { n: 4, title: 'Assess risks and controls', role: 'risk', needs: [1, 2] },
  { n: 5, title: 'Human review of high risks', role: 'human', needs: [4] },
  { n: 6, title: 'Build the approved design', role: 'builder', needs: [3, 4, 5] },
  { n: 7, title: 'Write the final report', role: 'writer', needs: [6] },
  { n: 8, title: 'Validate every major output', role: 'validation', needs: [] , note: 'after every step' },
];

export const AGENT_DEFINITION =
  'An AI agent is software that is given a goal, some tools and some information, and then carries out tasks with a degree of independence, within limits.';

export const GLOSSARY = [
  { term: 'AI agent', text: AGENT_DEFINITION },
  { term: 'Multi-agent system', text: 'Several agents, each with a specialist job, working on one larger goal.' },
  { term: 'Orchestrator', text: 'The coordinator. It plans the work, hands out tasks, passes context and checks progress. It does not do the specialist work.' },
  { term: 'Context', text: 'The information an agent needs to do its task well: requirements, approved earlier work and the current version of the design.' },
  { term: 'Guardrails', text: 'Rules and controls that set what agents may and may not do. They are boundaries, not workers.' },
  { term: 'Validation', text: 'Checking an output against agreed criteria before anyone else may use it.' },
  { term: 'Rework loop', text: 'A failed output goes back to the agent that made it, with instructions, and is checked again.' },
  { term: 'Human in the loop', text: 'A person reviews and approves important or high-risk decisions and stays accountable for them.' },
  { term: 'Threat actor', text: 'Someone outside the legitimate team who tries to disrupt or exploit the system.' },
  { term: 'Prompt injection', text: 'Hiding instructions inside content an agent reads, hoping the agent will follow them.' },
  { term: 'Insider threat', text: 'Risk from someone with legitimate access whose access or information is misused.' },
  { term: 'Least privilege', text: 'Giving each person or agent only the access they need for their task, and no more.' },
];

export const GUARDRAILS = [
  { id: 'g-sources', text: 'Use approved information sources' },
  { id: 'g-protect', text: 'Protect customer information' },
  { id: 'g-least', text: 'Apply least-necessary access' },
  { id: 'g-confidential', text: 'Do not expose confidential information' },
  { id: 'g-materials', text: 'Enforce material safety requirements' },
  { id: 'g-budget', text: 'Enforce the customer budget' },
  { id: 'g-risk', text: 'Require mandatory risk review' },
  { id: 'g-checkpoints', text: 'Require validation checkpoints' },
  { id: 'g-human', text: 'Require human approval for high-risk decisions' },
  { id: 'g-construction', text: 'Prevent unapproved construction' },
  { id: 'g-record', text: 'Record key actions and decisions' },
  { id: 'g-unusual', text: 'Detect unusual behaviour' },
  { id: 'g-claims', text: 'Reject unsupported claims' },
  { id: 'g-stop', text: 'Stop downstream tasks when validation fails' },
];

// Scene 7: the inspector checks Design v1 against these criteria. `fails` marks the one that fails on the first attempt.
export const VALIDATION_CHECKS = [
  { id: 'v1', text: 'Meets customer requirements?' },
  { id: 'v2', text: 'Supported by approved information?' },
  { id: 'v3', text: 'Design is safe?' },
  { id: 'v4', text: 'Cost within budget?' },
  { id: 'v5', text: 'Material requirements met?' },
  { id: 'v6', text: 'Known risks addressed?', fails: 'Front door weakness (R4) not addressed' },
  { id: 'v7', text: 'Required information complete?' },
  { id: 'v8', text: 'Outputs consistent?' },
  { id: 'v9', text: 'Correct sequence followed?' },
  { id: 'v10', text: 'Mandatory approvals present?' },
  { id: 'v11', text: 'No sign of manipulation or hallucination?' },
];

export const VALIDATION_OUTCOMES = [
  { id: 'pass', label: 'PASS', status: 'pass' },
  { id: 'fail', label: 'FAIL', status: 'fail' },
  { id: 'return', label: 'RETURN FOR CORRECTION', status: 'return' },
  { id: 'escalate', label: 'ESCALATE TO HUMAN REVIEW', status: 'escalate' },
];

export const REWORK_STEPS = ['VALIDATION FAILS', 'RETURN TO RESPONSIBLE AGENT', 'CORRECT OUTPUT', 'RESUBMIT', 'REVALIDATE'];

export const CORRECTION = {
  output: 'House design v1',
  criterion: 'Known risks addressed? (requirement R4)',
  responsible: 'architecture',
  instructions: 'Reinforce the front door and add a lock specification. Resubmit as v2.',
};

// Scene 10: escalations that reach the Human Reviewer. `insiderOnly` cases appear only when the insider scenario is on.
export const HUMAN_DECISIONS = [
  { id: 'APPROVE', label: 'Approve', effect: 'Work continues to the next step. The approval is recorded.' },
  { id: 'REJECT', label: 'Reject', effect: 'The proposal is refused. It cannot be used anywhere in the workflow.' },
  { id: 'REQUEST CHANGES', label: 'Request changes', effect: 'The responsible agent corrects the output, then it is validated again.' },
  { id: 'RETURN TO ORCHESTRATOR', label: 'Return to Orchestrator', effect: 'The Orchestrator re-plans: more evidence or a different agent is needed.' },
  { id: 'STOP THE WORKFLOW', label: 'Stop the workflow', effect: 'Affected work stops until the issue is resolved. Nothing moves forward.' },
];

export const ESCALATIONS = [
  {
    id: 'chimney',
    from: 'risk',
    title: 'Chimney is an open entry point',
    detail: 'Risk Agent rates this HIGH. A chimney guard costs £3,000 and keeps the total within budget.',
    trigger: 'A high-risk threat remains unresolved',
    decision: 'REQUEST CHANGES',
    outcome: 'Chimney guard added to the design, then revalidated.',
  },
  {
    id: 'straw-offer',
    from: 'finance',
    title: 'Unknown supplier offers straw at 90% off',
    detail: 'Finance Agent flags an unusual price. Straw does not meet the Wolf-Resistance standard.',
    trigger: 'A proposal exceeds an agreed boundary',
    decision: 'REJECT',
    outcome: 'Offer rejected and recorded as suspected Wolf activity.',
  },
  {
    id: 'certificate',
    from: 'validation',
    title: 'Brick test certificate is missing',
    detail: 'The inspector cannot confirm that a new batch of bricks meets the standard.',
    trigger: 'The validation process cannot determine a safe answer',
    decision: 'RETURN TO ORCHESTRATOR',
    outcome: 'Orchestrator asks Research for approved test evidence before work continues.',
  },
  {
    id: 'exposure',
    from: 'orchestrator',
    title: 'Project details may have been exposed',
    detail: 'Monitoring found unusual access from one customer account.',
    trigger: 'Sensitive information may have been exposed',
    decision: 'STOP THE WORKFLOW',
    outcome: 'Door and access work stops until locks are re-keyed and the design is re-checked.',
    insiderOnly: true,
  },
  {
    id: 'occupation',
    from: 'writer',
    title: 'Final proposal: approve for occupation?',
    detail: 'All checks passed. The Writer Agent documented the work but cannot approve it.',
    trigger: 'Approval is required before anyone moves in',
    decision: 'APPROVE',
    outcome: 'The house is approved for occupation. Decision recorded.',
  },
];

// Scene 11: the Orchestrator's final completeness check.
export const FINAL_CHECKS = [
  { text: 'All mandatory tasks are complete', evidence: '7 of 7 tasks closed' },
  { text: 'All failed work has been corrected', evidence: 'Design v1 → v2 revalidated' },
  { text: 'All required outputs are present', evidence: 'Research, design, cost, risk, build, report' },
  { text: 'Customer requirements are satisfied', evidence: 'R1–R8 traced to evidence' },
  { text: 'Budget status is approved', evidence: '£87,000 of £90,000' },
  { text: 'Risk status is acceptable', evidence: 'Chimney guard fitted; no open high risks' },
  { text: 'Validation has passed', evidence: 'Final validation: PASS' },
  { text: 'Human approval is recorded', evidence: 'Human Reviewer: APPROVE' },
  { text: 'The house is safe to occupy', evidence: 'Wolf-Resistance Level 3 met' },
  { text: 'The final customer report is complete', evidence: 'Report signed off' },
];

export const CONTROLLED_OUTCOME = ['SAFE HOUSE', 'WITHIN BUDGET', 'KNOWN RISKS ADDRESSED', 'VALIDATION PASSED', 'HUMAN APPROVED', 'SAFE TO OCCUPY'];
export const FAILURE_OUTCOME = ['UNSAFE HOUSE', 'CUSTOMER REQUIREMENTS NOT MET', 'WORK MUST BE REDONE'];

export const KEY_MESSAGE = [
  { role: 'customers', text: 'The pigs define the outcome.' },
  { role: 'research', text: 'Agents perform specialist work.' },
  { role: 'orchestrator', text: 'The Orchestrator coordinates the workflow.' },
  { role: 'guardrails', text: 'Guardrails define the boundaries.' },
  { role: 'validation', text: 'Validation checks the outputs.' },
  { role: 'human', text: 'Humans oversee important decisions.' },
  { role: 'wolf', text: 'The Wolf demonstrates how a system can be threatened or compromised.' },
];

export const QUOTES = {
  customers: 'The customers define WHAT they need. The AI construction company determines HOW the work is completed.',
  orchestrator: 'The Orchestrator does not build the house. It coordinates the system that builds the house.',
  guardrails: 'Guardrails do not perform the work. Guardrails define the boundaries within which the work must happen.',
  validation: 'Producing an answer is not the same as producing an approved answer.',
  wolf: 'The Wolf attacks the system. The Wolf is not part of the legitimate construction team.',
  failure: 'Many agents are active. No coordinated outcome exists.',
  tagline: ['SAME STORY.', 'A NEW WAY TO UNDERSTAND AI.'],
};
