import React, { useState, useEffect } from "react";
import { CardProduct } from "../components/CardProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("Todos");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        let data = await response.json();
        data = data.sort((a, b) => (a.title > b.title ? 1 : -1));
        setOriginalProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectCategory === "Todos") {
      setFilteredProducts(originalProducts);
    } else {
      const filtered = originalProducts.filter(
        (product) => product.category === selectCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectCategory, originalProducts]);

  const handleCategory = (category) => {
    setSelectCategory(category);
  };

  const categories = [
    "Todos",
    "Pañales para niños",
    "Pañales para adultos",
    "Artículos para el hogar",
    "Artículos de limpieza",
    "Tocador",
    "Toallas húmedas",
    "Artículos varios",
    "Novedades",
    "Promoción",
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 bg-gray-100 p-4">
        <button
          className="font-semibold mb-4 flex justify-between w-full md:hidden bg-white p-2 rounded-md shadow-md cursor-pointer pl-5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          Categorías
          <div>
            <FontAwesomeIcon icon={faArrowDown} className="pr-4 h-5" />
          </div>
        </button>
        <ul
          className={`space-y-3 transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-screen" : "max-h-0"
          } md:max-h-screen`}
        >
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer w-fit ${
                selectCategory === category ? "font-bold" : ""
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
        <button
          className="w-full flex pt-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen && (
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-center m-auto h-5 mt-4 md:hidden"
            />
          )}
        </button>
      </div>
      <div className="w-full lg:w-3/4">
        <div>
          <h2 className="text-center font-semibold mt-5">Productos</h2>
          <div>
            {filteredProducts.map((product) => (
              <CardProduct key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
