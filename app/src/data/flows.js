// Workflow diagrams. Positions are in canvas units: "wide" is 1600×900 (16:9 desktop), "tall" is 900×1340 (phones).
// Each step lists the packets that move, the hand-off details, and the node states it changes.

export const CANVAS = { wide: [1600, 900], tall: [900, 1340] };

export const POS = {
  customers: { wide: [140, 450], tall: [450, 75] },
  orchestrator: { wide: [800, 140], tall: [450, 270] },
  research: { wide: [385, 430], tall: [165, 470] },
  architecture: { wide: [595, 430], tall: [450, 470] },
  finance: { wide: [805, 345], tall: [735, 470] },
  risk: { wide: [805, 525], tall: [735, 660] },
  builder: { wide: [1012, 430], tall: [450, 660] },
  writer: { wide: [1215, 430], tall: [165, 660] },
  validation: { wide: [640, 750], tall: [265, 890] },
  human: { wide: [1060, 750], tall: [640, 890] },
  house: { wide: [1465, 450], tall: [450, 1210] },
  wolf: { wide: [1480, 105], tall: [760, 75] },
};

// The guardrail boundary drawn around the company's legitimate workflow.
export const BOUNDARY = {
  wide: { x: 270, y: 45, w: 1075, h: 815 },
  tall: { x: 25, y: 170, w: 850, h: 860 },
};

export const AGENT_NODES = ['research', 'architecture', 'finance', 'risk', 'builder', 'writer'];

// Faint structural lines: who normally talks to whom.
export const STRUCTURE_EDGES = [
  ['customers', 'orchestrator'],
  ...AGENT_NODES.map((a) => ['orchestrator', a]),
  ...AGENT_NODES.map((a) => [a, 'validation']),
  ['validation', 'human'],
  ['orchestrator', 'house'],
];

export const CONTROLLED_INITIAL = {
  customers: 'active',
  orchestrator: 'idle',
  research: 'waiting',
  architecture: 'waiting',
  finance: 'waiting',
  risk: 'waiting',
  builder: 'waiting',
  writer: 'waiting',
  validation: 'idle',
  human: 'idle',
};

