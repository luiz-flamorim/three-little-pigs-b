# Journaling Rules

`journal.md` (project root) is the shared, append-only log of the project's sequence of events. All agents read it at startup.

## Entry format

One line per entry, appended at the bottom:

```
- YYYY-MM-DD HH:MM | <actor> | <short action>
```

- **actor**: who did it — `user`, `main`, or the agent name (e.g. `journal-keeper`).
- **short action**: ≤ 80 characters, imperative/past tense, no fluff. Mention file paths when relevant.

Examples:

```
- 2026-10-16 11:10 | main | created .claude/ structure
- 2026-10-16 11:12 | user | requested journal agent
- 2026-10-16 11:20 | builder | added src/house.py (straw house model)
```

## Rules

- Append only. Never edit, reorder, or delete existing entries.
- One action per line; split compound actions.
- Log decisions and errors too, not just file changes.
- Get the time with `date "+%Y-%m-%d %H:%M"`.
