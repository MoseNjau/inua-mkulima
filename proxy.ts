import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/login/password']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_ROUTES.some(route => pathname.startsWith(route))

  if (!isPublic && !request.cookies.get('auth_token')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
