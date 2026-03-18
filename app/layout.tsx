// src/app/layout.tsx
import { Lexend, Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";


const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SIM Purchase Platform",
  description: "Get your global SIM cards easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}