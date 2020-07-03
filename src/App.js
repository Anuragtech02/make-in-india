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
  Product,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import products from "./assets/products.json";
import styles from "./App.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const App = () => {
  const categories = ["electronics", "fashion", "personal-hygiene", "sports"];

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
          {/* <Route path="/make-in-india" component={Home} /> */}
          {categories.map((category) => {
            return (
              <Route
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
                key={product.productId}
                path={`/product/${product.productId}`}
                component={() => <DisplayProduct product={product} />}
              />
            );
          })}
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
    <Product product={product} />
  );
};
