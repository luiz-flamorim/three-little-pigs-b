import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { STATUS } from '../data/theme.js';
import { Chip } from './ui.jsx';

/** Shows exactly what is moving in the current hand-off, who sent it, who receives it, and what happens if it fails. */
export function HandoffCard({ step, index, total, compact = false }) {
  if (!step?.handoff) return null;
  const h = step.handoff;
  const fields = [
    ['What is moving', h.what],
    ['Produced by', h.from],
    ['Received by', h.to],
  ];
  return (
    <motion.section
      key={step.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-xl border border-line bg-surface/90 p-3"
      aria-label={`Hand-off ${index + 1} of ${total}: ${step.label}`}
    >
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="eyebrow">
          Hand-off {index + 1}/{total}
        </span>
        <span className="font-display text-base font-semibold">{step.label}</span>
        {step.guardrail && !compact && (
          <Chip color="#d9a92b" className="ml-auto">
            <ShieldCheck size="1em" aria-hidden="true" /> {step.guardrail}
          </Chip>
        )}
      </div>
      <dl className={`grid gap-x-4 gap-y-2 text-sm ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-5'}`}>
        {fields.map(([k, v]) => (
          <div key={k} className="min-w-0">
            <dt className="eyebrow !text-[10px]">{k}</dt>
            <dd className="text-fg">{v}</dd>
          </div>
        ))}
        <div className="min-w-0">
          <dt className="eyebrow !text-[10px]">Validated?</dt>
          <dd className="font-semibold" style={{ color: STATUS[h.status]?.color }}>
            {h.validated}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="eyebrow !text-[10px]">If it fails</dt>
          <dd className="text-muted">{h.ifFails}</dd>
        </div>
      </dl>
    </motion.section>
  );
}
