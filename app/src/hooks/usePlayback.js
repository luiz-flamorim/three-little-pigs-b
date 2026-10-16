import { useCallback, useEffect, useState } from 'react';

// Story playback. Beats always animate within a scene unless paused.
// `story` means "keep going into the next scene"; it switches off by itself after the final scene.
export function usePlayback(scenes) {
  const [state, setState] = useState({ scene: 0, beat: 0, paused: false, story: false });
  const [speed, setSpeed] = useState(1);
  const count = scenes.length;
  const sceneIndex = Math.min(state.scene, count - 1);
  const beats = scenes[sceneIndex].beats;
  const beat = Math.min(state.beat, beats.length - 1);
  const isLastBeat = beat === beats.length - 1;
  const atEnd = sceneIndex === count - 1 && isLastBeat;

  useEffect(() => {
    if (state.paused) return undefined;
    if (isLastBeat && !state.story) return undefined;
    const id = setTimeout(() => {
      setState((s) => {
        const sBeat = Math.min(s.beat, beats.length - 1);
        if (sBeat < beats.length - 1) return { ...s, beat: sBeat + 1 };
        if (s.scene < count - 1) return { ...s, scene: s.scene + 1, beat: 0 };
        return { ...s, story: false };
      });
    }, beats[beat].ms / speed);
    return () => clearTimeout(id);
  }, [state.paused, state.story, sceneIndex, beat, isLastBeat, beats, speed, count]);

  const isPlaying = state.story && !state.paused;

  const togglePlay = useCallback(() => {
    setState((s) => {
      if (s.story && !s.paused) return { ...s, paused: true };
      if (s.story && s.paused) return { ...s, paused: false };
      const lastScene = s.scene >= count - 1;
      const lastBeat = s.beat >= scenes[Math.min(s.scene, count - 1)].beats.length - 1;
      if (lastScene && lastBeat) return { scene: 0, beat: 0, paused: false, story: true };
      return { ...s, paused: false, story: true };
    });
  }, [count, scenes]);

  const goTo = useCallback(
    (i) => {
      if (i < 0 || i >= count) return;
      setState((s) => ({ scene: i, beat: 0, paused: false, story: s.story && !s.paused }));
    },
    [count],
  );

  return {
    sceneIndex,
    beat,
    beats,
    speed,
    setSpeed,
    isPlaying,
    atEnd,
    isFirst: sceneIndex === 0,
    isLast: sceneIndex === count - 1,
    progress: (sceneIndex + (beat + 1) / beats.length) / count,
    togglePlay,
    pause: useCallback(() => setState((s) => ({ ...s, paused: true })), []),
    restart: useCallback(() => setState({ scene: 0, beat: 0, paused: false, story: true }), []),
    replay: useCallback(() => setState((s) => ({ ...s, beat: 0, paused: false })), []),
    goTo,
    next: () => goTo(sceneIndex + 1),
    prev: () => goTo(sceneIndex - 1),
  };
}

// A simple stepper for Compare mode.
export function useStepper(steps, msPerStep = 4200) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return undefined;
    if (index >= steps - 1) {
      setPlaying(false);
      return undefined;
    }
    const id = setTimeout(() => setIndex((i) => Math.min(i + 1, steps - 1)), msPerStep);
    return () => clearTimeout(id);
  }, [playing, index, steps, msPerStep]);
  return {
    index,
    playing,
    toggle: () => {
      if (playing) {
        setPlaying(false);
        return;
      }
      if (index >= steps - 1) setIndex(0);
      setPlaying(true);
    },
    restart: () => {
      setIndex(0);
      setPlaying(true);
    },
    goTo: (i) => {
      if (i < 0 || i >= steps) return;
      setIndex(i);
    },
    pause: () => setPlaying(false),
  };
}
