import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Categories = ({ categories, selectCategory, handleCategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full rounded-md border-b-2 bg-white p-6 md:h-fit md:border-2">
      <div className="hidden md:block">
        <h2 className="nunito-text-bold mb-4 text-lg text-gray-800">
          Categorías
        </h2>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer border-b transition-colors hover:border-gray-300 ${
                selectCategory === category
                  ? "font-semibold text-pink-200 "
                  : "text-gray-600"
              }`}
              onClick={() => {
                handleCategory(category);
              }}
            >
              {category}
            </li>
          ))}
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
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer ${
              selectCategory === category
                ? "font-semibold text-pink-200"
                : "text-gray-600"
            }`}
            onClick={() => {
              handleCategory(category);
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
