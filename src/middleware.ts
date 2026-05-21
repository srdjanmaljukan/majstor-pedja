import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // Provjeri session cookie
  const session = req.cookies.get('admin_session')
  if (session?.value === process.env.ADMIN_PASSWORD) {
    return NextResponse.next()
  }

  // Login stranica prolazi slobodno
  if (pathname === '/admin/login') return NextResponse.next()

  // Sve ostalo → redirect na login
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
  matcher: ['/admin/:path*'],
}
