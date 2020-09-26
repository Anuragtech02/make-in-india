import React, { useContext, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
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
  LinearProgress,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Avatar,
} from "@material-ui/core";
import styles from "./myProfile.module.css";
import firebase from "../../Authentication/Firebase";
import { AuthContext } from "../../Authentication/Auth";
import classNames from "classnames";

const MyProfile = ({ history }) => {
  const { userId } = useParams();
  const { currentUser, userDetails, products } = useContext(AuthContext);

  return (
    <ProfileComponent
      history={history}
      userId={userId}
      userDetails={userDetails}
      currentUser={currentUser}
      products={products}
    />
  );
};

export default withRouter(MyProfile);

const ProfileComponent = ({
  currentUser,
  history,
  userId,
  userDetails,
  products,
}) => {
  useEffect(() => {
    if (currentUser && userDetails.uid) {
      if (userId !== userDetails.uid) {
        history.push("/login");
        alert("You're not authorized for this");
      }
    }
  }, [currentUser, history, userDetails.storeId, userId, userDetails.uid]);

  const gotoItem = (location) => {
    history.push(`/my-profile/${userDetails.uid}/${location}`);
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={2}>
        <Grid item md={4} lg={4} xl={3} sm={12} xs={12}>
          <Paper className={styles.profileSection}>
            <div className={styles.profile}>
              <Avatar
                variant="rounded"
                src="https://www.deshairtravels.com/mobilesite//cdn/resume/-social_media_profile_picture-3.jpg"
              >
                {userDetails.displayName.slice(0, 2)}
              </Avatar>
              <div className={styles.nameDetails}>
                <h5>{userDetails.displayName}</h5>
                <p>{userDetails.mobile}</p>
              </div>
            </div>
            <div className={styles.controlPanel}>
              <div
                onClick={() => gotoItem("products")}
                className={classNames(
                  styles.myProducts,
                  styles.controlItem,
                  history.location.pathname.includes("products")
                    ? styles.selected
                    : null
                )}
              >
                <i className="fas fa-th-list"></i>
                <p>Products</p>
              </div>
              <div
                onClick={() => gotoItem("new-orders")}
                className={classNames(
                  styles.newOrders,
                  styles.controlItem,
                  history.location.pathname.includes("new-orders")
                    ? styles.selected
                    : null
                )}
              >
                <i className="fas fa-bell"></i>
                <p>New Orders</p>
              </div>
              <div
                onClick={() => gotoItem("prev-orders")}
                className={classNames(
                  styles.oldOrders,
                  styles.controlItem,
                  history.location.pathname.includes("prev-orders")
                    ? styles.selected
                    : null
                )}
              >
                <i className="fas fa-layer-group"></i>
                <p>Prev Orders</p>
              </div>
            </div>
            <div className={styles.settings}>
              <h4>Tools</h4>
              <div className={styles.setttingsItem}>
                <i className="fas fa-cog"></i>
                <p>Settings</p>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item md={8} lg={8} xl={9} sm={12} xs={12}>
          <Paper className={styles.dashboardContainer}>
            <div className={styles.actionBar}>
              <Tooltip placement="top" title="Add Product">
                <IconButton>
                  <i className="fas fa-plus-circle"></i>
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.dashboard}>
              <div className={styles.heading}>
                <h2>My Products</h2>
              </div>
              <TableContainer
                className={styles.tableContainer}
                component={Paper}
              >
                <Table className={styles.table}>
                  <TableHead className={styles.tableHead}>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <HorizontalProduct
                        key={product.title}
                        storeId={userDetails.storeId}
                        product={product}
                        history={history}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const HorizontalProduct = ({ product, storeId, history }) => {
  const { imageUrls, title, price, headline, id } = product;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eye, setEye] = useState(
    product.hidden ? "fas fa-eye-slash " : "fas fa-eye"
  );
  const [hidden, setHidden] = useState(product.hidden);
  const [dialogText, setDialogText] = useState(
    "Are you sure, you wish to hide the product"
  );

  const db = firebase.firestore();
  const storeProductRef = db
    .collection("stores")
    .doc(storeId)
    .collection("products")
    .doc(product.id);
  const absoluteProductRef = db.collection("products").doc(product.id);
  const [showProgress, setShowProgress] = useState(false);

  const handleVisibility = () => {
    setDialogOpen(true);
    hidden
      ? setDialogText("Do you really wish to unhide the product?")
      : setDialogText("Are you sure, you wish to hide the product?");
  };
  const handleAgree = () => {
    setShowProgress(true);
    if (hidden) {
      storeProductRef
        .update({ hidden: false })
        .then(() => {
          absoluteProductRef
            .update({ hidden: false })
            .then(() => {
              setTimeout(() => {
                setShowProgress(false);
                setDialogOpen(false);
                setEye("fas fa-eye");
                setHidden(false);
              }, 800);
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      storeProductRef
        .update({ hidden: true })
        .then(() => {
          absoluteProductRef
            .update({ hidden: true })
            .then(() => {
              setTimeout(() => {
                setShowProgress(false);
                setDialogOpen(false);
                setEye("fas fa-eye-slash");
                setHidden(true);
              }, 800);
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {hidden ? "Show Product" : "Hide Product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
          {showProgress ? <LinearProgress /> : ""}
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
      <TableRow className={styles.individualProduct}>
        <TableCell component="th" scope="row">
          <Tooltip title="Show/Hide Product" placement="top">
            <IconButton className={styles.eye} onClick={handleVisibility}>
              <i className={eye}></i>
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell>
          <img
            className={styles.productImage}
            src={imageUrls[0]}
            alt={`product-${title}`}
          />
        </TableCell>
        <TableCell>
          <h5>
            <b>{title}</b>
            <br />
            <span className={styles.headlineSpan}>{headline}</span>
          </h5>
        </TableCell>
        <TableCell>
          <h5>₹{price}</h5>
        </TableCell>
        <TableCell align="right">
          <div className={styles.editProduct}>
            <Tooltip title="Edit Product" placement="top">
              <IconButton
                className={classNames(styles.iconContainer)}
                onClick={() => history.push(`/edit-product/${id}`)}
              >
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
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};
