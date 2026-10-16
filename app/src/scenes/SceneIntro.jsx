// Scenes 1–4: the customers, the company, the Orchestrator and the specialist agents.
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AGENT_DEFINITION, CUSTOMER_REQUEST, ORCHESTRATOR_STEPS, PROJECT, QUOTES, REQUIREMENTS, TASK_PLAN } from '../data/content.js';
import { roles, SPECIALISTS } from '../data/roles.js';
import { COLORS } from '../data/theme.js';
import { useRole } from '../context/RoleContext.jsx';
import { useLayout } from '../hooks/useMediaQuery.js';
import { CustomerCard } from '../components/CustomerCard.jsx';
import { CompanyCard } from '../components/CompanyCard.jsx';
import { WorkflowConnection } from '../components/WorkflowConnection.jsx';
import { OrchestratorNode, RoleIcon } from '../components/nodes.jsx';
import { Quote, Reveal, SectionLabel } from '../components/ui.jsx';

const NOTE_COLORS = ['#fde047', '#7dd3fc', '#f9a8d4', '#86efac'];

export function SceneCustomers({ beat }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)]">
      <div className="flex flex-col gap-4">
        <CustomerCard highlight={beat === 0} />
        <Reveal show={beat >= 1}>
          <div className="relative rounded-2xl rounded-tl-sm border border-line bg-raised p-4">
            <SectionLabel className="mb-1">Customer request</SectionLabel>
            <p className="font-display text-lg leading-snug">“{CUSTOMER_REQUEST}”</p>
          </div>
        </Reveal>
        <Reveal show={beat >= 1} className="flex flex-wrap gap-2 text-sm">
          <span className="chip" style={{ '--chip': COLORS.finance }}>
            Budget {PROJECT.budget}
          </span>
          <span className="chip" style={{ '--chip': COLORS.writer }}>
            Timeframe {PROJECT.timeframe}
          </span>
          <span className="chip" style={{ '--chip': COLORS.validation }}>
            Standard: {PROJECT.standard} (fictional)
          </span>
        </Reveal>
      </div>
      <div>
        <SectionLabel className="mb-2">Customer requirements</SectionLabel>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {REQUIREMENTS.map((r, i) => (
            <Reveal key={r.id} as="li" show={beat >= (i < 4 ? 2 : 3)} delay={(i % 4) * 0.1}>
              <div className="sticky h-full" style={{ '--c': NOTE_COLORS[i % 4], transform: `rotate(${(((i * 37) % 5) - 2) * 0.5}deg)` }}>
                <span className="font-mono text-[11px] font-bold text-muted">{r.id}</span>
                <p className="font-semibold leading-snug">{r.short}</p>
                <p className="mt-0.5 text-xs text-muted">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
      <Quote show={beat >= 4} color={COLORS.customers} className="lg:col-span-2">
        {QUOTES.customers}
      </Quote>
    </div>
  );
}

export function SceneCompany({ beat }) {
  const vertical = useLayout() === 'tall';
  return (
    <div className="flex flex-col gap-5">
      <div className={`grid items-center gap-3 ${vertical ? 'grid-cols-1' : 'grid-cols-[minmax(0,0.75fr)_minmax(0,0.6fr)_minmax(0,1.4fr)]'}`}>
        <CustomerCard size="sm" caption="Bring the request" />
        <WorkflowConnection active={beat >= 0} label="Request + 8 requirements" status="context" vertical={vertical} />
        <CompanyCard accepted={beat >= 1} revealed={beat >= 2} guarded={beat >= 3} />
      </div>
      <Reveal show={beat >= 2} className="grid gap-3 sm:grid-cols-3">
        {[
          ['One Orchestrator', 'Plans and coordinates', 'orchestrator'],
          ['Six specialist agents', 'Each does one job well', 'research'],
          ['Inspector + human', 'Check and decide', 'validation'],
        ].map(([t, s, c]) => (
          <div key={t} className="rounded-xl border border-line bg-raised p-3">
            <p className="font-semibold" style={{ color: COLORS[c] }}>
              {t}
            </p>
            <p className="text-sm text-muted">{s}</p>
          </div>
        ))}
      </Reveal>
      <Quote show={beat >= 4} color={COLORS.company}>
        A coordinated system of specialists, not one giant chatbot.
      </Quote>
    </div>
  );
}

export function SceneOrchestrator({ beat }) {
  const { openRole } = useRole();
  const stepOn = [0, 1, 2, 3, 7, 7][beat] ?? 7;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="rounded-xl border border-line bg-raised p-3">
          <SectionLabel className="mb-1">Customer goal</SectionLabel>
          <p className="text-sm">A safe house, within £90k, in 12 weeks, meeting requirements R1–R8.</p>
        </div>
        <div className="flex justify-center text-[15px]">
          <OrchestratorNode state="active" sub="The invisible project manager" />
        </div>
        <p className="text-sm text-muted">It coordinates. It never researches, designs, prices or builds the house itself.</p>
      </div>

      <ol className="flex flex-wrap items-center gap-1.5" aria-label="Orchestrator workflow">
        {ORCHESTRATOR_STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5" aria-current={i === stepOn ? 'step' : undefined}>
            <motion.span
              initial={false}
              animate={{ opacity: i <= stepOn ? 1 : 0.3, scale: i === stepOn ? 1.06 : 1 }}
              className="rounded-md border px-2 py-1 font-mono text-[11px] font-bold"
              style={{ borderColor: i <= stepOn ? COLORS.orchestrator : '#273552', color: i <= stepOn ? '#fcd34d' : '#6b7c9c' }}
            >
              {s}
            </motion.span>
            {i < ORCHESTRATOR_STEPS.length - 1 && (
              <span aria-hidden="true" className="text-faint">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4" aria-label="Task plan">
        {TASK_PLAN.map((t, i) => {
          const role = roles[t.role];
          return (
            <Reveal key={t.n} as="li" show={beat >= 1} delay={i * 0.07}>
              <div className="flex h-full flex-col gap-1.5 rounded-xl border border-line bg-surface p-2.5">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-400/20 font-mono text-[11px] font-bold text-amber-200">{t.n}</span>
                  <span className="text-sm font-semibold leading-tight">{t.title}</span>
                </div>
                <motion.button
                  type="button"
                  onClick={() => openRole(t.role)}
                  initial={false}
                  animate={{ opacity: beat >= 2 ? 1 : 0 }}
                  className="chip w-fit cursor-pointer"
                  style={{ '--chip': COLORS[role.color] }}
                  tabIndex={beat >= 2 ? 0 : -1}
                  aria-label={`Assigned to ${role.name}. Open role details.`}
                >
                  <RoleIcon roleId={t.role} size="1em" /> {role.short}
                </motion.button>
                <motion.span initial={false} animate={{ opacity: beat >= 3 ? 1 : 0 }} className="font-mono text-[11px] text-muted">
                  {t.note ? `Runs ${t.note}` : t.needs.length ? `Waits for approved: ${t.needs.map((n) => `#${n}`).join(', ')}` : 'Starts first'}
                </motion.span>
              </div>
            </Reveal>
          );
        })}
      </ol>
      <Quote show={beat >= 5} color={COLORS.orchestrator}>
        {QUOTES.orchestrator}
      </Quote>
    </div>
  );
}

export function SceneAgents({ beat }) {
  const { openRole } = useRole();
  const focus = beat >= 1 && beat <= 6 ? SPECIALISTS[beat - 1] : null;
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-line bg-raised p-3">
        <SectionLabel className="mb-1">What is an AI agent?</SectionLabel>
        <p className="text-[15px]">{AGENT_DEFINITION}</p>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {SPECIALISTS.map((id) => {
          const r = roles[id];
          const c = COLORS[r.color];
          const on = focus === id;
          return (
            <li key={id}>
              <motion.button
                type="button"
                onClick={() => openRole(id)}
                initial={false}
                animate={{ opacity: focus && !on ? 0.45 : 1, scale: on ? 1.02 : 1 }}
                className="flex h-full w-full flex-col gap-2 rounded-xl border-2 bg-surface p-3 text-left"
                style={{ borderColor: on ? c : `${c}55`, boxShadow: on ? `0 0 24px ${c}40` : undefined }}
                aria-label={`${r.name}: ${r.responsibility} Open role details.`}
              >
                <span className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `${c}22`, color: c }}>
                    <RoleIcon roleId={id} size={18} />
                  </span>
                  <span className="font-display text-lg font-semibold">{r.name}</span>
                </span>
                <span className="text-sm text-muted">{r.responsibility}</span>
                <span className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="chip" style={{ '--chip': '#a3b3d1' }}>
                    In: {r.inputs[0]}
                  </span>
                  <ArrowRight size={13} aria-hidden="true" className="text-faint" />
                  <span className="chip" style={{ '--chip': c }}>
                    Out: {r.outputs[0]}
                  </span>
                </span>
                <span className="text-xs text-muted">
                  <span className="font-semibold text-fg">Next:</span> {r.next.join(', ')}
                </span>
                <span className="text-xs text-amber-200/90">Guardrail: {r.guardrail}</span>
              </motion.button>
            </li>
          );
        })}
      </ul>
      <Reveal show={beat >= 7} className="grid gap-3 sm:grid-cols-2">
        {['validation', 'human'].map((id) => {
          const r = roles[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => openRole(id)}
              className="flex items-start gap-3 rounded-xl border-2 border-dashed bg-surface p-3 text-left"
              style={{ borderColor: `${COLORS[r.color]}88` }}
              aria-label={`${r.name}: ${r.category}. Open role details.`}
            >
              <span className="mt-0.5" style={{ color: COLORS[r.color] }}>
                <RoleIcon roleId={id} size={20} />
              </span>
              <span>
                <span className="block font-semibold">
                  {r.name}
                  {r.alias ? ` · ${r.alias}` : ''}
                </span>
                <span className="text-sm text-muted">{r.category}</span>
              </span>
            </button>
          );
        })}
      </Reveal>
    </div>
  );
}
