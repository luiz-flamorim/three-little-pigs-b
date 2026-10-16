// Header, control bar and scene navigator.
import { ChevronLeft, ChevronRight, Columns2, LayoutDashboard, Pause, Play, RotateCcw, ShieldOff, Clapperboard } from 'lucide-react';
import { PROJECT } from '../data/content.js';

const VIEWS = [
  { id: 'story', label: 'Story', icon: Clapperboard },
  { id: 'compare', label: 'Compare', icon: Columns2 },
  { id: 'board', label: 'Summary board', icon: LayoutDashboard },
];

export function Header({ view, onView }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 pb-3 pt-4">
      <div className="min-w-0">
        <h1 className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold leading-none tracking-tight">
          THE THREE LITTLE <span className="text-amber-400">AGENTS</span>
        </h1>
        <p className="mt-1 max-w-[60ch] text-sm text-muted">{PROJECT.subtitle}</p>
      </div>
      <nav aria-label="Views" className="flex gap-1 rounded-xl border border-line bg-surface p-1">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => onView(v.id)}
            aria-pressed={view === v.id}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${view === v.id ? 'bg-raised text-fg' : 'text-muted hover:text-fg'}`}
          >
            <v.icon size={16} aria-hidden="true" />
            {v.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

const btn =
  'inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-sm font-semibold text-fg transition hover:bg-raised disabled:cursor-not-allowed disabled:opacity-40';

function Toggle({ id, label, on, onChange, color }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`${btn} pr-2`}
      style={on ? { borderColor: `${color}99`, background: `${color}1a` } : undefined}
    >
      {label}
      <span className="relative h-5 w-9 rounded-full transition" style={{ background: on ? color : '#273552' }} aria-hidden="true">
        <span className="absolute top-0.5 h-4 w-4 rounded-full bg-fg transition-all" style={{ left: on ? '18px' : '2px' }} />
      </span>
      <span className="sr-only">{on ? 'on' : 'off'}</span>
    </button>
  );
}

export function ControlBar({ pb, mode, onMode, threats, onThreats, onResetThreats, view }) {
  const story = view === 'story';
  return (
    <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Story controls">
      <div className="flex flex-wrap items-center gap-1.5">
        <button type="button" className={`${btn} min-w-[8.5rem] justify-center !border-amber-400/60 !bg-amber-400/15`} onClick={pb.togglePlay} disabled={!story} aria-label={pb.isPlaying ? 'Pause the story' : 'Play the story'}>
          {pb.isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
          {pb.isPlaying ? 'Pause' : 'Play story'}
        </button>
        <button type="button" className={btn} onClick={pb.restart} disabled={!story} aria-label="Restart from scene 1">
          <RotateCcw size={16} aria-hidden="true" /> Restart
        </button>
        <button type="button" className={btn} onClick={pb.prev} disabled={!story || pb.isFirst} aria-label="Previous scene">
          <ChevronLeft size={16} aria-hidden="true" /> <span className="hidden sm:inline">Previous</span>
        </button>
        <button type="button" className={btn} onClick={pb.next} disabled={!story || pb.isLast} aria-label="Next scene">
          <span className="hidden sm:inline">Next</span> <ChevronRight size={16} aria-hidden="true" />
        </button>
        <label className="sr-only" htmlFor="speed">
          Playback speed
        </label>
        <select
          id="speed"
          value={pb.speed}
          onChange={(e) => pb.setSpeed(Number(e.target.value))}
          className="rounded-lg border border-line bg-surface px-2 py-2 text-sm font-semibold text-fg"
          title="Playback speed"
        >
          {[0.75, 1, 1.5, 2].map((s) => (
            <option key={s} value={s}>
              {s}×
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-1 rounded-xl border border-line bg-surface p-1" role="group" aria-label="Workflow mode">
        {[
          ['without', 'Without orchestration', '#ef4444'],
          ['with', 'With orchestration', '#22c55e'],
          ['compare', 'Compare side by side', '#a3b3d1'],
        ].map(([id, label, color]) => (
          <button
            key={id}
            type="button"
            onClick={() => onMode(id)}
            aria-pressed={mode === id}
            className="rounded-lg px-2.5 py-1.5 text-sm font-semibold transition"
            style={mode === id ? { background: `${color}26`, color: '#fff', boxShadow: `inset 0 0 0 1px ${color}` } : { color: '#a3b3d1' }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Threat scenarios">
        <Toggle id="toggle-wolf" label="Wolf disruption" on={threats.wolf} onChange={(v) => onThreats({ ...threats, wolf: v })} color="#f87171" />
        <Toggle id="toggle-insider" label="Insider threat" on={threats.insider} onChange={(v) => onThreats({ ...threats, insider: v })} color="#fb7185" />
        <button type="button" className={btn} onClick={onResetThreats} aria-label="Reset threat scenario: switch both threats off and replay the scene">
          <ShieldOff size={16} aria-hidden="true" /> Reset threats
        </button>
      </div>
    </div>
  );
}

export function SceneNavigator({ scenes, pb, insider, onGo }) {
  return (
    <nav aria-label="Scenes" className="flex flex-col gap-2">
      <ol className="grid grid-cols-6 gap-1 sm:grid-cols-12">
        {scenes.map((s, i) => {
          const current = i === pb.sceneIndex;
          const past = i < pb.sceneIndex;
          const dim = s.optional && !insider;
          return (
            <li key={s.id} className="min-w-0">
              <button
                type="button"
                onClick={() => onGo(i)}
                aria-current={current ? 'step' : undefined}
                aria-label={`Scene ${s.number}: ${s.title}${s.optional ? ' (optional)' : ''}`}
                title={`${s.number}. ${s.title}`}
                className="group flex w-full flex-col items-start gap-1 rounded-lg border px-1.5 py-1 text-left transition hover:bg-raised"
                style={{
                  borderColor: current ? '#f5a524' : '#273552',
                  background: current ? '#f5a52418' : undefined,
                  opacity: dim && !current ? 0.55 : 1,
                }}
              >
                <span className="font-mono text-[11px] font-bold" style={{ color: current ? '#fcd34d' : past ? '#a3b3d1' : '#6b7c9c' }}>
                  {String(s.number).padStart(2, '0')}
                  {s.optional ? '*' : ''}
                </span>
                <span className="hidden w-full truncate text-[11px] font-semibold text-muted lg:block">{s.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label="Overall story progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pb.progress * 100)}
      >
        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-[width] duration-500" style={{ width: `${pb.progress * 100}%` }} />
      </div>
    </nav>
  );
}
