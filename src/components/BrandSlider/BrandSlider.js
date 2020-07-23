import React from "react";
import Slider from "react-slick";
import { Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./BrandSlider.module.css";
import { motion } from "framer-motion";

import {
  amul,
  asianPaints,
  dabur,
  godrej,
  haldirams,
  itc,
  patanjali,
} from "../../icons";

const BrandSlider = () => {
  const brands = [amul, asianPaints, dabur, godrej, haldirams, itc, patanjali];

  //Settings for the vertical brand slider
  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    accessibility: true,
    dots: false,
    lazyload: true,
    slidesToShow: 6,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return !brands ? (
    <Slider {...settings} className={styles.brandSlider}>
      <Box className={styles.loadingBox} pt={0.5}>
        <Skeleton variant="rect" width={200} height={80} />
      </Box>
      <Box className={styles.loadingBox} pt={0.5}>
        <Skeleton variant="rect" width={200} height={80} />
      </Box>
      <Box className={styles.loadingBox} pt={0.5}>
        <Skeleton variant="rect" width={200} height={80} />
      </Box>
      <Box className={styles.loadingBox} pt={0.5}>
        <Skeleton variant="rect" width={200} height={80} />
      </Box>
      <Box className={styles.loadingBox} pt={0.5}>
        <Skeleton variant="rect" width={200} height={80} />
      </Box>
      <Box className={styles.loadingBox} pt={0.5}>
        <Skeleton variant="rect" width={200} height={80} />
      </Box>
    </Slider>
  ) : (
    <div>
      <Slider {...settings} className={styles.brandSlider}>
        {brands.map((brand, index) => {
          return (
            <motion.div
              intial={{
                opacity: 0,
                size: 0.8,
              }}
              animate={{
                opacity: 1,
                size: 1,
              }}
              transition={{
                duration: 0.2,
              }}
              key={index}
              className={styles.brandContainer}
            >
              <img className={styles.brandImage} src={brand} alt={brand}></img>
            </motion.div>
          );
        })}
      </Slider>
    </div>
  );
};

export default BrandSlider;
