// src/app/api/admin/orders/[id]/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

// GET Single Order
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        // 1. Unwrap the params Promise (Next.js 15 requirement)
        const { id } = await params;

        const order = await Order.findById(id).lean();

        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PATCH (Update Order Status)
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        // 1. Unwrap the params Promise (Next.js 15 requirement)
        const { id } = await params;

        const body = await request.json();

        if (!body.status) {
            return NextResponse.json({ error: 'Status is required' }, { status: 400 });
        }

        // 2. Fix the Mongoose deprecation warning
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: body.status },
            { returnDocument: 'after' } // Changed from { new: true }
        ).lean();

        if (!updatedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Order updated', order: updatedOrder }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}