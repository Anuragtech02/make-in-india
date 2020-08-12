import React, { useContext } from "react";
import firebase from "../Authentication/Firebase";
import { AuthContext } from "../Authentication/Auth";

export default (state, action) => {
  const db = firebase.firestore();

  const { userDetails } = useContext(AuthContext);
  const userRef = db
    .collection("users")
    .doc(userDetails.uid ? userDetails.uid : sessionStorage.getItem("uid"));

  switch (action.type) {
    case "FETCH_CART":
      return {
        ...state,
        products: userDetails.cart,
      };
    case "ADD_PRODUCT":
      // setTimeout(() => {
      // const updateCart = async () =>
      //   await
      // // }, 1000);
      // updateCart();
      userRef
        .update({
          cart: [newProduct(action.payload), ...state.products],
        })
        .then(() => {
          console.log("Updated Cart on firebase!");
        });

      return {
        ...state,
        products: [newProduct(action.payload), ...state.products],
      };
    case "DELETE_PRODUCT":
      const updateCartOnDelete = async () =>
        await userRef.update({
          cart: deleteProduct(state.products, action.payload),
        });
      updateCartOnDelete();
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
