import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AddProducts } from "./components/AddProducts";
import { Home } from "./views/home";
import { ListProducts } from "./components/ListProducts";
import { Login } from "./views/login";
import ProtectedRoute from "./middleware/protectedRoute";
import dotenv from "dotenv";
import { UpdateProduct } from "./components/UpdateProduct";
import { Cart } from "./views/cart";
import { Catalogo } from "./views/catalogo";

dotenv.config();

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/listProducts"
            element={
              <ProtectedRoute redirectTo="/login" component={ListProducts} />
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRoute redirectTo="/login" component={UpdateProduct} />
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute redirectTo="/login" component={AddProducts} />
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
