import React, { useState, useEffect } from "react";
import { CardProduct } from "../components/CardProduct";
import { Categories } from "../components/Categories";
import { InfoCards } from "../components/InfoCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1,
  faTruck,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

export const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://focaccio-eco-api.vercel.app/api/products");
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

  useEffect(() => {
    const results = originalProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, originalProducts]);

  const handleCategory = (category) => {
    setSelectCategory(category);
    setCurrentPage(0);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
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

  const marginPagesDisplayed = window.innerWidth < 768 ? 1 : 3;

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
        <div className="md:m-auto animate__animated animate__backInRight">
          <div className="flex justify-center mt-5">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-2 py-2 border md:w-[300px] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <button className="bg-pink-200 w-11 ml-2 rounded-lg">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: "#ffffff" }}
              />
            </button>
          </div>
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
              pageCount={Math.ceil(
                filteredProducts.length / productsPerPage || 1
              )}
              marginPagesDisplayed={marginPagesDisplayed}
              pageRangeDisplayed={4}
              onPageChange={handlePageClick}
              pageClassName="md:border-2 rounded-full"
              pageLinkClassName="text-gray-700 rounded-full md:w-10 md:h-10 flex items-center justify-center"
              containerClassName={"flex items-center space-x-2 md:space-x-2"}
              activeClassName={
                "bg-pink-200 border-pink-200 md:border-2 rounded-full"
              }
              previousClassName={
                "border-2 text-gray-700 rounded-full px-4 py-2"
              }
              nextClassName={"border-2 text-gray-700 rounded-full px-4 py-2"}
              forcePage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
