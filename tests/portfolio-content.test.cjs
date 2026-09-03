const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const root = path.resolve(__dirname, '..');

function loadTypeScriptModule(relativePath, jsx = false) {
  const filename = path.join(root, relativePath);
  const source = fs.readFileSync(filename, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      jsx: jsx ? ts.JsxEmit.ReactJSX : undefined,
    },
    fileName: filename,
  }).outputText;
  const loaded = { exports: {} };
  new Function('module', 'exports', 'require', output)(loaded, loaded.exports, require);
  return loaded.exports;
}

test('homepage exposes exactly the four strongest projects in editorial order', () => {
  const { featuredProjects = [] } = loadTypeScriptModule('src/data/writing.ts');

  assert.deepEqual(
    featuredProjects.map((project) => project.slug),
    ['code-review-graph', 'crumbleux', 'hfm-arc-agi-3', 'jailbreak-eval'],
  );
});

test('featured project articles carry visible evidence and destinations', () => {
  const { featuredProjects = [] } = loadTypeScriptModule('src/data/writing.ts');

  assert.equal(featuredProjects.length, 4);
  for (const project of featuredProjects) {
    assert.equal(project.kind, 'project');
    assert.ok(project.blurb?.trim(), `${project.slug} needs a blurb`);
    assert.ok(project.proof?.trim(), `${project.slug} needs proof`);
    assert.ok(project.links?.length, `${project.slug} needs at least one link`);
    assert.ok(project.content.length >= 3, `${project.slug} needs a substantive article`);
  }
});

test('earlier project articles remain available without appearing as featured work', () => {
  const { articles, featuredProjects = [] } = loadTypeScriptModule('src/data/writing.ts');
  const featuredSlugs = new Set(featuredProjects.map((project) => project.slug));

  for (const slug of ['eegspeech', 'graphminds', 'research-web-graph']) {
    assert.ok(articles.some((article) => article.slug === slug));
    assert.equal(featuredSlugs.has(slug), false);
  }
});

test('social destinations are readable text rather than icon-only controls', () => {
  const { default: SocialLinks } = loadTypeScriptModule(
    'src/components/SocialLinks.tsx',
    true,
  );
  const markup = renderToStaticMarkup(React.createElement(SocialLinks));

  for (const label of ['GitHub', 'LinkedIn', 'Email']) {
    assert.match(markup, new RegExp(`>${label}<\\/a>`));
  }
  assert.doesNotMatch(markup, /<svg/);
});

test('project destinations render as descriptive links in article headers', () => {
  const componentPath = path.join(root, 'src/components/ArticleLinks.tsx');
  assert.ok(fs.existsSync(componentPath), 'ArticleLinks component is missing');

  const { default: ArticleLinks } = loadTypeScriptModule(
    'src/components/ArticleLinks.tsx',
    true,
  );
  const markup = renderToStaticMarkup(
    React.createElement(ArticleLinks, {
      links: [
        { label: 'Source code', href: 'https://example.com/code' },
        { label: 'Live product', href: 'https://example.com/live' },
      ],
    }),
  );

  assert.match(markup, /href="https:\/\/example.com\/code"[^>]*>Source code<\/a>/);
  assert.match(markup, /href="https:\/\/example.com\/live"[^>]*>Live product<\/a>/);
});

test('the rabbit signature is a keyboard-operable control', () => {
  const { default: Kodama, getNextMood } = loadTypeScriptModule(
    'src/components/Kodama.tsx',
    true,
  );
  const markup = renderToStaticMarkup(React.createElement(Kodama));

  assert.match(markup, /<button[^>]*type="button"/);
  assert.match(markup, /aria-label="Rabbit, idle"/);
  assert.equal(typeof getNextMood, 'function');

  for (const mood of ['sleeping', 'coffee', 'gym', 'coding', 'idle']) {
    assert.notEqual(getNextMood(mood), mood);
  }
});
