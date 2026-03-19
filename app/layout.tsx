// src/app/layout.tsx
import { Lexend, Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import FloatingWhatsApp from '@/components/floating-whatsapp';


const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: 'Phase TV | Premium International SIM Cards',
    template: '%s | Phase TV',
  },
  description: 'Buy premium T-Mobile, AT&T, and UK O2 SIM cards. Fast activation, bulk orders, and reliable international roaming.',
  keywords: ['SIM cards', 'international SIM', 'T-Mobile', 'AT&T', 'UK O2', 'buy SIM card Nigeria', 'roaming SIM'],
  authors: [{ name: 'Phase TV' }],
  openGraph: {
    title: 'Phase TV | Premium International SIM Cards',
    description: 'Get connected instantly with our premium international SIM cards. Fast delivery and activation.',
    url: 'https://www.decarriersim.com/',
    siteName: 'Phase TV',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Phase TV SIM Cards',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phase TV | Premium International SIM Cards',
    description: 'Buy premium T-Mobile, AT&T, and UK O2 SIM cards.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lexend.variable} ${inter.variable} antialiased`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}