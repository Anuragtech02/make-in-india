import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7K_LTUdYHUCkV4DZMd-6mfu8VwAI3ehc",
  authDomain: "indiproducts.firebaseapp.com",
  databaseURL: "https://indiproducts.firebaseio.com",
  projectId: "indiproducts",
  storageBucket: "indiproducts.appspot.com",
  messagingSenderId: "161878248423",
  appId: "1:161878248423:web:c718da7d5dfc22c3b24b42",
  measurementId: "G-64W86WDQNC",
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
