'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserPlus, faCertificate, faDownload, faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
import type { Asistente, Stats } from '@/lib/types'

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [asistentes, setAsistentes] = useState<Asistente[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/stats').then(r => r.json()),
      fetch('/api/asistentes').then(r => r.json()),
    ]).then(([s, a]) => {
      setStats(s.data)
      setAsistentes(a.data || [])
    }).finally(() => setLoading(false))
  }, [])

  function exportCSV() {
    const headers = ['Nombres,Apellidos,Email,F.Nacimiento,Tipo Doc,N° Doc,Ciudad,País,Celular,Institución,Ciclo,Profesión,Código,Fecha,Certificado']
    const rows = asistentes.map(a =>
      `"${a.nombre}","${a.apellidos || ''}","${a.email}","${a.fecha_nacimiento || ''}","${a.tipo_documento || ''}","${a.numero_documento || ''}","${a.ciudad || ''}","${a.pais || ''}","${a.celular || ''}","${a.institucion || ''}","${a.ciclo || ''}","${a.profesion || ''}",${a.codigo_certificado},${a.fecha_registro},${a.certificado_emitido ? 'Sí' : 'No'}`
    )
    const csv = [...headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `asistentes-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <div className="text-center py-12 text-gray-400"><FontAwesomeIcon icon={faSpinner} spin className="mr-2" />Cargando...</div>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#0a4d3b]"><FontAwesomeIcon icon={faUsers} className="mr-2 text-[#1a7a5c]" />Dashboard</h2>
        <button
          onClick={exportCSV}
          className="bg-[#0a4d3b] hover:bg-[#1a7a5c] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faDownload} /> Exportar CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="mb-2"><FontAwesomeIcon icon={faUsers} className="text-3xl text-[#0a4d3b]" /></div>
          <div className="text-4xl font-bold text-[#0a4d3b]">{stats?.total ?? 0}</div>
          <div className="text-gray-500 text-sm mt-1">Total Registrados</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="mb-2"><FontAwesomeIcon icon={faUserPlus} className="text-3xl text-[#1a7a5c]" /></div>
          <div className="text-4xl font-bold text-[#1a7a5c]">{stats?.registros_hoy ?? 0}</div>
          <div className="text-gray-500 text-sm mt-1">Registros Hoy</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="mb-2"><FontAwesomeIcon icon={faCertificate} className="text-3xl text-[#c9a84c]" /></div>
          <div className="text-4xl font-bold text-[#c9a84c]">{stats?.certificados_emitidos ?? 0}</div>
          <div className="text-gray-500 text-sm mt-1">Certificados Emitidos</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0a4d3b] text-white">
                <th className="px-4 py-3 text-left">Nombres</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Apellidos</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Email</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Doc.</th>
                <th className="px-4 py-3 text-left">Código</th>
                <th className="px-4 py-3 text-center hidden lg:table-cell">Fecha</th>
                <th className="px-4 py-3 text-center">Emitido</th>
              </tr>
            </thead>
            <tbody>
              {asistentes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                    No hay registros.
                  </td>
                </tr>
              ) : (
                asistentes.map((a) => (
                  <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{a.nombre}</td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{a.apellidos || '-'}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{a.email}</td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell text-xs">{a.tipo_documento || '-'}</td>
                    <td className="px-4 py-3 font-mono text-xs">{a.codigo_certificado}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">
                      {new Date(a.fecha_registro).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {a.certificado_emitido ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
                          <FontAwesomeIcon icon={faCheck} /> Sí
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs">
                          <FontAwesomeIcon icon={faTimes} /> No
                        </span>
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
