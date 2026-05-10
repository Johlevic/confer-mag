# Conferencia Magistral - Biotecnología UNT

Sistema de registro y certificados para la conferencia magistral del curso de Biotecnología de la Facultad de Ciencias Biológicas - Universidad Nacional de Trujillo.

## Tecnologías

- **Framework:** Next.js 16 (App Router)
- **Base de datos:** PostgreSQL (Vercel Postgres)
- **Estilos:** Tailwind CSS 4
- **Validación:** Zod
- **Email:** Nodemailer (Gmail SMTP)
- **Tests:** Vitest

## Características

- Registro de asistentes con validación en tiempo real
- Generación automática de certificados digitales
- Panel de administración con búsqueda y exportación CSV
- Diseño responsive con menú adaptable
- Notificaciones toast
- SEO / Open Graph / PWA
- Rate limiting en API

## Variables de entorno

Copiar `.env.local`:

```bash
DATABASE_URL="postgres://..."
ADMIN_PASSWORD="admin123"
MEET_LINK="https://meet.google.com/..."
SITE_URL="http://localhost:3000"

# Email (opcional)
# SMTP_HOST="smtp.gmail.com"
# SMTP_USER="tu-correo@gmail.com"
# SMTP_PASS="xxxx xxxx xxxx xxxx"
```

## Inicio rápido

```bash
npm install
npm run dev
```

## Tests

```bash
npm run test
```

## Build

```bash
npm run build
```

