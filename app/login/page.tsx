"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to login');
            }

            // Successful login, middleware will now allow access
            router.push('/admin');
            router.refresh();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-[#121212] border border-[#FFFFFF1A] rounded-2xl flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="font-heading text-3xl text-white mb-2">Admin Portal</h1>
                        <p className="font-body text-neutral-500 text-sm">Sign in to manage SIM orders</p>
                    </div>
                </div>

                <Card className="bg-[#121212] border-[0.8px] border-[#FFFFFF1A] p-6 md:p-8 rounded-3xl">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {error && (
                            <Alert variant="destructive" className="bg-red-950/50 border-red-900 mb-6">
                                <AlertDescription className="text-red-400 font-body text-sm text-center w-full">
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                    Email Address
                                </label>
                                <div className="relative flex items-center">
                                    <Mail className="absolute left-4 w-5 h-5 text-neutral-500" />
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        required
                                        className="bg-[#FFFFFF0D] border-[0.8px] border-[#FFFFFF1A] focus:bg-[#FFFFFF1A] focus:border-white focus:ring-1 focus:ring-white text-white font-body text-[16px] h-14 rounded-xl pl-12 placeholder:text-neutral-600 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                    Password
                                </label>
                                <div className="relative flex items-center">
                                    <Lock className="absolute left-4 w-5 h-5 text-neutral-500" />
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="bg-[#FFFFFF0D] border-[0.8px] border-[#FFFFFF1A] focus:bg-[#FFFFFF1A] focus:border-white focus:ring-1 focus:ring-white text-white font-body text-[16px] h-14 rounded-xl pl-12 placeholder:text-neutral-600 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white hover:bg-neutral-200 text-black font-body font-medium h-14 text-[16px] rounded-xl transition-colors mt-2 group flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                            {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}