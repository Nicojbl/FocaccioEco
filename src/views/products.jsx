import React, { useState, useEffect } from "react";
import { CardProduct } from "../components/CardProduct";
import { Categories } from "../components/categories";
import { InfoCards } from "../components/infoCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1,
  faTruck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from 'react-paginate';

export const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(8);

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
    setCurrentPage(0);
  }, [selectCategory, originalProducts]);

  const handleCategory = (category) => {
    setSelectCategory(category);
    setCurrentPage(0);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="xl:mx-[200px]">
      <div className="md:flex md:mt-[50px] md:gap-3">
        <div className="md:w-[350px] md:w-min-[300px]">
          <Categories
            categories={categories}
            selectCategory={selectCategory}
            handleCategory={handleCategory}
          />
          <InfoCards
            icon={
              <FontAwesomeIcon
                icon={faTruck}
                className="my-auto mr-2 text-xl text-pink-400"
              />
            }
            title="Envíos"
            description="Envíos a todo el país (a modificar)"
          />
          <InfoCards
            icon={
              <FontAwesomeIcon
                icon={faLocationDot}
                className="my-auto mr-1 text-xl text-pink-400"
              />
            }
            title="Pick Up"
            description="Retira tu pedido al día siguiente en nuestros pick up (a modificar)"
          />
          <InfoCards
            icon={
              <FontAwesomeIcon
                icon={faMoneyBill1}
                className="my-auto mr-1 text-xl text-pink-400"
              />
            }
            title="Formas de pago"
            description="Aceptamos Efectivo, Crédito, Débito y Transferencia bancaria (a modificar)"
          />
        </div>
        <div className="md:m-auto">
          <h2 className="text-center font-semibold mt-5">Productos</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 md:gap-3">
            {currentProducts.map((product) => (
              <CardProduct key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-center my-6">
            <ReactPaginate
              previousLabel={"Anterior"}
              nextLabel={"Siguiente"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
              marginPagesDisplayed={3}
              pageRangeDisplayed={4}
              onPageChange={handlePageClick}
              pageClassName="md:border-2 rounded-full"
              pageLinkClassName="text-gray-700 rounded-full md:w-10 md:h-10 flex items-center justify-center"
              containerClassName={"flex items-center md:space-x-2 gap-1 md:space-x-6"}
              activeClassName={"bg-pink-200 border-pink-200 md:border-2 rounded-full"}
              previousClassName={"border-2 text-gray-700 rounded-full px-4 py-2"}
              nextClassName={"border-2 text-gray-700 rounded-full px-4 py-2"}
              forcePage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
