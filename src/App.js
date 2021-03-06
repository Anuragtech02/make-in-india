import React, { useState } from "react";
import {
  TopBar,
  Appbar,
  NavBar,
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
  Cart,
  Home,
  SellerSignup,
} from "./components";
import PrivateRoute from "./Authentication/PrivateRoute";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "./App.module.css";
import { Paper, IconButton, Grid, Card } from "@material-ui/core";
import { ChromePicker } from "react-color";
import classNames from "classnames";
import NotFound from "./404";
import { AuthProvider } from "./Authentication/Auth";
import { CartProvider } from "./Context/CartContext";
import { OrderContextProvider } from "./Context/OrderContext";
import { SellerContextProvider } from "./Context/SellerContext";

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
      <CartProvider>
        <OrderContextProvider>
          <SellerContextProvider>
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
                  <Route path="/contact" exact component={Contact} />
                  <Route
                    path="/category/:category"
                    exact
                    component={CategoryPage}
                  />
                  <Route path="/signup/seller" exact component={SellerSignup} />
                  <Route path="/products/:id" exact component={ProductPage} />
                  <Route path="/stores/:storeId" exact component={Shop} />
                  <PrivateRoute
                    exact
                    path="/add-product"
                    component={AddProduct}
                  />
                  <PrivateRoute exact path="/cart" component={Cart} />
                  <PrivateRoute
                    exact
                    path="/my-profile/:userId/products"
                    component={MyProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/my-profile/:userId/new-orders"
                    component={MyProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/my-profile/:userId/prev-orders"
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
          </SellerContextProvider>
        </OrderContextProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
