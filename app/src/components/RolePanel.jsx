import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CAST_ORDER, FIELD_LABELS, fieldLabel, roles } from '../data/roles.js';
import { GLOSSARY } from '../data/content.js';
import { COLORS } from '../data/theme.js';
import { useRole } from '../context/RoleContext.jsx';
import { RoleIcon } from './nodes.jsx';

const LIST_FIELDS = ['inputs', 'tasks', 'outputs', 'restrictions', 'next', 'escalation'];

/** Full role details: name, category, responsibility, inputs, tasks, outputs, restrictions, next recipient, escalation. */
export function RolePanel({ roleId, onClose }) {
  const role = roles[roleId];
  const headingRef = useRef(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, [roleId]);
  if (!role) return null;
  const color = COLORS[role.color];
  return (
    <section aria-labelledby="role-heading" className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-xl text-xl" style={{ background: `${color}22`, color }}>
          <RoleIcon roleId={roleId} size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="role-heading" ref={headingRef} tabIndex={-1} className="font-display text-xl font-semibold leading-tight outline-none">
            {role.name}
          </h2>
          {role.alias && <p className="text-sm font-semibold" style={{ color }}>{role.alias}</p>}
          <p className="eyebrow mt-0.5">{role.category}</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-raised hover:text-fg" aria-label="Close role details">
          <X size={18} aria-hidden="true" />
        </button>
      </div>
      <div>
        <p className="eyebrow mb-0.5">{FIELD_LABELS.responsibility}</p>
        <p className="text-sm">{role.responsibility}</p>
      </div>
      {LIST_FIELDS.map((key, i) => (
        <details key={key} open={i < 3 || key === 'next'} className="group rounded-lg border border-line bg-bg/40 px-3 py-2">
          <summary className="cursor-pointer list-none text-sm font-semibold marker:hidden">
            <span className="flex items-center justify-between">
              {fieldLabel(role, key)}
              <span className="font-mono text-[11px] text-muted">
                {role[key].length} <span aria-hidden="true" className="inline-block transition group-open:rotate-90">›</span>
              </span>
            </span>
          </summary>
          <ul className="mt-1.5 space-y-1 text-sm text-muted">
            {role[key].map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" style={{ color }}>
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </section>
  );
}

/** The default sidebar content: what to notice in this scene, the cast and a glossary. */
export function SceneGuide({ scene, threats }) {
  const { openRole } = useRole();
  return (
    <div className="flex flex-col gap-4">
      <section aria-label="What to notice">
        <p className="eyebrow mb-1">What to notice</p>
        <ul className="space-y-1.5 text-sm">
          {scene.look.map((l) => (
            <li key={l} className="flex gap-2">
              <span className="text-amber-400" aria-hidden="true">
                ▸
              </span>
              {l}
            </li>
          ))}
        </ul>
      </section>
      <section aria-label="Cast">
        <p className="eyebrow mb-1.5">Cast · select a role for details</p>
        <ul className="grid grid-cols-2 gap-1.5">
          {CAST_ORDER.filter((id) => id !== 'wolf' || threats.wolf || scene.id === 'without').map((id) => {
            const r = roles[id];
            const c = COLORS[r.color];
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => openRole(id)}
                  className="flex w-full items-center gap-2 rounded-lg border bg-surface px-2 py-1.5 text-left text-sm hover:bg-raised"
                  style={{ borderColor: `${c}55` }}
                  aria-label={`${r.name}, ${r.category}. Open role details.`}
                >
                  <span style={{ color: c }}>
                    <RoleIcon roleId={id} size={15} />
                  </span>
                  <span className="truncate font-semibold">{r.short}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <details className="rounded-lg border border-line bg-bg/40 px-3 py-2">
        <summary className="cursor-pointer text-sm font-semibold">Plain-English glossary</summary>
        <dl className="mt-2 space-y-2 text-sm">
          {GLOSSARY.map((g) => (
            <div key={g.term}>
              <dt className="font-semibold">{g.term}</dt>
              <dd className="text-muted">{g.text}</dd>
            </div>
          ))}
        </dl>
      </details>
    </div>
  );
}

/** On phones (and outside the story view) the role panel opens as a sheet over the page. */
export function RoleDrawer({ roleId, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!roleId) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 sm:items-stretch sm:justify-end" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${roles[roleId].name} details`}
        className="thin-scroll max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border border-line bg-surface p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:max-h-none sm:w-[400px] sm:rounded-none sm:rounded-l-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <RolePanel roleId={roleId} onClose={onClose} />
      </div>
    </div>
  );
}
