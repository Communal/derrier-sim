// src/models/Order.ts
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String },
    shippingAddress: { type: String, required: true },
    state: { type: String, required: true },
    lga: { type: String, required: true },

    orderType: { type: String, required: true }, // e.g., 'Single', 'Bulk'
    provider: { type: String, required: true }, // e.g., 'T-MOBILE', 'AT&T'
    planDetails: { type: String, required: true },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },

    status: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'CONCLUDED'],
        default: 'PENDING'
    }
}, {
    timestamps: true // Automatically manages createdAt and updatedAt
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);