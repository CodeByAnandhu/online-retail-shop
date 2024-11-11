const Product = require("../models/productModel");

exports.addProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

exports.editProduct = async (id, productData) => {
  const product = await Product.findById(id);
  if (!product) return null;
  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

exports.getProductById = async (id) => {
  return await Product.findById(id);
};
