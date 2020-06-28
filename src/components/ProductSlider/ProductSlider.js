import React, { useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  Grid,
  Button,
  colors,
} from "@material-ui/core";
import styles from "./ProductSlider.module.css";
import axios from "axios";
import ImageSlide from "../ImageSlide/ImageSlide";
import products from "../../assets/products.json";
import ScrollMenu from "react-horizontal-scrolling-menu";
import classNames from "classnames";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
  const [iconColor, setIconColor] = useState(styles.nothing);

  const onClickHeart = () => {
    setIconColor(styles.iconActive);
  };

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    dots: true,
    lazyload: true,
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {products.map((product) => {
          return (
            <Card key={product.productId} className={styles.card}>
              <div className={styles.thumbnail}>
                <img src={product.imageUrls[0]} alt={product.company} />
              </div>
              <div className={styles.name}>
                <Typography
                  className={styles.category}
                  varivar--primaryColorant="subtitle2"
                >
                  {product.category}
                </Typography>
                <Typography className={styles.company} variant="subtitle1">
                  {product.company}
                </Typography>
              </div>
              <div className={styles.priceLike}>
                <h4>₹{product.price}</h4>
                <IconButton onClick={onClickHeart} className={styles.likeIcon}>
                  <i
                    style={{ color: "black" }}
                    className={classNames("fas fa-heart")}
                  />
                </IconButton>
              </div>
              <div className={styles.buttons}>
                <Button className={styles.amazonBtn}>Amazon</Button>
                <Button className={styles.flipkartBtn}>Flipkart</Button>
              </div>
            </Card>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
