'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { APP_NAME } from '@/lib/constants'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/registro', label: 'Registro' },
  { href: '/certificados', label: 'Certificados' },
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

      {open && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-64 bg-[#0a4d3b] z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
          <span className="text-white font-semibold text-sm">Menú</span>
          <button className="text-white text-xl p-1" onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/85 hover:text-[#c9a84c] hover:bg-white/5 px-4 py-3 rounded-lg transition-colors text-sm"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
