const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createSite, all, first, hasClass, normalText, section, anchors, meta } = require('./helpers/render-pages.cjs');
const homePage = 'pages/index.tsx';
const articlePage = 'pages/writing/[slug].tsx';
const renderHome = site => site.render(homePage, { initialStars: 32900 });

function selectedSlugs(body) {
  const work = section(body, 'work');
  assert.ok(work, 'the homepage needs its Work section');
  const selected = first(work, node => hasClass(node, 'personal-projects'));
  assert.ok(selected, 'selected work must remain separate from the earlier-work archive');
  return all(selected, node => node.tag === 'h3').map(heading => anchors(heading)[0].attrs.href.replace('/writing/', ''));
}
function newsItem(recently, title) {
  return first(recently, node => node.tag === 'details' && node.children.some(child => child.tag === 'summary' && normalText(child).includes(title)));
}

test('the actual homepage and machine page expose the same featured projects', () => {
  const site = createSite();
  const { featuredProjects } = site.load('src/data/writing.ts');
  const expected = featuredProjects.map(project => project.slug);
  assert.ok(expected.includes('jailbreak-eval'));
  assert.deepEqual(selectedSlugs(renderHome(site).body), expected);
  const markdown = site.load('src/lib/markdown.ts').homeMarkdown(32900);
  const selected = markdown.split('## Selected work\n')[1].split('\n## Writing')[0];
  assert.deepEqual([...selected.matchAll(/\/writing\/([^/)]+)\.md\)/g)].map(match => match[1]), expected);
  const machine = site.render('pages/machine.tsx', { markdown });
  for (const project of featuredProjects) assert.ok(anchors(machine.body).some(link => link.attrs.href === `https://tirthkanani.com/writing/${project.slug}.md`));
});

test('adding and reordering featured data changes the actual Work list without page edits', () => {
  const site = createSite();
  const data = site.load('src/data/writing.ts');
  const added = { slug: 'test-new-project', title: 'Test new project', year: '2026', date: '25 November 2026', kind: 'project', featured: true, description: 'A test fixture.', blurb: 'A test fixture.', proof: 'Test result.', content: ['A test fixture.'] };
  data.articles = [...data.articles, added];
  data.featuredProjects = [added, ...[...data.featuredProjects].reverse()];
  assert.deepEqual(selectedSlugs(renderHome(site).body), data.featuredProjects.map(project => project.slug));
});

test('every real news row, including archived rows, opens locally before offering links', () => {
  const site = createSite();
  const { recent } = site.load('src/data/profile.ts');
  const recently = section(renderHome(site).body, 'recently');
  assert.ok(recently);
  for (const item of recent) {
    const row = newsItem(recently, item.title);
    assert.ok(row, `missing disclosure for ${item.title}`);
    assert.equal(Object.hasOwn(row.attrs, 'open'), false, item.title);
    const summary = row.children.find(child => child.tag === 'summary');
    assert.equal(anchors(summary).length, 0, `news summary must not navigate: ${item.title}`);
    assert.ok(normalText(row).includes(item.detail), `missing expanded detail: ${item.title}`);
    for (const link of item.links) {
      const rendered = anchors(row).find(anchor => anchor.attrs.href === link.href);
      assert.ok(rendered, `missing optional destination for ${item.title}: ${link.href}`);
      if (/^https?:\/\//.test(link.href)) {
        assert.equal(rendered.attrs.target, '_blank');
        assert.match(rendered.attrs.rel, /\bnoopener\b/);
        assert.match(rendered.attrs.rel, /\bnoreferrer\b/);
      } else assert.equal(rendered.attrs.target, undefined);
    }
  }
});

test('new news and reordered or empty link arrays cannot break the page or cross-wire destinations', () => {
  const site = createSite();
  const profile = site.load('src/data/profile.ts');
  const added = { id: 'test-note', when: 'Dec 2026', title: 'A newly added note', detail: 'A new record supplied to the real homepage.', archive: false, links: [{ label: 'External source', href: 'https://example.com/new-note' }, { label: 'Related writing', href: '/writing/about' }] };
  const withoutLinks = { id: 'test-no-links', when: 'Dec 2026', title: 'A note without a destination', detail: 'This note needs no outgoing link.', archive: false, links: [] };
  profile.recent = [added, withoutLinks, ...[...profile.recent].reverse().map(item => ({ ...item, links: [...item.links].reverse() }))];
  const recently = section(renderHome(site).body, 'recently');
  for (const item of profile.recent) {
    const row = newsItem(recently, item.title);
    assert.ok(row, item.title);
    assert.deepEqual(anchors(row).map(link => link.attrs.href), item.links.map(link => link.href), item.title);
  }
});

