import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 bg-[#0A0A0A]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 mb-8">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-neutral-400 font-['Inter']">Join 50,000+ users worldwide</span>
            </div>

            <h1 className="font-['Lexend'] text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl">
                <span className="opacity-20 block md:inline">Buy SIM Cards. </span>
                Stay Connected. <span className="text-rose-600">Anywhere.</span>
            </h1>

            <p className="font-body font-normal text-neutral-400 mt-8 max-w-2xl text-lg leading-relaxed">
                Purchase SIM cards instantly for single use or in bulk. Fast shipping within 24-36 hours, premium quality. Just instant connectivity.
            </p>

            <button className="mt-10 group flex items-center gap-2 bg-neutral-100 hover:bg-white text-black px-10 py-5 rounded-3xl font-['Lexend'] font-bold text-lg transition-all">
                Buy SIM Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </section>
    );
}