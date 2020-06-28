import React, { useState, useEffect } from "react";
import { Card, Typography, IconButton, Button, Grid } from "@material-ui/core";
import styles from "./ProductSlider.module.css";
import products from "../../assets/products.json";
import classNames from "classnames";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
  const iconColor = "var(--primaryColor)";

  const onClickHeart = (productID) => {
    let change = document
      .getElementById(productID)
      .style.setProperty("color", iconColor, "important");
  };

  useEffect(() => {
    document.querySelectorAll(".slick-arrow").forEach((item) => {
      item.style.background = "white";
      item.style.width = "35px";
      item.style.height = "35px";
      item.style.borderRadius = "100px";
      item.style.zIndex = "1000";
      item.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";
    });
    document.querySelectorAll(".slick-next").forEach((item) => {
      item.style.right = "30px";
    });
    document.querySelectorAll(".slick-prev").forEach((item) => {
      item.style.left = "30px";
    });
    document.styleSheets[0].addRule(
      ".slick-next:before",
      "color: black !important;"
    );
    document.styleSheets[0].addRule(
      ".slick-prev:before",
      "color: black !important"
    );
  }, []);

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    accessibility: true,
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
      <Slider {...settings} className={styles.slider}>
        {products.map((product) => {
          return (
            <div key={product.productId}>
              <Grid item xs={12} className={styles.grid}>
                <Card key={product.productId} className={styles.card}>
                  <div className={styles.thumbnail}>
                    <img src={product.imageUrls[0]} alt={product.company} />
                  </div>
                  <div className={styles.name}>
                    <Typography className={styles.category} variant="subtitle2">
                      {product.category}
                    </Typography>
                    <Typography className={styles.company} variant="subtitle1">
                      {product.company}
                    </Typography>
                  </div>
                  <div className={styles.priceLike}>
                    <h4>₹{product.price}</h4>
                    <IconButton
                      onClick={() => onClickHeart(product.productId)}
                      className={styles.likeIcon}
                    >
                      <i
                        id={product.productId}
                        className={classNames("fas fa-heart")}
                      />
                    </IconButton>
                  </div>
                  <div className={styles.buttons}>
                    <Button className={styles.amazonBtn}>Amazon</Button>
                    <Button className={styles.flipkartBtn}>Flipkart</Button>
                  </div>
                </Card>
              </Grid>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
