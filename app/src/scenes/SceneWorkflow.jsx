// Scenes 5–9: without orchestration, with orchestration, guardrails and validation, the Wolf, the insider threat.
import { motion } from 'framer-motion';
import { Check, ShieldCheck, X } from 'lucide-react';
import { CONTROLLED_FLOW, FAILURE_FLOW } from '../data/flows.js';
import { CORRECTION, QUOTES, VALIDATION_CHECKS, VALIDATION_OUTCOMES } from '../data/content.js';
import { WOLF_ATTACKS } from '../data/threats.js';
import { roles } from '../data/roles.js';
import { COLORS, STATUS } from '../data/theme.js';
import { useLayout } from '../hooks/useMediaQuery.js';
import { AlertFeed, AttackCard, ControlledDiagram, FailureDiagram, WolfDiagram, controlledAlerts } from '../components/diagrams.jsx';
import { HandoffCard } from '../components/HandoffCard.jsx';
import { OutcomePanel } from '../components/OutcomePanel.jsx';
import { ReworkLoop } from '../components/ReworkLoop.jsx';
import { AgentsAtWork, GuardrailBoundary } from '../components/GuardrailBoundary.jsx';
import { InsiderDiagram, InsiderThreatState } from '../components/InsiderThreatState.jsx';
import { DecisionGateway } from '../components/FlowCanvas.jsx';
import { RoleNode } from '../components/nodes.jsx';
import { Chip, Quote, SectionLabel } from '../components/ui.jsx';

