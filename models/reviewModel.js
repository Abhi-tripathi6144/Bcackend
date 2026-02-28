const mongoose = require("mongoose");

const reviewModel = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    comment: { type: String, required: true },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("review", reviewModel);
