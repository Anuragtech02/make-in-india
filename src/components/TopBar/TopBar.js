import React from "react";
import { IconButton } from "@material-ui/core";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="container">
      <div className="information">
        <div className="email-container">
          <i className="fas fa-envelope" />
          <h4>support@madeinindia.in</h4>
        </div>
        <div className="location-container">
          <i className="fa fa-map-marker" />
          <h4>Indore, India</h4>
        </div>
      </div>
      <div className="social-icons">
        <IconButton className="fb-icon">
          <i className="fab fa-facebook-f"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-instagram"></i>
        </IconButton>
        <IconButton>
          <i className="fab fa-linkedin-in"></i>
        </IconButton>
      </div>
    </div>
  );
};

export default TopBar;
