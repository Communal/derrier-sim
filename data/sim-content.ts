// src/data/sim-content.ts
import { SIMData } from '@/types/sim-purchase';

export const simCardOptions: SIMData[] = [
    {
        id: "t-mobile-purchase",
        provider: 'T-MOBILE',
        title: "T-MOBILE SIM CARD",
        description: "T-MOBILE Triple-Cut SIM Card... Active T-MOBILE service plan is required to activate and use SIM card. You will need a compatible T-Mobile or unlocked device to use this service...",
        plans: [
            { id: "tm-plan-1", description: "1pc", price: 120000 },
            { id: "tm-plan-2", description: "3pcs", price: 315000 },
            { id: "tm-plan-3", description: "5pcs", price: 500000 },
            { id: "tm-plan-4", description: "10pcs", price: 900000 },
        ],
        shippingCost: 0, // Free shipping
    },
    {
        id: "att-purchase",
        provider: 'AT&T',
        title: "AT&T SIM CARD",
        description: "Enjoy a premium international connection with these amazing benefits: Works for all apps & website verifications. Make direct messages and calls...",
        plans: [
            { id: "att-plan-1", description: "1pc", price: 150000 },
            { id: "att-plan-2", description: "3pcs", price: 390000 },
            { id: "att-plan-3", description: "5pcs", price: 600000 },
            { id: "att-plan-4", description: "10pcs", price: 1100000 },
        ],
        shippingCost: 0,
    },
    {
        id: "uk-o2-purchase",
        provider: 'UK O2' as any,
        title: "UK o2 SIM CARD",
        description: "Official UK O2 SIM. Perfect for roaming and international travel across Europe.",
        plans: [
            { id: "o2-1", description: "1pc", price: 110000 },
            { id: "o2-2", description: "3pcs", price: 300000 },
            { id: "o2-3", description: "5pcs", price: 480000 },
            { id: "o2-4", description: "10pcs", price: 850000 },
        ],
        shippingCost: 0,
    }
];