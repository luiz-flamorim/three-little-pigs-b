import { motion } from 'framer-motion';
import { Stamp } from 'lucide-react';
import { roles } from '../data/roles.js';
import { COLORS } from '../data/theme.js';
import { useRole } from '../context/RoleContext.jsx';
import { RoleIcon } from './nodes.jsx';

const TEAM = ['orchestrator', 'research', 'architecture', 'finance', 'risk', 'builder', 'writer', 'validation', 'human'];

/** The AI construction company: a coordinated team inside a guardrail boundary. */
export function CompanyCard({ accepted = false, revealed = false, guarded = false }) {
  const { openRole } = useRole();
  return (
    <section className="relative rounded-2xl border-2 bg-surface p-4" style={{ borderColor: COLORS.company }} aria-label="AI Construction Company">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <button type="button" onClick={() => openRole('company')} className="text-left" aria-label="AI Construction Company. Open role details.">
          <p className="eyebrow" style={{ color: COLORS.company }}>
            Service provider
          </p>
          <p className="font-display text-xl font-semibold">AI Construction Company</p>
        </button>
        <motion.span
          initial={false}
          animate={{ opacity: accepted ? 1 : 0, scale: accepted ? 1 : 1.6, rotate: accepted ? -6 : -20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          className="inline-flex items-center gap-1 rounded-md border-2 px-2 py-1 font-mono text-xs font-bold tracking-widest"
          style={{ borderColor: '#34d399', color: '#34d399' }}
          role="status"
          aria-hidden={!accepted}
        >
          <Stamp size={14} aria-hidden="true" /> WORK ACCEPTED
        </motion.span>
      </div>
      <motion.div
        initial={false}
        animate={{ borderColor: guarded ? '#d9a92b' : 'rgba(217,169,43,0)' }}
        className="relative mt-4 rounded-xl border-[3px] border-dashed p-3 pt-5"
      >
        {guarded && (
          <button
            type="button"
            onClick={() => openRole('guardrails')}
            className="chip absolute -top-3 left-3 cursor-pointer"
            style={{ '--chip': '#d9a92b', background: '#111a2e' }}
            aria-label="Guardrails. Open role details."
          >
            Guardrails
          </button>
        )}
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-3">
          {TEAM.map((id, i) => (
            <motion.li key={id} initial={false} animate={{ opacity: revealed ? 1 : 0.12, y: revealed ? 0 : 6 }} transition={{ delay: revealed ? i * 0.08 : 0 }}>
              <button
                type="button"
                onClick={() => openRole(id)}
                className="flex w-full flex-col items-center gap-1 rounded-lg border bg-raised px-1 py-2 text-center text-xs font-semibold hover:brightness-125"
                style={{ borderColor: `${COLORS[roles[id].color]}66` }}
                aria-label={`${roles[id].name}. Open role details.`}
                tabIndex={revealed ? 0 : -1}
              >
                <span style={{ color: COLORS[roles[id].color] }}>
                  <RoleIcon roleId={id} size={18} />
                </span>
                {roles[id].short}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
