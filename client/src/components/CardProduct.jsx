import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { ItemCount } from "./ItemCount";

export const CardProduct = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  const [count, setCount] = useState(1);

  const maxQuantity = product.stock;

  const handleCount = (type) => {
    if (type === "plus" && count < maxQuantity) setCount(count + 1);
    if (type === "minus" && count > 1) setCount(count - 1);
  };

  const handleAddToCart = () => {
    addProduct(product, count);
    console.log("Producto añadido al carrito");
  };

  return (
    <>
      {product.stock > 0 ? (
        <div className="hover:shadow-x1 md:w-min-[270px] m-auto mt-10 flex h-[440px] w-[80%] transform flex-col items-center justify-between rounded-lg bg-white shadow-xl transition duration-200 hover:scale-105 md:w-[90%]">
          {product.description === "novedades"
            ? () => <p className="text-red-500">Novedad</p>
            : null}
          <img
            src={`http://localhost:5000/images/${product._id}.jpg`}
            alt={product.title}
            className="pointer-events-none mt-2 h-48 w-60 border-b-2 border-pink-200 object-cover pl-4 pr-4 pt-4"
          />
          <h3 className="pointer-events-none text-center text-xl font-semibold">
            {product.title}
          </h3>
          <p className="pointer-events-none text-gray-500">
            {product.description}
          </p>
          {product.pricePromo > 0 ? (
            <div className="mb-3 flex">
              <p className="pointer-events-none mr-4 text-xs font-bold text-stone-500 line-through">
                ${product.price}
              </p>
              <p className="pointer-events-none mt-auto text-2xl">$</p>
              <p className="pointer-events-none mt-auto text-3xl font-bold text-gray-700">
                {product.pricePromo}
              </p>
              <p className="pointer-events-none mt-auto pl-2 text-xs">
                IVA inc.
              </p>
            </div>
          ) : (
            <div className="mb-3 flex">
              <p className="pointer-events-none mt-auto text-3xl font-bold text-gray-700">
                ${product.price}
              </p>
              <p className="pointer-events-none mt-auto pl-2 text-xs">
                IVA inc.
              </p>
            </div>
          )}
          <ItemCount count={count} handleCount={handleCount} />
          <button
            className="mb-4 mt-4 rounded-lg bg-pink-200 px-4 py-2 transition duration-200 hover:scale-110 hover:bg-pink-300"
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
        </div>
      ) : (
        <div className="hover:shadow-x1 md:w-min-[270px] m-auto mt-10 flex h-[440px] w-[80%] transform flex-col items-center justify-between rounded-lg bg-white shadow-xl transition duration-200 hover:scale-105 md:w-[90%]">
          <img
            src={`http://localhost:5000/images/${product._id}.jpg`}
            alt={product.title}
            className="mt-2 h-48 w-full border-b-2 border-pink-200 object-cover"
          />
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="my-auto flex text-red-500">Producto agotado</p>
        </div>
      )}
    </>
  );
};
