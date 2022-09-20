import axios from "axios";
import { createContext, useContext, useState } from "react";

export const basketContext = createContext([]);

export const BasketItemProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  const axiosInstance = axios.create({
    baseURL: "https://northwind.vercel.app/api/",
    timeout: 5500,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const emptyBasket = () => {
    setBasketItems([]);
  };

  const removeProductFromBasket = (product) => {
    const duplicateIndex = basketItems.findIndex(
      (x) => x.productId === product.productId
    );

    if (duplicateIndex !== -1) {
      basketItems[duplicateIndex].quantity -= 1;
      if (basketItems[duplicateIndex].quantity <= 0) {
        const filteredProducts = basketItems.filter(
          (x) => x.productId !== product.productId
        );
        setBasketItems(filteredProducts);
      }
      else{
        setBasketItems([...basketItems]);
      }
    } else {
      setBasketItems([
        ...basketItems,
        { productId: product.id, name: product.name, quantity: 1 },
      ]);
    }
  };

  const addProductToBasket = (product, productId) => {
    let duplicateIndex;
    if (productId) {
      duplicateIndex = basketItems.findIndex((x) => x.productId === productId);
    } else {
      duplicateIndex = basketItems.findIndex((x) => x.productId === product.id);
    }
    if (duplicateIndex !== -1) {
      basketItems[duplicateIndex].quantity += 1;
      setBasketItems([...basketItems]);
    } else {
      setBasketItems([
        ...basketItems,
        { productId: product.id, name: product.name, quantity: 1 },
      ]);
    }
  };

  const values = {
    products,
    axiosInstance,
    setProducts,
    emptyBasket,
    basketItems,
    removeProductFromBasket,
    addProductToBasket,
  };

  return (
    <basketContext.Provider value={values}>{children}</basketContext.Provider>
  );
};

export const useProductContext = () => useContext(basketContext);
