import { ArrowDown, ArrowRight, Siren } from 'lucide-react';
import { CONTROLLED_OUTCOME, CUSTOMER_REQUEST, GUARDRAILS, HUMAN_DECISIONS, KEY_MESSAGE, ORCHESTRATOR_STEPS, PROJECT, QUOTES, REQUIREMENTS } from '../data/content.js';
import { roles, SPECIALISTS } from '../data/roles.js';
import { COLORS } from '../data/theme.js';
import { WOLF_ATTACKS } from '../data/threats.js';
import { useRole } from '../context/RoleContext.jsx';
import { RoleIcon } from './nodes.jsx';
import { ReworkLoop } from './ReworkLoop.jsx';

function Sticky({ roleId, title, children, className = '' }) {
  const { openRole } = useRole();
  const c = COLORS[roles[roleId].color];
  return (
    <button
      type="button"
      onClick={() => openRole(roleId)}
      className={`sticky flex h-full flex-col gap-1 text-left transition hover:brightness-110 ${className}`}
      style={{ '--c': c }}
      aria-label={`${roles[roleId].name}. Open role details.`}
    >
      <span className="flex items-center gap-1.5 font-display text-[15px] font-semibold" style={{ color: c }}>
        <RoleIcon roleId={roleId} size={15} /> {title ?? roles[roleId].name}
      </span>
      <span className="text-[13px] text-fg/90">{children}</span>
    </button>
  );
}

const Arrow = ({ down }) => (
  <span className="grid place-items-center text-faint" aria-hidden="true">
    {down ? <ArrowDown size={20} /> : <ArrowRight size={20} />}
  </span>
);

/** One-page Miro-style summary of the whole architecture. */
export function SummaryBoard() {
  return (
    <section aria-label="Summary board" className="board-dots flex flex-col gap-4 rounded-2xl border border-line p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl font-semibold">The Three Little Agents on one page</h2>
        <p className="eyebrow">Select any note for the full role</p>
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,0.9fr)_auto_minmax(0,3fr)_auto_minmax(0,0.9fr)]">
        {/* WHAT */}
        <div className="flex flex-col gap-2">
          <p className="eyebrow">1 · Customers define WHAT</p>
          <Sticky roleId="customers" title="Three Little Pigs (customers)">
            “{CUSTOMER_REQUEST}”
          </Sticky>
          <ul className="grid grid-cols-2 gap-1">
            {REQUIREMENTS.map((r) => (
              <li key={r.id} className="rounded bg-yellow-200/10 px-1.5 py-1 text-[11px] text-yellow-100">
                <span className="font-mono font-bold">{r.id}</span> {r.short}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden xl:grid">
          <Arrow />
        </div>
        <div className="xl:hidden">
          <Arrow down />
        </div>

        {/* HOW */}
        <div className="relative flex flex-col gap-3 rounded-2xl border-[3px] border-dashed border-[#d9a92b] p-3 pt-5">
          <span className="chip absolute -top-3 left-3" style={{ '--chip': '#d9a92b', background: '#111a2e' }}>
            Guardrails surround the company
          </span>
          <p className="eyebrow">2 · AI construction company decides HOW</p>
          <Sticky roleId="orchestrator" title="Orchestrator · invisible project manager">
            {ORCHESTRATOR_STEPS.join(' → ')}
          </Sticky>
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALISTS.map((id, i) => (
              <li key={id}>
                <Sticky roleId={id} title={`${i + 1}. ${roles[id].name}`}>
                  <span className="block text-muted">In: {roles[id].inputs[0]}</span>
                  <span className="block font-semibold">Out: {roles[id].outputs[0]}</span>
                  <span className="block text-muted">Next: {roles[id].next[0]}</span>
                </Sticky>
              </li>
            ))}
          </ol>
          <div className="grid gap-2 md:grid-cols-2">
            <Sticky roleId="validation" title="Validation Agent · Building Inspector">
              PASS · FAIL · RETURN FOR CORRECTION · ESCALATE TO HUMAN REVIEW
            </Sticky>
            <Sticky roleId="human" title="Human Reviewer">
              {HUMAN_DECISIONS.map((d) => d.id).join(' · ')}
            </Sticky>
          </div>
          <ReworkLoop active={-1} />
          <Sticky roleId="guardrails" title="Guardrails (boundaries, not workers)">
            {GUARDRAILS.map((g) => g.text).join(' · ')}
          </Sticky>
        </div>
        <div className="hidden xl:grid">
          <Arrow />
        </div>
        <div className="xl:hidden">
          <Arrow down />
        </div>

        {/* OUTCOME */}
        <div className="flex flex-col gap-2">
          <p className="eyebrow">3 · Outcome</p>
          <div className="sticky" style={{ '--c': COLORS.outcome }}>
            <ul className="space-y-0.5 font-mono text-[12px] font-bold text-emerald-200">
              {CONTROLLED_OUTCOME.map((o) => (
                <li key={o}>✓ {o}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted">Only after validation, human approval and the Orchestrator’s final check.</p>
        </div>
      </div>

      {/* THREATS: outside the workflow */}
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-xl border-2 border-dashed border-red-400/60 p-3">
          <p className="eyebrow mb-1.5 flex items-center gap-1.5 !text-red-300">
            <Siren size={13} aria-hidden="true" /> Outside the workflow: the Wolf
          </p>
          <Sticky roleId="wolf" title="The Wolf (threat actor)">
            {QUOTES.wolf}
          </Sticky>
          <ul className="mt-2 grid grid-cols-1 gap-1 text-[12px] sm:grid-cols-2">
            {WOLF_ATTACKS.map((a) => (
              <li key={a.id} className="text-red-100/90">
                <span className="text-red-300">⋯›</span> {a.intention} → <span className="font-semibold text-amber-200">{a.outcome}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border-2 border-dashed border-rose-400/60 p-3">
          <p className="eyebrow mb-1.5 !text-rose-300">Insider threat (optional)</p>
          <p className="text-sm">
            The Wolf secretly persuades one customer to share project details. Monitoring detects unusual access, the Orchestrator pauses affected work,
            access is restricted to need-to-know, the Human Reviewer decides the response, locks are re-keyed and the customers are informed.
          </p>
          <p className="mt-1 text-xs text-muted">The customer stays a customer. It is a security event, not a judgement of character.</p>
        </div>
      </div>

      <div className="rounded-xl bg-raised/80 p-3">
        <ul className="grid gap-1 md:grid-cols-2">
          {KEY_MESSAGE.map((m) => (
            <li key={m.text} className="font-display text-[15px] font-semibold" style={{ color: COLORS[roles[m.role].color] }}>
              {m.text}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-display text-lg font-extrabold">
          {QUOTES.tagline[0]} <span className="text-emerald-400">{QUOTES.tagline[1]}</span>
        </p>
        <p className="mt-1 text-xs text-muted">{PROJECT.disclaimer}</p>
      </div>
    </section>
  );
}
