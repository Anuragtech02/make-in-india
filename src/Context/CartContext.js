import React, {
  useState,
  useContext,
  createContext,
  useReducer,
  useEffect,
} from "react";
import CartReducer from "./CartReducer";

const localCart = sessionStorage.getItem("cart");
const cartData = JSON.parse(localCart);

//Initialized Context
export const CartContext = createContext({
  products: cartData,
});

export const CartProvider = ({ children }) => {
  let initialState = {
    products: cartData,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const fetchCartData = () => {
    dispatch({
      type: "FETCH_CART",
    });
  };

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
        fetchCartData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
