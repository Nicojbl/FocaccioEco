import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ListProducts = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        let data = await response.json();
        data = data.sort((a, b) => (a.title > b.title ? 1 : -1));
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEliminar = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProductos(productos.filter((producto) => producto._id !== id));
        console.log("Producto eliminado con ID:", id);
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-auto">
        <h1 className="text-xl font-bold mb-4 text-center">
          Lista de Productos
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full sm:w-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Imagen</th>
                <th className="border p-2">Precio</th>
                <th className="border p-2">Precio promoción</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Categoría</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr
                  key={producto._id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="border p-2 text-center">{producto.title}</td>
                  <td className="border p-2 text-center">{producto.img}</td>
                  <td className="border p-2 text-center">{producto.price}</td>
                  <td className="border p-2 text-center">{producto.pricePromo}</td>
                  <td className="border p-2 text-center">{producto.stock}</td>
                  <td className="border p-2 text-center">{producto.category}</td>
                  <td className="border p-2 whitespace-nowrap space-x-2 flex justify-center">
                    <Link
                      to={`/updateproduct/${producto._id}`}
                      className="bg-blue-200 hover:bg-blue-300 text-blue-800 py-2 px-4 rounded transition-colors"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleEliminar(producto._id)}
                      className="bg-red-200 hover:bg-red-300 text-red-800 py-2 px-4 rounded transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          to="/addproduct"
          className="bg-green-200 mt-6 hover:bg-green-300 text-green-800 py-2 px-4 rounded transition-colors block w-[200px] text-center mx-auto"
        >
          Agregar Productos
        </Link>
      </div>
    </div>
  );
};
