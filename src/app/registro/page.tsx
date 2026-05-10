import RegistrationForm from "@/components/RegistrationForm"
import Breadcrumbs from "@/components/Breadcrumbs"
import { EVENTO } from "@/lib/constants"

export const metadata = { title: "Registro - Conferencia Magistral UNT" }

export default function RegistroPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <Breadcrumbs items={[{ label: 'Registro' }]} />
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#0a4d3b] mb-2">
          Registro a la Conferencia
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          {EVENTO.titulo}
        </p>
        <RegistrationForm />
      </div>
    </section>
  )
}
