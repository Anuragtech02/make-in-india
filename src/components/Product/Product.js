import React, { useContext } from "react";
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
import { CartContext } from "../../Context/CartContext";

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

  const { addProduct } = useContext(CartContext);

  const gotoURL = (location) => {
    let a = document.createElement("a");
    a.target = "_blank";
    a.href = location;
    a.click();
  };

  const handleClickVariant = (variant, title, id) => () => {
    enqueueSnackbar(`Successfully added ${title} to cart`, {
      variant,
    });
    onClickHeart(id);
    saveToLocal();
    addProduct(product);
  };

  const saveToLocal = () => {
    let oldCart = localStorage.getItem("cart");
    let newCart = oldCart ? JSON.parse(oldCart) : [];
    product["quantity"] = 1;
    newCart.push(product);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const onClickHeart = (id) => {
    document
      .getElementById(id)
      .style.setProperty("color", iconColor, "important");
  };

  const { enqueueSnackbar } = useSnackbar();

  return (
    <Card key={id} className={styles.card}>
      <Link to={`/products/${id.trim()}`} className={styles.noDecoration}>
        <div className={styles.thumbnail}>
          <img src={imageUrls[0]} alt={title} />
        </div>
      </Link>
      <div className={styles.name}>
        <Typography className={styles.category} variant="subtitle2">
          {category}
        </Typography>
        <Link to={`/products/${id.trim()}`} className={styles.noDecoration}>
          <Typography className={styles.company} variant="subtitle1">
            {title}
          </Typography>
        </Link>
      </div>
      <div className={styles.priceLike}>
        <h4>₹{price}</h4>
        <Tooltip title="Add to favourites" placement="top">
          <IconButton
            onClick={handleClickVariant("success", title, id)}
            className={styles.likeIcon}
          >
            <i id={id} className={classNames("fas fa-cart-plus")} />
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
