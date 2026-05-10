import AsistentesTable from "@/components/AsistentesTable"
import Breadcrumbs from "@/components/Breadcrumbs"

export const metadata = { title: "Certificados - Conferencia Magistral UNT" }

export default function CertificadosPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <Breadcrumbs items={[{ label: 'Certificados' }]} />
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#0a4d3b] mb-2">
          Certificados Emitidos
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Lista de asistentes registrados y sus certificados.
        </p>
        <AsistentesTable />
      </div>
    </section>
  )
}
