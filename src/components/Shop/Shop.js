import React from "react";
import styles from "./Shop.module.css";
import { Grid } from "@material-ui/core";
import image from "../../images/image3.webp";
import { motion } from "framer-motion";
import userImage from "../../images/user-image.webp";

const Shop = ({ company }) => {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.banner}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.darkOverlay}>
          <h1>{company}</h1>
        </div>
      </motion.div>
      <motion.div className={styles.infobar}>
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${userImage})` }}
        ></div>
        <div className={styles.contactDetails}>
          <div className={styles.contactWrapper}>
            <div className={styles.call}>
              <i className="fas fa-phone-alt" />
              <h4>987654321</h4>
            </div>
            <div className={styles.mail}>
              <i className="fas fa-envelope" />
              <h4>email@example.com</h4>
            </div>
            <div className={styles.blog}>
              <i className="fas fa-rss-square"></i>
              <h4>Visit My Blog</h4>
            </div>
          </div>
          <div className={styles.para}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              praesentium alias qui cum nam perspiciatis corrupti eaque ab eum
              sequi in nisi similique voluptatem quasi, ducimus totam odio nemo
              non.
            </p>
          </div>
        </div>
      </motion.div>
      <div className={styles.innerContainer}>
        <div className={styles.heading}>
          <h3>Products</h3>
        </div>
        <div className={styles.products}>
          <Grid container>{}</Grid>
        </div>
      </div>
    </div>
  );
};

export default Shop;
