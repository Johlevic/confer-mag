import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname === '/admin') {
    const authHeader = request.headers.get('authorization')

    if (authHeader) {
      const base64 = authHeader.split(' ')[1] || ''
      const decoded = Buffer.from(base64, 'base64').toString()
      const [user, pass] = decoded.split(':')

      if (pass === process.env.ADMIN_PASSWORD) {
        return NextResponse.next()
      }
    }

    return new NextResponse(null, {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Panel"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
