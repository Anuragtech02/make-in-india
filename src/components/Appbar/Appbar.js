import React, { useState, useEffect, useContext } from "react";
import {
  IconButton,
  Typography,
  Paper,
  InputBase,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import { Link, withRouter, Redirect } from "react-router-dom";
import styles from "./AppBar.module.css";
import { AuthContext } from "../Auth";
import firebase from "../Firebase";
import classNames from "classnames";

const Appbar = ({ history }) => {
  const [menuIcon, setMenuIcon] = useState("down");
  const [anchorEl, setAnchorEl] = useState(null);
  const [account, setAccount] = useState("Account");
  const [item1, setItem1] = useState("Login");
  const [item1Route, setItem1Route] = useState("/login");
  const [item2, setItem2] = useState("Signup");
  const [item2Route, setItem2Route] = useState("/signup");
  const [isSeller, setIsSeller] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (currentUser) {
        setItem1("My Profile");
        setItem2("Logout");
        try {
          const db = firebase.firestore();
          const ref = db.collection("users");
          const snapshot = await ref
            .where("email", "==", currentUser.email)
            .get();
          snapshot.forEach((doc) => {
            setAccount(doc.data().displayName);
            setItem1Route(`/my-profile/${doc.id}`);
            setItem2Route("/login");
            doc.data().isSeller ? setIsSeller(true) : setIsSeller(false);
          });
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
  }, [currentUser]);

  const handleLogout = () => {
    setAccount("Account");
    setItem1Route("/login");
    setItem2Route("/signup");
    setIsSeller(false);
    firebase.auth().signOut();
    history.push("/login");
    return <Redirect to="/login" />;
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
    <div className={styles.container}>
      <Typography variant="h4" className={styles.logo}>
        <Link to="/" className={styles.noDecoration}>
          INDIPRODUCTS
        </Link>
      </Typography>
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
      <div className={styles.account}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMenu}
          className={styles.menuBtn}
        >
          <i className="fas fa-user" /> {account}{" "}
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
    </div>
  );
};

export default withRouter(Appbar);
