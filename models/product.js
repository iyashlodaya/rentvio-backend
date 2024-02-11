const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    priceId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productRent: {
      type: Number,
      required: true,
    },
    productRefundableDeposit: {
      type: Number,
      required: true,
    },
    productImageLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema, 'products');