test('the three requested proof statements are visible without opening any disclosure', () => {
  const visible = normalText(renderHome(createSite()).body, true);
  assert.match(visible, /8\.9× fewer tokens/);
  assert.match(visible, /median/i);
  assert.match(visible, /18 questions/);
  assert.match(visible, /six (?:real )?repositories/);
  assert.match(visible, /I was one of 35 engineers chosen from more than 1,500 applicants/);
  assert.match(visible, /around 330,000 (?:PyPI )?downloads/i);
  assert.match(visible, /month to 25 November/);
});

test('the actual homepage retains social destinations and its native-cursor footer', () => {
  const { body } = renderHome(createSite());
  const socials = first(body, node => node.tag === 'nav' && node.attrs['aria-label'] === 'Elsewhere');
  for (const [label, href] of [
    ['X', 'https://x.com/tirth_8205'], ['GitHub', 'https://github.com/tirth8205'],
    ['LinkedIn', 'https://linkedin.com/in/tirthkanani'], ['Email', 'mailto:tirthkanani18@gmail.com'],
  ]) {
    const link = anchors(socials).find(node => normalText(node) === label);
    assert.equal(link?.attrs.href, href);
    assert.equal(link.attrs.target, undefined, `${label} behaviour must stay unchanged`);
  }
  assert.ok(anchors(body).some(link => normalText(link) === 'Plain text' && link.attrs.href === '/machine'));
  assert.ok(first(body, node => node.tag === 'button' && /^Rabbit, /.test(node.attrs['aria-label'] || '') && node.attrs.type === 'button'));
  assert.equal(all(body, node => hasClass(node, 'personal-cursor')).length, 0);
});

test('all actual article pages show proof and caveat, and the Markdown API includes both', async () => {
  const site = createSite();
  const { articles, featuredProjects } = site.load('src/data/writing.ts');
  assert.equal(articles.length, 11);
  for (const project of featuredProjects) {
    assert.ok(project.proof?.trim(), `${project.slug} needs its supplied proof`);
    assert.ok(project.caveat?.trim(), `${project.slug} needs its supplied caveat`);
  }
  for (const article of articles) {
    const rendered = site.render(articlePage, { article });
    const paragraphs = all(rendered.body, node => node.tag === 'p').map(node => normalText(node));
    const response = await site.markdown(article.slug);
    assert.equal(response.statusCode, 200);
    assert.match(response.headers['Content-Type'], /^text\/markdown/);
    for (const field of ['proof', 'caveat']) {
      if (!article[field]) continue;
      assert.ok(paragraphs.includes(article[field]), `${article.slug}: ${field} should be its own visible paragraph`);
      assert.ok(response.body.includes(article[field]), `${article.slug}: missing ${field} from .md response`);
    }
    assert.ok(response.body.startsWith(`# ${article.title}\n`));
    assert.ok(response.body.includes(article.content[0]));
  }
});

test('article Medium, resource and inline outside links open separately; local links stay local', () => {
  const site = createSite();
  const { articles } = site.load('src/data/writing.ts');
  const fixture = { ...articles[0], slug: 'test-links', mediumUrl: 'https://medium.example/original', links: [{ label: 'An outside resource', href: 'https://example.com/resource' }, { label: 'A local resource', href: '/writing/about' }], content: ['Read [an outside citation](https://example.com/citation) or [a local article](/writing/about).'] };
  for (const article of [...articles, fixture]) {
    const { body } = site.render(articlePage, { article });
    const links = anchors(first(body, node => node.tag === 'article' && hasClass(node, 'personal-article')));
    for (const link of links) {
      if (/^https?:\/\//.test(link.attrs.href)) {
        assert.equal(link.attrs.target, '_blank', `${article.slug}: ${link.attrs.href}`);
        assert.match(link.attrs.rel || '', /\bnoopener\b/);
        assert.match(link.attrs.rel || '', /\bnoreferrer\b/);
      } else assert.equal(link.attrs.target, undefined, `${article.slug}: ${link.attrs.href}`);
    }
    if (article.mediumUrl) assert.ok(links.some(link => link.attrs.href === article.mediumUrl));
  }
});

