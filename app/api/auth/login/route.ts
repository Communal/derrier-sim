// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_key_change_this_in_production');

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        await connectToDatabase();

        // 1. Find user in database
        const user = await User.findOne({ email });

        // Quick Dev Hack: If no user exists at all, create a default admin so you can log in the first time. 
        // REMOVE THIS BLOCK IN PRODUCTION
        if (!user && email === 'admin@admin.com') {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ email, password: hashedPassword, role: 'admin' });
            return NextResponse.json({ message: 'Default admin created. Click login again.' }, { status: 201 });
        }

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // 2. Check Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // 3. Generate JWT Token
        const token = await new SignJWT({ userId: user._id, email: user.email, role: user.role })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h') // Token expires in 24 hours
            .sign(JWT_SECRET);

        // 4. Set HTTP-only Cookie (FIX APPLIED HERE: await cookies())
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'admin_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}