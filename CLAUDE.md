# CLAUDE.md — Main Instructions

This file is the single source of truth for every Claude session and every agent working in this project. Read it fully before doing anything.

## 1. Mandatory startup routine (every session, every agent)

1. Read `CLAUDE.md` (this file).
2. Read `journal.md` — it is the ordered log of everything done so far. Do not repeat or contradict past actions without noting why.
3. Read any file in `.claude/instructions/` relevant to your task (at minimum `boundaries.md`).

## 2. Folder boundary (non-negotiable)

- The project root is the folder containing this file. **It is the only folder you may read or write.**
- Never access parent directories, the home directory, system temp dirs (`/tmp`, `/private/tmp`, scratchpads), or any other path outside the project.
- All files you create — including temporary/intermediate ones — go inside the project. Temporary files go in `./tmp/`.
- Full rules: `.claude/instructions/boundaries.md`.

## 3. Journaling (mandatory)

- Every meaningful action (files created/changed/deleted, decisions, setup steps, task start/finish, errors) must be logged in `journal.md`.
- Entries are **very short** single lines. Format and rules: `.claude/instructions/journaling.md`.
- The `journal-keeper` agent (`.claude/agents/journal-keeper.md`) owns the journal. Delegate to it, or follow the same format exactly if appending directly.
- The journal is append-only: never edit or delete past entries.

## 4. Project layout

```
.
├── CLAUDE.md                 # Main instructions (this file)
├── README.md                 # Public-facing project description (GitHub)
├── journal.md                # Append-only log of actions
├── .github/workflows/        # deploy.yml: test, build and publish app/ to GitHub Pages
├── app/                      # React + Vite app (source of truth)
│   └── src/data/             # all story content: edit here, not in components
├── artifact/                 # single-file build for the hosted preview (generated)
├── docs/                     # architecture, storyboard, interactions, assumptions, narration, roles (generated), visual summary
├── tmp/                      # Temporary files (git-ignored): npm cache, headless browser, screenshots
└── .claude/
    ├── agents/               # Subagent definitions (one .md per agent)
    │   └── journal-keeper.md
    └── instructions/         # Shared rules and guides for all agents
        ├── boundaries.md
        ├── journaling.md
        └── project-brief.md  # the original brief (authoritative spec)
```

## 5. Conventions

- New agents: add one file per agent in `.claude/agents/`, with frontmatter (`name`, `description`, `tools`). Each agent's prompt must tell it to read `CLAUDE.md` and `journal.md` first.
- New shared rules or guides: add to `.claude/instructions/` and list them in section 4.
- Keep `README.md` updated when the project's purpose or structure changes.

## 6. Project brief

**The Three Little Agents**: an interactive React demo explaining agentic AI through *The Three Little Pigs*. The full, authoritative brief is in `.claude/instructions/project-brief.md`. Read it before changing behaviour or content.

Non-negotiable accuracy rules (from the brief, enforced by tests in `app/src/test/app.test.jsx`):
- The pigs are always customers, never AI agents (including the compromised pig in the insider scenario).
- The Wolf is never a legitimate agent and never part of the task sequence.
- Guardrails are boundaries, not workers. The Orchestrator coordinates; it does not do specialist work.
- No downstream work uses an output that failed validation; the Builder never starts before approval; the Writer never approves; validation never replaces human accountability.

## 7. Working on the app

- Commands (run inside `app/`): `npm run dev`, `npm test`, `npm run lint`, `npm run build:artifact`, `npm run docs:roles`.
- Keep npm's cache inside the project: `npm install --cache ../tmp/npm-cache`.
- After changing `src/data/roles.js`, run `npm run docs:roles`. After any app change, run `npm run build:artifact` and republish the Claude preview (same file path / URL below).
- Visual checks: a headless Chromium lives in `tmp/ms-playwright` (set `PLAYWRIGHT_BROWSERS_PATH`). Scripts are in `tmp/pw/`. Don't use Playwright's fake clock: it freezes Framer Motion. Wait in real time instead.
- Use simple British English in all user-facing text.

## 8. Publishing and current status

- **GitHub repo:** https://github.com/luiz-flamorim/three-little-pigs-b (branch `main`). The user owns it; push only when they ask.
- **Live site (GitHub Pages):** https://luiz-flamorim.github.io/three-little-pigs-b/. It deploys automatically on every push to `main` via `.github/workflows/deploy.yml` (Pages source: GitHub Actions). Tests must pass or nothing deploys.
- `app/vite.config.js` uses `base: './'` so the build works under the repo sub-path. Do not change it to an absolute path.
- **Claude Artifact preview:** https://claude.ai/artifact/2kbsa9LZ8Mpty4bwRDk2Ai, published from `artifact/the-three-little-agents.html` (body-only file; don't open it directly in a browser).
- **Git ignore:** one root `.gitignore` only (user's choice). `.claude/`, `CLAUDE.md` and `journal.md` ARE published to GitHub, so keep them free of anything private.
- The user is new to git and GitHub: explain steps plainly and offer to do them.
