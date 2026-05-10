import nodemailer from 'nodemailer'
import { EVENTO, CURSO } from './constants'

function createTransporter() {
  const host = process.env.SMTP_HOST
  if (!host) return null

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendConfirmationEmail(to: string, nombre: string, codigo: string) {
  const transporter = createTransporter()
  if (!transporter) return

  const meetLink = process.env.MEET_LINK || 'https://meet.google.com/aqt-tnxa-qwp'

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"${CURSO.nombre} UNT" <noreply@confer-mag.com>`,
    to,
    subject: `Confirmación de registro - ${EVENTO.tituloCorto}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin:0;padding:0;background:#f0f7f4;font-family:Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center" style="padding:40px 16px">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden">
                <tr>
                  <td style="background:#0a4d3b;padding:32px;text-align:center">
                    <h1 style="color:#fff;margin:0;font-size:22px">${EVENTO.tituloCorto}</h1>
                    <p style="color:#c9a84c;margin:8px 0 0;font-size:14px">${CURSO.nombre} · ${CURSO.facultad}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px">
                    <h2 style="color:#0a4d3b;font-size:18px;margin:0 0 16px">¡Hola, ${nombre}!</h2>
                    <p style="color:#555;font-size:14px;line-height:1.6;margin:0 0 20px">
                      Gracias por registrarte a la conferencia <strong>"${EVENTO.titulo}"</strong>
                      a cargo del <strong>${EVENTO.ponente}</strong>.
                    </p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#e8f5e9;border-radius:8px;margin-bottom:20px">
                      <tr>
                        <td style="padding:16px">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding:4px 0;color:#0a4d3b;font-size:13px"><strong>Fecha:</strong> ${EVENTO.fecha}</td>
                            </tr>
                            <tr>
                              <td style="padding:4px 0;color:#0a4d3b;font-size:13px"><strong>Horario:</strong> ${EVENTO.horario}</td>
                            </tr>
                            <tr>
                              <td style="padding:4px 0;color:#0a4d3b;font-size:13px"><strong>Plataforma:</strong> ${EVENTO.plataforma}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <a href="${meetLink}" target="_blank" style="display:inline-block;background:#1a7a5c;color:#fff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 28px;border-radius:8px;margin-bottom:20px">
                      Unirme a Google Meet
                    </a>

                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:8px;margin-bottom:20px">
                      <tr>
                        <td style="padding:16px;text-align:center">
                          <p style="margin:0 0 4px;color:#888;font-size:12px">Tu código de certificado</p>
                          <p style="margin:0;font-family:monospace;font-size:24px;font-weight:bold;color:#0a4d3b;letter-spacing:3px">${codigo}</p>
                        </td>
                      </tr>
                    </table>

                    <p style="color:#888;font-size:12px;line-height:1.5;margin:0">
                      Si tienes dudas, responde a este correo o escríbenos a
                      <a href="mailto:${process.env.CONTACT_EMAIL || 'fccbb@unitru.edu.pe'}" style="color:#1a7a5c">${process.env.CONTACT_EMAIL || 'fccbb@unitru.edu.pe'}</a>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background:#0a4d3b;padding:16px;text-align:center">
                    <p style="color:#fff/60;font-size:11px;margin:0">${CURSO.facultad} · Universidad Nacional de Trujillo</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  })
}
