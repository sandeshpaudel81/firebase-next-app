const siteUrl = 'https://www.kadammyagdi.org.np';

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {userAgent: '*', disallow: '/admin'},
            {userAgent: '*', allow: '/'}
        ]
    },
    exclude: ['/admin']
}