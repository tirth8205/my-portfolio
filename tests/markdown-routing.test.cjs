const test = require('node:test');
const assert = require('node:assert/strict');
const config = require('../next.config');
const { getPathMatch } = require('next/dist/shared/lib/router/utils/path-match');
const {
  matchHas,
  prepareDestination,
} = require('next/dist/shared/lib/router/utils/prepare-destination');

// Exercise the configured rules with Next's own path, header and destination
// matchers. beforeFiles rewrites continue matching the rewritten path.
async function resolveRequest(pathname, accept) {
  let query = {};
  const request = { headers: accept ? { accept } : {} };
  const { beforeFiles } = await config.rewrites();

  for (const route of beforeFiles) {
    const params = getPathMatch(route.source, { removeUnnamedParams: true })(pathname);
    if (!params) continue;
    const headerParams = matchHas(request, query, route.has, route.missing);
    if (!headerParams) continue;

    const { parsedDestination } = prepareDestination({
      destination: route.destination,
      params: { ...params, ...headerParams },
      query,
      appendParamsToQuery: true,
    });
    pathname = parsedDestination.pathname;
    query = parsedDestination.query;
  }

  return { pathname, query };
}

test('explicit article markdown keeps its slug when Accept also requests markdown', async () => {
  assert.deepEqual(
    await resolveRequest('/writing/code-review-graph.md', 'text/markdown'),
    { pathname: '/api/markdown', query: { slug: 'code-review-graph' } },
  );
});

test('explicit markdown addresses work without an Accept opt-in', async () => {
  assert.deepEqual(await resolveRequest('/index.md'), {
    pathname: '/api/markdown',
    query: {},
  });
  assert.deepEqual(await resolveRequest('/writing/code-review-graph.md', '*/*'), {
    pathname: '/api/markdown',
    query: { slug: 'code-review-graph' },
  });
});

test('canonical pages stay HTML when markdown is absent, invalid or excluded', async () => {
  for (const accept of [
    undefined,
    '*/*',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/markdown;q=0',
    'text/markdown;q=0.000, text/html',
    'text/html, text/markdown; charset=utf-8; Q = 0.00',
    'text/markdown;q=0.',
    'text/markdown;q=-1',
    'text/markdown;q=2',
    'text/markdown;q=0.0001',
    'text/markdownish',
    'application/text/markdown',
    'text/plain; format=text/markdown',
  ]) {
    for (const pathname of ['/', '/writing/code-review-graph']) {
      assert.deepEqual(await resolveRequest(pathname, accept), { pathname, query: {} }, accept);
    }
  }
});

test('an explicit acceptable markdown media type opts canonical pages into markdown', async () => {
  for (const accept of [
    'text/markdown',
    'text/markdown;q=1',
    'text/markdown;q=1.000',
    'text/markdown;q=0.5',
    'text/markdown;q=0.001',
    'text/markdown; charset=utf-8',
    'text/markdown; charset=utf-8; q=0.5',
    'text/html, text/markdown;q=0.5',
    'text/plain;q=0, text/markdown;q=0.8, */*;q=0.1',
    'TEXT/MARKDOWN;Q=0.5',
  ]) {
    assert.deepEqual(await resolveRequest('/', accept), {
      pathname: '/api/markdown',
      query: {},
    }, accept);
    assert.deepEqual(await resolveRequest('/writing/code-review-graph', accept), {
      pathname: '/api/markdown',
      query: { slug: 'code-review-graph' },
    }, accept);
  }
});

test('unknown article requests retain their slug for the API to return 404', async () => {
  for (const [pathname, accept] of [
    ['/writing/does-not-exist.md', undefined],
    ['/writing/does-not-exist.md', 'text/markdown'],
    ['/writing/does-not-exist', 'text/markdown'],
  ]) {
    assert.deepEqual(await resolveRequest(pathname, accept), {
      pathname: '/api/markdown',
      query: { slug: 'does-not-exist' },
    });
  }
});
