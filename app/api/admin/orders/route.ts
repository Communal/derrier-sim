// src/app/api/admin/orders/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(request: Request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status'); // 'ALL', 'PENDING', 'ACTIVE', 'CONCLUDED'

        // 1. Build the query
        const query: any = {};
        if (status && status !== 'ALL') {
            query.status = status;
        }

        // 2. Fetch Paginated Orders
        const skip = (page - 1) * limit;
        const orders = await Order.find(query)
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit)
            .lean(); // .lean() makes it faster by returning plain JSON objects

        // 3. Get total counts for the Tabs (Execute all in parallel for speed)
        const [total, pending, active, concluded, filteredTotal] = await Promise.all([
            Order.countDocuments({}),
            Order.countDocuments({ status: 'PENDING' }),
            Order.countDocuments({ status: 'ACTIVE' }),
            Order.countDocuments({ status: 'CONCLUDED' }),
            Order.countDocuments(query) // Total for the current filter (for pagination math)
        ]);

        return NextResponse.json({
            orders,
            counts: {
                ALL: total,
                PENDING: pending,
                ACTIVE: active,
                CONCLUDED: concluded
            },
            pagination: {
                total: filteredTotal,
                pages: Math.ceil(filteredTotal / limit),
                currentPage: page,
                limit
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}