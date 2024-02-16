import React, { useState, useEffect } from "react";
import { CardProduct } from "../components/CardProduct.jsx";
import { Carousel } from "../components/carousel.jsx";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
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

  let slides = [
    { id: 1, image: "images/bbtips.webp" },
    { id: 2, image: "images/indoprotect.webp" },
    { id: 3, image: "images/mimlot.webp" },
    { id: 4, image: "images/tena.webp" },
  ]

  return (
    <>
    <Carousel slides={slides}/>
      <main className="m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <h3 className="text-lg font-semibold col-span-full m-auto mt-5 border-b-2 w-[120px] text-center border-red-500">
            Novedades
          </h3>
          {productosEnNovedad.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <h3 className="text-lg font-semibold col-span-full m-auto mt-5 border-b-2 w-[120px] text-center border-red-500">
            Promociones
          </h3>
          {productosEnPromocion.map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
};
