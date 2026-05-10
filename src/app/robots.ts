export default function robots() {
  const siteUrl = process.env.SITE_URL || 'https://confer-mag.vercel.app'
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/admin' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
