import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router";
import {
  TextField,
  IconButton,
  Button,
  Paper,
  Card,
  Tooltip,
} from "@material-ui/core";
import styles from "./myProfile.module.css";
import firebase from "../Firebase";
import { AuthContext } from "../Auth";

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

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [website, setWebsite] = useState(null);
  const [industry, setIndustry] = useState(null);
  const [email2, setEmail2] = useState(null);
  const [mobile2, setMobile2] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [insta, setInsta] = useState(null);

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
            <TextField
              className={styles.textField}
              value={name}
              label={userDetails.displayName}
              size="small"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              className={styles.textField}
              value={email}
              label={userDetails.email}
              size="small"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </Paper>
      <Paper className={styles.dashboard}>
        <div className={styles.heading}>
          <h2>My Products</h2>
        </div>
        <div className={styles.titleBar}>
          <div className={styles.productVisibility}>
            <h4>Visibility</h4>
          </div>
          <div className={styles.imageHeading}>
            <h4>Image</h4>
          </div>
          <div className={styles.nameHeading}>
            <h4>Product Name</h4>
          </div>
          <div className={styles.priceHeading}>
            <h4>Price (₹)</h4>
          </div>
          <div className={styles.editProduct}>
            <h4>Edit Details</h4>
          </div>
        </div>
        <div className={styles.products}>
          <Card className={styles.product}>
            <div className={styles.visibility}>
              <Tooltip title="Show/Hide Product" placement="top">
                <IconButton className={styles.eye}>
                  <i className="fas fa-eye"></i>
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.productDetails}></div>
            <div className={styles.editProduct}>
              <IconButton></IconButton>
              <IconButton></IconButton>
            </div>
          </Card>
        </div>
      </Paper>
    </div>
  );
};
