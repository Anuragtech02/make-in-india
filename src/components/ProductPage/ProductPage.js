import React, { useState, useEffect } from "react";
import styles from "./ProductPage.module.css";
import { motion } from "framer-motion";
import {
  Paper,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Grid,
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
import firebase from "../Firebase";

import {
  amul,
  asianPaints,
  dabur,
  godrej,
  haldirams,
  itc,
  patanjali,
} from "../../icons";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState();

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 800);

    const fetchData = async () => {
      const db = firebase.firestore();
      const data = db.collection("products");
      const snapshot = await data.where("id", "==", id).get();
      if (snapshot.empty) {
        console.log("Nothing found");
        return;
      } else {
        snapshot.forEach((doc) => {
          console.log(doc.data());
        });
      }
    };
    fetchData();
  }, [id]);

  // console.log(products);

  // const product = products.filter((item) => {
  //   return item.id === id;
  // });

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

export default ProductPage;

const MyProduct = ({ product }) => {
  const {
    price,
    category,
    storeName,
    amazonLink,
    flipkartLink,
    id,
    heading,
    description,
  } = product;
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
              className={styles.heading}
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
              <h2>{heading}</h2>
              <h4>{`Category : ${category}`}</h4>
              <h5>In Stock</h5>
              <Link to={`/shop/${storeName}`} className={styles.noDecoration}>
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
              <motion.div className={styles.pricing}>
                <h6>MRP</h6>
                <h1>{`₹${price}`}</h1>
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
              <p>{description}</p>
            </motion.div>
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
