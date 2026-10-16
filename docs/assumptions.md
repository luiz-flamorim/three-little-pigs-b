# Assumptions

1. **Fictional data.** The budget (£90,000), timeframe (12 weeks), costs (£84k + £3k chimney guard = £87k), the “Wolf-Resistance Level 3” standard, timestamps and supplier details are invented for teaching. They are not real building standards or figures.
2. **One validation agent, many checkpoints.** The brief's “validation check” after each stage is shown as the same Validation Agent (the Building Inspector) checking each major output, not as several validators.
3. **Research output passes through validation first.** The brief lists Research's destinations as Architecture, Risk and the Orchestrator. The app sends findings to the inspector first, then the Orchestrator passes validated findings on. This follows the controlled sequence in section 13 and the rule that failed outputs must not be used downstream.
4. **The rework loop example is Design v1.** One clear failure (front door weakness, requirement R4) is shown in Scenes 6 and 7, rather than failures at every stage.
5. **The chimney risk is resolved by a human REQUEST CHANGES.** The Human Reviewer asks for a chimney guard; the updated design is revalidated before the Builder is authorised.
6. **The Wolf and the failure version.** The Wolf always appears in Scene 5, because the brief makes “the Wolf exploiting a weakness” part of the failure version. The Wolf switch controls the Wolf in Scene 6, Scene 8 and Compare mode.
7. **Default switches.** Both threat scenarios start switched on, so “Play story” covers all 12 scenes. “Reset threats” switches both off.
8. **Insider identity.** The compromised customer is “Customer C”, a neutral label. Its response steps follow the brief's order. It remains a customer throughout.
9. **Compare mode** pairs each failure step with the controlled step that teaches the opposite lesson (10 phases), rather than matching by clock time.
10. **Emoji only for characters.** 🐷 for the pigs and 🐺 for the Wolf; the house is drawn in CSS. All interface icons come from Lucide.
11. **Fonts** load from Google Fonts with system fallbacks; the app works offline with the fallbacks.
12. **Hosted preview.** The Artifact preview is the same app built into one HTML file. The npm project in `app/` is the source of truth.
13. **This is not a reference architecture.** Real agentic systems may use different roles, technologies, controls and approval structures.
