import { EVENTO, CURSO } from '@/lib/constants'

export default function sitemap() {
  const siteUrl = process.env.SITE_URL || 'https://confer-mag.vercel.app'

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/registro`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/certificados`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/admin`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]
}
