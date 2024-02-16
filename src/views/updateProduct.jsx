import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    pricePromo: 0,
    stock: 0,
    category: "",
  });

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto();
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.category
      ) {
        return alert(
          "Por favor rellene todos los campos obligatorios, si el producto no tiene promoción déjelo en 0!"
        );
      }
      const response = await fetch(
        `http://localhost:5000/api/products/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      if (response.ok) {
        return alert("producto actualizado correctamente!");
      } else {
        return alert(
          "Por favor rellene todos los campos obligatorios, si el producto no tiene promoción déjelo en 0!"
        );
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className="sm:m-[20px]">
      <h1 className="text-xl font-bold mb-4 text-center w-full">
        Actualizar Producto
      </h1>
      {product && (
        <form className="w-[600px] mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Precio
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Precio promoción
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={product.pricePromo}
              onChange={(e) =>
                setProduct({ ...product, pricePromo: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Stock
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Categoría
            </label>
            <select
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="Pañales para niños">Pañales para niños</option>
              <option value="Pañales para adultos">Pañales para adultos</option>
              <option value="Artículos para el hogar">
                Artículos para el hogar
              </option>
              <option value="Tocador">Tocador</option>
              <option value="Toallas húmedas">Toallas húmedas</option>
              <option value="Artículos de Limpieza">
                Artículos de Limpieza
              </option>
              <option value="Artículos varios">Artículos varios</option>
              <option value="Novedades">Novedades</option>
              <option value="Promoción">Promoción</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descripción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center w-full"
              type="button"
              onClick={handleUpdate}
            >
              Actualizar
            </button>
          </div>
          <Link
            to="/listproducts"
            className="bg-green-200 mt-6 hover:bg-green-300 text-green-800 py-2 px-4 rounded transition-colors block w-[200px] text-center mx-[200px]"
          >
            Lista de Productos
          </Link>
        </form>
      )}
    </div>
  );
};
