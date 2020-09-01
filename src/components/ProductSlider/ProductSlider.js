import React, { useState, useEffect, createRef } from "react";
import { Grid, CircularProgress, Box, IconButton } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./ProductSlider.module.css";
// import products from "../../assets/products.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../components";
import { SnackbarProvider, useSnackbar } from "notistack";
import firebase from "../../Authentication/Firebase";
import classNames from "classnames";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <ProductSliderComponent products={products} />
    </SnackbarProvider>
  );
};

export default ProductSlider;

const ProductSliderComponent = ({ products }) => {
  const slider = createRef();

  const gotoPrev = () => {
    slider.current.slickPrev();
  };

  const gotoNext = () => {
    slider.current.slickNext();
  };

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

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (variant, title) => {
    enqueueSnackbar(`Successfully added ${title} to cart`, {
      variant,
    });
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
                <Product showSnackbar={showSnackbar} product={product} />
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
