import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import test from 'node:test';
import { parseDocument } from 'yaml';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (relativePath) => readFileSync(path.join(root, relativePath), 'utf8');
const documents = [
  'BRIEFING.md',
  'CONTEXT.md',
  'CONTEXT.es.md',
  'AGENTS.md',
  'memory-bank/projectbrief.md',
  'memory-bank/techContext.md',
  'memory-bank/progress.md',
  '.agents/rules/repo-conventions.md',
  '.agents/skills/company-workflow/SKILL.md',
];

test('all authorized context sources remain synchronized without template placeholders', () => {
  assert.equal(read('BRIEFING.md'), read('CONTEXT.md'));
  assert.equal(read('CONTEXT.es.md'), read('CONTEXT.md'));
  assert.doesNotMatch(read('CONTEXT.md'), /Replace this content|Reemplaza este contenido|healthcore-BRIEFING\.md/);
});

test('agent support documents exist and local Markdown links resolve', () => {
  for (const document of documents) {
    const content = read(document);
    assert.ok(content.trim().length > 0, document);
    for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].split('#')[0];
      if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) continue;
      const destination = path.resolve(root, path.dirname(document), decodeURIComponent(target));
      assert.ok(existsSync(destination), `${document}: ${target}`);
    }
  }
});

test('the workflow skill has valid YAML metadata and required sections', () => {
  const content = read('.agents/skills/company-workflow/SKILL.md');
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert.ok(frontmatter, 'YAML frontmatter is required');
  const parsed = parseDocument(frontmatter[1], { uniqueKeys: true });
  assert.deepEqual(parsed.errors, []);
  const metadata = parsed.toJS();
  assert.equal(metadata.name, 'company-workflow');
  assert.equal(typeof metadata.description, 'string');
  assert.ok(metadata.description.length > 0 && metadata.description.length <= 1024);
  for (const section of ['Objetivo unico', 'Inputs obligatorios', 'Criterios de aceptacion verificables']) {
    assert.ok(content.includes(`## ${section}`), section);
  }
});

test('the lint dependency chain renders inline and display math with the corrected KaTeX', async () => {
  const fromCli = createRequire(import.meta.resolve('markdownlint-cli2'));
  const fromLint = createRequire(fromCli.resolve('markdownlint'));
  const fromMath = createRequire(fromLint.resolve('micromark-extension-math'));
  const manifest = JSON.parse(read('package.json'));
  assert.equal(fromMath('katex').version, manifest.overrides['micromark-extension-math'].katex);
  const { micromark } = await import(fromLint.resolve('micromark'));
  const { math, mathHtml } = await import(fromLint.resolve('micromark-extension-math'));
  const html = micromark('# Formula\n\nInline $x^2$.\n\n$$\n\\frac{1}{2}\n$$\n', {
    extensions: [math()],
    htmlExtensions: [mathHtml({ trust: false, throwOnError: true })],
  });
  assert.match(html, /class="katex"/);
  assert.match(html, /katex-display/);
});

test('the agent protocol names all memory files and required quality commands', () => {
  const protocol = read('AGENTS.md');
  for (const document of documents.filter((document) => document.startsWith('memory-bank/'))) {
    assert.ok(protocol.includes(document), document);
  }
  for (const requirement of ['feature/*', 'git diff --cached', 'npm run build', 'git diff --check']) {
    assert.ok(protocol.includes(requirement), requirement);
  }
});

test('the selected company, project and approved product paths are documented', () => {
  for (const document of documents.filter((document) => document !== 'memory-bank/progress.md')) {
    assert.ok(read(document).includes('GlobalHealth Solutions'), document);
    assert.ok(read(document).includes('HealthCore'), document);
  }
  const project = read('memory-bank/projectbrief.md');
  assert.ok(project.includes('Empresa seleccionada: GlobalHealth Solutions. Proyecto o agente: HealthCore.'));
  assert.doesNotMatch(read('AGENTS.md'), /HealthCore es la unica empresa seleccionada/);
  const conventions = read('.agents/rules/repo-conventions.md');
  for (const location of ['uis/website/', 'uis/backoffice/', 'services/']) {
    assert.ok(conventions.includes(location), location);
  }
});