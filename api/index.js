const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require('path');
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");

const userRoutes = require("./routes/products.router")

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/images', express.static(path.join(__dirname, '/public/images')));
app.use(express.static(path.join(__dirname + "/public")));

// Routes
app.use("/api/products", userRoutes);

const port = process.env.PORT || 8080;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

module.exports = app;
