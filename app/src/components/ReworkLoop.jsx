import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { REWORK_STEPS } from '../data/content.js';

/**
 * The rework loop: VALIDATION FAILS → RETURN TO RESPONSIBLE AGENT → CORRECT OUTPUT → RESUBMIT → REVALIDATE.
 * `active` is the index of the current step (-1 = not started, 5 = loop complete).
 */
export function ReworkLoop({ active = -1 }) {
  return (
    <section aria-label="Rework loop" className="rounded-xl border border-amber-400/30 bg-surface/90 p-3">
      <p className="eyebrow mb-2 flex items-center gap-1.5 !text-amber-300">
        <RotateCcw size={13} aria-hidden="true" /> Rework loop
      </p>
      <ol className="flex flex-wrap items-center gap-1.5">
        {REWORK_STEPS.map((s, i) => {
          const on = i === active;
          const past = i < active;
          return (
            <li key={s} className="flex items-center gap-1.5" aria-current={on ? 'step' : undefined}>
              <motion.span
                initial={false}
                animate={{ scale: on ? 1.06 : 1 }}
                className="rounded-lg border px-2 py-1 font-mono text-[11px] font-bold"
                style={{
                  borderColor: on ? '#fbbf24' : past ? '#34d39966' : '#273552',
                  background: on ? '#fbbf2422' : 'transparent',
                  color: on ? '#fde68a' : past ? '#86efac' : '#6b7c9c',
                }}
              >
                {s}
              </motion.span>
              {i < REWORK_STEPS.length - 1 && (
                <span aria-hidden="true" className="text-faint">
                  →
                </span>
              )}
            </li>
          );
        })}
        <li aria-hidden="true" className="font-mono text-[11px] text-faint">
          ↺ until PASS
        </li>
      </ol>
    </section>
  );
}
