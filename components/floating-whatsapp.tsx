"use client";

import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
    // Replace with your actual admin/support number
    const phoneNumber = "2348128572911";
    const defaultMessage = encodeURIComponent("Hello! I have a question about purchasing a SIM card.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
            aria-label="Chat with us on WhatsApp"
        >
            {/* Optional text bubble that appears on hover (desktop) */}
            <span className="hidden md:block absolute right-16 px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#FFFFFF1A] text-white text-xs font-medium font-body opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Need help? Chat with us
            </span>

            {/* The Button */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20 transition-transform group-hover:scale-110 active:scale-95">
                <MessageCircle className="w-7 h-7 fill-current" />

                {/* Subtle outer ping animation */}
                <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20" />
            </div>
        </a>
    );
}