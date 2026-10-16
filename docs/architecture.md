# Architecture

## In one paragraph

A single-page React app with no backend. The story content (roles, requirements, guardrails, workflow steps, threats, scenes) lives in plain data files under `app/src/data/`. Visual components read that data and draw it. A small playback hook moves through **scenes** and **beats** (one caption per beat). Each scene component is a pure function of `beat`, so jumping to any scene always shows the right state.

## Layers

```
app/src/
├── data/                 ← edit the story here (no component changes needed)
│   ├── roles.js          13 roles: name, category, responsibility, inputs, tasks, outputs, restrictions, next, escalation
│   ├── content.js        request, requirements, guardrails, task plan, checks, escalations, final checks, messages
│   ├── flows.js          controlled flow (14 hand-offs), failure flow (10 steps), compare phases, diagram positions
│   ├── threats.js        Wolf attacks (7) and the insider-threat scenario (12 steps)
│   ├── scenes.js         the 12 scenes and their beats; builds threat-dependent beats
│   └── theme.js          role and status colours
├── hooks/
│   ├── usePlayback.js    scene/beat playback, play/pause/restart/next/prev, speed; Compare stepper
│   └── useMediaQuery.js  wide (16:9) vs tall (phone) diagram layout
├── context/RoleContext   lets any node open the role panel
├── components/           reusable visual parts (see below)
├── scenes/               the 12 scene components
└── test/                 control tests + accuracy-rule tests
```

## Components

| Component | Role in the app |
|---|---|
| `App` | Holds view (story / compare / board), threat switches, selected role; wires everything together |
| `Header`, `ControlBar`, `SceneNavigator` (`Controls.jsx`) | Title, view tabs, playback, modes, threat switches, scene indicators, progress bar |
| `StoryStage` | Renders the current scene, its beat dots and the live caption |
| `CustomerCard`, `CompanyCard` | The pigs (always one customer group) and the company team |
| `RoleNode` + `OrchestratorNode`, `AgentNode`, `ValidationNode`, `HumanReviewNode`, `WolfThreatNode`, `CustomerNode` (`nodes.jsx`) | Clickable roles with status: locked, working, approved, failed, alert, paused, restricted |
| `FlowCanvas` | Diagram engine: nodes, connections, mid-line arrows, travelling information packets, dotted threat lines, guardrail boundary, decision gateways |
| `DecisionGateway` | PASS / FAIL / RETURN / ESCALATE / APPROVE diamonds |
| `WorkflowConnection`, `InformationPacket` | Simple linear hand-off with a moving labelled packet |
| `HandoffCard` | What is moving, produced by, received by, validated?, if it fails, guardrail applied |
| `GuardrailBoundary` | Gold boundary with the 14 rules; reacts to a breach |
| `ReworkLoop` | FAILS → RETURN → CORRECT → RESUBMIT → REVALIDATE |
| `InsiderThreatState` (+ `InsiderDiagram`) | Security-event status and incident timeline |
| `OutcomePanel` | Controlled vs failure outcome |
| `CompareMode` | Both versions side by side on one timeline (10 phases) |
| `SummaryBoard` | One-page Miro-style summary |
| `RolePanel`, `SceneGuide`, `RoleDrawer` | Role details (sidebar on desktop, sheet on phones), cast list, glossary |

## Diagram coordinates

Workflow diagrams use fixed canvas units: **1600×900** (16:9) on wide screens and **900×1340** on phones. Positions live in `flows.js` (`POS`, `BOUNDARY`). The canvas keeps its aspect ratio, so lines and nodes never distort; text scales with the canvas width (container query units).

## State model

- `usePlayback(scenes)` → `{ sceneIndex, beat, isPlaying, progress, togglePlay, restart, next, prev, goTo, setSpeed }`.
- Beats always animate inside the current scene. **Play story** also carries on into the next scene and stops by itself after the final beat of Scene 12.
- Threat switches rebuild the scene list (Scenes 8–10 depend on them) and replay the current scene.
- `resolveFlow(flow, initial, index)` replays workflow steps 0…index to get node states, house stage and flags. That is why any step can be shown directly.

## Accuracy rules enforced in tests (`app/src/test/app.test.jsx`)

- The pigs are a customer group and never in the specialist list.
- The Wolf never appears as a sender or receiver in the controlled flow; Guardrails are categorised as "not an agent".
- Every role has inputs, tasks, outputs, restrictions, a next recipient and escalation conditions.
- A failed validation is followed by a rework step back to the agent that produced the output.
- The Builder starts only after design approval and the human decision.
- Approvals come only from the Human Reviewer (and the Orchestrator's final check); no Writer approvals; every escalation reaches the human.
- The failure version contains no orchestrator, validation or human steps.

## Hosted preview build

`npm run build:artifact` builds a single self-contained HTML file (`vite-plugin-singlefile`) and `scripts/make-artifact.mjs` strips the outer document tags for the hosted Artifact preview. Output: `artifact/the-three-little-agents.html`.
