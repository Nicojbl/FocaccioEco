import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const CartView = () => {
  const { productsAdded, removeItem, totalValue } = useContext(CartContext);

  const handleRemove = (itemId) => {
    removeItem(itemId);
  };

  return (
    <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-lg bg-white shadow-md">
      <h2 className="bg-gray-800 px-6 py-4 text-3xl font-semibold text-white">
        Carrito de Compras
      </h2>
      {productsAdded.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-600">No hay productos en el carrito.</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Volver al inicio
          </Link>
        </div>
      ) : (
        <div className="p-6">
          <ul>
            {productsAdded.map((item) => (
              <li
                key={item.item._id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:5000/images/${item.item._id}.jpg`}
                    alt={item.item.title}
                    className="h-20 w-20 rounded object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.item.title}</h3>
                    <p className="text-gray-600">
                      Cantidad: {item.quantityAdded}
                    </p>
                    {item.item.pricePromo > 0 ? (
                      <p className="text-gray-600">
                        Precio: $
                        {item.item.pricePromo * (item.quantityAdded || 1)}
                      </p>
                    ) : (
                      <p className="text-gray-600">
                        Precio: ${item.item.price * (item.quantityAdded || 1)}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.item._id)}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-lg font-semibold">Total: $ {totalValue}</p>
            <button className="mt-4 rounded-md bg-blue-500 px-6 py-3 text-white transition duration-300 ease-in-out hover:bg-blue-600">
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
