import React from "react";
import Slider from "react-slick";
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
    dots: true,
    lazyload: true,
    slidesToShow: 6,
    swipeToSlide: true,
  };

  return (
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
