// Writes docs/roles.md from src/data/roles.js so the role specification never drifts from the app.
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CAST_ORDER, fieldLabel, roles } from '../src/data/roles.js';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../../docs/roles.md');
const list = (items) => items.map((i) => `- ${i}`).join('\n');

const sections = CAST_ORDER.map((id) => {
  const r = roles[id];
  const parts = [
    `## ${r.name}${r.alias ? ` — ${r.alias}` : ''}`,
    `**Category:** ${r.category}  `,
    `**In one line:** ${r.tagline}`,
    '',
    `**${fieldLabel(r, 'responsibility')}:** ${r.responsibility}`,
  ];
  for (const key of ['inputs', 'tasks', 'outputs']) parts.push('', `### ${fieldLabel(r, key)}`, list(r[key]));
  if (r.dependsOn) parts.push('', '### Dependencies', list(r.dependsOn));
  if (r.guardrail) parts.push('', '### Guardrail', `> ${r.guardrail}`);
  for (const key of ['restrictions', 'next', 'escalation']) parts.push('', `### ${fieldLabel(r, key)}`, list(r[key]));
  return parts.join('\n');
});

const doc = `# Role specifications

> Generated from \`app/src/data/roles.js\` by \`npm run docs:roles\`. Edit the data file, not this page.
> This is a fictional teaching model. Real agentic systems may use different roles, technologies, controls and approval structures.

| Role | Category |
|------|----------|
${CAST_ORDER.map((id) => `| ${roles[id].name} | ${roles[id].category} |`).join('\n')}

${sections.join('\n\n---\n\n')}
`;
writeFileSync(out, doc);
console.log(`Wrote ${out}`);
