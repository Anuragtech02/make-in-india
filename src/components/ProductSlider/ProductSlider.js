import React, { useState, useEffect, useLayoutEffect, createRef } from "react";
import { Grid, CircularProgress, Box, IconButton } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./ProductSlider.module.css";
// import products from "../../assets/products.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../components";
import firebase from "../../Authentication/Firebase";
import classNames from "classnames";

const ProductSlider = () => {
  const slider = createRef();

  useEffect(() => {
    // document.querySelectorAll(".slick-arrow").forEach((item) => {
    //   item.style.background = "white";
    //   item.style.width = "35px";
    //   item.style.height = "35px";
    //   item.style.borderRadius = "100px";
    //   item.style.zIndex = "1000";
    //   item.style.boxShadow = "2px 2px 10px rgba(0,0,0,0.2)";
    // });
    // document.querySelectorAll(".slick-next").forEach((item) => {
    //   item.style.right = "30px";
    // });
    // document.querySelectorAll(".slick-prev").forEach((item) => {
    //   item.style.left = "30px";
    // });
    // document.styleSheets[0].addRule(
    //   ".slick-next:before",
    //   "color: black !important;"
    // );
    // document.styleSheets[0].addRule(
    //   ".slick-prev:before",
    //   "color: black !important"
    // );
  }, []);

  const [products, setProducts] = useState([]);

  const gotoPrev = () => {
    slider.current.slickPrev();
  };

  const gotoNext = () => {
    slider.current.slickNext();
  };

  useEffect(() => {
    const localProducts = localStorage.getItem("homeSlider");
    const unsubscribe = localProducts
      ? setProducts(JSON.parse(localProducts))
      : firebase
          .firestore()
          .collection("products")
          .where("hidden", "==", false)
          .onSnapshot((snapshot) => {
            const newProduct = snapshot.docs.map((doc) => ({
              ...doc.data(),
            }));
            setProducts(newProduct);
            localStorage.setItem("homeSlider", JSON.stringify(newProduct));
          });

    return () => {
      !localStorage.getItem("homeSlider").length
        ? unsubscribe()
        : setProducts(JSON.parse(localStorage.getItem("homeSlider")));
    };
  }, []);

  const settings = {
    className: "center",
    centerPadding: "60px",
    accessibility: true,
    dots: true,
    lazyload: true,
    slidesToShow: 4,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return !products ? (
    <div>
      <IconButton onClick={() => gotoPrev()} className={styles.arrowLeft}>
        <i className="fas fa-arrow-circle-left"></i>
      </IconButton>
      <Slider
        {...settings}
        className={classNames(styles.slider, styles.loadingSlider)}
      >
        <Box className={styles.loadingBox} pt={0.5}>
          <Skeleton variant="rect" width={210} height={150} />
          <Skeleton width="60%" />
        </Box>
        <Box className={styles.loadingBox} pt={0.5}>
          <Skeleton variant="rect" width={210} height={150} />
          <Skeleton width="60%" />
        </Box>
        <Box className={styles.loadingBox} pt={0.5}>
          <Skeleton variant="rect" width={210} height={150} />
          <Skeleton width="60%" />
        </Box>
        <Box className={styles.loadingBox} pt={0.5}>
          <Skeleton variant="rect" width={210} height={150} />
          <Skeleton width="60%" />
        </Box>
      </Slider>
      <IconButton onClick={() => gotoNext()} className={styles.arrowRight}>
        <i className="fas fa-arrow-circle-right"></i>
      </IconButton>
    </div>
  ) : (
    <div className={styles.container}>
      <IconButton onClick={() => gotoPrev()} className={styles.arrowLeft}>
        <i className="fas fa-arrow-circle-left"></i>
      </IconButton>
      <Slider {...settings} className={styles.slider} ref={slider}>
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
      <IconButton onClick={() => gotoNext()} className={styles.arrowRight}>
        <i className="fas fa-arrow-circle-right"></i>
      </IconButton>
    </div>
  );
};

export default ProductSlider;
