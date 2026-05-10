import { NextResponse } from 'next/server'
import { z } from 'zod'
import { ensureSchema, registrarAsistente } from '@/lib/db'
import { sendConfirmationEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/
const phoneRegex = /^\+?\d{6,15}$/

const schema = z.object({
  nombres: z
    .string().min(2, 'Los nombres deben tener al menos 2 caracteres').max(100)
    .regex(nameRegex, 'Solo letras y espacios en nombres'),
  apellidos: z
    .string().min(2, 'Los apellidos deben tener al menos 2 caracteres').max(100)
    .regex(nameRegex, 'Solo letras y espacios en apellidos'),
  email: z.string().email('Email inválido').max(200),
  fecha_nacimiento: z.string().optional(),
  tipo_documento: z.enum(['DNI', 'Carnet de Extranjería', 'Pasaporte']).optional(),
  numero_documento: z.string().max(20).optional(),
  ciudad: z.string().max(200).optional(),
  pais: z.string().max(200).optional(),
  celular: z.string().max(15).regex(phoneRegex, 'Formato de celular inválido').optional().or(z.literal('')),
  institucion: z.string().max(200).optional(),
  ciclo: z.string().max(10).optional(),
  profesion: z.string().max(200).optional(),
}).refine((data) => {
  if (data.tipo_documento && !data.numero_documento) return false
  if (data.tipo_documento === 'DNI' && data.numero_documento && !/^\d{8}$/.test(data.numero_documento)) return false
  if (data.tipo_documento === 'Carnet de Extranjería' && data.numero_documento && !/^[a-zA-Z0-9]{6,20}$/.test(data.numero_documento)) return false
  if (data.tipo_documento === 'Pasaporte' && data.numero_documento && !/^[a-zA-Z0-9]{5,15}$/.test(data.numero_documento)) return false
  return true
}, {
  message: 'Número de documento inválido para el tipo seleccionado',
  path: ['numero_documento'],
})

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = rateLimit(`registro:${ip}`, 5, 60000)
    if (!rl.allowed) {
      return NextResponse.json({ success: false, message: 'Demasiadas solicitudes. Intenta en 1 minuto.' }, { status: 429 })
    }

    await ensureSchema()

    const body = await request.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]
      return NextResponse.json(
        { success: false, message: firstIssue?.message || 'Datos inválidos' },
        { status: 400 }
      )
    }

    const asistente = await registrarAsistente(parsed.data)

    sendConfirmationEmail(parsed.data.email, parsed.data.nombres, asistente.codigo_certificado).catch(() => {})

    return NextResponse.json({ success: true, data: asistente })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno del servidor'
    const status = message.includes('ya está registrado') ? 409 : 500
    return NextResponse.json({ success: false, message }, { status })
  }
}
