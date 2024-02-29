import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer className="py-6 2xl:mx-[200px]">
      <div className="mb-3 flex flex-col items-center border-b">
        <div className="flex flex-col">
          <span className="text-xl font-bold">
            Aceptamos multiples tarjetas
          </span>
          <span>Email: info@misitioweb.com</span>
        </div>
      </div>
      <div className="w-full">
        <div className="m-auto w-fit">
          <p className="nunito-text-semiRegular ml-5">
            Focaccio Ecommerce.© 2024
          </p>
          <a
            href="https://www.linkedin.com/in/nicolas-basso-aa3a791ab/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="nunito-text-semiRegular">
              <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
              Developed by Nicolas Basso.
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
};
