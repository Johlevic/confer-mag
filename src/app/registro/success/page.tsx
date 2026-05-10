import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faQrcode, faLaptop, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Breadcrumbs from "@/components/Breadcrumbs"
import { CONTACTO } from "@/lib/constants"

export const metadata = { title: "Registro Exitoso - Conferencia Magistral UNT" }

const steps = [
  {
    icon: faEnvelope,
    titulo: "Revisa tu correo",
    desc: "Te hemos enviado el enlace de Google Meet y los detalles del evento a tu correo electrónico.",
  },
  {
    icon: faWhatsapp,
    titulo: "Únete al grupo de WhatsApp",
    desc: "Recibe recordatorios, material adicional y resuelve tus dudas en nuestro grupo oficial.",
    action: true,
    href: CONTACTO.whatsappLink,
    label: "Unirme al grupo",
  },
  {
    icon: faQrcode,
    titulo: "Guarda tu código",
    desc: "Tu código de certificado está abajo. Guárdalo para descargar tu certificado después del evento.",
  },
  {
    icon: faLaptop,
    titulo: "Asiste a la conferencia",
    desc: "El jueves 14 de mayo a las 7:00 PM ingresa a Google Meet y disfruta de la ponencia.",
  },
]

export default async function RegistroSuccessPage(props: {
  searchParams: Promise<{ codigo?: string; nombre?: string }>
}) {
  const searchParams = await props.searchParams
  const codigo = searchParams.codigo || "---"
  const nombre = searchParams.nombre || "Asistente"
  const meetLink = process.env.MEET_LINK || "https://meet.google.com/aqt-tnxa-qwp"

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#e8f5e9] min-h-[calc(100vh-56px)]">
      <div className="max-w-xl mx-auto px-4">
        <Breadcrumbs items={[{ label: 'Registro', href: '/registro' }, { label: 'Éxito' }]} />
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="w-8 h-8 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-[#0a4d3b] mb-2">¡Registro exitoso!</h1>
          <p className="text-gray-600">
            Gracias por registrarte, <strong className="text-[#0a4d3b]">{nombre}</strong>.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 my-6">
            <p className="text-sm text-gray-500 mb-1">Tu código de certificado:</p>
            <p className="font-mono text-2xl font-bold text-[#0a4d3b] tracking-widest">{codigo}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon icon={step.icon} className="text-[#0a4d3b] text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#0a4d3b] text-sm">{step.titulo}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{step.desc}</p>
                {'action' in step && (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a7a5c] hover:text-[#0a4d3b] mt-2 transition-colors"
                  >
                    {step.label} <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#1a7a5c] hover:bg-[#0a4d3b] text-white font-bold py-3 rounded-lg transition-colors text-center"
          >
            Ir a Google Meet
          </a>
          <Link
            href={`/certificado/${codigo}`}
            className="w-full border-2 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-white font-bold py-3 rounded-lg transition-all text-center"
          >
            Ver mi certificado
          </Link>
        </div>
      </div>
    </section>
  )
}
