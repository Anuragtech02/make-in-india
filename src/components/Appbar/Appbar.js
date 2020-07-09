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
import { Link } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import styles from "./AppBar.module.css";
import { AuthContext } from "../Auth";
import firebase from '../Firebase'

const Appbar = () => {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState("Account");

  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const getCurrentUser = async () =>{
      currentUser ? (
        try {
          const db = firebase.firestore();
          const ref = db.collection("users")
        } catch (error) {
          alert("Error : " + error)
        }
      ) : (
        setAccount("Account")
      );
    }
    
  });

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.logo}>
        MADE IN INDIA
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
            <ListItemText primary="ACCOUNT" className={styles.itemText} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="/login"
                className={styles.noDecoration}
                onClick={() => setOpen(!open)}
              >
                <ListItem button className={styles.nested}>
                  <ListItemText primary="Login" />
                </ListItem>
              </Link>
              <Link
                to="/signup"
                className={styles.noDecoration}
                onClick={() => setOpen(!open)}
              >
                <ListItem button className={styles.nested}>
                  <ListItemText primary="Signup" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export default Appbar;
