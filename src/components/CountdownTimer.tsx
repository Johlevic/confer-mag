'use client'

import { useState, useEffect, useRef } from 'react'

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

export default function CountdownTimer({ targetDate, onExpired }: { targetDate: string; onExpired?: () => void }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const notified = useRef(false)

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 }
      return {
        dias: Math.floor(diff / 86400000),
        horas: Math.floor((diff % 86400000) / 3600000),
        minutos: Math.floor((diff % 3600000) / 60000),
        segundos: Math.floor((diff % 60000) / 1000),
      }
    }

    setTimeLeft(calc())
    const id = setInterval(() => {
      const t = calc()
      setTimeLeft(t)
      if (t.dias === 0 && t.horas === 0 && t.minutos === 0 && t.segundos === 0 && !notified.current) {
        notified.current = true
        onExpired?.()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate, onExpired])

  if (!timeLeft) return null

  const expired = timeLeft.dias === 0 && timeLeft.horas === 0 && timeLeft.minutos === 0 && timeLeft.segundos === 0

  return (
    <div className="text-center">
      <p className="text-white/80 text-sm uppercase tracking-widest mb-3">
        {expired ? 'El evento ha comenzado' : 'Tiempo restante'}
      </p>
      <div className="flex justify-center gap-3 md:gap-5">
        {[
          { label: 'Días', value: timeLeft.dias },
          { label: 'Horas', value: timeLeft.horas },
          { label: 'Minutos', value: timeLeft.minutos },
          { label: 'Segundos', value: timeLeft.segundos },
        ].map((item) => (
          <div key={item.label} className="bg-white/10 backdrop-blur rounded-lg px-3 py-2 md:px-5 md:py-3 min-w-[60px] md:min-w-[80px]">
            <div className="text-2xl md:text-3xl font-bold text-[#c9a84c]">
              {String(item.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs text-white/70 uppercase tracking-wider mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
