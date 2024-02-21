import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export const Categories = ({ categories, selectCategory, handleCategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full md:h-fit p-6 bg-white md:border-2 border-b-2 rounded-md">
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Categorías</h2>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer border-b hover:border-gray-300 transition-colors ${
                selectCategory === category
                  ? "font-semibold text-gray-700"
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
        className="font-semibold flex justify-between w-full md:hidden bg-gray-100 p-2 rounded-md shadow-md cursor-pointer pl-5"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        Categorías
        <div>
          <FontAwesomeIcon icon={faArrowDown} className="pr-2 text-gray-600" />
        </div>
      </button>
      <ul
  className={`space-y-3 pl-5 transition-all duration-300 ease-in-out overflow-hidden bg-gray-100 rounded-md ${
    isMobileMenuOpen ? "max-h-screen opacity-100 mt-4 py-4" : "max-h-0 opacity-0"
  } md:hidden`}
>
  {categories.map((category) => (
    <li
      key={category}
      className={`cursor-pointer ${
        selectCategory === category ? "font-semibold text-gray-700" : "text-gray-600"
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
