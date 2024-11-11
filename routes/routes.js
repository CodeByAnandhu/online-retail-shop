const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");

router.post("/products", productController.addProduct);
router.put("/products/:id", productController.editProduct);
router.delete("/products/:id", productController.deleteProduct);

router.post("/orders", orderController.placeOrder);
router.put("/orders/:id/cancel", orderController.cancelOrder);

module.exports = router;
