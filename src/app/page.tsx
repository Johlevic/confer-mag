import HeroSection from "@/components/HeroSection"
import FaqSection from "@/components/FaqSection"
import FadeIn from "@/components/FadeIn"
import SpeakerSection from "@/components/SpeakerSection"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserTie, faEnvelope, faFlask, faDoorOpen, faChalkboardTeacher, faQuestionCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { EVENTO, PONENTE, ORGANIZADORES, AGENDA } from "@/lib/constants"
import Link from "next/link"

const agendaIcons = [faDoorOpen, faChalkboardTeacher, faQuestionCircle, faCheckCircle]

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="py-16 bg-white">
        <FadeIn>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0a4d3b] mb-10">
              Detalles del Evento
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { titulo: "Ponente", desc: EVENTO.ponente, sub: "Conferencista invitado" },
                { titulo: "Fecha y Hora", desc: `${EVENTO.fecha}`, sub: EVENTO.horario },
                { titulo: "Modalidad", desc: `Virtual vía ${EVENTO.plataforma}`, sub: "Enlace enviado después del registro" },
                { titulo: "Certificado", desc: "Con validez curricular", sub: "Se emite después de asistir" },
              ].map((item) => (
                <div key={item.titulo} className="bg-[#e8f5e9] rounded-xl p-6 text-center shadow-sm">
                  <h3 className="font-bold text-[#0a4d3b] mb-2">{item.titulo}</h3>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                  <p className="text-gray-400 text-xs mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <SpeakerSection />

      <section className="py-16 bg-white">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0a4d3b] mb-4">
              Cronograma del Evento
            </h2>
            <p className="text-center text-gray-500 mb-10 text-sm">
              {EVENTO.fecha} · {EVENTO.horario}
            </p>
            <div className="relative">
              <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-[#c9a84c]/30 hidden md:block" />
              <div className="space-y-8">
                {AGENDA.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 md:gap-6">
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-[#e8f5e9] border-2 border-[#c9a84c] items-center justify-center flex-shrink-0 relative z-10">
                      <FontAwesomeIcon icon={agendaIcons[i]} className="text-[#0a4d3b] text-sm" />
                    </div>
                    <div className="flex-1 bg-[#e8f5e9] rounded-xl p-4 md:p-5">
                      <span className="inline-block bg-[#0a4d3b] text-white text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                        {item.hora}
                      </span>
                      <h3 className="font-bold text-[#0a4d3b] text-sm md:text-base">{item.titulo}</h3>
                      <p className="text-gray-600 text-xs md:text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="py-16 bg-[#f0f7f4]">
        <FadeIn>
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0a4d3b] mb-4">
              <FontAwesomeIcon icon={faUserTie} className="mr-2 text-[#c9a84c]" />
              Organizadores
            </h2>
            <p className="text-center text-gray-500 mb-10 text-sm">
              Docentes y estudiantes organizadores del evento
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ORGANIZADORES.filter(p => p.condicion !== 'Estudiante').map((p) => (
                <div key={p.email} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  {'foto' in p && p.foto ? (
                    <Image src={p.foto} alt={p.nombres} width={80} height={80} className="w-20 h-20 mx-auto mb-4 rounded-full object-cover border-[3px] border-[#c9a84c]" />
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0a4d3b] to-[#1a7a5c] flex items-center justify-center text-white text-3xl">
                      <FontAwesomeIcon icon={faFlask} />
                    </div>
                  )}
                  <span className="inline-block bg-[#c9a84c]/20 text-[#c9a84c] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
                    {p.condicion}
                  </span>
                  <h3 className="font-bold text-[#0a4d3b] text-sm leading-tight mb-1">
                    {p.nombres}
                  </h3>
                  <p className="text-gray-500 text-xs mb-2">{p.profesion}</p>
                  <a
                    href={`mailto:${p.email}`}
                    className="inline-flex items-center gap-1 text-xs text-[#1a7a5c] hover:text-[#0a4d3b] transition-colors"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="text-[10px]" />
                    {p.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <FaqSection />

      <section className="py-16 bg-white">
        <FadeIn>
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a4d3b] mb-6">
              ¿Listo para asistir?
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Regístrate gratis y recibe el enlace de Google Meet junto con tu certificado digital.
            </p>
            <Link
              href="/registro"
              className="inline-block bg-[#c9a84c] hover:bg-[#d4b85a] text-[#0a4d3b] font-bold px-10 py-3.5 rounded-lg transition-all hover:-translate-y-0.5 text-lg"
            >
              Registrarme ahora
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
