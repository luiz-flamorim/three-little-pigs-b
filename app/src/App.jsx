import { useCallback, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { buildScenes } from './data/scenes.js';
import { PROJECT } from './data/content.js';
import { usePlayback } from './hooks/usePlayback.js';
import { useMediaQuery } from './hooks/useMediaQuery.js';
import { RoleContext } from './context/RoleContext.jsx';
import { ControlBar, Header, SceneNavigator } from './components/Controls.jsx';
import { StoryStage } from './components/StoryStage.jsx';
import { RoleDrawer, RolePanel, SceneGuide } from './components/RolePanel.jsx';
import { CompareMode } from './components/CompareMode.jsx';
import { SummaryBoard } from './components/SummaryBoard.jsx';

const DEFAULT_THREATS = { wolf: true, insider: true };

export default function App() {
  const [view, setView] = useState('story');
  const [threats, setThreats] = useState(DEFAULT_THREATS);
  const [selectedId, setSelectedId] = useState(null);
  const [runKey, setRunKey] = useState(0);
  const scenes = useMemo(() => buildScenes(threats), [threats]);
  const pb = usePlayback(scenes);
  const scene = scenes[pb.sceneIndex];
  const isWide = useMediaQuery('(min-width: 1024px)');

  const replayScene = useCallback(() => {
    pb.replay();
    setRunKey((k) => k + 1);
  }, [pb]);

  const go = (i) => {
    setView('story');
    pb.goTo(i);
    setRunKey((k) => k + 1);
  };

  const changeView = (v) => {
    if (v !== 'story') pb.pause();
    setView(v);
  };

  const mode = view === 'compare' ? 'compare' : view === 'story' && (scene.id === 'without' || scene.id === 'with') ? scene.id : null;
  const setMode = (m) => {
    if (m === 'compare') return changeView('compare');
    go(scenes.findIndex((s) => s.id === m));
    return undefined;
  };

  const changeThreats = (next) => {
    setThreats(next);
    replayScene();
  };
  const resetThreats = () => changeThreats({ wolf: false, insider: false });

  const roleCtx = useMemo(() => ({ openRole: setSelectedId, selectedId }), [selectedId]);
  const closeRole = useCallback(() => setSelectedId(null), []);

  // Keyboard shortcuts: ← → change scene, Space plays or pauses, R restarts. Ignored while typing or on a focused control.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
        return;
      }
      if (view !== 'story' || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'SUMMARY'].includes(tag)) return;
      if (e.key === 'ArrowRight') pb.next();
      else if (e.key === 'ArrowLeft') pb.prev();
      else if (e.key === ' ') {
        e.preventDefault();
        pb.togglePlay();
      } else if (e.key === 'r' || e.key === 'R') pb.restart();
      else return;
      setRunKey((k) => k + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pb, view]);

  const sidebarPanel = view === 'story' && isWide;

  return (
    <RoleContext.Provider value={roleCtx}>
      <MotionConfig reducedMotion="user">
        <a href="#stage" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-bg">
          Skip to the story
        </a>
        <div className="page-gutter mx-auto flex min-h-full max-w-[1680px] flex-col gap-3 pb-6">
          <Header view={view} onView={changeView} />
          <ControlBar pb={pb} mode={mode} onMode={setMode} threats={threats} onThreats={changeThreats} onResetThreats={resetThreats} view={view} />
          {view === 'story' && <SceneNavigator scenes={scenes} pb={pb} insider={threats.insider} onGo={go} />}

          <main id="stage" className="flex flex-col gap-4">
            {view === 'story' && (
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="min-w-0 rounded-2xl border border-line bg-surface/60 p-3 sm:p-4">
                  <StoryStage
                    scene={scene}
                    beat={pb.beat}
                    beats={pb.beats}
                    threats={threats}
                    runKey={runKey}
                    onEnableThreat={(k) => changeThreats({ ...threats, [k]: true })}
                  />
                </div>
                <aside className="thin-scroll min-w-0 rounded-2xl border border-line bg-surface/60 p-4 lg:sticky lg:top-3 lg:max-h-[calc(100vh-1.5rem)] lg:overflow-y-auto" aria-label="Details">
                  {sidebarPanel && selectedId ? <RolePanel roleId={selectedId} onClose={closeRole} /> : <SceneGuide scene={scene} threats={threats} />}
                </aside>
              </div>
            )}
            {view === 'compare' && <CompareMode wolf={threats.wolf} />}
            {view === 'board' && <SummaryBoard />}
          </main>

          <footer className="mt-2 flex flex-wrap justify-between gap-2 border-t border-line pt-3 text-xs text-muted">
            <p>{PROJECT.disclaimer}</p>
            <p>Keys: ← → change scene · Space play/pause · R restart. All data is fictional.</p>
          </footer>
        </div>
        {!sidebarPanel && <RoleDrawer roleId={selectedId} onClose={closeRole} />}
      </MotionConfig>
    </RoleContext.Provider>
  );
}
