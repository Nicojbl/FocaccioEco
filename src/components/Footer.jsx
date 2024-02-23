import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl font-bold">Mi Sitio Web</span>
          <span>Dirección, Ciudad</span>
          <span>Email: info@misitioweb.com</span>
        </div>
        <div className="flex">
          <a
            href="instagram.com"
            className="mx-2 hover:text-gray-500 transition-colors duration-300"
          >
            Inicio
          </a>
          <a
            href="facebook.com"
            className="mx-2 hover:text-gray-500 transition-colors duration-300"
          >
            Servicios
          </a>
          <a
            href="whatsapp.com"
            className="mx-2 hover:text-gray-500 transition-colors duration-300"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};
