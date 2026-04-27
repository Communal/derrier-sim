"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import SIMPurchaseCard from "@/components/sim-purchase-card";
import PaymentScreen from "@/components/payment-screen";
import { simCardOptions } from "@/data/sim-content";
import RecentPurchases from "@/components/recent-purchases";
import ImageGrid from '@/components/image-grid';

const myGalleryImages = [
  { id: 1, src: '/images/1.png', alt: 'User activating T-Mobile SIM', caption: '02 Sim' },
  { id: 2, src: '/images/2.png', alt: 'AT&T Bulk order packaging', caption: 'T-Mobile Sim details' },
  { id: 3, src: '/images/3.png', alt: 'Sim cards on a sleek dark surface', caption: 'T-Mobile Sim' },
  { id: 4, src: '/images/4.png', alt: 'Delivery man handling package', caption: 'AT&T 5G Sims' },
  { id: 5, src: '/images/5.png', alt: 'Customer support agent smiling', caption: 'AT&T Prepaid' },
  { id: 6, src: '/images/6.png', alt: 'O2 UK sim card packaging', caption: 'O2 UK Sim Plans' },
];

export default function Home() {
  // State to hold the successful order details. Null means no order placed yet.
  const [successfulOrder, setSuccessfulOrder] = useState<{
    id: string;
    amount: number;
  } | null>(null);

  // Function to trigger when a form is successfully submitted
  const handleOrderSuccess = (orderId: string, amount: number) => {
    // Scroll to the top of the page smoothly so the user sees the new screen
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSuccessfulOrder({ id: orderId, amount });
  };

  // Function to reset the view back to the forms
  const handleResetOrder = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSuccessfulOrder(null);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* CONDITIONAL RENDERING: Show Payment Screen OR the SIM Forms */}

      {successfulOrder ? (

        // --- PAYMENT SUCCESS VIEW ---
        <PaymentScreen
          orderId={successfulOrder.id}
          totalAmount={successfulOrder.amount}
          onClose={handleResetOrder}
          onPlaceAnotherOrder={handleResetOrder}
        />

      ) : (

        // --- DEFAULT SHOPPING VIEW ---
        <div className="animate-in fade-in duration-500">

          {/* --- TOP PROMO BANNER --- */}
          <div className="w-full bg-amber-500/10 border-b border-amber-500/20 py-2.5 overflow-hidden flex whitespace-nowrap relative z-50">
            <div className="flex w-fit animate-marquee cursor-default">
              {/* We repeat the text 12 times to ensure it completely fills the screen and loops seamlessly */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <span className="mx-6 text-sm font-body font-semibold text-amber-500 tracking-wider uppercase">
                    15% Discount + Free Delivery 🚚 + Payments on delivery
                  </span>
                  {/* Subtle dot separator between repeated phrases */}
                  <span className="text-amber-500/30 text-xs">•</span>
                </div>
              ))}
            </div>
          </div>

          <Hero />
          <RecentPurchases />

          {/* Multiple Forms: One for each SIM provider */}
          <section id="sim-options" className="container mx-auto px-4 pb-32 space-y-24 mt-12 scroll-mt-24">
            {simCardOptions.map((sim) => (
              <div key={sim.id} className="scroll-mt-20" id={sim.id}>
                {/* Notice we pass the handleOrderSuccess function down here */}
                <SIMPurchaseCard
                  data={sim}
                  onSuccess={handleOrderSuccess}
                />
              </div>
            ))}
          </section>

          {/* Footer Branding */}
          <ImageGrid
            images={myGalleryImages}
          />
          <footer className="py-12 border-t border-[#FFFFFF1A] text-center">
            <p className="text-neutral-500 text-sm font-body tracking-widest uppercase">
              Secure checkout • Fast shipping • 24/7 support
            </p>
          </footer>
        </div>
      )}
    </main>
  );
}