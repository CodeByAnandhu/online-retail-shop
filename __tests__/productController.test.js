const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("../routes/routes");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();
app.use(express.json());
app.use("/api", routes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Product Controller", () => {
  test("POST /api/products should add a product", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Test Product", price: 100, quantity: 10 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test Product");
  });

  test("PUT /api/products/:id should edit a product", async () => {
    const product = await request(app)
      .post("/api/products")
      .send({ name: "Test Product", price: 100, quantity: 10 });
    const res = await request(app)
      .put(`/api/products/${product.body._id}`)
      .send({ name: "Updated Product" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Product");
  });

  test("DELETE /api/products/:id should delete a product", async () => {
    const product = await request(app)
      .post("/api/products")
      .send({ name: "Test Product", price: 100, quantity: 10 });
    const res = await request(app).delete(`/api/products/${product.body._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Product deleted successfully");
  });
});
