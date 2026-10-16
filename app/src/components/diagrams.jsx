import { motion } from 'framer-motion';
import { ShieldCheck, Siren } from 'lucide-react';
import {
  AGENT_NODES,
  BOUNDARY,
  CANVAS,
  CONTROLLED_FLOW,
  CONTROLLED_INITIAL,
  FAILURE_FLOW,
  FAILURE_INITIAL,
  POS,
  STRUCTURE_EDGES,
  resolveFlow,
} from '../data/flows.js';
import { WOLF_ATTACKS, wolfAttack } from '../data/threats.js';
import { FlowCanvas } from './FlowCanvas.jsx';
import { House } from './House.jsx';
import { AgentNode, CustomerNode, GhostNode, HumanReviewNode, OrchestratorNode, ValidationNode, WolfThreatNode } from './nodes.jsx';

function HouseSlot({ stage, material = 'brick', broken = false, delivered = false, caption }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <House stage={stage} material={material} broken={broken} safe={delivered} size="0.95em" />
      <span
        className="chip"
        style={{ '--chip': broken ? '#ef4444' : delivered ? '#10b981' : '#6b7c9c' }}
      >
        {caption ?? (broken ? 'House failed' : delivered ? 'Delivered: safe' : stage === 0 ? 'Not started' : 'Under construction')}
      </span>
    </div>
  );
}

const structureEdges = () =>
  STRUCTURE_EDGES.map(([from, to]) => ({
    from,
    to,
    kind: from === 'orchestrator' && AGENT_NODES.includes(to) ? 'coord' : 'structure',
    active: false,
  }));

/** The controlled workflow: orchestration, validation gates, human oversight and guardrails. */
export function ControlledDiagram({ beat, wolf, layout, compact = false }) {
  const index = Math.min(beat, CONTROLLED_FLOW.length - 1);
  const { states, house, delivered, step } = resolveFlow(CONTROLLED_FLOW, CONTROLLED_INITIAL, index);
  const attack = wolf && step.wolf ? wolfAttack(step.wolf) : null;
  const sub = (text) => (compact ? undefined : text);

  const nodes = [
    { id: 'customers', pos: POS.customers[layout], el: <CustomerNode state={states.customers} sub={sub('3 pigs')} /> },
    { id: 'orchestrator', pos: POS.orchestrator[layout], el: <OrchestratorNode state={states.orchestrator} sub={sub('Project manager')} /> },
    ...AGENT_NODES.map((a) => ({
      id: a,
      pos: POS[a][layout],
      el: <AgentNode roleId={a} state={attack?.target === a && attack.reachesTarget ? 'alert' : states[a]} />,
    })),
    { id: 'validation', pos: POS.validation[layout], el: <ValidationNode state={states.validation} sub={sub('Building Inspector')} /> },
    { id: 'human', pos: POS.human[layout], el: <HumanReviewNode state={states.human} sub={sub('Accountable')} /> },
    { id: 'house', pos: POS.house[layout], el: <HouseSlot stage={house} delivered={delivered} /> },
    ...(wolf ? [{ id: 'wolf', pos: POS.wolf[layout], el: <WolfThreatNode sub={layout === 'wide' ? sub('Outside the workflow') : undefined} /> }] : []),
  ];

  const packets = (step.packets ?? []).map((p, i, arr) => ({
    ...p,
    curve: step.rework ? 150 : 0,
    offset: arr.length > 1 && p.to === arr[0].to ? i : 0,
  }));

  const threats = attack
    ? [
        {
          to: attack.target,
          reaches: attack.reachesTarget,
          blocked: true,
          label: attack.outcome,
          labelBelow: attack.target === 'house',
        },
      ]
    : [];

  return (
    <FlowCanvas
      layout={layout}
      size={CANVAS[layout]}
      nodes={nodes}
      edges={structureEdges()}
      packets={packets}
      threats={threats}
      gates={step.gate ? [step.gate] : []}
      boundary={BOUNDARY[layout]}
      boundaryAlert={!!attack}
      stepKey={`c${index}`}
      ariaLabel={`Controlled workflow, step ${index + 1} of ${CONTROLLED_FLOW.length}: ${step.label}`}
    />
  );
}

