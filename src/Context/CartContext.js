import React, {
  useState,
  useContext,
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import CartReducer from "./CartReducer";
// import firebase from "../Authentication/Firebase";
// import { AuthContext } from "../Authentication/Auth";

const localCart = localStorage.getItem("cart");
const cartData = JSON.parse(localCart);

// const initialState = {
//   products: cartData ? cartData : [],
// };

//Initialized Context
export const CartContext = createContext({
  products: [],
});

export const CartProvider = ({ children }) => {
  // const { userDetails } = useContext(AuthContext);

  const [initialState, setInitialState] = useState({
    products: [],
  });

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
