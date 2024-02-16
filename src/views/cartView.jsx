import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const CartView = () => {
  const { productsAdded: items, removeItem } = useContext(CartContext);

  const handleRemove = (itemId) => {
    removeItem(itemId);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-3xl font-semibold bg-gray-800 text-white py-4 px-6">
        Carrito de Compras
      </h2>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No hay productos en el carrito.</p>
          <Link to="/" className="text-blue-500 hover:underline">
            Volver al inicio
          </Link>
        </div>
      ) : (
        <div className="p-6">
          <ul>
            {items.map((item) => (
              <li
                key={item.item._id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:5000/images/${item.item._id}.jpg`}
                    alt={item.item.title}
                    className="w-20 h-20 object-cover rounded"
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
            <p className="text-lg font-semibold">
              Total: $
              {items.reduce(
                (acc, item) =>
                  acc + item.item.price * (item.quantityAdded || 1),
                0
              )}
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-4 rounded-md transition duration-300 ease-in-out">
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
