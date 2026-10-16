// Turns the single-file build (dist-artifact/index.html) into a page body for the hosted Artifact preview.
// The host adds its own <!doctype>, <html>, <head> and <body>, so we keep only the title, metas, styles, script and root.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const src = resolve(here, '../dist-artifact/index.html');
const out = resolve(here, '../../artifact/the-three-little-agents.html');

const html = readFileSync(src, 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/i)[1];

const title = head.match(/<title>[\s\S]*?<\/title>/i)[0];
const description = head.match(/<meta name="description"[^>]*>/i)?.[0] ?? '';
const links = head.match(/<link [^>]*>/gi)?.join('\n') ?? '';
const styles = head.match(/<style[\s\S]*?<\/style>/gi)?.join('\n') ?? '';
const scripts = head.match(/<script[\s\S]*?<\/script>/gi)?.join('\n') ?? '';
const bodyRest = body.replace(/<script[\s\S]*?<\/script>/gi, '').trim();

const page = [
  title,
  '<meta name="claude:viewport-fit-sides" content="cover">',
  description,
  links,
  styles,
  bodyRest,
  scripts,
  '',
].join('\n');

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, page);
console.log(`Artifact written: ${out} (${(page.length / 1024).toFixed(0)} KB)`);
