"use client";

import React, { useState } from 'react';
import { Check, X, Building2, Copy, MessageCircle, Phone, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Reusable Copy Field Component (Moved OUTSIDE main component) ---
interface CopyFieldProps {
    label: string;
    value: string;
    fieldId: string;
    highlight?: boolean;
    copiedField: string | null;
    onCopy: (text: string, fieldId: string) => void;
}

const CopyField = ({ label, value, fieldId, highlight = false, copiedField, onCopy }: CopyFieldProps) => (
    <div className="space-y-1.5">
        <label className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
            {label}
        </label>
        <div className="flex items-center gap-3">
            <div className={cn(
                "flex-1 px-4 h-14 rounded-xl flex items-center border-[0.8px] font-body text-[16px]",
                highlight
                    ? "bg-rose-950/20 border-rose-900/50 text-white font-medium"
                    : "bg-[#FFFFFF0D] border-[#FFFFFF1A] text-neutral-300"
            )}>
                {value}
            </div>
            <button
                onClick={() => onCopy(value, fieldId)}
                className="h-14 w-14 rounded-xl border-[0.8px] border-[#FFFFFF1A] bg-[#FFFFFF0D] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#FFFFFF1A] transition-colors"
                type="button" // Prevents accidental form submissions if used inside a form
            >
                {copiedField === fieldId ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
        </div>
    </div>
);


// --- Main Payment Screen Component ---
interface PaymentScreenProps {
    orderId: string;
    totalAmount: number;
    onClose: () => void;
    onPlaceAnotherOrder: () => void;
}

const handleWhatsAppClick = () => {
    // WhatsApp requires the number with country code, but WITHOUT the '+' or spaces
    const phoneNumber = "2348128572911";

    // The message we want to pre-fill for the user
    const message = `Hello! I just made a payment for my SIM card order.\n\n*Order Number:* ${orderId}\n*Total Amount:* ₦${totalAmount.toLocaleString()}\n\nHere is my payment receipt:`;

    // Encode the message so it works safely in a URL
    const encodedMessage = encodeURIComponent(message);

    // Build the final WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open in a new tab (which triggers the app to open on mobile)
    window.open(whatsappUrl, '_blank');
};

export default function PaymentScreen({ orderId, totalAmount, onClose, onPlaceAnotherOrder }: PaymentScreenProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    // Utility to copy text and show a temporary checkmark
    const handleCopy = (text: string, fieldId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-6 pb-20 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="w-full max-w-xl relative pt-12">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-0 right-0 p-2 text-neutral-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-4 mb-10">
                    <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center shadow-lg shadow-rose-600/20">
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                    </div>
                    <div>
                        <h1 className="font-heading text-2xl font-medium text-white mb-2">Order Processing</h1>
                        <p className="font-body text-neutral-400 text-sm">Complete payment using the details below</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Bank Details Card */}
                    <Card className="bg-[#121212] border-[0.8px] border-[#FFFFFF1A] p-5 md:p-6 rounded-3xl space-y-6">
                        <div className="flex items-center gap-3 text-white">
                            <Building2 className="w-5 h-5 text-neutral-400" />
                            <h2 className="font-heading text-lg font-medium">Bank Transfer Details</h2>
                        </div>

                        <div className="space-y-5">
                            <CopyField
                                label="Account Number"
                                value="5600988113"
                                fieldId="acc_num"
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                            <CopyField
                                label="Account Name"
                                value="Phase TV"
                                fieldId="acc_name"
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                            <CopyField
                                label="Bank Name"
                                value="Fidelity Bank"
                                fieldId="bank_name"
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />

                            <CopyField
                                label="Amount to Transfer"
                                value={`₦${totalAmount.toLocaleString()}`}
                                fieldId="amount"
                                highlight={true}
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />

                            <CopyField
                                label="Order Number (Include in transfer remark)"
                                value={`# ${orderId}`}
                                fieldId="order_num"
                                copiedField={copiedField}
                                onCopy={handleCopy}
                            />
                        </div>

                        <div className="flex items-start gap-2 text-amber-500 bg-amber-500/10 p-3 rounded-lg">
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                            <p className="text-xs font-body leading-relaxed">
                                Please include this order number in your transfer remark for faster processing
                            </p>
                        </div>

                        <div className="pt-4 border-t border-[#FFFFFF1A] space-y-4 text-center">
                            <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                Send Payment Receipt Via Whatsapp
                            </p>
                            <Button
                                onClick={handleWhatsAppClick}
                                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-body font-medium h-14 text-[16px] rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                            >
                                <MessageCircle className="w-5 h-5 fill-current" />
                                Send Receipt on WhatsApp
                            </Button>
                            <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm font-body mt-4">
                                <Phone className="w-4 h-4" />
                                <span>+234 812 857 2911</span>
                            </div>
                        </div>
                    </Card>

                    {/* Next Steps Card */}
                    <Card className="bg-[#121212] border-[0.8px] border-[#FFFFFF1A] p-5 md:p-6 rounded-3xl">
                        <h3 className="font-heading font-medium text-white mb-4">Next Steps:</h3>
                        <ul className="space-y-3 font-body text-sm text-neutral-400">
                            <li className="flex gap-2">
                                <span className="text-neutral-600">•</span>
                                Transfer the exact amount to the bank account above
                            </li>
                            <li className="flex gap-2">
                                <span className="text-neutral-600">•</span>
                                <span>Include the order number <span className="font-semibold text-white">{orderId}</span> in your transfer remark</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-neutral-600">•</span>
                                Take a screenshot or photo of your payment receipt
                            </li>
                            <li className="flex gap-2">
                                <span className="text-neutral-600">•</span>
                                Send the receipt via WhatsApp for verification
                            </li>
                            <li className="flex gap-2">
                                <span className="text-neutral-600">•</span>
                                Your SIM cards will be shipped within 24-48 hours after payment confirmation
                            </li>
                        </ul>
                    </Card>

                    {/* Place Another Order Button */}
                    <button
                        onClick={onPlaceAnotherOrder}
                        className="w-full font-body text-sm text-neutral-400 hover:text-white bg-[#FFFFFF0D] border-[0.8px] border-[#FFFFFF1A] h-14 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
                    >
                        <span>←</span> Place Another Order
                    </button>
                </div>
            </div>
        </div>
    );
}