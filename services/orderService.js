const Order = require("../models/orderModel");
const Product = require("../models/productModel");

exports.placeOrder = async (orderData) => {
  try {
    const product = await Product.findById(orderData.productId);
    if (!product || product.quantity < orderData.quantity) {
      throw new Error("Product unavailable or insufficient quantity");
    }

    const order = new Order({
      ...orderData,
      productId: orderData.productId,
    });

    await order.save();

    product.quantity -= orderData.quantity;
    await product.save();

    return order; 
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

exports.cancelOrder = async (orderId, orderData) => {
  try {
    const order = await Order.findById(orderId);
    if (!order || order.status === "cancelled") {
      throw new Error("Order not found or already cancelled");
    }

    order.status = "cancelled";
    await order.save();

    const product = await Product.findById(order.productId);
    product.quantity += orderData.quantity;
    await product.save();

    return order;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};
