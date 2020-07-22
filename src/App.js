import React, { useState } from "react";
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
  MyProfile,
  EditProduct,
  BrandSlider,
} from "./components";
import PrivateRoute from "./Authentication/PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import { Paper, IconButton, Grid, Card } from "@material-ui/core";
import { ChromePicker } from "react-color";
import classNames from "classnames";
import NotFound from "./404";
import { AuthProvider } from "./Authentication/Auth";
import electronics from "./images/electronics-category.webp";
import fashion from "./images/fashion-category.webp";
import food from "./images/food-category.webp";
import hygiene from "./images/hygiene-category.webp";
import sports from "./images/sports-category.webp";
import cosmetics from "./images/cosmetics-category.webp";

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

  return (
    <AuthProvider>
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
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/about" exact component={About} />
            <Route path="/contacts" exact component={Contact} />
            <Route path="/category/:category" exact component={CategoryPage} />
            <Route path="/products/:id" exact component={ProductPage} />
            <Route path="/stores/:storeId" exact component={Shop} />
            <PrivateRoute exact path="/add-product" component={AddProduct} />
            <PrivateRoute
              exact
              path="/my-profile/:userId"
              component={MyProfile}
            />
            <PrivateRoute
              exact
              path="/edit-product/:productId"
              component={EditProduct}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

const Home = ({ history }) => {
  const categories = [
    {
      category: "electronics",
      background: electronics,
    },
    { category: "fashion", background: fashion },
    { category: "hygiene", background: hygiene },
    { category: "sports", background: sports },
    { category: "food", background: food },
    { category: "cosmetics", background: cosmetics },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <Slider />
      </div>
      <div className={styles.productSlider}>
        <ProductSlider />
      </div>
      <div className={styles.info}>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={6} md={4} key={category.category}>
              <Card
                className={styles.categoryCard}
                style={{ backgroundImage: `url(${category.background})` }}
                onClick={() =>
                  history.push(`/category/${category.category.trim()}`)
                }
              >
                <div className={styles.innerDiv}>
                  <h1>{category.category}</h1>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={styles.brands}>
        <BrandSlider />
      </div>
    </div>
  );
};
