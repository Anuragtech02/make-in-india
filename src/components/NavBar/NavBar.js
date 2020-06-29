import React from "react";
import styles from "./NavBar.module.css";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = () => {
  return (
    <motion.div className={styles.container}>
      <Paper className={styles.navContainer}>
        <div className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/category/electronics">Electronics</Link>
          <Link to="/category/fashion">Fashion</Link>
          <Link to="/category/personal-hygiene">Personal Hygiene</Link>
          <Link to="/category/sports">Sports</Link>
          <Link to="/about">About Us</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contacts">Contact</Link>
        </div>
      </Paper>
    </motion.div>
  );
};

export default NavBar;
