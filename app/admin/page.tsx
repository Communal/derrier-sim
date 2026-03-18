"use client";

import React, { useState } from 'react';
import { useAdminOrders, AdminOrder } from '@/hooks/use-admin-orders';
import { Filter, CheckCircle2, Clock, Package, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import OrderDetailsModal from '@/components/admin/order-details-modal';

export default function AdminDashboard() {
    // Destructured the pagination properties from the hook
    const {
        orders, counts, activeFilter, setActiveFilter, updateOrderStatus,
        page, setPage, totalPages, isLoading
    } = useAdminOrders();

    const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

    const statusConfig = {
        PENDING: { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Clock },
        ACTIVE: { color: 'text-cyan-500', bg: 'bg-cyan-500/10', icon: Package },
        CONCLUDED: { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle2 }
    };

    // Helper to update status locally without closing the modal
    const handleStatusUpdate = (orderId: string, newStatus: any) => {
        updateOrderStatus(orderId, newStatus);
        if (selectedOrder?.id === orderId) {
            setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white p-4 md:p-8 font-body flex flex-col">
            <div className="max-w-6xl mx-auto space-y-8 w-full flex-1 flex flex-col">

                {/* --- Filters Header --- */}
                <div className="flex flex-wrap gap-3">
                    {(['ALL', 'PENDING', 'ACTIVE', 'CONCLUDED'] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl border-[0.8px] transition-colors text-sm font-medium",
                                activeFilter === filter
                                    ? "bg-[#FFFFFF1A] border-white text-white"
                                    : "bg-[#FFFFFF0D] border-[#FFFFFF1A] text-neutral-400 hover:text-white"
                            )}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="capitalize">{filter.toLowerCase()}</span>
                            <span className="bg-[#FFFFFF1A] px-2 py-0.5 rounded-full text-xs">
                                {counts[filter] || 0}
                            </span>
                        </button>
                    ))}
                </div>

                {/* --- Orders List --- */}
                <div className="space-y-4 flex-1">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20 text-neutral-500">
                            Loading orders...
                        </div>
                    ) : orders.length > 0 ? (
                        orders.map((order) => {
                            const config = statusConfig[order.status];
                            const StatusIcon = config.icon;

                            return (
                                <div
                                    key={order.id}
                                    onClick={() => setSelectedOrder(order)} // 1. Opens Modal
                                    className="bg-[#121212] border-[0.8px] border-[#FFFFFF1A] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 transition-all hover:bg-[#1A1A1A] cursor-pointer"
                                >
                                    <div className="flex items-start gap-4 md:w-1/4">
                                        <div className={cn("mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0", config.bg, config.color)}>
                                            <StatusIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-medium text-[16px] text-white tracking-wide">{order.orderNumber}</h3>
                                            <p className="text-neutral-500 text-sm mt-1">{order.createdAt}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:w-2/4">
                                        <div className="flex items-center gap-3 text-neutral-300 md:w-1/2">
                                            <User className="w-4 h-4 text-neutral-500" />
                                            <span className="text-sm">{order.customerName}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-neutral-300 md:w-1/2">
                                            <Package className="w-4 h-4 text-neutral-500" />
                                            <span className="text-sm">{order.planDetails}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center md:w-1/4 gap-4">
                                        <div className="hidden md:flex items-center gap-2 text-white font-medium mb-2">
                                            <span className="text-neutral-500 font-sans">₦</span>
                                            <span>{order.amount.toLocaleString()}</span>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end w-full gap-4">
                                            <span className={cn("px-3 py-1 text-xs font-bold rounded-md tracking-wider uppercase", config.bg, config.color)}>
                                                {order.status}
                                            </span>

                                            <div className="flex items-center gap-2">
                                                {(order.status === 'PENDING' || order.status === 'CONCLUDED') && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // 2. STOPS MODAL FROM OPENING
                                                            handleStatusUpdate(order.id, 'ACTIVE');
                                                        }}
                                                        className="w-8 h-8 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center transition-colors"
                                                        title="Mark as Active"
                                                    >
                                                        <Package className="w-4 h-4 text-cyan-500" />
                                                    </button>
                                                )}
                                                {(order.status === 'PENDING' || order.status === 'ACTIVE') && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // 2. STOPS MODAL FROM OPENING
                                                            handleStatusUpdate(order.id, 'CONCLUDED');
                                                        }}
                                                        className="w-8 h-8 rounded-full bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 flex items-center justify-center transition-colors"
                                                        title="Mark as Concluded"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 text-neutral-500">
                            No orders found for this status.
                        </div>
                    )}
                </div>

                {/* --- Pagination Controls --- */}
                {!isLoading && totalPages > 0 && (
                    <div className="flex items-center justify-between pt-6 border-t border-[#FFFFFF1A] mt-8 pb-8">
                        <p className="text-sm font-body text-neutral-400">
                            Page <span className="text-white font-medium">{page}</span> of <span className="text-white font-medium">{totalPages}</span>
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p: number) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl border-[0.8px] border-[#FFFFFF1A] bg-[#FFFFFF0D] text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFFFFF1A] transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>
                            <button
                                onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl border-[0.8px] border-[#FFFFFF1A] bg-[#FFFFFF0D] text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFFFFF1A] transition-colors"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* --- Modals/Overlays --- */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onStatusChange={handleStatusUpdate}
                />
            )}
        </div>
    );
}