'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faHome, faClipboardList, faCertificate } from '@fortawesome/free-solid-svg-icons'
import { APP_NAME, EVENTO } from '@/lib/constants'

const links = [
  { href: '/', label: 'Inicio', icon: faHome },
  { href: '/registro', label: 'Registro', icon: faClipboardList },
  { href: '/certificados', label: 'Certificados', icon: faCertificate },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const prevScrollY = useRef(0)

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY
      if (currentY > prevScrollY.current && currentY > 60) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      prevScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`bg-[#0a4d3b] fixed top-0 left-0 right-0 z-[60] shadow-lg transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-lg tracking-tight flex items-center gap-2" onClick={() => setOpen(false)}>
            <img src="/img/logo-unt-icono.png" alt="UNT" className="h-8 w-auto" />
            {APP_NAME}
          </Link>

          <div className="hidden md:flex gap-6 text-sm">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-white/85 hover:text-[#c9a84c] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <button className="md:hidden text-white text-xl p-1" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>

      {open && <div className="fixed inset-0 bg-black/40 z-[70] md:hidden" onClick={() => setOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-72 bg-[#0a4d3b] z-[80] shadow-2xl transform transition-transform duration-300 md:hidden flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <img src="/img/logo-unt-icono.png" alt="UNT" className="h-7 w-auto" />
            <span className="text-white font-semibold text-sm">{APP_NAME}</span>
          </div>
          <button className="text-white/70 hover:text-white text-xl p-1" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl transition-all text-sm font-medium"
            >
              <FontAwesomeIcon icon={l.icon} className="w-4 h-4 text-[#c9a84c]" />
              {l.label}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 flex-shrink-0">
          <p className="text-xs text-white/30 text-center">
            &copy; {EVENTO.year} Ciencias Biológicas
          </p>
        </div>
      </div>
    </>
  )
}
