import React, { useState } from "react";
import {
  Card,
  Button,
  Switch,
  TextField,
  FormControlLabel,
  Collapse,
} from "@material-ui/core";
import firebase from "../../Authentication/Firebase";
import { withRouter } from "react-router-dom";
import styles from "./SellerSignup.module.css";
import { Helmet } from "react-helmet";
import classNames from "classnames";

const SellerSignup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState();
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [checked, setChecked] = useState(false);
  const [industry, setIndustry] = useState("");
  const [email2, setEmail2] = useState("");
  const [mobile2, setMobile2] = useState("");
  const [facebook, setFacebook] = useState("");
  const [insta, setInsta] = useState("");
  const [errorNotSame, setErrorNotSame] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const db = firebase.firestore();
      const refUser = db.collection("users");
      const refStore = db.collection("stores");
      const tempStoreId = refStore.doc().id;
      const tempUserId = refUser.doc().id;
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await refStore.doc(tempStoreId).set({
        displayName: name,
        email,
        mobile,
        isSeller: true,
        secondary_mobile: mobile2,
        recovery_email: email2,
        industry,
        facebook,
        insta,
        website,
        storeId: tempStoreId,
      });

      await refUser
        .doc(tempUserId)
        .set({
          uid: tempUserId,
          displayName: name,
          email,
          mobile,
          isSeller: true,
          secondary_mobile: mobile2,
          recovery_email: email2,
          industry,
          facebook,
          insta,
          website,
          storeId: tempStoreId,
        })
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    } catch (error) {
      alert("Error : " + error);
    }
  };

  const matchPassword = (e) => {
    setConfirmPass(e.target.value);
    const temp = e.target.value;
    setErrorNotSame(false);
    setHelperText("");
    setTimeout(() => {
      if (temp !== password) {
        setHelperText("Password does not match!");
        setErrorNotSame(true);
      } else {
        setErrorNotSame(false);
        setHelperText("");
      }
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>INDIPRODUCTS | SELLER SIGNUP</title>
      </Helmet>
      <div className={styles.cardWrapper}>
        <Card className={styles.card}>
          <div className={styles.heading}>
            <h2>Create Account</h2>
          </div>
          <form className={styles.form} onSubmit={handleSignup}>
            <div className={styles.textFields}>
              <div className={styles.nameContainer}>
                <TextField
                  className={classNames(styles.textField, styles.name)}
                  required
                  label="Your Name"
                  type="text"
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.emailPhone}>
                <TextField
                  required
                  className={styles.textField}
                  variant="outlined"
                  type="email"
                  label="Email"
                  size="small"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  className={classNames(styles.textField)}
                  variant="outlined"
                  type="tel"
                  label="Mobile"
                  size="small"
                  autoComplete="off"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className={styles.passwords}>
                <TextField
                  required
                  error={errorNotSame}
                  className={styles.textField}
                  variant="outlined"
                  type="password"
                  label="Password"
                  size="small"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  required
                  error={errorNotSame}
                  className={styles.textField}
                  variant="outlined"
                  type="password"
                  label="Confirm Password"
                  size="small"
                  autoComplete="off"
                  value={confirmPass}
                  helperText={helperText}
                  onChange={(e) => matchPassword(e)}
                />
              </div>
            </div>
            {/* <div className={styles.signupBtn}>
              <Button
                variant="contained"
                style={{
                  opacity: !checked ? "1" : "0",
                  pointerEvents: !checked ? "" : "none",
                }}
                type="submit"
              >
                Signup
              </Button>
            </div> */}
            <div className={styles.shopDetails}>
              <h4>Store Details</h4>
            </div>

            <div className={classNames(styles.textFields, styles.sellerFields)}>
              <div className={styles.industryWrapper}>
                <TextField
                  required={checked ? true : false}
                  variant="outlined"
                  className={classNames(styles.textField, styles.industry)}
                  size="small"
                  value={industry}
                  label="Industry"
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
              <div className={styles.emailMobile}>
                <TextField
                  required={checked ? true : false}
                  variant="outlined"
                  className={styles.textField}
                  size="small"
                  value={email2}
                  label="Recovery Email"
                  onChange={(e) => setEmail2(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  className={styles.textField}
                  size="small"
                  value={mobile2}
                  label="Secondary Mobile"
                  onChange={(e) => setMobile2(e.target.value)}
                />
              </div>
              <div className={styles.websiteWrapper}>
                <TextField
                  variant="outlined"
                  className={classNames(styles.textField, styles.website)}
                  type="text"
                  size="small"
                  value={website}
                  label="Website Link"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className={styles.fbInsta}>
                <TextField
                  variant="outlined"
                  className={styles.textField}
                  type="text"
                  size="small"
                  value={facebook}
                  label="Facebook"
                  onChange={(e) => setFacebook(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  className={styles.textField}
                  type="text"
                  size="small"
                  value={insta}
                  label="Instagram"
                  onChange={(e) => setInsta(e.target.value)}
                />
              </div>
              <div
                className={classNames(styles.signupBtn, styles.sellerSubmit)}
              >
                <Button variant="contained" type="submit">
                  Signup
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(SellerSignup);
