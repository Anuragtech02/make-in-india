import React from "react";
import styles from "./Home.module.css";
import { withRouter } from "react-router-dom";
import {
  HomeSlider,
  ProductSlider,
  BrandSlider,
  Stores,
} from "../../components";
import { Card, Grid } from "@material-ui/core";
import electronics from "../../images/electronics-category.webp";
import fashion from "../../images/fashion-category.webp";
import food from "../../images/food-category.webp";
import hygiene from "../../images/hygiene-category.webp";
import sports from "../../images/sports-category.webp";
import cosmetics from "../../images/cosmetics-category.webp";

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
        <HomeSlider />
      </div>
      <div className={styles.stores}>
        <Stores />
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

export default withRouter(Home);
