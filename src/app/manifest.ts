import type { MetadataRoute } from 'next'
import { APP_NAME, CURSO } from '@/lib/constants'

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = process.env.SITE_URL || 'https://confer-mag.vercel.app'
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: `Conferencia del curso de ${CURSO.nombre} - ${CURSO.facultad}, UNT`,
    start_url: '/',
    display: 'standalone',
    background_color: '#e8f5e9',
    theme_color: '#0a4d3b',
    icons: [
      { src: `${siteUrl}/img/logo-unt-icono.png`, sizes: '192x192', type: 'image/png' },
      { src: `${siteUrl}/img/logo-unt-icono.png`, sizes: '512x512', type: 'image/png' },
    ],
  }
}
