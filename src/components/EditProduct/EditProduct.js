import React, { useState, useEffect } from "react";
import styles from "../ProductPage/ProductPage.module.css";
import newStyles from "./EditProduct.module.css";
import { motion } from "framer-motion";
import {
  Paper,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Grid,
  TextField,
} from "@material-ui/core";
// import ProductSlider from "../ProductSlider/ProductSlider";
import amazon from "../../icons/amazon-brands.png";
import flipkart from "../../icons/flipkart.png";
import classNames from "classnames";
import { SnackbarProvider, useSnackbar } from "notistack";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import firebase from "../../Authentication/Firebase";

import {
  amul,
  asianPaints,
  dabur,
  godrej,
  haldirams,
  itc,
  patanjali,
} from "../../icons";

const EditProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState();

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 800);

    const fetchData = async () => {
      const db = firebase.firestore();
      await db
        .collection("products")
        .doc(productId)
        .get()
        .then((doc) => {
          setProduct(doc.data());
        });
    };
    fetchData();
  }, [productId]);

  return !display ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : product ? (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <MyProduct product={product} />
    </SnackbarProvider>
  ) : (
    <div>Loading...</div>
  );
};

export default EditProduct;

const MyProduct = ({ product }) => {
  const {
    price,
    category,
    storeName,
    storeId,
    amazonLink,
    flipkartLink,
    id,
    headline,
    description,
  } = product;

  const [updatePrice, setUpdatePrice] = useState(price);
  const [updateCategory, setUpdateCategory] = useState(category);
  const [updateStoreName, setUpdateStoreName] = useState(storeName);
  const [updateStoreId, setUpdateStoreId] = useState(storeId);
  const [updateHeadline, setUpdateHeadline] = useState(headline);
  const [updateDescription, setUpdateDescription] = useState(description);

  useEffect(() => {
    document.title = `INDIPRODUCTS | ${headline}`;
  }, [headline]);

  const iconColor = "var(--primaryColor)";

  //Settings for the vertical brand slider
  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    accessibility: false,
    vertical: true,
    verticalSwiping: true,
    lazyload: true,
    slidesToShow: 6,
    swipeToSlide: true,
  };

  const brands = [amul, asianPaints, dabur, godrej, haldirams, itc, patanjali];

  const [mainImage, setMainImage] = useState(product.imageUrls[0]);

  const gotoURL = (location) => {
    let a = document.createElement("a");
    a.target = "_blank";
    a.href = location;
    a.click();
  };

  const handleClickVariant = (variant, storeName, id) => () => {
    enqueueSnackbar(`Successfully added ${storeName} to favourites`, {
      variant,
    });
    onClickHeart(id);
  };

  const onClickHeart = (id) => {
    document
      .getElementById(id)
      .style.setProperty("color", iconColor, "important");
  };

  const { enqueueSnackbar } = useSnackbar();

  const updateDetails = async () => {
    if (
      price === updatePrice &&
      category === updateCategory &&
      headline === updateHeadline &&
      description === updateDescription
    ) {
      alert("Please Change something to update!");
    } else {
      const db = firebase.firestore();
      const storeProductRef = db
        .collection("stores")
        .doc(storeId)
        .collection("products")
        .doc(id);
      const productRef = db.collection("products").doc(id);
      const snapshot = await storeProductRef
        .update({
          headline: updateHeadline,
          price: updatePrice,
          description: updateDescription,
          category: updateCategory,
        })
        .then(async () => {
          await productRef
            .update({
              headline: updateHeadline,
              price: updatePrice,
              description: updateDescription,
              category: updateCategory,
            })
            .then(() => alert("Successfully updated :)"));
        })
        .catch((error) => alert(error));
    }
  };

  return (
    <motion.div className={styles.container}>
      <Grid container>
        <Grid item md={4} xs={12}>
          <motion.div className={styles.imageSection}>
            <motion.div
              className={styles.imageContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
              }}
            >
              <img src={mainImage} alt={`product-${storeName}`}></img>
            </motion.div>
            <Paper className={styles.otherImages}>
              {product.imageUrls.map((image, index) => {
                if (index < 3) {
                  return (
                    <motion.div
                      key={index}
                      className={styles.imageBack}
                      onClick={() => setMainImage(image)}
                    >
                      <img src={image} alt={`product-${storeName}`}></img>
                    </motion.div>
                  );
                }
              })}
            </Paper>
          </motion.div>
        </Grid>
        <Grid item md={8} xs={12}>
          <motion.div className={styles.descSection}>
            <motion.div
              className={classNames(styles.heading, newStyles.heading)}
              initial={{
                y: 50,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <TextField
                className={newStyles.headline}
                value={updateHeadline}
                variant="filled"
                label="Headline"
                size="small"
                onChange={(e) => setUpdateHeadline(e.target.value)}
              />
              <TextField
                className={newStyles.category}
                value={updateCategory}
                label="Category"
                size="small"
                variant="filled"
                onChange={(e) => setUpdateCategory(e.target.value)}
              />
              <h5>In Stock</h5>
              <Link
                to={`/stores/${storeId}`}
                className={classNames(styles.noDecoration, newStyles.storeName)}
              >
                <h6>by {storeName}</h6>
              </Link>
              <div className={styles.underLine}></div>
            </motion.div>
            <motion.div
              className={styles.middleContainer}
              initial={{
                y: 70,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <motion.div className={classNames(styles.pricing)}>
                <h6>MRP</h6>
                <div className={newStyles.pricing}>
                  <h1>{`₹ `}</h1>
                  <TextField
                    className={newStyles.priceField}
                    value={updatePrice}
                    variant="filled"
                    label="Price"
                    size="small"
                    onChange={(e) => setUpdatePrice(e.target.value)}
                  />
                </div>
              </motion.div>
              <motion.div className={styles.affiliateButtons}>
                <Tooltip title="Add to favourites" placement="top">
                  <div>
                    <IconButton
                      onClick={handleClickVariant("success", storeName, id)}
                      className={styles.likeIcon}
                    >
                      <i
                        id={product.id}
                        className={classNames("fas fa-heart")}
                      />
                    </IconButton>
                  </div>
                </Tooltip>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.amazonBtn}
                  onClick={() => gotoURL(amazonLink)}
                >
                  <img src={amazon} alt="amazon-link" /> amazon.in
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.flipkartBtn}
                  onClick={() => gotoURL(flipkartLink)}
                >
                  <img src={flipkart} alt="flipkart-link" />
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className={styles.paraDescription}
              initial={{
                y: 100,
              }}
              animate={{
                y: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {/* <p>{description}</p> */}
              <TextField
                className={newStyles.descriptionField}
                variant="filled"
                multiline
                label="Description"
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </motion.div>
          </motion.div>
          <motion.div className={newStyles.updateBtn}>
            <Button
              className={newStyles.btn}
              variant="contained"
              onClick={updateDetails}
            >
              Update
            </Button>
          </motion.div>
        </Grid>
        <Grid item md={12} xl={12}></Grid>
      </Grid>
      <motion.div className={styles.verticalLine}></motion.div>
      <motion.div className={styles.brands}>
        <Slider {...settings} className={styles.brandSlider}>
          {brands.map((brand, index) => {
            return (
              <motion.div key={index} className={styles.brandContainer}>
                <img
                  className={styles.brandImage}
                  src={brand}
                  alt={brand}
                ></img>
              </motion.div>
            );
          })}
        </Slider>
      </motion.div>
    </motion.div>
  );
};
