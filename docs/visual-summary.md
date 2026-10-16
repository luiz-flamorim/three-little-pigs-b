# Visual summary (single page)

The app's **Summary board** view is the interactive, Miro-style version of this page (every note opens its role). The diagram below matches the same architecture and renders on GitHub.

```mermaid
flowchart LR
  subgraph WHAT["1 · Customers define WHAT"]
    C["🐷🐷🐷 Three Little Pigs<br/>(customers, not agents)<br/>8 requirements · £90k · 12 weeks"]
  end

  subgraph HOW["2 · AI Construction Company decides HOW"]
    direction TB
    subgraph G["Guardrails (boundaries, not workers)"]
      direction TB
      O["Orchestrator<br/>invisible project manager<br/>UNDERSTAND→PLAN→DELEGATE→PASS CONTEXT→<br/>MONITOR→VALIDATE→REWORK→COMBINE"]
      R["Research Agent<br/>→ RESEARCH FINDINGS"]
      A["Architecture Agent<br/>→ PROPOSED HOUSE DESIGN"]
      F["Finance Agent<br/>→ COST ASSESSMENT"]
      K["Risk Agent<br/>→ RISK ASSESSMENT"]
      B["Builder Agent<br/>→ HOUSE + BUILD RECORD"]
      W["Writer Agent<br/>→ FINAL PROJECT REPORT"]
      V{"Validation Agent<br/>Building Inspector<br/>PASS · FAIL · RETURN · ESCALATE"}
      H["Human Reviewer<br/>APPROVE · REJECT · REQUEST CHANGES ·<br/>RETURN TO ORCHESTRATOR · STOP"]
    end
  end

  subgraph OUT["3 · Outcome"]
    S["✓ SAFE HOUSE ✓ WITHIN BUDGET<br/>✓ KNOWN RISKS ADDRESSED ✓ VALIDATION PASSED<br/>✓ HUMAN APPROVED ✓ SAFE TO OCCUPY"]
  end

  WOLF["🐺 The Wolf<br/>threat actor, outside the workflow"]

  C -->|requirements| O
  O -->|brief + context| R --> V
  V -->|validated research| A --> V
  V -. FAIL: return for correction .-> A
  V -->|approved design v2| F & K
  F --> V
  K --> V
  V -->|ESCALATE high risk| H
  H -->|decision| O
  O -->|build authorisation| B --> V
  O -->|approved outputs| W --> H
  H -->|APPROVE| O
  O -->|final check complete| S --> C

  WOLF -. fake evidence .-> R
  WOLF -. hidden instruction .-> A
  WOLF -. swapped materials .-> B
  WOLF -. secret approach (insider) .-> C

  classDef wolf fill:#3b1219,stroke:#f87171,color:#fecaca,stroke-dasharray:3 3;
  classDef cust fill:#16244a,stroke:#5b8cff,color:#e8eefb;
  classDef out fill:#0b3b2e,stroke:#10b981,color:#a7f3d0;
  class WOLF wolf;
  class C cust;
  class S out;
  linkStyle 19,20,21,22 stroke:#f87171,stroke-dasharray:3 4;
```

**Key message**

- The pigs define the outcome.
- Agents perform specialist work.
- The Orchestrator coordinates the workflow.
- Guardrails define the boundaries.
- Validation checks the outputs.
- Humans oversee important decisions.
- The Wolf demonstrates how a system can be threatened or compromised.

**SAME STORY. A NEW WAY TO UNDERSTAND AI.**

> This is a fictional teaching model. Real agentic systems may use different roles, technologies, controls and approval structures.
