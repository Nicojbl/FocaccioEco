import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [productsAdded, setProductsAdded] = useState([]);

  const addProduct = (item, quantity) => {
    const isAlreadyAdded = isInCart(item._id);

    setProductsAdded((prevState) =>
      isAlreadyAdded
        ? prevState.map((product) =>
            product.item._id === item._id
              ? {
                  ...product,
                  quantityAdded: (product.quantityAdded || 0) + quantity,
                }
              : product
          )
        : [...prevState, { item, quantityAdded: quantity }]
    );
  };

  const updateProduct = (updatedProducts) => {
    setProductsAdded(updatedProducts);
  };

  const removeItem = (itemId) => {
    const updatedProducts = productsAdded.filter(
      (product) => product.item._id !== itemId
    );
    setProductsAdded(updatedProducts);
  };

  const isInCart = (itemId) => {
    return Boolean(
      productsAdded.find((product) => product.item._id === itemId)
    );
  };

  const cartContextValue = {
    addProduct,
    removeItem,
    isInCart,
    updateProduct,
    productsAdded,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
