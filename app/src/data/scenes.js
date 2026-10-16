// The twelve scenes. Each scene has beats: one caption per beat, played in order.
// Durations are in milliseconds at 1× speed. Scenes 8 and 9 change when the threat toggles change.

import { CONTROLLED_FLOW, FAILURE_FLOW } from './flows.js';
import { INSIDER_STEPS, WOLF_ATTACKS } from './threats.js';
import { ESCALATIONS, KEY_MESSAGE } from './content.js';

const b = (caption, ms = 4200) => ({ caption, ms });

const BASE_SCENES = [
  {
    id: 'customers',
    title: 'The Customers',
    kicker: 'Who wants something built',
    look: ['The pigs are customers, not AI agents.', 'They state WHAT they need, not how to build it.'],
    beats: [
      b('Meet the customers: three pigs who need a new home.'),
      b('They bring one clear request to an AI construction company.'),
      b('Requirements 1 to 4: safety, budget, materials and known weaknesses.'),
      b('Requirements 5 to 8: process, validation, human approval and a safe-to-occupy sign-off.'),
      b('The customers define WHAT they need. The company determines HOW.', 5200),
    ],
  },
  {
    id: 'company',
    title: 'The AI Construction Company',
    kicker: 'Who does the work',
    look: ['The company is a coordinated system of roles.', 'Guardrails surround the whole team.'],
    beats: [
      b('The request travels from the customers to the AI construction company.'),
      b('The company accepts the work and records the requirements.'),
      b('Inside: an Orchestrator, six specialist agents, an inspector and a human reviewer.'),
      b('Guardrails surround everything the team does.'),
      b('A coordinated system of specialists, not one giant chatbot.', 5000),
    ],
  },
  {
    id: 'orchestrator',
    title: 'The Orchestrator',
    kicker: 'The invisible project manager',
    look: ['It plans and delegates; it never does the specialist work.', 'Tasks wait until their inputs are approved.'],
    beats: [
      b('Understand: the Orchestrator reads the goal and the eight requirements.'),
      b('Plan: it breaks the goal into smaller tasks.'),
      b('Delegate: each task goes to the right specialist.'),
      b('Pass context and track dependencies: no task starts without approved inputs.'),
      b('Monitor, validate, rework and combine until the job is done.'),
      b('The Orchestrator does not build the house. It coordinates the system that builds it.', 5200),
    ],
  },
  {
    id: 'agents',
    title: 'The Specialist Agents',
    kicker: 'Who does each job',
    look: ['Each agent has inputs, tasks, an output and a next destination.', 'Click any card for the full role.'],
    beats: [
      b('An AI agent is software given a goal, tools and information. It acts on its own, within limits.', 5000),
      b('Research Agent: finds evidence about materials and the Wolf.'),
      b('Architecture Agent: designs the house from validated research.'),
      b('Finance Agent: checks the current design against the budget.'),
      b('Risk Agent: finds weaknesses and recommends controls.'),
      b('Builder Agent: builds only what has been approved.'),
      b('Writer Agent: documents the work, but cannot approve it.'),
      b('Two more roles check and decide: the Validation Agent and the Human Reviewer.', 4800),
    ],
  },
  {
    id: 'without',
    title: 'Without Orchestration',
    kicker: 'WITHOUT EFFECTIVE ORCHESTRATION',
    look: ['The agents are capable. The missing coordination and controls are the problem.', 'Watch the order of work fall apart.'],
    beats: FAILURE_FLOW.map((s, i) => b(s.caption, i === FAILURE_FLOW.length - 1 ? 6500 : 4000)),
  },
  {
    id: 'with',
    title: 'With Orchestration',
    kicker: 'WITH ORCHESTRATION, GUARDRAILS AND HUMAN OVERSIGHT',
    look: ['Every hand-off shows what moves, who sends it and whether it was validated.', 'Agents stay locked until their inputs are approved.'],
    beats: CONTROLLED_FLOW.map((s, i) => b(s.caption, i === CONTROLLED_FLOW.length - 1 ? 5500 : 4300)),
  },
  {
    id: 'guardrails',
    title: 'Guardrails and Validation',
    kicker: 'Boundaries, criteria and the rework loop',
    look: ['Guardrails set limits; they do no work.', 'A failed output goes back to the agent that made it.'],
    beats: [
      b('Guardrails surround the workflow. They set the rules; they do no work.'),
      b('Breach attempt: an agent tries to use an unapproved website. The boundary blocks it.'),
      b('The Building Inspector checks Design v1 against the acceptance criteria.'),
      b('One check fails: the front door weakness is not addressed.'),
      b('Rework loop: returned to the Architecture Agent with clear correction instructions.'),
      b('Corrected, resubmitted and revalidated: Design v2 passes.'),
      b('Producing an answer is not the same as producing an approved answer.', 5200),
    ],
  },
  {
    id: 'wolf',
    title: 'The Wolf',
    kicker: 'External disruption',
    look: ['The Wolf stays outside the workflow.', 'Dotted red lines are attempts; controls block or detect them.'],
    beats: [], // built from WOLF_ATTACKS below
  },
  {
    id: 'insider',
    title: 'Insider Threat',
    kicker: 'Optional scenario',
    optional: true,
    look: ['Customer C is still a customer, not an agent.', 'This is a security event, not a judgement of character.'],
    beats: [], // built from INSIDER_STEPS below
  },
  {
    id: 'human',
    title: 'Human Oversight',
    kicker: 'Escalation and approval',
    look: ['Validation checks; a human stays accountable.', 'Try a decision button to see what it would do.'],
    beats: [], // built from ESCALATIONS below
  },
  {
    id: 'final',
    title: 'Final Check',
    kicker: 'The Orchestrator confirms completion',
    look: ['Delivery stays locked until every item is confirmed.'],
    beats: [
      b('After validation and human approval, the Orchestrator runs one last completeness check.'),
      b('Tasks complete, failed work corrected.', 3200),
      b('Outputs present, requirements satisfied.', 3200),
      b('Budget approved, risk acceptable.', 3200),
      b('Validation passed, human approval recorded.', 3200),
      b('Safe to occupy, report complete.', 3200),
      b('Only then may the outcome be delivered to the pigs.', 4800),
    ],
  },
  {
    id: 'outcome',
    title: 'The Outcome',
    kicker: 'Safe house delivered',
    look: ['Compare this with the failure version in Compare mode.'],
    beats: [
      b('The approved design is built, step by step.', 5000),
      b('The safe house is handed over to the customers.'),
      b('Safe, within budget, risks addressed, validated, human approved, safe to occupy.', 4800),
      b(KEY_MESSAGE.map((m) => m.text).join(' '), 9000),
      b('Same story. A new way to understand AI.', 6000),
    ],
  },
];

