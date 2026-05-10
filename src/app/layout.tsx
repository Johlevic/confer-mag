import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";
import { APP_NAME, CURSO, EVENTO } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.SITE_URL || "https://confer-mag.vercel.app";

export const viewport: Viewport = {
  themeColor: "#0a4d3b",
}

export const metadata: Metadata = {
  title: { default: `${APP_NAME} - ${EVENTO.tituloCorto}`, template: `%s - ${APP_NAME}` },
  description: `Regístrate gratis para la conferencia "${EVENTO.titulo}" a cargo del ${EVENTO.ponente}. Organizado por la Facultad de Ciencias Biológicas - UNT.`,
  openGraph: {
    title: `${APP_NAME} - ${EVENTO.tituloCorto}`,
    description: `Conferencia: "${EVENTO.titulo}". ${EVENTO.fecha} · ${EVENTO.horario}. Regístrate gratis y obtén tu certificado.`,
    url: siteUrl,
    siteName: APP_NAME,
    images: [{ url: `${siteUrl}/img/facultad-ciencias-biologicas.jpg`, width: 1200, height: 630 }],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - ${EVENTO.tituloCorto}`,
    description: `Conferencia: "${EVENTO.titulo}". Regístrate gratis y obtén tu certificado.`,
    images: [`${siteUrl}/img/facultad-ciencias-biologicas.jpg`],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: APP_NAME, statusBarStyle: "black-translucent" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <Navbar />
          <main className="flex-1 pt-14">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
