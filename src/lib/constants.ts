export const EVENTO = {
  titulo: 'Efecto de microorganismos psicrófilos de rizosfera de plantas avasculares antárticas en la solubilización de fosfatos de laboratorio e invernadero',
  tituloCorto: 'Conferencia Magistral',
  ponente: 'Dr. Marcos Xavier Vera Morales',
  fecha: 'Jueves 14 de mayo de 2026',
  horario: '7:00 PM - 10:00 PM',
  plataforma: 'Google Meet',
  fechaISO: '2026-05-14T19:00:00',
  year: 2026,
} as const

export const PONENTE = {
  fullName: 'Dr. Marcos Xavier Vera Morales',
  origen: 'Ecuatoriano',
  grado: 'Biólogo',
  doctorado: 'Doctor en Microbiología - Universidad Nacional de Trujillo (Perú)',
  maestria: 'Maestría en Tecnología e Innovación Educativa - ESPOL',
  investigacion: [
    'Analista de Laboratorio e Investigador en el CIBE-ESPOL (Centro de Investigaciones Biotecnológicas del Ecuador)',
    'Investigador Auxiliar acreditado por SENESCYT',
  ],
  docencia: 'Profesor e Investigador en la Universidad Politécnica Salesiana (Ecuador)',
  universidades: [
    { nombre: 'UNT', logo: '/img/logo-unt-icono.png', pais: 'Perú', vinculo: 'Doctorado' },
    { nombre: 'ESPOL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/ESPOL_-_Logo_001.svg/960px-ESPOL_-_Logo_001.svg.png', pais: 'Ecuador', vinculo: 'Maestría / Inv.' },
    { nombre: 'UPS', logo: 'https://www.ups.edu.ec/documents/20121/77326/Isotipo+Original.png/48fb2ada-b4e7-09df-b45a-884cda62cc9b?version=1.0&t=1620746533255&imagePreview=1', pais: 'Ecuador', vinculo: 'Docencia' },
  ],
  lineas: [
    'Microbiología del Suelo',
    'Fitopatología',
    'Biorremediación y Control Biológico',
    'Interacciones Ecológicas',
  ],
} as const

export const CURSO = {
  nombre: 'Biotecnología',
  area: 'Ciencias de la Vida y la Salud',
  facultad: 'Ciencias Biológicas',
  departamento: 'Ciencias Biológicas',
  programa: 'Ciencias Biológicas',
  sede: 'Trujillo',
  semestre: '2026-I',
  ciclo: 'VII',
} as const

export const ORGANIZADORES = [
  {
    condicion: 'Coordinador',
    nombres: 'Dr. Segundo Eloy López Medina',
    profesion: 'Biólogo',
    email: 'slopezm@unitru.edu.pe',
    foto: '/img/coordinador.png',
  },
  {
    condicion: 'Docente',
    nombres: 'Dr. Julio Chico Ruíz',
    profesion: 'Biólogo',
    email: 'jchico@unitru.edu.pe',
    foto: '/img/julio-chico.png',
  },
  {
    condicion: 'Docente',
    nombres: 'Dr. Roger Veneros Terrones',
    profesion: 'Biólogo',
    email: 'rveneros@unitru.edu.pe',
  },
  {
    condicion: 'Docente',
    nombres: 'Dr. Armando Efraín Gil Rivero',
    profesion: 'Biólogo',
    email: 'arivero@unitru.edu.pe',
    foto: '/img/efrain-gil.png',
  },
  {
    condicion: 'Estudiante',
    nombres: 'Maria Fernanda López Castillo',
    email: 'mlopez@unitru.edu.pe',
  },
  {
    condicion: 'Estudiante',
    nombres: 'Carlos Andrés Mendoza Vega',
    email: 'cmendoza@unitru.edu.pe',
  },
  {
    condicion: 'Estudiante',
    nombres: 'Valeria Alexandra Torres Paredes',
    email: 'vtorres@unitru.edu.pe',
  },
  {
    condicion: 'Estudiante',
    nombres: 'Jorge Luis Ramírez Silva',
    email: 'jramirez@unitru.edu.pe',
  },
] as const

export const AGENDA = [
  { hora: '7:00 PM', titulo: 'Bienvenida e introducción', desc: 'Palabras del coordinador y presentación del ponente' },
  { hora: '7:15 PM', titulo: 'Conferencia magistral', desc: 'Efecto de microorganismos psicrófilos en la solubilización de fosfatos' },
  { hora: '8:45 PM', titulo: 'Ronda de preguntas', desc: 'Espacio interactivo para resolver dudas de los asistentes' },
  { hora: '9:30 PM', titulo: 'Cierre', desc: 'Conclusiones y detalles sobre la entrega de certificados' },
] as const

export const APP_NAME = `Biotecnología - UNT`
export const ORG_NAME = 'Universidad Nacional de Trujillo'

export const FAQ = [
  { q: '¿El evento es gratuito?', a: 'Sí, la conferencia es completamente gratuita. Solo debes registrarte para recibir el enlace de Google Meet.' },
  { q: '¿Cuándo recibiré el certificado?', a: 'El certificado digital se emite después de asistir al evento. Al finalizar la conferencia recibirás un enlace para descargarlo.' },
  { q: '¿Habrá grabación?', a: 'Sí, la conferencia será grabada y compartida con los asistentes registrados unos días después del evento.' },
  { q: '¿Cómo accedo a Google Meet?', a: 'Al registrarte recibirás el enlace en la página de confirmación y también una copia en tu correo electrónico.' },
  { q: '¿El certificado tiene validez curricular?', a: 'Sí, el certificado emitido por la Facultad de Ciencias Biológicas de la UNT tiene validez curricular.' },
  { q: '¿Puedo participar si no soy de la UNT?', a: 'Sí, el evento está abierto al público en general. Estudiantes, docentes e investigadores de cualquier institución pueden participar.' },
] as const

export const CONTACTO = {
  email: 'fccbb@unitru.edu.pe',
  whatsapp: '51999999999',
  whatsappLink: 'https://chat.whatsapp.com/GRUPO_CIENCIAS_Biologicas',
  facebook: 'https://www.facebook.com/FacultadCienciasBiologicasUNT',
  instagram: 'https://www.instagram.com/facienbiologicasunt',
  youtube: 'https://www.youtube.com/@facultadcienciasbiologicas',
} as const
