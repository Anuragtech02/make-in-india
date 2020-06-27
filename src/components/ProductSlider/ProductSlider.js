import React, { useState } from "react";
import { Card, Typography, IconButton, Grid, Button } from "@material-ui/core";
import styles from "./ProductSlider.module.css";
import axios from "axios";
import ImageSlide from "../ImageSlide/ImageSlide";
import products from "../../assets/products.json";
import ScrollMenu from "react-horizontal-scrolling-menu";
import classNames from "classnames";

const ProductSlider = () => {
  const [iconColor, setIconColor] = useState(styles.nothing);

  const onClickHeart = () => {
    setIconColor(styles.iconActive);
  };
  // const [selected, setSelected] = useState(0);
  // // console.log(products);

  // const onSelect = (key) => {
  //   setSelected(key);
  // };
  // // One item component
  // // selected prop will be passed
  // const MenuItem = ({
  //   productID,
  //   imageUrl,
  //   company,
  //   category,
  //   price,
  //   selected,
  // }) => {
  //   return (
  //     <div className={styles.menuItem}>
  //       <Card key={productID} className={styles.card}>
  //         <div className={styles.thumbnail}>
  //           <img src={imageUrl} alt={`${company}-image`} />
  //         </div>
  //         <div className={styles.name}>
  //           <Typography variant="subtitle2">{category}</Typography>
  //           <Typography variant="subtitle1">{company}</Typography>
  //         </div>
  //         <div className={styles.priceLike}>
  //           <h4>₹{price}</h4>
  //           <IconButton className={styles.likeIcon}>
  //             <i className="fas fa-heart" />
  //           </IconButton>
  //         </div>
  //       </Card>
  //     </div>
  //   );
  // };

  // const Menu = (list) =>
  //   list.map((el) => {
  //     const { productID, category, price, company } = el;

  //     return (
  //       <MenuItem
  //         productID={productID}
  //         imageUrl={el.imageUrls[0]}
  //         company={company}
  //         category={category}
  //         price={price}
  //         key={productID}
  //       />
  //     );
  //   });

  // const Arrow = ({ icon, className }) => {
  //   return <div className={className}>{`<i className="${icon}"></i>`}</div>;
  // };

  // const ArrowLeft = Arrow({
  //   icon: "fas fa-chevron-circle-left",
  //   className: "arrow-prev",
  // });
  // const ArrowRight = Arrow({
  //   icon: "fas fa-chevron-circle-right",
  //   className: "arrow-next",
  // });

  // const menu = Menu(products, selected);

  return (
    <div className={styles.container}>
      {/* <ScrollMenu
        className={styles.scrollMenu}
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={selected}
        onSelect={onSelect}
      /> */}
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {products.map((product) => {
          return (
            <Grid key={product.productId} item>
              <Card className={styles.card}>
                <div className={styles.thumbnail}>
                  <img src={product.imageUrls[0]} alt={`${product.company}`} />
                </div>
                <div className={styles.name}>
                  <Typography
                    className={styles.category}
                    varivar--primaryColorant="subtitle2"
                  >
                    {product.category}
                  </Typography>
                  <Typography className={styles.company} variant="subtitle1">
                    {product.company}
                  </Typography>
                </div>
                <div className={styles.priceLike}>
                  <h4>₹{product.price}</h4>
                  <IconButton
                    onClick={onClickHeart}
                    className={styles.likeIcon}
                  >
                    <i className={classNames("fas fa-heart", iconColor)} />
                  </IconButton>
                </div>
                <div className={styles.buttons}>
                  <Button className={styles.amazonBtn}>Amazon</Button>
                  <Button className={styles.flipkartBtn}>Flipkart</Button>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ProductSlider;
