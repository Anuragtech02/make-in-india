import React, { useState, useEffect, useContext } from "react";
import {
  IconButton,
  Typography,
  Paper,
  InputBase,
  ListItem,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { Link, withRouter, Redirect } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import styles from "./AppBar.module.css";
import { AuthContext } from "../Auth";
import firebase from "../Firebase";
import { auth } from "firebase";

const Appbar = ({ history }) => {
  const [open, setOpen] = useState(false);
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
    auth().signOut();
    setItem1Route("/login");
    setItem2Route("/signup");
    setIsSeller(false);
    history.push("/login");
    return <Redirect to="/login" />;
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
        <List component="div">
          <ListItem button onClick={() => setOpen(!open)}>
            <ListItemIcon>
              <i className="fas fa-user"></i>
            </ListItemIcon>
            <ListItemText primary={account} className={styles.itemText} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to={item1Route}
                className={styles.noDecoration}
                onClick={() => setOpen(!open)}
              >
                <ListItem button className={styles.nested}>
                  <ListItemText primary={item1} />
                </ListItem>
              </Link>
              {isSeller ? (
                <Link
                  to="/add-product"
                  className={styles.noDecoration}
                  onClick={() => setOpen(!open)}
                >
                  <ListItem button className={styles.nested}>
                    <ListItemText primary="Add Product" />
                  </ListItem>
                </Link>
              ) : (
                " "
              )}

              <Link
                to={item2Route}
                className={styles.noDecoration}
                onClick={() => (currentUser ? handleLogout() : setOpen(!open))}
              >
                <ListItem button className={styles.nested}>
                  <ListItemText primary={item2} />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export default withRouter(Appbar);
