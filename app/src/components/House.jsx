import { motion } from 'framer-motion';

const BRICK =
  'repeating-linear-gradient(90deg, transparent 0 0.95em, rgba(0,0,0,0.35) 0.95em 1.03em), repeating-linear-gradient(0deg, #a5432f 0 0.42em, #5f2419 0.42em 0.5em)';
const STRAW = 'repeating-linear-gradient(100deg, #e0bb5e 0 0.18em, #a98734 0.18em 0.32em)';

const STAGE_NAMES = ['empty plot', 'foundation laid', 'walls up', 'reinforced door fitted', 'roof and chimney on', 'chimney guard fitted'];

/**
 * A CSS-only house that assembles in stages:
 * 0 plot · 1 foundation · 2 walls · 3 door · 4 roof + chimney · 5 chimney guard.
 * Size it with `size` (font-size); everything inside is in em.
 */
export function House({ stage = 5, material = 'brick', broken = false, safe = false, size = '1em', label }) {
  const fall = (rotate, x, y) => (broken ? { rotate, x, y, opacity: 0.75 } : { rotate: 0, x: 0, y: 0, opacity: 1 });
  const desc =
    label ??
    (broken ? `Collapsed ${material} house` : `House under construction: ${STAGE_NAMES[stage]}${safe ? ', safe to occupy' : ''}`);
  return (
    <div role="img" aria-label={desc} style={{ fontSize: size }} className="relative inline-block">
      <div className="relative" style={{ width: '7em', height: '6em' }}>
        {safe && !broken && (
          <motion.div
            className="absolute inset-[-0.6em] rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,0.35), transparent)' }}
          />
        )}
        {/* plot */}
        <div
          className="absolute bottom-0 left-[0.2em] right-[0.2em] h-[0.22em] rounded-full"
          style={{ background: stage === 0 ? 'transparent' : '#3b4a68', border: stage === 0 ? '1px dashed #6b7c9c' : 'none' }}
        />
        {stage >= 1 && (
          <motion.div
            className="absolute bottom-[0.22em] left-[0.55em] right-[0.55em] h-[0.45em] rounded-sm"
            style={{ background: '#8a94a8', originX: 0.5 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {stage >= 2 && (
          <motion.div
            className="absolute bottom-[0.67em] left-[1em] right-[1em] h-[2.6em] rounded-[0.1em]"
            style={{ background: material === 'brick' ? BRICK : STRAW, originY: 1 }}
            initial={{ scaleY: 0 }}
            animate={broken ? { scaleY: 1, ...fall(-16, '-0.4em', '0.5em') } : { scaleY: 1 }}
            transition={{ duration: broken ? 0.8 : 0.6 }}
          />
        )}
        {stage >= 3 && (
          <motion.div
            className="absolute bottom-[0.67em] left-[3em] h-[1.45em] w-[1em] rounded-t-[0.5em]"
            style={{
              background: material === 'brick' ? '#3a2a1f' : '#6b5326',
              boxShadow: material === 'brick' ? 'inset 0 0.35em 0 -0.25em #94a3b8, inset 0 -0.45em 0 -0.35em #94a3b8' : 'none',
            }}
            initial={{ opacity: 0 }}
            animate={broken ? { opacity: 1, ...fall(30, '0.6em', '0.6em') } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {stage >= 4 && (
          <>
            <motion.div
              className="absolute bottom-[4.4em] right-[1.8em] h-[1em] w-[0.55em]"
              style={{ background: material === 'brick' ? '#7b2f22' : '#a98734' }}
              initial={{ opacity: 0, y: '-0.6em' }}
              animate={broken ? { y: '2.2em', x: '0.8em', rotate: 50, opacity: 0.7 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute bottom-[3.2em] left-[0.55em] right-[0.55em] h-[2.1em]"
              style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', background: material === 'brick' ? '#475569' : '#c9a24a' }}
              initial={{ opacity: 0, y: '-1em' }}
              animate={broken ? { opacity: 0.8, ...fall(24, '1.1em', '1.9em') } : { opacity: 1, y: 0 }}
              transition={{ duration: broken ? 0.9 : 0.6 }}
            />
          </>
        )}
        {stage >= 5 && !broken && (
          <motion.div
            className="absolute bottom-[5.35em] right-[1.7em] h-[0.3em] w-[0.75em] rounded-sm"
            style={{ background: 'repeating-linear-gradient(90deg, #2dd4bf 0 0.1em, transparent 0.1em 0.2em)', border: '1px solid #2dd4bf' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            title="Chimney guard"
          />
        )}
      </div>
    </div>
  );
}
