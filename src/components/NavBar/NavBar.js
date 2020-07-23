import React, { useEffect, useState, useLayoutEffect } from "react";
import styles from "./NavBar.module.css";
import { Paper } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NavBar = ({ history }) => {
  const [slider, setSlider] = useState(0);
  const [navLinks, setNavLinks] = useState({
    home: "black",
    electronics: "black",
    fashion: "black",
    personalHygiene: "black",
    sports: "black",
    about: "black",
    blog: "black",
    contact: "black",
  });

  const width = window.innerWidth;

  useEffect(() => {
    if (window.innerWidth <= 800) setSlider(1);
    else setSlider(0);
    switch (history.location.pathname) {
      case "/":
        setNavLinks({ home: "var(--orangeTint)" });
        break;
      case "/contact":
        setNavLinks({ contact: "var(--orangeTint)" });
        break;
      case "/blog":
        setNavLinks({ blog: "var(--orangeTint)" });
        break;
      case "/about":
        setNavLinks({ about: "var(--orangeTint)" });
        break;
      case "/category/electronics":
        setNavLinks({ electronics: "var(--orangeTint)" });
        break;
      case "/category/fashion":
        setNavLinks({ fashion: "var(--orangeTint)" });
        break;
      case "/category/personal-hygiene":
        setNavLinks({ personalHygiene: "var(--orangeTint)" });
        break;
      case "/category/sports":
        setNavLinks({ sports: "var(--orangeTint)" });
        break;
      default:
        setNavLinks({
          home: "black",
          electronics: "black",
          fashion: "black",
          personalHygiene: "black",
          sports: "black",
          about: "black",
          blog: "black",
          contact: "black",
        });
        break;
    }
  }, [width, history.location.pathname]);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 800) setSlider(1);
      else setSlider(0);
    }
    window.addEventListener("resize", updateSize);
  }, [width]);

  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    accessibility: false,
    dots: false,
    lazyload: false,
    slidesToShow: 4,
    swipeToSlide: true,
    variableWidth: true,
    focusOnSelect: true,
  };

  return (
    <motion.div className={styles.container}>
      {slider ? (
        <Paper className={styles.sliderContainer}>
          <Slider {...settings} className={styles.slider}>
            <div className={styles.navLink}>
              <Link style={{ color: navLinks.home }} to="/">
                Home
              </Link>
            </div>
            <div className={styles.navLink}>
              <Link
                style={{ color: navLinks.electronics }}
                to="/category/electronics"
              >
                Electronics
              </Link>
            </div>
            <div className={styles.navLink}>
              <Link style={{ color: navLinks.fashion }} to="/category/fashion">
                Fashion
              </Link>
            </div>
            <div className={styles.navLink}>
              <Link
                style={{ color: navLinks.personalHygiene }}
                to="/category/personal-hygiene"
              >
                Personal Hygiene
              </Link>
            </div>
            <div className={styles.navLink}>
              <Link style={{ color: navLinks.sports }} to="/category/sports">
                Sports
              </Link>
            </div>
            <div className={styles.navLink}>
              <Link style={{ color: navLinks.about }} to="/about">
                About Us
              </Link>
            </div>
            <div className={styles.navLink}>
              <a
                style={{ color: navLinks.blog }}
                href="https://amorlamps.in/blog/"
              >
                Blog
              </a>
            </div>
            <div className={styles.navLink}>
              <Link style={{ color: navLinks.contact }} to="/contact">
                Contact
              </Link>
            </div>
          </Slider>
        </Paper>
      ) : (
        <Paper className={styles.navContainer}>
          <div className={styles.nav}>
            <Link style={{ color: navLinks.home }} to="/">
              Home
            </Link>
            <Link
              style={{ color: navLinks.electronics }}
              to="/category/electronics"
            >
              Electronics
            </Link>
            <Link style={{ color: navLinks.fashion }} to="/category/fashion">
              Fashion
            </Link>
            <Link
              style={{ color: navLinks.personalHygiene }}
              to="/category/personal-hygiene"
            >
              Personal Hygiene
            </Link>
            <Link style={{ color: navLinks.sports }} to="/category/sports">
              Sports
            </Link>
            <Link style={{ color: navLinks.about }} to="/about">
              About Us
            </Link>
            <a
              style={{ color: navLinks.blog }}
              href="https://amorlamps.in/blog/"
            >
              Blog
            </a>
            <Link style={{ color: navLinks.contact }} to="/contact">
              Contact
            </Link>
          </div>
        </Paper>
      )}
    </motion.div>
  );
};

export default withRouter(NavBar);
