import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth-session')
  const isAuth = !!authCookie
  const role = authCookie?.value // 'admin' or 'officer'
  
  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === '/login'
  const isDashboard = pathname.startsWith('/dashboard')
  const isAdminDashboard = pathname.startsWith('/admin-dashboard')

  // Not authenticated, trying to access a protected route
  if (!isAuth && (isDashboard || isAdminDashboard)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuth) {
    if (isLoginPage) {
      return NextResponse.redirect(new URL(role === 'admin' ? '/admin-dashboard' : '/dashboard', request.url))
    }
    
    // Role-based protection
    if (role === 'officer' && isAdminDashboard) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    if (role === 'admin' && isDashboard) {
      return NextResponse.redirect(new URL('/admin-dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin-dashboard/:path*', '/login'],
}
