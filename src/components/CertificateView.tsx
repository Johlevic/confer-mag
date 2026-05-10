'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import type { Asistente } from '@/lib/types'
import { EVENTO } from '@/lib/constants'

export default function CertificateView({ asistente }: { asistente: Asistente }) {
  function imprimir() {
    const content = document.getElementById('certificado-contenido')
    if (!content) return
    const html = content.innerHTML
    const win = window.open('', '', 'width=900,height=700')
    if (!win) return
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificado - ${asistente.nombre}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @page { size: landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        </style>
      </head>
      <body class="flex items-center justify-center min-h-screen p-8 bg-white">
        ${html}
      </body>
      </html>
    `)
    win.document.close()
    setTimeout(() => { win.print() }, 500)
  }

  return (
    <div>
      <div id="certificado-contenido" className="max-w-[900px] mx-auto bg-white border-[6px] border-[#c9a84c] rounded-xl p-10 md:p-14 shadow-2xl relative">
        <div className="absolute inset-3 border-2 border-[#c9a84c]/40 rounded-lg pointer-events-none" />

        <div className="relative text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/img/logo-unt-icono.png"
              alt="Universidad Nacional de Trujillo"
              className="h-20 md:h-24 w-auto"
            />
          </div>

          <div className="inline-block bg-[#c9a84c] text-[#0a4d3b] px-5 py-1 rounded font-bold text-xs tracking-[3px] uppercase mb-4">
            Universidad Nacional de Trujillo
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0a4d3b] mb-2 mt-4">
            Certificado de Asistencia
          </h1>

          <p className="text-gray-500 italic text-lg mb-8">Otorgado a</p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a4d3b] mb-8 border-b-2 border-[#c9a84c] inline-block pb-2 px-8">
            {asistente.nombre}
          </h2>

          <p className="text-gray-700 leading-relaxed max-w-xl mx-auto text-base md:text-lg mb-10">
            Por haber asistido a la <strong>Conferencia Magistral</strong> titulada
            &ldquo;{EVENTO.titulo}&rdquo; impartida por el <strong>{EVENTO.ponente}</strong>,
            realizada el <strong>{EVENTO.fecha}</strong> en horario de <strong>{EVENTO.horario}</strong>
            a través de <strong>{EVENTO.plataforma}</strong>.
          </p>

          <div className="flex justify-between items-end border-t border-gray-200 pt-6 mt-6 text-sm">
            <div className="text-left">
              <span className="text-gray-400 block mb-1">Código de verificación:</span>
              <span className="font-mono font-bold text-[#0a4d3b] tracking-wider text-base">
                {asistente.codigo_certificado}
              </span>
            </div>
            <div className="text-right">
              <p className="font-bold text-[#0a4d3b]">Conferencia Magistral</p>
              <p className="text-gray-400">{EVENTO.year}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={imprimir}
          className="bg-[#0a4d3b] hover:bg-[#1a7a5c] text-white font-bold px-8 py-3 rounded-lg transition-all hover:-translate-y-0.5 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPrint} /> Imprimir / Guardar PDF
        </button>
        <a
          href="/certificados"
          className="border-2 border-[#0a4d3b] text-[#0a4d3b] hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg transition-all flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Volver a lista
        </a>
      </div>
    </div>
  )
}
