import React, { useState, createContext, useReducer, useEffect } from "react";
import CartReducer from "./CartReducer";

const localCart = localStorage.getItem("cart");
const cartData = JSON.parse(localCart);

const initialState = {
  products: cartData ? cartData : [],
};

//Initialized Context
export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  function addProduct(product) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
  }

  const deleteProductWithId = (id) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        addProduct,
        deleteProductWithId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
