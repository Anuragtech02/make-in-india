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
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import products from "./assets/products.json";
import styles from "./App.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Paper, IconButton } from "@material-ui/core";
import { ChromePicker } from "react-color";
import classNames from "classnames";
import NotFound from "./404";

const App = () => {
  const categories = ["electronics", "fashion", "personal-hygiene", "sports"];

  const companies = ["cinthol", "asian paints", "boroline", "amul", "bata"];

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

          {/* <Route path="/make-in-india" component={Home} /> */}
          {categories.map((category) => {
            return (
              <Route
                exact
                path={`/category/${category}`}
                component={() => <DisplayCategoryPage category={category} />}
              />
            );
          })}
          <Route path="/about" exact component={About} />
          <Route path="/contacts" exact component={Contact} />

          {products.map((product) => {
            return (
              <Route
                exact
                key={product.productId}
                path={`/product/${product.productId}`}
                component={() => <DisplayProduct product={product} />}
              />
            );
          })}

          {companies.map((company) => {
            return (
              <Route
                exact
                key={company}
                path={`/shop/${company}`}
                component={() => <DisplayCompanyPage company={company} />}
              />
            );
          })}
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

const DisplayCategoryPage = ({ category }) => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 800); //Time out for loading screen
  });

  return display ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <CategoryPage category={category} />
  );
};

const DisplayProduct = ({ product }) => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 800); //Time out for loading screen
  });

  return display ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <ProductPage product={product} />
  );
};

const DisplayCompanyPage = ({ company }) => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 800); //Time out for loading screen
  });

  return display ? (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  ) : (
    <Shop company={company} />
  );
};
