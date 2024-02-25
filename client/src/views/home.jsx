import React, { useState, useEffect } from "react";
import { Header } from "../components/Header.jsx";
import { ProductSlider } from "../components/ProductSlider.jsx";
import { Link } from "react-router-dom";
import { InViewAnimationLeft } from "../components/InViewAnimation.jsx";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const productosEnNovedad = products.filter(
    (product) => product.category === "Novedades",
  );
  const productosEnPromocion = products.filter(
    (product) => product.category === "Promoción",
  );

  return (
    <>
      <Header />
      <main className="m-auto 2xl:mx-[200px]">
        {loading ? (
          <div className="text-center">
            <img src="/assets/loading.gif" alt="Cargando..." />
          </div>
        ) : (
          <>
            <InViewAnimationLeft>
              <h3 className="m-auto mt-5 w-fit border-b-2 border-pink-200 text-center text-lg font-semibold">
                Dale un vistazo a nuestras novedades!
              </h3>
            </InViewAnimationLeft>
            <ProductSlider products={productosEnNovedad} />
            <InViewAnimationLeft>
              <h3 className="m-auto mt-5 w-fit border-b-2 border-pink-200 text-center text-lg font-semibold">
                No te pierdas nuestras promociones!
              </h3>
            </InViewAnimationLeft>
            <ProductSlider products={productosEnPromocion} />
            <InViewAnimationLeft>
              <div className="mb-4 mt-5">
                <h3 className="nunito-text-semibold m-auto mb-3 w-fit border-b-2 border-pink-200 text-lg">
                  ¿Quieres ver más?
                </h3>
                <p className="m-auto w-fit">
                  Tienes todo nuestro catálogo para mirar!
                </p>
              </div>
            </InViewAnimationLeft>
            <Link to="/productos">
              <button className="m-auto mb-6 flex rounded-lg bg-pink-200 p-2 transition duration-200 hover:scale-110 hover:bg-pink-300">
                Catálogo
              </button>
            </Link>
          </>
        )}
      </main>
    </>
  );
};
