import React, { useState } from "react";
import styles from "./Login.module.css";
import { Card, TextField, Button } from "@material-ui/core";
import Firebase from "../Firebase";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await Firebase.login(username, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        <Card className={styles.card}>
          <div className={styles.heading}>
            <h2>Login</h2>
          </div>
          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={login}>
              <div className={styles.textFields}>
                <TextField
                  className={styles.textField}
                  label="Username"
                  type="email"
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  value={username}
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  className={styles.textField}
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles.submitWrapper}>
                <h4>Forgot Password?</h4>
                <Button
                  className={styles.loginBtn}
                  variant="contained"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
            <div className={styles.newHere}>
              <h5>New here?</h5>
            </div>
            <div className={styles.createAccount}>
              <Button variant="contained">Create a free account</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