export const CONTROLLED_FLOW = [
  {
    id: 'c1',
    label: 'Requirements captured',
    caption: 'The customer requirements are captured clearly and confirmed with the customers.',
    packets: [{ from: 'customers', to: 'orchestrator', label: 'Customer requirements (8)', status: 'context' }],
    handoff: {
      what: 'Customer requirements (8), budget £90k, 12 weeks',
      from: 'Customers',
      to: 'Orchestrator',
      validated: 'Confirmed with the customers',
      status: 'pass',
      ifFails: 'Orchestrator asks the customers to clarify before any work starts',
    },
    set: { customers: 'done', orchestrator: 'active' },
    guardrail: 'Record key actions and decisions',
  },
  {
    id: 'c2',
    label: 'Research delegated',
    caption: 'The Orchestrator breaks down the goal and sends the first task, with context, to the Research Agent.',
    packets: [{ from: 'orchestrator', to: 'research', label: 'Research brief + approved sources', status: 'context' }],
    handoff: {
      what: 'Task brief: materials and the Wolf threat, plus the approved source list',
      from: 'Orchestrator',
      to: 'Research Agent',
      validated: 'Built from confirmed requirements',
      status: 'pass',
      ifFails: 'Research does not start until the brief is complete',
    },
    set: { research: 'active' },
    guardrail: 'Apply least-necessary access',
  },
  {
    id: 'c3',
    label: 'Research validated',
    caption: 'Research findings go to the Building Inspector first. Every claim has an approved source: PASS.',
    packets: [{ from: 'research', to: 'validation', label: 'Research findings', status: 'pending' }],
    gate: { at: 'validation', result: 'PASS', status: 'pass' },
    handoff: {
      what: 'Research findings: materials compared, Wolf threat profile',
      from: 'Research Agent',
      to: 'Validation Agent',
      validated: 'PASS: every claim has an approved source',
      status: 'pass',
      ifFails: 'Returned to the Research Agent; Architecture stays locked',
    },
    set: { research: 'done', validation: 'active' },
    wolf: 'fake-evidence',
    guardrail: 'Use approved information sources',
  },
  {
    id: 'c4',
    label: 'Design starts',
    caption: 'Only validated research is passed on. The Architecture Agent can now start.',
    packets: [{ from: 'orchestrator', to: 'architecture', label: 'Validated research + requirements', status: 'pass' }],
    handoff: {
      what: 'Validated research findings and the customer requirements',
      from: 'Research Agent (validated), passed on by the Orchestrator',
      to: 'Architecture Agent',
      validated: 'Yes',
      status: 'pass',
      ifFails: 'Failed research never reaches the Architecture Agent',
    },
    set: { validation: 'idle', architecture: 'active' },
    guardrail: 'Stop downstream tasks when validation fails',
  },
  {
    id: 'c5',
    label: 'Design v1 fails',
    caption: 'Design v1 is checked. The front door weakness is not addressed: FAIL. Nothing downstream may start.',
    packets: [{ from: 'architecture', to: 'validation', label: 'House design v1', status: 'pending' }],
    gate: { at: 'validation', result: 'FAIL', status: 'fail' },
    handoff: {
      what: 'Proposed house design v1',
      from: 'Architecture Agent',
      to: 'Validation Agent',
      validated: 'FAIL: requirement R4, front door weakness not addressed',
      status: 'fail',
      ifFails: 'Returned to the Architecture Agent. Finance, Risk and Builder stay locked.',
    },
    set: { architecture: 'fail', validation: 'alert' },
    guardrail: 'Require validation checkpoints',
  },
  {
    id: 'c6',
    label: 'Returned for correction',
    caption: 'Rework loop: the design goes back to the agent that made it, with clear correction instructions.',
    packets: [{ from: 'validation', to: 'architecture', label: 'Fix: reinforce door, add lock spec', status: 'return' }],
    rework: { from: 'validation', to: 'architecture' },
    gate: { at: 'validation', result: 'RETURN FOR CORRECTION', status: 'return' },
    handoff: {
      what: 'Correction instructions: failed criterion R4 and what to fix',
      from: 'Validation Agent',
      to: 'Architecture Agent (responsible agent)',
      validated: 'Returned for correction',
      status: 'return',
      ifFails: 'Repeats until the design passes or a human decides',
    },
    set: { architecture: 'active', validation: 'idle' },
    guardrail: 'Stop downstream tasks when validation fails',
  },
  {
    id: 'c7',
    label: 'Design v2 passes',
    caption: 'Corrected and resubmitted. Design v2 is revalidated: PASS. It becomes the one approved version.',
    packets: [{ from: 'architecture', to: 'validation', label: 'House design v2', status: 'pending' }],
    gate: { at: 'validation', result: 'PASS', status: 'pass' },
    handoff: {
      what: 'Proposed house design v2 (door reinforced)',
      from: 'Architecture Agent',
      to: 'Validation Agent',
      validated: 'PASS: revalidated against all criteria',
      status: 'pass',
      ifFails: 'Returned again with new instructions',
    },
    set: { architecture: 'done', validation: 'active' },
    guardrail: 'Require validation checkpoints',
  },
  {
    id: 'c8',
    label: 'Cost and risk in parallel',
    caption: 'Finance and Risk both receive the same current design. One approved source of truth.',
    packets: [
      { from: 'orchestrator', to: 'finance', label: 'Approved design v2', status: 'pass' },
      { from: 'orchestrator', to: 'risk', label: 'Approved design v2', status: 'pass' },
    ],
    handoff: {
      what: 'Approved design v2, the only current version',
      from: 'Orchestrator',
      to: 'Finance Agent and Risk Agent, in parallel',
      validated: 'Yes: v2 passed validation',
      status: 'pass',
      ifFails: 'Older versions are marked out of date and cannot be used',
    },
    set: { validation: 'idle', finance: 'active', risk: 'active' },
    guardrail: 'Require mandatory risk review',
  },
  {
    id: 'c9',
    label: 'High risk escalated',
    caption: 'Cost is within budget. Risk finds an open chimney: HIGH. The inspector escalates to a human.',
    packets: [
      { from: 'finance', to: 'validation', label: 'Cost: £84k of £90k', status: 'pass' },
      { from: 'risk', to: 'validation', label: 'Risk: chimney entry HIGH', status: 'escalate' },
    ],
    gate: { at: 'validation', result: 'ESCALATE TO HUMAN REVIEW', status: 'escalate' },
    handoff: {
      what: 'Cost assessment and risk assessment',
      from: 'Finance Agent and Risk Agent',
      to: 'Validation Agent',
      validated: 'Cost PASS · Risk needs a human decision',
      status: 'escalate',
      ifFails: 'Builder stays locked until the risk is resolved',
    },
    set: { finance: 'done', risk: 'done', validation: 'alert' },
    guardrail: 'Require human approval for high-risk decisions',
  },
  {
    id: 'c10',
    label: 'Human decides',
    caption: 'The Human Reviewer requests a change: add a chimney guard. The updated design is revalidated.',
    packets: [{ from: 'validation', to: 'human', label: 'High-risk exception: chimney', status: 'escalate' }],
    gate: { at: 'human', result: 'REQUEST CHANGES: chimney guard', status: 'approve' },
    handoff: {
      what: 'High-risk exception with the Risk Agent’s recommended control',
      from: 'Validation Agent',
      to: 'Human Reviewer',
      validated: 'Human decision recorded',
      status: 'approve',
      ifFails: 'If rejected, the Orchestrator re-plans the design',
    },
    set: { validation: 'idle', human: 'active' },
    guardrail: 'Require human approval for high-risk decisions',
  },
  {
    id: 'c11',
    label: 'Build authorised',
    caption: 'Only now does the Builder Agent receive build authorisation with every approved input.',
    packets: [{ from: 'orchestrator', to: 'builder', label: 'Build authorisation + approved inputs', status: 'pass' }],
    handoff: {
      what: 'Approved design v2 + chimney guard, materials, cost, controls and build authorisation',
      from: 'Orchestrator',
      to: 'Builder Agent',
      validated: 'Yes: every input approved',
      status: 'pass',
      ifFails: 'No authorisation means no construction',
    },
    set: { human: 'done', builder: 'active' },
    house: 2,
    wolf: 'sabotage',
    guardrail: 'Prevent unapproved construction',
  },
  {
    id: 'c12',
    label: 'Final validation',
    caption: 'The finished house and its build record are inspected against the approved design: PASS.',
    packets: [{ from: 'builder', to: 'validation', label: 'Built house + build record', status: 'pending' }],
    gate: { at: 'validation', result: 'FINAL VALIDATION: PASS', status: 'pass' },
    handoff: {
      what: 'Constructed house and build record',
      from: 'Builder Agent',
      to: 'Validation Agent',
      validated: 'PASS: built as approved',
      status: 'pass',
      ifFails: 'Deviations go back to the Builder Agent to fix',
    },
    set: { builder: 'done', validation: 'active' },
    house: 4,
    guardrail: 'Require validation checkpoints',
  },
  {
    id: 'c13',
    label: 'Report and human approval',
    caption: 'The Writer Agent documents the approved work. Only the Human Reviewer can approve it.',
    packets: [
      { from: 'orchestrator', to: 'writer', label: 'All approved outputs', status: 'pass' },
      { from: 'writer', to: 'human', label: 'Final project report', status: 'pending' },
    ],
    gate: { at: 'human', result: 'APPROVE: safe to occupy', status: 'approve' },
    handoff: {
      what: 'Final project report',
      from: 'Writer Agent',
      to: 'Human Reviewer',
      validated: 'Human approved',
      status: 'approve',
      ifFails: 'If anything is overstated, the report goes back to the Writer Agent',
    },
    set: { validation: 'idle', writer: 'done', human: 'done' },
    house: 5,
    guardrail: 'Require human approval for high-risk decisions',
  },
  {
    id: 'c14',
    label: 'Delivered',
    caption: 'The Orchestrator runs its final check, then delivers the safe house to the customers.',
    packets: [{ from: 'orchestrator', to: 'customers', label: 'Safe house + final report', status: 'approve' }],
    gate: { at: 'orchestrator', result: 'FINAL CHECK COMPLETE', status: 'approve' },
    handoff: {
      what: 'The approved house and the final project report',
      from: 'Orchestrator',
      to: 'Customers',
      validated: 'Validated, human approved, final check complete',
      status: 'approve',
      ifFails: 'Nothing is delivered until every check is complete',
    },
    set: { orchestrator: 'done', customers: 'active' },
    house: 5,
    delivered: true,
    wolf: 'huff',
    guardrail: 'Record key actions and decisions',
  },
];

