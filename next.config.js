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
};

module.exports = nextConfig;
