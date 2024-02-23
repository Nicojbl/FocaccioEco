const mongoose = require("mongoose");
const productCollection = "products";

const ProductSchema = new mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  pricePromo: Number,
  stock: Number,
  category: { type: String, required: true },
});

const productModel = mongoose.model(productCollection, ProductSchema);

module.exports = productModel;
