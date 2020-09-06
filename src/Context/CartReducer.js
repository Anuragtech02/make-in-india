import React from "react";
import firebase from "../Authentication/Firebase";
import { AuthContext } from "../Authentication/Auth";
import debounce from "lodash/debounce";

export default (state, action) => {
  const db = firebase.firestore();
  const cartData = sessionStorage.getItem("cart");
  let updateTimer, deleteTimer;
  let deleteCounter = 0;

  // const { userDetails } = useContext(AuthContext);
  const userRef = db.collection("users").doc(sessionStorage.getItem("uid"));

  switch (action.type) {
    case "FETCH_CART":
      return {
        ...state,
        products: JSON.parse(cartData),
      };
    case "ADD_PRODUCT":
      const setNewCart = [newProduct(action.payload), ...state.products];
      sessionStorage.setItem("cart", JSON.stringify(setNewCart));
      let counter = 0;

      const addProduct = () => {
        userRef.update({
          cart: setNewCart,
        });
        console.log("Added to cart successfully : )");
      };
      addProduct();

      return {
        ...state,
        products: setNewCart,
      };
    case "DELETE_PRODUCT":
      const setCart = deleteProduct(state.products, action.payload);
      sessionStorage.setItem("cart", JSON.stringify(setCart));

      userRef.update({
        cart: setCart,
      });
      console.log("Deleted", deleteCounter++);
      return {
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        products: increment(state.products, action.payload),
      };
    case "DECREMENT_QUANTITY":
      return {
        products: decrement(state.products, action.payload),
      };
    default:
      return state;
  }
};

const newProduct = (product) => {
  product["quantity"] = 1;
  return product;
};

const deleteProduct = (products, productToBeDeletedId) => {
  const dataAfterDelete = products.filter(
    (product) => product.id !== productToBeDeletedId
  );
  sessionStorage.setItem("cart", JSON.stringify(dataAfterDelete));
  return dataAfterDelete;
};

const increment = (oldProducts, id) => {
  const oldProduct = oldProducts.filter((product) => product.id === id);
  let product = oldProduct[0];
  product.quantity += 1;
  oldProducts.splice(oldProducts.indexOf(product), 1, product);
  sessionStorage.setItem("cart", JSON.stringify(oldProducts));
  return oldProducts;
};

const decrement = (oldProducts, id) => {
  const oldProduct = oldProducts.filter((product) => product.id === id);
  let product = oldProduct[0];
  product.quantity -= 1;
  oldProducts.splice(oldProducts.indexOf(product), 1, product);
  localStorage.setItem("cart", JSON.stringify(oldProducts));
  return oldProducts;
};

const addProductToDB = (data) => {};
