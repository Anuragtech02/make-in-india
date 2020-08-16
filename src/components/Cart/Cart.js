import React, { useState, useEffect, useContext, useCallback } from "react";
import { Grid } from "@material-ui/core";
import { CartProduct } from "../../components";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Authentication/Auth";

export const Cart = () => {
  const { fetchCartData, products } = useContext(CartContext);

  return <CartComponent products={products} />;
};

export default Cart;

const CartComponent = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>CART</h1>
      </div>
      <div className={styles.products}>
        {!products || !products.length ? (
          <h4>No products in the cart.</h4>
        ) : (
          <Grid container spacing={2} className={styles.productGrid}>
            {products.map((product, index) => {
              return (
                <Grid key={index} item md={3}>
                  <CartProduct product={product} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </div>
  );
};
