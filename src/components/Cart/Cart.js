import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Card,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  LinearProgress,
} from "@material-ui/core";
import { CartProduct } from "../../components";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Authentication/Auth";
import { OrderContext } from "../../Context/OrderContext";
import box from "../../assets/vectors/box.svg";
import CurrencyFormat from "react-currency-format";

export const Cart = ({ history }) => {
  const { products, total } = useContext(CartContext);
  const { saveCartToLocal, userDetails } = useContext(AuthContext);

  useEffect(() => {
    saveCartToLocal();
  }, [saveCartToLocal]);

  if (userDetails.isSeller) {
    return (
      <div className={styles.cartNotAvailable}>
        <h4>Cart is not available for sellers :(</h4>
      </div>
    );
  }

  return <CartComponent total={total} products={products} />;
};

export default withRouter(Cart);

const CartComponent = ({ products, total }) => {
  const [open, setOpen] = useState(false);

  const totalProducts =
    products && products.length
      ? products.reduce(
          (currentTotal, product) => currentTotal + product.quantity,
          0
        )
      : 0;
  return (
    <div className={styles.container}>
      <ConfirmationDialog
        totalProducts={totalProducts}
        total={total}
        products={products}
        open={open}
        setOpen={setOpen}
      />
      <div className={styles.header}>
        <div className={styles.innerHeader}>
          <div className={styles.cartHeading}>
            <h1>CART</h1>
            <img src={box} alt="box-cart" />
          </div>
          <p>
            Total Products : <span>{totalProducts}</span>
          </p>
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
              style={{ opacity: !products || !products.length ? "0.6" : "1" }}
              className={styles.orangeBtn}
              variant="text"
              onClick={() => setOpen(!open)}
            >
              Confirm Order
            </Button>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const ConfirmationDialog = ({
  open,
  products,
  setOpen,
  totalProducts,
  total,
}) => {
  const handleClose = () => {
    setOpen(!open);
  };

  const [progress, setProgress] = useState(false);

  const { addOrderToDb } = useContext(OrderContext);

  const { clearCart } = useContext(CartContext);

  const handleSubmit = () => {
    setProgress(true);
    let tempProducts = products;
    tempProducts.forEach((product) => {
      product["orderTime"] = new Date();
      const individualTotal = product.quantity * product.price;
      product["totalPrice"] = individualTotal;
    });
    addOrderToDb(tempProducts);
    setTimeout(() => {
      setProgress(false);
      setOpen(false);
      clearCart();
    }, 1000);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{"Confirm Order"}</DialogTitle>
        <DialogContent>
          <div className={styles.dialogContent}>
            <div className={styles.totalProducts}>
              <p>Total Products</p>
              <p>{totalProducts}</p>
            </div>
            <div className={styles.totalPrice}>
              <p>Total Price</p>
              <p>
                {
                  <CurrencyFormat
                    value={total}
                    displayType={"text"}
                    thousandSpacing="2s"
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                }
              </p>
            </div>
          </div>
          <div className={styles.progress}>
            <LinearProgress
              style={{ opacity: progress ? "1" : "0" }}
              variant="indeterminate"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className={styles.actionBtnCancel}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className={styles.actionBtnAgree}
            color="primary"
            autoFocus
          >
            Yes, confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
