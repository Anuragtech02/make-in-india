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
import classNames from "classnames";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Authentication/Auth";

const Product = ({ product, showSnackbar }) => {
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

  const { userDetails } = useContext(AuthContext);

  const {
    addProductWithId,
    incrementQuantity,
    products,
    deleteProductWithId,
    decrementQuantity,
  } = useContext(CartContext);

  const gotoURL = (location) => {
    let a = document.createElement("a");
    a.target = "_blank";
    a.href = location;
    a.click();
  };

  const handleClickVariant = (variant, title, id) => () => {
    // enqueueSnackbar(`Successfully added ${title} to cart`, {
    //   variant,
    // });
    showSnackbar(variant, title);
    onClickHeart(id);

    if (
      products.some((product) => {
        return product.id === id;
      })
    ) {
      incrementQuantity(id);
    } else {
      saveToLocal();
      addProductWithId(product);
    }
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
        {!product.quantity ? (
          <IconButton
            disabled={userDetails.isSeller ? true : false}
            style={{ opacity: userDetails.isSeller ? "0.4" : "1" }}
            onClick={handleClickVariant("success", title, id)}
            className={styles.likeIcon}
          >
            <Tooltip title="Add to Cart" placement="top">
              <i id={id} className={classNames("fas fa-cart-plus")} />
            </Tooltip>
          </IconButton>
        ) : (
          <div className={styles.cartUpdate}>
            <Tooltip
              placement="top"
              title={product.quantity === 1 ? "Delete Product" : "Remove one"}
            >
              <IconButton
                onClick={() =>
                  product.quantity === 1
                    ? deleteProductWithId(product.id)
                    : decrementQuantity(product.id)
                }
                className={styles.updateBtns}
              >
                <i className="fas fa-minus" />
              </IconButton>
            </Tooltip>
            <h4>{product.quantity}</h4>
            <Tooltip placement="top" title="Add more">
              <IconButton
                onClick={() => incrementQuantity(product.id)}
                className={styles.updateBtns}
              >
                <i className="fas fa-plus" />
              </IconButton>
            </Tooltip>
          </div>
        )}
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

export default Product;
