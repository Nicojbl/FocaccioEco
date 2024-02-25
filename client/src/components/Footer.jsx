import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 text-gray-300 2xl:mx-[200px]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-bold">Mi Sitio Web</span>
          <span>Dirección, Ciudad</span>
          <span>Email: info@misitioweb.com</span>
        </div>
        <div className="flex">
          <a
            href="instagram.com"
            className="mx-2 transition-colors duration-300 hover:text-gray-500"
          >
            Inicio
          </a>
          <a
            href="facebook.com"
            className="mx-2 transition-colors duration-300 hover:text-gray-500"
          >
            Servicios
          </a>
          <a
            href="whatsapp.com"
            className="mx-2 transition-colors duration-300 hover:text-gray-500"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};
