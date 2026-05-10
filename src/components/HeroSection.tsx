import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faClock, faFlask, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { EVENTO, CURSO } from '@/lib/constants'
import CountdownTimer from './CountdownTimer'

export default function HeroSection() {
  const meetLink = process.env.MEET_LINK || 'https://meet.google.com/aqt-tnxa-qwp'

  return (
    <section className="relative overflow-hidden text-white min-h-[500px] md:min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-[#2d4a3b]">
        <Image
          src="/img/facultad-ciencias-biologicas.jpg"
          alt="Facultad de Ciencias Biológicas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full px-4 py-12 md:py-16 flex justify-center">
        <div className="max-w-2xl bg-gradient-to-br from-[#0a4d3b] via-[#1a7a5c] to-[#0d47a1] border border-[#c9a84c]/60 rounded-xl p-6 md:p-10 shadow-2xl text-center">
          <span className="inline-block bg-[#c9a84c] text-[#0a4d3b] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <FontAwesomeIcon icon={faFlask} className="mr-1.5" /> {CURSO.nombre} - {EVENTO.tituloCorto}
        </span>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mb-4 text-xs text-white/70">
          <span>{CURSO.facultad}</span>
          <span>{CURSO.programa}</span>
          <span>Ciclo {CURSO.ciclo}</span>
          <span>{CURSO.semestre}</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-3">
          {EVENTO.ponente}
        </h1>

        <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed italic border-l-2 border-[#c9a84c]/50 pl-4">
          &ldquo;{EVENTO.titulo}&rdquo;
        </p>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 text-sm md:text-base">
          <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendarAlt} className="text-[#c9a84c]" /> {EVENTO.fecha}</span>
          <span className="flex items-center gap-2"><FontAwesomeIcon icon={faClock} className="text-[#c9a84c]" /> {EVENTO.horario}</span>
        </div>

        <div className="mb-6">
          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${CURSO.nombre} - ${EVENTO.tituloCorto}: ${EVENTO.ponente}`)}&dates=20260514T190000/20260514T220000&ctz=America/Lima&details=${encodeURIComponent(EVENTO.titulo)}&location=${encodeURIComponent('Google Meet')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#c9a84c]/50 hover:border-[#c9a84c] text-[#c9a84c] hover:text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all hover:bg-[#c9a84c]/20"
          >
            <FontAwesomeIcon icon={faCalendarPlus} />
            Añadir a Google Calendar
          </a>
        </div>

        <div className="mb-8">
          <CountdownTimer targetDate={EVENTO.fechaISO} />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/registro"
            className="bg-[#c9a84c] hover:bg-[#d4b85a] text-[#0a4d3b] font-bold px-8 py-3 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Registrarme
          </Link>
          <a
            href={meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-3 rounded-lg font-semibold transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/3840px-Google_Meet_icon_%282020%29.svg.png" alt="Google Meet" className="w-5 h-5" />
            Unirme a Google Meet
          </a>
        </div>
        </div>
      </div>
    </section>
  )
}
