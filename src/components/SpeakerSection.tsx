"use client"

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserTie, faGraduationCap, faBriefcase, faMicroscope, faGlobe, faAward } from "@fortawesome/free-solid-svg-icons"
import { EVENTO, PONENTE } from "@/lib/constants"
import FadeIn from "./FadeIn"

const UniLogo = ({ uni }: { uni: typeof PONENTE.universidades[number] }) => {
  const [src, setSrc] = useState<string>(uni.logo)

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#c9a84c]/30 transition-colors">
      <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shadow-sm border border-gray-100 flex-shrink-0 overflow-hidden">
        <img 
          src={src} 
          alt={uni.nombre} 
          className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
          onError={() => {
            setSrc(`https://ui-avatars.com/api/?name=${uni.nombre}&background=e8f5e9&color=0a4d3b`)
          }}
        />
      </div>
      <div>
        <p className="font-bold text-[#0a4d3b] text-sm">{uni.nombre}</p>
        <p className="text-[10px] text-gray-500 font-medium uppercase">{uni.vinculo}</p>
      </div>
    </div>
  )
}

export default function SpeakerSection() {
  return (
    <section id="ponente" className="py-16 bg-[#f8fcf9]">
      <FadeIn>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0a4d3b] mb-12">
            <FontAwesomeIcon icon={faUserTie} className="mr-3 text-[#c9a84c]" />
            Conoce al Ponente
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e8f5e9]">
            {/* Header del Ponente */}
            <div className="bg-gradient-to-r from-[#0a4d3b] to-[#1a7a5c] p-8 md:p-10 text-white">
              <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                <div className="relative">
                  <img
                    src="/img/ponente.png"
                    alt={EVENTO.ponente}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#c9a84c] shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#c9a84c] text-[#0a4d3b] w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <FontAwesomeIcon icon={faAward} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <FontAwesomeIcon icon={faGlobe} className="text-[#c9a84c]" />
                    {PONENTE.origen}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black mb-2">{PONENTE.fullName}</h3>
                  <p className="text-[#c9a84c] text-lg md:text-xl font-medium">
                    {PONENTE.grado} Investigador
                  </p>
                </div>
              </div>
            </div>

            {/* Contenido Detallado */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Columna Izquierda: Formación e Instituciones */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Universidades / Vínculos */}
                  <div>
                    <h4 className="text-lg font-bold text-[#0a4d3b] mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#e8f5e9] flex items-center justify-center text-sm">🏛️</span>
                      Instituciones Vinculadas
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {PONENTE.universidades.map((uni) => (
                        <UniLogo key={uni.nombre} uni={uni} />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Formación */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-black text-[#0a4d3b] uppercase tracking-[0.2em] flex items-center gap-2">
                        <FontAwesomeIcon icon={faGraduationCap} className="text-[#c9a84c]" />
                        Formación
                      </h4>
                      <ul className="space-y-4">
                        <li className="group">
                          <p className="text-xs font-bold text-[#1a7a5c] mb-1">DOCTORADO</p>
                          <p className="text-sm text-gray-700 leading-relaxed group-hover:text-black transition-colors">{PONENTE.doctorado}</p>
                        </li>
                        <li className="group">
                          <p className="text-xs font-bold text-[#1a7a5c] mb-1">MAESTRÍA</p>
                          <p className="text-sm text-gray-700 leading-relaxed group-hover:text-black transition-colors">{PONENTE.maestria}</p>
                        </li>
                      </ul>
                    </div>

                    {/* Trayectoria */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-black text-[#0a4d3b] uppercase tracking-[0.2em] flex items-center gap-2">
                        <FontAwesomeIcon icon={faBriefcase} className="text-[#c9a84c]" />
                        Trayectoria
                      </h4>
                      <ul className="space-y-4">
                        {PONENTE.investigacion.map((item, i) => (
                          <li key={i} className="text-sm text-gray-700 leading-relaxed border-l-2 border-[#e8f5e9] pl-3 hover:border-[#c9a84c] transition-all">
                            {item}
                          </li>
                        ))}
                        <li className="text-sm text-gray-700 leading-relaxed border-l-2 border-[#e8f5e9] pl-3 hover:border-[#c9a84c] transition-all">
                          <strong>Docencia:</strong> {PONENTE.docencia}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Líneas de Investigación */}
                <div className="lg:border-l lg:border-gray-100 lg:pl-10">
                  <h4 className="text-sm font-black text-[#0a4d3b] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <FontAwesomeIcon icon={faMicroscope} className="text-[#c9a84c]" />
                    Líneas de Investigación
                  </h4>
                  <div className="flex flex-col gap-3">
                    {PONENTE.lineas.map((l, i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#e8f5e9]/50 hover:bg-[#e8f5e9] p-3 rounded-xl transition-colors group">
                        <div className="w-2 h-2 rounded-full bg-[#c9a84c] group-hover:scale-125 transition-transform" />
                        <span className="text-sm font-medium text-[#0a4d3b]">{l}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 p-5 rounded-2xl bg-gradient-to-br from-[#c9a84c]/10 to-transparent border border-[#c9a84c]/20">
                    <p className="text-xs text-[#0a4d3b] font-bold uppercase mb-2">Especialidad</p>
                    <p className="text-sm text-gray-600 italic">
                      Investigación avanzada en microbiología antártica y procesos biotecnológicos sostenibles.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
