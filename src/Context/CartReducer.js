import React, { useContext } from "react";
import firebase from "../Authentication/Firebase";
import { AuthContext } from "../Authentication/Auth";

export default (state, action) => {
  const db = firebase.firestore();
  const cartData = sessionStorage.getItem("cart");

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
      // setTimeout(() => {
      // const updateCart = async () =>
      //   await
      // // }, 1000);
      // updateCart();
      sessionStorage.setItem(
        "cart",
        JSON.stringify(newProduct(action.payload), ...state.products)
      );
      let updateTimer,
        counter = 0;
      clearTimeout(updateTimer);
      updateTimer = setTimeout(() => {
        userRef
          .update({
            cart: [newProduct(action.payload), ...state.products],
          })
          .then(() => {
            console.log("Updated Cart on firebase!", counter++);
          });
      }, 1000);

      return {
        ...state,
        products: [newProduct(action.payload), ...state.products],
      };
    case "DELETE_PRODUCT":
      sessionStorage.setItem(
        "cart",
        JSON.stringify(deleteProduct(state.products, action.payload))
      );
      // const updateCartOnDelete = async () =>
      //   await userRef.update({
      //     cart: deleteProduct(state.products, action.payload),
      //   });
      let deleteTimer;
      let deleteCounter = 0;
      clearTimeout(deleteTimer);
      deleteTimer = setTimeout(() => {
        userRef
          .update({
            cart: JSON.parse(sessionStorage.getItem("cart")),
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
  localStorage.setItem("cart", JSON.stringify(dataAfterDelete));
  return dataAfterDelete;
};

const increment = (oldProducts, id) => {
  const oldProduct = oldProducts.filter((product) => product.id === id);
  let product = oldProduct[0];
  product.quantity += 1;
  oldProducts.splice(oldProducts.indexOf(product), 1, product);
  localStorage.setItem("cart", JSON.stringify(oldProducts));
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
