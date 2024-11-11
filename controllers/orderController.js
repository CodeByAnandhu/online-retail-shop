const orderService = require("../services/orderService");

exports.placeOrder = async (req, res) => {
  try {
    const order = await orderService.placeOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log("orderId: ", orderId);
    const canceledOrder = await orderService.cancelOrder(orderId);
    if (!canceledOrder) {
      return res
        .status(404)
        .json({ message: "Order not found or already cancelled" });
    }
    res.status(200).json(canceledOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
