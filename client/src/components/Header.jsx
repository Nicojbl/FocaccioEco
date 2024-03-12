import React, { useContext } from "react";
import { Carousel } from "./Carousel";
import "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { ContactoContext } from "../context/ContactoContext";
import { InViewAnimationShake } from "./InViewAnimation";

export const Header = () => {
  const { contacto } = useContext(ContactoContext);

  let slides = [
    { id: 1, image: "images/bbtips.webp" },
    { id: 2, image: "images/indoprotect.webp" },
    { id: 3, image: "images/mimlot.webp" },
    { id: 4, image: "images/tena.webp" },
  ];
  return (
    <header className="md:relative md:flex 2xl:mx-[200px]">
      <div className="absolute -mt-12 h-[100%] w-[100%] md:inset-0 md:mt-0 md:h-full">
        <img
          src="images/bgheader1.svg"
          alt="Background"
          className="h-[100%] w-full object-cover md:p-0.5"
        />
      </div>
      <div className="animate__animated animate__slideInDown relative z-10 shadow-xl shadow-pink-200 md:w-[50%] md:shadow-none">
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
            {contacto === true ? (
              <>
                <InViewAnimationShake>
                  <div className="grid grid-cols-1 gap-5">
                    <a
                      href="https://facebook/pañalerafocaccio.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="text-4xl text-violet-900"
                        />
                        <p className="nunito-text-regular ml-2 hover:text-violet-900">
                          Contáctenos por Facebook!
                        </p>
                      </div>
                    </a>
                    <a
                      href="https://wa.me/95092008"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex items-center">
                        <FontAwesomeIcon
                          icon={faSquareWhatsapp}
                          className="ml-0.5 text-4xl text-green-300"
                        />
                        <p className="nunito-text-regular ml-2 hover:text-green-300">
                          Abrir chat
                        </p>
                      </div>
                    </a>
                  </div>
                </InViewAnimationShake>
              </>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                <a
                  href="https://facebook/pañalerafocaccio.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="rounded-full bg-white text-4xl text-violet-900"
                    />
                    <p className="nunito-text-regular ml-2 hover:text-violet-900">
                      Contáctenos por Facebook!
                    </p>
                  </div>
                </a>
                <a
                  href="https://wa.me/95092008"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faSquareWhatsapp}
                      className="ml-0.5 text-4xl text-green-300"
                    />
                    <p className="nunito-text-regular ml-2 hover:text-green-300">
                      Abrir chat
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my-auto md:w-[50%] ">
        <Carousel slides={slides} />
      </div>
    </header>
  );
};
