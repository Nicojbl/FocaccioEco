import React, { createContext, useState } from "react";

export const ContactoContext = createContext();

export const ContactoContextProvider = ({ children }) => {
  const [contacto, setContacto] = useState(false);

  const contactoSelected = () => {
    setTimeout(() => {
      setContacto(true);
    }, 1000);
    setTimeout(() => {
      setContacto(false);
    }, 2500);
  };

  const contactoContextValue = {
    contactoSelected,
    contacto,
  };

  return (
    <ContactoContext.Provider value={contactoContextValue}>
      {children}
    </ContactoContext.Provider>
  );
}