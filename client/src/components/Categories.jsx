import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Categories = ({ categories, selectCategory, handleCategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const img = [
    { id: "Artículos varios", image: "images/varios.png" },
    { id: "Tocador", image: "images/tocador.png" },
    { id: "Toallas húmedas", image: "images/toallashumedas.png" },
    { id: "Promoción", image: "images/promociones.png" },
    { id: "Pañales para niños", image: "images/pañalniño.png" },
    { id: "Pañales para adultos", image: "images/pañaladulto.png" },
    { id: "Novedades", image: "images/novedades.png" },
    { id: "Artículos de limpieza", image: "images/limpieza.png" },
    { id: "Artículos para el hogar", image: "images/hogar.png" },
  ];

  return (
    <div className="w-full rounded-md border-b-2 bg-white p-6 md:h-fit md:border-2">
      <div className="hidden md:block">
        <h2 className="nunito-text-bold mb-4 text-lg text-gray-800">
          Categorías
        </h2>
        <ul className="">
          {categories.map((category) => {
            const image = img.find((img) => img.id === category);
            return (
              <div key={category} className="items-center">
                <li
                  className={`cursor-pointer border-b pb-1 mt-1 items-center transition-colors flex hover:border-pink-200 ${
                    selectCategory === category
                      ? "font-semibold text-pink-200 "
                      : "text-gray-600"
                  }`}
                  onClick={() => {
                    handleCategory(category);
                  }}
                >
                  {image && (
                    <img
                      src={image.image}
                      alt={image.image}
                      className="w-7 mr-3 "
                    />
                  )}
                  {category}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <button
        className="flex w-full cursor-pointer justify-between rounded-md bg-gray-100 p-2 pl-5 font-semibold shadow-md md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        Categorías
        <div>
          <FontAwesomeIcon icon={faArrowDown} className="pr-2 text-gray-600" />
        </div>
      </button>
      <ul
        className={`space-y-3 overflow-hidden rounded-md bg-gray-100 pl-5 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "mt-4 max-h-screen py-4 opacity-100"
            : "max-h-0 opacity-0"
        } md:hidden`}
      >
        {categories.map((category) => {
          const image = img.find((img) => img.id === category);
          return (
            <li
              key={category}
              className={`cursor-pointer flex items-center ${
                selectCategory === category
                  ? "font-semibold text-pink-200"
                  : "text-gray-600"
              }`}
              onClick={() => {
                handleCategory(category);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              {image && (
                <img
                  src={image.image}
                  alt={image.image}
                  className="w-7 mr-3"
                />
              )}
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
