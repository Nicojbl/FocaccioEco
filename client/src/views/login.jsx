import React, { useState } from "react";
import Cookies from "js-cookie";

export const Login = () => {
  const [codigoAcceso, setCodigoAcceso] = useState("");
  const handleAccessCodeSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/products/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigoAcceso }),
      });

      if (response.ok) {
        const token = await response.json();
        Cookies.set("token", token);
        window.location.href = "/listProducts";
      } else {
        return alert("Codigo incorrecto, intente de nuevo!");
      }
    } catch (error) {
      console.error("Error al ingresar", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleAccessCodeSubmit}
        className="mb-4 w-96 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Ingresa el código de acceso:
          </label>
          <input
            type="password"
            value={codigoAcceso}
            onChange={(e) => setCodigoAcceso(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
