import React, { useState } from "react";
import styles from "./Product.module.css";
import { motion } from "framer-motion";
import { Paper } from "@material-ui/core";

const Product = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.imageUrls[0]);

  return (
    <motion.div className={styles.container}>
      <motion.div
        className={styles.imageSection}
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.div className={styles.imageContainer}>
          <img src={mainImage} alt={`product-${product.company}`}></img>
        </motion.div>
        <Paper className={styles.otherImages}>
          {product.imageUrls.map((item, index) => {
            if (index < 3) {
              return (
                <motion.div
                  className={styles.imageBack}
                  onClick={() => setMainImage(item)}
                >
                  <img src={item} alt={`product-${product.company}`}></img>
                </motion.div>
              );
            }
          })}
        </Paper>
      </motion.div>
      <motion.div className={styles.descSection}></motion.div>
    </motion.div>
  );
};

export default Product;
