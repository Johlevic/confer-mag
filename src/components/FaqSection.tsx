'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FAQ } from '@/lib/constants'
import FadeIn from './FadeIn'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(i: number) {
    setOpenIndex(prev => prev === i ? null : i)
  }

  return (
    <section className="py-16 bg-white">
      <FadeIn>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0a4d3b] mb-10">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2 text-[#c9a84c]" />
            Preguntas Frecuentes
          </h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-[#0a4d3b] hover:bg-[#e8f5e9] transition-colors"
                >
                  <span>{item.q}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-[#c9a84c] text-xs transition-transform duration-200 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
