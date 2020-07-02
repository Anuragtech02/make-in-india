import React from "react";
import styles from "./Product.module.css";
import { motion } from "framer-motion";

const Product = ({ product }) => {
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
        <h1>{product.productId}</h1>
      </motion.div>
    </motion.div>
  );
};

export default Product;
