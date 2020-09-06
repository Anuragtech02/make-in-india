import React, { useState, useEffect, createRef } from "react";
import styles from "./HomeSlider.module.css";
import { Card, IconButton, Button, Typography } from "@material-ui/core";
import image1 from "../../images/image1.webp";
import image2 from "../../images/image2.webp";
import image3 from "../../images/image3.webp";
import image4 from "../../images/image4.webp";
import image5 from "../../images/image5.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
  const homeSlider = createRef(null);

  const gotoPrev = () => {
    homeSlider.current.slickPrev();
  };

  const gotoNext = () => {
    homeSlider.current.slickNext();
  };

  const settings = {
    className: "center",
    infinite: true,
    autoplay: true,
    centerPadding: "60px",
    accessibility: true,
    dots: true,
    lazyload: true,
    slidesToShow: 1,
    swipeToSlide: true,
  };

  let arr = [image1, image2, image3, image4, image5];

  let slides = [
    {
      image: image1,
      title: "Winter Wear",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum non a tenetur itaque. Odit temporibus saepe praesentium at qui rem maxime perspiciatis ex delectus. Laudantium, at perferendis. Sit, illo explicabo.",
    },
    {
      image: image2,
      title: "Earings",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum non a tenetur itaque. Odit temporibus saepe praesentium at qui rem maxime perspiciatis ex delectus. Laudantium, at perferendis. Sit, illo explicabo.",
    },
    {
      image: image3,
      title: "Rayban Aviators",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum non a tenetur itaque. Odit temporibus saepe praesentium at qui rem maxime perspiciatis ex delectus. Laudantium, at perferendis. Sit, illo explicabo.",
    },
    {
      image: image4,
      title: "Raymond",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum non a tenetur itaque. Odit temporibus saepe praesentium at qui rem maxime perspiciatis ex delectus. Laudantium, at perferendis. Sit, illo explicabo.",
    },
    {
      image: image5,
      title: "T-Shirts",
      desc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum non a tenetur itaque. Odit temporibus saepe praesentium at qui rem maxime perspiciatis ex delectus. Laudantium, at perferendis. Sit, illo explicabo.",
    },
  ];
  // const [X, setX] = useState(0);

  // const onClickLeft = () => {
  //   X === 0 ? setX(-100 * (arr.length - 1)) : setX(X + 100);
  // };
  // const onClickRight = () => {
  //   X === -100 * (arr.length - 1) ? setX(0) : setX(X - 100);
  // };

  return (
    <div
      style={{ position: "relative", overflow: "hidden", borderRadius: "5px" }}
    >
      <IconButton onClick={() => gotoPrev()} className={styles.arrowLeft}>
        <i className="fas fa-arrow-circle-left"></i>
      </IconButton>
      <Slider {...settings} ref={homeSlider} className={styles.slider}>
        {slides.map((slide, index) => {
          return (
            <div key={slide.title}>
              <div
                className={styles.backgroundContainer}
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className={styles.slide}>
                  <h2 className={styles.title}>{slide.title}</h2>
                  <p>{slide.desc}</p>
                  <Button className={styles.buyBtn} variant="contained">
                    Buy Now
                  </Button>
                </div>
              </div>
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

export default HomeSlider;
