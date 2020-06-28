import React, { useState, useEffect } from "react";
import { Card, Typography, IconButton, Button, Grid } from "@material-ui/core";
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
  const [iconColor, setIconColor] = useState("var(--greyIcon)");

  const onClickHeart = () => {
    setIconColor("var(--primaryColor)");
  };

  useEffect(() => {
    // let left = document.getElementsByClassName("slick-prev");
    // let right = document.getElementsByClassName("slick-next");
    // left.style.color = "red";
  }, []);

  const arrowColor = () => {
    return <div style={{ display: "block", color: "black" }} />;
  };

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    accebility: true,
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
            <>
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
                      onClick={onClickHeart}
                      className={styles.likeIcon}
                    >
                      <i
                        ref={(el) => {
                          if (el) {
                            el.style.setProperty(
                              "color",
                              iconColor,
                              "important"
                            );
                          }
                        }}
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
            </>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
