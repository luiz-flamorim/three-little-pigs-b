# The Three Little Agents

**How an AI construction company turns customer requirements into a safe, governed outcome.**

**Live demo:** https://luiz-flamorim.github.io/three-little-pigs-b/

An interactive, animated teaching demo that uses *The Three Little Pigs* to explain AI agents, orchestration, context, guardrails, validation, rework loops, human oversight and threats to a non-technical audience.

- The **pigs** are customers. They define *what* they need.
- An **AI construction company** decides *how*: an Orchestrator, six specialist agents, a Validation Agent (the Building Inspector), a Human Reviewer and guardrails.
- **The Wolf** is a threat actor outside the workflow.

It runs as 12 scenes, with a failure version and a controlled version, a side-by-side comparison, optional Wolf and insider-threat scenarios, and a one-page summary board.

> This is a fictional teaching model. Real agentic systems may use different roles, technologies, controls and approval structures.

## Run it locally

Requires Node.js 18 or later.

```bash
cd app
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build to `app/dist/` |
| `npm run preview` | Serve the production build |
| `npm test` | Run the control and accuracy-rule tests (Vitest) |
| `npm run lint` | ESLint (unused imports, React hooks rules) |
| `npm run build:artifact` | Single-file HTML build to `artifact/the-three-little-agents.html` |
| `npm run docs:roles` | Regenerate `docs/roles.md` from the role data |

## Tech

React 18 · Tailwind CSS 3 · Framer Motion 11 · Lucide React · Vite 5. No backend, no external APIs, fictional data only.

## Project structure

```
.
├── README.md
├── artifact/
│   └── the-three-little-agents.html   # single-file build used for the hosted preview
├── docs/
│   ├── architecture.md           # how the app is built
│   ├── storyboard.md             # scene-by-scene storyboard
│   ├── interactions.md           # every implemented interaction
│   ├── assumptions.md
│   ├── narration.md              # 90-second demo script
│   ├── roles.md                  # role specifications (generated)
│   └── visual-summary.md         # one-page Mermaid summary
├── app/
│   ├── index.html · package.json · vite / tailwind / postcss / eslint configs
│   ├── scripts/                  # make-artifact.mjs, generate-role-docs.mjs
│   └── src/
│       ├── data/                 # ← edit the story here: roles, content, flows, threats, scenes, theme
│       ├── components/           # FlowCanvas, nodes, HandoffCard, GuardrailBoundary, ReworkLoop, CompareMode, SummaryBoard…
│       ├── scenes/               # the 12 scenes
│       ├── hooks/                # playback and layout hooks
│       ├── context/              # role selection context
│       └── test/                 # Vitest + Testing Library
```

## Editing the story

All content lives in `app/src/data/`:

- `roles.js`: every role's category, responsibility, inputs, tasks, outputs, restrictions, next recipient and escalation conditions
- `content.js`: the customer request, requirements, guardrails, task plan, validation checks, human escalations, final checks and key messages
- `flows.js`: the 14 controlled hand-offs, the 10 failure steps, the Compare phases and the diagram positions
- `threats.js`: the Wolf's attempts and the 12-step insider scenario
- `scenes.js`: scene titles, captions and timings

Components read these files, so changing the data changes the app. The tests in `app/src/test/` check the accuracy rules (for example, the pigs are never agents and the Builder never starts before approval).
