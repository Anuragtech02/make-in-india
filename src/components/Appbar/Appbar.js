import React, { useState } from "react";
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
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import styles from "./AppBar.module.css";

const Appbar = () => {
  const [open, setOpen] = useState(false);
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
          className={styles.iconButton}
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
              <i class="fas fa-user"></i>
            </ListItemIcon>
            <ListItemText primary="ACCOUNT" className={styles.itemText} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={styles.nested}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button className={styles.nested}>
                <ListItemText primary="Signup" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export default Appbar;
