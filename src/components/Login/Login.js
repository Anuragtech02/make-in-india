import React from "react";
import styles from "./Login.module.css";
import {
  Card,
  Tooltip,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";

export const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <Card>
          <div className={styles.heading}>
            <h2>Login</h2>
          </div>
          <div className={styles.formWrapper}>
            <form className={styles.form}>
              <div className={styles.textFields}>
                <TextField
                  label="Username"
                  type="email"
                  variant="outlined"
                  size="small"
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                />
              </div>
              <div className={styles.submitWrapper}>
                <h4>Forgot Password?</h4>
                <Button className={styles.loginBtn} variant="contained">
                  Login
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
