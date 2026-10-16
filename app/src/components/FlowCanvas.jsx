import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Siren } from 'lucide-react';
import { STATUS } from '../data/theme.js';
import { useRole } from '../context/RoleContext.jsx';
import { StatusIcon } from './ui.jsx';

// Line styles. Legitimate flow is solid; Wolf interference is dotted red; insider activity is a separate dotted rose line.
const EDGE_STYLE = {
  structure: { stroke: '#273552', width: 1.6 },
  coord: { stroke: '#f5a524', width: 1.4, dash: '3 7', opacity: 0.45 },
  flow: { stroke: '#34d399', width: 3.2 },
  context: { stroke: '#f5a524', width: 3.2 },
  return: { stroke: '#fbbf24', width: 3.2, dash: '10 7', animated: true },
  escalate: { stroke: '#fb923c', width: 3.2 },
  approve: { stroke: '#10b981', width: 3.4 },
  unchecked: { stroke: '#f87171', width: 2.6, opacity: 0.85 },
  outdated: { stroke: '#fbbf24', width: 2.6, dash: '8 6' },
  ignored: { stroke: '#94a3b8', width: 2.4, dash: '6 8' },
  conflict: { stroke: '#f87171', width: 2.2, dash: '4 6', animated: true },
  threat: { stroke: '#f87171', width: 3, dash: '2 9', animated: true, cap: 'round' },
  secret: { stroke: '#fb7185', width: 3.2, dash: '1 8', animated: true, cap: 'round' },
};

const STATUS_TO_EDGE = {
  pass: 'flow',
  pending: 'flow',
  context: 'context',
  return: 'return',
  escalate: 'escalate',
  approve: 'approve',
  fail: 'unchecked',
  unchecked: 'unchecked',
  outdated: 'outdated',
  ignored: 'ignored',
  secret: 'secret',
  threat: 'threat',
};

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// First point along a→b that lies inside the rectangle (where a line from outside meets the boundary).
function enterPoint(a, b, r) {
  for (let i = 0; i <= 200; i += 1) {
    const p = lerp(a, b, i / 200);
    if (p[0] >= r.x && p[0] <= r.x + r.w && p[1] >= r.y && p[1] <= r.y + r.h) return p;
  }
  return lerp(a, b, 0.6);
}

function edgePath(a, b, curve = 0) {
  if (!curve) {
    const m = lerp(a, b, 0.5);
    return `M ${a[0]} ${a[1]} L ${m[0]} ${m[1]} L ${b[0]} ${b[1]}`;
  }
  // Quadratic curve split at t = 0.5 so the arrow marker sits in the middle.
  const mid = lerp(a, b, 0.5);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const c = [mid[0] - (dy / len) * curve, mid[1] + (dx / len) * curve];
  const l1 = lerp(a, c, 0.5);
  const r1 = lerp(c, b, 0.5);
  const m = lerp(l1, r1, 0.5);
  return `M ${a[0]} ${a[1]} Q ${l1[0]} ${l1[1]} ${m[0]} ${m[1]} Q ${r1[0]} ${r1[1]} ${b[0]} ${b[1]}`;
}

/**
 * The diagram engine used by the workflow scenes.
 * Everything is placed in canvas units (`size`), so the diagram scales without distortion.
 */
