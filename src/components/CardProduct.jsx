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
        <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-x1 transition duration-200 transform hover:scale-105 mt-10 h-70 flex flex-col h-[90%] w-[80%] m-auto items-center">
          <h3 className="text-xl font-semibold">
            {product.title.length > 20 ? `${product.title.substring(0, 23)}...` : product.title}
          </h3>
          <img
            src={`http://localhost:5000/images/${product._id}.jpg`}
            alt={product.title}
            className="mt-2 object-cover w-32 h-32"
          />
          <p className="text-gray-500">{product.description}</p>
          {product.pricePromo > 0 ? (
            <div className="flex gap-5">
              <p className="text-stone-500 font-bold line-through text-xs">${product.price}</p>
              <p className="text-gray-700 font-bold text-3xl mb-2">${product.pricePromo}</p>
            </div>
          ) : (
            <p className="text-gray-700 font-bold text-3xl mb-2">${product.price}</p>
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
        <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-x1 transition duration-200 transform hover:scale-105 mt-10 h-70 flex flex-col h-[90%] w-[80%] m-auto items-center">
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <img
            src={`http://localhost:5000/images/${product._id}.jpg`}
            alt={product.title}
            className="mt-2 object-cover w-32 h-32"
          />
          <p className="text-red-500">Producto agotado</p>
        </div>
      )}
    </>
  );
};
