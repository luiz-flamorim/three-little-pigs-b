import { motion } from 'framer-motion';
import { roles } from '../data/roles.js';
import { COLORS } from '../data/theme.js';
import { useRole } from '../context/RoleContext.jsx';

/** The three pigs, always shown as one customer group. */
export function CustomerCard({ size = 'lg', caption = 'Customer group · not AI agents', highlight = false }) {
  const { openRole, selectedId } = useRole();
  const big = size === 'lg';
  return (
    <button
      type="button"
      onClick={() => openRole('customers')}
      data-selected={selectedId === 'customers'}
      className="group relative w-full rounded-2xl border-2 bg-surface p-4 text-left transition hover:brightness-110 data-[selected=true]:outline data-[selected=true]:outline-2 data-[selected=true]:outline-offset-2 data-[selected=true]:outline-fg"
      style={{ borderColor: COLORS.customers, boxShadow: highlight ? `0 0 28px ${COLORS.customers}55` : undefined }}
      aria-label={`${roles.customers.name}: ${roles.customers.category}. Open role details.`}
    >
      <p className="eyebrow" style={{ color: COLORS.customers }}>
        The customers
      </p>
      <div className={`flex items-end gap-2 ${big ? 'my-2 text-[clamp(2.4rem,5vw,3.6rem)]' : 'my-1 text-3xl'}`} aria-hidden="true">
        {['🐷', '🐷', '🐷'].map((p, i) => (
          <motion.span key={i} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.15 }}>
            {p}
          </motion.span>
        ))}
      </div>
      <p className={`font-display font-semibold ${big ? 'text-xl' : 'text-base'}`}>The Three Little Pigs</p>
      <p className="text-sm text-muted">{caption}</p>
    </button>
  );
}
