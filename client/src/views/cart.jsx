import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faChevronRight,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

export const Cart = () => {
  const { productsAdded, removeItem, plusQuantity, minusQuantity, totalValue } =
    useContext(CartContext);

  const handleRemove = (itemId) => {
    removeItem(itemId);
  };

  const handlePlus = (itemId, stock) => {
    const maxQuantity = stock;
    plusQuantity(itemId, maxQuantity);
  };

  const handleMinus = (itemId) => {
    minusQuantity(itemId);
  };

  return (
    <div className="mx-5 mt-8 max-w-4xl overflow-hidden rounded-lg bg-white shadow-md">
      <div className="nunito-text-bold divide-x-8 divide-transparent bg-gray-800 p-4 text-center text-white">
        <span className="text-pink-200">Carrito</span>
        <FontAwesomeIcon icon={faChevronRight} />
        <span>Checkout</span>
        <FontAwesomeIcon icon={faChevronRight} />
        <span>Finalizar Compra</span>
      </div>
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
                className="items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="mb-3 flex items-center">
                  <img
                    src={`http://localhost:5000/images/${item.item._id}.webp`}
                    alt={item.item.title}
                    className="h-20 w-20 rounded object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.item.title}</h3>
                    <div className="text-gray-600 sm:flex">
                      <span>Cantidad:</span>
                      <div className="w-fit rounded-sm border">
                        <button
                          onClick={() => handleMinus(item.item._id)}
                          className="px-2 transition duration-200 hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="border-x px-3">
                          {item.quantityAdded}
                        </span>
                        <button
                          onClick={() =>
                            handlePlus(item.item._id, item.item.stock)
                          }
                          className="px-2 transition duration-200 hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                    {item.item.pricePromo > 0 ? (
                      <p className="text-gray-600">
                        SubTotal: $
                        {item.item.pricePromo * (item.quantityAdded || 1)}
                      </p>
                    ) : (
                      <p className="text-gray-600">
                        SubTotal: ${item.item.price * (item.quantityAdded || 1)}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemove(item.item._id)}
                    className="w-full rounded-lg border p-2 text-red-600 hover:text-red-800 focus:outline-none"
                  >
                    Eliminar <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-end">
            <p className="text-lg font-semibold">
              Total: $ {totalValue}
              <span className="text-xs font-light ml-2">IVA inc.</span>
            </p>
          </div>
          <div className="mt-8 flex justify-end">
            <button className="mt-4 rounded-md bg-pink-200 px-6 py-3 text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-pink-300">
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
