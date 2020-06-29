import React from "react";
import { Page } from "@material-ui/core";
import {
  TopBar,
  Appbar,
  NavBar,
  Slider,
  ProductSlider,
  CategoryPage,
  Contact,
  About,
} from "./components";
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
          <Route path="/" exact component={Home} />
          <Route path="/make-in-india" component={Home} />
          <Route
            path="/category/electronics"
            component={() => <CategoryPage category="electronics" />}
          />
          <Route
            path="/category/fashion"
            component={() => <CategoryPage category="fashion" />}
          />
          <Route
            path="/category/personal-hygiene"
            component={() => <CategoryPage category="personal-hygiene" />}
          />
          <Route
            path="/category/sports"
            component={() => <CategoryPage category="sports" />}
          />
          <Route path="/about" component={About} />
          <Route path="/contacts" component={Contact} />
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
