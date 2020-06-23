import React from "react";
import { IconButton } from "@material-ui/core";
import styles from "./topBar.module.css";

const TopBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <div className={styles.emailContainer}>
          <i id="logoEnv" className="fas fa-envelope" />
          <h4>support@madeinindia.in</h4>
        </div>
        <div className={styles.locationContainer}>
          <i className="fa fa-map-marker" />
          <h4>Indore, India</h4>
        </div>
      </div>
      <div className={styles.socialIcons}>
        <IconButton className="fb-icon">
          <i className="fab fa-facebook-f"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-instagram"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-linkedin-in"></i>
        </IconButton>
      </div>
    </div>
  );
};

export default TopBar;
