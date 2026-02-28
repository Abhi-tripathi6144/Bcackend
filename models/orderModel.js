const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            brand: String,
            rating: Number,
            quantity: Number,
            price: Number
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    orderStatus: {
        type: String,
        enum: ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "PLACED"
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD"
    }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
