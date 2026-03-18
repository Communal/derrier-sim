// src/hooks/use-admin-orders.ts
import { useState, useEffect, useCallback } from 'react';

export type OrderStatus = 'PENDING' | 'ACTIVE' | 'CONCLUDED' | 'ALL';

export interface AdminOrder {
    _id: string; // MongoDB uses _id
    id: string;  // Mapped for frontend convenience
    orderNumber: string;
    createdAt: string;
    updatedAt: string;
    customerName: string;
    email: string;
    phone: string;
    whatsapp: string;
    shippingAddress: string;
    state: string;
    lga: string;
    orderType: string;
    provider: string;
    planDetails: string;
    quantity: number;
    amount: number;
    status: OrderStatus;
}

interface Counts {
    ALL: number;
    PENDING: number;
    ACTIVE: number;
    CONCLUDED: number;
}

export const useAdminOrders = () => {
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [counts, setCounts] = useState<Counts>({ ALL: 0, PENDING: 0, ACTIVE: 0, CONCLUDED: 0 });
    const [activeFilter, setActiveFilter] = useState<OrderStatus>('ALL');

    // Pagination & Loading State
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const limit = 10; // Orders per page

    // 1. Fetch Orders from Database
    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/orders?page=${page}&limit=${limit}&status=${activeFilter}`);
            if (!res.ok) throw new Error('Failed to fetch orders');

            const data = await res.json();

            // Map MongoDB _id to frontend id, and format dates safely
            const formattedOrders = data.orders.map((o: any) => ({
                ...o,
                id: o._id,
                createdAt: new Date(o.createdAt).toLocaleString(),
                updatedAt: new Date(o.updatedAt).toLocaleString(),
            }));

            setOrders(formattedOrders);
            setCounts(data.counts);
            setTotalPages(data.pagination.pages);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [page, activeFilter]);

    // Fetch when page or filter changes
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Reset to page 1 when changing filters
    const handleFilterChange = (filter: OrderStatus) => {
        setActiveFilter(filter);
        setPage(1);
    };

    // 2. Update Status (PATCH)
    const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
        // Optimistic UI Update (Update instantly on screen for snappy feel)
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!res.ok) {
                throw new Error('Failed to update status in DB');
            }

            // Refresh counts in the background
            fetchOrders();

        } catch (err) {
            console.error(err);
            // Revert on failure (optional, but good practice)
            fetchOrders();
        }
    };

    // 3. Get Single Order by ID
    const getOrderById = async (orderId: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`);
            if (!res.ok) throw new Error('Order not found');
            return await res.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return {
        orders,
        counts,
        activeFilter,
        setActiveFilter: handleFilterChange,
        updateOrderStatus,
        getOrderById,

        // Expose pagination controls to UI
        page,
        setPage,
        totalPages,
        isLoading,
        error
    };
};