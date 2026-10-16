import {
  AlertTriangle,
  Building2,
  Check,
  ClipboardCheck,
  FileText,
  HardHat,
  Lock,
  Pause,
  PencilRuler,
  PoundSterling,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import { roles } from '../data/roles.js';
import { COLORS } from '../data/theme.js';
import { useRole } from '../context/RoleContext.jsx';

export const ROLE_ICONS = {
  customers: Users,
  company: Building2,
  orchestrator: Workflow,
  research: Search,
  architecture: PencilRuler,
  finance: PoundSterling,
  risk: ShieldAlert,
  builder: HardHat,
  writer: FileText,
  validation: ClipboardCheck,
  human: UserCheck,
  guardrails: ShieldCheck,
};

// Emoji are used only for the story characters (pigs, Wolf) and the house.
export const ROLE_EMOJI = { customers: '🐷', wolf: '🐺' };

const STATE_META = {
  idle: { text: '' },
  active: { text: 'working' },
  waiting: { text: 'locked: waiting for approved input', icon: Lock, color: '#a3b3d1' },
  done: { text: 'output approved', icon: Check, color: '#34d399' },
  fail: { text: 'output failed validation', icon: X, color: '#f87171' },
  alert: { text: 'needs attention', icon: AlertTriangle, color: '#fb923c' },
  paused: { text: 'paused', icon: Pause, color: '#fb923c' },
  restricted: { text: 'access restricted', icon: Lock, color: '#fbbf24' },
};

export function RoleIcon({ roleId, size = '1.15em' }) {
  if (ROLE_EMOJI[roleId]) return <span aria-hidden="true">{ROLE_EMOJI[roleId]}</span>;
  const Icon = ROLE_ICONS[roleId];
  return Icon ? <Icon size={size} aria-hidden="true" /> : null;
}

/**
 * A clickable role on the stage. Every role node opens the role panel.
 * `state` drives the visual status (active glow, lock, tick, cross, alert).
 */
export function RoleNode({ roleId, label, sub, state = 'idle', note, noteColor, emoji, showTip = true }) {
  const { openRole, selectedId } = useRole();
  const role = roles[roleId];
  const color = COLORS[role.color];
  const name = label ?? role.short;
  const meta = STATE_META[state] ?? STATE_META.idle;
  const Badge = meta.icon;
  return (
    <span className="tip relative inline-flex flex-col items-center">
      <button
        type="button"
        className="node"
        data-state={state}
        data-selected={selectedId === roleId}
        style={{ '--c': color }}
        onClick={() => openRole(roleId)}
        aria-label={`${name}, ${role.category}.${meta.text ? ` Status: ${meta.text}.` : ''} Open role details.`}
      >
        <span className="node-icon">{emoji ? <span aria-hidden="true">{emoji}</span> : <RoleIcon roleId={roleId} />}</span>
        <span className="flex flex-col">
          <span className="node-name">{name}</span>
          {sub && <span className="node-sub">{sub}</span>}
        </span>
        {Badge && (
          <span className="node-badge" style={{ background: meta.color }} aria-hidden="true">
            <Badge size="0.95em" strokeWidth={3} />
          </span>
        )}
      </button>
      {showTip && (
        <span className="tip-body" role="tooltip">
          {role.tagline}
        </span>
      )}
      {note && (
        <span className="chip pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2" style={{ '--chip': noteColor ?? '#f87171' }}>
          {note}
        </span>
      )}
    </span>
  );
}

// A dashed placeholder for a role that is missing (used in the failure version).
export function GhostNode({ label, flash = false }) {
  return (
    <span className="node" data-ghost="true" role="img" aria-label={label} style={flash ? { borderColor: '#f87171', color: '#fca5a5' } : undefined}>
      <span className="node-icon" aria-hidden="true">
        <Ban />
      </span>
      <span className="node-name">{label}</span>
    </span>
  );
}

function Ban() {
  return (
    <svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6l12.8 12.8" />
    </svg>
  );
}

// Named variants, matching the suggested component structure.
export const OrchestratorNode = (p) => <RoleNode roleId="orchestrator" {...p} />;
export const AgentNode = (p) => <RoleNode {...p} />;
export const ValidationNode = (p) => <RoleNode roleId="validation" {...p} />;
export const HumanReviewNode = (p) => <RoleNode roleId="human" {...p} />;
export const WolfThreatNode = (p) => <RoleNode roleId="wolf" emoji="🐺" {...p} />;
export const CustomerNode = (p) => <RoleNode roleId="customers" emoji="🐷" {...p} />;
