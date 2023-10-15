const BLOG = require('./blog.config')

module.exports = {
  siteUrl: BLOG.link,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  generateIndexSitemap: false,
  sitemapSize: 7000
}