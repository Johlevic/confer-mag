import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'
import type { Asistente, Stats } from './types'

export async function ensureSchema() {
  await sql`
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS apellidos VARCHAR(200);
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS fecha_nacimiento DATE;
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS tipo_documento VARCHAR(50);
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS numero_documento VARCHAR(50);
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS ciudad VARCHAR(200);
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS pais VARCHAR(200);
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS celular VARCHAR(50);
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS ciclo VARCHAR(50);
    ALTER TABLE asistentes ADD COLUMN IF NOT EXISTS profesion VARCHAR(200);
  `
}

export async function registrarAsistente(data: {
  nombres: string
  apellidos: string
  email: string
  fecha_nacimiento?: string
  tipo_documento?: string
  numero_documento?: string
  ciudad?: string
  pais?: string
  celular?: string
  institucion?: string
  ciclo?: string
  profesion?: string
}): Promise<Asistente> {
  const existente = await sql`SELECT * FROM asistentes WHERE email = ${data.email}`
  if (existente.rows.length > 0) {
    throw new Error('El email ya está registrado')
  }

  const codigo = uuidv4().slice(0, 8).toUpperCase()
  const nombreCompleto = `${data.nombres} ${data.apellidos}`.trim()

  const result = await sql`
    INSERT INTO asistentes (
      nombre, apellidos, email, fecha_nacimiento,
      tipo_documento, numero_documento, ciudad, pais,
      celular, institucion, ciclo, profesion, codigo_certificado
    ) VALUES (
      ${nombreCompleto}, ${data.apellidos}, ${data.email}, ${data.fecha_nacimiento || null},
      ${data.tipo_documento || null}, ${data.numero_documento || null}, ${data.ciudad || null}, ${data.pais || null},
      ${data.celular || null}, ${data.institucion || null}, ${data.ciclo || null}, ${data.profesion || null}, ${codigo}
    )
    RETURNING *
  `

  return result.rows[0] as unknown as Asistente
}

export async function obtenerAsistentes(q?: string): Promise<Asistente[]> {
  if (q) {
    const result = await sql`
      SELECT * FROM asistentes
      WHERE nombre ILIKE ${'%' + q + '%'}
         OR apellidos ILIKE ${'%' + q + '%'}
         OR email ILIKE ${'%' + q + '%'}
      ORDER BY fecha_registro DESC
    `
    return result.rows as unknown as Asistente[]
  }

  const result = await sql`SELECT * FROM asistentes ORDER BY fecha_registro DESC`
  return result.rows as unknown as Asistente[]
}

export async function buscarPorCodigo(codigo: string): Promise<Asistente | null> {
  const result = await sql`SELECT * FROM asistentes WHERE codigo_certificado = ${codigo}`
  return (result.rows[0] as unknown as Asistente) || null
}

export async function emitirCertificado(id: number): Promise<void> {
  await sql`UPDATE asistentes SET certificado_emitido = true WHERE id = ${id}`
}

export async function obtenerStats(): Promise<Stats> {
  const total = await sql`SELECT COUNT(*) as count FROM asistentes`
  const hoy = await sql`SELECT COUNT(*) as count FROM asistentes WHERE DATE(fecha_registro) = CURRENT_DATE`
  const emitidos = await sql`SELECT COUNT(*) as count FROM asistentes WHERE certificado_emitido = true`

  return {
    total: Number(total.rows[0].count),
    registros_hoy: Number(hoy.rows[0].count),
    certificados_emitidos: Number(emitidos.rows[0].count),
  }
}