// The failure version: same agents, no orchestration, no validation, no human review, no guardrails.
export const FAILURE_INITIAL = {
  customers: 'active',
  research: 'idle',
  architecture: 'idle',
  finance: 'idle',
  risk: 'idle',
  builder: 'idle',
  writer: 'idle',
};

export const FAILURE_FLOW = [
  {
    id: 'f1',
    label: 'Agents start independently',
    caption: 'Every agent grabs a piece of the request and starts at once. Each sees different context.',
    packets: [
      { from: 'customers', to: 'research', label: 'Part of the request', status: 'unchecked' },
      { from: 'customers', to: 'builder', label: '“Build a house”', status: 'unchecked' },
      { from: 'customers', to: 'finance', label: 'Budget only', status: 'unchecked' },
    ],
    set: { research: 'active', architecture: 'active', finance: 'active', risk: 'active', builder: 'active', writer: 'active' },
    notes: { writer: 'No brief received' },
  },
  {
    id: 'f2',
    label: 'Duplicate work',
    caption: 'Research and Architecture both research materials. Nobody knows the other is doing it.',
    notes: { research: 'Researching materials', architecture: 'Also researching materials' },
  },
  {
    id: 'f3',
    label: 'Builder starts too early',
    caption: 'The Builder Agent starts building before any design has been approved.',
    notes: { builder: 'Building with straw: no design yet' },
    house: 1,
  },
  {
    id: 'f4',
    label: 'Conflicting assumptions',
    caption: 'Architecture assumes brick, Builder assumes straw, Finance assumes sticks.',
    notes: { architecture: 'Assumes brick', builder: 'Assumes straw', finance: 'Assumes sticks' },
    conflicts: [
      ['architecture', 'builder'],
      ['architecture', 'finance'],
    ],
  },
  {
    id: 'f5',
    label: 'Outdated design used',
    caption: 'Finance costs design v1, but Architecture has already moved on to v3.',
    packets: [{ from: 'architecture', to: 'finance', label: 'Design v1 (out of date)', status: 'outdated' }],
    notes: { architecture: 'Now on v3', finance: 'Costed v1: £61k' },
  },
  {
    id: 'f6',
    label: 'Risk findings ignored',
    caption: 'Risk warns about the weak door and open chimney. The warning goes nowhere.',
    packets: [{ from: 'risk', to: 'builder', label: 'Door weak, chimney open!', status: 'ignored' }],
    notes: { risk: 'Warning not acted on', builder: 'Warning never read' },
    set: { risk: 'alert' },
  },
  {
    id: 'f7',
    label: 'No checks, no human',
    caption: 'There is no validation checkpoint and no human review. Nothing stops the work.',
    ghostsFlash: true,
    house: 3,
  },
  {
    id: 'f8',
    label: 'Incomplete work marked final',
    caption: 'The Writer Agent presents an incomplete report as final. It looks approved, but nobody approved it.',
    packets: [{ from: 'writer', to: 'customers', label: 'FINAL REPORT (incomplete)', status: 'unchecked' }],
    notes: { writer: 'Marked “final”' },
  },
  {
    id: 'f9',
    label: 'The Wolf exploits a weakness',
    caption: 'The Wolf finds the weak door that the Risk Agent warned about.',
    threat: { target: 'house', label: 'Through the weak door' },
  },
  {
    id: 'f10',
    label: 'The house fails',
    caption: 'The house fails. Lots of activity, but no coordinated, checked outcome.',
    threat: { target: 'house', label: 'Huff and puff' },
    broken: true,
  },
];

