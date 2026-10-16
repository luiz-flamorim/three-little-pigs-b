import { motion } from 'framer-motion';
import { EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { INSIDER_ALERT, INSIDER_BOUNDARY, INSIDER_EXPOSED, INSIDER_POS, INSIDER_STEPS } from '../data/threats.js';
import { FlowCanvas } from './FlowCanvas.jsx';
import { CustomerNode, HumanReviewNode, OrchestratorNode, RoleNode, WolfThreatNode, AgentNode } from './nodes.jsx';

const SIZE = { wide: [1600, 900], tall: [900, 1080] };

const RESPONSE_STAGE = [
  'Undetected',
  'Undetected',
  'Undetected',
  'Undetected',
  'Undetected',
  'Undetected',
  'Alert raised',
  'Work paused',
  'Access restricted',
  'With the Human Reviewer',
  'Rework: locks re-keyed',
  'Resolved: customers informed',
];

/** Scene 9 diagram. The secret channel is drawn apart from the legitimate flow, outside the company boundary. */
export function InsiderDiagram({ beat, layout }) {
  const n = Math.min(beat, INSIDER_STEPS.length - 1) + 1; // step number 1..12
  const P = (id) => INSIDER_POS[id][layout];
  const informed = n >= 12;
  const pigC = n >= 9 ? 'restricted' : n >= 7 ? 'alert' : informed ? 'active' : 'idle';

  const nodes = [
    { id: 'pigA', pos: P('pigA'), el: <CustomerNode label="Customer A" state={informed ? 'active' : 'idle'} note={n === 2 ? 'Not aware' : undefined} noteColor="#5b8cff" /> },
    { id: 'pigB', pos: P('pigB'), el: <CustomerNode label="Customer B" state={informed ? 'active' : 'idle'} note={n === 2 ? 'Not aware' : undefined} noteColor="#5b8cff" /> },
    {
      id: 'pigC',
      pos: P('pigC'),
      el: (
        <CustomerNode
          label="Customer C"
          state={informed ? 'restricted' : pigC}
          note={n === 5 ? 'Refuses to open the door' : n >= 9 ? 'Need-to-know access' : undefined}
          noteColor={n >= 9 ? '#fbbf24' : '#5b8cff'}
        />
      ),
    },
    {
      id: 'wolf',
      pos: P('wolf'),
      el: <WolfThreatNode state={n === 4 || n === 6 ? 'active' : 'idle'} note={n === 4 ? 'Leverage gained' : n === 6 ? 'Threatens to reveal the deal' : undefined} />,
    },
    { id: 'orchestrator', pos: P('orchestrator'), el: <OrchestratorNode state={n >= 8 && n < 12 ? 'paused' : n >= 12 ? 'active' : 'idle'} sub={n >= 8 && n < 12 ? 'Door work paused' : 'Coordinates'} /> },
    { id: 'monitor', pos: P('monitor'), el: <RoleNode roleId="guardrails" label="Monitoring" sub="Detect unusual behaviour" state={n >= 7 && n < 12 ? 'alert' : 'idle'} /> },
    { id: 'human', pos: P('human'), el: <HumanReviewNode state={n >= 12 ? 'done' : n >= 10 ? 'active' : 'idle'} sub="Decides the response" /> },
    { id: 'builder', pos: P('builder'), el: <AgentNode roleId="builder" state={n === 11 ? 'active' : n > 11 ? 'done' : 'idle'} sub="Re-keys locks" /> },
  ];

  const edges = [
    { from: 'pigA', to: 'orchestrator', kind: 'structure' },
    { from: 'pigB', to: 'orchestrator', kind: 'structure' },
    { from: 'pigC', to: 'orchestrator', kind: 'structure' },
    { from: 'monitor', to: 'orchestrator', kind: 'structure' },
    { from: 'orchestrator', to: 'human', kind: 'structure' },
    { from: 'human', to: 'builder', kind: 'structure' },
  ];

  const packetsByStep = {
    1: [{ from: 'wolf', to: 'pigC', label: 'Share the plans?', status: 'secret' }],
    3: INSIDER_EXPOSED.map((label, i) => ({ from: 'pigC', to: 'wolf', label, status: 'secret', offset: i - 1.5 })),
    5: [{ from: 'pigC', to: 'wolf', label: '“No. I won’t open the door.”', status: 'secret' }],
    6: [{ from: 'wolf', to: 'pigC', label: '“I’ll reveal our deal!”', status: 'threat' }],
    7: [{ from: 'monitor', to: 'orchestrator', label: 'Alert: unusual access', status: 'escalate' }],
    9: [{ from: 'orchestrator', to: 'pigC', label: 'Access: need-to-know only', status: 'return' }],
    10: [{ from: 'orchestrator', to: 'human', label: 'Possible information exposure', status: 'escalate' }],
    11: [{ from: 'human', to: 'builder', label: 'Re-key locks · re-check door', status: 'approve' }],
    12: [
      { from: 'orchestrator', to: 'pigA', label: 'Controlled security update', status: 'context' },
      { from: 'orchestrator', to: 'pigB', label: 'Controlled security update', status: 'context' },
      { from: 'orchestrator', to: 'pigC', label: 'Controlled security update', status: 'context' },
    ],
  };

  // Show only one update chip in step 12 to avoid clutter; the lines still reach all three customers.
  const packets = n === 12 ? packetsByStep[12].slice(0, 1) : packetsByStep[n] ?? [];
  const extraEdges = n === 12 ? packetsByStep[12].slice(1).map((p) => ({ from: p.from, to: p.to, kind: 'context', active: true })) : [];

  return (
    <FlowCanvas
      layout={layout}
      size={SIZE[layout]}
      nodes={nodes}
      edges={[...edges, ...extraEdges]}
      packets={packets}
      threats={[{ from: 'pigC', to: 'wolf', reaches: true, kind: 'secret', curve: layout === 'wide' ? -120 : 60, label: 'Secret channel', labelBelow: layout === 'wide' }]}
      gates={n === 8 ? [{ at: 'orchestrator', result: 'PAUSED: door and access work', status: 'escalate' }] : []}
      boundary={INSIDER_BOUNDARY[layout]}
      boundaryAlert={n === 7}
      stepKey={`i${n}`}
      ariaLabel={`Insider-threat scenario, step ${n} of 12: ${INSIDER_STEPS[n - 1].title}`}
    />
  );
}

/** Status panel for the compromised customer identity, plus the incident timeline. */
export function InsiderThreatState({ beat }) {
  const n = Math.min(beat, INSIDER_STEPS.length - 1) + 1;
  const cells = [
    { k: 'Identity', v: 'Customer C: still a customer, not an agent', icon: null },
    { k: 'Access level', v: n >= 9 ? 'Need-to-know only' : 'Full project access', icon: n >= 9 ? Lock : null, color: n >= 9 ? '#fbbf24' : undefined },
    { k: 'Information exposed', v: n >= 3 ? INSIDER_EXPOSED.join(', ') : 'None yet', icon: n >= 3 ? EyeOff : null, color: n >= 3 ? '#fb7185' : undefined },
    { k: 'Response', v: RESPONSE_STAGE[n - 1], icon: n >= 7 ? ShieldCheck : null, color: n >= 7 ? '#34d399' : '#a3b3d1' },
  ];
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <section className="rounded-xl border border-line bg-surface/90 p-3" aria-label="Security event status">
        <p className="eyebrow mb-2">Security event status</p>
        <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          {cells.map((c) => (
            <div key={c.k} className="min-w-0">
              <dt className="eyebrow !text-[10px]">{c.k}</dt>
              <dd className="flex items-start gap-1.5 font-medium" style={{ color: c.color }}>
                {c.icon && <c.icon size={15} className="mt-0.5 flex-none" aria-hidden="true" />}
                {c.v}
              </dd>
            </div>
          ))}
        </dl>
        {n >= 7 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 rounded-lg bg-orange-400/10 px-2 py-1.5 text-xs text-orange-200">
            Monitoring: {INSIDER_ALERT}
          </motion.p>
        )}
        <p className="mt-2 text-xs text-muted">A security event affecting the system, not a judgement of anyone’s character.</p>
      </section>
      <section className="rounded-xl border border-line bg-surface/90 p-3" aria-label="Incident timeline">
        <p className="eyebrow mb-2">Incident timeline</p>
        <ol className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-2">
          {INSIDER_STEPS.map((s) => {
            const state = s.n < n ? 'past' : s.n === n ? 'now' : 'future';
            const color = s.kind === 'secret' ? '#fb7185' : '#34d399';
            return (
              <li
                key={s.n}
                className="flex items-center gap-2 rounded-md px-1.5 py-1"
                style={{ background: state === 'now' ? `${color}22` : 'transparent', opacity: state === 'future' ? 0.4 : 1 }}
                aria-current={state === 'now' ? 'step' : undefined}
              >
                <span className="grid h-5 w-5 flex-none place-items-center rounded-full font-mono text-[10px] font-bold text-bg" style={{ background: color }}>
                  {s.n}
                </span>
                <span className={state === 'now' ? 'font-semibold text-fg' : 'text-muted'}>{s.title}</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-2 flex flex-wrap gap-3 text-[11px] text-muted">
          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-[#fb7185]" /> Secret activity (outside the process)
          </span>
          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-[#34d399]" /> Controlled response
          </span>
        </p>
      </section>
    </div>
  );
}
