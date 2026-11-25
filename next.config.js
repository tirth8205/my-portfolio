// An explicit text/markdown entry opts in; wildcards keep the human page.
// Only an omitted quality or a valid, non-zero HTTP quality is acceptable.
// Next compiles header values without flags, so the media type is case-insensitive here.
const markdownMediaType = '[tT][eE][xX][tT]/[mM][aA][rR][kK][dD][oO][wW][nN]';
const mediaParameters = String.raw`(?:[ \t]*;(?![ \t]*[qQ][ \t]*=)[^;,]+)*`;
const positiveQuality = String.raw`(?:[ \t]*;[ \t]*[qQ][ \t]*=[ \t]*(?:1(?:\.0{0,3})?|0\.(?!0{0,3}(?:[ \t]*[;,]|[ \t]*$))[0-9]{1,3}))?`;
const wantsMarkdown = [{
  type: 'header',
  key: 'accept',
  value: String.raw`(?:[^,]*,)*[ \t]*${markdownMediaType}${mediaParameters}${positiveQuality}${mediaParameters}[ \t]*(?:,.*)?`,
}];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/one',
        destination: '/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      // Agents get markdown from the same addresses humans use.
      beforeFiles: [
        // Explicit extensions must be handled before the generic slug route.
        { source: '/index.md', destination: '/api/markdown' },
        { source: '/writing/:slug.md', destination: '/api/markdown?slug=:slug' },
        { source: '/', has: wantsMarkdown, destination: '/api/markdown' },
        { source: '/writing/:slug', has: wantsMarkdown, destination: '/api/markdown?slug=:slug' },
        { source: '/llms.txt', destination: '/api/llms' },
      ],
    };
  },
  async headers() {
    return [
      { source: '/', headers: [{ key: 'Vary', value: 'Accept' }] },
      { source: '/writing/:slug', headers: [{ key: 'Vary', value: 'Accept' }] },
    ];
  },
};

module.exports = nextConfig;
