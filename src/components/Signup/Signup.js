import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";
import {
  Card,
  Button,
  Switch,
  TextField,
  FormControlLabel,
} from "@material-ui/core";
import firebase from "../Firebase";
import classNames from "classnames";

export const Signup = () => {
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

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <Card className={styles.card}>
          <div className={styles.heading}>
            <h2>Create Account</h2>
          </div>
          <form className={styles.form}>
            <div className={styles.textFields}>
              <div className={styles.nameMail}>
                <TextField
                  className={styles.textField}
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
              </div>
              <div className={styles.phone}>
                <TextField
                  className={classNames(styles.textField, styles.fieldPhone)}
                  variant="outlined"
                  type="tel"
                  label="Mobile"
                  size="small"
                  autoComplete="off"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  flex
                />
              </div>
              <div className={styles.passwords}>
                <TextField
                  required
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
                  className={styles.textField}
                  variant="outlined"
                  type="password"
                  label="Confirm Password"
                  size="small"
                  autoComplete="off"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.signupBtn}>
              <FormControlLabel
                control={
                  <Switch
                    name="seller"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  />
                }
                label="I am a seller"
              />

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
            </div>
            {checked ? (
              <div
                className={classNames(styles.textFields, styles.sellerFields)}
              >
                <div className={styles.industryWrapper}>
                  <TextField
                    required
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
                    required
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
            ) : (
              " "
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
