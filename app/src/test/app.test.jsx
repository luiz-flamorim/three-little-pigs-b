import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.jsx';
import { roles, SPECIALISTS, CAST_ORDER } from '../data/roles.js';
import { CONTROLLED_FLOW, FAILURE_FLOW, COMPARE_PHASES } from '../data/flows.js';
import { buildScenes } from '../data/scenes.js';

const sceneTitle = () => screen.getByRole('heading', { level: 2, name: (n) => n.length > 0 && document.getElementById('scene-title')?.textContent === n });
const currentTitle = () => document.getElementById('scene-title')?.textContent;
const flush = () =>
  act(() => {
    vi.advanceTimersByTime(800);
  });
const playButton = () => screen.getByRole('button', { name: /play the story|pause the story/i });

describe('App controls', () => {
  beforeEach(() =>
    vi.useFakeTimers({
      toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date', 'requestAnimationFrame', 'cancelAnimationFrame', 'performance'],
    }),
  );
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('renders Scene 1 immediately with the pigs as customers', () => {
    render(<App />);
    expect(sceneTitle()).toBeTruthy();
    expect(currentTitle()).toBe('The Customers');
    expect(screen.getAllByRole('button', { name: /The Three Little Pigs: Customer group \(not an AI agent\)/ }).length).toBeGreaterThan(0);
  });

  it('Previous and Next respect scene boundaries', () => {
    render(<App />);
    const prev = screen.getByRole('button', { name: 'Previous scene' });
    const next = screen.getByRole('button', { name: 'Next scene' });
    expect(prev).toBeDisabled();
    fireEvent.click(next);
    expect(currentTitle()).toBe('The AI Construction Company');
    fireEvent.click(screen.getByRole('button', { name: /^Scene 12:/ }));
    expect(currentTitle()).toBe('The Outcome');
    expect(screen.getByRole('button', { name: 'Next scene' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Previous scene' }));
    expect(currentTitle()).toBe('Final Check');
  });

  it('Restart returns to Scene 1 and starts playing', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Scene 7:/ }));
    expect(currentTitle()).toBe('Guardrails and Validation');
    fireEvent.click(screen.getByRole('button', { name: 'Restart from scene 1' }));
    expect(currentTitle()).toBe('The Customers');
    expect(playButton()).toHaveTextContent('Pause');
  });

  it('plays the whole story and stops after the final scene', () => {
    render(<App />);
    fireEvent.click(playButton());
    expect(playButton()).toHaveTextContent('Pause');
    for (let i = 0; i < 900 && playButton().textContent.includes('Pause'); i += 1) {
      act(() => {
        vi.advanceTimersByTime(1000);
      });
    }
    expect(currentTitle()).toBe('The Outcome');
    expect(playButton()).toHaveTextContent('Play story');
    // Nothing moves after the end.
    act(() => {
      vi.advanceTimersByTime(20000);
    });
    expect(currentTitle()).toBe('The Outcome');
  });

  it('Pause freezes the story', () => {
    render(<App />);
    fireEvent.click(playButton());
    fireEvent.click(playButton());
    expect(playButton()).toHaveTextContent('Play story');
    act(() => {
      vi.advanceTimersByTime(60000);
    });
    expect(currentTitle()).toBe('The Customers');
  });

  it('mode buttons open the failure, controlled and compare views', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Without orchestration' }));
    expect(currentTitle()).toBe('Without Orchestration');
    fireEvent.click(screen.getByRole('button', { name: 'With orchestration' }));
    expect(currentTitle()).toBe('With Orchestration');
    flush();
    expect(screen.getByText(/Hand-off 1\/14/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Compare side by side' }));
    expect(screen.getByRole('heading', { name: 'Without effective orchestration' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'With orchestration, guardrails and human oversight' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /10\. Outcome/ }));
    expect(screen.getByLabelText('Failure outcome')).toHaveTextContent('UNSAFE HOUSE');
    expect(screen.getByLabelText('Controlled outcome')).toHaveTextContent('SAFE TO OCCUPY');
  });

  it('selecting a role shows every required field', () => {
    render(<App />);
    const cast = screen.getByLabelText('Cast');
    fireEvent.click(within(cast).getByRole('button', { name: /^Research Agent/ }));
    const panel = screen.getByRole('heading', { name: 'Research Agent' }).closest('section');
    for (const label of ['Responsibility', 'Inputs', 'Tasks', 'Outputs', 'Restrictions', 'Next recipient', 'Escalation conditions']) {
      expect(within(panel).getByText(label)).toBeTruthy();
    }
    expect(within(panel).getByText('Specialist AI agent')).toBeTruthy();
    fireEvent.click(within(panel).getByRole('button', { name: 'Close role details' }));
    expect(screen.queryByRole('heading', { name: 'Research Agent' })).toBeNull();
  });

  it('Guardrails and the Wolf are clickable and described correctly', () => {
    render(<App />);
    const cast = screen.getByLabelText('Cast');
    fireEvent.click(within(cast).getByRole('button', { name: /^Guardrails/ }));
    expect(screen.getByText('Control boundary (not an agent)')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Close role details' }));
    fireEvent.click(within(screen.getByLabelText('Cast')).getByRole('button', { name: /^The Wolf/ }));
    expect(screen.getByText('Threat actor (outside the legitimate workflow)')).toBeTruthy();
  });

  it('threat toggles and reset work', () => {
    render(<App />);
    const wolf = screen.getByRole('switch', { name: /Wolf disruption/ });
    const insider = screen.getByRole('switch', { name: /Insider threat/ });
    expect(wolf).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('button', { name: /^Scene 9:/ }));
    flush();
    expect(screen.getByLabelText('Incident timeline')).toBeTruthy();
    fireEvent.click(insider);
    flush();
    expect(screen.getByText(/Insider-threat scenario is switched off/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Switch on insider-threat scenario/ }));
    flush();
    expect(screen.getByLabelText('Incident timeline')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Reset threat scenario/ }));
    expect(wolf).toHaveAttribute('aria-checked', 'false');
    expect(insider).toHaveAttribute('aria-checked', 'false');
  });

  it('every scene renders without errors', () => {
    const errors = vi.spyOn(console, 'error');
    render(<App />);
    for (let i = 1; i <= 12; i += 1) {
      fireEvent.click(screen.getByRole('button', { name: new RegExp(`^Scene ${i}:`) }));
      act(() => {
        vi.advanceTimersByTime(90000);
      });
    }
    fireEvent.click(screen.getByRole('button', { name: 'Summary board' }));
    expect(screen.getByRole('heading', { name: 'The Three Little Agents on one page' })).toBeTruthy();
    expect(errors).not.toHaveBeenCalled();
    errors.mockRestore();
  });
});

