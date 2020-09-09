import React, {
  useState,
  createContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import CartReducer from "./CartReducer";
import debounce from "lodash/debounce";
import firebase from "../Authentication/Firebase";

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

  const db = firebase.firestore();

  const userRef = db.collection("users").doc(sessionStorage.getItem("uid"));

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const fetchCartData = () => {
    dispatch({
      type: "FETCH_CART",
    });
  };

  const saveToDb = async () => {
    await userRef.update({
      cart: state.products,
    });
    console.log("Added to cart");
  };

  const debounceSave = useRef(debounce(() => saveToDb(), 2000)).current;

  function addProductWithId(product) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
    // console.log("Add function called");
    debounceSave();
  }

  const deleteProductWithId = (id) => {
    dispatch({
      type: "DELETE_PRODUCT",
      payload: id,
    });
    debounceSave();
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
