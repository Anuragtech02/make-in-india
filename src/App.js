import React from "react";
import { Page } from "@material-ui/core";
import { TopBar, Appbar, NavBar, Slider, ProductSlider } from "./components";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.topBar}>
        <TopBar />
      </div>
      <div className={styles.appBarContainer}>
        <Appbar />
      </div>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.slider}>
        <Slider />
      </div>
      <div>
        <ProductSlider />
      </div>
    </div>
  );
};

export default App;
