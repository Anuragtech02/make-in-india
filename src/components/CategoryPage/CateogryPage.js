import React from "react";
import styles from "./CategoryPage.module.css";

const CategoryPage = ({ category }) => {
  return (
    <div className={styles.container}>
      <h1>The category is {category} </h1>
    </div>
  );
};

export default CategoryPage;
