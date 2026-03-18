"use client";

import React from 'react';
import { Package, Star } from 'lucide-react';

const recentOrders = [
    { name: "Sarah J.", item: "1x T-MOBILE SIM", time: "2 mins ago" },
    { name: "Michael C.", item: "5x AT&T Bulk", time: "15 mins ago" },
    { name: "David W.", item: "10x O2 UK", time: "1 hour ago" },
    { name: "Jessica T.", item: "1x T-MOBILE SIM", time: "2 hours ago" },
    { name: "Ahmed R.", item: "20x Vodafone Bulk", time: "3 hours ago" },
    { name: "Emily B.", item: "3x AT&T SIM", time: "5 hours ago" },
];

export default function RecentPurchases() {
    return (
        <div className="w-full bg-[#0A0A0A] border-y border-[#FFFFFF1A] py-6 overflow-hidden flex flex-col gap-4 relative">

            {/* Dark gradient masks on the left and right to make it fade smoothly */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

            <div className="flex items-center gap-2 px-4 md:px-8 mb-2 z-20">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-semibold tracking-wider text-neutral-400 uppercase font-body">
                    Trusted by 10,000+ Customers
                </h3>
            </div>

            {/* The Marquee Track */}
            <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] cursor-default">

                {/* We render the list TWICE back-to-back to create the seamless infinite loop effect */}
                {[...recentOrders, ...recentOrders].map((order, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 bg-[#121212] border-[0.8px] border-[#FFFFFF1A] rounded-full px-5 py-2.5 mx-3 min-w-max"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#FFFFFF0D] flex items-center justify-center">
                            <Package className="w-4 h-4 text-cyan-500" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-body text-white font-medium">
                                {order.name} <span className="text-neutral-500 font-normal">bought</span> {order.item}
                            </p>
                            <p className="text-xs font-body text-neutral-500">
                                {order.time}
                            </p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}