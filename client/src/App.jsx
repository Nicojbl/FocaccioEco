import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { AddProducts } from "./views/addProducts.jsx";
import { Home } from "./views/home.jsx";
import { ListProducts } from "./views/listProducts.jsx";
import { Ingresar } from "./views/ingresar.jsx";
import Cookies from "js-cookie";
import ProtectedRoute from "./middleware/protectedRoute.jsx";
import dotenv from "dotenv";
import { UpdateProduct } from "./views/updateProduct.jsx";
import { CartView } from "./views/cartView.jsx";
import { Products } from "./views/products.jsx";

dotenv.config();

const App = () => {
  const codigoAccesoCookie = Cookies.get("codigoAcceso");
  const isAuthenticated = codigoAccesoCookie === process.env.REACT_APP_ADMIN;

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/ingresar" element={<Ingresar />} />
          <Route
            path="/listProducts"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectTo="/ingresar"
                component={<ListProducts />}
              />
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectTo="/ingresar"
                component={<UpdateProduct />}
              />
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectTo="/ingresar"
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
