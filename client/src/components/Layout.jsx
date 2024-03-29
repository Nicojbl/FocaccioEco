import React from "react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export const Layout = ({ children }) => {
    return (
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>
    );
  };
  