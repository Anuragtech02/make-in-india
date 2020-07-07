import React, { useState, useEffect, useLayoutEffect } from "react";
import { Grid } from "@material-ui/core";
import styles from "./ProductSlider.module.css";
// import products from "../../assets/products.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../components";
import firebase from "../Firebase";

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

    function updateSize() {
      if (window.innerWidth > 1600) setVisibleSlides(4);
      else if (widthBetween(1100, 1600)) setVisibleSlides(3);
      else if (widthBetween(800, 1100)) setVisibleSlides(2);
      else if (window.innerWidth <= 800) setVisibleSlides(1);
    }
    window.addEventListener("resize", updateSize);
  }, []);

  const [visibleSlides, setVisibleSlides] = useState(4);

  //Check if width is between given range
  const widthBetween = (smaller, larger) => {
    if (window.innerWidth <= larger && window.innerWidth > smaller) {
      return true;
    } else {
      return false;
    }
  };

  const [products, setProducts] = useState([]);

  //Used to check width of the device
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        const newProduct = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));

        setProducts(newProduct);
      });

    return () => unsubscribe();
  }, []);

  //Used to detect layout changes
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1600) setVisibleSlides(4);
      else if (widthBetween(1100, 1600)) setVisibleSlides(3);
      else if (widthBetween(800, 1100)) setVisibleSlides(2);
      else if (window.innerWidth <= 800) setVisibleSlides(1);
    }
    window.addEventListener("resize", updateSize);
  }, []);

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    accessibility: true,
    dots: true,
    lazyload: true,
    slidesToShow: visibleSlides,
    swipeToSlide: true,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Grid item xs={12} className={styles.grid}>
                <Product product={product} />
              </Grid>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ProductSlider;
