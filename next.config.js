/** @type {import('next').NextConfig} */
const wantsMarkdown = [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }];

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
        { source: '/', has: wantsMarkdown, destination: '/api/markdown' },
        { source: '/writing/:slug', has: wantsMarkdown, destination: '/api/markdown?slug=:slug' },
        { source: '/index.md', destination: '/api/markdown' },
        { source: '/writing/:slug.md', destination: '/api/markdown?slug=:slug' },
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
