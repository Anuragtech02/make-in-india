import React, { useState, useEffect, useContext } from "react";
import styles from "./AddProduct.module.css";
import { TextField, Button, Card } from "@material-ui/core";
import firebase from "../Firebase";
import { withRouter, Redirect } from "react-router-dom";
import { AuthContext } from "../Auth";

const AddProduct = ({ history }) => {
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

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getId = async () => {
      const db = firebase.firestore();
      const rf = db.collection("users").where("email", "==", currentUser.email);
      const snapshot = await rf.get();
      snapshot.forEach((doc) => {
        if (doc.data().isSeller) {
          setStoreId(doc.data().storeId);
          setStoreName(doc.data().displayName);
        } else {
          alert("You're not a seller");
          history.push("/");
          return <Redirect to="/" />;
        }
      });
    };

    getId();
  }, [currentUser.email, history]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    const productRef = db.collection("products");
    const storeRef = db
      .collection("stores")
      .doc(storeId)
      .collection("products");
    const tempProductId = productRef.doc().id;
    await productRef
      .doc(tempProductId)
      .set({
        title,
        storeName,
        id: tempProductId,
        price: parseFloat(price),
        imageUrls: [mainImage, image1, image2, image3],
        headline,
        amazonLink,
        flipkartLink,
        website,
        category,
        storeId,
        asin: parseInt(asin),
      })
      .then(async () => {
        await storeRef
          .doc(tempProductId)
          .set({
            title,
            storeName,
            id: tempProductId,
            price: parseFloat(price),
            headline,
            amazonLink,
            flipkartLink,
            website,
            category,
            description,
            tags,
            imageUrls: [mainImage, image1, image2, image3],
            storeId,
            asin: parseInt(asin),
          })
          .then(() => {
            setTitle("");
            setStoreName("");
            setPrice(0);
            setHeadline("");
            setAmazonLink("");
            setFlipkartLink("");
            setWebsite("");
            setCategory("");
            setDescription("");
            setTags("");
            setMainImage("");
            setImage1("");
            setImage2("");
            setImage3("");
            setAsin("");
            alert("Successfully added");
          });
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={onSubmit}>
          <Card className={styles.card}>
            <h2>Add Product </h2>
            <TextField
              required
              className={styles.textField}
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              autoComplete="off"
              size="small"
              label="Title"
            />
            {/* <TextField
              className={styles.textField}
              variant="outlined"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              autoComplete="off"
              size="small"
              label="Store Name"
            /> */}
            <TextField
              className={styles.textField}
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              autoComplete="off"
              size="small"
              label="Price"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              autoComplete="off"
              size="small"
              label="Headline"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={amazonLink}
              onChange={(e) => setAmazonLink(e.target.value)}
              autoComplete="off"
              size="small"
              label="Amazon Link"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={flipkartLink}
              onChange={(e) => setFlipkartLink(e.target.value)}
              autoComplete="off"
              size="small"
              label="Flipkart Link"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoComplete="off"
              size="small"
              label="Category"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
              size="small"
              label="Website Link"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="off"
              size="small"
              label="Description"
            />
            <TextField
              required
              className={styles.textField}
              variant="outlined"
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
              autoComplete="off"
              size="small"
              label="Image 1 (Main Image)"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              autoComplete="off"
              size="small"
              label="Image 2"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
              autoComplete="off"
              size="small"
              label="Image 3"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
              autoComplete="off"
              size="small"
              label="Image 4"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              autoComplete="off"
              size="small"
              label="Tags"
            />
            <TextField
              className={styles.textField}
              variant="outlined"
              value={asin}
              onChange={(e) => setAsin(e.target.value)}
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

export default withRouter(AddProduct);
