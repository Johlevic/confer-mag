'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCertificate, faSpinner, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import type { Asistente } from '@/lib/types'

export default function AsistentesTable() {
  const [asistentes, setAsistentes] = useState<Asistente[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const params = q ? `?q=${encodeURIComponent(q)}` : ''
      const res = await fetch(`/api/asistentes${params}`)
      const data = await res.json()
      setAsistentes(data.data || [])
    } catch {
      setAsistentes([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchData(query), 300)
    return () => clearTimeout(timer)
  }, [query, fetchData])

  return (
    <div>
      <div className="relative mb-4">
        <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#1a7a5c] focus:outline-none transition-colors"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0a4d3b] text-white">
                <th className="px-4 py-3 text-left font-semibold">Nombres</th>
                <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Apellidos</th>
                <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Código</th>
                <th className="px-4 py-3 text-center font-semibold">Certificado</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />Cargando...
                  </td>
                </tr>
              ) : asistentes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400">
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />No hay asistentes registrados.
                  </td>
                </tr>
              ) : (
                asistentes.map((a) => (
                  <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium">{a.nombre}</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{a.apellidos || '-'}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{a.email}</td>
                    <td className="px-4 py-3 font-mono text-xs">{a.codigo_certificado}</td>
                    <td className="px-4 py-3 text-center">
                      {a.certificado_emitido ? (
                        <Link
                          href={`/certificado/${a.codigo_certificado}`}
                          className="inline-block bg-[#1a7a5c] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#0a4d3b] transition-colors"
                        >
                          <FontAwesomeIcon icon={faCertificate} className="mr-1" /> Ver <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px]" />
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-xs">Pendiente</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
