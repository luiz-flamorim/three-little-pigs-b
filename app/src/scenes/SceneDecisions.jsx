// Scenes 10–12: human oversight, the Orchestrator's final check, and the outcome.
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock, Unlock } from 'lucide-react';
import { FINAL_CHECKS, HUMAN_DECISIONS, KEY_MESSAGE, PROJECT, QUOTES } from '../data/content.js';
import { humanCases } from '../data/scenes.js';
import { roles } from '../data/roles.js';
import { COLORS } from '../data/theme.js';
import { CustomerCard } from '../components/CustomerCard.jsx';
import { House } from '../components/House.jsx';
import { OutcomePanel } from '../components/OutcomePanel.jsx';
import { WorkflowConnection } from '../components/WorkflowConnection.jsx';
import { HumanReviewNode, OrchestratorNode, RoleIcon } from '../components/nodes.jsx';
import { useLayout } from '../hooks/useMediaQuery.js';
import { Quote, Reveal, SectionLabel } from '../components/ui.jsx';

export function SceneHuman({ beat, insider }) {
  const cases = humanCases(insider);
  const caseIndex = beat - 1;
  const current = cases[caseIndex];
  const done = beat > cases.length;
  const [tried, setTried] = useState(null);
  const triedDecision = HUMAN_DECISIONS.find((d) => d.id === tried?.decision && tried?.caseId === current?.id);
  const mandatory = roles.human.escalation;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <div className="flex flex-col gap-3">
          <div className="text-[15px]">
            <HumanReviewNode state={current ? 'active' : done ? 'done' : 'idle'} label="Human Reviewer" sub="A person, accountable" />
          </div>
          <SectionLabel>Escalation queue</SectionLabel>
          <ol className="flex flex-col gap-1.5">
            {cases.map((c, i) => {
              const state = i < caseIndex || done ? 'decided' : i === caseIndex ? 'now' : 'waiting';
              return (
                <li
                  key={c.id}
                  className="flex items-center gap-2 rounded-lg border px-2 py-1.5 text-sm"
                  style={{ borderColor: state === 'now' ? COLORS.human : '#273552', opacity: state === 'waiting' ? 0.5 : 1 }}
                  aria-current={state === 'now' ? 'step' : undefined}
                >
                  <span style={{ color: COLORS[roles[c.from].color] }}>
                    <RoleIcon roleId={c.from} size={15} />
                  </span>
                  <span className="min-w-0 flex-1">{c.title}</span>
                  {state === 'decided' && (
                    <span className="chip" style={{ '--chip': '#34d399' }}>
                      {c.decision}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex flex-col gap-3">
            {current ? (
              <motion.section
                key={current.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border-2 bg-surface p-3"
                style={{ borderColor: `${COLORS.human}88` }}
                aria-label={`Escalated case: ${current.title}`}
              >
                <p className="eyebrow" style={{ color: COLORS.human }}>
                  Escalated by the {roles[current.from].name}
                </p>
                <p className="font-display text-xl font-semibold">{current.title}</p>
                <p className="text-sm text-muted">{current.detail}</p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold text-orange-200">Why a human must decide:</span> {current.trigger}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Decision options. Try one to see what it would do.">
                  {HUMAN_DECISIONS.map((d) => {
                    const chosen = d.id === current.decision;
                    const isTried = tried?.decision === d.id && tried?.caseId === current.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setTried({ caseId: current.id, decision: d.id })}
                        aria-pressed={isTried}
                        className="rounded-md border px-2 py-1 font-mono text-[11px] font-bold transition hover:brightness-125"
                        style={{
                          borderColor: chosen ? '#34d399' : isTried ? COLORS.human : '#273552',
                          background: chosen ? '#34d39922' : isTried ? `${COLORS.human}22` : 'transparent',
                          color: chosen ? '#a7f3d0' : '#e8eefb',
                        }}
                      >
                        {d.id}
                        {chosen && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-sm">
                  <span className="font-semibold text-emerald-300">Decision taken: {current.decision}.</span> {current.outcome}
                </p>
                {triedDecision && (
                  <p className="mt-1 text-sm text-orange-100" role="status">
                    If you chose {triedDecision.id}: {triedDecision.effect}
                  </p>
                )}
              </motion.section>
            ) : (
              <motion.section key={done ? 'done' : 'intro'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-line bg-surface p-3">
                <p className="font-display text-xl font-semibold">{done ? 'Every escalation decided and recorded.' : 'Some decisions need a person.'}</p>
                <p className="text-sm text-muted">
                  The Validation Agent can check outputs, but it cannot take responsibility. High-risk and uncertain decisions go to the Human Reviewer.
                </p>
              </motion.section>
            )}

          <section className="rounded-xl border border-line bg-surface/80 p-3" aria-label="When human approval is mandatory">
            <SectionLabel className="mb-1.5">Human approval is mandatory when</SectionLabel>
            <ul className="grid grid-cols-1 gap-1 text-[13px] sm:grid-cols-2">
              {mandatory.map((m) => {
                const hit = current?.trigger === m;
                return (
                  <li key={m} className="flex items-start gap-1.5" style={{ color: hit ? '#fdba74' : '#a3b3d1', fontWeight: hit ? 700 : 400 }}>
                    <span aria-hidden="true">{hit ? '▶' : '•'}</span>
                    {m}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
      <Quote show={done} color={COLORS.human}>
        Validation checks the work. A human stays accountable for important decisions.
      </Quote>
    </div>
  );
}

export function SceneFinal({ beat }) {
  const ticked = beat === 0 ? 0 : Math.min(FINAL_CHECKS.length, beat * 2);
  const unlocked = ticked >= FINAL_CHECKS.length && beat >= 6;
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)]">
      <div className="flex flex-col items-start gap-3">
        <div className="text-[15px]">
          <OrchestratorNode state={unlocked ? 'done' : 'active'} sub="Final completeness check" />
        </div>
        <p className="text-sm text-muted">After validation and human approval, the Orchestrator confirms nothing is missing before delivery.</p>
        <motion.div
          initial={false}
          animate={{ borderColor: unlocked ? '#10b981' : '#273552', background: unlocked ? '#10b98122' : '#111a2e' }}
          className="flex w-full items-center gap-3 rounded-xl border-2 p-3"
          role="status"
          aria-label={unlocked ? 'Delivery unlocked' : 'Delivery locked until every item is confirmed'}
        >
          {unlocked ? <Unlock className="text-emerald-400" aria-hidden="true" /> : <Lock className="text-faint" aria-hidden="true" />}
          <span>
            <span className="block font-semibold">{unlocked ? 'Delivery unlocked' : 'Delivery locked'}</span>
            <span className="text-sm text-muted">
              {ticked} of {FINAL_CHECKS.length} items confirmed
            </span>
          </span>
        </motion.div>
      </div>
      <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Final check list">
        {FINAL_CHECKS.map((c, i) => {
          const on = i < ticked;
          return (
            <motion.li
              key={c.text}
              initial={false}
              animate={{ opacity: on ? 1 : 0.4 }}
              className="flex items-start gap-2 rounded-lg border bg-surface p-2"
              style={{ borderColor: on ? '#34d39955' : '#273552' }}
            >
              <motion.span
                initial={false}
                animate={{ scale: on ? 1 : 0.8, background: on ? '#34d399' : '#273552' }}
                className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full text-bg"
                aria-hidden="true"
              >
                {on && <Check size={13} strokeWidth={3} />}
              </motion.span>
              <span className="text-sm">
                <span className="font-semibold">{c.text}</span>
                <span className="block font-mono text-[11px] text-muted">{c.evidence}</span>
                <span className="sr-only">{on ? ' confirmed' : ' not yet confirmed'}</span>
              </span>
            </motion.li>
          );
        })}
      </ol>
      <Quote show={unlocked} color={COLORS.orchestrator} className="lg:col-span-2">
        Only then may the outcome be delivered to the pigs.
      </Quote>
    </div>
  );
}

export function SceneOutcome({ beat }) {
  const vertical = useLayout() === 'tall';
  const [stage, setStage] = useState(0);
  // Assemble the house one part at a time during the first beat.
  useEffect(() => {
    if (beat !== 0 || stage >= 5) return undefined;
    const id = setTimeout(() => setStage((s) => Math.min(5, s + 1)), stage === 0 ? 300 : 750);
    return () => clearTimeout(id);
  }, [beat, stage]);
  const built = beat >= 1 ? 5 : stage;
  return (
    <div className="flex flex-col gap-4">
      <div className={`grid items-center gap-3 ${vertical ? 'grid-cols-1' : 'grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,1fr)]'}`}>
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-500/30 bg-surface p-4">
          <House stage={built} safe={built >= 5} size="clamp(14px, 2.2vw, 22px)" />
          <span className="chip" style={{ '--chip': '#10b981' }}>
            {built >= 5 ? 'Safe to occupy' : 'Building the approved design'}
          </span>
        </div>
        <WorkflowConnection active={beat >= 1} label="Safe house + final report" status="approve" vertical={vertical} />
        <CustomerCard size="sm" caption={beat >= 1 ? 'Customers receive the approved house' : 'Waiting for handover'} highlight={beat >= 1} />
      </div>
      <OutcomePanel variant="controlled" show={beat >= 2} />
      <Reveal show={beat >= 3}>
        <ul className="grid grid-cols-1 gap-1.5 md:grid-cols-2" aria-label="Key teaching message">
          {KEY_MESSAGE.map((m, i) => (
            <motion.li
              key={m.text}
              initial={false}
              animate={{ opacity: beat >= 3 ? 1 : 0, x: beat >= 3 ? 0 : -8 }}
              transition={{ delay: beat === 3 ? i * 0.35 : 0 }}
              className={`flex items-center gap-2 rounded-lg border-l-4 bg-raised px-3 py-2 font-display text-[clamp(0.95rem,1.4vw,1.15rem)] font-semibold ${i === KEY_MESSAGE.length - 1 ? 'md:col-span-2' : ''}`}
              style={{ borderColor: COLORS[roles[m.role].color] }}
            >
              <ArrowRight size={15} aria-hidden="true" style={{ color: COLORS[roles[m.role].color] }} />
              {m.text}
            </motion.li>
          ))}
        </ul>
      </Reveal>
      <Reveal show={beat >= 4} className="text-center">
        <p className="font-display text-[clamp(1.6rem,4vw,3rem)] font-extrabold leading-tight tracking-tight">
          {QUOTES.tagline[0]}
          <br />
          <span className="text-emerald-400">{QUOTES.tagline[1]}</span>
        </p>
        <p className="mt-2 text-xs text-muted">{PROJECT.disclaimer}</p>
      </Reveal>
    </div>
  );
}
