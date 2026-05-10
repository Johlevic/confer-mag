import { NextResponse } from 'next/server'
import { obtenerStats } from '@/lib/db'

export async function GET() {
  const stats = await obtenerStats()
  return NextResponse.json({ success: true, data: stats })
}
