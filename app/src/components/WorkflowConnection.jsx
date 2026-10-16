import { motion, useReducedMotion } from 'framer-motion';
import { STATUS } from '../data/theme.js';
import { StatusIcon } from './ui.jsx';

/** A labelled information packet: what is moving and whether it has been validated. */
export function InformationPacket({ label, status = 'context' }) {
  const color = STATUS[status]?.color ?? '#a3b3d1';
  return (
    <span className="chip shadow-lg shadow-black/40" style={{ '--chip': color, background: '#0d1528' }}>
      <StatusIcon status={status} />
      {label}
    </span>
  );
}

/**
 * A simple connection between two cards in a row (horizontal) or column (vertical, on phones),
 * with a packet that travels along it when `active`.
 */
export function WorkflowConnection({ active, label, status = 'context', vertical = false, runKey = 0 }) {
  const reduce = useReducedMotion();
  const color = STATUS[status]?.color ?? '#a3b3d1';
  return (
    <div
      className={`relative flex items-center justify-center ${vertical ? 'h-24 w-full flex-col' : 'h-full min-h-[4rem] w-full'}`}
      aria-label={label ? `Hand-off: ${label}` : undefined}
    >
      <div
        className={vertical ? 'h-full w-[3px]' : 'h-[3px] w-full'}
        style={{ background: active ? color : '#273552', transition: 'background 0.4s' }}
      />
      <div
        className={`absolute ${vertical ? 'bottom-0 left-1/2 -translate-x-1/2 border-x-[7px] border-t-[10px] border-x-transparent' : 'right-0 top-1/2 -translate-y-1/2 border-y-[7px] border-l-[10px] border-y-transparent'}`}
        style={vertical ? { borderTopColor: active ? color : '#273552' } : { borderLeftColor: active ? color : '#273552' }}
        aria-hidden="true"
      />
      {active && label && (
        <motion.div
          key={runKey}
          className="absolute"
          initial={vertical ? { top: '0%', opacity: 0 } : { left: '0%', opacity: 0 }}
          animate={vertical ? { top: '50%', opacity: 1 } : { left: '50%', opacity: 1 }}
          transition={{ duration: reduce ? 0 : 1.3, ease: 'easeInOut' }}
          style={{ x: '-50%', y: '-50%', left: vertical ? '50%' : undefined, top: vertical ? undefined : '50%' }}
        >
          <InformationPacket label={label} status={status} />
        </motion.div>
      )}
    </div>
  );
}
