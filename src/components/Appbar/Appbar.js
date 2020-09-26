import React, { useState, useEffect, useContext } from "react";
import {
  IconButton,
  Typography,
  Paper,
  InputBase,
  Menu,
  MenuItem,
  Button,
  Badge,
} from "@material-ui/core";
import { Link, withRouter, Redirect } from "react-router-dom";
import styles from "./AppBar.module.css";
import { AuthContext } from "../../Authentication/Auth";
import { CartContext } from "../../Context/CartContext";
import firebase from "../../Authentication/Firebase";
import classNames from "classnames";

const Appbar = ({ history }) => {
  const { currentUser, userDetails } = useContext(AuthContext);
  const { totalProducts } = useContext(CartContext);

  const [changeOnSeller, setChangeOnSeller] = useState(styles.nothing);

  const onClickCart = () => {
    history.push("/cart");
  };

  useEffect(() => {
    userDetails.isSeller
      ? setChangeOnSeller(styles.disabledCart)
      : setChangeOnSeller(styles.nothing);
  }, [userDetails]);

  return (
    <div className={styles.container}>
      <div variant="h4" className={styles.logo}>
        <Link to="/" className={styles.noDecoration}>
          <h3>INDIPRODUCTS</h3>
        </Link>
        <div className={classNames(styles.accountMobile, styles.showFlex)}>
          <AccountComponent
            history={history}
            currentUser={currentUser}
            userDetails={userDetails}
          />
          <IconButton
            disabled={userDetails.isSeller ? true : false}
            style={{ opacity: userDetails.isSeller ? "0.4" : "1" }}
            onClick={onClickCart}
            className={styles.cart}
          >
            <Badge
              badgeContent={totalProducts}
              invisible={totalProducts ? false : true}
            >
              <i className="fas fa-shopping-cart"></i>
            </Badge>
          </IconButton>
        </div>
      </div>
      <Paper className={styles.inputPaper}>
        <InputBase
          className={styles.searchInput}
          placeholder="Type something to search..."
        />
        <IconButton
          type="submit"
          aria-label="search"
          className={styles.searchIcon}
        >
          <i className="fas fa-search"></i>
        </IconButton>
      </Paper>
      <div className={classNames(styles.accountLarge, styles.showFlex)}>
        <AccountComponent
          history={history}
          currentUser={currentUser}
          userDetails={userDetails}
        />
        <IconButton
          disabled={userDetails.isSeller ? true : false}
          style={{ opacity: userDetails.isSeller ? "0.4" : "1" }}
          onClick={onClickCart}
          className={classNames(styles.cart, changeOnSeller)}
        >
          <Badge
            badgeContent={totalProducts}
            color="primary"
            invisible={totalProducts ? false : true}
          >
            <i className="fas fa-shopping-cart"></i>
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};

export default withRouter(Appbar);

const AccountComponent = ({ history, currentUser, userDetails }) => {
  const [menuIcon, setMenuIcon] = useState("down");
  const [anchorEl, setAnchorEl] = useState(null);
  const [account, setAccount] = useState("Account");
  const [item1, setItem1] = useState("Login");
  const [item1Route, setItem1Route] = useState("/login");
  const [item2, setItem2] = useState("Signup");
  const [item2Route, setItem2Route] = useState("/signup");
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (currentUser) {
        setItem1("My Profile");
        setItem2("Logout");
        try {
          setAccount(userDetails.displayName);
          setItem1Route(`/my-profile/${userDetails.uid}`);
          setItem2Route("/login");
          userDetails.isSeller ? setIsSeller(true) : setIsSeller(false);
        } catch (error) {
          alert("Error : " + error);
        }
      } else {
        setAccount("Account");
        setItem1("Login");
        setItem2("Signup");
      }
    };
    getCurrentUser();
  }, [currentUser, userDetails]);

  const handleLogout = () => {
    setAccount("Account");
    setItem1Route("/login");
    setItem2Route("/signup");
    setIsSeller(false);
    firebase.auth().signOut();
    history.push("/login");
    setTimeout(() => {
      history.push("/login");
    }, 1000);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuIcon("up");
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuIcon("down");
  };

  return (
    <div className={styles.account}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClickMenu}
        className={styles.menuBtn}
      >
        <i className="fas fa-user" />
        <span className={styles.accountLabel}> {account}</span>
        <i className={`fas fa-angle-${menuIcon}`} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        className={styles.menu}
      >
        <Link
          to={item1Route}
          className={classNames(styles.noDecoration, styles.colorBlack)}
        >
          <MenuItem onClick={handleCloseMenu}>{item1}</MenuItem>
        </Link>
        {isSeller ? (
          <Link
            to="/add-product"
            className={classNames(styles.noDecoration, styles.colorBlack)}
          >
            <MenuItem onClick={handleCloseMenu}>Add Product</MenuItem>
          </Link>
        ) : (
          ""
        )}
        <Link
          to={item2Route}
          className={classNames(styles.noDecoration, styles.colorBlack)}
          onClick={() => (currentUser ? handleLogout() : handleCloseMenu())}
        >
          <MenuItem onClick={handleCloseMenu}>{item2}</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};