export function buildScenes({ wolf, insider }) {
  return BASE_SCENES.map((scene, index) => {
    const s = { ...scene, number: index + 1 };
    if (scene.id === 'wolf') {
      s.beats = wolf
        ? [
            b('The Wolf appears outside the company. It is not part of the task sequence.'),
            ...WOLF_ATTACKS.map((a) => b(`${a.intention}: ${a.attempt}. ${a.outcome}.`, 4600)),
            b('The Wolf attacks the system. The Wolf is not part of the legitimate construction team.', 5200),
          ]
        : [b('Wolf disruption is switched off. Switch it on to watch the attacks.', 4000)];
    }
    if (scene.id === 'insider') {
      s.beats = insider
        ? INSIDER_STEPS.map((step) => b(`${step.n}. ${step.text}`, 3800))
        : [b('The insider-threat scenario is optional and switched off. Switch it on to watch it.', 4000)];
    }
    if (scene.id === 'human') {
      const cases = ESCALATIONS.filter((c) => insider || !c.insiderOnly);
      s.beats = [
        b('Some decisions are too important for AI alone. They are escalated to a person.'),
        ...cases.map((c) => b(`${c.title}. Decision: ${c.decision}.`, 4600)),
        b('Validation checks the work. A human stays accountable for important decisions.', 5000),
      ];
    }
    return s;
  });
}

export const humanCases = (insider) => ESCALATIONS.filter((c) => insider || !c.insiderOnly);
