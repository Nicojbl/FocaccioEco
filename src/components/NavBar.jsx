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
    0
  );

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b-2 top-0 left-0 m-auto sticky z-50 xl:mx-[200px]">
      <div className="md:flex flex justify-between bg-white py-4 md:px-10 px-7">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="images/logo.jpg" alt="Logo" className="w-[90px] h-[50px] mr-1" />
          </Link>
        </div>
        <ul className="hidden md:flex md:m-auto space-x-6">
          <li className="text-gray-800 hover:text-gray-400 text-2xl duration-500">
            <Link to="/" onClick={closeMobileMenu}>
              Inicio
            </Link>
          </li>
          <li className="text-gray-800 hover:text-gray-400 text-2xl duration-500">
            <Link to="/productos" onClick={closeMobileMenu}>
              Productos
            </Link>
          </li>
          <li className="text-gray-800 hover:text-gray-400 text-2xl duration-500">
            <Link to="/" onClick={closeMobileMenu}>
              Contacto
            </Link>
          </li>
          <li className="text-gray-800 hover:text-gray-400 text-2xl duration-500">
            <Link to="/" onClick={closeMobileMenu}>
              Métodos de envío
            </Link>
          </li>
        </ul>

        <div className="flex items-center relative">
          <Link to="/carrito" className="group relative">
            <FontAwesomeIcon className="w-10 h-5 mr-6 mt-4 md:h-8 md:w-10" icon={faShoppingCart} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-6 md:right-4 md:-top-0 bg-red-500 text-white rounded-full w-5 h-5 md:w-7 md:h-7 text-lg flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className={`text-gray-600 hover:text-gray-800 focus:outline-none text-4xl ml-4 md:hidden transition-transform duration-400 ${
              isMobileMenuOpen ? "transform rotate-90" : ""
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        } md:hidden bg-white px-7`}
      >
        <ul className="text-xl">
          <li className="text-gray-800 hover:text-gray-400 mb-4">
            <Link to="/" onClick={closeMobileMenu}>
              Inicio
            </Link>
          </li>
          <li className="text-gray-800 hover:text-gray-400 mb-4">
            <Link to="/productos" onClick={closeMobileMenu}>
              Productos
            </Link>
          </li>
          <li className="text-gray-800 hover:text-gray-400 mb-4">
            <Link to="/" onClick={closeMobileMenu}>
              Contacto
            </Link>
          </li>
          <li className="text-gray-800 hover:text-gray-400 mb-4">
            <Link to="/" onClick={closeMobileMenu}>
              Métodos de envío
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