export function FlowCanvas({
  layout = 'wide',
  size,
  nodes,
  edges = [],
  packets = [],
  threats = [],
  gates = [],
  boundary,
  boundaryAlert = false,
  ghostBoundary = false,
  stepKey = 0,
  ariaLabel,
  children,
}) {
  const uid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const { openRole } = useRole();
  const [W, H] = size;
  const pos = Object.fromEntries(nodes.map((n) => [n.id, n.pos]));
  const pt = (ref) => (Array.isArray(ref) ? ref : pos[ref]);
  const pct = (p) => ({ left: `${(p[0] / W) * 100}%`, top: `${(p[1] / H) * 100}%` });

  const markerColors = [...new Set(Object.values(EDGE_STYLE).map((s) => s.stroke))];
  const markerId = (color) => `${uid}-m-${color.slice(1)}`;

  const drawn = [
    ...edges.map((e) => ({ ...e, a: pt(e.from), b: pt(e.to) })),
    ...packets.map((p) => ({ from: p.from, to: p.to, a: pt(p.from), b: pt(p.to), kind: STATUS_TO_EDGE[p.status] ?? 'flow', active: true, curve: p.curve })),
  ].filter((e) => e.a && e.b);

  const threatLines = threats
    .map((t) => {
      const a = pt(t.from ?? 'wolf');
      const target = pt(t.to);
      if (!a || !target) return null;
      const end = !t.reaches && boundary ? enterPoint(a, target, boundary) : target;
      return { ...t, a, b: end };
    })
    .filter(Boolean);

  return (
    <div className="flow" data-layout={layout} style={{ aspectRatio: `${W} / ${H}` }} role="group" aria-label={ariaLabel}>
      <svg className="flow-layer h-full w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          {markerColors.map((c) => (
            <marker key={c} id={markerId(c)} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="16" markerHeight="16" markerUnits="userSpaceOnUse" orient="auto">
              <path d="M1 1 L9 5 L1 9 z" fill={c} />
            </marker>
          ))}
        </defs>

        {boundary && (
          <motion.rect
            x={boundary.x}
            y={boundary.y}
            width={boundary.w}
            height={boundary.h}
            rx={28}
            fill={ghostBoundary ? 'none' : 'rgba(217,169,43,0.035)'}
            strokeWidth={ghostBoundary ? 2 : 3}
            strokeDasharray={ghostBoundary ? '4 26' : '14 9'}
            initial={false}
            animate={{ stroke: ghostBoundary ? '#3a4763' : boundaryAlert ? '#f87171' : '#d9a92b', strokeOpacity: boundaryAlert ? [1, 0.4, 1] : 0.9 }}
            transition={{ duration: boundaryAlert ? 0.9 : 0.4, repeat: boundaryAlert && !reduce ? 2 : 0 }}
          />
        )}

        {drawn.map((e, i) => {
          const s = EDGE_STYLE[e.active || e.kind === 'coord' ? e.kind : 'structure'] ?? EDGE_STYLE.structure;
          const d = edgePath(e.a, e.b, e.curve);
          const common = {
            d,
            fill: 'none',
            stroke: s.stroke,
            strokeWidth: s.width,
            strokeDasharray: s.dash,
            strokeLinecap: s.cap ?? 'butt',
            opacity: s.opacity ?? 1,
            markerMid: e.active || e.kind === 'coord' ? `url(#${markerId(s.stroke)})` : undefined,
          };
          if (!e.active) return <path key={`e-${i}`} {...common} />;
          return (
            <motion.path
              key={`a-${stepKey}-${i}`}
              {...common}
              className={s.animated ? 'dash-anim' : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: s.opacity ?? 1 }}
              transition={{ duration: reduce ? 0 : 0.45 }}
            />
          );
        })}

        {threatLines.map((t, i) => (
          <motion.path
            key={`t-${stepKey}-${i}`}
            d={edgePath(t.a, t.b, t.curve)}
            fill="none"
            stroke={EDGE_STYLE[t.kind ?? 'threat'].stroke}
            strokeWidth={EDGE_STYLE[t.kind ?? 'threat'].width}
            strokeDasharray={EDGE_STYLE[t.kind ?? 'threat'].dash}
            strokeLinecap="round"
            className="dash-anim"
            markerMid={`url(#${markerId(EDGE_STYLE[t.kind ?? 'threat'].stroke)})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.5 }}
          />
        ))}
      </svg>

      <div className="flow-layer">
        {boundary && (
          <div className="absolute" style={{ ...pct([boundary.x + 18, boundary.y]), transform: 'translateY(-50%)' }}>
            {ghostBoundary ? (
              <span className="chip" style={{ '--chip': '#6b7c9c' }}>
                No guardrails
              </span>
            ) : (
              <button
                type="button"
                onClick={() => openRole('guardrails')}
                className="chip cursor-pointer hover:brightness-125"
                style={{ '--chip': boundaryAlert ? '#f87171' : '#d9a92b', background: '#111a2e' }}
                aria-label="Guardrails: the boundary around the legitimate workflow. Open role details."
              >
                <ShieldCheck size="1.1em" aria-hidden="true" /> Guardrails
              </button>
            )}
          </div>
        )}

        {nodes.map((n) => (
          <motion.div
            key={n.id}
            className="absolute z-10"
            style={{ x: '-50%', y: '-50%' }}
            initial={false}
            animate={{ ...pct(n.pos), rotate: n.rotate ?? 0 }}
            transition={{ duration: reduce ? 0 : 0.6 }}
          >
            {n.el}
          </motion.div>
        ))}

        {packets.map((p, i) => {
          const a = pt(p.from);
          const b = pt(p.to);
          if (!a || !b) return null;
          const end = lerp(a, b, 0.62);
          const offsetY = (p.offset ?? 0) * 34;
          const start = pct(a);
          const stop = pct([end[0], end[1] + offsetY]);
          const color = STATUS[p.status]?.color ?? '#a3b3d1';
          return (
            <motion.div
              key={`p-${stepKey}-${i}`}
              className="pointer-events-none absolute z-20"
              style={{ x: '-50%', y: '-50%' }}
              initial={{ ...start, opacity: 0, scale: 0.8 }}
              animate={{ ...stop, opacity: 1, scale: 1 }}
              transition={{ duration: reduce ? 0 : 1.2, ease: 'easeInOut', delay: reduce ? 0 : 0.15 + i * 0.25 }}
            >
              <span className="chip shadow-lg shadow-black/40" style={{ '--chip': color, background: '#0d1528' }}>
                <StatusIcon status={p.status} />
                {p.label}
              </span>
            </motion.div>
          );
        })}

        {threatLines.filter((t) => t.label).map((t, i) => (
          <motion.div
            key={`tl-${stepKey}-${i}`}
            className="pointer-events-none absolute z-20"
            style={{ x: '-50%', y: '-50%' }}
            initial={{ ...pct(t.b), opacity: 0, scale: 0.6 }}
            animate={{ ...pct(t.b), opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.35 }}
          >
            <span
              className="chip"
              style={{ '--chip': t.blocked ? '#d9a92b' : EDGE_STYLE[t.kind ?? 'threat'].stroke, background: '#140d14', transform: `translateY(${t.labelBelow ? '1.9em' : '-1.9em'})` }}
            >
              {t.blocked ? <ShieldCheck size="1em" aria-hidden="true" /> : <Siren size="1em" aria-hidden="true" />}
              {t.label}
            </span>
          </motion.div>
        ))}

        {gates.map((g, i) => {
          const p = pt(g.at);
          if (!p) return null;
          return (
            <div key={`g-${stepKey}-${i}`} className="absolute z-30" style={{ ...pct([p[0], p[1] + (g.dy ?? -78)]), transform: 'translate(-50%,-50%)' }}>
              <DecisionGateway result={g.result} status={g.status} />
            </div>
          );
        })}

        {children}
      </div>
    </div>
  );
}

/** A diamond-shaped decision marker showing a pass/fail/return/escalate/approve outcome. */
export function DecisionGateway({ result, status }) {
  const color = STATUS[status]?.color ?? '#a3b3d1';
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.9 }}
      className="flex items-center gap-1.5"
      role="status"
      aria-label={`Decision: ${result}`}
    >
      <span className="grid h-[1.6em] w-[1.6em] rotate-45 place-items-center rounded-[0.25em] border-2" style={{ borderColor: color, background: '#0d1528' }}>
        <span className="-rotate-45" style={{ color }}>
          <StatusIcon status={status} size="0.95em" />
        </span>
      </span>
      <span className="chip font-bold" style={{ '--chip': color, background: '#0d1528' }}>
        {result}
      </span>
    </motion.div>
  );
}

/** Helper to place a node element at a named position for the current layout. */
export const at = (POS, id, layout) => POS[id][layout];
