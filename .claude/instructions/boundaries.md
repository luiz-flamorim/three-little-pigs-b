# Boundaries

Applies to every session and every agent.

1. **Project root only.** Work exclusively inside the project folder (the folder containing `CLAUDE.md`). No reads, writes, listings, or searches outside it.
2. **No upward navigation.** Never `cd ..`, never use paths that resolve above the root, never touch `~`, `/tmp`, `/private/tmp`, or session scratchpads.
3. **Temp files stay local.** Intermediate files, scripts, downloads, and outputs go in `./tmp/`. Clean up when no longer needed.
4. **Relative paths preferred.** When absolute paths are required, they must start with the project root.
5. **When in doubt, stop and ask** the user rather than reaching outside the boundary.
