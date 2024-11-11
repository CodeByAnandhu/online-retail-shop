const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: Number,
  status: { type: String, enum: ["ordered", "cancelled"], default: "ordered" },
});

module.exports = mongoose.model("Order", orderSchema);
