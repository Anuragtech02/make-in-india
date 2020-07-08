import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./Product.module.css";
import amazon from "../../icons/amazon-brands.png";
import flipkart from "../../icons/flipkart.png";
import { SnackbarProvider, useSnackbar } from "notistack";
import classNames from "classnames";

const Product = ({ product }) => {
  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <ProductCard product={product} />
    </SnackbarProvider>
  );
};

export default Product;

const ProductCard = ({ product }) => {
  const {
    id,
    imageUrls,
    storeName,
    category,
    price,
    amazonLink,
    flipkartLink,
    title,
  } = product;

  const iconColor = "var(--primaryColor)";

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
    <Card key={id} className={styles.card}>
      <Link to={`/product/${id.trim()}`} className={styles.noDecoration}>
        <div className={styles.thumbnail}>
          <img src={imageUrls[0]} alt={title} />
        </div>
      </Link>
      <div className={styles.name}>
        <Typography className={styles.category} variant="subtitle2">
          {category}
        </Typography>
        <Link to={`/product/${id.trim()}`} className={styles.noDecoration}>
          <Typography className={styles.company} variant="subtitle1">
            {storeName}
          </Typography>
        </Link>
      </div>
      <div className={styles.priceLike}>
        <h4>₹{price}</h4>
        <Tooltip title="Add to favourites" placement="top">
          <IconButton
            onClick={handleClickVariant("success", storeName, id)}
            className={styles.likeIcon}
          >
            <i id={id} className={classNames("fas fa-heart")} />
          </IconButton>
        </Tooltip>
      </div>
      <div className={styles.buttons}>
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
      </div>
    </Card>
  );
};