// Small deterministic "random" numbers so the failure layout drifts the same way every time.
const seed = (id) => [...id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 997, 7);

/** The failure version: same agents, no orchestrator, no validation, no human review, no guardrails. */
export function FailureDiagram({ beat, layout, compact = false }) {
  const index = Math.min(beat, FAILURE_FLOW.length - 1);
  const { states, house, broken, step } = resolveFlow(FAILURE_FLOW, FAILURE_INITIAL, index);
  const chaos = index; // grows every step: the diagram gets steadily more disorganised
  const drift = (id, [x, y]) => {
    const h = seed(id);
    return [x + ((h % 5) - 2) * chaos * 2.2, y + ((h % 7) - 3) * chaos * 3];
  };
  const tilt = (id) => ((seed(id) % 9) - 4) * chaos * 0.3;
  const notes = step.notes ?? {};
  const ghostFlash = index >= 6;

  const nodes = [
    { id: 'customers', pos: POS.customers[layout], el: <CustomerNode state={states.customers} sub={compact ? undefined : '3 pigs'} /> },
    ...AGENT_NODES.map((a) => ({
      id: a,
      pos: drift(a, POS[a][layout]),
      rotate: tilt(a),
      el: <AgentNode roleId={a} state={states[a]} note={compact ? undefined : notes[a]} />,
    })),
    { id: 'orchestrator', pos: POS.orchestrator[layout], el: <GhostNode label="No orchestrator" flash={ghostFlash} /> },
    { id: 'validation', pos: POS.validation[layout], el: <GhostNode label="No validation" flash={ghostFlash} /> },
    { id: 'human', pos: POS.human[layout], el: <GhostNode label="No human review" flash={ghostFlash} /> },
    { id: 'house', pos: POS.house[layout], el: <HouseSlot stage={house} material="straw" broken={broken} /> },
    ...(step.threat ? [{ id: 'wolf', pos: POS.wolf[layout], el: <WolfThreatNode sub={compact || layout === 'tall' ? undefined : 'Exploits a gap'} /> }] : []),
  ];

  // Busy, uncoordinated chatter between agents: more lines appear as the chaos grows.
  const chatter = [
    ['research', 'architecture'],
    ['builder', 'writer'],
    ['finance', 'risk'],
    ['research', 'builder'],
    ['architecture', 'writer'],
    ['risk', 'research'],
  ]
    .slice(0, Math.min(6, Math.ceil(chaos / 1.5)))
    .map(([from, to]) => ({ from, to, kind: 'structure', active: false }));

  const conflicts = (step.conflicts ?? []).map(([from, to]) => ({ from, to, kind: 'conflict', active: true }));

  return (
    <FlowCanvas
      layout={layout}
      size={CANVAS[layout]}
      nodes={nodes}
      edges={[...chatter, ...conflicts]}
      packets={step.packets ?? []}
      threats={step.threat ? [{ to: step.threat.target, reaches: true, label: step.threat.label }] : []}
      boundary={BOUNDARY[layout]}
      ghostBoundary
      stepKey={`f${index}`}
      ariaLabel={`Failure version, step ${index + 1} of ${FAILURE_FLOW.length}: ${step.label}`}
    />
  );
}

