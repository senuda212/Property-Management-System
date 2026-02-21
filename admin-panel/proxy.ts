import { auth as authConfig } from '@/auth'
import { NextResponse } from 'next/server'

export const proxy = authConfig((req) => {
    const token = req.auth
    const pathname = req.nextUrl.pathname

    // If not logged in and not on login page, redirect to login
    if (!token && pathname !== '/login') {
        const url = new URL('/login', req.url)
        return NextResponse.redirect(url)
    }

    const role = (token?.user as any)?.role as string

    // Role-based route access control
    const adminOnlyRoutes = ['/users', '/activity-logs']
    const settingsRoutes = ['/settings'] // Admin and Manager
    const managerAndAboveRoutes = ['/properties/new', '/properties/edit']

    const isAdminOnly = adminOnlyRoutes.some(r => pathname.startsWith(r))
    const isSettings = settingsRoutes.some(r => pathname.startsWith(r))
    const isManagerOnly = managerAndAboveRoutes.some(r => pathname.startsWith(r))

    // Admin only routes
    if (isAdminOnly && role !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard?error=unauthorized', req.url))
    }

    // Settings (Admin and Manager only)
    if (isSettings && role === 'employee') {
        return NextResponse.redirect(new URL('/dashboard?error=unauthorized', req.url))
    }

    // Manager and above routes
    if (isManagerOnly && role === 'employee') {
        return NextResponse.redirect(new URL('/dashboard?error=unauthorized', req.url))
    }

    // Security headers on every response
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:;"
    )

    return response
})

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/properties/:path*',
        '/inquiries/:path*',
        '/users/:path*',
        '/settings/:path*',
        '/activity-logs/:path*',
    ],
}
