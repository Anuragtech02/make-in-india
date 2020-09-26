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

const cartData = JSON.parse(localStorage.getItem("cart"));

//Global Total calculation Function
const getTotal = (products) => {
  const tempTotal = products.reduce((currentTotal, product) => {
    return product.price * product.quantity + currentTotal;
  }, 0);

  return tempTotal;
};

//Initialized Context
export const CartContext = createContext(
  cartData && cartData.length
    ? {
        products: cartData,
        total: getTotal(cartData),
      }
    : {}
);

export const CartProvider = ({ children }) => {
  const getTotalProducts = () => {
    const totalProducts =
      state.products && state.products.length
        ? state.products.reduce(
            (currentTotal, product) => currentTotal + product.quantity,
            0
          )
        : 0;
    return totalProducts;
  };

  let initialState =
    cartData && cartData.length
      ? {
          products: cartData,
          total: getTotal(cartData),
          totalProducts: getTotalProducts(),
        }
      : {
          products: [],
          total: 0,
          totalProducts: 0,
        };

  const [uid, setUid] = useState(sessionStorage.getItem("uid"));
  let tempUid = sessionStorage.getItem("uid");

  const db = firebase.firestore();

  let userRef = sessionStorage.getItem("uid")
    ? db.collection("users").doc(tempUid)
    : null;

  useEffect(() => {
    setUid(sessionStorage.getItem(tempUid));
  }, [tempUid]);

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

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
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
        clearCart,
        total: state.total,
        totalProducts: state.totalProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
