import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductsContext";
import { HandleFunctions } from "../controllers/HandleController";

const handleController = new HandleFunctions();

export const ListProducts = () => {
  const { products, loading, setProducts } = useContext(ProductContext);
  const [DeleteLoading, setDeleteLoading] = useState(null);

  const prodSort = products
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const handleEliminar = (prodId) => {
    setDeleteLoading(prodId);
    handleController.handleEliminar(
      prodId,
      products,
      setProducts,
      setDeleteLoading,
    );
  };

  return (
    <div className="mb-16 flex items-center justify-center">
      <div className="w-auto">
        <h1 className="my-4 text-center text-xl font-bold">
          Lista de Productos
        </h1>
        <Link
          to="/addproduct"
          className="mx-auto mb-16 mt-6 block w-[200px] rounded bg-green-200 px-4 py-2 text-center text-green-800 transition-colors hover:bg-green-300"
        >
          Agregar Productos
        </Link>
        {loading ? (
          <div className="text-center">
            <img src="/assets/loading.gif" alt="Cargando..." />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse sm:w-auto">
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
                  {prodSort.map((producto) => (
                    <tr
                      key={producto._id}
                      className="transition-colors hover:bg-gray-100"
                    >
                      <td className="border p-2 text-center">
                        {producto.title}
                      </td>
                      <td className="border p-2 text-center">
                        <img
                          src={`http://localhost:5000/images/${producto._id}.webp`}
                          alt={producto.title}
                          className="pointer-events-none mt-2 w-32  border-pink-200 object-cover"
                        />
                      </td>
                      <td className="border p-2 text-center">
                        {producto.price}
                      </td>
                      <td className="border p-2 text-center">
                        {producto.pricePromo}
                      </td>
                      <td className="border p-2 text-center">
                        {producto.stock}
                      </td>
                      <td className="border p-2 text-center">
                        {producto.category}
                      </td>
                      <td className="border p-2">
                        {DeleteLoading === producto._id ? (
                          <img
                            src="/assets/loading.gif"
                            alt="Eliminando..."
                            className="mx-auto w-[100px]"
                          />
                        ) : (
                        <div className="flex flex-col gap-3 p-5">
                          <Link
                            to={`/updateproduct/${producto._id}`}
                            className="rounded bg-blue-200 px-4 py-2 text-center text-blue-800 transition-colors hover:bg-blue-300"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleEliminar(producto._id)}
                            className="rounded bg-red-200 px-4 py-2 text-center text-red-800 transition-colors hover:bg-red-300"
                          >
                            Eliminar
                          </button>
                        </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
