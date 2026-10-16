import { motion } from 'framer-motion';
import { BadgeCheck, XCircle } from 'lucide-react';
import { CONTROLLED_OUTCOME, FAILURE_OUTCOME } from '../data/content.js';

/** Final outcome summary: green for the controlled version, red for the failure version. */
export function OutcomePanel({ variant = 'controlled', show = true, compact = false }) {
  const good = variant === 'controlled';
  const items = good ? CONTROLLED_OUTCOME : FAILURE_OUTCOME;
  const color = good ? '#10b981' : '#ef4444';
  const Icon = good ? BadgeCheck : XCircle;
  return (
    <motion.section
      initial={false}
      animate={{ opacity: show ? 1 : 0.15 }}
      className="rounded-xl border-2 p-3"
      style={{ borderColor: `${color}88`, background: `${color}14` }}
      aria-label={good ? 'Controlled outcome' : 'Failure outcome'}
      aria-hidden={!show}
    >
      <p className="eyebrow mb-2" style={{ color }}>
        {good ? 'Controlled outcome' : 'Failure outcome'}
      </p>
      <ul className={`grid gap-1.5 ${compact ? 'grid-cols-1' : good ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1'}`}>
        {items.map((t, i) => (
          <motion.li
            key={t}
            initial={false}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 4 }}
            transition={{ delay: show ? i * 0.12 : 0 }}
            className="flex items-center gap-1.5 font-mono text-[12px] font-bold"
            style={{ color: good ? '#a7f3d0' : '#fecaca' }}
          >
            <Icon size={15} aria-hidden="true" style={{ color }} />
            {t}
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}
