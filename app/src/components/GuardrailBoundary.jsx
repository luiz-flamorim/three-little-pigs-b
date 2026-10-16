import { motion, useReducedMotion } from 'framer-motion';
import { Ban, ShieldCheck } from 'lucide-react';
import { GUARDRAILS } from '../data/content.js';
import { useRole } from '../context/RoleContext.jsx';
import { RoleIcon } from './nodes.jsx';

/**
 * Guardrails drawn as a gold boundary around the agents at work.
 * `breach` makes the boundary react to an attempted breach.
 */
export function GuardrailBoundary({ breach = false, highlight, children }) {
  const { openRole } = useRole();
  const reduce = useReducedMotion();
  return (
    <motion.section
      aria-label="Guardrails around the workflow"
      className="relative rounded-2xl border-[3px] border-dashed p-3 pt-6"
      initial={false}
      animate={{
        borderColor: breach ? '#f87171' : '#d9a92b',
        x: breach && !reduce ? [0, -5, 5, -3, 3, 0] : 0,
      }}
      transition={{ duration: 0.6 }}
    >
      <button
        type="button"
        onClick={() => openRole('guardrails')}
        className="chip absolute -top-3 left-4 cursor-pointer"
        style={{ '--chip': breach ? '#f87171' : '#d9a92b', background: '#111a2e' }}
        aria-label="Guardrails. Open role details."
      >
        <ShieldCheck size="1em" aria-hidden="true" /> Guardrails
      </button>
      <ul className="mb-3 flex flex-wrap gap-1.5" aria-label="Guardrail rules">
        {GUARDRAILS.map((g) => (
          <li
            key={g.id}
            className="chip"
            style={{ '--chip': highlight === g.id ? (breach ? '#f87171' : '#fde047') : '#d9a92b', fontWeight: highlight === g.id ? 700 : 500 }}
          >
            {g.text}
          </li>
        ))}
      </ul>
      {children}
    </motion.section>
  );
}

/** A small "agents at work" strip used inside the guardrail boundary. */
export function AgentsAtWork({ breachAgent }) {
  const agents = ['research', 'architecture', 'finance', 'risk', 'builder', 'writer'];
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-2 rounded-xl bg-bg/60 p-3">
      {agents.map((a) => (
        <span
          key={a}
          className="relative grid h-10 w-10 place-items-center rounded-lg border bg-surface"
          style={{ borderColor: breachAgent === a ? '#f87171' : '#273552' }}
          title={a}
        >
          <RoleIcon roleId={a} size={18} />
          {breachAgent === a && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-2 -top-2 rounded-full bg-red-400 p-0.5 text-bg" aria-hidden="true">
              <Ban size={12} />
            </motion.span>
          )}
        </span>
      ))}
      {breachAgent && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center text-sm text-red-200" role="status">
          Blocked: “unknown-materials-blog.example” is not an approved source. Action recorded.
        </motion.p>
      )}
    </div>
  );
}
