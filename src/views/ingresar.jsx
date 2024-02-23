// Ingresar.jsx
import React, { useState } from "react";
import Cookies from "js-cookie";
import dotenv from "dotenv";

dotenv.config();

export const Ingresar = () => {
  const [codigoAcceso, setCodigoAcceso] = useState("");

  const handleAccessCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://focaccio-eco-api.vercel.app/api/products/ingresar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigoAcceso }),
      });

      if (response.ok) {
        console.log("Acceso permitido");
        Cookies.set("codigoAcceso", process.env.REACT_APP_ADMIN);
        window.location.href = "/listproducts";
      } else {
        return alert("Codigo incorrecto, intente de nuevo!");
      }
    } catch (error) {
      console.error("Error al ingresar", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleAccessCodeSubmit}
        className="w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ingresa el código de acceso:
          </label>
          <input
            type="password"
            value={codigoAcceso}
            onChange={(e) => setCodigoAcceso(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
