import React from "react";
import styles from "./App.module.css";
import image from "./images/404.gif";

const NotFound = () => {
  return (
    <div className={styles.notFoundPage}>
      <img src={image} alt="page not found" />
    </div>
  );
};

export default NotFound;
