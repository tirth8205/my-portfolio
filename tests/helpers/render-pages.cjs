const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '../..');

// Real page/app/local components; only Next's routing and head collector need
// substitutes for a standalone server render. Effects do not run during SSR.
function createSite() {
  const modules = new Map();
  let head = [], route = '/';
  const Head = ({ children }) => { head.push(children); return null; };
  const Link = ({ href, children, ...props }) => React.createElement('a', { ...props, href }, children);
  function load(relativePath) {
    const filename = path.resolve(root, relativePath);
    if (modules.has(filename)) return modules.get(filename).exports;
    const module = { exports: {} };
    modules.set(filename, module);
    const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      fileName: filename,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    function localRequire(request) {
      if (request.endsWith('.css')) return {};
      if (request === 'next/head') return Head;
      if (request === 'next/link') return Link;
      if (request === 'next/router') return { useRouter: () => ({ pathname: route, asPath: route }) };
      if (!request.startsWith('.')) return require(request);
      const base = path.resolve(path.dirname(filename), request);
      for (const extension of ['', '.ts', '.tsx']) {
        if (fs.existsSync(base + extension) && fs.statSync(base + extension).isFile()) return load(base + extension);
      }
      throw new Error(`Cannot resolve ${request} from ${filename}`);
    }
    new Function('module', 'exports', 'require', output)(module, module.exports, localRequire);
    return module.exports;
  }
  function render(page, props = {}) {
    route = page === 'pages/index.tsx' ? '/' : page === 'pages/machine.tsx' ? '/machine' : '/writing/[slug]';
    head = [];
    const html = renderToStaticMarkup(React.createElement(load('pages/_app.tsx').default, { Component: load(page).default, pageProps: props }));
    const metadata = renderToStaticMarkup(React.createElement(React.Fragment, null, ...head));
    return { html, body: parseHtml(html), head: parseHtml(metadata) };
  }
  async function markdown(slug) {
    const response = { statusCode: 200, headers: {}, body: '' };
    response.status = code => { response.statusCode = code; return response; };
    response.setHeader = (name, value) => { response.headers[name] = value; return response; };
    response.send = body => { response.body = body; return response; };
    await load('pages/api/markdown.ts').default({ query: { slug } }, response);
    return response;
  }
  return { load, render, markdown };
}

function decode(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (_, entity) => {
    if (entity[0] === '#') return String.fromCodePoint(parseInt(entity.slice(entity[1].toLowerCase() === 'x' ? 2 : 1), entity[1].toLowerCase() === 'x' ? 16 : 10));
    return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[entity.toLowerCase()];
  });
}

// Parse React's static HTML, not browser behaviour. Native interactions and
// computed phone typography/tap targets are checked in the browser separately.
function parseHtml(html) {
  const rootNode = { tag: '#root', attrs: {}, children: [] }, stack = [rootNode];
  const voids = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  for (const match of html.matchAll(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g)) {
    const token = match[0];
    if (token.startsWith('<!--')) continue;
    if (token.startsWith('</')) {
      const tag = token.slice(2).match(/^[\w:-]+/)[0].toLowerCase();
      while (stack.length > 1 && stack.pop().tag !== tag) {}
    } else if (token.startsWith('<')) {
      const start = token.match(/^<([\w:-]+)/);
      if (!start) continue;
      const node = { tag: start[1].toLowerCase(), attrs: {}, children: [], parent: stack.at(-1) };
      for (const attr of token.slice(start[0].length).matchAll(/([^\s=/>]+)(?:="([^"]*)")?/g)) node.attrs[attr[1]] = decode(attr[2] ?? '');
      stack.at(-1).children.push(node);
      if (!voids.has(node.tag) && !token.endsWith('/>')) stack.push(node);
    } else stack.at(-1).children.push({ tag: '#text', text: decode(token), attrs: {}, children: [], parent: stack.at(-1) });
  }
  return rootNode;
}
function all(node, predicate) { return [...(predicate(node) ? [node] : []), ...node.children.flatMap(child => all(child, predicate))]; }
const first = (node, predicate) => all(node, predicate)[0];
const hasClass = (node, name) => (node.attrs.class || '').split(/\s+/).includes(name);
function text(node, visibleOnly = false) {
  if (node.tag === '#text') return node.text;
  if (visibleOnly && node.attrs['aria-hidden'] === 'true') return '';
  const children = visibleOnly && node.tag === 'details' && !Object.hasOwn(node.attrs, 'open') ? node.children.filter(child => child.tag === 'summary') : node.children;
  return children.map(child => text(child, visibleOnly)).join('');
}
const normalText = (node, visibleOnly = false) => text(node, visibleOnly).replace(/\s+/g, ' ').trim();
const section = (body, id) => first(body, node => node.tag === 'section' && node.attrs.id === id);
const anchors = node => all(node, entry => entry.tag === 'a');
const meta = (head, key) => first(head, node => node.tag === 'meta' && (node.attrs.name === key || node.attrs.property === key))?.attrs.content;
module.exports = { createSite, all, first, hasClass, normalText, section, anchors, meta };
