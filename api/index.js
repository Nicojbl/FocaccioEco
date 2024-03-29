const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/products.router");

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    headers: "Content-Type",
  }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// Routes
app.use("/api/products", userRoutes);

module.exports = app;
