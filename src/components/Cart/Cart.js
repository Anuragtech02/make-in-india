import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Product } from "../../components";
import styles from "./Cart.module.css";

export const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");

    setProducts(JSON.parse(localCart));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>CART</h1>
      </div>
      <div className={styles.products}>
        {!products ? (
          <h4>No products in the cart.</h4>
        ) : (
          <Grid container spacing={2} className={styles.productGrid}>
            {products.map((product, index) => {
              return (
                <Grid key={index} item md={3}>
                  <Product product={product} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Cart;
