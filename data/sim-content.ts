// src/data/sim-content.ts
import { SIMData } from '@/types/sim-purchase';

export const simCardOptions: SIMData[] = [
    {
        id: "t-mobile-purchase",
        provider: 'T-MOBILE',
        title: "T-MOBILE SIM CARD",
        description: `T-MOBILE Triple-Cut SIM Card.
        Active T-MOBILE service plan is required to activate and use SIM card. You will need a compatible T-Mobile or unlocked device to use this service.
        T-MOBILE Triple Cut SIM Card R15 Newest Model.
        4G 5G LTE 
T-MOBILE “3 IN 1” SIM• 4G 5G LTE GSM  (R15 +5G SA) MINI (2FF) • MICRO (3FF).
NANO (4FF)

T-MOBILE SIM CARD IS READY TO USE WITH T-MOBILE PREPAID OR POSTPAID PLANS ON THE T-MOBILE USA NETWORK.
YOU WILL NEED A T-MOBILE COMPATIBLE DEVICE:iPhones, Samsungs ,Some infinix phones,Black berry,Nokia ,Goggle pixel etc.

Activated sim cards are available with your choice of area code and can text and make calls only to usa numbers`,
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
        description: `Enjoy a premium international connection with these amazing benefits:
Works for all apps & website verifications
Make direct messages and calls to the Usa,Africa,Asia,Australia and across Europe
Activate iMessage and send text messages easily Permanent line with a simple monthly subscription
No blocking, no banning, no interruptions
Stay connected, stay verified, stay ahead!`,
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
        title: "o2 UK +44 SIM CARD",
        description: `O2 UK +44 Sim Card.

Brand new - Unopened
Can Get codes/verify apps and site without top ups
Works on all mobile devices
*You will need to top up £10 at www.o2.co.uk to activate for calls and normal text*`,
        plans: [
            { id: "o2-1", description: "1pc", price: 110000 },
            { id: "o2-2", description: "3pcs", price: 300000 },
            { id: "o2-3", description: "5pcs", price: 480000 },
            { id: "o2-4", description: "10pcs", price: 850000 },
        ],
        shippingCost: 0,
    }
];