test('a short article still offers a working table of contents', () => {
  const site = createSite();
  const article = { ...site.load('src/data/writing.ts').articles[0], content: ['Opening.', 'First section.', 'Another paragraph.', 'Second section.'], headings: { 1: 'First heading', 3: 'Second heading' } };
  const { body } = site.render(articlePage, { article });
  const contents = first(body, node => node.tag === 'details' && node.children.some(child => child.tag === 'summary' && normalText(child) === 'On this page'));
  assert.ok(contents, 'the old five-minute gate must not hide navigation');
  const links = anchors(contents);
  assert.equal(links.length, 2);
  for (const link of links) {
    const destination = first(body, node => node.tag === 'h2' && node.attrs.id === link.attrs.href.slice(1));
    assert.ok(destination, `broken contents destination: ${link.attrs.href}`);
    assert.equal(normalText(link), normalText(destination));
  }
});

test('real page heads retain share metadata, indexing rules and the current theme colour', () => {
  const site = createSite();
  const { articles } = site.load('src/data/writing.ts');
  for (const [page, props, title, description] of [
    [homePage, { initialStars: 32900 }, 'Tirth Kanani', null],
    ...articles.map(article => [articlePage, { article }, article.title, article.description]),
  ]) {
    const { head } = site.render(page, props);
    assert.equal(meta(head, 'og:site_name'), 'Tirth Kanani');
    assert.equal(meta(head, 'twitter:title'), title);
    assert.ok(meta(head, 'twitter:description'));
    if (description) assert.equal(meta(head, 'twitter:description'), description);
    assert.equal(meta(head, 'robots'), 'index, follow');
    assert.equal(meta(head, 'theme-color'), '#fdfdfc');
    assert.equal(meta(head, 'twitter:card'), 'summary');
    if (page === articlePage) assert.equal(meta(head, 'article:author'), 'Tirth Kanani');
  }
});

test('the original agentic-AI title and progression remain on the real page', () => {
  const site = createSite();
  const article = site.load('src/data/writing.ts').articles.find(item => item.slug === 'agentic-ai');
  const { body } = site.render(articlePage, { article });
  assert.equal(normalText(first(body, node => node.tag === 'h1')), 'From rule-based algorithms to agentic AI');
  assert.equal(article.date, '8 May 2025');
  const prose = normalText(first(body, node => hasClass(node, 'article-body')));
  assert.match(prose, /Google Maps/);
  assert.match(prose, /rules/i);
  assert.match(prose, /language models/i);
  assert.match(prose, /plan/i);
  assert.match(prose, /initiative/i);
});

test('the biography keeps Global Talent and CrumbleUX remains a side project', () => {
  const site = createSite();
  const data = site.load('src/data/writing.ts');
  assert.match(normalText(renderHome(site).body), /UK’s Global Talent visa/);
  const about = data.articles.find(article => article.slug === 'about');
  assert.match(normalText(site.render(articlePage, { article: about }).body), /Global Talent visa/);
  const crumble = data.articles.find(article => article.slug === 'crumbleux');
  const prose = normalText(first(site.render(articlePage, { article: crumble }).body, node => hasClass(node, 'personal-article')));
  assert.match(prose, /side project/i);
  assert.doesNotMatch(prose, /\bfounder\b/i);
});

test('static routes, sitemap and Markdown API retain every article and reject unknown slugs', async () => {
  const site = createSite();
  const { articles } = site.load('src/data/writing.ts');
  const page = site.load(articlePage);
  const paths = await page.getStaticPaths();
  assert.deepEqual(paths.paths.map(item => item.params.slug), articles.map(article => article.slug));
  assert.equal(paths.fallback, false);
  assert.deepEqual(await page.getStaticProps({ params: { slug: 'no-such-article' } }), { notFound: true });
  assert.equal((await site.markdown('no-such-article')).statusCode, 404);
  const sitemap = fs.readFileSync(path.resolve(__dirname, '../public/sitemap.xml'), 'utf8');
  for (const article of articles) assert.ok(sitemap.includes(`/writing/${article.slug}<`));
});
