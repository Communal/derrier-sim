// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key_change_this_in_production');

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('admin_token')?.value;
    const isAuthPage = request.nextUrl.pathname.startsWith('/login');

    // If trying to access /admin routes without a token
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If there is a token, verify it
    if (token) {
        try {
            await jwtVerify(token, JWT_SECRET);

            // If they are on the login page but already have a valid token, send them to admin
            if (isAuthPage) {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        } catch (err) {
            // Token is invalid or expired
            if (!isAuthPage) {
                // Clear the bad cookie and redirect to login
                const response = NextResponse.redirect(new URL('/login', request.url));
                response.cookies.delete('admin_token');
                return response;
            }
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*',
        '/login'
    ],
};