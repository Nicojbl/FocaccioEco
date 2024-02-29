import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartContextProvider } from "./context/CartContext";
import { ProductContextProvider } from "./context/ProductsContext";
import { ContactoContextProvider} from "./context/ContactoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductContextProvider>
      <ContactoContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ContactoContextProvider>
    </ProductContextProvider>
  </React.StrictMode>,
);

reportWebVitals();
