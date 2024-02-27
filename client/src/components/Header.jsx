import React from "react";
import { Carousel } from "./Carousel";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export const Header = () => {
  let slides = [
    { id: 1, image: "images/bbtips.webp" },
    { id: 2, image: "images/indoprotect.webp" },
    { id: 3, image: "images/mimlot.webp" },
    { id: 4, image: "images/tena.webp" },
  ];
  return (
    <header className="relative border-b-2 md:flex xl:mx-[200px]">
      <div className="absolute inset-0">
        <img
          src="images/bgheader.webp"
          alt="Background"
          className="-mt-12 h-[25%] object-cover md:mt-0.5 md:h-[60%] md:w-[50%]"
        />
      </div>
      <div className="animate__animated animate__slideInDown relative z-10 mb-9 shadow-xl shadow-pink-200 md:w-[50%] md:shadow-none">
        <div className="border-b-2 pb-12 md:border-none">
          <img
            src="images/logofocaccio.webp"
            alt="Pañalera focaccio"
            className="m-auto mb-12 mt-12 h-[70%] w-[70%] md:w-[40%]"
          />
          <h1 className="caveat-semibold mx-10 text-center text-xl text-black">
            Tenemos todo lo que necesitas para tu bebé y para vos también.
          </h1>
          <div className="mt-7 flex justify-center">
            <div className="grid grid-cols-1 gap-5">
              <a href="https://facebook/pañalerafocaccio.com">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-4xl text-pink-200"
                  />
                  <p className="nunito-text-regular ml-2">
                    Contáctenos por Facebook!
                  </p>
                </div>
              </a>
              <a href="https://wa.me/95092008">
                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faSquareWhatsapp}
                    className="ml-0.5 text-4xl text-pink-200"
                  />
                  <p className="nunito-text-regular ml-2">094561790</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="md:m-auto md:w-[50%]">
        <Carousel slides={slides} />
      </div>
    </header>
  );
};
