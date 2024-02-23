const express = require("express");
const router = express.Router();
const upload = require("../uploads/upload.js");
const path = require("path")
const fs = require("fs");
require("dotenv").config();

const productModel = require("../models/products.model.js");

router.post("/ingresar", (req, res) => {
  if (req.body.codigoAcceso === process.env.REACT_APP_ADMIN) {
    res.cookie("codigoAcceso", process.env.REACT_APP_ADMIN, {
      maxAge: 1900000,
      httpOnly: true,
    });
    res.send("Acceso permitido");
  } else {
    res.status(401).send("Código de acceso incorrecto");
  }
});

router.post("/addProduct", upload.single("img"), async (req, res) => {
  try {
    const { title, description, price, pricePromo, stock, category } = req.body;

    const newProduct = await productModel.create({
      title,
      description,
      price,
      pricePromo,
      stock,
      category,
      img: req.file.filename,
    });

    const productId = newProduct._id.toString();
    const imgPath = `public/images/${productId}.jpg`;

    fs.renameSync(req.file.path, imgPath);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al agregar el producto", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.send(product);
  } catch (error) {
    console.error("Error al obtener los productos", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

router.put("/updateproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, pricePromo, stock, category } = req.body;

    const modifiedProduct = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      pricePromo,
      stock,
      category,
    });

    res.status(200).json(modifiedProduct);
  } catch (error) {
    console.error("Error al modificar el producto", error);
    res.status(500).json({ error: "Error al modificar el producto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send("Producto no encontrado");
    }

    const imgDirectory = path.resolve(__dirname, "../public/images");
    const imgPath = path.join(imgDirectory, `${productId}.jpg`);

    fs.unlinkSync(imgPath);

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

module.exports = router;
