import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
    try {
        await connectToDatabase();

        const body = await request.json();

        // Generate a unique 8-digit Order Number (e.g., SIM12345678)
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        const orderNumber = `SIM${timestamp}${random}`;

        // Create the order in the database
        const newOrder = await Order.create({
            orderNumber: `#${orderNumber}`, // Prepend with #
            customerName: body.customerName,
            email: body.email,
            phone: body.phone,
            whatsapp: body.whatsapp || '',
            shippingAddress: body.shippingAddress,
            state: body.state,
            lga: body.lga,
            orderType: body.orderType,
            provider: body.provider,
            planDetails: body.planDetails,
            quantity: body.quantity,
            amount: body.amount,
            status: 'PENDING'
        });

        // Return the generated orderNumber to the frontend so the user can copy it
        return NextResponse.json({
            success: true,
            orderId: orderNumber // We return it without the # so it formats cleanly in the UI
        }, { status: 201 });

    } catch (error) {
        console.error("Failed to create order:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}