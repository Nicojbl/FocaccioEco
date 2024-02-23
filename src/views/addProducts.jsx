import { useState } from "react";
import { Link } from "react-router-dom";

export const AddProducts = () => {
  const [datos, setDatos] = useState({
    title: "",
    description: "",
    price: "",
    pricePromo: 0,
    stock: "",
    category: "",
  });
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "img") {
      setImg(e.target.files[0]);
    } else if (name === "category") {
      // Obtener el valor seleccionado de la categoría desde el evento
      const selectedCategory = e.target.value;
      setDatos({ ...datos, category: selectedCategory });
    } else {
      setDatos({ ...datos, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("img", img);
      formData.append("title", datos.title);
      formData.append("description", datos.description);
      formData.append("price", datos.price);
      formData.append("pricePromo", datos.pricePromo);
      formData.append("stock", datos.stock);
      formData.append("category", datos.category);

      if (
        !img ||
        !datos.title ||
        !datos.description ||
        !datos.price ||
        !datos.stock ||
        !datos.category
      ) {
        return alert(
          "Por favor rellene todos los campos obligatorios, si el producto no tiene promoción déjelo en 0!"
        );
      }

      await fetch("http://localhost:5000/api/products/addProduct", {
        method: "POST",
        body: formData,
      });

      console.log("Producto agregado correctamente!");
    } catch (error) {
      console.error("Error al agregar el producto", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="lg:m-[200px]">
        <p className="mb-4">
          ATENCIÓN! todos los espacios son requeridos MENOS el de precio
          promoción que se deja en 0!
          <br /> si el producto NO tiene promoción. <br />
          En el caso que el producto cuente con promoción se le agrega el valor
          precio y el valor promoción.
        </p>
        <form onSubmit={handleSubmit} className="w-[600px]">
          <div className="flex flex-row mb-4">
            <label className="w-1/4 border p-2">Imagen:</label>
            <input
              type="file"
              label="Image"
              name="img"
              id="file-upload"
              accept=".webp, .png, .jpg"
              onChange={handleChange}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-1/4 border p-2">Título:</label>
            <input
              type="text"
              name="title"
              value={datos.title}
              onChange={handleChange}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-1/4 border p-2">Descripción:</label>
            <input
              type="text"
              name="description"
              value={datos.description}
              onChange={handleChange}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-1/4 border p-2">Precio:</label>
            <input
              type="number"
              name="price"
              value={datos.price}
              onChange={handleChange}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-1/4 border p-2">Precio promoción:</label>
            <input
              type="number"
              name="pricePromo"
              value={datos.pricePromo}
              onChange={handleChange}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-1/4 border p-2">Stock:</label>
            <input
              type="number"
              name="stock"
              value={datos.stock}
              onChange={handleChange}
              className="w-3/4 border p-2"
            />
          </div>
          <div className="flex flex-row mb-4">
            <label className="w-1/4 border p-2">Categoría:</label>
            <select
              name="category"
              value={datos.category}
              onChange={handleChange}
              className="w-3/4 border p-2"
            >
              <option>-- Seleccionar categoría --</option>
              <option value="Pañales para niños">Pañales para niños</option>
              <option value="Pañales para adultos">Pañales para adultos</option>
              <hr />
              <option value="Artículos para el hogar">
                Artículos para el hogar
              </option>
              <option value="Artículos de Limpieza">
                Artículos de Limpieza
              </option>
              <option value="Artículos varios">Artículos varios</option>
              <hr />
              <option value="Tocador">Tocador</option>
              <option value="Toallas húmedas">Toallas húmedas</option>
              <hr />
              <option value="Novedades">Novedades</option>
              <option value="Promoción">Promoción</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 transition duration-300 ease-in-out"
            >
              Agregar Producto
            </button>
          </div>
          <Link
            to="/listproducts"
            className="bg-green-200 hover:bg-green-300 text-green-800 py-2 px-4 rounded transition-colors block w-[200px] text-center mt-[100px] mx-auto"
          >
            Lista de Productos
          </Link>
        </form>
      </div>
    </div>
  );
};
