import React, { useEffect, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { useParams } from "react-router";
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
  console.log(currentUser.email, userDetails.email);

  if (currentUser && userDetails) {
    if (userId !== userDetails.uid) {
      history.push("/login");
      alert("You're not authorized for this");
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <h1>My name is {userDetails.displayName} </h1>
      </div>
    </div>
  );
};
