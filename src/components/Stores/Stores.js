import React from "react";
import styles from "./Stores.module.css";
import { Grid, Card } from "@material-ui/core";

export const Stores = () => {
  const data = [
    {
      image:
        "https://images.unsplash.com/photo-1551446339-1e5c6f164ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80",
      alt: "first-shop",
      title: "Aveeno",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      alt: "second-shop",
      title: "Lyra",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      alt: "third-shop",
      title: "Head & Shoulders",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.pexels.com/photos/1566421/pexels-photo-1566421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      alt: "third-shop",
      title: "Bata",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551446339-1e5c6f164ec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80",
      alt: "first-shop",
      title: "Aveeno",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      alt: "second-shop",
      title: "Lyra",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      alt: "third-shop",
      title: "Head & Shoulders",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      image:
        "https://images.pexels.com/photos/1566421/pexels-photo-1566421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      alt: "third-shop",
      title: "Bata",
      para: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        {data.map((shop, index) => (
          <Grid
            key={index}
            item
            md={3}
            sm={6}
            xs={12}
            className={styles.shopContainer}
          >
            <div className={styles.imageContainer}>
              <img src={shop.image} alt={shop.alt} />
            </div>
            <div className={styles.description}>
              <h3>{shop.title}</h3>
              <p>{shop.para}</p>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Stores;
