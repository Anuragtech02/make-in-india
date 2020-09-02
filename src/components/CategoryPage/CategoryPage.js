import React, { useState, useEffect } from "react";
import styles from "./CategoryPage.module.css";
import { CircularProgress } from "@material-ui/core";
import { useParams } from "react-router";

const CategoryPage = () => {
  const { category } = useParams();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 800);
  }, []);

  return !display ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <PageComponent category={category} />
  );
};

export default CategoryPage;

const PageComponent = ({ category }) => {
  useEffect(() => {
    document.title = `INDIPRODUCTS | ${
      category[0].toUpperCase() + category.slice(1)
    }`;
  }, [category]);

  return (
    <div>
      <h1>The category is {category} </h1>
    </div>
  );
};
