'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useToast } from './Toast'
import {
  faUser, faEnvelope, faBuilding, faBriefcase,
  faPhone, faSpinner, faExclamationCircle,
  faCalendarAlt, faIdCard, faGlobeAmericas, faCity, faGraduationCap
} from '@fortawesome/free-solid-svg-icons'
import Select from 'react-select'

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/
const phoneRegex = /^\+?\d{6,15}$/
const dniRegex = /^\d{8}$/
const ceRegex = /^[a-zA-Z0-9]{6,20}$/
const pasaporteRegex = /^[a-zA-Z0-9]{5,15}$/
const cicloRegex = /^[IVXLCDM]+$/i

interface ValidationErrors {
  [key: string]: string | undefined
  nombres?: string
  apellidos?: string
  email?: string
  fecha_nacimiento?: string
  tipo_documento?: string
  numero_documento?: string
  celular?: string
}

export default function RegistrationForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [apiError, setApiError] = useState('')
  const [tipoDoc, setTipoDoc] = useState('')
  const [paises, setPaises] = useState<{ code: string; name: string; dial: string }[]>([])
  const [selectedPais, setSelectedPais] = useState('')
  const [dialCode, setDialCode] = useState('')

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2')
      .then(r => r.json())
      .then((data: { name: { common: string }; idd: { root?: string; suffixes?: string[] }; cca2: string }[]) => {
        const list = data
          .filter(c => c.cca2 && c.name?.common)
          .map(c => ({
            code: c.cca2,
            name: c.name.common,
            dial: c.idd?.root && c.idd?.suffixes?.[0] ? `${c.idd.root}${c.idd.suffixes[0]}` : '',
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
        setPaises(list)
      })
      .catch(() => {})
  }, [])

  function validateValues(vals: Record<string, string>): ValidationErrors {
    const e: ValidationErrors = {}
    const nombres = vals.nombres?.trim()
    const apellidos = vals.apellidos?.trim()
    const email = vals.email?.trim()
    const fechaNac = vals.fecha_nacimiento
    const tipoDoc = vals.tipo_documento
    const numDoc = vals.numero_documento?.trim()
    const celular = vals.celular?.trim()
    const ciudad = vals.ciudad?.trim()
    const pais = vals.pais?.trim()
    const institucion = vals.institucion?.trim()
    const ciclo = vals.ciclo?.trim()
    const profesion = vals.profesion?.trim()

    if (!nombres) e.nombres = 'Los nombres son obligatorios'
    else if (nombres.length < 2) e.nombres = 'Debe tener al menos 2 caracteres'
    else if (!nameRegex.test(nombres)) e.nombres = 'Solo letras y espacios'

    if (!apellidos) e.apellidos = 'Los apellidos son obligatorios'
    else if (apellidos.length < 2) e.apellidos = 'Debe tener al menos 2 caracteres'
    else if (!nameRegex.test(apellidos)) e.apellidos = 'Solo letras y espacios'

    if (!email) e.email = 'El email es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email inválido'
    else if (email.length > 200) e.email = 'Email muy largo'

    if (fechaNac) {
      const date = new Date(fechaNac)
      const today = new Date()
      const age = today.getFullYear() - date.getFullYear()
      if (isNaN(date.getTime())) e.fecha_nacimiento = 'Fecha inválida'
      else if (date >= today) e.fecha_nacimiento = 'Debe ser una fecha pasada'
      else if (age < 10) e.fecha_nacimiento = 'Debes tener al menos 10 años'
      else if (age > 120) e.fecha_nacimiento = 'Fecha no válida'
    }

    if (tipoDoc) {
      if (!numDoc) e.numero_documento = 'Número de documento obligatorio'
      else if (tipoDoc === 'DNI' && !dniRegex.test(numDoc)) e.numero_documento = 'DNI debe tener exactamente 8 dígitos'
      else if (tipoDoc === 'Carnet de Extranjería' && !ceRegex.test(numDoc)) e.numero_documento = 'Formato inválido (6-20 caracteres alfanuméricos)'
      else if (tipoDoc === 'Pasaporte' && !pasaporteRegex.test(numDoc)) e.numero_documento = 'Formato inválido (5-15 caracteres alfanuméricos)'
    }

    if (celular && !phoneRegex.test(celular)) e.celular = 'Formato inválido (Ej: +51999999999)'

    if (ciudad && ciudad.length < 2) e.ciudad = 'Debe tener al menos 2 caracteres'
    if (pais && pais.length < 2) e.pais = 'Debe tener al menos 2 caracteres'
    if (institucion && institucion.length < 2) e.institucion = 'Debe tener al menos 2 caracteres'
    if (ciclo && !cicloRegex.test(ciclo)) e.ciclo = 'Formato inválido (Ej: VII, IV, X)'
    if (profesion && profesion.length < 3) e.profesion = 'Debe tener al menos 3 caracteres'

    return e
  }

  function validateField(name: string, vals: Record<string, string>): string | undefined {
    return validateValues(vals)[name]
  }

  function getFormValues(form: FormData): Record<string, string> {
    const vals: Record<string, string> = {}
    for (const [key, val] of form.entries()) {
      vals[key] = val as string
    }
    if (dialCode && vals.celular) {
      vals.celular = dialCode + vals.celular
    }
    return vals
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target
    if (touched.has(name)) {
      const form = e.currentTarget.form
      if (form) {
        const vals = getFormValues(new FormData(form))
        const err = validateField(name, vals)
        setErrors(prev => err ? { ...prev, [name]: err } : { ...prev, [name]: undefined })
      }
    }
  }

  function handleBlur(e: React.ChangeEvent<HTMLInputElement>) {
    const { name } = e.target
    setTouched(prev => new Set(prev).add(name))
    const form = e.currentTarget.form
    if (form) {
      const vals = getFormValues(new FormData(form))
      const err = validateField(name, vals)
      setErrors(prev => err ? { ...prev, [name]: err } : { ...prev, [name]: undefined })
    }
  }

  async function handleSubmit(form: FormData) {
    const vals = getFormValues(form)
    const allTouched = new Set(['nombres', 'apellidos', 'email', 'fecha_nacimiento', 'tipo_documento', 'numero_documento', 'celular', 'ciudad', 'pais', 'institucion', 'ciclo', 'profesion'])
    setTouched(allTouched)
    const validationErrors = validateValues(vals)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)
    setApiError('')

    try {
      const sanitized: Record<string, string> = {}
      for (const [key, val] of form.entries()) {
        const v = (val as string).trim()
        if (v) sanitized[key] = v
      }

      const res = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitized),
      })

      const data = await res.json()

      if (!data.success) {
        toast(data.message || 'Error al registrar', 'error')
        setApiError(data.message || 'Error al registrar')
        return
      }

      toast('¡Registro exitoso! Revisa tu correo con los detalles.')
      router.push(
        `/registro/success?codigo=${data.data.codigo_certificado}&nombre=${encodeURIComponent(`${sanitized.nombres} ${sanitized.apellidos}`)}`
      )
    } catch {
      setApiError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  function docLabel() {
    if (tipoDoc === 'DNI') return 'N° de DNI'
    if (tipoDoc === 'Carnet de Extranjería') return 'N° de Carnet de Extranjería'
    if (tipoDoc === 'Pasaporte') return 'N° de Pasaporte'
    return 'N° de documento'
  }

  function docPlaceholder() {
    if (tipoDoc === 'DNI') return '12345678'
    if (tipoDoc === 'Carnet de Extranjería') return 'CE-123456'
    if (tipoDoc === 'Pasaporte') return 'AB123456'
    return 'N° de DNI, carnet o pasaporte'
  }

  function handleTipoDocChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTipoDoc(e.target.value)
    setErrors((prev) => {
      const next = { ...prev }
      delete next.numero_documento
      return next
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      <form action={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombres" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
              <FontAwesomeIcon icon={faUser} className="mr-1.5 text-[#1a7a5c]" /> Nombres <span className="text-red-500">*</span>
            </label>
            <input id="nombres" name="nombres" type="text" required maxLength={100}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.nombres ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
              placeholder="Tus nombres" onChange={handleChange} onBlur={handleBlur} />
            {errors.nombres && <p className="text-red-500 text-xs mt-1">{errors.nombres}</p>}
          </div>
          <div>
            <label htmlFor="apellidos" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
              <FontAwesomeIcon icon={faUser} className="mr-1.5 text-[#1a7a5c]" /> Apellidos <span className="text-red-500">*</span>
            </label>
            <input id="apellidos" name="apellidos" type="text" required maxLength={100}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.apellidos ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
              placeholder="Tus apellidos" onChange={handleChange} onBlur={handleBlur} />
            {errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fecha_nacimiento" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-1.5 text-[#1a7a5c]" /> Fecha de nacimiento
            </label>
            <input id="fecha_nacimiento" name="fecha_nacimiento" type="date" max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.fecha_nacimiento ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`} onChange={handleChange} onBlur={handleBlur} />
            {errors.fecha_nacimiento && <p className="text-red-500 text-xs mt-1">{errors.fecha_nacimiento}</p>}
          </div>
          <div>
            <label htmlFor="tipo_documento" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
              <FontAwesomeIcon icon={faIdCard} className="mr-1.5 text-[#1a7a5c]" /> Tipo de documento
            </label>
            <select id="tipo_documento" name="tipo_documento" value={tipoDoc} onChange={handleTipoDocChange}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#1a7a5c] focus:outline-none transition-colors bg-white">
              <option value="">Selecciona...</option>
              <option value="DNI">DNI</option>
              <option value="Carnet de Extranjería">Carnet de Extranjería</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="numero_documento" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
            <FontAwesomeIcon icon={faIdCard} className="mr-1.5 text-[#1a7a5c]" /> {docLabel()}
          </label>
          <input id="numero_documento" name="numero_documento" type="text" maxLength={20}
            className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.numero_documento ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
            placeholder={docPlaceholder()} onChange={handleChange} onBlur={handleBlur} />
          {errors.numero_documento && <p className="text-red-500 text-xs mt-1">{errors.numero_documento}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ciudad" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
              <FontAwesomeIcon icon={faCity} className="mr-1.5 text-[#1a7a5c]" /> Ciudad
            </label>
            <input id="ciudad" name="ciudad" type="text" maxLength={200}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.ciudad ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
              placeholder="Tu ciudad" onChange={handleChange} onBlur={handleBlur} />
            {errors.ciudad && <p className="text-red-500 text-xs mt-1">{errors.ciudad}</p>}
          </div>
          <div>
            <label htmlFor="pais" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
              <FontAwesomeIcon icon={faGlobeAmericas} className="mr-1.5 text-[#1a7a5c]" /> País
            </label>
            <Select
              instanceId="pais-select"
              inputId="pais"
              placeholder="Busca y selecciona un país..."
              isClearable
              options={paises.map(p => ({ value: p.code, label: p.name }))}
              value={selectedPais ? { value: selectedPais, label: paises.find(p => p.code === selectedPais)?.name || selectedPais } : null}
              formatOptionLabel={(option) => (
                <span className="inline-flex items-center gap-2">
                  <img src={`https://flagsapi.com/${option.value}/flat/24.png`} alt="" className="w-5 h-auto inline-block flex-shrink-0" />
                  {option.label}
                </span>
              )}
              onChange={(opt) => {
                const code = opt?.value || ''
                setSelectedPais(code)
                const pais = paises.find(p => p.code === code)
                setDialCode(pais?.dial || '')
              }}
              className="text-sm"
              classNames={{
                control: (state) =>
                  `!border-2 !rounded-lg !shadow-none !cursor-pointer !h-[44px] !min-h-[44px] transition-colors ${
                    state.isFocused ? '!border-[#1a7a5c]' : '!border-gray-200'
                  }`,
                valueContainer: () => '!py-0 !px-3',
                menu: () => '!text-sm !rounded-lg !shadow-lg !border !border-gray-100 !mt-1',
                option: (state) =>
                  `${state.isFocused ? '!bg-[#e8f5e9]' : ''} ${state.isSelected ? '!bg-[#1a7a5c] !text-white' : ''} !cursor-pointer`,
                placeholder: () => '!text-gray-400',
                input: () => '!text-sm',
                singleValue: () => '!text-gray-700',
              }}
              noOptionsMessage={() => 'País no encontrado'}
            />
            <input type="hidden" name="pais" value={selectedPais ? (paises.find(p => p.code === selectedPais)?.name || selectedPais) : ''} />
            {errors.pais && <p className="text-red-500 text-xs mt-1">{errors.pais}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
            <FontAwesomeIcon icon={faEnvelope} className="mr-1.5 text-[#1a7a5c]" /> Correo electrónico <span className="text-red-500">*</span>
          </label>
          <input id="email" name="email" type="email" required maxLength={200}
            className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
            placeholder="correo@ejemplo.com" onChange={handleChange} onBlur={handleBlur} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="celular" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
            <FontAwesomeIcon icon={faPhone} className="mr-1.5 text-[#1a7a5c]" /> Número de celular
          </label>
          <div className="flex">
            {dialCode && (
              <span className={`inline-flex items-center px-3 border-2 border-r-0 rounded-l-lg bg-gray-50 text-gray-600 font-medium text-sm ${errors.celular ? 'border-red-400' : 'border-gray-200'}`}>
                {dialCode}
              </span>
            )}
            <input id="celular" name="celular" type="tel" maxLength={15}
              className={`flex-1 min-w-0 px-4 py-2.5 border-2 focus:outline-none transition-colors ${dialCode ? 'rounded-r-lg rounded-l-none' : 'rounded-lg'} ${errors.celular ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
              placeholder={dialCode ? '999 999 999' : '+51 999 999 999'} onChange={handleChange} onBlur={handleBlur} />
          </div>
          {errors.celular && <p className="text-red-500 text-xs mt-1">{errors.celular}</p>}
        </div>

        <div>
          <label htmlFor="institucion" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
            <FontAwesomeIcon icon={faBuilding} className="mr-1.5 text-[#1a7a5c]" /> Instituto / Universidad / Empresa
          </label>
          <input id="institucion" name="institucion" type="text" maxLength={200}
            className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.institucion ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
            placeholder="Donde laboras o estudias" />
          {errors.institucion && <p className="text-red-500 text-xs mt-1">{errors.institucion}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ciclo" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-1.5 text-[#1a7a5c]" /> Ciclo (si aplica)
            </label>
            <input id="ciclo" name="ciclo" type="text" maxLength={10}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.ciclo ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
              placeholder="Ej: VII" />
            {errors.ciclo && <p className="text-red-500 text-xs mt-1">{errors.ciclo}</p>}
          </div>
          <div>
            <label htmlFor="profesion" className="block text-sm font-semibold text-[#0a4d3b] mb-1">
              <FontAwesomeIcon icon={faBriefcase} className="mr-1.5 text-[#1a7a5c]" /> Profesión / Carrera
            </label>
            <input id="profesion" name="profesion" type="text" maxLength={200}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none transition-colors ${errors.profesion ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#1a7a5c]'}`}
              placeholder="Tu profesión o carrera" />
            {errors.profesion && <p className="text-red-500 text-xs mt-1">{errors.profesion}</p>}
          </div>
        </div>

        {apiError && (
          <div className="bg-yellow-50 border-l-4 border-red-500 p-3 rounded text-sm text-red-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" /> {apiError}
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full bg-[#0a4d3b] hover:bg-[#1a7a5c] disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all hover:-translate-y-0.5">
          {loading ? <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" />Registrando...</> : 'Registrarme'}
        </button>
      </form>
    </div>
  )
}
