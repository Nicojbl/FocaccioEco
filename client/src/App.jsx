import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { AddProducts } from "./views/addProducts.jsx";
import { Home } from "./views/home.jsx";
import { ListProducts } from "./views/listProducts.jsx";
import { Login } from "./views/login.jsx";
import { ProtectedRoute } from "./middleware/protectedRoute.jsx";
import dotenv from "dotenv";
import { UpdateProduct } from "./views/updateProduct.jsx";
import { CartView } from "./views/cartView.jsx";
import Cookies from "js-cookie";
import { Products } from "./views/products.jsx";

dotenv.config();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/listProducts"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectTo="/listProducts"
                component={<ListProducts />}
              />
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectTo="/updateproduct/:id"
                component={<UpdateProduct />}
              />
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectTo="/addproduct"
                component={<AddProducts />}
              />
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<CartView />} />
        </Routes>
        <img src="/images/nubes.webp" alt="nubes" className="md:hidden" />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
