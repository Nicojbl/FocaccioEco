import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ContactoContext } from "../context/ContactoContext";
import "../index.css";

export const NavBar = () => {
  const { productsAdded, totalValue } = useContext(CartContext);
  const { contactoSelected } = useContext(ContactoContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = productsAdded.reduce(
    (total, product) => total + product.quantityAdded,
    0,
  );

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleContacto = () => {
    contactoSelected();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };
  return (
    <nav className="z-index sticky left-0 top-0 m-auto border-b 2xl:mx-[200px]">
      <div className="flex justify-between bg-zinc-50 px-7 py-4 md:flex md:px-10">
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/images/logo.webp"
              alt="Logo"
              className="mr-1 h-[25px] w-[100px]"
            />
          </Link>
        </div>
        <ul className="my-auto ml-auto mr-28 hidden space-x-6 md:flex">
          <li className="nunito-text-regular text-xl text-gray-800 duration-500 hover:text-pink-200">
            <Link to="/">Inicio</Link>
          </li>
          <li className="nunito-text-regular text-xl text-gray-800 duration-500 hover:text-pink-200">
            <Link to="/productos">Catálogo</Link>
          </li>

          <li className="nunito-text-regular text-xl text-gray-800 duration-500 hover:text-pink-200">
            <Link to="/" onClick={handleContacto}>
              Contacto
            </Link>
          </li>
        </ul>
        <div className="relative flex items-center ">
          <div className="mr-4 md:mr-6">
            <p className=" md:text-sm">Carrito</p>
            <p className="nunito-text-regular text-xs text-green-400 md:text-lg">
              ${totalValue === 0 ? "0.00" : totalValue.toFixed()}
            </p>
          </div>
          <Link
            to="/carrito"
            className={`group relative mr-3 md:mr-7 ${
              totalItems > 0 &&
              "animate__animated animate__pulse animate__infinite animate__faster"
            }`}
          >
            <FontAwesomeIcon
              className="flex h-6 items-center justify-center text-pink-200 md:h-7 md:w-7"
              icon={faShoppingCart}
            />
            {totalItems > 0 && (
              <span className="text-2sm absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-400 text-white md:-right-2 md:h-5 md:w-5 md:text-lg">
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
        } bg-zinc-50 px-7 md:hidden`}
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
            <Link to="/" onClick={handleContacto}>
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
