import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Card,
  Typography,
  IconButton,
  Button,
  Grid,
  Tooltip,
} from "@material-ui/core";
import styles from "./ProductSlider.module.css";
import products from "../../assets/products.json";
import classNames from "classnames";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import amazon from "../../icons/amazon-brands.png";
import flipkart from "../../icons/flipkart.png";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const ProductSlider = () => {
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

  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <PSlider />
    </SnackbarProvider>
  );
};

export default ProductSlider;

const PSlider = () => {
  const iconColor = "var(--primaryColor)";
  const [visibleSlides, setVisibleSlides] = useState(4);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1600) setVisibleSlides(4);
      else if (window.innerWidth <= 1600 && window.innerWidth > 1100)
        setVisibleSlides(3);
      else if (window.innerWidth <= 1100 && window.innerWidth > 800)
        setVisibleSlides(2);
      else if (window.innerWidth <= 800) setVisibleSlides(1);
    }
    window.addEventListener("resize", updateSize);
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant, company, productID) => () => {
    enqueueSnackbar(`Successfully added ${company} to favourites`, { variant });
    onClickHeart(productID);
  };

  const onClickHeart = (productID) => {
    let change = document
      .getElementById(productID)
      .style.setProperty("color", iconColor, "important");
  };

  const gotoURL = (location) => {
    let a = document.createElement("a");
    a.target = "_blank";
    a.href = location;
    a.click();
  };

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    accessibility: true,
    dots: true,
    lazyload: true,
    slidesToShow: visibleSlides,
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
                    <Tooltip title="Add to favourites" placement="top">
                      <IconButton
                        onClick={handleClickVariant(
                          "success",
                          product.company,
                          product.productId
                        )}
                        className={styles.likeIcon}
                      >
                        <i
                          id={product.productId}
                          className={classNames("fas fa-heart")}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className={styles.buttons}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={styles.amazonBtn}
                      onClick={() => gotoURL(product.amazonLink)}
                    >
                      <img src={amazon} alt="amazon-link" /> amazon.in
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={styles.flipkartBtn}
                      onClick={() => gotoURL(product.flipkartLink)}
                    >
                      <img src={flipkart} alt="flipkart-link" />
                    </Button>
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