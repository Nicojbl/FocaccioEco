import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductsContext";
import { HandleFunctions } from "../controllers/HandleController";

const handleController = new HandleFunctions();

export const UpdateProduct = () => {
  const { id } = useParams();
  const { updateProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    pricePromo: 0,
    stock: 0,
    category: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto();
  }, [id]);

  const handleUpdate = () => {
    if (product.pricePromo === null || product.pricePromo === "") {
      product.pricePromo = 0;
    }
    if (
      !product.title ||
      !product.price ||
      product.pricePromo === null ||
      !product.stock ||
      !product.category ||
      !product.description
    ) {
      return alert(
        "Error al actualizar el producto, recuerde no dejar campos vacíos",
      );
    } else {
      setLoading(true);
      handleController.handleUpdate(id, product, updateProduct, setLoading);
    }
  };

  return (
    <div className="sm:m-[20px]">
      <h1 className="mb-4 w-full text-center text-xl font-bold">
        Actualizar Producto
      </h1>
      {product && (
        <form className="mx-auto w-[600px]">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Precio
            </label>
            <input
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Precio promoción
            </label>
            <input
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={product.pricePromo}
              onChange={(e) =>
                setProduct({ ...product, pricePromo: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Stock
            </label>
            <input
              type="text"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Categoría
            </label>
            <select
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            >
              <option value="Pañales para niños">Pañales para niños</option>
              <option value="Pañales para adultos">Pañales para adultos</option>
              <option value="Artículos para el hogar">
                Artículos para el hogar
              </option>
              <option value="Artículos de limpieza">
                Artículos de Limpieza
              </option>
              <option value="Artículos varios">Artículos varios</option>
              <option value="Tocador">Tocador</option>
              <option value="Toallas húmedas">Toallas húmedas</option>
              <option value="Novedades">Novedades</option>
              <option value="Promoción">Promoción</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Descripción
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
          {loading ? (
            <img
              src="/assets/loading.gif"
              alt="cargando"
              className="m-auto w-[100px]"
            />
          ) : (
            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700 focus:outline-none"
                type="button"
                onClick={handleUpdate}
              >
                Actualizar
              </button>
            </div>
          )}
          <Link
            to="/listproducts"
            className="mx-[200px] mb-20 mt-12 block w-[200px] rounded bg-green-200 px-4 py-2 text-center text-green-800 transition-colors hover:bg-green-300"
          >
            Lista de Productos
          </Link>
        </form>
      )}
    </div>
  );
};
