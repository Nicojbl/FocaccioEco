import React, { useState, useEffect } from "react";
import { Header } from "../components/Header.jsx";
import { ProductSlider } from "../components/ProductSlider.jsx";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("focaccio.vercel.app/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      }
    };

    fetchProducts();
  }, []);

  const productosEnNovedad = products.filter(
    (product) => product.category === "Novedades"
  );
  const productosEnPromocion = products.filter(
    (product) => product.category === "Promoción"
  );

  return (
    <>
    <Header />
      <main className="m-auto xl:mx-[200px]">
        <ProductSlider products={productosEnNovedad} title="Novedades" />
        <ProductSlider products={productosEnPromocion} title="Promoción" />
      </main>
    </>
  );
};
