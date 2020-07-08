import React, { useState, useEffect } from "react";
import {
  TopBar,
  Appbar,
  NavBar,
  Slider,
  ProductSlider,
  CategoryPage,
  Contact,
  About,
  ProductPage,
  Shop,
  Login,
  Signup,
  AddProduct,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useParams } from "react-router";
import products from "./assets/products.json";
import styles from "./App.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper, IconButton } from "@material-ui/core";
import { ChromePicker } from "react-color";
import classNames from "classnames";
import NotFound from "./404";

const App = () => {
  const [temp, setTemp] = useState(styles.noStyle);

  const [colorPrimary, setColorPrimary] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--primaryColor"
    )
  );
  const [colorAccent, setColorAccent] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("--orangeTint")
  );

  const changePrimaryColor = (e) => {
    setColorPrimary(e.hex);
    document.documentElement.style.setProperty("--primaryColor", e.hex);
  };

  const changeAccentColor = (e) => {
    setColorAccent(e.hex);
    document.documentElement.style.setProperty("--orangeTint", e.hex);
  };

  const closeColor = () => {
    setTemp(styles.closeColor);
  };

  // const history = createBrowserHistory();

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
        <div className={classNames(styles.colorPanel, temp)}>
          <Paper className={styles.pickerContainer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h5>Primary Color</h5>
              <IconButton className={styles.closeBtn} onClick={closeColor}>
                <i className="fas fa-times-circle"></i>
              </IconButton>
            </div>
            <ChromePicker
              color={colorPrimary}
              onChange={(e) => changePrimaryColor(e)}
            />
            <h5>Accent Color</h5>
            <ChromePicker
              color={colorAccent}
              onChange={(e) => changeAccentColor(e)}
            />
          </Paper>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/about" exact component={About} />
          <Route path="/contacts" exact component={Contact} />
          <Route path="/category/:category" exact component={CategoryPage} />
          <Route path="/product/:id" exact component={ProductPage} />
          <Route path="/store/:storeName" exact component={Shop} />
          <Route path="/add-product" exact component={AddProduct} />
          <Route component={NotFound} />
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
      <div className={styles.productSlider}>
        <ProductSlider />
      </div>
    </>
  );
};
