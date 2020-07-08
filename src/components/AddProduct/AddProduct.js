import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AddProduct.module.css";
import { TextField, Button, Card } from "@material-ui/core";
import firebase from "../Firebase";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [storeName, setStoreName] = useState("");
  const [price, setPrice] = useState(0);
  const [headline, setHeadline] = useState("");
  const [amazonLink, setAmazonLink] = useState("");
  const [flipkartLink, setFlipkartLink] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  //   const [imageUrls, setImageUrls] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [asin, setAsin] = useState(0);
  const [storeId, setStoreId] = useState("");
  const [send, setSend] = useState(false);

  const getStore = async () => {
    const db = firebase.firestore();
    await db
      .collection("stores")
      .where("name", "==", storeName)
      .get()
      .then((doc) => {
        doc.forEach((item) => {
          setStoreId(item.id);
        });
      });
  };

  const handleStoreName = (e) => {
    setStoreName(e.target.value);
    setTimeout(() => {
      getStore();
      setSend(true);
      console.log(storeId);
    }, 1000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .add({
    //     title,
    //     storeName,
    //     price: parseFloat(price),
    //     headline,
    //     amazonLink,
    //     flipkartLink,    console.log()

    //     website,
    //     category,(e) => setStoreName(e.target.value)
    //     asin: parseInt(asin),
    //   })
    //   .then(() => {
    //     setTitle("");
    //     setStoreName("");
    //     setPrice(0);
    //     setHeadline("");
    //     setAmazonLink("");
    //     setFlipkartLink("");
    //     setWebsite("");
    //     setCategory("");
    //     setDescription("");
    //     setTags("");
    //     setMainImage("");
    //     setImage1("");
    //     setImage2("");
    //     setImage3("");
    //     setAsin("");
    //     alert("Successfully added");
    //   });
    console.log(storeId);

    if (send) {
      firebase
        .firestore()
        .collection("stores")
        .doc(storeId)
        .collction("products")
        .add({
          title,
          storeName,
          price: parseFloat(price),
          headline,
          amazonLink,
          flipkartLink,
          website,
          category,
          description,
          tags,
          imageUrls: [mainImage, image1, image2, image3],
          asin: parseInt(asin),
        });
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={onSubmit}>
          <Card className={styles.card}>
            <h2>Add Product </h2>
            <TextField
              className={styles.textField}
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Title"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={storeName}
              onChange={handleStoreName}
              autoFocus
              autoComplete="off"
              size="small"
              label="Store Name"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Price"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Headline"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={amazonLink}
              onChange={(e) => setAmazonLink(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Amazon Link"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={flipkartLink}
              onChange={(e) => setFlipkartLink(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Flipkart Link"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Category"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Website Link"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Description"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Image 1 (Main Image)"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Image 2"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Image 3"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Image 4"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Tags"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={asin}
              onChange={(e) => setAsin(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="ASIN"
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="primary"
            >
              Add
            </Button>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
