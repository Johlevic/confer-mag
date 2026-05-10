import { notFound } from "next/navigation"
import { buscarPorCodigo } from "@/lib/db"
import CertificateView from "@/components/CertificateView"
import Breadcrumbs from "@/components/Breadcrumbs"

export const metadata = { title: "Certificado - Conferencia Magistral UNT" }

export default async function CertificadoPage(props: { params: Promise<{ codigo: string }> }) {
  const { codigo } = await props.params
  const asistente = await buscarPorCodigo(codigo)

  if (!asistente) notFound()

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Breadcrumbs items={[{ label: 'Certificados', href: '/certificados' }, { label: codigo }]} />
        <CertificateView asistente={asistente} />
      </div>
    </section>
  )
}
