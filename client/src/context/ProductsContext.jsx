import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        let data = await response.json();
        data = data.sort((a, b) => (a.title > b.title ? 1 : -1));
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const productContextValue = {
    products,
    setProducts,
    addProduct,
    updateProduct,
    loading,
  };

  return (
    <ProductContext.Provider value={productContextValue}>
      {children}
    </ProductContext.Provider>
  );
};
