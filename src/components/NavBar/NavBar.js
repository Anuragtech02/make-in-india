import React from "react";
import styles from "./NavBar.module.css";
import { Paper } from "@material-ui/core";
const NavBar = () => {
  return (
    <div className={styles.container}>
      <Paper className={styles.navContainer}>
        <div className={styles.nav}>
          <a href="#">Home</a>
          <a href="#">Electronics</a>
          <a href="#">Fashion</a>
          <a href="#">Personal Hygiene</a>
          <a href="#">Sports</a>
          <a href="#">About Us</a>
          <a href="#">Blog</a>
          <a href="#">Contact</a>
        </div>
      </Paper>
    </div>
  );
};

export default NavBar;
