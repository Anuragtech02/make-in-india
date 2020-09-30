import React, { useState, useEffect, createContext, useContext } from "react";
import firebase from "../Authentication/Firebase";

export const SellerContext = createContext([]);

export const SellerContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const sellerRef = db
        .collection("stores")
        .doc(JSON.parse(sessionStorage.getItem("storeId")))
        .collection("orders");
      const snapshot = await sellerRef.get();
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setOrders(data);
    };
    fetchData();
  }, []);

  return (
    <SellerContext.Provider value={{ orders, setOrders }}>
      {children}
    </SellerContext.Provider>
  );
};
