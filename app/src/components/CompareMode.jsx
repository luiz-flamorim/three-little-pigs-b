import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { COMPARE_PHASES, CONTROLLED_FLOW } from '../data/flows.js';
import { QUOTES } from '../data/content.js';
import { useStepper } from '../hooks/usePlayback.js';
import { useLayout } from '../hooks/useMediaQuery.js';
import { ControlledDiagram, FailureDiagram } from './diagrams.jsx';
import { HandoffCard } from './HandoffCard.jsx';
import { OutcomePanel } from './OutcomePanel.jsx';

const btn =
  'inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-fg transition hover:bg-raised disabled:cursor-not-allowed disabled:opacity-40';

/** Both versions side by side on one shared timeline. */
export function CompareMode({ wolf }) {
  const layout = useLayout();
  const st = useStepper(COMPARE_PHASES.length, 4300);
  const phase = COMPARE_PHASES[st.index];
  const final = !!phase.final;
  return (
    <section aria-label="Compare modes side by side" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Comparison controls">
        <button type="button" className={`${btn} min-w-[7.5rem] justify-center !border-amber-400/60 !bg-amber-400/15`} onClick={st.toggle}>
          {st.playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {st.playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" className={btn} onClick={st.restart}>
          <RotateCcw size={16} aria-hidden="true" /> Restart
        </button>
        <button type="button" className={btn} onClick={() => st.goTo(st.index - 1)} disabled={st.index === 0} aria-label="Previous phase">
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <button type="button" className={btn} onClick={() => st.goTo(st.index + 1)} disabled={st.index === COMPARE_PHASES.length - 1} aria-label="Next phase">
          <ChevronRight size={16} aria-hidden="true" />
        </button>
        <ol className="flex flex-wrap gap-1" aria-label="Phases">
          {COMPARE_PHASES.map((p, i) => (
            <li key={p.label}>
              <button
                type="button"
                onClick={() => {
                  st.pause();
                  st.goTo(i);
                }}
                aria-current={i === st.index ? 'step' : undefined}
                className="rounded-md border px-2 py-1 font-mono text-[11px] font-bold"
                style={{ borderColor: i === st.index ? '#f5a524' : '#273552', color: i <= st.index ? '#e8eefb' : '#6b7c9c' }}
              >
                {i + 1}. {p.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <p className="sr-only" aria-live="polite">
        Phase {st.index + 1}, {phase.label}. Without orchestration: {phase.without} With orchestration: {phase.with}
      </p>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="flex min-w-0 flex-col gap-2 rounded-2xl border border-red-500/30 bg-surface/60 p-3" aria-label="Without effective orchestration">
          <h2 className="font-display text-lg font-semibold text-red-300">Without effective orchestration</h2>
          <div className="board-dots overflow-hidden rounded-xl">
            <FailureDiagram beat={phase.failure} layout={layout} compact />
          </div>
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-100">{phase.without}</p>
          {final && (
            <>
              <OutcomePanel variant="failure" compact />
              <p className="text-sm italic text-muted">“{QUOTES.failure}”</p>
            </>
          )}
        </article>
        <article className="flex min-w-0 flex-col gap-2 rounded-2xl border border-emerald-500/30 bg-surface/60 p-3" aria-label="With orchestration, guardrails and human oversight">
          <h2 className="font-display text-lg font-semibold text-emerald-300">With orchestration, guardrails and human oversight</h2>
          <div className="board-dots overflow-hidden rounded-xl">
            <ControlledDiagram beat={phase.controlled} wolf={wolf} layout={layout} compact />
          </div>
          <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">{phase.with}</p>
          {final ? (
            <OutcomePanel variant="controlled" />
          ) : (
            <HandoffCard step={CONTROLLED_FLOW[phase.controlled]} index={phase.controlled} total={CONTROLLED_FLOW.length} compact />
          )}
        </article>
      </div>
    </section>
  );
}
