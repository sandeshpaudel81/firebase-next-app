const siteUrl = 'https://www.kadammyagdi.org.np';

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    exclude: ['/admin/*'],
    robotsTxtOptions: {
        policies: [
            {userAgent: '*', disallow: '/admin'},
            {userAgent: '*', allow: '/'}
        ]
    },
    generateIndexSitemap: false
}