describe('Accuracy rules in the scenario data', () => {
  it('the pigs are customers and never agents', () => {
    expect(roles.customers.category).toMatch(/^Customer group \(not an AI agent\)/);
    expect(SPECIALISTS).not.toContain('customers');
  });

  it('the Wolf and Guardrails are not workers', () => {
    expect(SPECIALISTS).not.toContain('wolf');
    expect(SPECIALISTS).not.toContain('guardrails');
    expect(roles.guardrails.category).toMatch(/not an agent/);
    for (const step of CONTROLLED_FLOW) {
      for (const p of step.packets) {
        expect(p.from).not.toBe('wolf');
        expect(p.to).not.toBe('wolf');
      }
    }
  });

  it('every role has inputs, outputs and a next recipient', () => {
    for (const id of CAST_ORDER) {
      const r = roles[id];
      for (const key of ['inputs', 'tasks', 'outputs', 'restrictions', 'next', 'escalation']) {
        expect(r[key].length, `${id}.${key}`).toBeGreaterThan(0);
      }
    }
  });

  it('a failed validation returns to the agent that produced the output', () => {
    CONTROLLED_FLOW.forEach((step, i) => {
      if (step.gate?.status !== 'fail') return;
      const producer = step.packets[0].from;
      const next = CONTROLLED_FLOW[i + 1];
      expect(next.rework.to).toBe(producer);
      expect(next.packets[0].to).toBe(producer);
    });
  });

  it('the Builder starts only after design approval and the human decision', () => {
    const builderStart = CONTROLLED_FLOW.findIndex((s) => s.set?.builder === 'active');
    const designPass = CONTROLLED_FLOW.findIndex((s) => s.set?.architecture === 'done');
    const humanDecision = CONTROLLED_FLOW.findIndex((s) => s.gate?.at === 'human');
    expect(builderStart).toBeGreaterThan(designPass);
    expect(builderStart).toBeGreaterThan(humanDecision);
  });

  it('only humans (and the final check) approve; escalations reach the human', () => {
    CONTROLLED_FLOW.forEach((step, i) => {
      if (step.gate?.status === 'approve') expect(['human', 'orchestrator']).toContain(step.gate.at);
      if (step.gate?.status === 'escalate') expect(CONTROLLED_FLOW[i + 1].packets.some((p) => p.to === 'human')).toBe(true);
    });
    const writerApprovals = CONTROLLED_FLOW.filter((s) => s.gate?.at === 'writer');
    expect(writerApprovals).toHaveLength(0);
  });

  it('the failure version has no orchestrator, validation or human steps', () => {
    for (const step of FAILURE_FLOW) {
      for (const p of step.packets ?? []) {
        expect(['orchestrator', 'validation', 'human']).not.toContain(p.from);
        expect(['orchestrator', 'validation', 'human']).not.toContain(p.to);
      }
    }
  });

  it('there are 12 scenes and compare phases point at real steps', () => {
    expect(buildScenes({ wolf: true, insider: true })).toHaveLength(12);
    expect(buildScenes({ wolf: false, insider: false })).toHaveLength(12);
    for (const p of COMPARE_PHASES) {
      expect(FAILURE_FLOW[p.failure]).toBeTruthy();
      expect(CONTROLLED_FLOW[p.controlled]).toBeTruthy();
    }
  });
});
