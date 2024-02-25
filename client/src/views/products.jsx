import React, { useState, useEffect } from "react";
import { CardProduct } from "../components/CardProduct";
import { Categories } from "../components/Categories";
import { InfoCards } from "../components/InfoCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InViewAnimationRight } from "../components/InViewAnimation";
import {
  faMoneyBill1,
  faTruck,
  faLocationDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import "../index.css";

export const Products = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        let data = await response.json();
        data = data.sort((a, b) => (a.title > b.title ? 1 : -1));
        setOriginalProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectCategory === "Todos") {
      setFilteredProducts(originalProducts);
    } else {
      const filtered = originalProducts.filter(
        (product) => product.category === selectCategory,
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(0);
  }, [selectCategory, originalProducts]);

  useEffect(() => {
    const results = originalProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
    indexOfLastProduct,
  );

  const marginPagesDisplayed = window.innerWidth < 768 ? 1 : 3;

  return (
    <div className="md:mt-[50px] md:flex md:gap-3 2xl:mx-[200px]">
      <div className="md:w-min-[300px] md:w-[350px]">
        <Categories
          categories={categories}
          selectCategory={selectCategory}
          handleCategory={handleCategory}
        />
        <div className="hidden md:block">
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
        <div>
          <div className="mt-5">
            <iframe
              title="Mapa de ubicación"
              src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d31160.805733596277!2d-55.96484974605771!3d-34.821631955535906!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzTCsDQ5JzIzLjYiUyA1NcKwNTcnMDguMyJX!5e0!3m2!1ses-419!2suy!4v1708838882774!5m2!1ses-419!2suy"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mb-9 h-[400px] w-full rounded-md border-2 border-gray-300"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="md:m-auto md:w-full">
        <InViewAnimationRight>
          <div>
            <h2 className="nunito-text-black mt-3 text-center text-2xl">
              Catálogo
            </h2>
            <p className="nunito-text-regular text-center">
              aquí encontraras todo lo que buscas y mas!
            </p>
          </div>
        </InViewAnimationRight>
        <div className="mt-5 flex justify-center">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearch}
            className="rounded-l-lg border border-r-0 border-gray-300 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 md:w-[300px]"
          />
          <button className="w-11 rounded-r-lg bg-pink-200">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#ffffff" }}
            />
          </button>
        </div>
        {loading ? (
          <div className="mt-8 flex justify-center">
            <img src="/assets/loading.gif" alt="Cargando..." />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <CardProduct key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="my-9 flex justify-center">
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            breakLabel={"..."}
            pageCount={Math.ceil(
              filteredProducts.length / productsPerPage || 1,
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
            previousClassName={"border-2 text-gray-700 rounded-full px-4 py-2"}
            nextClassName={"border-2 text-gray-700 rounded-full px-4 py-2"}
            forcePage={currentPage}
          />
        </div>
      </div>
      <div className="mx-4 mb-5 md:hidden">
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
    </div>
  );
};
