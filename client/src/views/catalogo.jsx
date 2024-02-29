import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context/ProductsContext";
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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "../index.css";

export const Catalogo = () => {
  const { products, loading } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectCategory, setSelectCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(8);

  useEffect(() => {
    setCurrentPage(0);

    const sortedProducts = products.slice().sort((a, b) => b.stock - a.stock);

    let results = sortedProducts;

    if (selectCategory !== "Todos") {
      results = results.filter(
        (product) => product.category === selectCategory,
      );
    }

    if (searchTerm) {
      results = results.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredProducts(results);
  }, [selectCategory, searchTerm, products]);

  const handleCategory = (category) => {
    setSelectCategory(category);
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

  const defaultIcon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="md:flex md:gap-3 md:pt-[50px] 2xl:mx-[200px]">
      <div className="md:w-min-[400px] bg-zinc-50 p-5 md:w-[400px] md:bg-transparent">
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
        <div className="mt-5 hidden rounded-md border-2 md:block">
          <MapContainer
            center={[-34.82315029685729, -55.95229568766442]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[-34.82315029685729, -55.95229568766442]}
              icon={defaultIcon}
            >
              <Popup>Pañalera Focaccio</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <div className="mt-5 md:mx-auto">
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
          <div className="md:h-[900px]">
            <div className="mx-auto mt-7 flex justify-center">
              <img src="/assets/loading.gif" alt="Cargando..." />
            </div>
          </div>
        ) : (
          <div className="mb-20 grid md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <CardProduct key={product._id} product={product} />
            ))}
          </div>
        )}
        <div className="flex justify-center">
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
      <div className="mx-4 mb-5">
        <div className="md:hidden">
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
        <div className="mt-5 rounded-md border-2 md:hidden">
          <MapContainer
            center={[-34.82315029685729, -55.95229568766442]}
            zoom={13}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[-34.82315029685729, -55.95229568766442]}
              icon={defaultIcon}
            >
              <Popup>Pañalera Focaccio</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
