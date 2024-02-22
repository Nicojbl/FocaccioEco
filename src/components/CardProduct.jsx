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
        <div className="justify-between bg-white shadow-xl rounded-lg p-4 m-auto hover:shadow-x1 transition duration-200 transform hover:scale-105 mt-10 h-[440px] flex flex-col w-[80%] md:w-full items-center">
          <img
            src={`http://localhost:5000/images/${product._id}.jpg`}
            alt={product.title}
            className="mt-2 object-cover w-60 h-48 xl:w-full  border-b-2 border-pink-200 pointer-events-none"
          />
          <h3 className="text-xl font-semibold text-center pointer-events-none">{product.title}</h3>
          <p className="text-gray-500 pointer-events-none">{product.description}</p>
          {product.pricePromo > 0 ? (
            <div className="flex mb-3">
              <p className="text-stone-500 font-bold line-through text-xs mr-4 pointer-events-none">
                ${product.price}
              </p>
              <p className="text-2xl mt-auto pointer-events-none">$</p>
              <p className="text-gray-700 mt-auto font-bold text-3xl pointer-events-none">
                {product.pricePromo}
              </p>
              <p className="pl-2 mt-auto pointer-events-none">IVA inc.</p>
            </div>
          ) : (
            <div className="flex mb-3">
              <p className="text-gray-700 font-bold text-3xl mt-auto pointer-events-none">
                ${product.price}
              </p>
              <p className="pl-2 mt-auto pointer-events-none">IVA inc.</p>
            </div>
          )}
          <ItemCount count={count} handleCount={handleCount} />
          <button
            className="bg-pink-200 hover:bg-pink-300 transform hover:scale-110 transition duration-200 rounded-lg py-2 px-4 mt-4"
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
        </div>
      ) : (
        <div className="justify-between bg-white shadow-xl rounded-lg p-4 m-auto hover:shadow-x1 transition duration-200 transform hover:scale-105 mt-10 h-[440px] flex flex-col w-[80%] md:w-full items-center">
          <img
            src={`http://localhost:5000/images/${product._id}.jpg`}
            alt={product.title}
            className="mt-2 object-cover w-full h-48 border-b-2 border-pink-200"
          />
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="text-red-500 flex my-auto">Producto agotado</p>
        </div>
      )}
    </>
  );
};
