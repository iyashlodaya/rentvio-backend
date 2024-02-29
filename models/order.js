const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to user who placed the order
    cart_items: [
      {
        productInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        selectedTenure: Number,
        updatedProductRent: Number,
        rentForWholeTenure: Number,
      },
    ],
    total_monthly_rent_to_be_paid: Number,
    total_refundable_deposit: Number,
    status: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
