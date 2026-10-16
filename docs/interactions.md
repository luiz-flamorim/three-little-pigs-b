# Implemented interactions

## Playback
- **Play story / Pause**: plays every scene in order; pausing freezes the current beat. Play at the very end restarts from Scene 1.
- **Restart**: back to Scene 1, playing.
- **Previous / Next scene**: disabled at Scene 1 and Scene 12 respectively.
- **Scene indicators (01–12)**: jump to any scene; clicking the current one replays it. Scene 9 is marked `*` (optional) and dimmed when the insider scenario is off.
- **Overall progress bar** and **beat dots** for the current scene.
- **Speed**: 0.75×, 1×, 1.5×, 2×.
- The story stops by itself after the last beat of Scene 12.

## Modes
- **Without orchestration**: jumps to Scene 5.
- **With orchestration**: jumps to Scene 6.
- **Compare side by side**: both versions on one 10-phase timeline with its own Play/Pause, Restart, Previous/Next and phase buttons; a commentary line under each side and the two outcome panels at the end.
- **Views**: Story, Compare, Summary board (one-page Miro-style summary).

## Threat scenarios
- **Wolf disruption** switch: adds the Wolf's attempts to the controlled workflow and Compare mode, and enables Scene 8.
- **Insider threat** switch: enables Scene 9 and the extra escalation in Scene 10.
- **Reset threats**: switches both off and replays the current scene threat-free.
- Scenes 8 and 9 show a "switched off" card with a button to switch the scenario on.

## Roles
- Every role is clickable: the customers, the company, the Orchestrator, each specialist agent, the Validation Agent, the Human Reviewer, the Guardrails boundary label and the Wolf. They can be selected in diagrams, cards, the cast list and the summary board.
- The role panel shows the role name, category, responsibility, inputs, tasks, outputs, restrictions, next recipient and escalation conditions, in expandable sections. It appears as a sidebar on desktop and as a sheet on phones. Close it with the close button or Escape.
- Hovering over or focusing a diagram node shows a one-line tooltip.

## Visible workflow behaviour
- Information packets travel along each hand-off and are labelled with a status icon (context, pending, validated, failed, returned, escalated, approved, secret, threat, ignored, out of date).
- Hand-off card for every controlled step: what is moving, who produced it, who receives it, whether it was validated, what happens if it fails, and the guardrail applied.
- Decision gateways show PASS / FAIL / RETURN FOR CORRECTION / ESCALATE TO HUMAN REVIEW / APPROVE.
- An animated rework loop and a curved return line back to the responsible agent.
- The guardrail boundary flashes red when a breach is attempted.
- Dotted red Wolf lines stop at the boundary when blocked, or reach the target when detected later.
- The insider channel is a separate rose dotted line outside the company boundary.
- In Scene 10, try-it decision buttons explain what each decision would do.
- Final outcome summary (controlled and failure).

## Accessibility
- All controls are real buttons with descriptive labels; switches use `role="switch"`; the current scene uses `aria-current`.
- Live caption region (`aria-live="polite"`) announces each beat.
- Visible focus ring on every control; a skip link to the story.
- Keyboard: ← → change scene, Space play/pause, R restart, Escape closes the role panel.
- Reduced motion: honours `prefers-reduced-motion` (Framer Motion `reducedMotion="user"`, CSS animations off, packets jump instead of travelling).
- Text contrast on the dark navy background is high throughout; status is shown with icons and words as well as colour.
