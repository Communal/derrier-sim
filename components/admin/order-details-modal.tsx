"use client";

import React, { useState } from 'react';
import { X, Copy, Check, Clock, Package, CheckCircle2 } from 'lucide-react';
import { AdminOrder, OrderStatus } from '@/hooks/use-admin-orders';
import { cn } from '@/lib/utils';

interface OrderDetailsModalProps {
    order: AdminOrder;
    onClose: () => void;
    onStatusChange: (id: string, status: OrderStatus) => void;
}

export default function OrderDetailsModal({ order, onClose, onStatusChange }: OrderDetailsModalProps) {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const handleCopy = (text: string, fieldId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const AdminCopyField = ({ label, value, fieldId, isTextArea = false }: { label: string, value: string, fieldId: string, isTextArea?: boolean }) => (
        <div className="space-y-2">
            <label className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                {label}
            </label>
            <div className="flex items-start gap-3">
                <div className={cn(
                    "flex-1 p-4 rounded-xl border border-[#FFFFFF1A] bg-[#1A1A1A] font-body text-sm text-neutral-200 uppercase",
                    isTextArea ? "min-h-[100px]" : "h-14 flex items-center"
                )}>
                    {value}
                </div>
                <button
                    onClick={() => handleCopy(value, fieldId)}
                    className="h-14 w-14 shrink-0 rounded-xl border border-[#FFFFFF1A] bg-[#1A1A1A] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#FFFFFF2A] transition-colors"
                >
                    {copiedField === fieldId ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );

    const StatusButton = ({ status, icon: Icon, label }: { status: OrderStatus, icon: any, label: string }) => {
        const isActive = order.status === status;
        const colorClass = status === 'PENDING' ? 'amber' : status === 'ACTIVE' ? 'cyan' : 'green';

        return (
            <button
                onClick={() => onStatusChange(order.id, status)}
                className={cn(
                    "flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border text-sm font-medium transition-all",
                    isActive
                        ? `bg-${colorClass}-500/10 border-${colorClass}-500 text-${colorClass}-500`
                        : "bg-[#1A1A1A] border-[#FFFFFF1A] text-neutral-400 hover:text-white"
                )}
            >
                <Icon className="w-4 h-4" />
                {label}
            </button>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Slide-over Panel */}
            <div className="relative w-full max-w-md bg-[#121212] border-l border-[#FFFFFF1A] h-full overflow-y-auto animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="sticky top-0 bg-[#121212] z-10 border-b border-[#FFFFFF1A] p-6 flex justify-between items-start">
                    <div>
                        <h2 className="font-heading text-2xl text-white">Order Details</h2>
                        <p className="text-neutral-500 font-body">{order.orderNumber}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-neutral-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Status Changer */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Change Order Status</h3>
                        <div className="flex flex-col gap-3">
                            <StatusButton status="PENDING" icon={Clock} label="Pending" />
                            <StatusButton status="ACTIVE" icon={Package} label="Active" />
                            <StatusButton status="CONCLUDED" icon={CheckCircle2} label="Concluded" />
                        </div>
                    </div>

                    {/* Order Information Table */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-4">Order Information</h3>
                        <div className="space-y-3 text-sm font-body">
                            <div className="flex justify-between"><span className="text-neutral-400">Order Type</span><span className="text-white">{order.orderType}</span></div>
                            <div className="flex justify-between"><span className="text-neutral-400">SIM Brand</span><span className="text-white">{order.provider}</span></div>
                            <div className="flex justify-between"><span className="text-neutral-400">Quantity</span><span className="text-white">{order.quantity} cards</span></div>
                            <div className="flex justify-between"><span className="text-neutral-400">Carrier</span><span className="text-white">{order.provider}</span></div>
                            <div className="flex justify-between pt-3 border-t border-[#FFFFFF1A]"><span className="text-neutral-400">Total Amount</span><span className="text-white font-bold text-base">₦{order.amount.toLocaleString()}</span></div>
                        </div>
                    </div>

                    {/* Copyable Fields */}
                    <div className="space-y-6">
                        <AdminCopyField label="Customer Name" value={order.customerName} fieldId="name" />
                        <AdminCopyField label="E-Mail" value={order.email} fieldId="email" />
                        <AdminCopyField label="Phone Number" value={order.phone} fieldId="phone" />
                        <AdminCopyField label="Whatsapp Number" value={order.whatsapp} fieldId="wa" />
                        <AdminCopyField label="Shipping Address" value={order.shippingAddress} fieldId="address" isTextArea={true} />
                        <AdminCopyField label="State" value={order.state} fieldId="state" />
                        <AdminCopyField label="LGA" value={order.lga} fieldId="lga" />
                    </div>

                    {/* Timeline Card */}
                    <div className="bg-[#1A1A1A] border border-[#FFFFFF1A] rounded-xl p-5 space-y-4">
                        <h3 className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Timeline</h3>
                        <div className="space-y-3 text-sm font-body">
                            <div>
                                <p className="text-neutral-500">Created</p>
                                <p className="text-neutral-200">{order.createdAt}</p>
                            </div>
                            <div>
                                <p className="text-neutral-500">Last Updated</p>
                                <p className="text-neutral-200">{order.lastUpdated}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}