// Compare mode: each phase pairs a failure step with the controlled step that teaches the opposite lesson.
export const COMPARE_PHASES = [
  { label: 'Start', failure: 0, controlled: 0, without: 'Agents start on their own with partial context.', with: 'Requirements are captured and confirmed first.' },
  { label: 'Research', failure: 1, controlled: 2, without: 'Two agents duplicate the same research.', with: 'One agent researches; the inspector validates it.' },
  { label: 'Sequence', failure: 2, controlled: 4, without: 'Builder starts before any design exists.', with: 'Design v1 fails. Builder stays locked.' },
  { label: 'Design', failure: 3, controlled: 6, without: 'Agents work from conflicting assumptions.', with: 'Corrected design v2 becomes the one approved version.' },
  { label: 'Cost', failure: 4, controlled: 7, without: 'Finance costs an out-of-date design.', with: 'Finance and Risk get the same current design.' },
  { label: 'Risk', failure: 5, controlled: 8, without: 'Risk warnings are ignored.', with: 'A high risk is escalated to a human.' },
  { label: 'Checks', failure: 6, controlled: 11, without: 'No validation, no human review.', with: 'The finished house passes final validation.' },
  { label: 'Report', failure: 7, controlled: 12, without: 'Incomplete work is presented as final.', with: 'The Writer documents; a human approves.' },
  { label: 'Wolf', failure: 8, controlled: 13, without: 'The Wolf exploits the weak door.', with: 'The Wolf’s attempts are blocked or detected.' },
  { label: 'Outcome', failure: 9, controlled: 13, without: 'Unsafe house. Work must be redone.', with: 'Safe house delivered and approved.', final: true },
];

// Replays steps 0..index and returns node states, house stage and flags.
export function resolveFlow(flow, initial, index) {
  const states = { ...initial };
  let house = 0;
  let notes = {};
  let delivered = false;
  let broken = false;
  for (let i = 0; i <= index && i < flow.length; i += 1) {
    const step = flow[i];
    Object.assign(states, step.set ?? {});
    if (step.house) house = Math.max(house, step.house);
    if (step.notes) notes = { ...notes, ...step.notes };
    if (step.delivered) delivered = true;
    if (step.broken) broken = true;
  }
  return { states, house, notes, delivered, broken, step: flow[Math.min(index, flow.length - 1)] };
}
