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

  function addProductWithId(product) {
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

  const incrementQuantity = (id) => {
    dispatch({
      type: "INCREMENT_QUANTITY",
      payload: id,
    });
  };

  const decrementQuantity = (id) => {
    dispatch({
      type: "DECREMENT_QUANTITY",
      payload: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        addProductWithId,
        deleteProductWithId,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
