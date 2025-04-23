module.exports = {
  siteUrl: 'https://www.tirthkanani.com',
  generateRobotsTxt: true, // Updates robots.txt with the sitemap location
  sitemapSize: 7000, // Maximum number of URLs per sitemap file (default is 50000)
  exclude: ['/wp-admin/*', '/wp-content/*', '/wp-includes/*', '/blog/*'], // Exclude WordPress paths
};
