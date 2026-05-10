import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <h1 className="text-6xl font-bold text-[#0a4d3b] mb-4">404</h1>
      <p className="text-gray-600 mb-6">Página no encontrada</p>
      <Link href="/" className="bg-[#0a4d3b] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#1a7a5c] transition-colors">
        Volver al inicio
      </Link>
    </div>
  )
}
