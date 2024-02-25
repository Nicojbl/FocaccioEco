import React from "react";
import { Carousel } from "./Carousel";
import "../index.css";

export const Header = () => {
  let slides = [
    { id: 1, image: "images/bbtips.webp" },
    { id: 2, image: "images/indoprotect.webp" },
    { id: 3, image: "images/mimlot.webp" },
    { id: 4, image: "images/tena.webp" },
  ];
  return (
    <header className="md:flex xl:mx-[200px] justify-between">
      <div className="flex justify-center items-center md:w-[30%] h-[140px] md:h-auto bg-pink-200 animate__animated animate__slideInDown">
        <div className="text-center">
          <h1 className="nunito-text-black text-4xl">Pañalera Focaccio</h1>
          <p>Tenemos todo lo que buscas y más!</p>
        </div>
      </div>
      <div className="md:w-[70%]">
        <Carousel slides={slides} />
      </div>
    </header>
  );
};
