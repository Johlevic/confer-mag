import { NextRequest, NextResponse } from 'next/server'
import { obtenerAsistentes } from '@/lib/db'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || undefined
  const asistentes = await obtenerAsistentes(q)
  return NextResponse.json({ success: true, data: asistentes })
}
