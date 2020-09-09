import React, {
  useState,
  createContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "react";
import CartReducer from "./CartReducer";
import debounce from "lodash/debounce";
import firebase from "../Authentication/Firebase";

const localCart = localStorage.getItem("cart");
const cartData = JSON.parse(localCart);

//Initialized Context
export const CartContext = createContext({
  products: cartData,
});

export const CartProvider = ({ children }) => {
  let initialState = {
    products: cartData,
  };

  const [uid, setUid] = useState(sessionStorage.getItem("uid"));

  const db = firebase.firestore();

  let userRef = sessionStorage.getItem("uid")
    ? db.collection("users").doc(uid)
    : null;

  useEffect(() => {
    setUid(sessionStorage.getItem("uid"));
  }, [uid]);

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const fetchCartData = () => {
    dispatch({
      type: "FETCH_CART",
    });
  };

  const saveToDb = () => {
    const newCart = JSON.parse(localStorage.getItem("cart"));
    console.log(newCart);
    userRef
      .update({
        cart: newCart,
      })
      .then(() => console.log("Updated Cart"));
  };

  const debounceSave = useRef(debounce(() => saveToDb(), 2000)).current;

  function addProductWithId(product) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product,
    });
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
    debounceSave();
  };

  const decrementQuantity = (id) => {
    dispatch({
      type: "DECREMENT_QUANTITY",
      payload: id,
    });
    debounceSave();
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
