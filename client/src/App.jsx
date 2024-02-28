import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { AddProducts } from "./views/addProducts.jsx";
import { Home } from "./views/home.jsx";
import { ListProducts } from "./views/listProducts.jsx";
import { Login } from "./views/login.jsx";
import ProtectedRoute from "./middleware/protectedRoute.jsx";
import dotenv from "dotenv";
import { UpdateProduct } from "./views/updateProduct.jsx";
import { CartView } from "./views/cartView.jsx";
import { Products } from "./views/products.jsx";

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
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<CartView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
