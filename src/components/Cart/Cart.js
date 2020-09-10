import React, { useState, useEffect, useContext } from "react";
import { Grid, Card, Button } from "@material-ui/core";
import { CartProduct } from "../../components";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Authentication/Auth";
import box from "../../assets/vectors/box.svg";
import CurrencyFormat from "react-currency-format";

export const Cart = () => {
  const { products, total } = useContext(CartContext);
  const { saveCartToLocal } = useContext(AuthContext);

  useEffect(() => {
    saveCartToLocal();
  }, [saveCartToLocal]);

  return <CartComponent total={total} products={products} />;
};

export default Cart;

const CartComponent = ({ products, total }) => {
  console.log(total);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.innerHeader}>
          <div className={styles.cartHeading}>
            <h1>CART</h1>
            <img src={box} alt="box-cart" />
          </div>
          <p>Total Products : {products.length}</p>
        </div>
        <div className={styles.underLine}></div>
      </div>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        className={styles.productsTotal}
      >
        <Grid item md={9} className={styles.products}>
          {!products || !products.length ? (
            <h4>No products in the cart.</h4>
          ) : (
            <Grid container spacing={2} className={styles.productGrid}>
              {products.map((product, index) => {
                return (
                  <Grid key={index} item sm={12} xs={12} md={6} lg={6} xl={4}>
                    <CartProduct product={product} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
        <Grid md={3} item className={styles.totalContainer}>
          <Card className={styles.total}>
            <div className={styles.heading}>
              <h2>Total</h2>
              <h2>
                <CurrencyFormat
                  value={total}
                  displayType={"text"}
                  thousandSpacing="2s"
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              </h2>
            </div>
            <div className={styles.terms}>
              <p>
                By clicking confirm order, you hereby agree to our{" "}
                <span>Terms & conditions</span>.
              </p>
            </div>
            <Button
              disabled={!products || !products.length ? true : false}
              className={styles.orangeBtn}
              variant="text"
            >
              Confirm Order
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
