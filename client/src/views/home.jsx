import React, { useContext } from "react";
import { Header } from "../components/Header.jsx";
import { ProductSlider } from "../components/ProductSlider.jsx";
import { Link } from "react-router-dom";
import { InViewAnimationLeft } from "../components/InViewAnimation.jsx";
import { ProductContext } from "../context/ProductsContext";

export const Home = () => {
  const { products, loading } = useContext(ProductContext);

  const productosEnNovedad = products.filter(
    (product) => product.category === "Novedades",
  );
  const productosEnPromocion = products.filter(
    (product) => product.category === "Promoción",
  );

  return (
    <>
      <Header />
      <main className="m-auto mb-9 border-b-2 bg-zinc-50 md:mb-0 2xl:mx-[200px]">
        {loading ? (
          <div className="text-center">
            <img src="/assets/loading.gif" alt="Cargando..." />
          </div>
        ) : (
          <>
            <InViewAnimationLeft>
              <h3 className="m-auto w-fit border-b-2 border-pink-200 pt-5 text-center text-lg font-semibold">
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
              <div className="pb-16">
                <div className="mt-5 pb-4">
                  <h3 className="nunito-text-semibold m-auto mb-3 w-fit border-b-2 border-pink-200 text-lg">
                    ¿Quieres ver más?
                  </h3>
                  <p className="m-auto w-fit">
                    Tienes todo nuestro catálogo para mirar!
                  </p>
                </div>
                <Link to="/productos">
                  <button className="m-auto flex rounded-lg bg-pink-200 p-2 transition duration-200 hover:scale-110 hover:bg-pink-300">
                    Catálogo
                  </button>
                </Link>
              </div>
            </InViewAnimationLeft>
          </>
        )}
      </main>
    </>
  );
};
