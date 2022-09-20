import axios from "axios";
import { createContext, useContext, useState } from "react";

export const basketContext = createContext([]);

export const BasketItemProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const axiosInstance = axios.create({
    baseURL: "https://northwind.vercel.app/api/",
    timeout: 5500,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });


  const emptyCart = () => {
    setProducts([]);
  };
  const removeProductFromBasket = (product) => {
    const filteredProducts = products.filter((x) => x.id !== product.id);
    setProducts(filteredProducts);
  };
  const addProductToBasket = (product) => {
    const selectedProduct = products.find((x) => x.id === product.id);
    if (selectedProduct) {
      const updatedToDo = products.map((prod) => {
        if (prod.id === selectedProduct.id)
          return { ...prod, quantity: (prod.quantity += 1) };
        else return prod;
      });
      setProducts(updatedToDo);
    } else {
      const newProdObj = {
        productId: selectedProduct.id,
        name: selectedProduct.name,
        quantity: 1,
      };
      setProducts([...products, newProdObj]);
    }
  };

  const values = {
    products,
    axiosInstance,
    setProducts,
    emptyCart,
    removeProductFromBasket,
    addProductToBasket,
  };

  return (
    <basketContext.Provider value={values}>
      {children}
    </basketContext.Provider>
  );
};

export const useProductContext = () => useContext(basketContext);
