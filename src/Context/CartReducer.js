import React, { useContext } from "react";
import firebase from "../Authentication/Firebase";
import { AuthContext } from "../Authentication/Auth";
import _ from "lodash";

export default (state, action) => {
  const db = firebase.firestore();
  const cartData = sessionStorage.getItem("cart");
  let updateTimer, deleteTimer;

  const { userDetails } = useContext(AuthContext);
  const userRef = db
    .collection("users")
    .doc(userDetails.uid ? userDetails.uid : sessionStorage.getItem("uid"));

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
      // clearTimeout(updateTimer);
      const updateCart = () => {
        userRef.update({
          cart: setNewCart,
        });
        console.log("Added to cart successfully : )");
      };
      updateCart();
      // _.debounce(() => {
      //   updateCart();
      //   console.log("Triggered");
      // }, 1000);

      return {
        ...state,
        products: setNewCart,
      };
    case "DELETE_PRODUCT":
      const setCart = deleteProduct(state.products, action.payload);
      sessionStorage.setItem("cart", JSON.stringify(setCart));

      let deleteCounter = 0;
      // clearTimeout(deleteTimer);
      _.debounce(() => {
        userRef
          .update({
            cart: setCart,
          })
          .then(() => {
            console.log("Deleted", deleteCounter++);
          });
      }, 1000);
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
