import React from "react";
import { IconButton, Typography } from "@material-ui/core";
import "./AppBar.module.css";

const Appbar = () => {
  return (
    <div className="container">
      <Typography variant="h5" className="logo">
        MADE IN INDIA
      </Typography>
    </div>
  );
};

export default Appbar;
