// src/hooks/use-sim-purchase-form.ts
import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SIMData } from '@/types/sim-purchase';

export const simPurchaseSchema = z.object({
    fullName: z.string().min(2, { message: "Full Name must be at least 2 characters." }),
    emailAddress: z.string().email({ message: "Invalid email address." }),
    phoneNumber: z.string().min(10, { message: "Invalid phone number." }),
    whatsappNumber: z.string().optional(),
    shippingAddress: z.string().min(5, { message: "Invalid shipping address." }),
    state: z.string().min(1, { message: "Please select a state." }),
    lga: z.string().min(1, { message: "Please select an LGA." }),
});

export type SIMPurchaseFormValues = z.infer<typeof simPurchaseSchema>;

export const useSIMPurchaseForm = (
    simData: SIMData, // Pass the whole object so we have provider context
    onSuccess?: (orderId: string, amount: number) => void
) => {
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
    const [submitError, setSubmitError] = useState<string | null>(null);

    const form = useForm<SIMPurchaseFormValues>({
        resolver: zodResolver(simPurchaseSchema),
        defaultValues: {
            fullName: "", emailAddress: "", phoneNumber: "", whatsappNumber: "",
            shippingAddress: "", state: "", lga: "",
        },
        mode: 'onTouched'
    });

    const purchaseSummary = useMemo(() => {
        const selectedPlan = simData.plans[selectedPlanIndex];
        if (!selectedPlan) return { subtotal: 0, shipping: 0, total: 0 };

        const subtotal = selectedPlan.price;
        const shipping = simData.shippingCost || 0;
        return { subtotal, shipping, total: subtotal + shipping };
    }, [simData, selectedPlanIndex]);

    const handlePlanChange = (index: number) => setSelectedPlanIndex(index);

    const onSubmit = async (formData: SIMPurchaseFormValues) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const selectedPlan = simData.plans[selectedPlanIndex];

            // Extract quantity (e.g., "3pcs" -> 3, or default to 1)
            const qtyMatch = selectedPlan.description.match(/(\d+)/);
            const quantity = qtyMatch ? parseInt(qtyMatch[0]) : 1;

            // Prepare exactly what the backend expects
            const orderPayload = {
                customerName: formData.fullName,
                email: formData.emailAddress,
                phone: formData.phoneNumber,
                whatsapp: formData.whatsappNumber,
                shippingAddress: formData.shippingAddress,
                state: formData.state,
                lga: formData.lga,
                orderType: quantity > 1 ? 'Bulk' : 'Single',
                provider: simData.provider,
                planDetails: `${selectedPlan.description} ${simData.provider}`,
                quantity: quantity,
                amount: purchaseSummary.total
            };

            // Call the new API endpoint
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Failed to place order');
            }

            // Trigger the success screen using the real Order ID from the database!
            if (onSuccess) {
                onSuccess(result.orderId, purchaseSummary.total);
            }

        } catch (error: any) {
            console.error("Submission error:", error);
            setSubmitError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        selectedPlanIndex,
        handlePlanChange,
        purchaseSummary,
        isSubmitting,
        submitError,
        onSubmit: form.handleSubmit(onSubmit)
    };
};