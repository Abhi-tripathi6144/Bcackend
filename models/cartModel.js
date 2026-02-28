const mongoose = require("mongoose");

const cartModel = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    rating: { type: Number, required: true },
    brand: { type: String, required: true },
    Quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
  },
  { timeseries: true },
);

module.exports = mongoose.model("cart", cartModel);
