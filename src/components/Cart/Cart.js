import React, { useState, useEffect, useContext, useCallback } from "react";
import { Grid, Card } from "@material-ui/core";
import { CartProduct } from "../../components";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Authentication/Auth";
import box from "../../assets/vectors/box.svg";

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
  // const [total, setTotal] = useState(0);

  // useEffect(() => {
  //   // let temp = 0;
  //   // temp = products.reduce((currentTotal, product) => {
  //   //   return product.price * product.quantity + currentTotal;
  //   // }, 0);
  //   // setTotal(temp);
  //   setTotal(total);
  // }, [products]);

  console.log(total);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.innerHeader}>
          <h1>CART</h1>
          <img src={box} alt="box" />
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
                  <Grid key={index} item md={4}>
                    <CartProduct product={product} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
        <Grid md={3} item className={styles.total}>
          <Card>
            <div className={styles.heading}>
              <h2>Total</h2>
              <h2>{total}</h2>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
