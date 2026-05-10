'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { EVENTO, CURSO, CONTACTO, APP_NAME } from '@/lib/constants'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/registro', label: 'Registro' },
  { href: '/certificados', label: 'Certificados' },
]

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/10 md:border-b-0 pb-3 md:pb-0">
      <button
        className="flex items-center justify-between w-full py-2 md:hidden"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <h4 className="text-white font-semibold text-xs uppercase tracking-wider">{title}</h4>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`text-white/40 text-[10px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <h4 className="hidden md:block text-white font-semibold text-xs uppercase tracking-wider mb-3">{title}</h4>
      <div className={`overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 ${open ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col items-center md:items-start gap-3">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0a4d3b] text-white/70 mt-auto text-sm">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-base">
            <img src="/img/logo-unt-icono.png" alt="UNT" className="h-7 w-auto" />
            {APP_NAME}
          </Link>
          <p className="text-xs text-white/40 leading-relaxed text-center md:text-left">
            Facultad de Ciencias Biológicas<br />
            Universidad Nacional de Trujillo
          </p>
          <p className="text-xs text-white/40 mt-1 text-center md:text-left">
            &copy; {EVENTO.year} {CURSO.facultad}. Todos los derechos reservados.
          </p>
        </div>

        <div className="space-y-3 md:space-y-0 md:flex md:flex-col md:items-start">
          <AccordionSection title="Enlaces">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="text-white/60 hover:text-[#c9a84c] transition-colors text-xs">
                {l.label}
              </Link>
            ))}
          </AccordionSection>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Contacto</h4>
          <a href={`mailto:${CONTACTO.email}`} className="inline-flex items-center gap-2 text-white/60 hover:text-[#c9a84c] transition-colors text-xs">
            <FontAwesomeIcon icon={faEnvelope} className="text-[#c9a84c] text-[10px]" />
            {CONTACTO.email}
          </a>
          <div className="flex gap-3 mt-1">
            <a href={CONTACTO.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#c9a84c] hover:text-[#0a4d3b] flex items-center justify-center transition-colors" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} className="text-xs" />
            </a>
            <a href={CONTACTO.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#c9a84c] hover:text-[#0a4d3b] flex items-center justify-center transition-colors" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} className="text-xs" />
            </a>
            <a href={CONTACTO.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#c9a84c] hover:text-[#0a4d3b] flex items-center justify-center transition-colors" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="text-xs text-white/30 text-center">
          Desarrollado por{' '}
          <a href="https://sysjol.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-[#c9a84c] hover:underline">
            SysJoL
          </a>
        </p>
      </div>
    </footer>
  )
}
