import React from "react";
import { Page } from "@material-ui/core";
import { TopBar, Appbar, NavBar, Slider, ProductSlider } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";

const App = () => {
  return (
    <Router>
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
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

const Home = () => {
  return (
    <>
      <div className={styles.slider}>
        <Slider />
      </div>
      <div>
        <ProductSlider />
      </div>
    </>
  );
};
