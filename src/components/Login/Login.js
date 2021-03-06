import React, { useCallback, useContext } from "react";
import styles from "./Login.module.css";
import { withRouter, Redirect } from "react-router-dom";
import { Card, TextField, Button } from "@material-ui/core";
import firebase from "../../Authentication/Firebase";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Authentication/Auth";

export const Login = ({ history }) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser, userDetails } = useContext(AuthContext);

  if (currentUser && userDetails) {
    if (currentUser.email === userDetails.email) {
      return <Redirect to="/" />;
    }
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>INDIPRODUCTS | LOGIN</title>
      </Helmet>
      <div className={styles.cardWrapper}>
        <Card className={styles.card}>
          <div className={styles.heading}>
            <h2>Login</h2>
          </div>
          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleLogin}>
              <div className={styles.textFields}>
                <TextField
                  required
                  className={styles.textField}
                  label="Username"
                  name="email"
                  type="email"
                  variant="outlined"
                  size="small"
                  autoComplete="off"
                  // value={username}signup
                  autoFocus
                  // onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  className={styles.textField}
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  size="small"
                  // value={password}
                  autoComplete="off"
                  // onChange={(e) => setPassword(e.target.value)}
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
              <Button
                onClick={() => history.push("/signup")}
                variant="contained"
              >
                Create a free account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(Login);
