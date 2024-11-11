const mongoose = require("mongoose");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const orderService = require("../services/orderService");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Order Service", () => {
  let product;

  beforeEach(async () => {
    product = await Product.create({
      name: "Test Product",
      price: 100,
      quantity: 10,
    });
  });

  afterEach(async () => {
    await Product.deleteMany({});
    await Order.deleteMany({});
  });

  test("should place an order", async () => {
    const order = await orderService.placeOrder({
      productId: product._id,
      quantity: 2,
    });
    expect(order).toHaveProperty("_id");
    expect(order.status).toBe("ordered");

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.quantity).toBe(8);
  });

  test("should cancel an order", async () => {
    const order = await orderService.placeOrder({
      productId: product._id,
      quantity: 2,
    });
    const canceledOrder = await orderService.cancelOrder(order._id, order);

    expect(canceledOrder.status).toBe("cancelled");

    const updatedProduct = await Product.findById(product._id);
    expect(updatedProduct.quantity).toBe(10);
  });
});
