import React, { useState, useEffect } from "react";
import { CardProduct } from "../components/CardProduct";
import { Categories } from "../components/categories";

export const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className="xl:mx-[200px]">
      <div className="md:flex md:mt-[50px] md:gap-3">
      <Categories
        categories={categories}
        selectCategory={selectCategory}
        handleCategory={handleCategory}
      />
        <div className="md:m-auto">
          <h2 className="text-center font-semibold mt-5">Productos</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 md:gap-3">
            {currentProducts.map((product) => (
              <CardProduct key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
            >
              Anterior
            </button>
            <span className="mr-2 my-auto">{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastProduct >= filteredProducts.length}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-md"
            >
              Siguiente
            </button>
            <span className="my-auto">{`Mostrando ${
              indexOfFirstProduct + 1
            } - ${Math.min(indexOfLastProduct, filteredProducts.length)} de ${
              filteredProducts.length
            } productos`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
