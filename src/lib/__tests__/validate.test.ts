import { describe, it, expect } from 'vitest'

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/
const dniRegex = /^\d{8}$/
const ceRegex = /^[a-zA-Z0-9]{6,20}$/
const phoneRegex = /^\+?\d{6,15}$/
const cicloRegex = /^[IVXLCDM]+$/i

describe('nameRegex', () => {
  it('accepts valid names', () => {
    expect(nameRegex.test('Marcos Xavier')).toBe(true)
    expect(nameRegex.test('María José')).toBe(true)
    expect(nameRegex.test('José Luis Martínez')).toBe(true)
  })

  it('rejects names with numbers', () => {
    expect(nameRegex.test('Marcos123')).toBe(false)
  })

  it('rejects names with special characters', () => {
    expect(nameRegex.test('Marcos@Xavier')).toBe(false)
  })
})

describe('dniRegex', () => {
  it('accepts 8-digit DNI', () => {
    expect(dniRegex.test('12345678')).toBe(true)
  })

  it('rejects DNI with less than 8 digits', () => {
    expect(dniRegex.test('1234567')).toBe(false)
  })

  it('rejects DNI with letters', () => {
    expect(dniRegex.test('1234567A')).toBe(false)
  })
})

describe('ceRegex', () => {
  it('accepts valid Carnet de Extranjería', () => {
    expect(ceRegex.test('CE123456')).toBe(true)
    expect(ceRegex.test('ABC123')).toBe(true)
  })

  it('rejects too short CE', () => {
    expect(ceRegex.test('AB12')).toBe(false)
  })

  it('rejects CE with special characters', () => {
    expect(ceRegex.test('CE-12345')).toBe(false)
  })
})

describe('phoneRegex', () => {
  it('accepts phone with + prefix', () => {
    expect(phoneRegex.test('+51999999999')).toBe(true)
  })

  it('accepts phone without prefix', () => {
    expect(phoneRegex.test('51999999999')).toBe(true)
  })

  it('rejects phone with letters', () => {
    expect(phoneRegex.test('+51999999A99')).toBe(false)
  })

  it('rejects too short phone', () => {
    expect(phoneRegex.test('+51123')).toBe(false)
  })
})

describe('cicloRegex', () => {
  it('accepts Roman numerals', () => {
    expect(cicloRegex.test('VII')).toBe(true)
    expect(cicloRegex.test('IV')).toBe(true)
    expect(cicloRegex.test('X')).toBe(true)
  })

  it('rejects non-Roman input', () => {
    expect(cicloRegex.test('7')).toBe(false)
    expect(cicloRegex.test('Septimo')).toBe(false)
  })
})
