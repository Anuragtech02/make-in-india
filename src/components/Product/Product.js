import React, { useState } from "react";
import styles from "./Product.module.css";
import { motion } from "framer-motion";
import { Paper, Button, IconButton, Tooltip } from "@material-ui/core";
import ProductSlider from "../ProductSlider/ProductSlider";
import amazon from "../../icons/amazon-brands.png";
import flipkart from "../../icons/flipkart.png";
import classNames from "classnames";
import { SnackbarProvider, useSnackbar } from "notistack";

const Product = ({ product }) => {
  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <MyProduct product={product} />
    </SnackbarProvider>
  );
};

export default Product;

const MyProduct = ({ product }) => {
  const {
    price,
    category,
    company,
    amazonLink,
    flipkartLink,
    productId,
  } = product;
  const iconColor = "var(--primaryColor)";

  const [mainImage, setMainImage] = useState(product.imageUrls[0]);

  const gotoURL = (location) => {
    let a = document.createElement("a");
    a.target = "_blank";
    a.href = location;
    a.click();
  };

  const handleClickVariant = (variant, company, productId) => () => {
    enqueueSnackbar(`Successfully added ${company} to favourites`, { variant });
    onClickHeart(productId);
  };

  const onClickHeart = (productID) => {
    document
      .getElementById(productID)
      .style.setProperty("color", iconColor, "important");
  };

  const { enqueueSnackbar } = useSnackbar();

  return (
    <motion.div className={styles.container}>
      <motion.div
        className={styles.imageSection}
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.div className={styles.imageContainer}>
          <img src={mainImage} alt={`product-${company}`}></img>
        </motion.div>
        <Paper className={styles.otherImages}>
          {product.imageUrls.map((image, index) => {
            if (index < 3) {
              return (
                <motion.div
                  className={styles.imageBack}
                  onClick={() => setMainImage(image)}
                >
                  <img src={image} alt={`product-${company}`}></img>
                </motion.div>
              );
            }
          })}
        </Paper>
      </motion.div>
      <motion.div className={styles.descSection}>
        <motion.div className={styles.heading}>
          <h2>{company}</h2>
          <h4>{`Category : ${category}`}</h4>
          <h5>In Stock</h5>
          <div className={styles.underLine}></div>
        </motion.div>
        <motion.div className={styles.middleContainer}>
          <motion.div className={styles.pricing}>
            <h6>MRP</h6>
            <h1>{`₹${price}`}</h1>
          </motion.div>
          <motion.div className={styles.affiliateButtons}>
            <Tooltip title="Add to favourites" placement="top">
              <IconButton
                onClick={handleClickVariant("success", company, productId)}
                className={styles.likeIcon}
              >
                <i
                  id={product.productId}
                  className={classNames("fas fa-heart")}
                />
              </IconButton>
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
      </motion.div>
    </motion.div>
  );
};
