import React, { createContext, useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import firebase from "./Firebase";
import styles from "./Auth.module.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchUser = async (email) => {
      const db = firebase.firestore();
      const userRef = db.collection("users").where("email", "==", email);
      const snapshot = await userRef.get();
      const userData = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setUserDetails(userData[0]);
    };

    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
      fetchUser(user.email);
    });
  }, []);

  if (pending) {
    return (
      <div className={styles.container}>
        {/* <LinearProgress className={styles.linearProgress} /> */}
        <CircularProgress className={styles.circularProgress} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
