const express = require("express");
const router = express.Router();
const upload = require("../config.multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware.js");
require("dotenv").config();

const productModel = require("../models/products.model.js");

router.post("/login", (req, res) => {
  const { codigoAcceso } = req.body;
  if (codigoAcceso === process.env.REACT_APP_ADMIN) {
    const token = jwt.sign({ name: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res
      .cookie("token", token, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json(token);
  } else {
    res.status(401).json({ error: "Código incorrecto" });
  }
});

router.get("/isAdmin", verifyToken, (req, res) => {
  const { name } = req.user;
  console.log(name);
  if (name === "admin") {
    res.status(200).json({ isAdmin: true });
  } else {
    res.status(403).json({ isAdmin: false });
  }
});

router.post(
  "/addProduct",
  verifyToken,
  upload.single("img"),
  async (req, res) => {
    try {
      const { title, description, price, pricePromo, stock, category } =
        req.body;

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
      const imgPath = `public/images/${productId}.webp`;

      fs.renameSync(req.file.path, imgPath);

      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error al agregar el producto", error);
      res.status(500).json({ error: "Error al agregar el producto" });
    }
  }
);

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

router.put("/updateproduct/:id", verifyToken, async (req, res) => {
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

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send("Producto no encontrado");
    }

    const imgDirectory = path.resolve(__dirname, "../public/images");
    const imgPath = path.join(imgDirectory, `${productId}.webp`);

    fs.unlinkSync(imgPath);

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

module.exports = router;
