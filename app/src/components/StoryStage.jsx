import { motion } from 'framer-motion';
import { SceneAgents, SceneCompany, SceneCustomers, SceneOrchestrator } from '../scenes/SceneIntro.jsx';
import { SceneGuardrails, SceneInsider, SceneWith, SceneWithout, SceneWolf } from '../scenes/SceneWorkflow.jsx';
import { SceneFinal, SceneHuman, SceneOutcome } from '../scenes/SceneDecisions.jsx';

const SCENES = {
  customers: SceneCustomers,
  company: SceneCompany,
  orchestrator: SceneOrchestrator,
  agents: SceneAgents,
  without: SceneWithout,
  with: SceneWith,
  guardrails: SceneGuardrails,
  wolf: SceneWolf,
  insider: SceneInsider,
  human: SceneHuman,
  final: SceneFinal,
  outcome: SceneOutcome,
};

/** Renders the current scene with its header and the live caption. */
export function StoryStage({ scene, beat, beats, threats, onEnableThreat, runKey }) {
  const Scene = SCENES[scene.id];
  const tone = scene.id === 'without' ? '#f87171' : scene.id === 'with' ? '#4ade80' : '#fcd34d';
  return (
    <section aria-labelledby="scene-title" className="flex min-w-0 flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          <p className="eyebrow" style={{ color: tone }}>
            Scene {scene.number} of 12 · {scene.kicker}
          </p>
          <h2 id="scene-title" className="font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-tight">
            {scene.title}
          </h2>
        </div>
        <ol className="flex gap-1" aria-label={`Beat ${beat + 1} of ${beats.length}`}>
          {beats.map((_, i) => (
            <li key={i} className="h-1.5 w-4 rounded-full transition-colors" style={{ background: i <= beat ? tone : '#273552' }} />
          ))}
        </ol>
      </div>

      <div className="min-h-[24rem] lg:min-h-[32rem]">
        <motion.div key={`${scene.id}-${runKey}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Scene beat={beat} wolf={threats.wolf} insider={threats.insider} onEnable={() => onEnableThreat(scene.id === 'wolf' ? 'wolf' : 'insider')} />
        </motion.div>
      </div>

      <div className="rounded-xl border border-line bg-raised px-4 py-3" aria-live="polite" aria-atomic="true">
        <p className="eyebrow mb-0.5">Caption</p>
        <p className="text-[clamp(0.95rem,1.3vw,1.1rem)] font-medium">{beats[beat]?.caption}</p>
      </div>
    </section>
  );
}
