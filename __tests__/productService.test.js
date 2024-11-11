const mongoose = require("mongoose");
const Product = require("../models/productModel");
const productService = require("../services/productService");
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

describe("Product Service", () => {
  let product;

  beforeEach(async () => {
    product = await productService.addProduct({
      name: "Test Product",
      price: 100,
      quantity: 10,
    });
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  test("should add a product", async () => {
    expect(product).toHaveProperty("_id");
    expect(product.name).toBe("Test Product");
  });

  test("should edit a product", async () => {
    const updatedProduct = await productService.editProduct(product._id, {
      name: "Updated Product",
    });
    expect(updatedProduct.name).toBe("Updated Product");
  });

  test("should delete a product", async () => {
    const deletedProduct = await productService.deleteProduct(product._id);
    const foundProduct = await Product.findById(product._id);
    expect(foundProduct).toBeNull();
  });
});
