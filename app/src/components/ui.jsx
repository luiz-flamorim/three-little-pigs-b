import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Ban,
  Check,
  Clock,
  CornerUpLeft,
  EyeOff,
  History,
  Siren,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { STATUS } from '../data/theme.js';

const STATUS_ICONS = {
  pass: Check,
  fail: X,
  return: CornerUpLeft,
  escalate: AlertTriangle,
  approve: BadgeCheck,
  pending: Clock,
  context: ArrowRight,
  secret: EyeOff,
  threat: Siren,
  ignored: Ban,
  outdated: History,
  unchecked: AlertTriangle,
};

export function StatusIcon({ status, size = '1em', ...rest }) {
  const Icon = STATUS_ICONS[status] ?? Clock;
  return <Icon size={size} aria-hidden="true" strokeWidth={2.5} {...rest} />;
}

export function Chip({ children, color, status, className = '', title }) {
  const c = color ?? STATUS[status]?.color;
  return (
    <span className={`chip ${className}`} style={c ? { '--chip': c } : undefined} title={title}>
      {status && <StatusIcon status={status} />}
      {children}
    </span>
  );
}

// Large teaching message.
export function Quote({ children, color = '#f5a524', className = '', show = true }) {
  return (
    <motion.blockquote
      initial={false}
      animate={{ opacity: show ? 1 : 0.12, y: show ? 0 : 6 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border-l-4 bg-raised/80 px-4 py-3 font-display text-[clamp(1rem,1.6vw,1.35rem)] font-semibold leading-snug text-fg ${className}`}
      style={{ borderColor: color }}
      aria-hidden={!show}
    >
      “{children}”
    </motion.blockquote>
  );
}

export function SectionLabel({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function Tooltip({ text, children, className = '' }) {
  return (
    <span className={`tip inline-flex ${className}`}>
      {children}
      <span className="tip-body" role="tooltip">
        {text}
      </span>
    </span>
  );
}

// Fades an element in when `show` becomes true, but keeps its space so layouts do not jump.
export function Reveal({ show, children, className = '', as = 'div', delay = 0 }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={false}
      animate={{ opacity: show ? 1 : 0.1, y: show ? 0 : 8 }}
      transition={{ duration: 0.45, delay: show ? delay : 0 }}
      aria-hidden={!show}
    >
      {children}
    </Comp>
  );
}