/** Running list of Wolf activity the controls have caught so far. */
export function AlertFeed({ attacks, title = 'Threat alerts' }) {
  return (
    <section className="rounded-xl border border-red-400/30 bg-[#170f17]/90 p-3" aria-label={title} aria-live="polite">
      <p className="eyebrow mb-2 flex items-center gap-1.5 !text-red-300">
        <Siren size={13} aria-hidden="true" /> {title}
      </p>
      {attacks.length === 0 ? (
        <p className="text-sm text-muted">No threat activity yet.</p>
      ) : (
        <ul className="space-y-1.5">
          {attacks.map((a) => (
            <motion.li key={a.id} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-2 text-sm">
              <ShieldCheck size={15} className="mt-0.5 flex-none text-amber-400" aria-hidden="true" />
              <span>
                <span className="font-semibold text-fg">{a.outcome}:</span> <span className="text-muted">{a.attempt}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}

export const controlledAlerts = (beat) =>
  CONTROLLED_FLOW.slice(0, Math.min(beat, CONTROLLED_FLOW.length - 1) + 1)
    .filter((s) => s.wolf)
    .map((s) => wolfAttack(s.wolf));

/** Scene 8: the Wolf outside the boundary, trying one attack per beat. */
export function WolfDiagram({ beat, layout }) {
  const attackIndex = beat - 1;
  const attack = WOLF_ATTACKS[attackIndex];
  const done = beat > WOLF_ATTACKS.length;
  const target = attack?.target;
  const nodes = [
    { id: 'orchestrator', pos: POS.orchestrator[layout], el: <OrchestratorNode state="active" sub="Keeps authority" /> },
    ...AGENT_NODES.map((a) => ({
      id: a,
      pos: POS[a][layout],
      el: <AgentNode roleId={a} state={target === a ? (attack.reachesTarget ? 'alert' : 'active') : 'idle'} />,
    })),
    { id: 'validation', pos: POS.validation[layout], el: <ValidationNode state={target === 'architecture' || target === 'builder' ? 'active' : 'idle'} sub="Detects" /> },
    { id: 'human', pos: POS.human[layout], el: <HumanReviewNode state={target === 'finance' ? 'active' : 'idle'} sub="Decides" /> },
    { id: 'customers', pos: POS.customers[layout], el: <CustomerNode sub="Customers" /> },
    { id: 'house', pos: POS.house[layout], el: <HouseSlot stage={5} delivered={target === 'house' || done} caption={target === 'house' ? 'House holds' : undefined} /> },
    { id: 'wolf', pos: POS.wolf[layout], el: <WolfThreatNode state={beat === 0 ? 'active' : 'idle'} sub={layout === 'wide' ? 'Outside the workflow' : undefined} /> },
  ];
  const below = (t) => ['house', 'orchestrator', 'writer'].includes(t);
  const threats = done
    ? WOLF_ATTACKS.map((a) => ({ to: a.target, reaches: a.reachesTarget, blocked: true, label: '' }))
    : attack
      ? [{ to: attack.target, reaches: attack.reachesTarget, blocked: true, label: attack.outcome, labelBelow: below(attack.target) }]
      : [];
  return (
    <FlowCanvas
      layout={layout}
      size={CANVAS[layout]}
      nodes={nodes}
      edges={structureEdges()}
      threats={threats}
      boundary={BOUNDARY[layout]}
      boundaryAlert={!!attack && !attack.reachesTarget}
      stepKey={`w${beat}`}
      ariaLabel={attack ? `Wolf attempt: ${attack.intention}. ${attack.outcome}.` : 'The Wolf outside the legitimate workflow'}
    />
  );
}

/** Explains the current Wolf attempt in plain words. */
export function AttackCard({ attack }) {
  if (!attack) return null;
  const rows = [
    ['Intention', attack.intention],
    ['Attempt', attack.attempt],
    ['Control', attack.control],
    ['Evidence left behind', attack.evidence],
  ];
  return (
    <motion.section
      key={attack.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-red-400/30 bg-surface/90 p-3"
      aria-label={`Wolf attempt: ${attack.intention}`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="eyebrow !text-red-300">Attempted interference</span>
        <span className="chip" style={{ '--chip': '#d9a92b' }}>
          <ShieldCheck size="1em" aria-hidden="true" /> {attack.outcome}
        </span>
      </div>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2 xl:grid-cols-4">
        {rows.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="eyebrow !text-[10px]">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </motion.section>
  );
}
