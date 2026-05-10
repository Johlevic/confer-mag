export interface Asistente {
  id: number
  nombre: string
  apellidos: string | null
  email: string
  fecha_nacimiento: string | null
  tipo_documento: string | null
  numero_documento: string | null
  ciudad: string | null
  pais: string | null
  celular: string | null
  institucion: string | null
  ciclo: string | null
  profesion: string | null
  codigo_certificado: string
  fecha_registro: string
  certificado_emitido: boolean
}

export interface Stats {
  total: number
  registros_hoy: number
  certificados_emitidos: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}
