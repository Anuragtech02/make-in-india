import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router";
import {
  TextField,
  IconButton,
  Button,
  Paper,
  Card,
  Tooltip,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import styles from "./myProfile.module.css";
import firebase from "../Firebase";
import { AuthContext } from "../Auth";
import classNames from "classnames";

const MyProfile = ({ history }) => {
  const { userId } = useParams();
  const { currentUser, userDetails } = useContext(AuthContext);

  return (
    <div>
      <ProfileComponent
        history={history}
        userId={userId}
        userDetails={userDetails}
        currentUser={currentUser}
      />
    </div>
  );
};

export default withRouter(MyProfile);

const ProfileComponent = ({ currentUser, history, userId, userDetails }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = firebase.firestore();
      const storeRef = db.collection("stores").doc(userDetails.storeId);
      const snapshost = await storeRef.collection("products").get();
      const productData = snapshost.docs.map((doc) => ({
        ...doc.data(),
      }));
      setProducts(productData);
    };

    if (currentUser && userDetails.uid) {
      if (userId !== userDetails.uid) {
        history.push("/login");
        alert("You're not authorized for this");
      } else {
        fetchProducts();
      }
    }
  }, [currentUser, history, userDetails.storeId, userId, userDetails.uid]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [email2, setEmail2] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [facebook, setFacebook] = useState("");
  const [insta, setInsta] = useState("");

  return (
    <div className={styles.container}>
      <Paper className={styles.profileSection}>
        <div className={styles.profileWrapper}>
          <div
            className={styles.profile}
            style={{
              backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/b/bf/Mona_Lisa-restored.jpg`,
            }}
          >
            {/* <h5>Change Photo</h5> */}
          </div>
          <div className={styles.personalDetails}>
            <div className={styles.inputContainer}>
              <h5>{userDetails.displayName}</h5>
              {/* <TextField
                className={styles.textField}
                value={name}
                label={userDetails.displayName}
                size="small"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              /> */}
            </div>

            <div className={styles.inputContainer}>
              <h5>{userDetails.email}</h5>
              {/* <TextField
                className={styles.textField}
                value={email}
                label={userDetails.email}
                size="small"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              /> */}
            </div>
            <div>
              {/* <TextField
                className={styles.textField}
                value={mobile}
                label={userDetails.mobile}
                size="small"
                variant="outlined"
                onChange={(e) => setMobile(e.target.value)}
              /> */}
              <h5>{userDetails.mobile}</h5>
            </div>
          </div>
        </div>
      </Paper>
      <Paper className={styles.dashboard}>
        <div className={styles.heading}>
          <h2>My Products</h2>
        </div>
        <Grid container className={styles.titleBar}>
          <Grid item md={1} className={styles.productVisibility}>
            <h4>Status</h4>
          </Grid>
          <Grid item md={2} className={styles.imageHeading}>
            <h4>Image</h4>
          </Grid>
          <Grid item md={6} className={styles.nameHeading}>
            <h4>Product Name</h4>
          </Grid>
          <Grid item md={1} className={styles.priceHeading}>
            <h4>Price (₹)</h4>
          </Grid>
          <Grid item md={2} className={styles.editProduct}>
            <h4>Edit Details</h4>
          </Grid>
        </Grid>
        <div className={styles.products}>
          {products.map((product) => {
            return <HorizontalProduct key={product.title} product={product} />;
          })}
        </div>
      </Paper>
    </div>
  );
};

const HorizontalProduct = ({ product }) => {
  const { imageUrls, title, price, headline } = product;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eye, setEye] = useState(
    product.hidden ? "fas fa-eye-flash " : "fas fa-eye"
  );
  const [currentStatus, setCurrentStatus] = useState(product.hidden);
  const [dialogText, setDialogText] = useState(
    "Are you sure, you wish to hide the product"
  );

  const handleVisibility = () => {
    setDialogOpen(true);
    if (currentStatus) {
      setDialogText("Do you really wish to unhide the product?");
    } else {
      setDialogText("Are you sure, you wish to hide the product?");
    }
  };
  const handleAgree = () => {
    setDialogOpen(false);
    currentStatus ? setEye("fas fa-eye") : setEye("fas fa-eye-slash");
    currentStatus ? setCurrentStatus(false) : setCurrentStatus(true);
  };

  const handleCancel = () => {
    setEye("fas fa-eye");
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {currentStatus ? "Show Product" : "Hide Product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} color="primary">
            Yes
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={styles.individualProduct}>
        <Grid container className={styles.product}>
          <Grid item md={1} className={styles.visibility}>
            <Tooltip title="Show/Hide Product" placement="top">
              <IconButton className={styles.eye} onClick={handleVisibility}>
                <i className={eye}></i>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item md={9}>
            <Grid container className={styles.productDetails}>
              <Grid item md={3} className={styles.productImage}>
                <img src={imageUrls[0]} alt={`product-${title}`} />
              </Grid>
              <Grid item md={8} className={styles.productName}>
                <h5>
                  <b>{title}</b>
                  <br />
                  {headline}
                </h5>
              </Grid>
              <Grid item md={1} className={styles.productPrice}>
                <h5>{price}</h5>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={2} className={styles.editProduct}>
            <Tooltip title="Edit Product" placement="top">
              <IconButton className={styles.iconContainer}>
                <i className="fas fa-pencil-alt"></i>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Product" placement="top">
              <IconButton
                className={classNames(
                  styles.iconContainer,
                  styles.deleteProduct
                )}
              >
                <i className="fas fa-times"></i>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};