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
      <main className="m-auto mb-9 border-y bg-zinc-50 md:mb-0 2xl:mx-[200px]">
        {loading ? (
          <div className="">
            <img
              src="/assets/loading.gif"
              alt="Cargando..."
              className="m-auto"
            />
          </div>
        ) : (
          <>
            <InViewAnimationLeft>
              <h3 className="m-auto w-fit  pt-20 text-center text-lg font-semibold md:text-3xl">
                Dale un vistazo a nuestras novedades!
              </h3>
            </InViewAnimationLeft>
            <ProductSlider products={productosEnNovedad} />
            <InViewAnimationLeft>
              <h3 className="m-auto mt-5 w-fit  text-center text-lg font-semibold md:text-3xl">
                No te pierdas nuestras ofertas!
              </h3>
            </InViewAnimationLeft>
            <ProductSlider products={productosEnPromocion} />
            <InViewAnimationLeft>
              <div className="pb-16">
                <div className="mt-5 pb-4">
                  <h3 className="nunito-text-semibold m-auto mb-3 w-fit  text-lg md:text-4xl">
                    ¿Quieres ver más?
                  </h3>
                  <p className="m-auto w-fit text-lg md:text-3xl">
                    Tienes todo nuestro catálogo para mirar!
                  </p>
                </div>
                <Link to="/productos">
                  <button className="h-15 w-30 m-auto flex items-center justify-center rounded-lg bg-pink-200 p-2 text-xl transition duration-200 hover:scale-110 hover:bg-pink-300">
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
