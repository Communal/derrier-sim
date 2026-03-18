import { SIMPurchaseFormValues } from "@/hooks/use-sim-purchase-form";

export interface Plan {
    id: string;
    description: string;
    price: number;
}

export interface SIMData {
    id: string;
    provider: 'T-MOBILE' | 'AT&T';
    title: string;
    description: string;
    plans: Plan[];
    shippingCost?: number;
}

// UserInfo is derived from SIMPurchaseFormValues
export type UserInfo = SIMPurchaseFormValues;

export interface PurchaseSummary {
    subtotal: number;
    shipping: number;
    total: number;
}

// Final data structure combining all selected choices
export interface OrderDetails {
    plan: Plan;
    userInfo: UserInfo;
    summary: PurchaseSummary;
}