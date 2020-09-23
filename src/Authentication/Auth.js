import React, { createContext, useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import firebase from "./Firebase";
import styles from "./Auth.module.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [pending, setPending] = useState(true);
  const [products, setProducts] = useState([]);

  // state={

  // }

  const saveCartToLocal = () => {
    localStorage.setItem("cart", JSON.stringify(userDetails.cart));
  };

  useEffect(() => {
    const db = firebase.firestore();

    const fetchProducts = async (storeId) => {
      const localProducts = localStorage.getItem("homeSlider");
      if (!localProducts) {
        setProducts(
          JSON.parse(localProducts).filter(
            (product) => product.storeId === storeId
          )
        );
      } else {
        const userProductsRef = db.collection("stores").doc(storeId);
        const snapshot = await userProductsRef.collection("products").get();
        const incomingData = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setProducts(incomingData);
      }
    };
    const fetchUser = async (email) => {
      const userRef = db.collection("users").where("email", "==", email);
      const snapshot = await userRef.get();
      const userData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserDetails(userData[0]);
      sessionStorage.setItem("uid", userData[0].uid);
      localStorage.setItem("cart", JSON.stringify(userData[0].cart));
      // localStorage.setItem()
      if (userData[0].isSeller) {
        fetchProducts(userData[0].storeId);
      }
      setPending(false);
    };
    const checkUser = async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        if (user) fetchUser(user.email);
        else setPending(false);
      });
    };
    checkUser();
  }, [currentUser]);

  if (pending) {
    return (
      <div className={styles.container}>
        <CircularProgress className={styles.circularProgress} />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, userDetails, products, saveCartToLocal }}
    >
      {children}
    </AuthContext.Provider>
  );
};