function StepStrip({ steps, index, tone }) {
  return (
    <ol className="flex flex-wrap gap-1" aria-label="Steps">
      {steps.map((s, i) => (
        <li
          key={s.id}
          title={s.label}
          aria-current={i === index ? 'step' : undefined}
          className="h-1.5 flex-1 rounded-full"
          style={{ minWidth: 14, background: i <= index ? tone : '#273552', opacity: i === index ? 1 : 0.65 }}
        >
          <span className="sr-only">
            Step {i + 1}: {s.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function SceneWithout({ beat }) {
  const layout = useLayout();
  const index = Math.min(beat, FAILURE_FLOW.length - 1);
  const step = FAILURE_FLOW[index];
  const final = index === FAILURE_FLOW.length - 1;
  return (
    <div className="flex flex-col gap-3">
      <StepStrip steps={FAILURE_FLOW} index={index} tone={COLORS.failure} />
      <div className="board-dots relative overflow-hidden rounded-2xl border border-red-500/25">
        <FailureDiagram beat={index} layout={layout} />
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="rounded-xl border border-red-500/30 bg-surface/90 p-3" aria-label="What is going wrong">
          <p className="eyebrow mb-1 !text-red-300">
            Failure {index + 1}/{FAILURE_FLOW.length}
          </p>
          <p className="font-display text-lg font-semibold">{step.label}</p>
          <p className="text-sm text-muted">{step.caption}</p>
          <p className="mt-2 text-xs text-muted">
            The agents are not careless or malicious. The system is missing coordination, validation and human review.
          </p>
        </section>
        {final ? (
          <OutcomePanel variant="failure" />
        ) : (
          <Quote show={index >= 6} color={COLORS.failure}>
            {QUOTES.failure}
          </Quote>
        )}
      </div>
      {final && (
        <Quote color={COLORS.failure} show>
          {QUOTES.failure}
        </Quote>
      )}
    </div>
  );
}

export function SceneWith({ beat, wolf }) {
  const layout = useLayout();
  const index = Math.min(beat, CONTROLLED_FLOW.length - 1);
  const step = CONTROLLED_FLOW[index];
  const alerts = wolf ? controlledAlerts(index) : [];
  return (
    <div className="flex flex-col gap-3">
      <StepStrip steps={CONTROLLED_FLOW} index={index} tone={COLORS.controlled} />
      <div className="board-dots relative overflow-hidden rounded-2xl border border-emerald-500/25">
        <ControlledDiagram beat={index} wolf={wolf} layout={layout} />
      </div>
      <HandoffCard step={step} index={index} total={CONTROLLED_FLOW.length} />
      <div className="grid gap-3 lg:grid-cols-2">
        {wolf && <AlertFeed attacks={alerts} />}
        {index === CONTROLLED_FLOW.length - 1 && <OutcomePanel variant="controlled" />}
      </div>
    </div>
  );
}

export function SceneGuardrails({ beat }) {
  const checking = beat >= 2;
  const failed = beat >= 3;
  const reworkIndex = beat === 3 ? 0 : beat === 4 ? 2 : beat >= 5 ? 5 : -1;
  const passed = beat >= 5;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col gap-3">
          <GuardrailBoundary breach={beat === 1} highlight={beat === 1 ? 'g-sources' : beat >= 3 ? 'g-stop' : undefined}>
            <AgentsAtWork breachAgent={beat === 1 ? 'research' : undefined} />
          </GuardrailBoundary>
          <Quote show={beat >= 0} color={COLORS.guardrails}>
            {QUOTES.guardrails}
          </Quote>
        </div>

        <section className="flex flex-col gap-3 rounded-2xl border border-teal-400/30 bg-surface/70 p-3" aria-label="Validation by the Building Inspector">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[15px]">
              <RoleNode roleId="validation" label="Validation Agent" sub="The Building Inspector" state={failed && !passed ? 'alert' : checking ? 'active' : 'idle'} />
            </span>
            <span className="text-sm text-muted">
              Checking: <span className="font-semibold text-fg">{passed ? 'House design v2' : CORRECTION.output}</span> from the{' '}
              <span style={{ color: COLORS.architecture }}>{roles.architecture.name}</span>
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2" aria-label="Acceptance criteria">
            {VALIDATION_CHECKS.map((c, i) => {
              const ran = checking;
              const isFail = c.fails && failed && !passed;
              return (
                <motion.li
                  key={c.id}
                  initial={false}
                  animate={{ opacity: ran ? 1 : 0.35 }}
                  transition={{ delay: beat === 2 ? i * 0.12 : 0 }}
                  className="flex items-start gap-1.5 text-[13px]"
                >
                  <span
                    className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full text-bg"
                    style={{ background: !ran ? '#273552' : isFail ? STATUS.fail.color : STATUS.pass.color }}
                    aria-hidden="true"
                  >
                    {ran && (isFail ? <X size={11} strokeWidth={3} /> : <Check size={11} strokeWidth={3} />)}
                  </span>
                  <span className={isFail ? 'font-semibold text-red-200' : ''}>
                    {c.text}
                    {isFail && <span className="block text-xs text-red-300">{c.fails}</span>}
                    <span className="sr-only">{!ran ? ' not checked yet' : isFail ? ' failed' : ' passed'}</span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center gap-2" aria-label="Possible outcomes">
            {VALIDATION_OUTCOMES.map((o) => {
              const current = (passed && o.id === 'pass') || (beat === 3 && o.id === 'fail') || (beat === 4 && o.id === 'return');
              return current ? (
                <DecisionGateway key={o.id} result={o.label} status={o.status} />
              ) : (
                <Chip key={o.id} color="#6b7c9c">
                  {o.label}
                </Chip>
              );
            })}
          </div>
          {failed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-2 text-sm">
              <p className="eyebrow mb-1 !text-amber-200">{passed ? 'Corrected in design v2' : 'Returned for correction'}</p>
              <p>
                <span className="font-semibold text-amber-200">Failed criterion:</span> {CORRECTION.criterion}
              </p>
              <p>
                <span className="font-semibold text-amber-200">Returned to:</span> {roles[CORRECTION.responsible].name}
              </p>
              <p>
                <span className="font-semibold text-amber-200">Correction:</span> {CORRECTION.instructions}
              </p>
              <p className="text-xs text-muted">
                {passed ? 'Revalidated: Finance and Risk may now start.' : 'Finance, Risk and Builder stay locked until the design passes.'}
              </p>
            </motion.div>
          )}
          <ReworkLoop active={reworkIndex} />
        </section>
      </div>
      <Quote show={beat >= 6} color={COLORS.validation}>
        {QUOTES.validation}
      </Quote>
    </div>
  );
}

export function SceneWolf({ beat, wolf, onEnable }) {
  const layout = useLayout();
  if (!wolf) return <ThreatOff name="Wolf disruption" onEnable={onEnable} text="The Wolf is a threat actor outside the workflow. Switch it on to see attacks being blocked or detected." />;
  const attack = WOLF_ATTACKS[beat - 1];
  const seen = WOLF_ATTACKS.slice(0, Math.max(0, Math.min(beat, WOLF_ATTACKS.length)));
  return (
    <div className="flex flex-col gap-3">
      <div className="board-dots relative overflow-hidden rounded-2xl border border-red-500/25">
        <WolfDiagram beat={beat} layout={layout} />
      </div>
      {attack ? (
        <AttackCard attack={attack} />
      ) : (
        <section className="rounded-xl border border-line bg-surface/90 p-3 text-sm">
          <p className="eyebrow mb-1">The Wolf</p>
          <p>
            Not a customer. Not a construction agent. It sits outside the guardrails and is never part of the task sequence. It cannot control the
            Orchestrator or decide the outcome.
          </p>
        </section>
      )}
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <AlertFeed attacks={seen} title="Detected and recorded" />
        <Quote show={beat > WOLF_ATTACKS.length} color={COLORS.wolf}>
          {QUOTES.wolf}
        </Quote>
      </div>
    </div>
  );
}

export function SceneInsider({ beat, insider, onEnable }) {
  const layout = useLayout();
  if (!insider)
    return (
      <ThreatOff
        name="Insider-threat scenario"
        onEnable={onEnable}
        text="In this optional scenario the Wolf secretly persuades one customer to share project information. The customer remains a customer throughout."
      />
    );
  return (
    <div className="flex flex-col gap-3">
      <div className="board-dots relative overflow-hidden rounded-2xl border border-rose-400/25">
        <InsiderDiagram beat={beat} layout={layout} />
      </div>
      <InsiderThreatState beat={beat} />
    </div>
  );
}

function ThreatOff({ name, text, onEnable }) {
  return (
    <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-line p-6 text-center">
      <div className="max-w-md">
        <ShieldCheck className="mx-auto mb-2 text-faint" size={32} aria-hidden="true" />
        <p className="font-display text-xl font-semibold">{name} is switched off</p>
        <p className="mt-1 text-sm text-muted">{text}</p>
        <button
          type="button"
          onClick={onEnable}
          className="mt-4 rounded-lg border border-red-400/50 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-400/20"
        >
          Switch on {name.toLowerCase()}
        </button>
        <SectionLabel className="mt-3">You can also use the threat switches in the control bar</SectionLabel>
      </div>
    </div>
  );
}
