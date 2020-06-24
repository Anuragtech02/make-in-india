import React, { useState } from "react";
import styles from "./Slider.module.css";
import { Card, IconButton, Button, Typography } from "@material-ui/core";
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";
import image3 from "../../images/image3.jpg";
import image4 from "../../images/image4.jpg";
import image5 from "../../images/image5.jpg";
import { ImageSlide } from "../../components";

const Slider = () => {
  let arr = [image1, image2, image3, image4, image5];
  const [X, setX] = useState(0);

  const onClickLeft = () => {
    X === 0 ? setX(-100 * (arr.length - 1)) : setX(X + 100);
  };
  const onClickRight = () => {
    X === -100 * (arr.length - 1) ? setX(0) : setX(X - 100);
  };

  return (
    <div className={styles.slider}>
      <Card className={styles.sliderCard}>
        {arr.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.slide}
              style={{
                transform: `translateX(${X}%)`,
                backgroundImage: `url(${item})`,
              }}
            >
              <Typography className={styles.title} variant="h2">
                Slide {index}
              </Typography>
              <Button className={styles.buyBtn} variant="contained">
                Buy Now
              </Button>
            </div>
          );
        })}
        <IconButton
          id="leftClick"
          className={styles.leftClick}
          onClick={onClickLeft}
        >
          <i className="fas fa-chevron-circle-left"></i>
        </IconButton>
        <IconButton
          id="rightClick"
          className={styles.rightClick}
          onClick={onClickRight}
        >
          <i className="fas fa-chevron-circle-right"></i>
        </IconButton>
      </Card>
    </div>
  );
};

export default Slider;
