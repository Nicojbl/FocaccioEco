import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const NavBar = () => {
  const { productsAdded } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = productsAdded.reduce(
    (total, product) => total + product.quantityAdded,
    0,
  );

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky left-0 top-0 z-50 m-auto border-b-2 2xl:mx-[200px]">
      <div className="flex justify-between bg-white px-7 py-4 md:flex md:px-10">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src=""
              alt="Logo"
              className="mr-1 h-[50px] w-[90px]"
            />
          </Link>
        </div>
        <ul className="hidden space-x-6 md:m-auto md:flex">
          <li className="text-xl text-gray-800 duration-500 hover:text-gray-400">
            <Link to="/" onClick={closeMobileMenu}>
              Inicio
            </Link>
          </li>
          <li className="text-xl text-gray-800 duration-500 hover:text-gray-400">
            <Link to="/productos" onClick={closeMobileMenu}>
              Catálogo
            </Link>
          </li>
          <li className="text-xl text-gray-800 duration-500 hover:text-gray-400">
            <Link to="/" onClick={closeMobileMenu}>
              Contacto
            </Link>
          </li>
          <li className="text-xl text-gray-800 duration-500 hover:text-gray-400">
            <Link to="/" onClick={closeMobileMenu}>
              Métodos de envío
            </Link>
          </li>
        </ul>

        <div className="relative flex items-center ">
          <Link
            to="/carrito"
            className={`group relative ${
              totalItems > 0 &&
              "animate__animated animate__pulse animate__infinite animate__faster"
            }`}
          >
            <FontAwesomeIcon
              className="mr-6 mt-4 h-5 w-10 text-pink-200 md:h-7 md:w-7"
              icon={faShoppingCart}
            />
            {totalItems > 0 && (
              <span className="text-2sm absolute right-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-400 text-white md:right-2 md:top-2 md:h-5 md:w-5 md:text-lg">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className={`duration-400 ml-4 text-4xl text-gray-600 transition-transform hover:text-gray-800 focus:outline-none md:hidden ${
              isMobileMenuOpen ? "rotate-90 transform" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        } bg-white px-7 md:hidden`}
      >
        <ul className="text-xl">
          <li className="mb-4 text-gray-800 hover:text-gray-400">
            <Link to="/" onClick={closeMobileMenu}>
              Inicio
            </Link>
          </li>
          <li className="mb-4 text-gray-800 hover:text-gray-400">
            <Link to="/productos" onClick={closeMobileMenu}>
              Productos
            </Link>
          </li>
          <li className="mb-4 text-gray-800 hover:text-gray-400">
            <Link to="/" onClick={closeMobileMenu}>
              Contacto
            </Link>
          </li>
          <li className="mb-4 text-gray-800 hover:text-gray-400">
            <Link to="/" onClick={closeMobileMenu}>
              Métodos de envío
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
