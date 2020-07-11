import React, { useState, useEffect, useContext } from "react";
import styles from "./Shop.module.css";
import { Grid, CircularProgress } from "@material-ui/core";
import image3 from "../../images/image3.webp";
import { motion } from "framer-motion";
import userImage from "../../images/userImage.webp";
import { Product } from "../../components";
import products from "../../assets/products.json";
import { useParams } from "react-router";
import firebase from "../Firebase";
import { AuthContext } from "../Auth";

const Shop = () => {
  const { storeId } = useParams();
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState({
    storeId: "Store",
    storeName: "Store Name",
    mobile: "9xxxxxxxxxx",
    email: "store@indiproducts.com",
  });
  const [display, setDisplay] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 800);

    const fetchStore = async () => {
      const db = firebase.firestore();
      const storeRef = await db
        .collection("stores")
        .where("storeId", "==", storeId)
        .get();
      storeRef.forEach((doc) => {
        setStore({
          storeId: doc.data().storeId,
          storeName: doc.data().displayName,
          email: doc.data().email,
          mobile: doc.data().mobile,
        });
      });
      const storeProductRef = await db
        .collection("stores")
        .doc(store.storeId)
        .collection("products")
        .get();
      const productsData = storeProductRef.docs.map((doc) => ({
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchStore();
  }, [storeId, store.storeId]);

  return !display ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <CompanyComponent store={store} products={products} />
  );
};

export default Shop;

const CompanyComponent = ({ store, products }) => {
  const { storeName, email, mobile } = store;

  useEffect(() => {
    document.title = `INDIPRODUCTS | ${
      storeName[0].toUpperCase() + storeName.slice(1)
    }`;
  });

  return (
    <div className={styles.container}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url('${image3}')` }}
      >
        <div className={styles.darkOverlay}>
          <h1>{storeName}</h1>
        </div>
      </div>
      <motion.div className={styles.infobar}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${userImage})` }}
        ></div>
        <div className={styles.contactDetails}>
          <div className={styles.contactWrapper}>
            <div className={styles.call}>
              <i className="fas fa-phone-alt" />
              <h4>{mobile}</h4>
            </div>
            <div className={styles.mail}>
              <i className="fas fa-envelope" />
              <h4>{email}</h4>
            </div>
            <div className={styles.blog}>
              <i className="fas fa-rss-square"></i>
              <h4>Visit My Blog</h4>
            </div>
          </div>
          <div className={styles.para}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              praesentium alias qui cum nam perspiciatis corrupti eaque ab eum
              sequi in nisi similique voluptatem quasi, ducimus totam odio nemo
              non.
            </p>
          </div>
        </div>
      </motion.div>
      <div className={styles.innerContainer}>
        <div className={styles.heading}>
          <h3>Products</h3>
        </div>
        <div className={styles.products}>
          <Grid container>
            {products.map((product) => {
              return (
                <Grid
                  item
                  md={3}
                  key={product.productId}
                  xs={12}
                  className={styles.singleProduct}
                >
                  <Product product={product} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};
